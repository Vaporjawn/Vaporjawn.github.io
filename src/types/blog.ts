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
  sortBy?: 'date' | 'title' | 'readTime';
  sortOrder?: 'asc' | 'desc';
}
