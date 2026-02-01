"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Users, GraduationCap, ChevronRight } from "lucide-react";
import { VisitFormValues, VisitSchema } from "@/lib/validation/visitForm";

export default function VisitForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<VisitFormValues>({
    resolver: zodResolver(VisitSchema),
    defaultValues: { visitorCount: 1 },
  });

  const onSubmit = async (data: VisitFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Tour Requested:", data);
    alert("Request received! We will contact you shortly to confirm.");
    reset();
  };

  const inputStyles =
    "w-full bg-slate-50 border-b border-slate-200 py-3 px-1 text-sm focus:border-[var(--kibali-amber)] focus:outline-none transition-colors placeholder:text-slate-300 text-slate-700";
  const labelStyles =
    "text-[10px] uppercase tracking-widest font-bold text-slate-400 flex items-center gap-2 mb-1";
  const errorStyles = "text-[10px] text-red-500 mt-1 font-medium";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Parent Name */}
        <div>
          <label className={labelStyles}>Parent / Guardian Name</label>
          <input
            {...register("parentName")}
            placeholder="John Doe"
            className={inputStyles}
          />
          {errors.parentName && (
            <p className={errorStyles}>{errors.parentName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className={labelStyles}>Email Address</label>
          <input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            className={inputStyles}
          />
          {errors.email && (
            <p className={errorStyles}>{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className={labelStyles}>Phone Number</label>
          <input
            {...register("phone")}
            placeholder="0712 345 678"
            className={inputStyles}
          />
          {errors.phone && (
            <p className={errorStyles}>{errors.phone.message}</p>
          )}
        </div>

        {/* Child Level */}
        <div>
          <label className={labelStyles}>
            <GraduationCap size={14} /> Interest Level
          </label>
          <select {...register("childLevel")} className={inputStyles}>
            <option value="">Select Level</option>
            <option value="kindergarten">Kindergarten</option>
            <option value="primary">Primary School</option>
            <option value="jss">Junior Secondary (JSS)</option>
          </select>
          {errors.childLevel && (
            <p className={errorStyles}>{errors.childLevel.message}</p>
          )}
        </div>

        {/* Visit Date */}
        <div>
          <label className={labelStyles}>
            <Calendar size={14} /> Preferred Date
          </label>
          <input
            {...register("visitDate")}
            type="date"
            className={inputStyles}
          />
          {errors.visitDate && (
            <p className={errorStyles}>{errors.visitDate.message}</p>
          )}
        </div>

        {/* Visitor Count */}
        <div>
          <label className={labelStyles}>
            <Users size={14} /> Total Visitors
          </label>
          <input
            {...register("visitorCount", { valueAsNumber: true })}
            type="number"
            className={inputStyles}
          />
          {errors.visitorCount && (
            <p className={errorStyles}>{errors.visitorCount.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className={labelStyles}>Special Requirements or Questions</label>
        <textarea
          {...register("message")}
          rows={3}
          placeholder="Any specific facilities you'd like to see?"
          className={inputStyles}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto px-12 py-4 bg-[var(--kibali-navy)] text-white text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[var(--kibali-amber)] hover:text-[var(--kibali-dark)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {isSubmitting ? "Processing..." : "Confirm Tour Request"}
        {!isSubmitting && (
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        )}
      </button>
    </form>
  );
}
