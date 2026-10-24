# Modern Developer Portfolio Website

A modern developer portfolio website built with **Next.js (App Router)**, **JavaScript**, **Tailwind CSS**, and **Lucide React**.

Designed with a premium dark navy/black aesthetic, glowing blue & purple gradient accents, clean typography, smooth scrolling, interactive cards, and full responsiveness across mobile, tablet, and desktop.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🎨 Design & Structure

- **Dark Theme Palette:** Deep black & dark navy (`#030712`, `#0b1120`, `#0f172a`) with electric blue and purple gradient highlights.
- **Single Source of Truth (`src/data/portfolioData.js`):** Easily edit your name, contact info, bio, social links, skills, and projects in one file.
- **Navbar:** Sticky glassmorphism header, smooth scroll navigation, interactive Resume modal, and mobile hamburger drawer.
- **Hero Section:** Status pill ("Available for new opportunities"), greeting, headline *"I Build Modern Web Experiences"*, CTA buttons, social profile buttons, and a tech avatar showcase.
- **About Me Section:** Two-column layout highlighting your introduction, learning journey, career goals, architecture values, and key metrics.
- **Skills Section:** 8 core skills (HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, Git, GitHub) with proficiency tags and interactive category filters.
- **Projects Section:** Three project cards featuring realistic browser mockups with interactive previews (Metrics dashboard, Component system, and Sprint board), technology pills, live demo links, and GitHub links.
- **Contact Section:** Form with client-side validation (name, email, message), transparent static frontend feedback, one-click email copying, and direct "Open in Mail App" dispatch.
- **Footer:** Social links, copyright with dynamic year, tech attribution, and smooth "Back to Top" scrolling.
- **Resume Modal:** Instant in-browser CV preview with a one-click sample resume downloader.

---

## 🛠️ How to Customize Your Portfolio

All your personal details and content live in **[`src/data/portfolioData.js`](src/data/portfolioData.js)**. Simply open that file to update:

1. **`personalInfo`**: Change your name, role, email, location, and social media handles.
2. **`skillsData`**: Add or modify technical skills, categories, or descriptions.
3. **`projectsData`**: Customize titles, descriptions, live demo links, and GitHub repository links.

---

## 📁 Project Architecture

```
src/
├── app/
│   ├── globals.css          # Tailwind CSS styles & custom scrollbars
│   ├── layout.js            # Root layout with metadata and dark theme
│   └── page.js              # Home page rendering portfolio sections
├── components/
│   ├── Navbar.jsx           # Responsive navigation bar with mobile menu
│   ├── Hero.jsx             # Hero banner with profile placeholder
│   ├── About.jsx            # Two-column About Me section
│   ├── Skills.jsx           # Categorized technical skill cards
│   ├── Projects.jsx         # Featured projects grid
│   ├── ProjectCard.jsx      # Individual project card with mockups
│   ├── Contact.jsx          # Contact form with validation
│   ├── Footer.jsx           # Footer with social links & back-to-top
│   ├── ResumeModal.jsx      # Interactive resume modal & download
│   └── Icons.jsx            # Crisp vector icons (GitHub, LinkedIn, Twitter, Git)
└── data/
    └── portfolioData.js     # Centralized portfolio data
```
