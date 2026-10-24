"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Stop Lenis background scrolling when modal is open
  useEffect(() => {
    if (window.__lenis) {
      if (isResumeOpen) {
        window.__lenis.stop();
      } else {
        window.__lenis.start();
      }
    }
  }, [isResumeOpen]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
        {/* Top Navbar */}
        <Navbar onOpenResume={() => setIsResumeOpen(true)} />

        {/* Main Content Sections */}
        <main className="flex-1 flex flex-col">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Resume Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </SmoothScroll>
  );
}
