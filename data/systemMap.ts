export interface SystemNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  core?: boolean;
  slug?: string;
}

export interface SystemEdge {
  from: string;
  to: string;
  delay: number;
}

export const nodes: SystemNode[] = [
  // Inputs (left lane) — alternating ±6px vertical offset
  { id: "meta-api",      label: "Meta Ads API",         x: 40,  y: 8,   w: 130, h: 34, slug: "meta-ads-intelligence" },
  { id: "applications",  label: "Applications",         x: 40,  y: 54,  w: 130, h: 34, slug: "ai-applicant-tracking-system" },
  { id: "marketplace",   label: "Marketplace listings", x: 40,  y: 106, w: 130, h: 34, slug: "marketplace-price-intelligence" },
  { id: "sales-stock",   label: "Sales & stock",        x: 40,  y: 152, w: 130, h: 34, slug: "soul-bands-inventory" },

  // Core (center)
  { id: "ai-core", label: "AI core", sublabel: "score · detect · brief", x: 420, y: 68, w: 160, h: 64, core: true },

  // Outputs (right lane) — alternating ±6px vertical offset
  { id: "briefing",      label: "Morning briefing",     x: 800, y: 8,   w: 130, h: 34, slug: "meta-ads-intelligence" },
  { id: "candidate-mail",label: "Candidate emails",     x: 800, y: 54,  w: 130, h: 34, slug: "ai-applicant-tracking-system" },
  { id: "alerts",        label: "Alerts",               x: 800, y: 106, w: 130, h: 34, slug: "meta-ads-intelligence" },
  { id: "dashboard",     label: "Owner's dashboard",    x: 800, y: 152, w: 130, h: 34, slug: "soul-bands-inventory" },
];

export const edges: SystemEdge[] = [
  // Inputs → Core
  { from: "meta-api",     to: "ai-core", delay: 0 },
  { from: "applications", to: "ai-core", delay: 0.7 },
  { from: "marketplace",  to: "ai-core", delay: 1.4 },
  { from: "sales-stock",  to: "ai-core", delay: 2.1 },

  // Core → Outputs
  { from: "ai-core", to: "briefing",       delay: 0 },
  { from: "ai-core", to: "candidate-mail", delay: 0.7 },
  { from: "ai-core", to: "alerts",         delay: 1.4 },
  { from: "ai-core", to: "dashboard",      delay: 2.1 },
];
