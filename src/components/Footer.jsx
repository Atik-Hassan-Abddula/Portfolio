"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUp, Heart, Mail, Sparkles } from "lucide-react";
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { personalInfo } from "@/data/portfolioData";
import { scrollToSection } from "@/lib/scrollToSection";

const QUICK_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_DEFINITIONS = [
  {
    id: "github",
    label: "GitHub",
    Icon: GithubIcon,
    accent: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.45)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    Icon: LinkedinIcon,
    accent: "#818cf8",
    glow: "rgba(129, 140, 248, 0.45)",
  },
  {
    id: "facebook",
    label: "Facebook",
    Icon: FacebookIcon,
    accent: "#60a5fa",
    glow: "rgba(96, 165, 250, 0.45)",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    Icon: WhatsAppIcon,
    accent: "#34d399",
    glow: "rgba(52, 211, 153, 0.45)",
  },
];

// Deterministic decorative fields — no random values during render, so the
// server and client trees always agree and hydration stays clean.
const STARS = Array.from({ length: 20 }, (_, index) => ({
  id: `star-${index}`,
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 100}%`,
  size: index % 5 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
  duration: 4.5 + (index % 7) * 0.9,
  delay: (index % 9) * 0.55,
}));

const PORTAL_DUST = [
  { left: "9%", top: "31%", driftX: "10px", driftY: "-14px", duration: 7.2, delay: 0.2, size: 3 },
  { left: "17%", top: "69%", driftX: "-8px", driftY: "-18px", duration: 8.4, delay: 1.4, size: 2 },
  { left: "29%", top: "12%", driftX: "13px", driftY: "8px", duration: 6.6, delay: 2.1, size: 2 },
  { left: "76%", top: "16%", driftX: "-12px", driftY: "10px", duration: 9.1, delay: 0.8, size: 3 },
  { left: "89%", top: "42%", driftX: "8px", driftY: "15px", duration: 7.8, delay: 2.8, size: 2 },
  { left: "81%", top: "78%", driftX: "-10px", driftY: "-9px", duration: 6.9, delay: 1.1, size: 2 },
  { left: "55%", top: "89%", driftX: "6px", driftY: "-15px", duration: 8.8, delay: 3.4, size: 3 },
  { left: "42%", top: "4%", driftX: "9px", driftY: "12px", duration: 7.4, delay: 2.2, size: 2 },
];

const isConfiguredUrl = (url) =>
  typeof url === "string" &&
  /^https?:\/\//i.test(url) &&
  !/YOUR_|XXXXXXXXX/i.test(url);

export default function Footer() {
  const portalRef = useRef(null);
  const yearRef = useRef(null);

  // Next 16's Cache Components rejects reading `new Date()` during the
  // prerender of a Client Component. Writing the current year into the
  // already-rendered node on mount keeps the value dynamic, avoids a
  // cascading state render, and never ships a hardcoded year.
  useEffect(() => {
    if (yearRef.current) {
      yearRef.current.textContent = String(new Date().getFullYear());
    }
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLinkClick = (event, href) => {
    event.preventDefault();
    scrollToSection(href);
  };

  const handlePortalPointerMove = (event) => {
    if (event.pointerType === "touch") return;

    const portal = portalRef.current;
    if (!portal) return;

    const rect = portal.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    portal.style.setProperty("--portal-tilt-x", `${(y * -6).toFixed(2)}deg`);
    portal.style.setProperty("--portal-tilt-y", `${(x * 8).toFixed(2)}deg`);
    portal.style.setProperty(
      "--portal-light-x",
      `${(x * 16 + 50).toFixed(1)}%`
    );
    portal.style.setProperty(
      "--portal-light-y",
      `${(y * 16 + 47).toFixed(1)}%`
    );
  };

  const resetPortalTilt = () => {
    const portal = portalRef.current;
    if (!portal) return;

    portal.style.setProperty("--portal-tilt-x", "0deg");
    portal.style.setProperty("--portal-tilt-y", "0deg");
    portal.style.setProperty("--portal-light-x", "50%");
    portal.style.setProperty("--portal-light-y", "47%");
  };

  const email = personalInfo.email;
  const socials = personalInfo.socials ?? {};

  const socialLinks = SOCIAL_DEFINITIONS.map((item) => ({
    ...item,
    href: socials[item.id],
    configured: isConfiguredUrl(socials[item.id]),
  }));

  return (
    <footer
      id="footer"
      aria-labelledby="footer-portal-title"
      className="cosmic-footer relative isolate overflow-hidden border-t text-slate-700 transition-colors duration-500 dark:text-slate-300"
    >
      {/* ---------- Atmosphere ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="cosmic-footer__grid absolute inset-0 opacity-70 dark:opacity-100" />
        <div className="absolute -top-48 left-1/2 h-[34rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.16),rgba(139,92,246,0.08),transparent)] blur-3xl dark:bg-[radial-gradient(closest-side,rgba(56,189,248,0.2),rgba(139,92,246,0.12),transparent)]" />
        <div className="absolute -bottom-44 left-[8%] h-96 w-96 rounded-full bg-violet-400/[0.08] blur-[120px] dark:bg-violet-600/[0.13]" />
        <div className="absolute -bottom-32 right-[4%] h-80 w-80 rounded-full bg-sky-400/[0.09] blur-[110px] dark:bg-sky-500/[0.12]" />

        {STARS.map((star) => (
          <span
            key={star.id}
            className="cosmic-star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--star-duration": `${star.duration}s`,
              "--star-delay": `${star.delay}s`,
            }}
          />
        ))}

        <div className="cosmic-footer__topline absolute inset-x-0 top-0 h-px" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---------- Portal heading ---------- */}
        <div className="flex flex-col items-center gap-3 pt-14 sm:pt-16 lg:pt-20">
          <div className="flex items-center gap-3 sm:gap-4">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500/60 sm:w-12 dark:to-cyan-300/60"
            />
            <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.38em] text-cyan-700 dark:text-cyan-300/85 sm:text-[11px]">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Cosmic Portal
            </p>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-l from-transparent to-violet-500/60 sm:w-12 dark:to-violet-300/60"
            />
          </div>

          <p className="max-w-md text-center font-mono text-[9px] uppercase tracking-[0.24em] text-slate-500 sm:text-[10px] dark:text-slate-500">
            The final destination of the digital universe
          </p>
        </div>

        {/* ---------- Central cosmic portal ---------- */}
        <div className="relative mt-8 flex justify-center pb-2 sm:mt-10 lg:mt-12">
          <div
            ref={portalRef}
            onPointerMove={handlePortalPointerMove}
            onPointerLeave={resetPortalTilt}
            onPointerCancel={resetPortalTilt}
            className="cosmic-portal relative aspect-square w-[min(86vw,21rem)] sm:w-[min(70vw,24rem)] lg:w-[27rem]"
          >
            <span
              aria-hidden="true"
              className="cosmic-portal__beacon absolute left-1/2 top-0 h-[18%] w-px -translate-x-1/2 -translate-y-[72%]"
            />

            <div aria-hidden="true" className="cosmic-portal__aura" />

            <div aria-hidden="true" className="cosmic-portal__system">
              <span className="cosmic-ring cosmic-ring--outer" />
              <span className="cosmic-ring cosmic-ring--mid" />
              <span className="cosmic-ring cosmic-ring--inner" />

              <span className="cosmic-orbit cosmic-orbit--one" />
              <span className="cosmic-orbit cosmic-orbit--two" />
              <span className="cosmic-orbit cosmic-orbit--three" />
            </div>

            <div
              aria-hidden="true"
              className="cosmic-portal__dust-field"
            >
              {PORTAL_DUST.map((particle, index) => (
                <span
                  key={`dust-${index}`}
                  className="cosmic-portal__dust"
                  style={{
                    left: particle.left,
                    top: particle.top,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    "--dust-x": particle.driftX,
                    "--dust-y": particle.driftY,
                    "--dust-duration": `${particle.duration}s`,
                    "--dust-delay": `${particle.delay}s`,
                  }}
                />
              ))}
            </div>

            <div className="cosmic-portal__disc">
              <div aria-hidden="true" className="cosmic-portal__scan" />

              <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-[9%] text-center">
                <span className="mb-2 font-mono text-[8px] font-semibold uppercase tracking-[0.34em] text-cyan-700/80 dark:text-cyan-300/70 sm:text-[9px]">
                  Transmission // 001
                </span>

                <h2
                  id="footer-portal-title"
                  className="cosmic-portal__name bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 bg-clip-text font-black uppercase tracking-[0.12em] text-transparent dark:from-cyan-200 dark:via-blue-200 dark:to-violet-300"
                >
                  {(personalInfo.name || "Atik Hassan").toUpperCase()}
                </h2>

                <p className="mt-2 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600 sm:text-[10px] dark:text-slate-300/90">
                  Full Stack Web Developer
                </p>

                <span
                  aria-hidden="true"
                  className="my-3 h-px w-12 bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent dark:via-cyan-300/60"
                />

                <p className="max-w-[15rem] text-[11px] font-medium leading-relaxed text-slate-600 sm:text-xs dark:text-slate-300/85">
                  &ldquo;Learn. Build. Improve. Repeat.&rdquo;
                </p>

                <span className="mt-4 inline-flex max-w-full items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-2.5 py-1 font-mono text-[7px] font-bold uppercase tracking-[0.14em] text-emerald-700 sm:text-[8px] dark:border-emerald-400/25 dark:bg-emerald-400/[0.08] dark:text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span
                      aria-hidden="true"
                      className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none dark:bg-emerald-400"
                    />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  </span>
                  Available for opportunities
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Navigation ---------- */}
        <nav
          aria-label="Footer navigation"
          className="cosmic-glass mx-auto mt-8 w-fit max-w-full rounded-2xl px-3 py-2.5 sm:mt-10 sm:rounded-full sm:px-4 dark:border-white/[0.08]"
        >
          <div className="flex flex-wrap items-center justify-center gap-0.5 sm:gap-1">
            {QUICK_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleLinkClick(event, item.href)}
                className="cosmic-nav-link rounded-full px-3 py-2 text-[11px] font-semibold text-slate-600 transition-colors duration-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:px-4 sm:text-xs dark:text-slate-400 dark:hover:text-cyan-200 dark:focus-visible:ring-cyan-400"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* ---------- Connection panels ---------- */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5">
          {/* Social platforms */}
          <div className="cosmic-glass rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.26em] text-blue-700 dark:text-cyan-300/80">
                Social Network
              </span>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent dark:from-cyan-300/20"
              />
            </div>

            <div className="mt-3.5 flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                const Icon = social.Icon;
                const style = {
                  "--social-accent": social.accent,
                  "--social-glow": social.glow,
                };

                return social.configured ? (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} profile (opens in new tab)`}
                    title={social.label}
                    className="cosmic-social"
                    style={style}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{social.label}</span>
                  </a>
                ) : (
                  <span
                    key={social.id}
                    role="img"
                    aria-label={`${social.label} — link coming soon`}
                    title={`${social.label} — link coming soon`}
                    className="cosmic-social cosmic-social--placeholder"
                    style={style}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{social.label}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Email signal */}
          <div className="cosmic-glass rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.26em] text-violet-700 dark:text-violet-300/80">
                Direct Signal
              </span>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-gradient-to-r from-violet-500/30 to-transparent dark:from-violet-300/20"
              />
            </div>

            {email ? (
              <a
                href={`mailto:${email}`}
                aria-label={`Send an email to ${email}`}
                className="cosmic-email group mt-3.5 flex items-center gap-3"
              >
                <span className="cosmic-email__icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-300/70 bg-white/60 text-blue-600 transition-all duration-300 group-hover:border-cyan-400/70 group-hover:text-cyan-700 group-hover:shadow-[0_0_22px_-4px_rgba(56,189,248,0.6)] dark:border-white/10 dark:bg-white/[0.04] dark:text-cyan-300 dark:group-hover:border-cyan-300/50 dark:group-hover:text-cyan-200">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[8px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-500">
                    Email
                  </span>
                  <span className="mt-0.5 block break-all text-xs font-semibold text-slate-800 transition-colors duration-300 group-hover:text-blue-700 sm:text-sm dark:text-slate-200 dark:group-hover:text-cyan-200">
                    {email}
                  </span>
                </span>

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-600 dark:text-slate-500 dark:group-hover:text-cyan-300"
                />
              </a>
            ) : null}
          </div>
        </div>

        {/* ---------- Copyright / credits ---------- */}
        <div className="mt-10 border-t border-slate-300/50 py-6 sm:mt-12 dark:border-white/[0.07]">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center font-mono text-[10px] text-slate-500 sm:text-[11px] md:text-left dark:text-slate-500">
              ©{" "}
              <span ref={yearRef} className="inline-block min-w-[2.2rem] tabular-nums">
                {""}
              </span>{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {personalInfo.name || "Atik Hassan"}
              </span>
              . All rights reserved.
            </p>

            <p className="flex items-center justify-center gap-1.5 font-mono text-[10px] text-slate-500 sm:text-[11px] dark:text-slate-500">
              Designed &amp; Developed with care.
              <Heart
                aria-hidden="true"
                className="h-3 w-3 fill-violet-400/40 text-violet-500 dark:fill-violet-300/30 dark:text-violet-300"
              />
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="cosmic-back-to-top group inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-300/70 bg-white/50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600 backdrop-blur transition-all duration-300 hover:border-cyan-400/60 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-[11px] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400 dark:hover:border-cyan-300/40 dark:hover:text-cyan-200 dark:focus-visible:ring-cyan-400"
            >
              <span>Back to top</span>
              <ArrowUp
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
