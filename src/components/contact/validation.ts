/**
 * @module components/contact/validation
 * @description
 * Yup validation schema for ContactForm.
 * Defines validation rules for all form fields.
 *
 * @example
 * ```tsx
 * import { contactFormSchema } from './validation';
 * import { yupResolver } from '@hookform/resolvers/yup';
 *
 * const { control, handleSubmit } = useForm({
 *   resolver: yupResolver(contactFormSchema)
 * });
 * ```
 */

import * as yup from "yup";

/**
 * Contact form validation schema
 *
 * Defines validation rules for all contact form fields:
 * - name: Required, min 2 characters
 * - email: Required, valid email format
 * - subject: Required, min 5 characters
 * - projectType: Required
 * - budget: Optional
 * - timeline: Optional
 * - message: Required, min 20 characters
 *
 * @constant {yup.ObjectSchema}
 *
 * @example
 * ```tsx
 * import { contactFormSchema } from './validation';
 *
 * const resolver = yupResolver(contactFormSchema);
 * ```
 */
export const contactFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  subject: yup
    .string()
    .required("Subject is required")
    .min(5, "Subject must be at least 5 characters"),
  projectType: yup.string().required("Project type is required"),
  budget: yup.string(),
  timeline: yup.string(),
  message: yup
    .string()
    .required("Message is required")
    .min(20, "Message must be at least 20 characters"),
});
