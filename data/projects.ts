import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: 1,
    number: "01",
    name: "GutBut Trigger Tool",
    badge: "Live Product",
    badgeColor: "live",
    tagline: "Full-stack health intelligence app. Built and deployed in 5 days.",
    description:
      "Users log meals, symptoms, sleep, stress, and supplements daily. After 7 to 14 days, the system analyzes patterns, identifies potential triggers, and runs structured elimination experiments to confirm or rule each one out. Every verdict is backed by the user's own data. Built with multi-user auth, Row Level Security, insight caching, and deployed live on Vercel.",
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI GPT-4o-mini", "Vercel"],
    role: "Full-stack development, AI prompt engineering, database architecture, RLS security, deployment",
    link: "https://gutbut-trigger-tool.vercel.app",
    featured: true,
  },
  {
    id: 2,
    number: "02",
    name: "TalentScope: AI Talent Intelligence",
    badge: "Team Project",
    badgeColor: "team",
    tagline: "Candidate evaluation platform using Gemini and Claude.",
    description:
      "A platform that assesses job applicants using two AI models running in parallel, detecting contradictions in outputs and calibrating confidence scores. Handled GitHub version control, all Vercel deployments, QA testing on AI outputs, and researched company distress signal data used in the predictive hiring engine.",
    stack: ["Next.js", "Supabase", "Google Gemini", "Anthropic Claude", "Vercel"],
    role: "Collaborator, AI Systems & QA",
  },
  {
    id: 3,
    number: "03",
    name: "Inventory & Sales Automation System",
    badge: "Client Work",
    badgeColor: "client",
    tagline: "Live inventory and sales management for a retail jewellery brand.",
    description:
      "Built for Soul Bands, a retail jewellery business, and actively used in daily operations. Tracks stock levels, records every sale, auto-updates inventory after each transaction, tracks profit and loss, and sends automated notifications to customers via email and Instagram DM. Handed off and running without manual intervention.",
    stack: ["Google AppSheet", "Google Sheets", "n8n", "Email APIs", "Instagram Messaging"],
    role: "Designed and built full system",
  },
  {
    id: 4,
    number: "04",
    name: "AI Voice Receptionist & Telegram Assistant",
    badge: "Multi-System Build",
    badgeColor: "multi",
    tagline: "Two connected agents handling calls, tasks, and communications.",
    description:
      "The voice agent handles real inbound calls. It greets callers, identifies intent, answers business queries, checks live calendar availability, books appointments, and logs every call to a Google Sheet. The Telegram assistant accepts text and voice commands and executes tasks: sends emails, replies to threads, organizes the inbox, creates calendar events, and extracts structured candidate data from uploaded resumes into Google Sheets. When instructions are unclear, it asks follow-up questions.",
    stack: ["ElevenLabs", "n8n", "Google Calendar API", "Gmail API", "Telegram Bot API", "LLM"],
    role: "Designed and built end-to-end",
  },
  {
    id: 5,
    number: "05",
    name: "Gyanodaya Institute Content Strategy",
    badge: "Client Work",
    badgeColor: "client",
    tagline: "Full AI-driven content campaign for a coaching institute.",
    description:
      "Directed and executed a complete digital marketing strategy for a coaching institute targeting student enrollment in Jaipur. Generated 20+ visual assets using precise image-generation prompts with a consistent dark and gold brand aesthetic. Paired every visual with optimized copy, targeted local hashtags, and clear calls to action. Delivered as a ready-to-publish system the client could run independently.",
    stack: ["Google Gemini", "Social Media Platforms"],
    role: "AI Content Strategist",
  },
  {
    id: 6,
    number: "06",
    name: "AI Gmail Inbox Organizer",
    badge: "Automation",
    badgeColor: "auto",
    tagline: "Classifies, sorts, and drafts replies automatically.",
    description:
      "Connects to Gmail and classifies every incoming email into Personal, Sales, Social, Promotions, or Miscellaneous using a hybrid rule-based and AI system. Low-priority emails are marked as read. Sales emails are forwarded to the right person. Personal emails get a drafted reply. The inbox stays clean without any manual sorting.",
    stack: ["n8n", "Gmail API", "LLM"],
    role: "Designed and built using n8n",
  },
  {
    id: 7,
    number: "07",
    name: "AI Stock Market Analysis Agent",
    badge: "AI Agent",
    badgeColor: "agent",
    tagline: "Multi-source analysis with a Buy, Sell, or Hold recommendation.",
    description:
      "User inputs a stock name. The system converts it to the right ticker symbol, fetches real-time price data across multiple timeframes, analyzes recent news sentiment, and outputs a Buy, Sell, or Hold recommendation with a confidence score out of 10. Includes a chart visualization. For analysis and decision support only, not financial advice.",
    stack: ["n8n", "OpenAI", "Market Data APIs", "News APIs", "Chart Generation"],
    role: "Designed and built multi-source system",
  },
  {
    id: 8,
    number: "08",
    name: "RAG HR Knowledge Chatbot",
    badge: "RAG System",
    badgeColor: "rag",
    tagline: "Internal HR assistant that answers from company documents, not from guesswork.",
    description:
      "An internal chatbot that retrieves answers from a company's own knowledge base: policies, handbooks, and procedures. Built on a RAG pipeline so every answer comes from actual source material. Context-aware and memory-enabled across the conversation. Domain-adaptable to any organization's documents.",
    stack: ["VectorShift", "GPT-4", "Semantic Search", "Chat Memory"],
    role: "Designed and built RAG pipeline",
  },
  {
    id: 9,
    number: "09",
    name: "AI Resume Parser",
    badge: "Automation",
    badgeColor: "auto",
    tagline: "Extracts structured candidate data from any resume format.",
    description:
      "User uploads a resume via Telegram in any format: PDF, DOC, or image. The system extracts all key candidate data: name, email, phone, skills, work experience, education, projects, and certifications. Everything lands as a single structured row in Google Sheets. Confirmation sent back via Telegram instantly.",
    stack: ["n8n", "Telegram Bot API", "LLM", "Google Sheets", "CloudConvert"],
    role: "Designed and built full parsing pipeline",
  },
];
