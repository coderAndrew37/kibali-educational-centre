"use client";

import { Testimonial } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquarePlus,
  Quote,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import TestimonialForm from "./TestimonialForm";

interface Props {
  data: Testimonial[];
}

export default function Testimonials({ data }: Props) {
  // We'll use this to trigger your Zod form modal later
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data || data.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-accent" />
              <span className="text-accent font-bold uppercase tracking-[0.2em] text-xs">
                Community Voices
              </span>
            </div>
            <h2 className="text-primary-dark text-4xl md:text-5xl font-black tracking-tight">
              What Our <span className="text-accent">Parents</span> Say
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Submit Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-accent/20 text-accent font-bold rounded-full hover:bg-accent hover:text-white transition-all shadow-sm active:scale-95"
            >
              <MessageSquarePlus size={20} />
              <span className="text-sm">Share Your Story</span>
            </button>

            {/* Navigation buttons */}
            <div className="hidden md:flex gap-3">
              <button
                aria-label="previous testimonial"
                className="testimonial-prev p-3 rounded-full border border-primary/10 bg-white text-primary hover:bg-accent hover:text-white transition-all shadow-sm"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                aria-label="next testimonial"
                className="testimonial-next p-3 rounded-full border border-primary/10 bg-white text-primary hover:bg-accent hover:text-white transition-all shadow-sm"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            prevEl: ".testimonial-prev",
            nextEl: ".testimonial-next",
          }}
          pagination={{ clickable: true, el: ".swiper-pagination-custom" }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {data.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="h-full bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col justify-between">
                <div>
                  <div className="bg-accent/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent group-hover:rotate-[360deg] transition-all duration-700">
                    <Quote
                      className="text-accent group-hover:text-white transition-colors"
                      size={24}
                    />
                  </div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={16}
                        className={
                          idx < t.rating
                            ? "fill-accent text-accent"
                            : "text-slate-200"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8 italic italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-8 border-t border-slate-50">
                  <div className="h-14 w-14 rounded-2xl bg-slate-100 overflow-hidden relative border-2 border-white shadow-md">
                    {t.imageUrl ? (
                      <Image
                        src={t.imageUrl}
                        alt={t.parentName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary font-bold text-xl">
                        {t.parentName[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-primary-dark font-black text-lg">
                      {t.parentName}
                    </h4>
                    <p className="text-accent text-xs font-bold uppercase tracking-widest">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-pagination-custom flex justify-center gap-2 mt-4 md:hidden" />
      </div>

      {/* Testimonial Modal */}
      {isModalOpen && (
        <TestimonialForm onSuccess={() => setIsModalOpen(false)} />
      )}

      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #e2e8f0;
          opacity: 1;
          transition: all 0.3s;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          width: 30px;
          border-radius: 6px;
          background: #c39333;
        }
      `}</style>
    </section>
  );
}
