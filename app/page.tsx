"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projects } from "../data/projects";
import { services } from "../data/services";
import { skills } from "../data/skills";
import { certifications } from "../data/certifications";
import { getStatusStyle, getMetaStyle } from "../lib/badges";
import HeroSystem from "./components/HeroSystem";

// ── FADE IN HOOK ──
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── MAIN COMPONENT ──
export default function Home() {
  const [openProject, setOpenProject] = useState<number | null>(1);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleProject = (id: number) => {
    setOpenProject(openProject === id ? null : id);
  };

  const aboutRef = useFadeIn();
  const projectsRef = useFadeIn();
  const servicesRef = useFadeIn();
  const skillsRef = useFadeIn();
  const experienceRef = useFadeIn();
  const certRef = useFadeIn();
  const contactRef = useFadeIn();

  return (
    <main
      style={{
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        /* ── MOBILE RESET ── */
        * { box-sizing: border-box; }

        /* ── NAV ── */
        .nav-links { display: flex; align-items: center; gap: 24px; }

        /* ── HERO ── */

        /* ── ABOUT ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }
        .about-info-row {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 20px;
          padding: 16px 0;
          border-bottom: 0.5px solid rgba(255,255,255,0.05);
          align-items: start;
        }

        /* ── PROJECTS ── */
        .project-header-row {
          display: grid;
          grid-template-columns: 48px 1fr 160px 24px;
          gap: 16px;
          padding: 0 20px 12px;
          border-bottom: 0.5px solid rgba(255,255,255,0.06);
          margin-bottom: 4px;
        }
        .project-row-btn {
          display: grid;
          grid-template-columns: 48px 1fr 160px 24px;
          gap: 16px;
          padding: 20px;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          align-items: center;
        }
        .project-col-cat { display: block; }
        .project-expanded-inner {
          padding: 0 20px 28px;
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 40px;
        }

        /* ── SERVICES ── */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border: 0.5px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          overflow: hidden;
        }
        .service-cell {
          padding: 28px 24px;
          transition: background 0.2s ease;
          cursor: default;
          border-bottom: none;
          border-right: none;
        }
        /* Desktop: right borders on all except every 4th */
        .service-cell:not(:nth-child(4n)) { border-right: 0.5px solid rgba(255,255,255,0.06); }
        /* Desktop: bottom borders on top row */
        .service-cell:nth-child(-n+4) { border-bottom: 0.5px solid rgba(255,255,255,0.06); }

        /* ── SKILLS ── */
        .skills-row {
          display: grid;
          grid-template-columns: 160px 1fr;
          gap: 24px;
          padding: 20px 0;
          border-bottom: 0.5px solid rgba(255,255,255,0.05);
          align-items: start;
        }

        /* ── CERT ── */
        .cert-row {
          display: grid;
          grid-template-columns: 110px 1fr auto;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 0.5px solid rgba(255,255,255,0.05);
          align-items: center;
        }
        .cert-date { display: block; }

        /* ── HERO BUTTONS ── */
        .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }

        /* ── CONTACT ── */
        .contact-cards {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 40px;
        }
        .contact-btns {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .social-links {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        /* ── FOOTER ── */
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ══════════════════════════════════════
           TABLET — 768px and below
        ══════════════════════════════════════ */
        @media (max-width: 768px) {

          /* NAV */
          .nav-links { display: none; }

          /* HERO */
          .hero-section { padding: 100px 24px 60px !important; min-height: auto !important; }

          /* HERO BUTTONS */
          .hero-btns { flex-direction: column; align-items: stretch; }
          .hero-btns a { text-align: center; width: 100%; }

          /* ABOUT */
          .about-section { padding: 60px 24px !important; }
          .about-grid { grid-template-columns: 1fr; gap: 32px; }
          .about-info-row { grid-template-columns: 90px 1fr; gap: 12px; }
          .about-photo { max-width: 320px; }

          /* PROJECTS */
          .projects-section { padding: 60px 24px !important; }
          .project-header-row { display: none; }
          .project-row-btn {
            grid-template-columns: 36px 1fr 24px;
            gap: 10px;
            padding: 16px 12px;
          }
          .project-col-cat { display: none; }
          .project-expanded-inner {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 0 12px 24px;
          }

          /* SERVICES */
          .services-section { padding: 60px 24px !important; }
          .services-grid { grid-template-columns: 1fr; }
          .service-cell { padding: 20px 16px; border-right: none !important; }
          .service-cell:nth-child(-n+4) { border-bottom: none; }
          .service-cell:not(:last-child) { border-bottom: 0.5px solid rgba(255,255,255,0.06) !important; }

          /* SKILLS */
          .skills-section { padding: 60px 24px !important; }
          .skills-row { grid-template-columns: 1fr; gap: 10px; }

          /* CERT */
          .cert-section { padding: 60px 24px !important; }
          .cert-row { grid-template-columns: 90px 1fr; gap: 12px; }
          .cert-date { display: none; }

          /* CONTACT */
          .contact-section { padding: 60px 24px !important; }
          .contact-cards { grid-template-columns: 1fr; gap: 10px; }
          .contact-btns { flex-direction: column; align-items: stretch; }
          .contact-btns a { text-align: center; }

          /* FOOTER */
          .footer-inner { flex-direction: column; gap: 8px; text-align: center; }
        }

        /* ══════════════════════════════════════
           SMALL MOBILE — 480px and below
        ══════════════════════════════════════ */
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── NAVIGATION ── */}
      <nav
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          width: "min(780px, calc(100% - 40px))",
          background: scrolled
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.03)",
          border: "0.5px solid rgba(255,255,255,0.1)",
          borderRadius: "100px",
          padding: "10px 20px",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.3s ease",
        }}
      >
        <span style={{ color: "#f2f2f2", fontSize: "15px", fontWeight: 400, whiteSpace: "nowrap" }}>
          Shreyansh Kanoongo
        </span>
        <div className="nav-links">
          {[
            { label: "About", href: "#about" },
            { label: "Work", href: "#projects" },
            { label: "Experience", href: "#experience" },
            { label: "Skills", href: "#skills" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                color: "#777777",
                fontSize: "15px",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#cccccc")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#777777")
              }
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              color: "#e8d5b0",
              fontSize: "15px",
              textDecoration: "none",
              border: "0.5px solid rgba(232,213,176,0.4)",
              borderRadius: "100px",
              padding: "5px 16px",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "rgba(232,213,176,0.8)";
              (e.target as HTMLElement).style.background = "rgba(232,213,176,0.05)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = "rgba(232,213,176,0.4)";
              (e.target as HTMLElement).style.background = "transparent";
            }}
          >
            Start a project
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="home"
        className="hero-section"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 80px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Text block */}
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              color: "#aaaaaa",
              fontSize: "15px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            AI Automation &amp; Systems Developer · Jaipur, India
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,255,255,0.04)",
              border: "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: "100px",
              padding: "5px 12px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#e8d5b0",
                display: "inline-block",
              }}
            />
            <span style={{ color: "#999999", fontSize: "15px" }}>
              Available for projects
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            I build AI systems that{" "}
            <span style={{ color: "#e8d5b0" }}>actually</span> work.
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#999999",
              marginBottom: "6px",
              fontWeight: 400,
            }}
          >
            Not demos. Not experiments.
          </p>
          <p
            style={{
              fontSize: "16px",
              color: "#aaaaaa",
              marginBottom: "36px",
              fontWeight: 400,
            }}
          >
            Systems that execute.
          </p>

          <div className="hero-btns" style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="#projects"
              style={{
                background: "#ffffff",
                color: "#0a0a0a",
                borderRadius: "100px",
                padding: "11px 28px",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "opacity 0.2s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.opacity = "0.85")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.opacity = "1")
              }
            >
              See My Work
            </a>
            <a
              href="#contact"
              style={{
                border: "0.5px solid rgba(255,255,255,0.15)",
                color: "#888888",
                borderRadius: "100px",
                padding: "11px 28px",
                fontSize: "15px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                (e.target as HTMLElement).style.color = "#cccccc";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                (e.target as HTMLElement).style.color = "#cccccc";
              }}
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            marginTop: "56px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "20px", fontWeight: 300, color: "#ffffff" }}>15</span>
            <span style={{ fontSize: "12px", color: "#aaaaaa", textTransform: "uppercase", letterSpacing: "1.5px" }}>Systems Built</span>
          </span>
          <span style={{ color: "#444444", fontSize: "14px" }}>·</span>
          <span style={{ display: "inline-flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "20px", fontWeight: 300, color: "#ffffff" }}>9</span>
            <span style={{ fontSize: "12px", color: "#aaaaaa", textTransform: "uppercase", letterSpacing: "1.5px" }}>Live in Production</span>
          </span>
          <span style={{ color: "#444444", fontSize: "14px" }}>·</span>
          <span style={{ display: "inline-flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "20px", fontWeight: 300, color: "#ffffff" }}>2-Week</span>
            <span style={{ fontSize: "12px", color: "#aaaaaa", textTransform: "uppercase", letterSpacing: "1.5px" }}>Average Build</span>
          </span>
        </div>

        {/* System diagram */}
        <div style={{ marginTop: "72px", maxWidth: "1200px", width: "100%", margin: "72px auto 0" }}>
          <HeroSystem />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        className="about-section"
        ref={aboutRef}
        style={{
          background: "#0f0f0f",
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          padding: "80px clamp(24px, 5vw, 80px)",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              color: "#aaaaaa",
              fontSize: "15px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "40px",
            }}
          >
            About
          </p>

          {/* Philosophy flow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "40px",
            }}
          >
            {["Input", "Understanding", "Decision", "Action", "Output"].map(
              (word, i, arr) => (
                <span key={word} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      fontSize: "clamp(15px, 2.5vw, 22px)",
                      fontWeight: 300,
                      color: "#ffffff",
                    }}
                  >
                    {word}
                  </span>
                  {i < arr.length - 1 && (
                    <span style={{ color: "#e8d5b0", fontSize: "18px" }}>
                      →
                    </span>
                  )}
                </span>
              )
            )}
          </div>

          <div className="about-grid">
            <div>
              <p
                style={{
                  color: "#888888",
                  fontSize: "14px",
                  lineHeight: 1.9,
                  marginBottom: "16px",
                }}
              >
                I started in sales and marketing, which means before I write a line of code I ask what problem this solves, who feels it, and what fixed actually looks like.
              </p>
              <p
                style={{
                  color: "#888888",
                  fontSize: "14px",
                  lineHeight: 1.9,
                  marginBottom: "16px",
                }}
              >
                Two years working directly with businesses taught me where operations break and what people actually need from a system. The technical part is how I get there. The outcome is the only thing that gets judged.
              </p>
              <p
                style={{
                  color: "#777777",
                  fontSize: "15px",
                  lineHeight: 1.9,
                }}
              >
                Outside of work, I am figuring out how to make AI do my
                laundry. Still in progress.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              <div className="about-photo" style={{ marginBottom: "24px" }}>
                <Image
                  src="/photo.jpg"
                  alt="Shreyansh Kanoongo"
                  width={400}
                  height={500}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
              </div>
              <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
              {[
                { label: "Location", value: "Jaipur, Rajasthan, India · Remote worldwide" },
                { label: "Studio", value: "Automiq Labs", link: "https://automiqlabs.com" },
                { label: "Education", value: "BBA · Manipal University Jaipur" },
              ].map((item) => (
                <div key={item.label} className="about-info-row">
                  <span
                    style={{
                      color: "#aaaaaa",
                      fontSize: "15px",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                    }}
                  >
                    {item.label}
                  </span>
                  {"link" in item && item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#e8d5b0", fontSize: "15px", textDecoration: "none" }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ color: "#888888", fontSize: "15px" }}>
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        className="projects-section"
        ref={projectsRef}
        style={{
          padding: "80px clamp(24px, 5vw, 80px)",
          maxWidth: "1200px",
          margin: "0 auto",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <p
          style={{
            color: "#aaaaaa",
            fontSize: "15px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Projects
        </p>
        <h2
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 300,
            letterSpacing: "-1.5px",
            color: "#ffffff",
            marginBottom: "8px",
          }}
        >
          Systems I&apos;ve{" "}
          <span style={{ color: "#e8d5b0" }}>built.</span>
        </h2>
        <p
          style={{
            color: "#999999",
            fontSize: "14px",
            marginBottom: "48px",
          }}
        >
          Not demos. Not experiments. Each one designed to run in the real
          world.
        </p>

        {/* ── Featured ── */}
        <p
          style={{
            color: "#aaaaaa",
            fontSize: "12px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Featured
        </p>

        {/* Header row — hidden on mobile via CSS */}
        <div className="project-header-row">
          {["No.", "Project", "Category", ""].map((h) => (
            <span
              key={h}
              style={{
                color: "#aaaaaa",
                fontSize: "15px",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {projects.filter(p => p.featured).map((project, i) => {
          const isOpen = openProject === project.id;
          return (
            <div
              key={project.id}
              id={project.slug}
              style={{
                borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                background: isOpen
                  ? "rgba(255,255,255,0.015)"
                  : "transparent",
                transition: "background 0.3s ease",
              }}
            >
              <button
                onClick={() => toggleProject(project.id)}
                className="project-row-btn"
              >
                <span
                  style={{
                    color: "#777777",
                    fontSize: "15px",
                    fontWeight: 400,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    {project.name}
                  </span>
                  <span
                    style={{
                      border: "0.5px solid",
                      borderRadius: "100px",
                      padding: "2px 8px",
                      fontSize: "12px",
                    }}
                    className={getStatusStyle(project.status)}
                  >
                    {project.status.startsWith("Live") && (
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#4ade80",
                          display: "inline-block",
                          marginRight: "5px",
                          verticalAlign: "middle",
                        }}
                      />
                    )}
                    {project.status}
                  </span>
                  <span
                    style={{
                      border: "0.5px solid",
                      borderRadius: "100px",
                      padding: "2px 8px",
                      fontSize: "12px",
                    }}
                    className={getMetaStyle()}
                  >
                    {project.type}
                  </span>
                  {project.speed && (
                    <span
                      style={{
                        border: "0.5px solid",
                        borderRadius: "100px",
                        padding: "2px 8px",
                        fontSize: "12px",
                      }}
                      className={getMetaStyle()}
                    >
                      {project.speed}
                    </span>
                  )}
                </div>
                {/* Category — hidden on mobile */}
                <span className="project-col-cat" style={{ color: "#777777", fontSize: "14px" }}>
                  {project.tagline.split(".")[0]}
                </span>
                <span
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    transition: "transform 0.2s ease",
                    display: "inline-block",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ↓
                </span>
              </button>

              <div
                style={{
                  maxHeight: isOpen ? "800px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}
              >
                <div className="project-expanded-inner">
                  <div>
                    <p
                      style={{
                        color: "#888888",
                        fontSize: "15px",
                        lineHeight: 1.8,
                        marginBottom: "16px",
                      }}
                    >
                      {project.description}
                    </p>
                    <p style={{ color: "#777777", fontSize: "14px" }}>
                      <span style={{ color: "#aaaaaa" }}>Role: </span>
                      {project.role}
                    </p>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "20px",
                      }}
                    >
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            border: "0.5px solid rgba(255,255,255,0.1)",
                            color: "#888888",
                            fontSize: "13px",
                            borderRadius: "100px",
                            padding: "4px 10px",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#e8d5b0",
                          fontSize: "15px",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                        onMouseEnter={(e) =>
                          ((e.target as HTMLElement).style.opacity = "0.7")
                        }
                        onMouseLeave={(e) =>
                          ((e.target as HTMLElement).style.opacity = "1")
                        }
                      >
                        View Live Project →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* ── All Work ── */}
        <p
          style={{
            color: "#aaaaaa",
            fontSize: "12px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginTop: "48px",
            marginBottom: "16px",
          }}
        >
          All Work
        </p>

        <div className="project-header-row">
          {["No.", "Project", "Category", ""].map((h) => (
            <span
              key={h}
              style={{
                color: "#aaaaaa",
                fontSize: "15px",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {projects.filter(p => p.group).map((project, i) => {
          const isOpen = openProject === project.id;
          return (
            <div
              key={project.id}
              id={project.slug}
              style={{
                borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                background: isOpen
                  ? "rgba(255,255,255,0.015)"
                  : "transparent",
                transition: "background 0.3s ease",
              }}
            >
              <button
                onClick={() => toggleProject(project.id)}
                className="project-row-btn"
              >
                <span
                  style={{
                    color: "#777777",
                    fontSize: "15px",
                    fontWeight: 400,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    {project.name}
                  </span>
                  <span
                    style={{
                      border: "0.5px solid",
                      borderRadius: "100px",
                      padding: "2px 8px",
                      fontSize: "12px",
                    }}
                    className={getStatusStyle(project.status)}
                  >
                    {project.status.startsWith("Live") && (
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#4ade80",
                          display: "inline-block",
                          marginRight: "5px",
                          verticalAlign: "middle",
                        }}
                      />
                    )}
                    {project.status}
                  </span>
                  <span
                    style={{
                      border: "0.5px solid",
                      borderRadius: "100px",
                      padding: "2px 8px",
                      fontSize: "12px",
                    }}
                    className={getMetaStyle()}
                  >
                    {project.type}
                  </span>
                  {project.speed && (
                    <span
                      style={{
                        border: "0.5px solid",
                        borderRadius: "100px",
                        padding: "2px 8px",
                        fontSize: "12px",
                      }}
                      className={getMetaStyle()}
                    >
                      {project.speed}
                    </span>
                  )}
                </div>
                {/* Category — hidden on mobile */}
                <span className="project-col-cat" style={{ color: "#777777", fontSize: "14px" }}>
                  {project.tagline.split(".")[0]}
                </span>
                <span
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    transition: "transform 0.2s ease",
                    display: "inline-block",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ↓
                </span>
              </button>

              <div
                style={{
                  maxHeight: isOpen ? "800px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}
              >
                <div className="project-expanded-inner">
                  <div>
                    <p
                      style={{
                        color: "#888888",
                        fontSize: "15px",
                        lineHeight: 1.8,
                        marginBottom: "16px",
                      }}
                    >
                      {project.description}
                    </p>
                    <p style={{ color: "#777777", fontSize: "14px" }}>
                      <span style={{ color: "#aaaaaa" }}>Role: </span>
                      {project.role}
                    </p>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "20px",
                      }}
                    >
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            border: "0.5px solid rgba(255,255,255,0.1)",
                            color: "#888888",
                            fontSize: "13px",
                            borderRadius: "100px",
                            padding: "4px 10px",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#e8d5b0",
                          fontSize: "15px",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                        onMouseEnter={(e) =>
                          ((e.target as HTMLElement).style.opacity = "0.7")
                        }
                        onMouseLeave={(e) =>
                          ((e.target as HTMLElement).style.opacity = "1")
                        }
                      >
                        View Live Project →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        className="services-section"
        style={{
          background: "#0f0f0f",
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          padding: "80px clamp(24px, 5vw, 80px)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              color: "#aaaaaa",
              fontSize: "15px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Services
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 300,
              letterSpacing: "-1px",
              color: "#ffffff",
              marginBottom: "48px",
            }}
          >
            What I can build for you.
          </h2>

          <div className="services-grid">
            {services.map((service, i) => (
                <div
                  key={i}
                  className="service-cell"
                  style={{
                    borderBottom: i < services.length - 1 ? "0.5px solid rgba(255,255,255,0.06)" : "none",
                    borderRight: "none",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.02)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "transparent")
                  }
                >
                  <div
                    style={{
                      color: "#e8d5b0",
                      fontSize: "18px",
                      marginBottom: "12px",
                      lineHeight: 1,
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3
                    style={{
                      color: "#cccccc",
                      fontSize: "15px",
                      fontWeight: 400,
                      marginBottom: "8px",
                      lineHeight: 1.4,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      color: "#999999",
                      fontSize: "13px",
                      lineHeight: 1.7,
                    }}
                  >
                    {service.description}
                  </p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section
        id="experience"
        ref={experienceRef}
        style={{
          padding: "80px clamp(24px, 5vw, 80px)",
          maxWidth: "1200px",
          margin: "0 auto",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <p
          style={{
            color: "#aaaaaa",
            fontSize: "15px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "40px",
          }}
        >
          Experience
        </p>

        <div>
          <p
            style={{
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 400,
              marginBottom: "16px",
            }}
          >
            AI Executive · Divine Hindu (D2C spiritual products) · 2026
          </p>
          <p
            style={{
              color: "#888888",
              fontSize: "14px",
              lineHeight: 1.9,
              marginBottom: "16px",
            }}
          >
            First AI hire. Built and shipped four production systems end to end: a full applicant tracking system with AI resume scoring and automated candidate emails; a Meta ads intelligence dashboard with AI-generated daily briefings and an automated alert engine; an internal procurement and warehouse platform with role-based access enforced at the database layer; and a marketplace price intelligence tool tracking listings across Amazon, Flipkart, and Shopify. All four live in production and used daily by the founding team.
          </p>
          <p style={{ color: "#777777", fontSize: "14px" }}>
            Next.js · TypeScript · Supabase · Vercel · Anthropic API · n8n
          </p>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section
        id="skills"
        className="skills-section"
        ref={skillsRef}
        style={{
          padding: "80px clamp(24px, 5vw, 80px)",
          maxWidth: "1200px",
          margin: "0 auto",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <p
          style={{
            color: "#aaaaaa",
            fontSize: "15px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Skills
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 3.5vw, 40px)",
            fontWeight: 300,
            letterSpacing: "-1px",
            color: "#ffffff",
            marginBottom: "48px",
          }}
        >
          What I work with.
        </h2>

        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skills-row">
              <span
                style={{
                  color: "#aaaaaa",
                  fontSize: "12px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  paddingTop: "2px",
                }}
              >
                {category}
              </span>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "4px 0",
                }}
              >
                {items.map((item, i) => (
                  <span key={item}>
                    <span style={{ color: "#aaaaaa", fontSize: "14px" }}>
                      {item}
                    </span>
                    {i < items.length - 1 && (
                      <span
                        style={{
                          color: "#555555",
                          fontSize: "14px",
                          margin: "0 10px",
                        }}
                      >
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section
        id="certifications"
        className="cert-section"
        ref={certRef}
        style={{
          background: "#0f0f0f",
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          padding: "80px clamp(24px, 5vw, 80px)",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              color: "#aaaaaa",
              fontSize: "15px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "40px",
            }}
          >
            Certifications
          </p>
          <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
            {certifications.map((cert) => (
              <div key={cert.name} className="cert-row">
                <span
                  style={{
                    color: "#aaaaaa",
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  {cert.issuer}
                </span>
                <span style={{ color: "#cccccc", fontSize: "14px" }}>
                  {cert.name}
                </span>
                <span className="cert-date" style={{ color: "#777777", fontSize: "14px" }}>
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="contact-section"
        ref={contactRef}
        style={{
          padding: "100px clamp(24px, 5vw, 80px)",
          textAlign: "center",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p
            style={{
              color: "#aaaaaa",
              fontSize: "15px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Contact
          </p>

          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 300,
              letterSpacing: "-1.5px",
              color: "#ffffff",
              marginBottom: "16px",
              lineHeight: 1.15,
            }}
          >
            Let&apos;s build something that{" "}
            <span style={{ color: "#e8d5b0" }}>actually</span> works.
          </h2>

          <p
            style={{
              color: "#999999",
              fontSize: "14px",
              lineHeight: 1.7,
              marginBottom: "40px",
            }}
          >
            Have a process you want automated or a system you need built?
            Tell me what it is.
          </p>

          {/* Buttons */}
          <div className="contact-btns">
            <a
              href="https://mail.google.com/mail/?view=cm&to=shreyansh.kanoongo@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#ffffff",
                color: "#0a0a0a",
                borderRadius: "100px",
                padding: "12px 32px",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "opacity 0.2s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.opacity = "0.85")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.opacity = "1")
              }
            >
              Send an Email
            </a>
            <a
              href="https://calendly.com/shreyansh-kanoongo"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border: "0.5px solid rgba(255,255,255,0.15)",
                color: "#888888",
                borderRadius: "100px",
                padding: "12px 32px",
                fontSize: "15px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                (e.target as HTMLElement).style.color = "#cccccc";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                (e.target as HTMLElement).style.color = "#cccccc";
              }}
            >
              Book a Call
            </a>
          </div>

          {/* Phone */}
          <p style={{ color: "#777777", fontSize: "15px", marginBottom: "24px" }}>
            +91-7357182862
          </p>

          {/* Social links */}
          <div className="social-links">
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/shreyansh-kanoongo2005", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
              { label: "Instagram", href: "https://instagram.com/_shreyanshh._", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
              { label: "GitHub", href: "https://github.com/shreyanshkanoongo-git", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
              { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=shreyansh.kanoongo@gmail.com", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("/") ? undefined : "_blank"}
                rel={link.href.startsWith("/") ? undefined : "noopener noreferrer"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  color: "#888888",
                  fontSize: "13px",
                  textDecoration: "none",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  borderRadius: "100px",
                  padding: "8px 16px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#888888";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          padding: "24px clamp(24px, 5vw, 80px)",
          background: "#0a0a0a",
        }}
      >
        <div className="footer-inner">
          <span style={{ color: "#555555", fontSize: "13px" }}>
            © 2026 Shreyansh Kanoongo
          </span>
          <span style={{ color: "#444444", fontSize: "12px", letterSpacing: "1px" }}>
            Built by Shreyansh
          </span>
        </div>
      </footer>
    </main>
  );
}
