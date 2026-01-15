import type { Timestamp } from 'firebase/firestore';

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string; // ISO format YYYY-MM-DD
  author: string;
  tags: string[];
  image?: string; // Optional cover image
  readTime: number; // Estimated read time in minutes
  published: boolean; // Draft vs published
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  content: string;
  excerpt?: string; // Auto-generated from content
}

export interface BlogFilter {
  tag?: string;
  searchQuery?: string;
  sortBy?: "date" | "title" | "readTime";
  sortOrder?: "asc" | "desc";
}

/**
 * Firestore blog post document structure
 */
export interface FirestoreBlogPost {
  /** Firestore document ID */
  id: string;
  /** Post title */
  title: string;
  /** URL-friendly slug */
  slug: string;
  /** SEO meta description */
  description: string;
  /** Markdown content */
  content: string;
  /** Optional short excerpt */
  excerpt?: string;
  /** Author name */
  author: string;
  /** Firebase Auth UID */
  authorId: string;
  /** Featured image URL from Firebase Storage */
  featuredImage?: string;
  /** Array of tags */
  tags: string[];
  /** Publication status */
  published: boolean;
  /** Estimated read time in minutes */
  readTime: number;
  /** Creation timestamp */
  createdAt: Timestamp;
  /** Last update timestamp */
  updatedAt: Timestamp;
  /** Publication timestamp */
  publishedAt?: Timestamp;
  /** View count */
  views?: number;
}

/**
 * Form data for creating/editing blog posts
 */
export interface BlogPostFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  excerpt?: string;
  author: string;
  featuredImage?: File | string;
  tags: string[];
  published: boolean;
}

/**
 * Blog post status for filtering
 */
export type BlogPostStatus = 'all' | 'published' | 'draft';

/**
 * Blog post filter options for admin
 */
export interface AdminBlogFilter {
  status: BlogPostStatus;
  searchQuery: string;
  tags: string[];
}
