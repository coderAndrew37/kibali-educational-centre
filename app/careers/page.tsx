"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Briefcase,
  Users,
  Award,
  Heart,
  Clock,
  MapPin,
  DollarSign,
  GraduationCap,
  Upload,
  Send,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../_components/PageHero";

// ─── Schema ──────────────────────────────────────────────────────────────────

const applicationSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email().max(100),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  position: z.string().min(1),
  experience: z.string().min(1),
  coverLetter: z.string().min(50).max(2000),
  salaryExpectation: z.string().optional().or(z.literal("")),
  noticePeriod: z.string().min(1),
  agreeToTerms: z
    .boolean()
    .refine((v) => v === true, { message: "You must agree to the terms" }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

// ─── Data ─────────────────────────────────────────────────────────────────────

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Salary",
    desc: "Above-market compensation with annual reviews",
  },
  {
    icon: GraduationCap,
    title: "Professional Development",
    desc: "Regular training and conference opportunities",
  },
  {
    icon: Heart,
    title: "Health Insurance",
    desc: "Comprehensive medical cover for you and family",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    desc: "Work-life balance with flexible scheduling",
  },
  {
    icon: Award,
    title: "Recognition",
    desc: "Awards and recognition for outstanding work",
  },
  {
    icon: Globe,
    title: "Global Network",
    desc: "Connect with educators worldwide",
  },
];

const jobOpenings = [
  {
    id: 1,
    title: "Primary School Teacher",
    department: "Academics",
    type: "Full-time",
    location: "Nairobi",
    experience: "2+ years",
    salary: "Competitive",
    description:
      "We're looking for passionate Primary School Teachers to join our team. You'll deliver engaging lessons following the CBC curriculum.",
    requirements: [
      "Bachelor's degree in Education",
      "TSC registration",
      "Experience with CBC curriculum",
      "Strong classroom management skills",
    ],
    responsibilities: [
      "Plan and deliver engaging lessons",
      "Assess student progress",
      "Maintain classroom discipline",
      "Participate in school activities",
    ],
    category: "teaching",
  },
  {
    id: 2,
    title: "Mathematics Teacher",
    department: "Academics",
    type: "Full-time",
    location: "Nairobi",
    experience: "3+ years",
    salary: "Competitive",
    description:
      "Experienced Mathematics teacher needed for upper primary and junior secondary. Must be passionate about making math fun and accessible.",
    requirements: [
      "Degree in Mathematics or Education",
      "TSC registration",
      "Proven track record",
      "Strong analytical skills",
    ],
    responsibilities: [
      "Teach mathematics concepts",
      "Develop lesson plans",
      "Prepare students for exams",
      "Organize math competitions",
    ],
    category: "teaching",
  },
  {
    id: 3,
    title: "School Counselor",
    department: "Student Welfare",
    type: "Full-time",
    location: "Nairobi",
    experience: "3+ years",
    salary: "Competitive",
    description:
      "Provide guidance and support to students, helping them navigate academic and personal challenges.",
    requirements: [
      "Degree in Counseling Psychology",
      "Licensed counselor",
      "Experience with children",
      "Excellent communication skills",
    ],
    responsibilities: [
      "Provide student counseling",
      "Organize wellness programs",
      "Work with parents",
      "Crisis intervention",
    ],
    category: "support",
  },
  {
    id: 4,
    title: "ICT Lab Assistant",
    department: "Technology",
    type: "Part-time",
    location: "Nairobi",
    experience: "1+ years",
    salary: "Negotiable",
    description:
      "Support our ICT department in maintaining computer labs and assisting with technology integration in classrooms.",
    requirements: [
      "Diploma in IT",
      "Hardware troubleshooting",
      "Basic networking",
      "Patience with students",
    ],
    responsibilities: [
      "Maintain computer equipment",
      "Assist in ICT classes",
      "Troubleshoot technical issues",
      "Update software",
    ],
    category: "technical",
  },
  {
    id: 5,
    title: "Sports Coach",
    department: "Extracurricular",
    type: "Contract",
    location: "Nairobi",
    experience: "2+ years",
    salary: "Negotiable",
    description:
      "Coach for football and athletics. Must be able to train teams for inter-school competitions.",
    requirements: [
      "Sports science background",
      "Coaching certification",
      "First aid training",
      "Team management skills",
    ],
    responsibilities: [
      "Train sports teams",
      "Organize matches",
      "Ensure safety",
      "Maintain equipment",
    ],
    category: "sports",
  },
  {
    id: 6,
    title: "Administrative Assistant",
    department: "Administration",
    type: "Full-time",
    location: "Nairobi",
    experience: "2+ years",
    salary: "Competitive",
    description:
      "Provide administrative support to school management and handle front office operations.",
    requirements: [
      "Diploma in Business Administration",
      "Computer literate",
      "Excellent organization",
      "Customer service skills",
    ],
    responsibilities: [
      "Handle inquiries",
      "Manage records",
      "Assist with events",
      "Support staff",
    ],
    category: "admin",
  },
];

const recruitmentSteps = [
  {
    step: 1,
    title: "Application Review",
    desc: "Screening within 5–7 business days",
  },
  { step: 2, title: "Phone Interview", desc: "Initial screening call" },
  {
    step: 3,
    title: "In-Person Interview",
    desc: "Meet the team at our campus",
  },
  { step: 4, title: "Teaching Demo", desc: "For teaching positions only" },
  { step: 5, title: "Reference Check", desc: "Background verification" },
  { step: 6, title: "Job Offer", desc: "Welcome to the team!" },
];

const typeBadge: Record<string, string> = {
  "Full-time": "bg-emerald-100 text-emerald-800",
  "Part-time": "bg-blue-100 text-blue-800",
  Contract: "bg-amber-100 text-amber-800",
};

// Shared input styles — matches ContactPage / FAQPage
const inputBase =
  "w-full px-4 py-3 bg-background border text-primary-dark placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 rounded-sm";
const inputNormal = "border-slate-200";
const inputError = "border-red-300";

// ─── Component ────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedJob, setSelectedJob] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      position: "primary-teacher",
      experience: "1-3",
      noticePeriod: "immediate",
      agreeToTerms: false,
    },
  });

  const selectedJobDetails = jobOpenings.find((j) => j.id === selectedJob)!;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).map((f) => f.name);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const onSubmit = async (data: ApplicationFormData) => {
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Application submitted:", data);
    setIsSubmitted(true);
    reset();
    setUploadedFiles([]);
    setTimeout(() => setIsSubmitted(false), 6000);
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        image="/campus-1.jpg"
        eyebrow="Join Our Team"
        title="Work With Us"
        accentWord="Us"
        tagline="Join a community of passionate educators and help shape the future of learning. Be part of an institution that values innovation, growth, and making a difference."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "#" },
        ]}
        overlayOpacity={0.68}
        minHeight="55vh"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-16 md:space-y-24">
        {/* ── Success toast ────────────────────────────────────────────────── */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex items-start gap-4 p-6 bg-emerald-50 border border-emerald-200 rounded-sm"
            >
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-black text-emerald-900 text-sm uppercase tracking-widest mb-1">
                  Application Submitted
                </p>
                <p className="text-emerald-700 text-sm leading-relaxed">
                  Thank you for applying. We'll be in touch within 5–7 business
                  days if your qualifications match our requirements.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Benefits ─────────────────────────────────────────────────────── */}
        <div>
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-5">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-xl text-accent"
              >
                ✦
              </motion.span>
              <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
                Why Join Us
              </span>
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-xl text-accent"
              >
                ✦
              </motion.span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary-dark uppercase tracking-tight leading-[1.05] mb-4">
              Why Join <span className="text-accent">Kibali?</span>
            </h2>
            <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              We're more than just a school — we're a community of innovators,
              mentors, and change-makers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-5 p-6 md:p-8 bg-surface border border-slate-100 hover:border-accent/30 transition-colors duration-300"
                >
                  <div className="w-11 h-11 shrink-0 bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                    <Icon className="w-5 h-5 text-primary-dark" />
                  </div>
                  <div>
                    <h3 className="font-black text-primary-dark uppercase tracking-tight text-sm mb-1">
                      {b.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Jobs + Form ──────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Job list + details — col-span-3 */}
          <div className="lg:col-span-3 space-y-6">
            {/* Section header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-1 w-8 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
                  <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
                    Open Roles
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-primary-dark uppercase tracking-tight">
                  Current Openings
                </h2>
              </div>
              <span className="shrink-0 text-xs font-black uppercase tracking-widest text-accent border border-accent/30 px-3 py-1.5">
                {jobOpenings.length} positions
              </span>
            </div>

            {/* Job cards */}
            <div className="space-y-3">
              {jobOpenings.map((job) => {
                const active = selectedJob === job.id;
                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job.id)}
                    className={`flex items-start gap-4 p-5 md:p-6 cursor-pointer border transition-all duration-300 ${
                      active
                        ? "border-accent bg-accent/5 border-l-4"
                        : "border-slate-100 hover:border-accent/30 border-l-4 border-l-transparent"
                    }`}
                  >
                    <div
                      className={`shrink-0 w-10 h-10 flex items-center justify-center transition-colors ${active ? "bg-accent" : "bg-slate-100"}`}
                    >
                      <Briefcase
                        className={`w-5 h-5 ${active ? "text-primary-dark" : "text-slate-400"}`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="font-black text-primary-dark text-sm uppercase tracking-tight">
                          {job.title}
                        </h3>
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 ${typeBadge[job.type]}`}
                        >
                          {job.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {job.experience}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                        {job.description}
                      </p>
                    </div>

                    <ArrowRight
                      className={`shrink-0 w-4 h-4 mt-1 transition-colors ${active ? "text-accent" : "text-slate-300"}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Selected job detail panel */}
            <div className="bg-surface border border-slate-100 overflow-hidden">
              <div className="px-6 md:px-8 py-6 border-b border-slate-100 bg-slate-50">
                <h3 className="font-black text-primary-dark text-lg md:text-xl uppercase tracking-tight mb-3">
                  {selectedJobDetails.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  {[
                    { icon: MapPin, val: selectedJobDetails.location },
                    { icon: Briefcase, val: selectedJobDetails.department },
                    { icon: Clock, val: selectedJobDetails.type },
                    { icon: DollarSign, val: selectedJobDetails.salary },
                  ].map(({ icon: Icon, val }) => (
                    <span key={val} className="flex items-center gap-1.5">
                      <Icon className="w-4 h-4 text-accent shrink-0" />
                      {val}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-6 md:px-8 py-6 space-y-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">
                    Description
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {selectedJobDetails.description}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">
                    Key Responsibilities
                  </p>
                  <ul className="space-y-2">
                    {selectedJobDetails.responsibilities.map((r) => (
                      <li
                        key={r}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <Target className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">
                    Requirements
                  </p>
                  <ul className="space-y-2">
                    {selectedJobDetails.requirements.map((r) => (
                      <li
                        key={r}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <Star className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Application form + process — col-span-2 */}
          <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-28">
            {/* Form */}
            <div className="bg-surface border border-slate-100">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-4">
                <div className="w-11 h-11 bg-accent flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
                  <Send className="w-5 h-5 text-primary-dark" />
                </div>
                <div>
                  <h2 className="font-black text-primary-dark uppercase tracking-tight text-base">
                    Apply Now
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Fill out the application form below
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-6 py-6 space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
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

                <FieldWrapper label="Email" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="john@example.com"
                    className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                  />
                </FieldWrapper>

                <FieldWrapper label="Phone" error={errors.phone?.message}>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="+254 712 345 678"
                    className={`${inputBase} ${errors.phone ? inputError : inputNormal}`}
                  />
                </FieldWrapper>

                <div className="grid grid-cols-2 gap-4">
                  <FieldWrapper
                    label="Position"
                    error={errors.position?.message}
                  >
                    <select
                      {...register("position")}
                      className={`${inputBase} ${errors.position ? inputError : inputNormal}`}
                    >
                      <option value="primary-teacher">Primary Teacher</option>
                      <option value="math-teacher">Maths Teacher</option>
                      <option value="counselor">Counselor</option>
                      <option value="ict-assistant">ICT Assistant</option>
                      <option value="sports-coach">Sports Coach</option>
                      <option value="admin-assistant">Admin Assistant</option>
                    </select>
                  </FieldWrapper>
                  <FieldWrapper
                    label="Experience"
                    error={errors.experience?.message}
                  >
                    <select
                      {...register("experience")}
                      className={`${inputBase} ${errors.experience ? inputError : inputNormal}`}
                    >
                      <option value="0-1">0–1 years</option>
                      <option value="1-3">1–3 years</option>
                      <option value="3-5">3–5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </FieldWrapper>
                </div>

                {/* File upload */}
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary-dark mb-2">
                    Upload Documents
                  </p>
                  <label
                    htmlFor="resume-upload"
                    className="flex flex-col items-center justify-center gap-2 py-6 border-2 border-dashed border-slate-200 hover:border-accent transition-colors cursor-pointer"
                  >
                    <Upload className="w-6 h-6 text-slate-400" />
                    <span className="text-sm font-bold text-primary-dark">
                      CV, Certificates
                    </span>
                    <span className="text-xs text-slate-400">
                      PDF, DOC, DOCX — max 5 MB
                    </span>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      id="resume-upload"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {uploadedFiles.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {uploadedFiles.map((file, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between bg-background px-3 py-2 border border-slate-100"
                        >
                          <span className="text-xs text-primary-dark truncate">
                            {file}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setUploadedFiles((p) =>
                                p.filter((_, j) => j !== i),
                              )
                            }
                            className="text-xs text-red-400 hover:text-red-600 font-bold ml-2 shrink-0"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <FieldWrapper
                  label="Cover Letter"
                  error={errors.coverLetter?.message}
                >
                  <textarea
                    {...register("coverLetter")}
                    rows={4}
                    placeholder="Tell us why you're the right fit…"
                    className={`${inputBase} resize-none ${errors.coverLetter ? inputError : inputNormal}`}
                  />
                  <p className="text-right text-xs text-slate-400 mt-1">
                    {watch("coverLetter")?.length || 0} / 2000
                  </p>
                </FieldWrapper>

                <div className="grid grid-cols-2 gap-4">
                  <FieldWrapper label="Salary (optional)" optional>
                    <input
                      {...register("salaryExpectation")}
                      placeholder="e.g. Ksh 80k"
                      className={`${inputBase} ${inputNormal}`}
                    />
                  </FieldWrapper>
                  <FieldWrapper
                    label="Notice Period"
                    error={errors.noticePeriod?.message}
                  >
                    <select
                      {...register("noticePeriod")}
                      className={`${inputBase} ${errors.noticePeriod ? inputError : inputNormal}`}
                    >
                      <option value="immediate">Immediate</option>
                      <option value="1-week">1 Week</option>
                      <option value="2-weeks">2 Weeks</option>
                      <option value="1-month">1 Month</option>
                      <option value="2-months">2 Months</option>
                    </select>
                  </FieldWrapper>
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("agreeToTerms")}
                      className="w-4 h-4 mt-0.5 accent-amber-500"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I certify that the information provided is accurate and
                      give Kibali permission to process my application data.{" "}
                      <span className="text-accent">*</span>
                    </span>
                  </label>
                  <ErrorMsg message={errors.agreeToTerms?.message} />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-8 bg-accent text-primary-dark font-black text-xs uppercase tracking-widest rounded-sm hover:bg-primary-dark hover:text-surface transition-colors shadow-xl shadow-accent/20 flex items-center justify-center gap-3"
                >
                  <Send className="w-4 h-4" />
                  Submit Application
                </button>
              </form>
            </div>

            {/* Recruitment process */}
            <div className="relative bg-primary-dark overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative z-10 px-6 py-7">
                <div className="inline-block px-5 py-2 bg-accent/10 border-y border-accent/30 mb-6">
                  <span className="text-accent font-black tracking-[0.3em] text-[10px] uppercase">
                    Hiring Process
                  </span>
                </div>
                <div className="space-y-5">
                  {recruitmentSteps.map((s, i) => (
                    <div key={s.step} className="flex items-start gap-4">
                      <div className="shrink-0 w-8 h-8 bg-accent flex items-center justify-center">
                        <span className="text-primary-dark font-black text-xs">
                          {s.step}
                        </span>
                      </div>
                      {/* Connecting line */}
                      <div className="relative flex-1">
                        <p className="font-black text-surface text-sm uppercase tracking-tight">
                          {s.title}
                        </p>
                        <p className="text-surface/50 text-xs mt-0.5">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 text-xs text-red-500 flex items-center gap-1.5 font-medium"
    >
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {message}
    </motion.p>
  );
}
