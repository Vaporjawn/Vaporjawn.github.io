/**
 * Constants for Contact page
 * @module pages/contact/constants
 */

import {
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import {
  VaporwavePink,
  VaporwaveBlue,
  VaporwaveGreen,
} from "../../colors";

import type { ContactMethod, FAQ } from "./types";

/**
 * Contact method configurations
 * Defines all available contact methods with their styling and links
 *
 * @constant
 * @param {string} email - User's email address for dynamic mailto link
 * @returns {ContactMethod[]} Array of contact method configurations
 *
 * @example
 * ```tsx
 * const methods = getContactMethods('user@example.com');
 * ```
 */
export const getContactMethods = (email: string): ContactMethod[] => [
  {
    title: "Email",
    description: "Send me an email anytime",
    action: email,
    icon: <EmailIcon sx={{ fontSize: 32 }} />,
    color: VaporwavePink,
    link: `mailto:${email}`,
  },
  {
    title: "LinkedIn",
    description: "Connect with me professionally",
    action: "/in/victorwilliams",
    icon: <LinkedInIcon sx={{ fontSize: 32 }} />,
    color: VaporwaveBlue,
    link: "https://linkedin.com/in/victorwilliams",
  },
  {
    title: "Schedule a Call",
    description: "Book a 30-min consultation",
    action: "cal.com/vaporjawn",
    icon: <ScheduleIcon sx={{ fontSize: 32 }} />,
    color: VaporwaveGreen,
    link: "https://cal.com/vaporjawn",
  },
];

/**
 * Frequently Asked Questions data
 * Comprehensive FAQ content for Contact page
 *
 * @constant
 * @type {FAQ[]}
 */
export const FAQ_DATA: FAQ[] = [
  {
    question: "What do you actually do as a software engineer?",
    answer:
      "I build full-stack systems end to end—frontend, backend, infra, and the glue in between. Web, mobile, cloud, APIs, CI/CD. If it ships, scales, and survives production, I've probably touched it.",
    category: "role",
  },
  {
    question: "What level are you operating at right now?",
    answer:
      "Senior+ territory. I've led teams, owned architectures, mentored engineers, and stepped into roles like Tech Lead, Project Manager, Solutions Architect, and DevOps when the situation demanded it. Titles flex; responsibility doesn't.",
    category: "experience",
  },
  {
    question: "What kind of problems do you like solving?",
    answer:
      "Messy ones. Legacy systems, tech debt, scaling bottlenecks, unclear requirements, and \"this needs to work yesterday.\" I specialize in turning chaos into systems that people can actually rely on.",
    category: "expertise",
  },
  {
    question: "What industries have you worked in?",
    answer:
      "Fintech, food tech, marketplaces, enterprise platforms, SaaS, and internal tooling. From banking services to restaurant POS integrations to Fortune 500 testing platforms. Variety sharpened the blade.",
    category: "background",
  },
  {
    question: "What's your strongest technical stack?",
    answer:
      "Modern JavaScript/TypeScript ecosystems (React, Node), plus .NET, Go, Python, Java, SQL/Postgres, Docker, and cloud platforms like AWS and Azure. I adapt fast, but I don't fake fundamentals.",
    category: "technical",
  },
  {
    question: "Do you prefer frontend or backend?",
    answer:
      "Both. Frontend for user empathy and experience. Backend for power, scale, and correctness. Full-stack isn't a buzzword to me—it's leverage.",
    category: "specialization",
  },
  {
    question: "What separates you from other senior engineers?",
    answer:
      "I think in systems, not tickets. I care about business impact, team velocity, and long-term maintainability—not just getting green checkmarks in Jira. I fix root causes instead of babysitting symptoms.",
    category: "differentiator",
  },
  {
    question: "Have you led or managed other engineers?",
    answer:
      "Yes. I've led teams, mentored juniors, coordinated across countries, and reduced operational load (like cutting open tickets by 87%). Leadership to me means making everyone else better.",
    category: "leadership",
  },
  {
    question: "What kind of environments do you thrive in?",
    answer:
      "High-trust, high-ownership environments. Places where engineers are expected to think, not just execute. I do best where clarity, accountability, and ambition coexist.",
    category: "culture",
  },
  {
    question: "What are you looking for next?",
    answer:
      "Work that matters. Teams that value craftsmanship. Problems that stretch me. I'm not chasing hype—I'm building durable things with people who care about doing it right.",
    category: "opportunity",
  },
];
