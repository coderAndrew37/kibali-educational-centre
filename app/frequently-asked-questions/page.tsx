"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ChevronDown,
  Plus,
  Search,
  MessageSquare,
  BookOpen,
  Users,
  CreditCard,
  GraduationCap,
  Clock,
  Send,
  AlertCircle,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../_components/PageHero";

// ─── Schema ──────────────────────────────────────────────────────────────────

const questionSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(100),
  category: z.enum([
    "admissions",
    "academics",
    "fees",
    "facilities",
    "extracurricular",
    "general",
  ]),
  question: z.string().min(10).max(500),
  agreeToTerms: z
    .boolean()
    .refine((v) => v === true, { message: "You must agree to the terms" }),
});

type QuestionFormData = z.infer<typeof questionSchema>;

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = [
  { id: "all", label: "All Questions", icon: HelpCircle, count: null },
  { id: "admissions", label: "Admissions", icon: GraduationCap, count: 8 },
  { id: "academics", label: "Academics", icon: BookOpen, count: 6 },
  { id: "fees", label: "Fees & Payment", icon: CreditCard, count: 5 },
  { id: "facilities", label: "Facilities", icon: Users, count: 4 },
  { id: "extracurricular", label: "Extracurricular", icon: Clock, count: 7 },
  { id: "general", label: "General", icon: MessageSquare, count: 10 },
];

const faqs = [
  {
    id: 1,
    question: "What is the age requirement for PP1 enrollment?",
    answer:
      "Children must be 4 years old by January 31st of the academic year to enroll in PP1.",
    category: "admissions",
  },
  {
    id: 2,
    question: "What documents are required for admission?",
    answer:
      "Required documents include: Birth certificate, previous school reports, immunization records, 2 passport photos, and copies of parents' ID/passport.",
    category: "admissions",
  },
  {
    id: 3,
    question: "Do you offer scholarships or financial aid?",
    answer:
      "Yes, we offer merit-based scholarships and need-based financial aid. Applications are reviewed quarterly.",
    category: "admissions",
  },
  {
    id: 4,
    question: "What curriculum do you follow?",
    answer:
      "We follow the Kenyan Competency-Based Curriculum (CBC) with enhancements in STEM and digital literacy.",
    category: "academics",
  },
  {
    id: 5,
    question: "What is the student-teacher ratio?",
    answer:
      "Our average student-teacher ratio is 15:1, ensuring personalized attention for every learner.",
    category: "academics",
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, M-Pesa, credit/debit cards, and cash payments at our finance office.",
    category: "fees",
  },
  {
    id: 7,
    question: "Are there any hidden fees?",
    answer:
      "No. All fees are clearly outlined in our fee structure document provided during admission.",
    category: "fees",
  },
  {
    id: 8,
    question: "Do you have boarding facilities?",
    answer:
      "Currently, we offer day school only. However, we're working on boarding facilities for 2025.",
    category: "facilities",
  },
  {
    id: 9,
    question: "What sports do you offer?",
    answer:
      "We offer football, basketball, swimming, athletics, tennis, and martial arts.",
    category: "extracurricular",
  },
  {
    id: 10,
    question: "What clubs and societies are available?",
    answer:
      "We have over 25 clubs including Robotics Club, Debate Society, Music Band, Drama Club, and Environmental Club.",
    category: "extracurricular",
  },
  {
    id: 11,
    question: "What are your school hours?",
    answer:
      "Regular hours are 7:30 AM to 3:30 PM. Extracurricular activities run until 5:00 PM.",
    category: "general",
  },
  {
    id: 12,
    question: "Do you provide transportation services?",
    answer:
      "Yes, we have a reliable school bus service covering major routes in Nairobi.",
    category: "general",
  },
];

// Shared input / field styles — mirrors ContactPage
const inputBase =
  "w-full px-4 py-3 bg-background border text-primary-dark placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 rounded-sm";
const inputError = "border-red-300";
const inputNormal = "border-slate-200";

// ─── Component ────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userQuestions, setUserQuestions] = useState<
    Array<{
      id: number;
      question: string;
      category: string;
      date: string;
      status: "pending" | "answered";
      answer?: string;
    }>
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: { category: "general", agreeToTerms: false },
  });

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id: number) =>
    setOpenFaqs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const onSubmit = async (data: QuestionFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    setUserQuestions((prev) => [
      {
        id: Date.now(),
        question: data.question,
        category: data.category,
        date: new Date().toISOString().split("T")[0],
        status: "pending",
      },
      ...prev,
    ]);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        image="/campus-1.jpg"
        eyebrow="Help Centre"
        title="Find Answers"
        accentWord="Answers"
        tagline="Everything you need to know about Kibali Educational Centre. Can't find what you're looking for? Ask us directly."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ", href: "#" },
        ]}
        overlayOpacity={0.68}
        minHeight="52vh"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* ── Search ───────────────────────────────────────────────────────── */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-surface border border-slate-200 text-primary-dark placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all rounded-sm shadow-sm"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* ── Sidebar ──────────────────────────────────────────────────── */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Category list */}
              <div className="bg-surface border border-slate-100">
                <div className="px-6 py-5 border-b border-slate-100">
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary-dark">
                    Categories
                  </h2>
                </div>
                <div className="divide-y divide-slate-50">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const active = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-5 py-3.5 transition-colors ${
                          active
                            ? "bg-accent/10 border-l-2 border-accent"
                            : "hover:bg-slate-50 border-l-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`w-4 h-4 shrink-0 ${active ? "text-accent" : "text-slate-400"}`}
                          />
                          <span className="text-sm font-bold text-primary-dark">
                            {cat.label}
                          </span>
                        </div>
                        {cat.count !== null && (
                          <span className="text-xs font-bold text-slate-400">
                            {cat.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 overflow-hidden">
                {[
                  { value: faqs.length, label: "Answered" },
                  { value: userQuestions.length, label: "Your Questions" },
                ].map((s) => (
                  <div key={s.label} className="bg-surface p-6 text-center">
                    <div className="text-3xl font-black text-primary-dark tracking-tighter mb-1">
                      {s.value}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Main column ──────────────────────────────────────────────── */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-8">
            {/* Success toast */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="flex items-center gap-4 p-5 bg-emerald-50 border border-emerald-200 rounded-sm"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-black text-emerald-900 text-sm uppercase tracking-widest">
                      Question Submitted
                    </p>
                    <p className="text-emerald-700 text-sm mt-0.5">
                      Our team will respond within 48 hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* User questions */}
            {userQuestions.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-1 w-8 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-accent">
                    Your Questions
                  </h2>
                </div>
                <div className="space-y-3">
                  {userQuestions.map((uq) => (
                    <div
                      key={uq.id}
                      className="bg-surface border border-slate-100 p-6"
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 ${
                            uq.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {uq.status === "pending" ? "Pending" : "Answered"}
                        </span>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                          {uq.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          {uq.date}
                        </span>
                      </div>
                      <p className="text-primary-dark font-bold text-sm leading-relaxed">
                        {uq.question}
                      </p>
                      {uq.answer && (
                        <div className="mt-4 p-4 bg-background border-l-2 border-accent">
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {uq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ accordion */}
            <div>
              <div className="flex flex-wrap items-baseline gap-3 mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-primary-dark uppercase tracking-tight">
                  Frequently Asked
                </h2>
                <span className="text-accent font-black text-sm uppercase tracking-widest">
                  {filteredFaqs.length} questions
                </span>
              </div>

              {filteredFaqs.length === 0 && (
                <div className="p-10 border border-slate-100 text-center">
                  <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-wider">
                    No questions found
                  </p>
                </div>
              )}

              <div className="divide-y divide-slate-100 border border-slate-100">
                {filteredFaqs.map((faq) => {
                  const isOpen = openFaqs.includes(faq.id);
                  const catLabel = categories.find(
                    (c) => c.id === faq.category,
                  )?.label;
                  return (
                    <div key={faq.id}>
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className={`w-full text-left flex items-start justify-between gap-4 px-6 py-5 transition-colors ${
                          isOpen ? "bg-slate-50" : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start gap-4 min-w-0">
                          <div
                            className={`shrink-0 w-8 h-8 flex items-center justify-center transition-colors ${
                              isOpen ? "bg-accent" : "bg-accent/10"
                            }`}
                          >
                            <HelpCircle
                              className={`w-4 h-4 ${isOpen ? "text-primary-dark" : "text-accent"}`}
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-black text-primary-dark text-sm md:text-base uppercase tracking-tight leading-snug">
                              {faq.question}
                            </h3>
                            <span className="inline-block mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                              {catLabel}
                            </span>
                          </div>
                        </div>
                        <ChevronDown
                          className={`shrink-0 w-5 h-5 text-slate-400 transition-transform duration-300 mt-1 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-1 pl-[72px] border-t border-slate-100 bg-slate-50">
                              <p className="text-slate-600 text-sm leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ask a question form */}
            <div className="bg-surface border border-slate-100">
              <div className="px-6 md:px-8 py-6 border-b border-slate-100 flex items-center gap-4">
                <div className="w-11 h-11 bg-accent flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
                  <Plus className="w-5 h-5 text-primary-dark" />
                </div>
                <div>
                  <h2 className="font-black text-primary-dark uppercase tracking-tight text-base md:text-lg">
                    Ask a Question
                  </h2>
                  <p className="text-slate-500 text-sm mt-0.5">
                    Can't find what you're looking for? Ask us directly.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-6 md:px-8 py-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <FieldWrapper label="Your Name" error={errors.name?.message}>
                    <input
                      {...register("name")}
                      placeholder="John Doe"
                      className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                    />
                  </FieldWrapper>
                  <FieldWrapper
                    label="Email Address"
                    error={errors.email?.message}
                  >
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="john@example.com"
                      className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                    />
                  </FieldWrapper>
                </div>

                <FieldWrapper label="Category" error={errors.category?.message}>
                  <select
                    {...register("category")}
                    className={`${inputBase} ${errors.category ? inputError : inputNormal}`}
                  >
                    <option value="admissions">Admissions</option>
                    <option value="academics">Academics</option>
                    <option value="fees">Fees & Payment</option>
                    <option value="facilities">Facilities</option>
                    <option value="extracurricular">Extracurricular</option>
                    <option value="general">General</option>
                  </select>
                </FieldWrapper>

                <FieldWrapper
                  label="Your Question"
                  error={errors.question?.message}
                >
                  <textarea
                    {...register("question")}
                    rows={4}
                    placeholder="Type your question here…"
                    className={`${inputBase} resize-none ${errors.question ? inputError : inputNormal}`}
                  />
                  <p className="text-right text-xs text-slate-400 mt-1.5 font-medium">
                    {watch("question")?.length || 0} / 500
                  </p>
                </FieldWrapper>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("agreeToTerms")}
                      className="w-4 h-4 mt-0.5 accent-amber-500"
                    />
                    <span className="text-sm text-slate-600 leading-relaxed">
                      I agree that Kibali may use my question and its answer to
                      help other parents and students.{" "}
                      <span className="text-accent">*</span>
                    </span>
                  </label>
                  <ErrorMsg message={errors.agreeToTerms?.message} />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 px-8 bg-accent text-primary-dark font-black text-xs uppercase tracking-widest rounded-sm hover:bg-primary-dark hover:text-surface transition-colors shadow-xl shadow-accent/20 flex items-center justify-center gap-3"
                >
                  <Send className="w-4 h-4" />
                  Submit Question
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function FieldWrapper({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-[0.2em] text-primary-dark mb-2">
        {label} <span className="text-accent">*</span>
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
