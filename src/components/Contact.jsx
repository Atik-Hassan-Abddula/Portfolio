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
      window.setTimeout(() => setCopiedEmail(false), 2000);
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
      className="relative scroll-mt-20 overflow-hidden bg-slate-50 py-24 transition-colors duration-300 dark:bg-slate-950/60"
    >
      {/* Decorative gradient glow */}
      <div className="pointer-events-none absolute bottom-0 right-10 -z-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute left-10 top-20 -z-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 font-mono text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Get in Touch</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Let&apos;s Start a{" "}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Conversation
            </span>
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-400 sm:text-lg">
            Have a project in mind, looking for a developer, or just want to
            connect? Reach out anytime!
          </p>
        </div>

        {/* Contact layout */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-5">
            <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800/90 dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-[#0b1120] sm:p-7">
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                Contact Information
              </h3>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                I am open to development opportunities, projects, and
                collaborations.
              </p>

              {/* Email card */}
              <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
                <div className="flex items-center justify-between font-mono text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    Direct Email
                  </span>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex cursor-pointer items-center gap-1 text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">
                          Copied!
                        </span>
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
                  className="block truncate text-sm font-semibold text-slate-900 transition-colors hover:text-blue-500 dark:text-white dark:hover:text-blue-400 sm:text-base"
                >
                  {personalInfo.email}
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3.5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <MapPin className="h-4 w-4" />
                </div>

                <div>
                  <span className="block font-mono text-xs text-slate-500 dark:text-slate-400">
                    Location
                  </span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {personalInfo.location}
                  </span>
                </div>
              </div>

              {/* Social links */}
              <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                <span className="block font-mono text-xs text-slate-500 dark:text-slate-400">
                  Professional Profiles
                </span>

                <div className="flex items-center gap-3">
                  {personalInfo.socials.github && (
                    <a
                      href={personalInfo.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-700 transition-all hover:border-slate-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-white"
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
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-700 transition-all hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-200 dark:hover:text-white"
                    >
                      <LinkedinIcon className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800/90 dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-[#0b1120] sm:p-8">
              <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                Send a Message
              </h3>

              <p className="mb-6 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                Complete the form below. After validation, you can open your
                email app to send the message.
              </p>

              {/* Success banner */}
              {submittedStatus && (
                <div
                  role="status"
                  className="mb-6 space-y-3 rounded-xl border border-blue-500/40 bg-blue-50 p-4 dark:bg-blue-950/40"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400" />

                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Form Validated Successfully!
                      </h4>

                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        Your message has not been sent yet. Click below to
                        open your default email app with the message prepared.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={mailtoLink}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-500"
                    >
                      <span>Open Email App</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-2 py-1 text-xs text-slate-600 underline hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name field */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block font-mono text-xs text-slate-700 dark:text-slate-300"
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
                    placeholder="e.g. Sarah Connor"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-600 ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-300 focus:border-blue-500 dark:border-slate-800"
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

                {/* Email field */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block font-mono text-xs text-slate-700 dark:text-slate-300"
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
                    placeholder="e.g. sarah@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-600 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-300 focus:border-blue-500 dark:border-slate-800"
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

                {/* Message field */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-mono text-xs text-slate-700 dark:text-slate-300"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={`w-full resize-none rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-600 ${
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-300 focus:border-blue-500 dark:border-slate-800"
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

                {/* Submit button */}
                <button
                  type="submit"
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 hover:shadow-blue-500/30"
                >
                  <Send className="h-4 w-4" />
                  <span>Sent Message</span>
                </button>

                <p className="text-center font-mono text-[11px] text-slate-500">
                  Your message is not stored or sent until you send it from your
                  email app.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}