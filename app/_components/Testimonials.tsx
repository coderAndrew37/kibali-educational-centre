"use client";

import { Testimonial } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquarePlus,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialForm from "./TestimonialForm";

interface Props {
  data: Testimonial[];
}

export default function Testimonials({ data }: Props) {
  const [active, setActive] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data || data.length === 0) return null;

  const featured = data[active];

  const prev = () => setActive((p) => (p - 1 + data.length) % data.length);
  const next = () => setActive((p) => (p + 1) % data.length);

  return (
    <>
      <section className="bg-surface py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* ── Header ───────────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 md:mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-1 w-8 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
                <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
                  Community Voices
                </span>
              </div>
              <h2
                className="text-primary-dark font-black uppercase tracking-tighter leading-[1.0]
                text-3xl sm:text-4xl md:text-5xl"
              >
                What Our <span className="text-accent">Parents</span> Say
              </h2>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="shrink-0 flex items-center gap-2 border border-slate-200 text-primary-dark font-black text-xs uppercase tracking-widest px-5 py-3 hover:border-accent hover:text-accent transition-colors"
            >
              <MessageSquarePlus size={15} />
              Share Your Story
            </button>
          </div>

          {/* ── Split layout ─────────────────────────────────────────────── */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left — featured quote */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Stars */}
                  <div className="flex gap-1.5 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < featured.rating
                            ? "fill-accent text-accent"
                            : "text-slate-200"
                        }
                      />
                    ))}
                  </div>

                  {/* Quote mark */}
                  <div
                    className="text-8xl text-accent font-black leading-none mb-2 select-none"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    "
                  </div>

                  {/* Quote text */}
                  <blockquote
                    className="text-primary-dark font-medium leading-relaxed mb-10
                    text-xl sm:text-2xl md:text-3xl tracking-tight"
                  >
                    {featured.content}
                  </blockquote>

                  {/* Author + nav */}
                  <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 shrink-0 overflow-hidden relative">
                        {featured.imageUrl ? (
                          <Image
                            src={featured.imageUrl}
                            alt={featured.parentName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-accent/10 text-accent font-black">
                            {featured.parentName[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-black text-primary-dark text-sm uppercase tracking-tight">
                          {featured.parentName}
                        </p>
                        <p className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mt-0.5">
                          {featured.role}
                        </p>
                      </div>
                    </div>

                    {/* Arrows */}
                    <div className="flex gap-2">
                      <button
                        onClick={prev}
                        aria-label="Previous"
                        className="w-10 h-10 flex items-center justify-center border border-slate-200 hover:border-accent hover:text-accent transition-colors text-slate-400"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={next}
                        aria-label="Next"
                        className="w-10 h-10 flex items-center justify-center border border-slate-200 hover:border-accent hover:text-accent transition-colors text-slate-400"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress dots */}
                  <div className="flex gap-2 mt-6">
                    {data.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        aria-label={`Testimonial ${i + 1}`}
                        className={`h-1 transition-all duration-300 ${
                          active === i
                            ? "w-8 bg-accent"
                            : "w-3 bg-slate-200 hover:bg-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — stacked list */}
            <div className="lg:col-span-5 space-y-px">
              {data.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left flex items-start gap-4 p-5 transition-all duration-200 border-l-2 ${
                    active === i
                      ? "bg-slate-50 border-accent"
                      : "bg-surface border-transparent hover:bg-slate-50 hover:border-slate-200"
                  }`}
                >
                  {/* Avatar */}
                  <div className="shrink-0 w-9 h-9 overflow-hidden relative">
                    {t.imageUrl ? (
                      <Image
                        src={t.imageUrl}
                        alt={t.parentName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-accent/10 text-accent font-black text-sm">
                        {t.parentName[0]}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p
                        className={`font-black text-xs uppercase tracking-tight truncate ${
                          active === i ? "text-primary-dark" : "text-slate-500"
                        }`}
                      >
                        {t.parentName}
                      </p>
                      <div className="flex gap-0.5 shrink-0">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            size={9}
                            className={
                              idx < t.rating
                                ? "fill-accent text-accent"
                                : "text-slate-200"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p
                      className={`text-xs leading-relaxed line-clamp-2 ${
                        active === i ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      {t.content}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-primary-dark/40 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-surface shadow-2xl shadow-slate-900/10 overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-accent font-black text-[10px] uppercase tracking-[0.3em] mb-1">
                  Community Voices
                </p>
                <h3 className="font-black text-primary-dark uppercase tracking-tight text-base">
                  Share Your Story
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 flex items-center justify-center border border-slate-200 hover:border-accent hover:text-accent transition-colors text-slate-400 text-sm font-black"
              >
                ✕
              </button>
            </div>
            <div className="px-8 py-8">
              <TestimonialForm onSuccess={() => setIsModalOpen(false)} />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
