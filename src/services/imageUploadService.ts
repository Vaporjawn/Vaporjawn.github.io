/**
 * Image upload service for Firebase Storage
 * @module services/imageUploadService
 */

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  type UploadTask,
} from 'firebase/storage';
import { getFirebaseStorage } from '../backend/firebase';

/**
 * Upload progress callback
 */
export type UploadProgressCallback = (progress: number) => void;

/**
 * Allowed image file types
 */
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

/**
 * Maximum file size (5MB)
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Validate image file
 * @param file - File to validate
 * @throws {Error} If file is invalid
 */
function validateImageFile(file: File): void {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(
      `Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(', ')}`
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
  }
}

/**
 * Generate unique filename
 * @param originalName - Original file name
 * @returns Unique filename with timestamp
 */
function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const extension = originalName.split('.').pop();
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, '-');
  return `${sanitizedName}-${timestamp}.${extension}`;
}

/**
 * Upload blog featured image to Firebase Storage
 * @param file - Image file to upload
 * @param postId - Blog post ID for organizing images
 * @param onProgress - Optional progress callback
 * @returns Download URL of uploaded image
 */
export async function uploadBlogFeaturedImage(
  file: File,
  postId: string,
  onProgress?: UploadProgressCallback
): Promise<string> {
  validateImageFile(file);

  const storage = getFirebaseStorage();
  const filename = generateUniqueFilename(file.name);
  const storagePath = `blog-images/${postId}/featured-${filename}`;
  const storageRef = ref(storage, storagePath);

  return new Promise((resolve, reject) => {
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
      },
      (error) => {
        console.error('[ImageUpload] Upload failed:', error);
        reject(new Error(`Upload failed: ${error.message}`));
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}

/**
 * Upload blog content image to Firebase Storage
 * @param file - Image file to upload
 * @param postId - Blog post ID for organizing images
 * @param onProgress - Optional progress callback
 * @returns Download URL of uploaded image
 */
export async function uploadBlogContentImage(
  file: File,
  postId: string,
  onProgress?: UploadProgressCallback
): Promise<string> {
  validateImageFile(file);

  const storage = getFirebaseStorage();
  const filename = generateUniqueFilename(file.name);
  const storagePath = `blog-images/${postId}/content-${filename}`;
  const storageRef = ref(storage, storagePath);

  return new Promise((resolve, reject) => {
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
      },
      (error) => {
        console.error('[ImageUpload] Upload failed:', error);
        reject(new Error(`Upload failed: ${error.message}`));
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}

/**
 * Delete image from Firebase Storage
 * @param imageUrl - Full download URL of the image
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    const storage = getFirebaseStorage();

    // Extract path from URL
    const urlObj = new URL(imageUrl);
    const pathMatch = urlObj.pathname.match(/\/o\/(.+)\?/);

    if (!pathMatch) {
      throw new Error('Invalid image URL');
    }

    const path = decodeURIComponent(pathMatch[1]);
    const storageRef = ref(storage, path);

    await deleteObject(storageRef);
    console.log('[ImageUpload] Image deleted successfully:', path);
  } catch (error) {
    console.error('[ImageUpload] Failed to delete image:', error);
    throw error;
  }
}

/**
 * Delete all images for a blog post
 * @param postId - Blog post ID
 */
export async function deletePostImages(postId: string): Promise<void> {
  // Note: Firebase Storage doesn't support deleting entire folders directly
  // In production, you'd want to list all files and delete them individually
  // or use Cloud Functions to handle this
  console.log('[ImageUpload] Deleting images for post:', postId);
  // Implementation would require listing all files in the folder first
}
