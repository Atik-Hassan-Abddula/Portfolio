"use client";

import { Reveal } from "@/components/motion/Reveal";

/* =====================================================================
   AUTHENTIC TECHNOLOGY ICONS
   Inline SVGs keep the section dependency-free. The wrapper controls size.
   ===================================================================== */
function TechIcon({ name }) {
  switch (name) {
    case "HTML5":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#E34F26" d="M3.7 2.1l1.5 17 6.8 1.9 6.8-1.9 1.5-17H3.7z" />
          <path fill="#EF652A" d="M12 3.7v15.5l5.4-1.5 1.2-14H12z" />
          <path fill="#EBEBEB" d="M12 8.3H7.5l.3 3.3H12V8.3zm0 4.9H9.4l.2 2.3 2.4.6v-2.9z" />
          <path fill="#FFF" d="M12 8.3v3.3h4.2l-.3 3.3-3.9 1.1v-2.4l1.8-.5.1-1.5H12V8.3z" />
        </svg>
      );

    case "CSS3":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#1572B6" d="M3.7 2.1l1.5 17 6.8 1.9 6.8-1.9 1.5-17H3.7z" />
          <path fill="#33A9DC" d="M12 3.7v15.5l5.4-1.5 1.2-14H12z" />
          <path fill="#EBEBEB" d="M12 8.3H7.5l.3 3.3H12V8.3zm0 4.9H9.4l.2 2.3 2.4.6v-2.9z" />
          <path fill="#FFF" d="M12 8.3v3.3h4.2l-.3 3.3-3.9 1.1v-2.4l1.8-.5.1-1.5H12V8.3z" />
        </svg>
      );

    case "JavaScript ES6+":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path
            fill="#000"
            d="M7.7 17.6c.7 1.1 1.7 1.8 3.2 1.8 1.8 0 2.9-1 2.9-2.9v-6.9h-2.3v6.8c0 .7-.3 1.1-1 1.1-.6 0-.9-.3-1.2-.8l-1.6.9zm8.5-5.3c-1.3-.8-2.1-1.4-2.1-2.4 0-1 .8-1.7 2.1-1.7 1.1 0 1.9.4 2.5 1.4l1.8-1.1c-.9-1.6-2.3-2.3-4.3-2.3-2.6 0-4.3 1.7-4.3 3.9 0 2.2 1.4 3.2 3.4 4 1.4.6 2 1.1 2 2.1 0 1.1-.9 1.8-2.3 1.8-1.6 0-2.6-.9-3.2-2l-1.9 1.2c.9 1.9 2.5 2.9 5.1 2.9 2.7 0 4.6-1.6 4.6-4 0-2.4-1.5-3.3-3.7-3.8z"
          />
        </svg>
      );

    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path
            fill="#FFF"
            d="M4.5 10.5h6.6V12H8.6v7.5H6.9V12H4.5v-1.5zm10.5 4.6c1.2.6 1.8 1.2 1.8 2 0 1-.9 1.7-2.3 1.7-1.5 0-2.4-.7-2.9-1.7l1.3-.9c.3.6.8 1 1.6 1 .7 0 1.1-.3 1.1-.8 0-.5-.4-.8-1.2-1.2-1.6-.7-2.4-1.5-2.4-2.7 0-1.5 1.2-2.7 3.1-2.7 1.4 0 2.4.6 2.9 1.5l-1.3.8c-.3-.5-.7-.8-1.5-.8-.8 0-1.2.4-1.2.8 0 .4.3.7 1 1z"
          />
        </svg>
      );

    case "React":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" aria-hidden="true">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case "Next.js":
      return (
        <svg viewBox="0 0 180 180" fill="none" aria-hidden="true">
          <circle cx="90" cy="90" r="90" fill="#000" />
          <path
            d="M149.5 159.5L74.8 63.8V126.2H58.8V53.8H73.5L144.5 144.5C146.2 149.7 148 154.8 149.5 159.5Z"
            fill="#FFF"
          />
          <rect x="121.2" y="53.8" width="16" height="72.4" fill="#FFF" />
        </svg>
      );

    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"
            fill="#06B6D4"
          />
        </svg>
      );

    case "DaisyUI":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" fill="#1AD1A5" fillOpacity="0.15" stroke="#1AD1A5" strokeWidth="1.5" />
          <path d="M12 7v10M7 12h10" stroke="#1AD1A5" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" fill="#1AD1A5" />
        </svg>
      );

    case "Hero UI":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="#EC4899" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="8" cy="12" r="3.2" fill="#A855F7" />
        </svg>
      );

    case "shadcn/ui":
      return (
        <svg viewBox="0 0 256 256" aria-hidden="true">
          <path d="M208 128l-80 80M192 40L40 192" stroke="#CBD5E1" strokeWidth="26" strokeLinecap="round" />
        </svg>
      );

    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#5FA04E" d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
          <path fill="#5FA04E" d="M11 8h2v8h-2z" />
        </svg>
      );

    case "Express.js":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#CBD5E1"
            d="M3 7l4 5-4 5h2.5l2.7-3.6 2.8 3.6H13l-4-5 4-5h-2.5L7.8 10.6 5.1 7H3zm12.5 0c-2.5 0-4.5 2-4.5 5s2 5 4.5 5 4.5-2 4.5-5-2-5-4.5-5zm0 2c1.4 0 2.5 1.3 2.5 3s-1.1 3-2.5 3-2.5-1.3-2.5-3 1.1-3 2.5-3z"
          />
        </svg>
      );

    case "MongoDB":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#47A248"
            d="M12 1.5c-.3.4-3.5 4.2-4.3 6.9-.9 2.9-.3 6.3 1.4 8.7 1.5 2.1 3.5 3.5 4.3 4.4.1.1.2.2.3.3.1-.1.2-.2.3-.3.8-.9 2.8-2.3 4.3-4.4 1.7-2.4 2.3-5.8 1.4-8.7-.8-2.7-4-6.5-4.3-6.9H12zm-.4 3.7c0 3.7-.3 7.4.4 11.1h-.8c-.7-2.4-1.2-5-1.1-7.5.1-1.3.6-2.5 1.5-3.6z"
          />
        </svg>
      );

    case "REST API":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" />
          <path d="M2.5 12h19M12 2.5a15 15 0 0 1 3.8 9.5 15 15 0 0 1-3.8 9.5 15 15 0 0 1-3.8-9.5A15 15 0 0 1 12 2.5z" />
        </svg>
      );

    case "Next.js API Routes":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 17l6-6-6-6M12 19h8" />
        </svg>
      );

    case "Git":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#F05032"
            d="M23.5 10.9L13.1.5a1.5 1.5 0 0 0-2.1 0L8.8 2.6l3.1 3a2 2 0 0 1 2.4 2.2l3 3a2 2 0 0 1 2.2 2.4 2 2 0 0 1-3.3.9l-3-3a2 2 0 0 1-.8-1.8V9.8L9 11.6a2 2 0 0 1 .3 1.8 2 2 0 0 1-3.3.9 2 2 0 0 1 1-3.3l-.1-.1L.5 10.9a1.5 1.5 0 0 0 0 2.1l10.4 10.4a1.5 1.5 0 0 0 2.1 0l10.5-10.4a1.5 1.5 0 0 0 0-2.1z"
          />
        </svg>
      );

    case "GitHub":
      return (
        <svg viewBox="0 0 24 24" fill="#CBD5E1" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );

    case "Visual Studio Code":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#007ACC" d="M17.6 2.3l-9.8 8.1-4.3-3.3-2 1 3.5 3.9-3.5 3.9 2 1 4.3-3.3 9.8 8.1 4.9-2.4V4.7L17.6 2.3zm0 5.4v8.6l-5.6-4.3 5.6-4.3z" />
        </svg>
      );

    case "npm":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#CB3837" d="M1.5 7.5h21v9h-10.5v-6h-4.5v6H1.5v-9zM0 6v12h24V6H0z" />
        </svg>
      );

    case "Authentication":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="18" height="11" x="3" y="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );

    case "Debugging":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6M12 20v-9M6 13H2M22 13h-4" />
          <path d="m8 4 1.6 1.6M16 4l-1.6 1.6" />
        </svg>
      );

    case "API Integration":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );

    case "Responsive Design":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <path d="M12 17v4M8 21h8" />
        </svg>
      );

    case "Problem Solving":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2a7 7 0 0 1 7 7c0 2.4-1.2 4.5-3 5.7V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.3C6.2 13.5 5 11.4 5 9a7 7 0 0 1 7-7zM9 21h6" />
        </svg>
      );

    case "Google Antigravity":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="24" height="24" rx="5" fill="#8AB4F8" fillOpacity="0.16" />
          <path d="M12 4.3l1.8 5.9 5.9 1.8-5.9 1.8L12 19.7l-1.8-5.9-5.9-1.8 5.9-1.8L12 4.3z" fill="#8AB4F8" />
        </svg>
      );

    case "Claude":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="24" height="24" rx="5" fill="#E0926B" fillOpacity="0.16" />
          <path d="M12 5v14M5 12h14M7 7l10 10M17 7L7 17" stroke="#D97757" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "ChatGPT":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="24" height="24" rx="5" fill="#7FD8B0" fillOpacity="0.14" />
          <path d="M12 4.2l6.7 3.9v7.8L12 19.8l-6.7-3.9V8.1L12 4.2z" fill="none" stroke="#5FC79B" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 8.8l3.3 1.9v3.8L12 16.4l-3.3-1.9v-3.8L12 8.8z" fill="#5FC79B" />
        </svg>
      );

    case "OpenCode":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="24" height="24" rx="5" fill="#D9A6FF" fillOpacity="0.16" />
          <path d="M9.6 8L6 12l3.6 4M14.4 8L18 12l-3.6 4" fill="none" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      );
  }
}

/* =====================================================================
   CATEGORY GLYPHS — one illustrative line icon per card
   ===================================================================== */
function CategoryIcon({ id }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (id) {
    case "frontend":
      return (
        <svg {...common}>
          <path d="M8.5 4L3 12l5.5 8M15.5 4L21 12l-5.5 8" />
          <path d="M13.5 3.5l-3 17" />
        </svg>
      );
    case "frameworks":
      return (
        <svg {...common}>
          <path d="M12 3l9 5-9 5-9-5 9-5z" />
          <path d="M3 12.5l9 5 9-5M3 17l9 5 9-5" />
        </svg>
      );
    case "styling":
      return (
        <svg {...common}>
          <path d="M12 3a9 9 0 1 0 0 18h1.4a2 2 0 0 0 1.4-3.4 2 2 0 0 1 1.4-3.4H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3z" />
          <circle cx="7.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="10" cy="7.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="7.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "database":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
          <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
        </svg>
      );
    case "tools":
      return (
        <svg {...common}>
          <path d="M14.5 6.2a4.2 4.2 0 0 0-5.3 5.3L3 17.7 6.3 21l6.2-6.2a4.2 4.2 0 0 0 5.3-5.3L15 12l-3-3 2.5-2.8z" />
        </svg>
      );
    case "practices":
      return (
        <svg {...common}>
          <path d="M9 6h12M9 12h12M9 18h12" />
          <path d="M3 6l1.6 1.6L7 5M3 12l1.6 1.6L7 11M3 18l1.6 1.6L7 17" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

/* =====================================================================
   CONTENT — six categories, six colour identities
   ===================================================================== */
const cards = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend Development",
    desc: "The building blocks of every interface I create.",
    techs: ["HTML5", "CSS3", "JavaScript ES6+", "TypeScript"],
    accent: "#8FB8FF",
    bg: "linear-gradient(155deg, #172C66 0%, #0C183C 100%)",
    text: "#F2F6FF",
    muted: "#AFC2E8",
  },
  {
    id: "frameworks",
    number: "02",
    title: "Core Frameworks & Libraries",
    desc: "Production-ready tools for scalable applications.",
    techs: ["React", "Next.js", "Node.js", "Express.js"],
    accent: "#C4A8FF",
    bg: "linear-gradient(155deg, #361C63 0%, #1C1039 100%)",
    text: "#F7F2FF",
    muted: "#C6B5E2",
  },
  {
    id: "styling",
    number: "03",
    title: "Styling & UI",
    desc: "Design systems and utility-first styling workflows.",
    techs: ["Tailwind CSS", "DaisyUI", "Hero UI", "shadcn/ui"],
    accent: "#6FE3BA",
    bg: "linear-gradient(155deg, #0E4038 0%, #06241F 100%)",
    text: "#EFFBF6",
    muted: "#A7D8C9",
  },
  {
    id: "database",
    number: "04",
    title: "Database & API",
    desc: "Data modeling, persistence and API layers.",
    techs: ["MongoDB", "REST API", "Next.js API Routes"],
    accent: "#FFC787",
    bg: "linear-gradient(155deg, #4B2A13 0%, #2A190D 100%)",
    text: "#FFF7EE",
    muted: "#E0C4A6",
  },
  {
    id: "tools",
    number: "05",
    title: "Tools & Version Control",
    desc: "Everyday toolchain, version control and AI assistants.",
    techs: [
      "Git",
      "GitHub",
      "Visual Studio Code",
      "npm",
      "Google Antigravity",
      "Claude",
      "ChatGPT",
      "OpenCode",
    ],
    accent: "#FF9EC5",
    bg: "linear-gradient(155deg, #4B1D37 0%, #2B1121 100%)",
    text: "#FFF2F8",
    muted: "#E3BAD0",
  },
  {
    id: "practices",
    number: "06",
    title: "Development Practices",
    desc: "The habits that keep code reliable and maintainable.",
    techs: [
      "Authentication",
      "Debugging",
      "API Integration",
      "Responsive Design",
      "Problem Solving",
    ],
    accent: "#79DFE9",
    bg: "linear-gradient(155deg, #083C46 0%, #05252C 100%)",
    text: "#EFFBFC",
    muted: "#A9D6DC",
  },
];

/* =====================================================================
   CARD — top / divider / technology icon group
   ===================================================================== */
function SkillCard({ card }) {
  const handlePointerMove = (event) => {
    if (event.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    event.currentTarget.style.setProperty("--rx", `${(-y * 4).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--ry", `${(x * 5).toFixed(2)}deg`);
  };

  const handlePointerLeave = (event) => {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      className="skills-card"
      style={{
        "--accent": card.accent,
        "--card-bg": card.bg,
        "--card-text": card.text,
        "--card-muted": card.muted,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="skills-card__content">
        <div className="skills-card__top">
          <span className="skills-card__glyph">
            <CategoryIcon id={card.id} />
          </span>
          <div className="skills-card__heading">
            <span className="skills-card__number">CARD {card.number}</span>
            <h3 className="skills-card__title">{card.title}</h3>
            <p className="skills-card__desc">{card.desc}</p>
          </div>
        </div>

        <div className="skills-card__divider" aria-hidden="true" />

        <div
          className={`skills-card__techs${card.techs.length > 4 ? " skills-card__techs--dense" : ""}`}
        >
          {card.techs.map((tech) => (
            <span className="skills-card__tech" key={tech} title={tech}>
              <span className="skills-icon">
                <TechIcon name={tech} />
              </span>
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

/* =====================================================================
   SECTION
   ===================================================================== */
export default function Skills() {
  return (
    <section
      id="skills"
      className="skills-section relative isolate scroll-mt-20 overflow-hidden bg-slate-50 px-4 py-8 transition-colors duration-500 dark:bg-[#060a17] sm:px-6 sm:py-10 lg:px-8 lg:py-12"
    >
      <div className="skills-atmosphere pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="skills-atmosphere__grid" />
        <div className="skills-atmosphere__arc" />
      </div>

      <div className="mx-auto max-w-[1320px]">
        <Reveal y={16} className="skills-masthead">
          <div className="skills-overline">
            <span className="skills-overline__index">04</span>
            <span className="skills-overline__rule" />
            <span>MY TECHNICAL TOOLKIT</span>
            <span className="skills-overline__dot" />
            <span>06 DISCIPLINES</span>
          </div>

          <div className="skills-masthead__body">
            <h2 className="skills-title">
              <span className="skills-title__line">Skills</span>
              <span className="skills-title__line skills-title__line--second">
                <em>&amp;</em> Technologies
              </span>
            </h2>

            <div className="skills-lede">
              <span className="skills-lede__marker" aria-hidden="true" />
              <p>
                A curated toolkit of technologies, practices and AI tools I use to design, build
                and ship modern digital experiences.
              </p>
              <div className="skills-lede__meta">
                <span>01 — 06</span>
                <span>FRONTEND → FULL STACK</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="skills-grid">
          {cards.map((card, index) => (
            <Reveal y={22} delay={index * 0.06} className="skills-grid__item" key={card.id}>
              <SkillCard card={card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
