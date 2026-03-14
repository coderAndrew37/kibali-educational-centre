"use client";

import { submitPublicApplication } from "@/lib/actions/public_admission";
// app/(website)/_components/AdmissionForm.tsx
// Replaces the simulated onSubmit with a real server action call.
// All field names, schema, and UI are preserved from the original — only
// the submission plumbing and success state are changed.

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
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ── Schema (kept identical to original) ───────────────────────────────────────

const admissionSchema = z.object({
  studentFirstName: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z\s]+$/),
  studentLastName: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z\s]+$/),
  studentGender: z.enum(["male", "female", "other"]),
  studentDOB: z.string().refine(
    (date) => {
      const d = new Date(date);
      const now = new Date();
      const age = now.getFullYear() - d.getFullYear();
      return age >= 3 && age <= 18;
    },
    { message: "Student must be between 3 and 18 years old" },
  ),
  currentGrade: z.string().min(1).max(20),
  applyingForGrade: z.string().min(1),
  parentFirstName: z.string().min(2).max(50),
  parentLastName: z.string().min(2).max(50),
  parentEmail: z.string().email(),
  parentPhone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Enter a valid phone number" }),
  parentRelationship: z.enum(["mother", "father", "guardian", "other"]),
  address: z.string().min(10).max(200),
  city: z.string().min(2).max(50),
  postalCode: z.string().min(3).max(20),
  previousSchool: z.string().max(100).optional().or(z.literal("")),
  specialNeeds: z.string().max(500).optional().or(z.literal("")),
  interests: z.string().max(500).optional().or(z.literal("")),
  agreeToTerms: z
    .boolean()
    .refine((v) => v === true, { message: "You must agree to the terms" }),
  receiveUpdates: z.boolean().optional(),
});

type FormData = z.infer<typeof admissionSchema>;

// ── Component ─────────────────────────────────────────────────────────────────

export default function AdmissionForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    reset,
  } = useForm<FormData>({
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

  async function handleNext() {
    let valid = false;
    if (currentStep === 1) {
      valid = await trigger([
        "studentFirstName",
        "studentLastName",
        "studentGender",
        "studentDOB",
        "currentGrade",
        "applyingForGrade",
      ]);
    } else if (currentStep === 2) {
      valid = await trigger([
        "parentFirstName",
        "parentLastName",
        "parentEmail",
        "parentPhone",
        "parentRelationship",
        "address",
        "city",
        "postalCode",
      ]);
    } else {
      valid = true;
    }
    if (valid && currentStep < 4) setCurrentStep((s) => s + 1);
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const names = Array.from(e.target.files ?? []).map((f) => f.name);
    setUploadedFiles((prev) => [...prev, ...names]);
  }

  const onSubmit = (data: FormData) => {
    setServerError(null);
    startTransition(async () => {
      const result = await submitPublicApplication({
        ...data,
        receiveUpdates: data.receiveUpdates ?? false,
      });

      if (result.success && result.referenceNumber) {
        setReferenceNumber(result.referenceNumber);
      } else {
        setServerError(result.message);
      }
    });
  };

  // ── Success screen ─────────────────────────────────────────────────────────

  if (referenceNumber) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-10 text-center max-w-2xl mx-auto"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-black text-primary-dark mb-3">
          Application Submitted!
        </h2>
        <p className="text-slate-500 mb-8 text-lg">
          Thank you for applying to Kibali Academy. We've received your
          application and will be in touch within{" "}
          <strong>3 business days</strong>.
        </p>

        {/* Reference box */}
        <div className="inline-block bg-amber-50 border-2 border-amber-200 rounded-2xl px-8 py-5 mb-8">
          <p className="text-xs font-black uppercase tracking-widest text-amber-600 mb-1">
            Your Application Reference
          </p>
          <p className="text-3xl font-black text-primary-dark tracking-wider">
            {referenceNumber}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Quote this number in any correspondence with us
          </p>
        </div>

        <p className="text-sm text-slate-400 mb-8">
          An acknowledgement email has been sent to{" "}
          <strong className="text-slate-600">{watch("parentEmail")}</strong>.
          Please check your spam folder if you don't see it.
        </p>

        <button
          onClick={() => {
            setReferenceNumber(null);
            setCurrentStep(1);
            setUploadedFiles([]);
            reset();
          }}
          className="text-sm text-accent font-semibold underline underline-offset-4 hover:text-accent/70 transition-colors"
        >
          Submit another application
        </button>
      </motion.div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={[
                  "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
                  currentStep >= step.number
                    ? "bg-gradient-to-r from-accent to-accent-dark text-white"
                    : "bg-white border-2 border-primary/20 text-primary/50",
                ].join(" ")}
              >
                {currentStep > step.number ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </motion.div>
              {index < steps.length - 1 && (
                <div
                  className={[
                    "w-24 h-1 mx-4",
                    currentStep > step.number ? "bg-accent" : "bg-primary/20",
                  ].join(" ")}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {steps.map((step) => (
            <p
              key={step.number}
              className={[
                "text-sm font-semibold",
                currentStep >= step.number ? "text-accent" : "text-primary/50",
              ].join(" ")}
            >
              {step.title}
            </p>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {/* ── Step 1: Student Details ────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-3xl shadow-xl border border-primary/10 p-8"
            >
              <StepHeader
                icon={<User className="w-6 h-6 text-white" />}
                iconBg="from-blue-400 to-cyan-500"
                title="Student Information"
                subtitle="Tell us about the prospective student"
              />

              <div className="space-y-8 mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Field
                    label="First Name *"
                    error={errors.studentFirstName?.message}
                  >
                    <input
                      {...register("studentFirstName")}
                      placeholder="Student's first name"
                      className={inputCls(!!errors.studentFirstName)}
                    />
                  </Field>
                  <Field
                    label="Last Name *"
                    error={errors.studentLastName?.message}
                  >
                    <input
                      {...register("studentLastName")}
                      placeholder="Student's last name"
                      className={inputCls(!!errors.studentLastName)}
                    />
                  </Field>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Field label="Gender *" error={errors.studentGender?.message}>
                    <select
                      {...register("studentGender")}
                      className={inputCls(!!errors.studentGender)}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                  <Field
                    label="Date of Birth *"
                    error={errors.studentDOB?.message}
                  >
                    <input
                      {...register("studentDOB")}
                      type="date"
                      className={inputCls(!!errors.studentDOB)}
                    />
                  </Field>
                  <Field
                    label="Current Grade *"
                    error={errors.currentGrade?.message}
                  >
                    <input
                      {...register("currentGrade")}
                      placeholder="e.g. Grade 4"
                      className={inputCls(!!errors.currentGrade)}
                    />
                  </Field>
                </div>

                <Field
                  label="Applying For Grade *"
                  error={errors.applyingForGrade?.message}
                >
                  <select
                    {...register("applyingForGrade")}
                    className={inputCls(!!errors.applyingForGrade)}
                  >
                    <option value="">Select grade</option>
                    <option value="Pre-Primary 1">Pre-Primary 1 (PP1)</option>
                    <option value="Pre-Primary 2">Pre-Primary 2 (PP2)</option>
                    {Array.from({ length: 8 }, (_, i) => i + 1).map((g) => (
                      <option key={g} value={`Grade ${g}`}>
                        Grade {g}
                      </option>
                    ))}
                    <option value="Grade 7 / JSS 1">Grade 7 / JSS 1</option>
                    <option value="Grade 8 / JSS 2">Grade 8 / JSS 2</option>
                    <option value="Grade 9 / JSS 3">Grade 9 / JSS 3</option>
                  </select>
                </Field>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Step 2: Parent Information ─────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-3xl shadow-xl border border-primary/10 p-8"
            >
              <StepHeader
                icon={<Users className="w-6 h-6 text-white" />}
                iconBg="from-emerald-400 to-teal-500"
                title="Parent/Guardian Information"
                subtitle="Contact details for primary contact"
              />

              <div className="space-y-8 mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Field
                    label="First Name *"
                    error={errors.parentFirstName?.message}
                  >
                    <input
                      {...register("parentFirstName")}
                      placeholder="Parent's first name"
                      className={inputCls(!!errors.parentFirstName)}
                    />
                  </Field>
                  <Field
                    label="Last Name *"
                    error={errors.parentLastName?.message}
                  >
                    <input
                      {...register("parentLastName")}
                      placeholder="Parent's last name"
                      className={inputCls(!!errors.parentLastName)}
                    />
                  </Field>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Field
                    label="Email Address *"
                    error={errors.parentEmail?.message}
                  >
                    <input
                      {...register("parentEmail")}
                      type="email"
                      placeholder="parent@example.com"
                      className={inputCls(!!errors.parentEmail)}
                    />
                  </Field>
                  <Field
                    label="Phone Number *"
                    error={errors.parentPhone?.message}
                  >
                    <input
                      {...register("parentPhone")}
                      type="tel"
                      placeholder="+254 712 345 678"
                      className={inputCls(!!errors.parentPhone)}
                    />
                  </Field>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Field
                    label="Relationship to Student *"
                    error={errors.parentRelationship?.message}
                  >
                    <select
                      {...register("parentRelationship")}
                      className={inputCls(!!errors.parentRelationship)}
                    >
                      <option value="mother">Mother</option>
                      <option value="father">Father</option>
                      <option value="guardian">Guardian</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                  <Field label="City/Town *" error={errors.city?.message}>
                    <input
                      {...register("city")}
                      placeholder="e.g. Nairobi"
                      className={inputCls(!!errors.city)}
                    />
                  </Field>
                </div>
                <Field label="Full Address *" error={errors.address?.message}>
                  <input
                    {...register("address")}
                    placeholder="Street address, apartment, suite, etc."
                    className={inputCls(!!errors.address)}
                  />
                </Field>
                <div className="grid md:grid-cols-2 gap-6">
                  <Field
                    label="Postal Code *"
                    error={errors.postalCode?.message}
                  >
                    <input
                      {...register("postalCode")}
                      placeholder="e.g. 00100"
                      className={inputCls(!!errors.postalCode)}
                    />
                  </Field>
                  <Field label="Previous School (Optional)">
                    <input
                      {...register("previousSchool")}
                      placeholder="Name of previous school"
                      className={inputCls(false)}
                    />
                  </Field>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Step 3: Additional Info ────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-3xl shadow-xl border border-primary/10 p-8"
            >
              <StepHeader
                icon={<FileText className="w-6 h-6 text-white" />}
                iconBg="from-amber-400 to-orange-500"
                title="Additional Information"
                subtitle="Help us know your child better"
              />

              <div className="space-y-8 mt-8">
                {/* Document upload (client-side preview only; actual upload via admin) */}
                <div>
                  <label className="block text-sm font-semibold text-primary-dark mb-4">
                    Supporting Documents (Optional)
                  </label>
                  <div className="border-2 border-dashed border-primary/20 rounded-2xl p-8 text-center hover:border-accent transition-colors">
                    <Upload className="w-12 h-12 text-primary/40 mx-auto mb-4" />
                    <p className="text-primary-dark font-medium mb-1">
                      Upload supporting documents
                    </p>
                    <p className="text-primary-dark/60 text-sm mb-4">
                      Birth certificate, report cards, ID copies (max 5 MB each)
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
                      className="inline-block px-6 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl font-medium cursor-pointer transition-colors text-sm"
                    >
                      Choose Files
                    </label>
                    {uploadedFiles.length > 0 && (
                      <div className="mt-6 text-left space-y-2">
                        {uploadedFiles.map((f, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between bg-primary/5 rounded-lg p-3"
                          >
                            <span className="text-sm text-primary-dark truncate">
                              {f}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setUploadedFiles((prev) =>
                                  prev.filter((_, j) => j !== i),
                                )
                              }
                              className="text-xs text-red-500 hover:text-red-700 ml-3 shrink-0"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Note: you may also bring originals on the day of the
                    assessment interview.
                  </p>
                </div>

                <Field
                  label="Special Needs or Medical Conditions (Optional)"
                  error={errors.specialNeeds?.message}
                >
                  <textarea
                    {...register("specialNeeds")}
                    rows={3}
                    placeholder="Allergies, special needs, medical conditions…"
                    className={inputCls(false) + " resize-none"}
                  />
                </Field>
                <Field
                  label="Student's Interests & Talents (Optional)"
                  error={errors.interests?.message}
                >
                  <textarea
                    {...register("interests")}
                    rows={3}
                    placeholder="Sports, arts, music, clubs…"
                    className={inputCls(false) + " resize-none"}
                  />
                </Field>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Step 4: Review & Submit ────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-3xl shadow-xl border border-primary/10 p-8"
            >
              <StepHeader
                icon={<CheckCircle className="w-6 h-6 text-white" />}
                iconBg="from-purple-400 to-violet-500"
                title="Review & Submit"
                subtitle="Confirm your information before submitting"
              />

              <div className="space-y-8 mt-8">
                <div className="bg-primary/5 rounded-2xl p-6">
                  <p className="font-bold text-primary-dark mb-4">
                    Application Summary
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      [
                        "Student Name",
                        `${watch("studentFirstName")} ${watch("studentLastName")}`,
                      ],
                      ["Applying For", watch("applyingForGrade")],
                      [
                        "Parent/Guardian",
                        `${watch("parentFirstName")} ${watch("parentLastName")}`,
                      ],
                      ["Contact Email", watch("parentEmail")],
                      ["Phone", watch("parentPhone")],
                      ["City", watch("city")],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-sm text-primary-dark/60">{label}</p>
                        <p className="font-semibold text-primary-dark">
                          {value || "—"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("agreeToTerms")}
                    className="w-5 h-5 mt-1 text-accent border-primary/20 rounded focus:ring-accent"
                  />
                  <div>
                    <span className="text-primary-dark text-sm">
                      I certify that the information provided is accurate and
                      complete. *
                    </span>
                    {errors.agreeToTerms && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.agreeToTerms.message}
                      </p>
                    )}
                    <p className="text-primary-dark/60 text-sm mt-1">
                      Submitting this application does not guarantee admission.
                      All admissions are subject to availability and assessment.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("receiveUpdates")}
                    className="w-5 h-5 mt-1 text-accent border-primary/20 rounded focus:ring-accent"
                  />
                  <span className="text-primary-dark text-sm">
                    Yes, I'd like to receive updates about admission events,
                    open days, and important announcements.
                  </span>
                </label>

                {/* Server-level error */}
                {serverError && (
                  <div className="flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-sm text-red-700">{serverError}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Navigation ────────────────────────────────────────────────── */}
        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s - 1)}
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
                disabled={isPending}
                className={[
                  "px-8 py-3 rounded-xl font-semibold flex items-center gap-2",
                  isPending
                    ? "bg-primary/50 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-accent to-accent-dark text-white hover:shadow-xl hover:shadow-accent/25 transition-all",
                ].join(" ")}
              >
                {isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting Application…
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function StepHeader({
  icon,
  iconBg,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center`}
      >
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-primary-dark">{title}</h2>
        <p className="text-primary-dark/70">{subtitle}</p>
      </div>
    </div>
  );
}

function Field({
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
      <label className="block text-sm font-semibold text-primary-dark mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(hasError: boolean): string {
  return [
    "w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-accent/20 transition-all outline-none",
    hasError
      ? "border-red-300 focus:border-red-400"
      : "border-primary/20 focus:border-accent",
  ].join(" ");
}
