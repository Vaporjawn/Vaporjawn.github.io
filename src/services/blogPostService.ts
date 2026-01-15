/**
 * Blog post service for Firestore CRUD operations
 * @module services/blogPostService
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  type QueryConstraint,
} from 'firebase/firestore';
import { getFirestoreDB } from '../backend/firebase';
import type { FirestoreBlogPost, BlogPostFormData } from '../types/blog';
import { calculateReadTime } from '../utils/readTimeEstimate';
import { slugify } from '../utils/slugify';

const COLLECTION_NAME = 'blogPosts';

/**
 * Get all blog posts
 * @param published - Filter by published status (optional)
 * @returns Array of blog posts
 */
export async function getAllBlogPosts(published?: boolean): Promise<FirestoreBlogPost[]> {
  const db = getFirestoreDB();
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];

  if (published !== undefined) {
    constraints.unshift(where('published', '==', published));
  }

  const q = query(collection(db, COLLECTION_NAME), ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as FirestoreBlogPost));
}

/**
 * Get a single blog post by ID
 * @param id - Blog post ID
 * @returns Blog post or null if not found
 */
export async function getBlogPostById(id: string): Promise<FirestoreBlogPost | null> {
  const db = getFirestoreDB();
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as FirestoreBlogPost;
}

/**
 * Get a blog post by slug
 * @param slug - Blog post slug
 * @returns Blog post or null if not found
 */
export async function getBlogPostBySlug(slug: string): Promise<FirestoreBlogPost | null> {
  const db = getFirestoreDB();
  const q = query(
    collection(db, COLLECTION_NAME),
    where('slug', '==', slug),
    limit(1)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as FirestoreBlogPost;
}

/**
 * Check if a slug is unique
 * @param slug - Slug to check
 * @param excludeId - Blog post ID to exclude from check (for updates)
 * @returns True if slug is unique
 */
export async function isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
  const existingPost = await getBlogPostBySlug(slug);

  if (!existingPost) {
    return true;
  }

  // If we're updating and the slug belongs to the same post, it's valid
  return excludeId !== undefined && existingPost.id === excludeId;
}

/**
 * Create a new blog post
 * @param formData - Blog post form data
 * @param authorId - Firebase Auth UID
 * @param featuredImageUrl - Optional featured image URL from Storage
 * @returns Created blog post ID
 */
export async function createBlogPost(
  formData: BlogPostFormData,
  authorId: string,
  featuredImageUrl?: string
): Promise<string> {
  const db = getFirestoreDB();

  // Ensure slug is unique
  const isUnique = await isSlugUnique(formData.slug);
  if (!isUnique) {
    throw new Error(`Slug "${formData.slug}" is already taken`);
  }

  const readTime = calculateReadTime(formData.content);
  const now = Timestamp.now();

  const blogPost: Omit<FirestoreBlogPost, 'id'> = {
    title: formData.title,
    slug: formData.slug,
    description: formData.description,
    content: formData.content,
    excerpt: formData.excerpt || formData.content.substring(0, 200) + '...',
    author: formData.author,
    authorId,
    featuredImage: featuredImageUrl,
    tags: formData.tags,
    published: formData.published,
    readTime,
    createdAt: now,
    updatedAt: now,
    publishedAt: formData.published ? now : undefined,
    views: 0,
  };

  const docRef = await addDoc(collection(db, COLLECTION_NAME), blogPost);
  return docRef.id;
}

/**
 * Update an existing blog post
 * @param id - Blog post ID
 * @param formData - Updated blog post form data
 * @param featuredImageUrl - Optional updated featured image URL
 */
export async function updateBlogPost(
  id: string,
  formData: BlogPostFormData,
  featuredImageUrl?: string
): Promise<void> {
  const db = getFirestoreDB();

  // Check if slug is unique (excluding current post)
  const isUnique = await isSlugUnique(formData.slug, id);
  if (!isUnique) {
    throw new Error(`Slug "${formData.slug}" is already taken`);
  }

  const readTime = calculateReadTime(formData.content);
  const now = Timestamp.now();

  // Get existing post to check if it was previously unpublished
  const existingPost = await getBlogPostById(id);
  const wasUnpublished = existingPost && !existingPost.published;
  const isNowPublished = formData.published;

  const updates: Partial<FirestoreBlogPost> = {
    title: formData.title,
    slug: formData.slug,
    description: formData.description,
    content: formData.content,
    excerpt: formData.excerpt || formData.content.substring(0, 200) + '...',
    author: formData.author,
    tags: formData.tags,
    published: formData.published,
    readTime,
    updatedAt: now,
  };

  // Update featured image if provided
  if (featuredImageUrl !== undefined) {
    updates.featuredImage = featuredImageUrl;
  }

  // Set publishedAt timestamp if publishing for the first time
  if (wasUnpublished && isNowPublished) {
    updates.publishedAt = now;
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, updates);
}

/**
 * Delete a blog post
 * @param id - Blog post ID
 */
export async function deleteBlogPost(id: string): Promise<void> {
  const db = getFirestoreDB();
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

/**
 * Increment view count for a blog post
 * @param id - Blog post ID
 */
export async function incrementViewCount(id: string): Promise<void> {
  const db = getFirestoreDB();
  const docRef = doc(db, COLLECTION_NAME, id);
  const post = await getBlogPostById(id);

  if (post) {
    await updateDoc(docRef, {
      views: (post.views || 0) + 1,
    });
  }
}

/**
 * Generate a unique slug from title
 * @param title - Blog post title
 * @returns Unique slug
 */
export async function generateUniqueSlug(title: string): Promise<string> {
  let slug = slugify(title);
  let counter = 1;

  while (!(await isSlugUnique(slug))) {
    slug = `${slugify(title)}-${counter}`;
    counter++;
  }

  return slug;
}
