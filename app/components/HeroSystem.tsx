"use client";

import { useState, useCallback } from "react";
import { nodes, edges } from "../../data/systemMap";
import type { SystemNode } from "../../data/systemMap";
import { projects } from "../../data/projects";

function getEdgePath(from: SystemNode, to: SystemNode): string {
  const x1 = from.x + from.w;
  const y1 = from.y + from.h / 2;
  const x2 = to.x;
  const y2 = to.y + to.h / 2;

  if (from.core) {
    // Core → output: right side of core to left side of output
    const cx1 = from.x + from.w;
    const cy1 = from.y + from.h / 2;
    const midX = cx1 + (x2 - cx1) / 2;
    return `M${cx1},${cy1} L${midX},${cy1} L${midX},${y2} L${x2},${y2}`;
  }

  if (to.core) {
    // Input → core: right side of input to left side of core
    const cx2 = to.x;
    const cy2 = to.y + to.h / 2;
    const midX = x1 + (cx2 - x1) / 2;
    return `M${x1},${y1} L${midX},${y1} L${midX},${cy2} L${cx2},${cy2}`;
  }

  return `M${x1},${y1} L${x2},${y2}`;
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

  const handleClick = useCallback((node: SystemNode) => {
    const target = node.slug || "projects";
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="hero-system-wrap" style={{ position: "relative" }}>
      <style>{`
        .hero-system-wrap { display: none; }
        @media (min-width: 1024px) {
          .hero-system-wrap { display: block; }
        }

        .sys-node { cursor: pointer; outline: none; }
        .sys-node:hover rect,
        .sys-node:focus-visible rect { stroke-opacity: 1; }

        @media (prefers-reduced-motion: no-preference) {
          .sys-edge {
            animation: edgeFlow 3s linear infinite;
          }
          .sys-pulse {
            animation: pulseMove 3s ease-in-out infinite;
          }
        }

        @keyframes edgeFlow {
          to { stroke-dashoffset: -30; }
        }
        @keyframes pulseMove {
          0%   { opacity: 0; offset-distance: 0%; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { opacity: 0; offset-distance: 100%; }
        }
      `}</style>

      <svg
        viewBox="0 0 1100 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        style={{ width: "100%", height: "auto" }}
      >
        <title>Architecture diagram showing how data flows through Shreyansh&apos;s production systems</title>

        {/* Edges */}
        {edges.map((edge) => {
          const from = nodes.find((n) => n.id === edge.from)!;
          const to = nodes.find((n) => n.id === edge.to)!;
          const path = getEdgePath(from, to);
          const edgeId = `edge-${edge.from}-${edge.to}`;
          return (
            <g key={edgeId}>
              <path
                d={path}
                stroke="#e8d5b0"
                strokeOpacity={0.35}
                strokeWidth={1}
                strokeDasharray="4 6"
                fill="none"
                className="sys-edge"
                style={{ animationDelay: `${edge.delay}s` }}
              />
              <circle
                r={3}
                fill="#e8d5b0"
                className="sys-pulse"
                style={{
                  offsetPath: `path('${path}')`,
                  animationDelay: `${edge.delay}s`,
                }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const tooltipText = getTooltipText(node);
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
                const scaleX = rect.width / 1100;
                const scaleY = rect.height / 260;
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
                const scaleX = rect.width / 1100;
                const scaleY = rect.height / 260;
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
                strokeOpacity={0.6}
              />
              <text
                x={node.x + node.w / 2}
                y={node.sublabel ? node.y + node.h / 2 - 6 : node.y + node.h / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#e8d5b0"
                fontSize={12}
                fontFamily="'Inter', sans-serif"
              >
                {node.label}
              </text>
              {node.sublabel && (
                <text
                  x={node.x + node.w / 2}
                  y={node.y + node.h / 2 + 12}
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
