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
  // Inputs (left lane)
  { id: "meta-api",      label: "Meta Ads API",         x: 40,  y: 10,  w: 140, h: 40, slug: "meta-ads-intelligence" },
  { id: "applications",  label: "Applications",         x: 40,  y: 72,  w: 140, h: 40, slug: "ai-applicant-tracking-system" },
  { id: "marketplace",   label: "Marketplace listings", x: 40,  y: 134, w: 140, h: 40, slug: "marketplace-price-intelligence" },
  { id: "sales-stock",   label: "Sales & stock",        x: 40,  y: 196, w: 140, h: 40, slug: "soul-bands-inventory" },

  // Core (center)
  { id: "ai-core", label: "AI core", sublabel: "score · detect · brief", x: 470, y: 85, w: 160, h: 70, core: true },

  // Outputs (right lane)
  { id: "briefing",      label: "Morning briefing",     x: 880, y: 10,  w: 140, h: 40, slug: "meta-ads-intelligence" },
  { id: "candidate-mail",label: "Candidate emails",     x: 880, y: 72,  w: 140, h: 40, slug: "ai-applicant-tracking-system" },
  { id: "alerts",        label: "Alerts",               x: 880, y: 134, w: 140, h: 40, slug: "meta-ads-intelligence" },
  { id: "dashboard",     label: "Owner's dashboard",    x: 880, y: 196, w: 140, h: 40, slug: "soul-bands-inventory" },
];

export const edges: SystemEdge[] = [
  // Inputs → Core
  { from: "meta-api",     to: "ai-core", delay: 0 },
  { from: "applications", to: "ai-core", delay: 0.4 },
  { from: "marketplace",  to: "ai-core", delay: 0.8 },
  { from: "sales-stock",  to: "ai-core", delay: 1.2 },

  // Core → Outputs
  { from: "ai-core", to: "briefing",       delay: 0.2 },
  { from: "ai-core", to: "candidate-mail", delay: 0.6 },
  { from: "ai-core", to: "alerts",         delay: 1.0 },
  { from: "ai-core", to: "dashboard",      delay: 1.4 },
];
