/**
 * Read time estimation utility
 * @module utils/readTimeEstimate
 */

/**
 * Calculate estimated read time for content
 * Based on average reading speed of 200 words per minute
 * @param content - Markdown or plain text content
 * @returns Estimated read time in minutes
 * @example
 * calculateReadTime("Lorem ipsum dolor sit amet...") // 5
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;

  // Remove markdown syntax for more accurate word count
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '')         // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '')  // Remove links
    .replace(/[#*_~]/g, '');         // Remove markdown symbols

  const words = cleanContent.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);

  return readTime || 1; // Minimum 1 minute
}
