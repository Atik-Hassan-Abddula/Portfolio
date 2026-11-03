"use client";

import { useState } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  MapPin,
  MessageSquare,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { personalInfo } from "@/data/portfolioData";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedStatus, setSubmittedStatus] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please write a message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmittedStatus(true);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${formData.name || "Colleague"}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
  )}`;

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setSubmittedStatus(false);
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-white py-20 transition-colors duration-300 dark:bg-slate-950 sm:py-24 lg:py-28"
    >
      {/* Decorative Gradient Glow */}
      <div className="pointer-events-none absolute bottom-0 right-10 -z-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-600/15" />
      <div className="pointer-events-none absolute left-10 top-20 -z-0 h-80 w-80 rounded-full bg-purple-500/10 blur-[110px] dark:bg-purple-600/15" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-400">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Get in Touch</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
              Impactful
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            Have a project in mind, an exciting role to discuss, or want to collaborate on modern web applications? My inbox is always open.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Direct Info & Social Cards */}
          <div className="space-y-6 lg:col-span-5">
            <div className="space-y-6 rounded-3xl border border-slate-200/90 bg-slate-50/80 p-6 shadow-sm backdrop-blur-sm sm:p-8 dark:border-slate-800/90 dark:bg-[#0b1120]/90">
              <h3 className="flex items-center gap-2.5 text-xl font-bold text-slate-900 dark:text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
                Contact Details
              </h3>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                I am actively available for new full-stack and frontend development opportunities, contract engagements, and team collaboration.
              </p>

              {/* Email Card with Quick Copy */}
              <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
                <div className="flex items-center justify-between font-mono text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400">
                    <Mail className="h-4 w-4" />
                    Direct Email
                  </span>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex cursor-pointer items-center gap-1 text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="block truncate text-sm font-semibold text-slate-900 transition-colors hover:text-blue-600 sm:text-base dark:text-white dark:hover:text-blue-400"
                >
                  {personalInfo.email}
                </a>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <span className="block font-mono text-xs text-slate-500 dark:text-slate-400">
                    Location
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {personalInfo.location}
                  </span>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="space-y-3 border-t border-slate-200 pt-5 dark:border-slate-800">
                <span className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Professional Profiles
                </span>

                <div className="grid grid-cols-2 gap-3">
                  {personalInfo.socials.github && (
                    <a
                      href={personalInfo.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-400 hover:text-black dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-white"
                    >
                      <GithubIcon className="h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {personalInfo.socials.linkedin && (
                    <a
                      href={personalInfo.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-white"
                    >
                      <LinkedinIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-colors sm:p-8 lg:p-9 dark:border-slate-800/90 dark:bg-[#0b1120]">
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                Send a Message
              </h3>

              <p className="mt-1 mb-6 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                Fill in the details below. Once verified, you can immediately send it via your default mail application.
              </p>

              {/* Success Notification Banner */}
              {submittedStatus && (
                <div
                  role="status"
                  className="mb-6 space-y-3 rounded-2xl border border-blue-500/30 bg-blue-50/80 p-5 dark:border-blue-500/30 dark:bg-blue-950/40"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400" />

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Form Ready to Send!
                      </h4>

                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        Click below to launch your email client with your message, name, and subject pre-composed.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={mailtoLink}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
                    >
                      <span>Open Email App Now</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="cursor-pointer text-xs font-medium text-slate-600 underline hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      Clear &amp; Reset
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-600 ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-300 focus:border-blue-500 dark:border-slate-800 dark:focus:border-blue-400"
                    }`}
                  />

                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1.5 flex items-center gap-1 font-mono text-xs text-red-500"
                    >
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Your Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-600 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-300 focus:border-blue-500 dark:border-slate-800 dark:focus:border-blue-400"
                    }`}
                  />

                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1.5 flex items-center gap-1 font-mono text-xs text-red-500"
                    >
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline, or opportunity..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={`w-full resize-none rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-600 ${
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-300 focus:border-blue-500 dark:border-slate-800 dark:focus:border-blue-400"
                    }`}
                  />

                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1.5 flex items-center gap-1 font-mono text-xs text-red-500"
                    >
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 hover:shadow-blue-500/35 active:translate-y-0"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </button>

                <p className="text-center font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  Your message triggers a secure direct mailto link to <span className="text-blue-600 dark:text-blue-400">{personalInfo.email}</span>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
