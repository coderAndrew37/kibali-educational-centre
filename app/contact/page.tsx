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

// Zod Schema for Contact Form
const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "First name can only contain letters" }),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Last name can only contain letters" }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email cannot exceed 100 characters" }),

  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Please enter a valid phone number",
    })
    .optional()
    .or(z.literal("")),

  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" })
    .max(100, { message: "Subject cannot exceed 100 characters" }),

  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters" })
    .max(1000, { message: "Message cannot exceed 1000 characters" }),

  preferredContact: z.enum(["email", "phone"], {
    message: "Please select a preferred contact method",
  }),

  agreeToPrivacy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", data);
    setIsSubmitted(true);
    reset();
    setIsSubmitting(false);

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Numbers",
      details: ["+254 712 345 678", "+254 723 456 789"],
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Address",
      details: [
        "info@kibalieducentre.ac.ke",
        "admissions@kibalieducentre.ac.ke",
      ],
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Campus",
      details: ["Kibali Road, Nairobi", "P.O. Box 12345-00100"],
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Office Hours",
      details: ["Mon - Fri: 7:30 AM - 5:00 PM", "Sat: 8:00 AM - 1:00 PM"],
      color: "from-purple-400 to-violet-500",
    },
  ];

  return (
    <main className="min-h-screen pt-20 bg-gradient-to-b from-white via-primary/5 to-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-dark via-primary to-accent overflow-hidden">
        {/* Animated Background */}
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
              Get in <span className="text-accent">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 max-w-3xl mx-auto"
            >
              We're here to answer your questions and help you discover how
              Kibali can transform your child's educational journey.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Message */}
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
                    Message Sent Successfully!
                  </h3>
                  <p className="text-emerald-700">
                    Thank you for contacting Kibali Educational Centre. Our team
                    will respond within 24 hours.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-3xl shadow-xl border border-primary/10 p-8">
              <h2 className="text-3xl font-bold text-primary-dark mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-colors"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <div className="text-white">{item.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-dark mb-1">
                        {item.title}
                      </h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-primary-dark/70">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Preview */}
              <div className="mt-8 pt-8 border-t border-primary/10">
                <h3 className="font-bold text-primary-dark mb-4">
                  Visit Our Campus
                </h3>
                <div className="relative h-48 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent/50 flex items-center justify-center">
                    <div className="text-center p-6">
                      <MapPin className="w-12 h-12 text-white/80 mx-auto mb-4" />
                      <p className="text-white font-semibold">
                        Kibali Road, Nairobi
                      </p>
                      <p className="text-white/60 text-sm">
                        Click for directions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-primary/10 p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-primary-dark mb-2">
                  Send Us a Message
                </h2>
                <p className="text-primary-dark/70">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-primary-dark mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      {...register("firstName")}
                      type="text"
                      id="firstName"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.firstName
                          ? "border-red-300"
                          : "border-primary/20"
                      } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.firstName.message}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-primary-dark mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      {...register("lastName")}
                      type="text"
                      id="lastName"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.lastName ? "border-red-300" : "border-primary/20"
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

                {/* Contact Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-primary-dark mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email ? "border-red-300" : "border-primary/20"
                      } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-primary-dark mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      id="phone"
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
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-primary-dark mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    {...register("subject")}
                    type="text"
                    id="subject"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.subject ? "border-red-300" : "border-primary/20"
                    } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                    placeholder="What would you like to discuss?"
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-sm font-semibold text-primary-dark mb-4">
                    Preferred Contact Method *
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {["email", "phone"].map((method) => (
                      <label
                        key={method}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={method}
                          {...register("preferredContact")}
                          className="w-5 h-5 text-accent border-primary/20 focus:ring-accent"
                        />
                        <span className="text-primary-dark capitalize">
                          {method === "email" ? "Email" : "Phone Call"}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.preferredContact && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.preferredContact.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-primary-dark mb-2"
                  >
                    Your Message *
                  </label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={6}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.message ? "border-red-300" : "border-primary/20"
                    } focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none`}
                    placeholder="Please provide details about your inquiry..."
                  />
                  <div className="flex justify-between mt-2">
                    {errors.message && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message.message}
                      </p>
                    )}
                    <span className="text-sm text-primary-dark/50 ml-auto">
                      {watch("message")?.length || 0}/1000 characters
                    </span>
                  </div>
                </div>

                {/* Privacy Policy */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("agreeToPrivacy")}
                      className="w-5 h-5 mt-1 text-accent border-primary/20 rounded focus:ring-accent"
                    />
                    <span className="text-primary-dark text-sm">
                      I agree to the{" "}
                      <a
                        href="/privacy-policy"
                        className="text-accent font-semibold hover:underline"
                      >
                        Privacy Policy
                      </a>{" "}
                      and understand that my data will be processed in
                      accordance with it. *
                    </span>
                  </label>
                  {errors.agreeToPrivacy && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.agreeToPrivacy.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? "bg-primary/50 cursor-not-allowed"
                      : "bg-gradient-to-r from-accent to-accent-dark hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-1"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-white">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span className="text-white">Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-primary-dark/70">
            Quick answers to common inquiries
          </p>
        </div>

        <div className="space-y-4">
          {[
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
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-primary/10 p-6 shadow-sm"
            >
              <h3 className="font-bold text-primary-dark mb-2">
                {faq.question}
              </h3>
              <p className="text-primary-dark/70">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
