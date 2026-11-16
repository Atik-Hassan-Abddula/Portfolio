"use client";

import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { personalInfo } from "@/data/portfolioData";
import { scrollToSection } from "@/lib/scrollToSection";

const FOOTER_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { id: "github", label: "GitHub", Icon: GithubIcon },
  { id: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
  { id: "facebook", label: "Facebook", Icon: FacebookIcon },
  { id: "whatsapp", label: "WhatsApp", Icon: WhatsAppIcon },
];

// Only real, configured URLs become links. Placeholder values in the data
// file are shown as labelled text so no link is ever invented.
const isConfiguredUrl = (url) =>
  typeof url === "string" &&
  /^https?:\/\//i.test(url) &&
  !/YOUR_|XXXXXXXXX/i.test(url);

const LINK_CLASS =
  "inline-flex py-1.5 text-[13px] text-slate-600 transition-colors duration-300 hover:text-blue-700 focus-visible:outline-none focus-visible:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300 dark:focus-visible:text-blue-300";

const UNDERLINE_CLASS =
  "relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full focus-visible:after:w-full dark:after:bg-blue-400";

export default function Footer() {
  const yearRef = useRef(null);

  // Next 16's Cache Components rejects reading `new Date()` during the
  // prerender of a Client Component. Writing the year into the already
  // rendered node on mount keeps it dynamic without a cascading re-render.
  useEffect(() => {
    if (yearRef.current) {
      yearRef.current.textContent = String(new Date().getFullYear());
    }
  }, []);

  const handleLinkClick = (event, href) => {
    event.preventDefault();
    scrollToSection(href);
  };

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  };

  const email = personalInfo.email;
  const socials = personalInfo.socials ?? {};
  const name = personalInfo.name || "Atik Hassan";

  return (
    <footer
      id="footer"
      aria-label="Site footer"
      className="relative isolate overflow-hidden border-t border-slate-200/80 bg-slate-50 text-slate-800 transition-colors duration-500 dark:border-white/[0.07] dark:bg-[#050b18] dark:text-slate-200"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.5),rgba(139,92,246,0.32),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ---------- Editorial headline ---------- */}
        <section className="footer-reveal border-b border-slate-200/80 pb-12 pt-16 sm:pb-14 sm:pt-20 lg:pb-16 lg:pt-24 dark:border-white/[0.08]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-500">
            01 / Let&apos;s talk
          </p>

          <h2 className="mt-7 font-extrabold uppercase leading-[0.92] tracking-[-0.045em] text-slate-900 dark:text-slate-50">
            <span className="block whitespace-nowrap text-[clamp(1.45rem,6vw,5.5rem)]">
              Let&apos;s Build
            </span>
            <span className="block whitespace-nowrap text-[clamp(1.45rem,6vw,5.5rem)]">
              Something
            </span>
            <span className="block whitespace-nowrap text-[clamp(1.45rem,6vw,5.5rem)] text-blue-700 dark:text-blue-400">
              Exceptional.
            </span>
          </h2>

          <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <p className="max-w-md text-[13px] leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
              Have an idea, a project, or an opportunity? Let&apos;s make it
              happen.
            </p>

            <a
              href="#contact"
              onClick={(event) => handleLinkClick(event, "#contact")}
              className={`group inline-flex shrink-0 items-center gap-2 self-start pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 transition-colors duration-300 focus-visible:outline-none dark:text-blue-300 ${UNDERLINE_CLASS}`}
            >
              Get in touch
              <span
                aria-hidden="true"
                className="text-sm leading-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
          </div>
        </section>

        {/* ---------- Identity and editorial columns ---------- */}
        <section
          className="footer-reveal grid grid-cols-1 gap-11 border-b border-slate-200/80 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.1fr] lg:gap-10 lg:py-14 dark:border-white/[0.08]"
          style={{ animationDelay: "90ms" }}
        >
          {/* Brand identity */}
          <div className="min-w-0">
            <p className="text-lg font-extrabold uppercase tracking-[0.1em] text-slate-900 dark:text-white">
              {name}
            </p>
            <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400">
              Full Stack Web Developer
            </p>
            <p className="mt-6 border-l-2 border-blue-600/70 pl-3 text-[13px] italic leading-relaxed text-slate-500 dark:border-blue-400/60 dark:text-slate-500">
              Learn. Build. Improve. Repeat.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer navigation" className="min-w-0">
            <span
              aria-hidden="true"
              className="mb-4 block h-px w-8 bg-blue-600 dark:bg-blue-400"
            />
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-500">
              Explore
            </h3>
            <ul className="mt-3 flex flex-col">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => handleLinkClick(event, link.href)}
                    className={`${LINK_CLASS} ${UNDERLINE_CLASS}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div className="min-w-0">
            <span
              aria-hidden="true"
              className="mb-4 block h-px w-8 bg-blue-600 dark:bg-blue-400"
            />
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-500">
              Connect
            </h3>
            <ul className="mt-3 flex flex-col">
              {SOCIAL_LINKS.map(({ id, label, Icon }) => {
                const href = socials[id];
                const configured = isConfiguredUrl(href);
                const content = (
                  <>
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{label}</span>
                  </>
                );

                return (
                  <li key={id}>
                    {configured ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} profile (opens in new tab)`}
                        className={`${LINK_CLASS} ${UNDERLINE_CLASS} items-center gap-2`}
                      >
                        {content}
                      </a>
                    ) : (
                      <span
                        className="inline-flex cursor-default items-center gap-2 py-1.5 text-[13px] text-slate-400 opacity-70 dark:text-slate-600"
                        title={`${label} link coming soon`}
                        aria-label={`${label} link coming soon`}
                      >
                        {content}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div className="min-w-0">
            <span
              aria-hidden="true"
              className="mb-4 block h-px w-8 bg-blue-600 dark:bg-blue-400"
            />
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-500">
              Contact
            </h3>
            {email ? (
              <a
                href={`mailto:${email}`}
                className={`group mt-4 inline-flex max-w-full items-start gap-2 break-all text-[13px] text-slate-700 transition-colors duration-300 hover:text-blue-700 focus-visible:outline-none focus-visible:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300 ${UNDERLINE_CLASS}`}
              >
                <span className="break-all">{email}</span>
                <span
                  aria-hidden="true"
                  className="mt-px shrink-0 text-[11px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            ) : null}
          </div>
        </section>

        {/* ---------- Bottom signature ---------- */}
        <div className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="text-[11px] text-slate-500 dark:text-slate-500">
            ©{" "}
            <span
              ref={yearRef}
              className="inline-block min-w-[2.2rem] tabular-nums"
            >
              {""}
            </span>{" "}
            <span className="text-slate-700 dark:text-slate-300">{name}</span>.
            All rights reserved.
          </p>

          <p className="text-[11px] text-slate-500 dark:text-slate-500">
            Designed &amp; Developed with care.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`group inline-flex shrink-0 items-center gap-2 self-start pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 transition-colors duration-300 hover:text-blue-700 focus-visible:outline-none dark:text-slate-500 dark:hover:text-blue-300 ${UNDERLINE_CLASS}`}
          >
            Back to top
            <ArrowUp
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
