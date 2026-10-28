import "./globals.css";

export const metadata = {
  title: "Full Stack Developer | Modern Portfolio",
  description:
    "Portfolio of Full Stack Developer specializing in modern web experiences, Next.js App Router, React, JavaScript, and responsive UI engineering.",
  icons: {
    icon: [
      {
        url: "/portfolio-favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/portfolio-favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}