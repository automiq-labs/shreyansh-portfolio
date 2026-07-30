import type { ProjectStatus } from "../data/types";

const gold = "border-[#e8d5b0] text-[#e8d5b0]";
const muted = "border-[rgba(255,255,255,0.2)] text-[#888888]";

export function getStatusStyle(status: ProjectStatus): string {
  return status === "Live in production" ? gold : muted;
}

export function getMetaStyle(): string {
  return muted;
}
