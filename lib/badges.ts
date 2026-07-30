export function getBadgeStyle(color: string) {
  const styles: Record<string, string> = {
    live: "border-[#e8d5b0] text-[#e8d5b0]",
    team: "border-[rgba(255,255,255,0.2)] text-[#888888]",
    client: "border-[rgba(255,255,255,0.2)] text-[#888888]",
    multi: "border-[rgba(255,255,255,0.2)] text-[#888888]",
    auto: "border-[rgba(255,255,255,0.2)] text-[#888888]",
    agent: "border-[rgba(255,255,255,0.2)] text-[#888888]",
    rag: "border-[rgba(255,255,255,0.2)] text-[#888888]",
  };
  return styles[color] || styles.team;
}
