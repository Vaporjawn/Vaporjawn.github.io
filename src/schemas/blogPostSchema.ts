/**
 * Blog post validation schema
 * @module schemas/blogPostSchema
 */

import * as yup from 'yup';

/**
 * Yup validation schema for blog post form
 */
export const blogPostSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must not exceed 200 characters'),

  slug: yup
    .string()
    .required('Slug is required')
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must be lowercase letters, numbers, and hyphens only'
    )
    .min(3, 'Slug must be at least 3 characters')
    .max(200, 'Slug must not exceed 200 characters'),

  description: yup
    .string()
    .required('Description is required')
    .min(20, 'Description must be at least 20 characters')
    .max(300, 'Description must not exceed 300 characters'),

  content: yup
    .string()
    .required('Content is required')
    .min(100, 'Content must be at least 100 characters'),

  excerpt: yup
    .string()
    .max(500, 'Excerpt must not exceed 500 characters')
    .optional(),

  author: yup
    .string()
    .required('Author is required')
    .min(2, 'Author name must be at least 2 characters')
    .max(100, 'Author name must not exceed 100 characters'),

  tags: yup
    .array()
    .of(yup.string())
    .min(1, 'At least one tag is required')
    .max(10, 'Maximum 10 tags allowed'),

  published: yup
    .boolean()
    .required(),
}).required();

export type BlogPostSchemaType = yup.InferType<typeof blogPostSchema>;
