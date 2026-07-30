"use client";

import { useState, useCallback, useEffect } from "react";
import { nodes, edges } from "../../data/systemMap";
import type { SystemNode } from "../../data/systemMap";
import { projects } from "../../data/projects";

const VB_W = 1000;
const VB_H = 200;

function getEdgePath(from: SystemNode, to: SystemNode): string {
  const x1 = from.x + from.w;
  const y1 = from.y + from.h / 2;
  const x2 = to.x;
  const y2 = to.y + to.h / 2;
  const dx = (x2 - x1) * 0.4;
  return `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
}

function getTooltipText(node: SystemNode): string {
  if (!node.slug) return "All systems";
  const project = projects.find((p) => p.slug === node.slug);
  if (!project) return node.label;
  return `${project.name} — ${project.status}`;
}

export default function HeroSystem() {
  const [hover, setHover] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleClick = useCallback((node: SystemNode) => {
    const target = node.slug || "projects";
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      className="hero-system-wrap"
      style={{ position: "relative", maxWidth: "1200px", margin: "0 auto" }}
    >
      <style>{`
        .hero-system-wrap { display: none; }
        @media (min-width: 1024px) {
          .hero-system-wrap { display: block; }
        }
        .sys-node { cursor: pointer; outline: none; }
        .sys-node:hover rect,
        .sys-node:focus-visible rect { stroke-opacity: 1 !important; }
      `}</style>

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        style={{ width: "100%", height: "auto" }}
      >
        <title>Architecture diagram showing how data flows through Shreyansh&apos;s production systems</title>

        {/* Edges + pulses */}
        {edges.map((edge) => {
          const from = nodes.find((n) => n.id === edge.from)!;
          const to = nodes.find((n) => n.id === edge.to)!;
          const d = getEdgePath(from, to);
          const key = `${edge.from}-${edge.to}`;
          return (
            <g key={key}>
              <path
                d={d}
                stroke="#e8d5b0"
                strokeOpacity={0.18}
                strokeWidth={1}
                fill="none"
              />
              {!reduceMotion && (
                <>
                  <circle r={2.5} fill="#e8d5b0" opacity={0.9}>
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      path={d}
                      begin={`${edge.delay}s`}
                    />
                  </circle>
                  <circle r={2.5} fill="#e8d5b0" opacity={0.5}>
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      path={d}
                      begin={`${edge.delay + 1.5}s`}
                    />
                  </circle>
                </>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const tooltipText = getTooltipText(node);
          const fontSize = node.core ? 13 : 11;
          return (
            <g
              key={node.id}
              className="sys-node"
              tabIndex={0}
              role="button"
              aria-label={tooltipText}
              onClick={() => handleClick(node)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleClick(node);
              }}
              onMouseEnter={(e) => {
                const svg = e.currentTarget.closest("svg");
                if (!svg) return;
                const rect = svg.getBoundingClientRect();
                const cx = node.x + node.w / 2;
                const cy = node.y;
                const scaleX = rect.width / VB_W;
                const scaleY = rect.height / VB_H;
                setHover({
                  text: tooltipText,
                  x: cx * scaleX,
                  y: cy * scaleY - 8,
                });
              }}
              onMouseLeave={() => setHover(null)}
              onFocus={(e) => {
                const svg = e.currentTarget.closest("svg");
                if (!svg) return;
                const rect = svg.getBoundingClientRect();
                const cx = node.x + node.w / 2;
                const cy = node.y;
                const scaleX = rect.width / VB_W;
                const scaleY = rect.height / VB_H;
                setHover({
                  text: tooltipText,
                  x: cx * scaleX,
                  y: cy * scaleY - 8,
                });
              }}
              onBlur={() => setHover(null)}
            >
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx={8}
                fill="#141414"
                stroke="#e8d5b0"
                strokeWidth={node.core ? 1 : 0.5}
                strokeOpacity={node.core ? 1 : 0.5}
              />
              <text
                x={node.x + node.w / 2}
                y={node.sublabel ? node.y + node.h / 2 - 7 : node.y + node.h / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#e8d5b0"
                fontSize={fontSize}
                fontFamily="'Inter', sans-serif"
              >
                {node.label}
              </text>
              {node.sublabel && (
                <text
                  x={node.x + node.w / 2}
                  y={node.y + node.h / 2 + 11}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#777777"
                  fontSize={10}
                  fontFamily="'Inter', sans-serif"
                >
                  {node.sublabel}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hover && (
        <div
          style={{
            position: "absolute",
            left: hover.x,
            top: hover.y,
            transform: "translate(-50%, -100%)",
            background: "rgba(20,20,20,0.95)",
            border: "0.5px solid rgba(255,255,255,0.1)",
            borderRadius: "6px",
            padding: "5px 10px",
            color: "#cccccc",
            fontSize: "12px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {hover.text}
        </div>
      )}
    </div>
  );
}
