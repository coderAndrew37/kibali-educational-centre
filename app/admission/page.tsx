// app/admission/page.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  FileText,
  Upload,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod Schema for Admission Form
const admissionSchema = z.object({
  // Student Information
  studentFirstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "First name can only contain letters" }),

  studentLastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Last name can only contain letters" }),

  studentGender: z
    .enum(["male", "female", "other"])
    .refine((val) => val !== undefined && val !== null, {
      message: "Please select gender",
    }),

  studentDOB: z.string().refine(
    (date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 3 && age <= 18;
    },
    { message: "Student must be between 3 and 18 years old" },
  ),

  currentGrade: z
    .string()
    .min(1, { message: "Please enter current grade" })
    .max(20, { message: "Grade cannot exceed 20 characters" }),

  applyingForGrade: z
    .string()
    .min(1, { message: "Please select grade applying for" }),

  // Parent/Guardian Information
  parentFirstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name cannot exceed 50 characters" }),

  parentLastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name cannot exceed 50 characters" }),

  parentEmail: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email cannot exceed 100 characters" }),

  parentPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number",
  }),

  parentRelationship: z
    .enum(["mother", "father", "guardian", "other"])
    .refine((val) => val !== undefined && val !== null, {
      message: "Please select relationship",
    }),

  // Address Information
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters" })
    .max(200, { message: "Address cannot exceed 200 characters" }),

  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters" })
    .max(50, { message: "City cannot exceed 50 characters" }),

  postalCode: z
    .string()
    .min(3, { message: "Postal code must be at least 3 characters" })
    .max(20, { message: "Postal code cannot exceed 20 characters" }),

  // Additional Information
  previousSchool: z
    .string()
    .min(2, { message: "School name must be at least 2 characters" })
    .max(100, { message: "School name cannot exceed 100 characters" })
    .optional()
    .or(z.literal("")),

  specialNeeds: z
    .string()
    .max(500, {
      message: "Special needs description cannot exceed 500 characters",
    })
    .optional()
    .or(z.literal("")),

  interests: z
    .string()
    .max(500, { message: "Interests cannot exceed 500 characters" })
    .optional()
    .or(z.literal("")),

  // Documents (simulated)
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),

  receiveUpdates: z.boolean().optional(),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

export default function AdmissionPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    reset,
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      studentGender: "male",
      parentRelationship: "mother",
      applyingForGrade: "",
      receiveUpdates: true,
    },
  });

  const steps = [
    { number: 1, title: "Student Details" },
    { number: 2, title: "Parent Information" },
    { number: 3, title: "Additional Info" },
    { number: 4, title: "Review & Submit" },
  ];

  const handleNext = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger([
        "studentFirstName",
        "studentLastName",
        "studentGender",
        "studentDOB",
        "currentGrade",
        "applyingForGrade",
      ]);
    } else if (currentStep === 2) {
      isValid = await trigger([
        "parentFirstName",
        "parentLastName",
        "parentEmail",
        "parentPhone",
        "parentRelationship",
        "address",
        "city",
        "postalCode",
      ]);
    } else if (currentStep === 3) {
      isValid = true; // Additional info is optional
    }

    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileNames = files.map((file) => file.name);
    setUploadedFiles([...uploadedFiles, ...fileNames]);
  };

  const onSubmit = async (data: AdmissionFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Admission form submitted:", data);
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
      setCurrentStep(1);
      setUploadedFiles([]);
    }, 5000);
  };

  return (
    <main className="min-h-screen pt-20 bg-gradient-to-b from-white via-primary/5 to-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-dark via-primary to-accent overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary/80 to-accent/70" />
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-accent/20 to-white/10 blur-3xl"
            animate={{
              y: [0, 50, 0],
              x: [0, -50, 0],
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
              Join Our <span className="text-accent">Family</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 max-w-3xl mx-auto mb-8"
            >
              Begin your child's journey to excellence with Kibali Educational
              Centre. Our admission process is designed to be transparent,
              supportive, and efficient.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Success Message */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto mt-8 px-4"
          >
            <div className="p-8 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-emerald-700 mb-4">
                    Thank you for applying to Kibali Educational Centre. We've
                    received your application and will contact you within 3
                    business days for the next steps in our admission process.
                  </p>
                  <p className="text-emerald-600 text-sm">
                    Application Reference: KEC-
                    {Math.floor(Math.random() * 10000)}-2024
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                    ${
                      currentStep >= step.number
                        ? "bg-gradient-to-r from-accent to-accent-dark text-white"
                        : "bg-white border-2 border-primary/20 text-primary/50"
                    }`}
                >
                  {step.number}
                </motion.div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-24 h-1 mx-4 ${currentStep > step.number ? "bg-accent" : "bg-primary/20"}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div
                  className={`text-sm font-semibold ${currentStep >= step.number ? "text-accent" : "text-primary/50"}`}
                >
                  {step.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Step 1: Student Details */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-3xl shadow-xl border border-primary/10 p-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark">
                      Student Information
                    </h2>
                    <p className="text-primary-dark/70">
                      Tell us about the prospective student
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        First Name *
                      </label>
                      <input
                        {...register("studentFirstName")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.studentFirstName
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                        placeholder="Student's first name"
                      />
                      {errors.studentFirstName && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.studentFirstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Last Name *
                      </label>
                      <input
                        {...register("studentLastName")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.studentLastName
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                        placeholder="Student's last name"
                      />
                      {errors.studentLastName && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.studentLastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Gender *
                      </label>
                      <select
                        {...register("studentGender")}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.studentGender
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.studentGender && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.studentGender.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Date of Birth *
                      </label>
                      <input
                        {...register("studentDOB")}
                        type="date"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.studentDOB
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                      />
                      {errors.studentDOB && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.studentDOB.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Current Grade *
                      </label>
                      <input
                        {...register("currentGrade")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.currentGrade
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                        placeholder="e.g., Grade 4"
                      />
                      {errors.currentGrade && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.currentGrade.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-dark mb-2">
                      Applying For Grade *
                    </label>
                    <select
                      {...register("applyingForGrade")}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.applyingForGrade
                          ? "border-red-300"
                          : "border-primary/20"
                      } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                    >
                      <option value="">Select grade</option>
                      <option value="Pre-Primary 1">Pre-Primary 1 (PP1)</option>
                      <option value="Pre-Primary 2">Pre-Primary 2 (PP2)</option>
                      {Array.from({ length: 8 }, (_, i) => i + 1).map(
                        (grade) => (
                          <option key={grade} value={`Grade ${grade}`}>
                            Grade {grade}
                          </option>
                        ),
                      )}
                      <option value="Form 1">Form 1</option>
                      <option value="Form 2">Form 2</option>
                      <option value="Form 3">Form 3</option>
                      <option value="Form 4">Form 4</option>
                    </select>
                    {errors.applyingForGrade && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.applyingForGrade.message}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 2: Parent Information */}
          <AnimatePresence mode="wait">
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-3xl shadow-xl border border-primary/10 p-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark">
                      Parent/Guardian Information
                    </h2>
                    <p className="text-primary-dark/70">
                      Contact details for primary contact
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        First Name *
                      </label>
                      <input
                        {...register("parentFirstName")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.parentFirstName
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                        placeholder="Parent's first name"
                      />
                      {errors.parentFirstName && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.parentFirstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Last Name *
                      </label>
                      <input
                        {...register("parentLastName")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.parentLastName
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                        placeholder="Parent's last name"
                      />
                      {errors.parentLastName && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.parentLastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Email Address *
                      </label>
                      <input
                        {...register("parentEmail")}
                        type="email"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.parentEmail
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                        placeholder="parent@example.com"
                      />
                      {errors.parentEmail && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.parentEmail.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Phone Number *
                      </label>
                      <input
                        {...register("parentPhone")}
                        type="tel"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.parentPhone
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                        placeholder="+254 712 345 678"
                      />
                      {errors.parentPhone && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.parentPhone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Relationship to Student *
                      </label>
                      <select
                        {...register("parentRelationship")}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.parentRelationship
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                      >
                        <option value="mother">Mother</option>
                        <option value="father">Father</option>
                        <option value="guardian">Guardian</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.parentRelationship && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.parentRelationship.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        City/Town *
                      </label>
                      <input
                        {...register("city")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.city ? "border-red-300" : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                        placeholder="e.g., Nairobi"
                      />
                      {errors.city && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-dark mb-2">
                      Full Address *
                    </label>
                    <input
                      {...register("address")}
                      type="text"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.address ? "border-red-300" : "border-primary/20"
                      } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                      placeholder="Street address, apartment, suite, etc."
                    />
                    {errors.address && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Postal Code *
                      </label>
                      <input
                        {...register("postalCode")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.postalCode
                            ? "border-red-300"
                            : "border-primary/20"
                        } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                        placeholder="e.g., 00100"
                      />
                      {errors.postalCode && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.postalCode.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-dark mb-2">
                        Previous School (Optional)
                      </label>
                      <input
                        {...register("previousSchool")}
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        placeholder="Name of previous school"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Additional Information */}
          <AnimatePresence mode="wait">
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-3xl shadow-xl border border-primary/10 p-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark">
                      Additional Information
                    </h2>
                    <p className="text-primary-dark/70">
                      Help us know your child better
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Document Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-primary-dark mb-4">
                      Required Documents
                    </label>
                    <div className="border-2 border-dashed border-primary/20 rounded-2xl p-8 text-center hover:border-accent transition-colors">
                      <Upload className="w-12 h-12 text-primary/40 mx-auto mb-4" />
                      <p className="text-primary-dark font-medium mb-2">
                        Upload supporting documents
                      </p>
                      <p className="text-primary-dark/60 text-sm mb-4">
                        Birth certificate, previous report cards, ID/passport
                        copy (max 5MB each)
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
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
                                <span className="text-sm text-primary-dark">
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

                  {/* Special Needs */}
                  <div>
                    <label className="block text-sm font-semibold text-primary-dark mb-2">
                      Special Needs or Medical Conditions (Optional)
                    </label>
                    <textarea
                      {...register("specialNeeds")}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                      placeholder="Please describe any special needs, allergies, or medical conditions..."
                    />
                    {errors.specialNeeds && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.specialNeeds.message}
                      </p>
                    )}
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-semibold text-primary-dark mb-2">
                      Student's Interests & Talents (Optional)
                    </label>
                    <textarea
                      {...register("interests")}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                      placeholder="Sports, arts, music, clubs, etc..."
                    />
                    {errors.interests && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.interests.message}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4: Review & Submit */}
          <AnimatePresence mode="wait">
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-3xl shadow-xl border border-primary/10 p-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark">
                      Review & Submit
                    </h2>
                    <p className="text-primary-dark/70">
                      Review your information before submitting
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Review Summary */}
                  <div className="bg-primary/5 rounded-2xl p-6">
                    <h3 className="font-bold text-primary-dark mb-4">
                      Application Summary
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-primary-dark/60">
                          Student Name
                        </p>
                        <p className="font-medium">
                          {watch("studentFirstName")} {watch("studentLastName")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-primary-dark/60">
                          Applying for Grade
                        </p>
                        <p className="font-medium">
                          {watch("applyingForGrade")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-primary-dark/60">
                          Parent/Guardian
                        </p>
                        <p className="font-medium">
                          {watch("parentFirstName")} {watch("parentLastName")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-primary-dark/60">
                          Contact Email
                        </p>
                        <p className="font-medium">{watch("parentEmail")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("agreeToTerms")}
                        className="w-5 h-5 mt-1 text-accent border-primary/20 rounded focus:ring-accent"
                      />
                      <div>
                        <span className="text-primary-dark text-sm">
                          I certify that the information provided is accurate
                          and complete. *
                        </span>
                        {errors.agreeToTerms && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.agreeToTerms.message}
                          </p>
                        )}
                        <p className="text-primary-dark/60 text-sm mt-2">
                          I understand that submitting this application does not
                          guarantee admission, and all admissions are subject to
                          availability and assessment.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Marketing Consent */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("receiveUpdates")}
                        className="w-5 h-5 mt-1 text-accent border-primary/20 rounded focus:ring-accent"
                      />
                      <span className="text-primary-dark text-sm">
                        Yes, I would like to receive updates about admission
                        events, open days, and important announcements from
                        Kibali Educational Centre.
                      </span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-8 py-3 rounded-xl font-semibold border-2 border-primary/20 hover:border-primary/40 text-primary-dark hover:bg-primary/5 transition-all"
              >
                ← Back
              </button>
            )}

            <div className="ml-auto flex gap-4">
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-accent to-accent-dark text-white hover:shadow-xl hover:shadow-accent/25 transition-all flex items-center gap-2"
                >
                  Continue to {steps[currentStep]?.title}
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 ${
                    isSubmitting
                      ? "bg-primary/50 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-accent to-accent-dark text-white hover:shadow-xl hover:shadow-accent/25 transition-all"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Information Box */}
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
          <h3 className="text-xl font-bold text-primary-dark mb-4">
            Need Help?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-primary-dark mb-2">
                Admission Process
              </h4>
              <p className="text-primary-dark/70 text-sm">
                Application → Assessment → Interview → Offer Letter → Enrollment
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary-dark mb-2">
                Required Documents
              </h4>
              <ul className="text-primary-dark/70 text-sm list-disc pl-4">
                <li>Birth Certificate</li>
                <li>Previous School Reports</li>
                <li>ID/Passport Copies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary-dark mb-2">
                Contact Admissions
              </h4>
              <p className="text-primary-dark/70 text-sm">
                Call +254 712 345 678 or email admissions@kibalieducentre.ac.ke
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
