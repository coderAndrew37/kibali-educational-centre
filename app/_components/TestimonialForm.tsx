"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { useState } from "react";
import {
  testimonialSchema,
  TestimonialFormValues,
} from "@/lib/validation/testimonial";

interface Props {
  onSuccess: () => void;
}

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

  const currentRating = watch("rating");

  const onSubmit = async (data: TestimonialFormValues) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to submit");
      }

      onSuccess();
      alert("Thank you! Your testimonial has been submitted for review.");
    } catch (err: any) {
      setServerError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* --- HONEYPOT FIELD --- */}
      <div
        className="absolute opacity-0 -z-10 h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="hp_field">If you are human, leave this blank</label>
        <input
          id="hp_field"
          type="text"
          {...register("hp_field")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-bold text-primary-dark mb-2">
          Your Name
        </label>
        <input
          {...register("parentName")}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none transition-all"
          placeholder="John Doe"
        />
        {errors.parentName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.parentName.message}
          </p>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-bold text-primary-dark mb-2">
          Role / Designation
        </label>
        <input
          {...register("role")}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none transition-all"
          placeholder="e.g. Grade 4 Parent"
        />
        {errors.role && (
          <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
        )}
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-bold text-primary-dark mb-2">
          Rating
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              aria-label={`Rate ${star} stars`}
              key={star}
              type="button"
              onClick={() => setValue("rating", star)}
              className="focus:outline-none transition-transform active:scale-90"
            >
              <Star
                size={28}
                className={
                  star <= currentRating
                    ? "fill-accent text-accent"
                    : "text-slate-200"
                }
              />
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-bold text-primary-dark mb-2">
          Your Testimonial
        </label>
        <textarea
          {...register("content")}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none transition-all resize-none"
          placeholder="Tell us about your experience..."
        />
        {errors.content && (
          <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-accent text-white font-black rounded-2xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Send Testimonial"}
      </button>
    </form>
  );
}
