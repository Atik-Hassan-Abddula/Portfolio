export const personalInfo = {
  name: "Atik Hassan",
  role: "Full Stack Developer",
  tagline: "I Build Modern Web Experiences",
  profileImage: "/file_00000000d4688246bc73f1a5ab8b9b4c.png",

  shortBio:
    "Full Stack Developer specializing in building high-performance, accessible, and responsive web applications with Next.js, React, JavaScript, and Tailwind CSS.",

  fullBio: [
    "I am a passionate Full Stack Developer with an eye for UI/UX detail, scalable web architecture, and clean code. My journey began with learning core web fundamentals, which developed into engineering full-featured, interactive modern web applications.",

    "I specialize in the modern JavaScript ecosystem, component-driven client and server architectures using React and Next.js, responsive layouts with Tailwind CSS, and collaborative version control using Git and GitHub. I prioritize performance, accessibility, and intuitive user experience.",

    "My goal is to continue creating robust, human-centric web applications and collaborating with forward-thinking teams on impactful digital solutions.",
  ],

  status: "Available for new opportunities",
  location: "Gazipur,Kalakair,Bangladesh",
  email: "atik508030@gmail.com",

  socials: {
    github: "https://github.com/Atik-Hassan-Abddula",
    linkedin: "https://www.linkedin.com/in/atik-hassan-687022440/",
    twitter: null,
  },

  resumeUrl: "#resume-preview",
};

export const aboutHighlights = [
  {
    title: "Full Stack Architecture",
    description:
      "Component-driven design systems, clean state management, and modern client-server architecture.",
    icon: "Layout",
  },
  {
    title: "Pixel-Perfect UI/UX",
    description:
      "Building responsive, intuitive, and accessible user interfaces.",
    icon: "Palette",
  },
  {
    title: "High Performance",
    description:
      "Optimizing performance, asset delivery, and fast rendering across devices.",
    icon: "Zap",
  },
  {
    title: "Version Control & Git Flow",
    description:
      "Using Git and GitHub for version control and collaborative development.",
    icon: "GitBranch",
  },
];

export const stats = [
  { label: "Core Stack", value: "Next.js" },
  { label: "Component Model", value: "React 19" },
  { label: "Styling System", value: "Tailwind CSS" },
  { label: "Design Fidelity", value: "100%" },
];

export const skillCategories = [
  "All",
  "Frontend",
  "Core Frameworks & Libraries",
  "Styling & UI",
  "Tools & Version Control",
   "Database & Backend",
];

export const skillsData = [
  // Frontend
  {
    name: "HTML5",
    category: "Frontend",
    icon: "Code",
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "CSS3",
    category: "Frontend",
    icon: "FileCode",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "JavaScript (ES6+)",
    category: "Frontend",
    icon: "Terminal",
    color: "from-yellow-400 to-amber-500",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    icon: "FileCode",
    color: "from-blue-600 to-indigo-600",
  },

  // Core Frameworks & Libraries
  {
    name: "React",
    category: "Core Frameworks & Libraries",
    icon: "Atom",
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "Next.js",
    category: "Core Frameworks & Libraries",
    icon: "Compass",
    color: "from-slate-400 to-slate-600",
  },
  {
    name: "Node.js",
    category: "Core Frameworks & Libraries",
    icon: "Server",
    color: "from-emerald-500 to-green-600",
  },
  {
    name: "Express.js",
    category: "Core Frameworks & Libraries",
    icon: "Cpu",
    color: "from-slate-600 to-zinc-700",
  },

  // Styling & UI
  {
    name: "Tailwind CSS",
    category: "Styling & UI",
    icon: "Sparkles",
    color: "from-teal-400 to-cyan-500",
  },
  // {
  //   name: "DaisyUI",
  //   category: "Styling & UI",
  //   icon: "Palette",
  //   color: "from-purple-500 to-pink-500",
  // },
  {
    name: "Hero UI",
    category: "Styling & UI",
    icon: "Layers",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "shadcn/ui",
    category: "Styling & UI",
    icon: "Layout",
    color: "from-slate-700 to-slate-900",
  },

  // Tools & Version Control
  {
    name: "Git",
    category: "Tools & Version Control",
    icon: "GitFork",
    color: "from-orange-600 to-red-500",
  },
  {
    name: "GitHub",
    category: "Tools & Version Control",
    icon: "Code",
    color: "from-purple-400 to-indigo-500",
  },
  {
    name: "Visual Studio Code",
    category: "Tools & Version Control",
    icon: "Code2",
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "npm",
    category: "Tools & Version Control",
    icon: "Wrench",
    color: "from-red-600 to-pink-600",
  },
   // Database & Backend
  {
    name: "MongoDB",
    category: "Database & Backend",
    icon: "Database",
    color: "from-green-500 to-emerald-600",
  },
  // {
  //   name: "PostgreSQL",
  //   category: "Database & Backend",
  //   icon: "Database",
  //   color: "from-blue-500 to-indigo-600",
  // },
  // {
  //   name: "SQL",
  //   category: "Database & Backend",
  //   icon: "Database",
  //   color: "from-sky-500 to-blue-600",
  // },
  // {
  //   name: "SQLite",
  //   category: "Database & Backend",
  //   icon: "Database",
  //   color: "from-cyan-500 to-blue-500",
  // },
];

export const projectsData = [
  
  {
    id: "bangla-news-24",
    title: "Bangla News 24",
    subtitle: "Bangla News & Breaking News Platform",
    description:
      "A Bengali news platform built with Next.js, featuring news categories, breaking news, most-read articles, article pages, and authentication.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "MongoDB",
      "Better Auth",
      "REST API",
    ],
    liveUrl: "https://bangla-news-24-rho-six.vercel.app/",
    githubUrl: 'https://github.com/Atik-Hassan-Abddula/bangla-news-24-',
    gradient: "from-red-600 via-rose-600 to-orange-500",
    badge: "News Platform",
    previewType: "portfolio",
  },
  {
    id: "fit-logs",
    title: "Fit-Logs",
    subtitle: "Fitness & Workout Tracking App",
    description:
      "A fitness application built with Next.js for exploring exercises, organizing workout plans, and tracking fitness activities.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "JavaScript",
      "REST API",
    ],
    liveUrl: 'https://book-vibe-resources.vercel.app/',
    githubUrl: 'https://github.com/Atik-Hassan-Abddula/Fit-Logs',
    gradient: "from-lime-500 via-green-600 to-emerald-700",
    badge: "Fitness App",
    previewType: "portfolio",
  },
  {
    id: "bazar-dor",
    title: "Bazar-Dor",
    subtitle: "Learning & Building New Experiences",
    description:
      "I am continuously learning and building new web applications to improve my development skills and create useful digital experiences.",
    technologies: [
      "Next.js",
      "React",
      "JavaScript",
      "Tailwind CSS",
    ],
    liveUrl: 'https://bazar-dor-five-neon.vercel.app/',
    githubUrl: 'https://github.com/Atik-Hassan-Abddula/bazar-dor',
    gradient: "from-slate-600 via-slate-700 to-zinc-900",
    badge: "Bazar-Dor",
    previewType: "portfolio",
  },
];
