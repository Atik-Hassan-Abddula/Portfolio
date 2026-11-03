import "./globals.css";
import { personalInfo } from "@/data/portfolioData";

export const metadata = {
  title: `${personalInfo.name} | ${personalInfo.role}`,
  description: personalInfo.shortBio,
  keywords: [
    "Atik Hassan",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Frontend Developer",
    "Tailwind CSS",
    "JavaScript",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: personalInfo.name }],
  icons: {
    icon: "/portfolio-favicon.svg",
    shortcut: "/portfolio-favicon.svg",
  },
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.role}`,
    description: personalInfo.shortBio,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="dark scroll-smooth h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('portfolio-theme');
                if (saved === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 transition-colors duration-300 dark:bg-[#030712] dark:text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}
