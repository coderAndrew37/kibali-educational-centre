"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, Send, AlertCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  testimonialSchema,
  TestimonialFormValues,
} from "@/lib/validation/testimonial";

interface Props {
  onSuccess: () => void;
}

const inputBase =
  "w-full px-4 py-3 bg-background border text-primary-dark placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 rounded-sm";
const inputNormal = "border-slate-200";
const inputError = "border-red-300";

export default function TestimonialForm({ onSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { rating: 5, hp_field: "" },
  });

  const rating = watch("rating");

  const onSubmit = async (data: TestimonialFormValues) => {
    setIsSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit");
      }
      onSuccess();
    } catch (err: any) {
      setServerError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot */}
      <div
        className="absolute opacity-0 -z-10 h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <input
          type="text"
          {...register("hp_field")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <FieldWrapper label="Your Name" error={errors.parentName?.message}>
          <input
            {...register("parentName")}
            placeholder="Jane Doe"
            className={`${inputBase} ${errors.parentName ? inputError : inputNormal}`}
          />
        </FieldWrapper>
        <FieldWrapper label="Role / Designation" error={errors.role?.message}>
          <input
            {...register("role")}
            placeholder="e.g. Grade 4 Parent"
            className={`${inputBase} ${errors.role ? inputError : inputNormal}`}
          />
        </FieldWrapper>
      </div>

      {/* Star rating */}
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary-dark mb-3">
          Rating <span className="text-accent">*</span>
        </p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue("rating", star)}
              aria-label={`Rate ${star} stars`}
              className="transition-transform active:scale-90 focus:outline-none"
            >
              <Star
                size={26}
                className={
                  star <= rating ? "fill-accent text-accent" : "text-slate-200"
                }
              />
            </button>
          ))}
        </div>
      </div>

      <FieldWrapper label="Your Testimonial" error={errors.content?.message}>
        <textarea
          {...register("content")}
          rows={4}
          placeholder="Tell us about your experience at Kibali…"
          className={`${inputBase} resize-none ${errors.content ? inputError : inputNormal}`}
        />
      </FieldWrapper>

      {serverError && (
        <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="text-xs font-medium">{serverError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-accent text-primary-dark font-black text-xs uppercase tracking-widest rounded-sm hover:bg-primary-dark hover:text-surface transition-colors shadow-lg shadow-accent/20 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-primary-dark/30 border-t-primary-dark rounded-full animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Testimonial
          </>
        )}
      </button>
    </form>
  );
}

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
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs text-red-500 flex items-center gap-1.5 font-medium"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </motion.p>
      )}
    </div>
  );
}
