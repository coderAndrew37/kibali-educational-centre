// app/careers/page.tsx
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
  Zap,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

// Zod Schema for job application
const applicationSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name cannot exceed 50 characters" }),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name cannot exceed 50 characters" }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email cannot exceed 100 characters" }),

  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Please enter a valid phone number",
    }),

  position: z.string().min(1, { message: "Please select a position" }),

  experience: z.string().min(1, { message: "Please select experience level" }),

  coverLetter: z
    .string()
    .min(50, { message: "Cover letter must be at least 50 characters" })
    .max(2000, { message: "Cover letter cannot exceed 2000 characters" }),

  salaryExpectation: z.string().optional().or(z.literal("")),

  noticePeriod: z.string().min(1, { message: "Please select notice period" }),

  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export default function CareersPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedJob, setSelectedJob] = useState<number>(1);
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

  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Competitive Salary",
      desc: "Above-market compensation with annual reviews",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Professional Development",
      desc: "Regular training and conference opportunities",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health Insurance",
      desc: "Comprehensive medical cover for you and family",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Hours",
      desc: "Work-life balance with flexible scheduling",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Recognition",
      desc: "Awards and recognition for outstanding work",
    },
    {
      icon: <Globe className="w-6 h-6" />,
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
        "We're looking for passionate Primary School Teachers to join our team. You'll be responsible for delivering engaging lessons following the CBC curriculum.",
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

  const selectedJobDetails = jobOpenings.find((job) => job.id === selectedJob);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileNames = files.map((file) => file.name);
    setUploadedFiles([...uploadedFiles, ...fileNames]);
  };

  const onSubmit = async (data: ApplicationFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Application submitted:", data);
    setIsSubmitted(true);
    reset();
    setUploadedFiles([]);

    setTimeout(() => setIsSubmitted(false), 5000);
  };

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
              Work With <span className="text-accent">Us</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 max-w-3xl mx-auto mb-8"
            >
              Join our team of passionate educators and help shape the future of
              learning. Be part of an institution that values innovation,
              growth, and making a difference.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Message */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-8 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl shadow-lg"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                  Application Submitted!
                </h3>
                <p className="text-emerald-700 mb-4">
                  Thank you for applying to join Kibali Educational Centre.
                  We've received your application and will contact you within
                  5-7 business days if your qualifications match our
                  requirements.
                </p>
                <p className="text-emerald-600 text-sm">
                  Application Reference: KEC-CAREER-
                  {Math.floor(Math.random() * 10000)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Why Work With Us */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-dark mb-4">
              Why Join Kibali?
            </h2>
            <p className="text-primary-dark/70 max-w-3xl mx-auto">
              We're more than just a school - we're a community of innovators,
              mentors, and change-makers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 border border-primary/10 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mb-6">
                  <div className="text-accent">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3">
                  {benefit.title}
                </h3>
                <p className="text-primary-dark/70">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Job Openings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-primary/10 shadow-lg overflow-hidden">
              <div className="p-8 border-b border-primary/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary-dark">
                    Current Openings
                  </h2>
                  <span className="text-sm font-semibold text-primary-dark/60 bg-primary/10 px-3 py-1 rounded-full">
                    {jobOpenings.length} positions
                  </span>
                </div>

                <div className="space-y-4">
                  {jobOpenings.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJob(job.id)}
                      className={`p-6 rounded-xl border cursor-pointer transition-all ${
                        selectedJob === job.id
                          ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                          : "border-primary/10 hover:border-accent/30 hover:bg-primary/5"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-accent" />
                          </div>
                        </div>

                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-primary-dark">
                              {job.title}
                            </h3>
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                job.type === "Full-time"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : job.type === "Part-time"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {job.type}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-primary-dark/60">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {job.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {job.experience}
                            </span>
                          </div>

                          <p className="text-primary-dark/70 mt-3 line-clamp-2">
                            {job.description}
                          </p>
                        </div>

                        <div className="flex-shrink-0">
                          <ArrowRight
                            className={`w-6 h-6 ${
                              selectedJob === job.id
                                ? "text-accent"
                                : "text-primary-dark/40"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Job Details */}
              {selectedJobDetails && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary-dark mb-2">
                    {selectedJobDetails.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mb-8">
                    <span className="flex items-center gap-2 text-primary-dark/70">
                      <MapPin className="w-5 h-5" />
                      {selectedJobDetails.location}
                    </span>
                    <span className="flex items-center gap-2 text-primary-dark/70">
                      <Briefcase className="w-5 h-5" />
                      {selectedJobDetails.department}
                    </span>
                    <span className="flex items-center gap-2 text-primary-dark/70">
                      <Clock className="w-5 h-5" />
                      {selectedJobDetails.type}
                    </span>
                    <span className="flex items-center gap-2 text-primary-dark/70">
                      <DollarSign className="w-5 h-5" />
                      {selectedJobDetails.salary}
                    </span>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xl font-bold text-primary-dark mb-4">
                        Job Description
                      </h4>
                      <p className="text-primary-dark/70">
                        {selectedJobDetails.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-primary-dark mb-4">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {selectedJobDetails.responsibilities.map(
                          (resp, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-primary-dark/70"
                            >
                              <Target className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-primary-dark mb-4">
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {selectedJobDetails.requirements.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-primary-dark/70"
                          >
                            <Star className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl border border-primary/10 shadow-lg p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark">
                      Apply Now
                    </h2>
                    <p className="text-primary-dark/70">
                      Fill out the application form
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        First Name *
                      </label>
                      <input
                        {...register("firstName")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.firstName
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Last Name *
                      </label>
                      <input
                        {...register("lastName")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.lastName
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
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

                  <div>
                    <label className="block text-sm font-semibold text-primary-dark mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.phone ? "border-red-300" : "border-primary/20"
                      } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                      placeholder="+254 712 345 678"
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Position *
                      </label>
                      <select
                        {...register("position")}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.position
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                      >
                        <option value="primary-teacher">
                          Primary School Teacher
                        </option>
                        <option value="math-teacher">
                          Mathematics Teacher
                        </option>
                        <option value="counselor">School Counselor</option>
                        <option value="ict-assistant">ICT Lab Assistant</option>
                        <option value="sports-coach">Sports Coach</option>
                        <option value="admin-assistant">
                          Administrative Assistant
                        </option>
                      </select>
                      {errors.position && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.position.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Experience *
                      </label>
                      <select
                        {...register("experience")}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.experience
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                      >
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5+">5+ years</option>
                      </select>
                      {errors.experience && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.experience.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-primary-dark mb-4">
                      Upload Documents
                    </label>
                    <div className="border-2 border-dashed border-primary/20 rounded-2xl p-6 text-center hover:border-accent transition-colors">
                      <Upload className="w-12 h-12 text-primary/40 mx-auto mb-4" />
                      <p className="text-primary-dark font-medium mb-2">
                        CV, Cover Letter, Certificates
                      </p>
                      <p className="text-primary-dark/60 text-sm mb-4">
                        PDF, DOC, DOCX (max 5MB each)
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="inline-block px-6 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl font-medium cursor-pointer transition-colors"
                      >
                        Choose Files
                      </label>

                      {uploadedFiles.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-sm font-semibold text-primary-dark mb-2">
                            Uploaded Files:
                          </h4>
                          <div className="space-y-2">
                            {uploadedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-primary/5 rounded-lg p-3"
                              >
                                <span className="text-sm text-primary-dark truncate">
                                  {file}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setUploadedFiles(
                                      uploadedFiles.filter(
                                        (_, i) => i !== index,
                                      ),
                                    )
                                  }
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-dark mb-2">
                      Cover Letter *
                    </label>
                    <textarea
                      {...register("coverLetter")}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.coverLetter
                          ? "border-red-300"
                          : "border-primary/20"
                      } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none`}
                      placeholder="Tell us why you're the right fit for this position..."
                    />
                    <div className="flex justify-between mt-2">
                      {errors.coverLetter && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.coverLetter.message}
                        </p>
                      )}
                      <span className="text-sm text-primary-dark/50 ml-auto">
                        {watch("coverLetter")?.length || 0}/2000 characters
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Salary Expectation (Optional)
                      </label>
                      <input
                        {...register("salaryExpectation")}
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        placeholder="e.g., Ksh 80,000-100,000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Notice Period *
                      </label>
                      <select
                        {...register("noticePeriod")}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.noticePeriod
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                      >
                        <option value="immediate">Immediately Available</option>
                        <option value="1-week">1 Week</option>
                        <option value="2-weeks">2 Weeks</option>
                        <option value="1-month">1 Month</option>
                        <option value="2-months">2 Months</option>
                      </select>
                      {errors.noticePeriod && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.noticePeriod.message}
                        </p>
                      )}
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
                        I certify that the information provided is accurate and
                        give Kibali Educational Centre permission to process my
                        application data. *
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
                    Submit Application
                  </button>
                </form>
              </div>

              {/* Recruitment Process */}
              <div className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl border border-primary/20 p-8">
                <h3 className="text-xl font-bold text-primary-dark mb-6">
                  Our Recruitment Process
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Application Review",
                      desc: "Screening within 5-7 business days",
                    },
                    {
                      step: 2,
                      title: "Phone Interview",
                      desc: "Initial screening call",
                    },
                    {
                      step: 3,
                      title: "In-Person Interview",
                      desc: "Meet the team at our campus",
                    },
                    {
                      step: 4,
                      title: "Teaching Demo",
                      desc: "For teaching positions only",
                    },
                    {
                      step: 5,
                      title: "Reference Check",
                      desc: "Background verification",
                    },
                    {
                      step: 6,
                      title: "Job Offer",
                      desc: "Welcome to the team!",
                    },
                  ].map((step) => (
                    <div key={step.step} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-accent-dark flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">
                          {step.step}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-primary-dark">
                          {step.title}
                        </h4>
                        <p className="text-sm text-primary-dark/60">
                          {step.desc}
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
