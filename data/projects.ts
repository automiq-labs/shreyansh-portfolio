import type { Project } from "./types";

export const projects: Project[] = [
  // ---------- FEATURED ----------
  {
    id: 1,
    slug: "soul-bands-inventory",
    name: "Inventory & Sales Automation System",
    tagline: "Live inventory and sales operations for a retail jewellery brand.",
    description:
      "Built for Soul Bands, a retail jewellery business, and actively used in daily operations. Tracks stock levels, records every sale, auto-updates inventory after each transaction, tracks profit and loss, and sends automated notifications to customers via email and Instagram DM. Handed off to the client and running without my involvement.",
    stack: ["Google AppSheet", "Google Sheets", "n8n", "Email APIs", "Instagram Messaging"],
    role: "Designed and built the full system",
    status: "Handed off",
    type: "Client work",
    featured: true,
  },
  {
    id: 2,
    slug: "ai-applicant-tracking-system",
    name: "AI Applicant Tracking System",
    tagline: "Careers page, application pipeline, and AI resume scoring in one system.",
    description:
      "A full hiring system built end to end: a public careers page, an 18-field application form, and a 10-stage admin pipeline. Resumes are scored against the real job description with schema-validated AI output, so the result is always structured data rather than free text. Rejection, assignment, and interview emails send automatically from templates the HR team edits themselves. Role management is fully HR-autonomous, with no developer in the loop after handover.",
    stack: ["Next.js 16", "TypeScript", "Supabase", "Claude Haiku", "n8n", "Vercel"],
    role: "Sole developer, architecture through deployment",
    status: "Live in production",
    type: "Employment",
    speed: "Shipped in 2 weeks",
    featured: true,
  },
  {
    id: 3,
    slug: "meta-ads-intelligence",
    name: "Meta Ads Intelligence Dashboard",
    tagline: "Reads live ad data every morning and says what changed and what to do.",
    description:
      "A multi-account dashboard that pulls live campaign data and turns it into decisions. It writes an AI-generated briefing every morning, runs an alert engine of independent detectors that flag problems as they appear, and frames each alert as a recommended action rather than a raw metric. Includes a festival strategy generator, an audience health monitor, and a streaming AI chat that answers questions against live data instead of a static snapshot. Used daily by the team it was built for.",
    stack: ["Next.js 16", "TypeScript", "Supabase", "Anthropic API", "n8n", "Vercel"],
    role: "Sole developer, architecture through deployment",
    status: "Live in production",
    type: "Employment",
    speed: "Shipped in 2 weeks",
    featured: true,
  },

  // ---------- OPERATIONS & INTELLIGENCE ----------
  {
    id: 4,
    slug: "procurement-warehouse-platform",
    name: "Procurement & Warehouse Platform",
    tagline: "Purchase orders, vendors, and warehouse receipts in one system with live discrepancy tracking.",
    description:
      "An internal platform covering purchase orders, vendor records, warehouse receipts, and payments, with a live view of the gap between what was ordered and what actually arrived. The warehouse role is mobile-first because it is used standing at a shelf. The admin role is desktop. Access is enforced at the database layer rather than in the interface, so a permission cannot be bypassed by reaching the API directly.",
    stack: ["Next.js 14", "TypeScript", "Supabase", "PostgreSQL RLS", "Vercel"],
    role: "Sole developer, architecture through deployment",
    status: "Live in production",
    type: "Employment",
    speed: "Shipped in 2 weeks",
    group: "Operations & Intelligence",
  },
  {
    id: 5,
    slug: "marketplace-price-intelligence",
    name: "Marketplace Price Intelligence",
    tagline: "One view of price and stock across Amazon, Flipkart, and Shopify.",
    description:
      "Marketplace listings fail quietly. A product goes out of stock, a price drifts out of line with the other channels, a listing stops appearing, and nobody finds out until sales drop. This tool collects price and stock state across all three channels into a single view and surfaces the mismatches, so a silent failure becomes something someone can see the same day it happens.",
    stack: ["Playwright", "Node.js", "Next.js", "TypeScript", "Supabase"],
    role: "Sole developer, architecture through deployment",
    status: "Live in production",
    type: "Employment",
    group: "Operations & Intelligence",
  },

  // ---------- AI AGENTS & ASSISTANTS ----------
  {
    id: 6,
    slug: "voice-receptionist-telegram-assistant",
    name: "AI Voice Receptionist & Telegram Assistant",
    tagline: "Two connected agents handling calls, tasks, and communications.",
    description:
      "The voice agent handles real inbound calls. It greets callers, identifies intent, answers business queries, checks live calendar availability, books appointments, and logs every call to a Google Sheet. The Telegram assistant accepts text and voice commands and executes tasks: sends emails, replies to threads, organizes the inbox, creates calendar events, and extracts structured candidate data from uploaded resumes into Google Sheets. When instructions are unclear, it asks a follow-up question instead of guessing.",
    stack: ["ElevenLabs", "n8n", "Google Calendar API", "Gmail API", "Telegram Bot API", "LLM"],
    role: "Designed and built end to end",
    status: "Working build",
    type: "Own product",
    group: "AI Agents & Assistants",
  },
  {
    id: 7,
    slug: "gmail-inbox-organizer",
    name: "AI Gmail Inbox Organizer",
    tagline: "Classifies, sorts, and drafts replies without manual triage.",
    description:
      "Connects to Gmail and classifies every incoming email into Personal, Sales, Social, Promotions, or Miscellaneous using a hybrid of rules and AI. Rules handle the obvious cases cheaply and the model only sees what is genuinely ambiguous. Low-priority mail is marked read, sales mail is forwarded to the right person, and personal mail gets a drafted reply waiting in the thread.",
    stack: ["n8n", "Gmail API", "LLM"],
    role: "Designed and built using n8n",
    status: "Working build",
    type: "Own product",
    group: "AI Agents & Assistants",
  },
  {
    id: 8,
    slug: "ai-resume-parser",
    name: "AI Resume Parser",
    tagline: "Extracts structured candidate data from any resume format.",
    description:
      "A resume arrives via Telegram as a PDF, a DOC, or a photo. The system extracts name, email, phone, skills, work history, education, projects, and certifications, and writes all of it as a single structured row in Google Sheets. Confirmation goes back to the sender immediately, so nobody has to check whether it worked.",
    stack: ["n8n", "Telegram Bot API", "LLM", "Google Sheets", "CloudConvert"],
    role: "Designed and built the full parsing pipeline",
    status: "Working build",
    type: "Own product",
    group: "AI Agents & Assistants",
  },
  {
    id: 9,
    slug: "rag-hr-knowledge-chatbot",
    name: "RAG HR Knowledge Chatbot",
    tagline: "Answers from the company's own documents, not from guesswork.",
    description:
      "An internal assistant that retrieves answers from an organization's own policies, handbooks, and procedures. Built on a retrieval pipeline so every answer traces back to actual source material rather than model recall, which is the difference between a useful HR tool and a liability. Context-aware across a conversation and adaptable to any document set.",
    stack: ["VectorShift", "GPT-4", "Semantic Search", "Chat Memory"],
    role: "Designed and built the retrieval pipeline",
    status: "Working build",
    type: "Own product",
    group: "AI Agents & Assistants",
  },
  {
    id: 10,
    slug: "stock-analysis-agent",
    name: "AI Stock Market Analysis Agent",
    tagline: "Multi-source analysis with a Buy, Sell, or Hold call and a confidence score.",
    description:
      "Takes a stock name, resolves it to the correct ticker, pulls price data across multiple timeframes, reads recent news sentiment, and returns a Buy, Sell, or Hold call with a confidence score out of 10 and a chart. Built as an analysis and decision-support tool, not financial advice.",
    stack: ["n8n", "OpenAI", "Market Data APIs", "News APIs", "Chart Generation"],
    role: "Designed and built the multi-source system",
    status: "Working build",
    type: "Own product",
    group: "AI Agents & Assistants",
  },

  // ---------- PRODUCTS & PLATFORMS ----------
  {
    id: 11,
    slug: "gutbut-trigger-tool",
    name: "GutBut Trigger Tool",
    tagline: "Finds food and lifestyle triggers from a user's own logged data.",
    description:
      "Users log meals, symptoms, sleep, stress, and supplements daily. After 7 to 14 days the system analyzes patterns, identifies candidate triggers, and runs structured elimination experiments to confirm or rule each one out. Every verdict is backed by that user's own data rather than general advice. Built with multi-user auth, row level security, and insight caching so repeat analysis is cheap.",
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI GPT-4o-mini", "Vercel"],
    role: "Full-stack development, prompt design, database architecture, deployment",
    status: "Live in production",
    type: "Own product",
    speed: "Built in 5 days",
    group: "Products & Platforms",
    link: "https://gutbut-trigger-tool.vercel.app",
  },
  {
    id: 12,
    slug: "kanoongo-family-directory",
    name: "Kanoongo Family Directory",
    tagline: "Bilingual private directory with role-based editing and a full audit trail.",
    description:
      "A private bilingual directory for an extended family. Names transliterate automatically between scripts with a fallback provider when the primary one fails. Duplicate prevention is enforced at the database layer rather than in the form, so two people submitting the same record at the same time cannot both succeed. Editing is role-based with audit-logged admin overrides, and every change writes a JSONB snapshot so any record can be restored to a previous state. Not publicly linked: it holds personal data belonging to private individuals.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    role: "Sole developer, architecture through deployment",
    status: "Live in production",
    type: "Own product",
    group: "Products & Platforms",
  },

  // ---------- WEB & BRAND ----------
  {
    id: 13,
    slug: "lodha-and-sons",
    name: "Lodha & Sons",
    tagline: "Website for a jewellery manufacturer.",
    description:
      "A marketing site for a jewellery manufacturing business, covering craft, catalogue presentation, and enquiry capture. Built and shipped as a complete handover with the client able to request changes directly.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    role: "Design and build",
    status: "Live in production",
    type: "Client work",
    group: "Web & Brand",
    // link: "TODO — Shreyansh to supply the live URL
  },
  {
    id: 14,
    slug: "woxxy",
    name: "Woxxy",
    tagline: "Website for a D2C skincare brand.",
    description:
      "A brand site for a skincare label on its own domain, built around product storytelling and a clear route to enquiry. Shipped and live.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    role: "Design and build",
    status: "Live in production",
    type: "Client work",
    group: "Web & Brand",
    link: "https://woxxy.co.in",
  },
  {
    id: 15,
    slug: "gyanodaya-content-campaign",
    name: "Gyanodaya Institute Content Campaign",
    tagline: "AI-produced content system a coaching institute could run without me.",
    description:
      "Directed and executed a full content campaign for a coaching institute targeting student enrollment in Jaipur. Produced 20+ visual assets with a consistent dark and gold identity, each paired with written copy, local targeting, and a clear next step. Delivered as a system the client publishes independently rather than a batch of files that runs out.",
    stack: ["Google Gemini", "Social Media Platforms"],
    role: "AI content strategy and production",
    status: "Delivered",
    type: "Client work",
    group: "Web & Brand",
  },
];
