"use client";

import { useMemo, useState } from "react";
import {
  Sparkles,
  Layout,
  Server,
  Palette,
  Wrench,
  Cpu,
  Boxes,
  ArrowUpRight,
  Search,
  X,
  Code2,
  GitBranch,
} from "lucide-react";

// ==========================================
// OFFICIAL TECHNOLOGY SVG ICONS
// ==========================================
function TechIcon({ name }) {
  switch (name) {
    case "HTML5":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#E34F26" d="M3.7 2.1l1.5 17 6.8 1.9 6.8-1.9 1.5-17H3.7z" />
          <path fill="#EF652A" d="M12 3.7v15.5l5.4-1.5 1.2-14H12z" />
          <path fill="#EBEBEB" d="M12 8.3H7.5l.3 3.3H12V8.3zm0 4.9H9.4l.2 2.3 2.4.6v-2.9z" />
          <path fill="#FFF" d="M12 8.3v3.3h4.2l-.3 3.3-3.9 1.1v-2.4l1.8-.5.1-1.5H12V8.3z" />
        </svg>
      );

    case "CSS3":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#1572B6" d="M3.7 2.1l1.5 17 6.8 1.9 6.8-1.9 1.5-17H3.7z" />
          <path fill="#33A9DC" d="M12 3.7v15.5l5.4-1.5 1.2-14H12z" />
          <path fill="#EBEBEB" d="M12 8.3H7.5l.3 3.3H12V8.3zm0 4.9H9.4l.2 2.3 2.4.6v-2.9z" />
          <path fill="#FFF" d="M12 8.3v3.3h4.2l-.3 3.3-3.9 1.1v-2.4l1.8-.5.1-1.5H12V8.3z" />
        </svg>
      );

    case "JavaScript ES6+":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path
            fill="#000"
            d="M7.7 17.6c.7 1.1 1.7 1.8 3.2 1.8 1.8 0 2.9-1 2.9-2.9v-6.9h-2.3v6.8c0 .7-.3 1.1-1 1.1-.6 0-.9-.3-1.2-.8l-1.6.9zm8.5-5.3c-1.3-.8-2.1-1.4-2.1-2.4 0-1 .8-1.7 2.1-1.7 1.1 0 1.9.4 2.5 1.4l1.8-1.1c-.9-1.6-2.3-2.3-4.3-2.3-2.6 0-4.3 1.7-4.3 3.9 0 2.2 1.4 3.2 3.4 4 1.4.6 2 1.1 2 2.1 0 1.1-.9 1.8-2.3 1.8-1.6 0-2.6-.9-3.2-2l-1.9 1.2c.9 1.9 2.5 2.9 5.1 2.9 2.7 0 4.6-1.6 4.6-4 0-2.4-1.5-3.3-3.7-3.8z"
          />
        </svg>
      );

    case "TypeScript":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path
            fill="#FFF"
            d="M4.5 10.5h6.6V12H8.6v7.5H6.9V12H4.5v-1.5zm10.5 4.6c1.2.6 1.8 1.2 1.8 2 0 1-.9 1.7-2.3 1.7-1.5 0-2.4-.7-2.9-1.7l1.3-.9c.3.6.8 1 1.6 1 .7 0 1.1-.3 1.1-.8 0-.5-.4-.8-1.2-1.2-1.6-.7-2.4-1.5-2.4-2.7 0-1.5 1.2-2.7 3.1-2.7 1.4 0 2.4.6 2.9 1.5l-1.3.8c-.3-.5-.7-.8-1.5-.8-.8 0-1.2.4-1.2.8 0 .4.3.7 1 1z"
          />
        </svg>
      );

    case "React":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="-11.5 -10.23174 23 20.46348" aria-hidden="true">
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
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 180 180" fill="none" aria-hidden="true">
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
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"
            fill="#06B6D4"
          />
        </svg>
      );

    case "DaisyUI":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" fill="#1AD1A5" fillOpacity="0.15" stroke="#1AD1A5" strokeWidth="1.5" />
          <path d="M12 7v10M7 12h10" stroke="#1AD1A5" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" fill="#1AD1A5" />
        </svg>
      );

    case "Node.js":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#5FA04E" d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
          <path fill="#5FA04E" d="M11 8h2v8h-2z" />
        </svg>
      );

    case "Express.js":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#CBD5E1"
            d="M3 7l4 5-4 5h2.5l2.7-3.6 2.8 3.6H13l-4-5 4-5h-2.5L7.8 10.6 5.1 7H3zm12.5 0c-2.5 0-4.5 2-4.5 5s2 5 4.5 5 4.5-2 4.5-5-2-5-4.5-5zm0 2c1.4 0 2.5 1.3 2.5 3s-1.1 3-2.5 3-2.5-1.3-2.5-3 1.1-3 2.5-3z"
          />
        </svg>
      );

    case "MongoDB":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#47A248"
            d="M12 1.5c-.3.4-3.5 4.2-4.3 6.9-.9 2.9-.3 6.3 1.4 8.7 1.5 2.1 3.5 3.5 4.3 4.4.1.1.2.2.3.3.1-.1.2-.2.3-.3.8-.9 2.8-2.3 4.3-4.4 1.7-2.4 2.3-5.8 1.4-8.7-.8-2.7-4-6.5-4.3-6.9H12zm-.4 3.7c0 3.7-.3 7.4.4 11.1h-.8c-.7-2.4-1.2-5-1.1-7.5.1-1.3.6-2.5 1.5-3.6z"
          />
        </svg>
      );

    case "REST API":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );

    case "Next.js API Routes":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 17l6-6-6-6M12 19h8" />
        </svg>
      );

    case "Hero UI":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="#EC4899" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="8" cy="12" r="3.2" fill="#A855F7" />
        </svg>
      );

    case "shadcn/ui":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 256 256" aria-hidden="true">
          <path fill="none" d="M0 0h256v256H0z" />
          <path d="M208 128l-80 80M192 40L40 192" stroke="#CBD5E1" strokeWidth="26" strokeLinecap="round" />
        </svg>
      );

    case "Git":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#F05032"
            d="M23.5 10.9L13.1.5a1.5 1.5 0 0 0-2.1 0L8.8 2.6l3.1 3a2 2 0 0 1 2.4 2.2l3 3a2 2 0 0 1 2.2 2.4 2 2 0 0 1-3.3.9l-3-3a2 2 0 0 1-.8-1.8V9.8L9 11.6a2 2 0 0 1 .3 1.8 2 2 0 0 1-3.3.9 2 2 0 0 1 1-3.3l-.1-.1L.5 10.9a1.5 1.5 0 0 0 0 2.1l10.4 10.4a1.5 1.5 0 0 0 2.1 0l10.5-10.4a1.5 1.5 0 0 0 0-2.1z"
          />
        </svg>
      );

    case "GitHub":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#CBD5E1" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );

    case "Visual Studio Code":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#007ACC" d="M17.6 2.3l-9.8 8.1-4.3-3.3-2 1 3.5 3.9-3.5 3.9 2 1 4.3-3.3 9.8 8.1 4.9-2.4V4.7L17.6 2.3zm0 5.4v8.6l-5.6-4.3 5.6-4.3z" />
        </svg>
      );

    case "npm":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#CB3837" d="M1.5 7.5h21v9h-10.5v-6h-4.5v6H1.5v-9zM0 6v12h24V6H0z" />
        </svg>
      );

    case "Problem Solving":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
          <path d="M9 21h6" />
        </svg>
      );

    case "Debugging":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
          <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
          <path d="M12 20v-9" />
          <path d="M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M17.2 17c2.1.1 3.8 1.9 3.8 4" />
        </svg>
      );

    case "API Integration":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );

    case "Authentication":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );

    case "Responsive Design":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <path d="M12 17v4M8 21h8" />
        </svg>
      );

    case "Team Collaboration":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );

    default:
      return <Sparkles className="h-4 w-4 text-purple-400" />;
  }
}

// ==========================================
// EXACT 6 CATEGORY CARDS DATA
// ==========================================
const categoryCards = [
  {
    id: "frontend",
    number: "CARD 01",
    title: "FRONTEND DEVELOPMENT",
    description: "Modern & responsive web interfaces",
    categories: ["all", "frontend"],
    icon: Layout,
    iconGradient: "from-purple-600 via-indigo-600 to-blue-600",
    borderGradient:
      "bg-gradient-to-br from-purple-500/40 via-indigo-500/20 to-blue-500/40 group-hover:from-purple-500 group-hover:via-indigo-400 group-hover:to-blue-500",
    glowShadow: "hover:shadow-[0_0_35px_-5px_rgba(168,85,247,0.35)]",
    ambientGlow: "bg-purple-500",
    glowDot: "bg-purple-500",
    accentBadge: "text-purple-400",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript ES6+",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "DaisyUI",
    ],
  },
  {
    id: "backend",
    number: "CARD 02",
    title: "BACKEND DEVELOPMENT",
    description: "Powerful and scalable server solutions",
    categories: ["all", "backend"],
    icon: Server,
    iconGradient: "from-cyan-600 via-sky-600 to-blue-600",
    borderGradient:
      "bg-gradient-to-br from-cyan-500/40 via-sky-500/20 to-blue-500/40 group-hover:from-cyan-400 group-hover:via-sky-400 group-hover:to-blue-500",
    glowShadow: "hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.35)]",
    ambientGlow: "bg-cyan-500",
    glowDot: "bg-cyan-500",
    accentBadge: "text-cyan-400",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API",
      "Next.js API Routes",
    ],
  },
  {
    id: "frameworks",
    number: "CARD 03",
    title: "FRAMEWORKS & LIBRARIES",
    description: "Build faster with modern technologies",
    categories: ["all", "frontend", "backend"],
    icon: Boxes,
    iconGradient: "from-emerald-600 via-teal-600 to-cyan-600",
    borderGradient:
      "bg-gradient-to-br from-emerald-500/40 via-teal-500/20 to-cyan-500/40 group-hover:from-emerald-400 group-hover:via-teal-400 group-hover:to-cyan-500",
    glowShadow: "hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.35)]",
    ambientGlow: "bg-emerald-500",
    glowDot: "bg-emerald-500",
    accentBadge: "text-emerald-400",
    skills: [
      "React",
      "Next.js",
      "Express.js",
      "Node.js",
    ],
  },
  {
    id: "styling",
    number: "CARD 04",
    title: "STYLING & UI",
    description: "Create beautiful and accessible interfaces",
    categories: ["all", "ui/ux", "frontend"],
    icon: Palette,
    iconGradient: "from-amber-500 via-orange-500 to-purple-600",
    borderGradient:
      "bg-gradient-to-br from-amber-500/40 via-orange-500/20 to-purple-500/40 group-hover:from-amber-400 group-hover:via-orange-400 group-hover:to-purple-500",
    glowShadow: "hover:shadow-[0_0_35px_-5px_rgba(249,115,22,0.35)]",
    ambientGlow: "bg-orange-500",
    glowDot: "bg-orange-500",
    accentBadge: "text-orange-400",
    skills: [
      "Tailwind CSS",
      "DaisyUI",
      "Hero UI",
      "shadcn/ui",
    ],
  },
  {
    id: "tools",
    number: "CARD 05",
    title: "TOOLS & VERSION CONTROL",
    description: "Essential tools for development",
    categories: ["all", "tools"],
    icon: Wrench,
    iconGradient: "from-blue-600 via-indigo-600 to-cyan-600",
    borderGradient:
      "bg-gradient-to-br from-blue-500/40 via-indigo-500/20 to-cyan-500/40 group-hover:from-blue-400 group-hover:via-indigo-400 group-hover:to-cyan-400",
    glowShadow: "hover:shadow-[0_0_35px_-5px_rgba(59,130,246,0.35)]",
    ambientGlow: "bg-blue-500",
    glowDot: "bg-blue-500",
    accentBadge: "text-blue-400",
    skills: [
      "Git",
      "GitHub",
      "Visual Studio Code",
      "npm",
    ],
  },
  {
    id: "others",
    number: "CARD 06",
    title: "OTHERS",
    description: "Additional skills and expertise",
    categories: ["all", "others"],
    icon: Cpu,
    iconGradient: "from-violet-600 via-fuchsia-600 to-purple-600",
    borderGradient:
      "bg-gradient-to-br from-violet-500/40 via-fuchsia-500/20 to-purple-500/40 group-hover:from-violet-400 group-hover:via-fuchsia-400 group-hover:to-purple-500",
    glowShadow: "hover:shadow-[0_0_35px_-5px_rgba(139,92,246,0.35)]",
    ambientGlow: "bg-violet-500",
    glowDot: "bg-violet-500",
    accentBadge: "text-violet-400",
    skills: [
      "Problem Solving",
      "Debugging",
      "API Integration",
      "Authentication",
      "Responsive Design",
      "Team Collaboration",
    ],
  },
];

// ==========================================
// FILTER BUTTONS
// ==========================================
const filterButtons = [
  { label: "All", id: "all", icon: Sparkles },
  { label: "Frontend", id: "frontend", icon: Layout },
  { label: "Backend", id: "backend", icon: Server },
  { label: "UI/UX", id: "ui/ux", icon: Palette },
  { label: "Tools", id: "tools", icon: Wrench },
  { label: "Others", id: "others", icon: Cpu },
];

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const visibleCards = useMemo(() => {
    const trimmed = search.trim().toLowerCase();

    return categoryCards.filter((card) => {
      // Category filter match
      const matchesFilter =
        activeFilter === "all" || card.categories.includes(activeFilter);

      // Search match
      const matchesSearch =
        !trimmed ||
        card.title.toLowerCase().includes(trimmed) ||
        card.description.toLowerCase().includes(trimmed) ||
        card.skills.some((skill) => skill.toLowerCase().includes(trimmed));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <section
      id="skills"
      className="relative isolate scroll-mt-20 overflow-hidden bg-slate-50 px-4 py-20 transition-colors duration-300 dark:bg-[#060a17] sm:px-6 lg:px-8 lg:py-28"
    >
      {/* Background Soft Ambient Lighting Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />

        {/* Ambient Neon Glow Orbs */}
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-purple-600/15 blur-[130px]" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-blue-600/15 blur-[130px]" />
        <div className="absolute bottom-10 left-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* ==========================================
            2. SECTION HEADER
        ========================================== */}
        <div className="mx-auto mb-14 max-w-3xl space-y-4 text-center sm:mb-16">
          {/* Small Badge: MY SKILLS */}
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.15)] dark:border-purple-400/30 dark:bg-purple-500/15 dark:text-purple-300">
            <Sparkles className="h-3.5 w-3.5 text-purple-500 dark:text-purple-300" />
            <span>MY SKILLS</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Skills &{" "}
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            Technologies and tools I work with to build amazing digital experiences.
          </p>
        </div>

        {/* ==========================================
            3. CATEGORY FILTER NAVIGATION & SEARCH
        ========================================== */}
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {filterButtons.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`group inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold backdrop-blur-md transition-all duration-300 sm:text-sm ${
                    isActive
                      ? "border-purple-500/80 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_22px_rgba(168,85,247,0.45)]"
                      : "border-slate-200 bg-white/80 text-slate-700 hover:border-purple-400 hover:text-purple-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-purple-500/40 dark:hover:bg-white/[0.08] dark:hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                  />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>

          {/* Technology Search Input */}
          <div className="relative w-full lg:w-72">
            <div className="relative flex items-center rounded-xl border border-slate-200 bg-white/90 px-3.5 py-2.5 shadow-sm backdrop-blur-md transition-all focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 dark:border-white/10 dark:bg-white/[0.04]">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search technologies..."
                aria-label="Search technologies"
                className="w-full bg-transparent px-2.5 text-xs text-slate-900 outline-none placeholder:text-slate-400 dark:text-white sm:text-sm"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="rounded-lg p-1 text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================
            4. SIX PREMIUM CATEGORY CARDS (GRID)
        ========================================== */}
        {visibleCards.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {visibleCards.map((card) => {
              const CategoryIcon = card.icon;
              const trimmed = search.trim().toLowerCase();

              return (
                <article
                  key={card.id}
                  className={`group relative rounded-3xl p-[1px] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${card.borderGradient} ${card.glowShadow}`}
                >
                  {/* Subtle Background Lighting Glow */}
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full ${card.ambientGlow} opacity-15 blur-[80px] transition-opacity duration-500 group-hover:opacity-35`}
                  />

                  {/* Glassmorphism Inner Card Container */}
                  <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[23px] bg-white/95 p-5 shadow-sm backdrop-blur-xl dark:bg-[#090e1c]/95 sm:p-8">
                    {/* Card Header */}
                    <div>
                      <div className="flex items-start justify-between gap-3 sm:gap-4">
                        <div className="flex items-center gap-3 min-w-0 sm:gap-4">
                          {/* Prominent Category Icon in Colorful Rounded Square */}
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${card.iconGradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1 sm:h-14 sm:w-14`}
                          >
                            <CategoryIcon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
                          </div>

                          {/* Category Title & Short Description */}
                          <div className="min-w-0">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                              {card.number}
                            </span>
                            <h3 className="text-lg font-black tracking-tight text-slate-900 transition-colors group-hover:text-purple-600 sm:text-xl dark:text-white dark:group-hover:text-purple-400">
                              {card.title}
                            </h3>
                            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                              {card.description}
                            </p>
                          </div>
                        </div>

                        {/* Circular Arrow Icon on Top-Right */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-all duration-300 group-hover:border-purple-400/50 group-hover:bg-purple-500/10 group-hover:text-purple-600 group-hover:rotate-45 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400 dark:group-hover:border-purple-400/50 dark:group-hover:text-purple-300">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Technology Items Displayed as Rounded Glass Pills */}
                      <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
                        {card.skills.map((skillName) => {
                          const isMatch =
                            trimmed &&
                            skillName.toLowerCase().includes(trimmed);

                          return (
                            <div
                              key={skillName}
                              className={`inline-flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs font-semibold backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 cursor-default ${
                                isMatch
                                  ? "border-purple-400 bg-purple-500/20 text-purple-700 shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/60 dark:text-purple-200"
                                  : "border-slate-200 bg-slate-50/90 text-slate-700 hover:border-purple-300 hover:bg-purple-50/50 hover:text-purple-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/[0.08] dark:hover:text-white"
                              }`}
                            >
                              <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                                <TechIcon name={skillName} />
                              </div>
                              <span className="tracking-tight">{skillName}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Card Footer Status */}
                    <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/[0.06]">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {card.skills.length} Technologies
                      </span>

                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${card.glowDot} animate-pulse`} />
                        <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                          Production Ready
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty Search Results */
          <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-white/10">
            <Search className="mx-auto h-8 w-8 text-slate-400" />
            <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
              No matching technologies found
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Try another search term or reset your category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveFilter("all");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-purple-600/30 transition-all hover:from-purple-500 hover:to-indigo-500"
            >
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
