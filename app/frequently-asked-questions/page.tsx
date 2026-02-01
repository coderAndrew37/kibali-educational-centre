// app/faq/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ChevronDown,
  ChevronUp,
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

// Zod Schema for question submission
const questionSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name cannot exceed 100 characters" }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email cannot exceed 100 characters" }),

  category: z.enum(
    [
      "admissions",
      "academics",
      "fees",
      "facilities",
      "extracurricular",
      "general",
    ],
    {
      message: "Please select a category",
    },
  ),

  question: z
    .string()
    .min(10, { message: "Question must be at least 10 characters" })
    .max(500, { message: "Question cannot exceed 500 characters" }),

  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

type QuestionFormData = z.infer<typeof questionSchema>;

export default function FAQPage() {
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userQuestions, setUserQuestions] = useState<
    Array<{
      id: number;
      question: string;
      category: string;
      answer?: string;
      date: string;
      status: "pending" | "answered";
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
    defaultValues: {
      category: "general",
      agreeToTerms: false,
    },
  });

  const categories = [
    {
      id: "all",
      label: "All Questions",
      icon: <HelpCircle className="w-4 h-4" />,
      count: 0,
    },
    {
      id: "admissions",
      label: "Admissions",
      icon: <GraduationCap className="w-4 h-4" />,
      count: 8,
    },
    {
      id: "academics",
      label: "Academics",
      icon: <BookOpen className="w-4 h-4" />,
      count: 6,
    },
    {
      id: "fees",
      label: "Fees & Payment",
      icon: <CreditCard className="w-4 h-4" />,
      count: 5,
    },
    {
      id: "facilities",
      label: "Facilities",
      icon: <Users className="w-4 h-4" />,
      count: 4,
    },
    {
      id: "extracurricular",
      label: "Extracurricular",
      icon: <Clock className="w-4 h-4" />,
      count: 7,
    },
    {
      id: "general",
      label: "General",
      icon: <MessageSquare className="w-4 h-4" />,
      count: 10,
    },
  ];

  const faqs = [
    // Admissions
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

    // Academics
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

    // Fees
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

    // Facilities
    {
      id: 8,
      question: "Do you have boarding facilities?",
      answer:
        "Currently, we offer day school only. However, we're working on boarding facilities for 2025.",
      category: "facilities",
    },

    // Extracurricular
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

    // General
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

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id: number) => {
    setOpenFaqs((prev) =>
      prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id],
    );
  };

  const onSubmit = async (data: QuestionFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newQuestion = {
      id: Date.now(),
      question: data.question,
      category: data.category,
      date: new Date().toISOString().split("T")[0],
      status: "pending" as const,
    };

    setUserQuestions((prev) => [newQuestion, ...prev]);
    setIsSubmitted(true);
    reset();

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  // Load user questions from localStorage
  useEffect(() => {
    const savedQuestions = localStorage.getItem("userQuestions");
    if (savedQuestions) {
      setUserQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  // Save user questions to localStorage
  useEffect(() => {
    localStorage.setItem("userQuestions", JSON.stringify(userQuestions));
  }, [userQuestions]);

  return (
    <main className="min-h-screen pt-20 bg-gradient-to-b from-white via-primary/5 to-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-dark via-primary to-accent overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary/80 to-accent/70" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-white/10 to-accent/20 blur-3xl"
            animate={{
              y: [0, -50, 0],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6"
            >
              Find <span className="text-accent">Answers</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 max-w-3xl mx-auto"
            >
              Everything you need to know about Kibali Educational Centre. Can't
              find what you're looking for? Ask us directly!
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-dark/40 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-primary/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl shadow-xl border border-primary/10 p-6">
                <h2 className="text-2xl font-bold text-primary-dark mb-6">
                  Categories
                </h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20"
                          : "hover:bg-primary/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedCategory === category.id
                              ? "bg-gradient-to-r from-accent to-accent-dark text-white"
                              : "bg-primary/10 text-primary-dark"
                          }`}
                        >
                          {category.icon}
                        </div>
                        <span className="font-medium text-primary-dark">
                          {category.label}
                        </span>
                      </div>
                      {category.id !== "all" && (
                        <span className="text-sm font-semibold text-primary-dark/60">
                          {category.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-8 pt-8 border-t border-primary/10">
                  <h3 className="font-bold text-primary-dark mb-4">
                    FAQ Statistics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-xl">
                      <div className="text-2xl font-bold text-accent mb-1">
                        {faqs.length}
                      </div>
                      <div className="text-sm text-primary-dark/70">
                        Questions Answered
                      </div>
                    </div>
                    <div className="text-center p-4 bg-primary/5 rounded-xl">
                      <div className="text-2xl font-bold text-accent mb-1">
                        {userQuestions.length}
                      </div>
                      <div className="text-sm text-primary-dark/70">
                        Your Questions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - FAQs */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-emerald-900 mb-1">
                        Question Submitted!
                      </h3>
                      <p className="text-emerald-700">
                        Your question has been received. Our team will respond
                        within 48 hours.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* User Questions */}
            {userQuestions.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-primary-dark mb-6 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-accent" />
                  Your Questions
                </h2>
                <div className="space-y-4">
                  {userQuestions.map((userQ) => (
                    <div
                      key={userQ.id}
                      className="bg-white rounded-2xl border border-primary/10 p-6"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              userQ.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {userQ.status === "pending"
                              ? "Pending Response"
                              : "Answered"}
                          </span>
                          <span className="ml-3 text-sm text-primary-dark/60">
                            {userQ.date}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-primary-dark/70 capitalize">
                          {userQ.category}
                        </span>
                      </div>
                      <p className="text-primary-dark font-medium mb-3">
                        {userQ.question}
                      </p>
                      {userQ.answer && (
                        <div className="mt-4 p-4 bg-primary/5 rounded-xl border-l-4 border-accent">
                          <p className="text-primary-dark/80">{userQ.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ List */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary-dark mb-6">
                Frequently Asked Questions
                <span className="text-primary-dark/60 text-lg font-normal ml-2">
                  ({filteredFaqs.length} questions)
                </span>
              </h2>

              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl border border-primary/10 shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-accent/10 to-accent/5 flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-bold text-primary-dark text-lg mb-2">
                            {faq.question}
                          </h3>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-dark">
                            {
                              categories.find((c) => c.id === faq.category)
                                ?.label
                            }
                          </span>
                        </div>
                      </div>
                      {openFaqs.includes(faq.id) ? (
                        <ChevronUp className="w-6 h-6 text-primary-dark/40 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-primary-dark/40 flex-shrink-0" />
                      )}
                    </button>

                    <AnimatePresence>
                      {openFaqs.includes(faq.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-primary/10">
                            <p className="text-primary-dark/80 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Ask Question Form */}
            <div className="bg-white rounded-3xl shadow-xl border border-primary/10 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary-dark">
                    Ask a Question
                  </h2>
                  <p className="text-primary-dark/70">
                    Can't find what you're looking for? Ask us directly!
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-dark mb-2">
                      Your Name *
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.name ? "border-red-300" : "border-primary/20"
                      } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-dark mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email ? "border-red-300" : "border-primary/20"
                      } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-dark mb-2">
                    Category *
                  </label>
                  <select
                    {...register("category")}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.category ? "border-red-300" : "border-primary/20"
                    } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                  >
                    <option value="admissions">Admissions</option>
                    <option value="academics">Academics</option>
                    <option value="fees">Fees & Payment</option>
                    <option value="facilities">Facilities</option>
                    <option value="extracurricular">Extracurricular</option>
                    <option value="general">General</option>
                  </select>
                  {errors.category && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-dark mb-2">
                    Your Question *
                  </label>
                  <textarea
                    {...register("question")}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.question ? "border-red-300" : "border-primary/20"
                    } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none`}
                    placeholder="Type your question here..."
                  />
                  <div className="flex justify-between mt-2">
                    {errors.question && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.question.message}
                      </p>
                    )}
                    <span className="text-sm text-primary-dark/50 ml-auto">
                      {watch("question")?.length || 0}/500 characters
                    </span>
                  </div>
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("agreeToTerms")}
                      className="w-5 h-5 mt-1 text-accent border-primary/20 rounded focus:ring-accent"
                    />
                    <span className="text-primary-dark text-sm">
                      I agree that Kibali Educational Centre may use my question
                      and its answer to help other parents and students. *
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.agreeToTerms.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-8 rounded-xl font-semibold text-lg bg-gradient-to-r from-accent to-accent-dark text-white hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
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
