/**
 * Type definitions for Contact page
 * @module pages/contact/types
 */

import type React from "react";

/**
 * Contact method configuration interface
 * Defines structure for contact method cards (email, LinkedIn, scheduling)
 *
 * @interface ContactMethod
 */
export interface ContactMethod {
  /** Display title for the contact method */
  title: string;
  /** Description text explaining the contact method */
  description: string;
  /** Action text or link text shown on the button */
  action: string;
  /** Icon component to display */
  icon: React.ReactNode;
  /** Brand color for the card styling */
  color: string;
  /** URL or mailto link for the contact method */
  link: string;
}

/**
 * Frequently Asked Question interface
 * Defines structure for FAQ accordion items
 *
 * @interface FAQ
 */
export interface FAQ {
  /** Question text displayed in accordion header */
  question: string;
  /** Answer text displayed in accordion body */
  answer: string;
  /** Category tag for grouping/filtering FAQs */
  category: string;
}
