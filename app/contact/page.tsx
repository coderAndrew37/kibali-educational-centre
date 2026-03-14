// app/contact/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../_components/PageHero";

// ─── Schema ──────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  firstName: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z\s]+$/),
  lastName: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z\s]+$/),
  email: z.string().email().max(100),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional()
    .or(z.literal("")),
  subject: z.string().min(5).max(100),
  message: z.string().min(20).max(1000),
  preferredContact: z.enum(["email", "phone"]),
  agreeToPrivacy: z.boolean().refine((v) => v === true, {
    message: "You must agree to the privacy policy",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─── Data ────────────────────────────────────────────────────────────────────

const contactInfo = [
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["+254 712 345 678", "+254 723 456 789"],
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["info@kibalieducentre.ac.ke", "admissions@kibalieducentre.ac.ke"],
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: MapPin,
    title: "Visit Campus",
    details: ["Kibali Road, Nairobi", "P.O. Box 12345-00100"],
    gradient: "from-accent to-accent-dark",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Mon – Fri: 7:30 AM – 5:00 PM", "Sat: 8:00 AM – 1:00 PM"],
    gradient: "from-primary to-primary-dark",
  },
];

const faqs = [
  {
    question: "How quickly can I expect a response?",
    answer:
      "We respond to all inquiries within 24 hours during business days. For urgent matters, please call our main office line.",
  },
  {
    question: "Do you offer campus tours?",
    answer:
      "Yes! We offer guided campus tours Monday through Friday. Please schedule at least 24 hours in advance.",
  },
  {
    question: "What documents do I need for admission inquiries?",
    answer:
      "For initial inquiries, we only need basic contact information. For formal applications, we'll request academic records and other documents.",
  },
];

// ─── Shared input className ───────────────────────────────────────────────────

const inputBase =
  "w-full px-4 py-3 bg-background border text-primary-dark placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 rounded-sm";
const inputError = "border-red-300";
const inputNormal = "border-slate-200";

// ─── Component ───────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      preferredContact: "email",
      agreeToPrivacy: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    reset();
    setIsSubmitting(false);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        image="/campus-1.jpg"
        eyebrow="Kibali Educational Centre"
        title="Get in Touch"
        accentWord="Touch"
        tagline="We're here to answer your questions and help you discover how Kibali can transform your child's educational journey."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "#" },
        ]}
        overlayOpacity={0.7}
        minHeight="60vh"
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Success toast */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="mb-10 flex items-center gap-4 p-6 bg-emerald-50 border border-emerald-200 rounded-sm"
              >
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-black text-emerald-900 text-sm uppercase tracking-widest mb-0.5">
                    Message Sent
                  </p>
                  <p className="text-emerald-700 text-sm">
                    Our team will respond within 24 hours.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* ── Sidebar: contact info ──────────────────────────────────── */}
            <aside className="lg:col-span-1 space-y-4 lg:sticky lg:top-32">
              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1 w-10 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
                <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
                  Contact Info
                </span>
              </div>

              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-5 p-6 bg-surface border border-slate-100 hover:border-accent/30 transition-colors duration-300"
                  >
                    <div
                      className={`w-11 h-11 rounded-sm bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="w-5 h-5 text-white stroke-2" />
                    </div>
                    <div>
                      <p className="font-black text-primary-dark text-xs uppercase tracking-widest mb-2">
                        {item.title}
                      </p>
                      {item.details.map((d) => (
                        <p
                          key={d}
                          className="text-slate-500 text-sm leading-relaxed"
                        >
                          {d}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}

              {/* Map placeholder */}
              <div className="relative h-44 bg-primary-dark overflow-hidden border border-slate-800 mt-6">
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-accent flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-dark" />
                  </div>
                  <p className="text-surface font-black text-xs uppercase tracking-widest">
                    Kibali Road, Nairobi
                  </p>
                  <p className="text-surface/40 text-[10px] uppercase tracking-wider">
                    Click for directions
                  </p>
                </div>
              </div>
            </aside>

            {/* ── Form ──────────────────────────────────────────────────── */}
            <div className="lg:col-span-2">
              {/* Section header */}
              <div className="mb-10">
                <h2 className="text-4xl md:text-5xl font-black text-primary-dark tracking-tight leading-[1.1] mb-3">
                  Send Us a <span className="text-accent">Message</span>
                </h2>
                <p className="text-slate-500 text-lg">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name row */}
                <div className="grid md:grid-cols-2 gap-5">
                  <FieldWrapper
                    label="First Name"
                    error={errors.firstName?.message}
                  >
                    <input
                      {...register("firstName")}
                      placeholder="John"
                      className={`${inputBase} ${errors.firstName ? inputError : inputNormal}`}
                    />
                  </FieldWrapper>
                  <FieldWrapper
                    label="Last Name"
                    error={errors.lastName?.message}
                  >
                    <input
                      {...register("lastName")}
                      placeholder="Doe"
                      className={`${inputBase} ${errors.lastName ? inputError : inputNormal}`}
                    />
                  </FieldWrapper>
                </div>

                {/* Contact row */}
                <div className="grid md:grid-cols-2 gap-5">
                  <FieldWrapper
                    label="Email Address"
                    error={errors.email?.message}
                  >
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="john.doe@example.com"
                      className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                    />
                  </FieldWrapper>
                  <FieldWrapper
                    label="Phone Number"
                    error={errors.phone?.message}
                    optional
                  >
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="+254 712 345 678"
                      className={`${inputBase} ${errors.phone ? inputError : inputNormal}`}
                    />
                  </FieldWrapper>
                </div>

                {/* Subject */}
                <FieldWrapper label="Subject" error={errors.subject?.message}>
                  <input
                    {...register("subject")}
                    placeholder="What would you like to discuss?"
                    className={`${inputBase} ${errors.subject ? inputError : inputNormal}`}
                  />
                </FieldWrapper>

                {/* Preferred contact */}
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary-dark mb-4">
                    Preferred Contact Method{" "}
                    <span className="text-accent">*</span>
                  </p>
                  <div className="flex gap-6">
                    {["email", "phone"].map((method) => (
                      <label
                        key={method}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          value={method}
                          {...register("preferredContact")}
                          className="w-4 h-4 accent-amber-500"
                        />
                        <span className="text-sm font-bold text-slate-600 uppercase tracking-wider group-hover:text-primary-dark transition-colors">
                          {method === "email" ? "Email" : "Phone Call"}
                        </span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg message={errors.preferredContact?.message} />
                </div>

                {/* Message */}
                <FieldWrapper
                  label="Your Message"
                  error={errors.message?.message}
                >
                  <textarea
                    {...register("message")}
                    rows={6}
                    placeholder="Please provide details about your inquiry…"
                    className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
                  />
                  <p className="text-right text-xs text-slate-400 mt-1.5 font-medium">
                    {watch("message")?.length || 0} / 1000
                  </p>
                </FieldWrapper>

                {/* Privacy */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register("agreeToPrivacy")}
                      className="w-4 h-4 mt-0.5 accent-amber-500"
                    />
                    <span className="text-sm text-slate-600 leading-relaxed">
                      I agree to the{" "}
                      <a
                        href="/privacy-policy"
                        className="text-accent font-bold hover:underline"
                      >
                        Privacy Policy
                      </a>{" "}
                      and consent to my data being processed accordingly.{" "}
                      <span className="text-accent">*</span>
                    </span>
                  </label>
                  <ErrorMsg message={errors.agreeToPrivacy?.message} />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 px-8 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 rounded-sm ${
                    isSubmitting
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-accent text-primary-dark hover:bg-primary-dark hover:text-surface shadow-xl shadow-accent/20"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-400/40 border-t-slate-400 rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-surface border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-xl text-accent"
              >
                ✦
              </motion.span>
              <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
                Quick Answers
              </span>
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-xl text-accent"
              >
                ✦
              </motion.span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary-dark tracking-tight leading-[1.1]">
              Frequently Asked <span className="text-accent">Questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-background border border-slate-100 p-8 hover:border-accent/30 transition-colors duration-300"
              >
                <h3 className="font-black text-primary-dark text-base uppercase tracking-tight mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-primary-dark py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <div className="inline-block px-6 py-2 bg-accent/10 border-y border-accent/30 backdrop-blur-sm mb-8">
            <span className="text-accent font-black tracking-[0.3em] text-xs uppercase">
              Ready to Enroll?
            </span>
          </div>
          <h2 className="text-surface text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] mb-6">
            Your Child's Future <span className="text-accent">Starts Here</span>
          </h2>
          <p className="text-surface/60 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Take the first step toward a world-class CBC education at Kibali
            Educational Centre.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a
              href="/admission"
              className="bg-accent text-primary-dark px-12 py-5 rounded-sm font-black hover:bg-surface transition-all shadow-2xl tracking-tight uppercase text-sm"
            >
              Apply Now
            </a>
            <a
              href="/about"
              className="border-2 border-surface/30 text-surface px-12 py-5 rounded-sm font-bold hover:bg-surface/10 backdrop-blur-sm transition-all uppercase text-sm"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function FieldWrapper({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-[0.2em] text-primary-dark mb-2">
        {label}{" "}
        {optional ? (
          <span className="text-slate-400 normal-case tracking-normal font-medium">
            (optional)
          </span>
        ) : (
          <span className="text-accent">*</span>
        )}
      </label>
      {children}
      <ErrorMsg message={error} />
    </div>
  );
}

function ErrorMsg({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 text-xs text-red-500 flex items-center gap-1.5 font-medium"
    >
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {message}
    </motion.p>
  );
}
