"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Slide {
  img?: string;
  imageUrl?: string;
  title: string;
  sub: string;
  primaryLink: string;
  secondaryLink: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
}

interface HeroSliderProps {
  sanitySlides?: Slide[];
}

export default function HeroSlider({ sanitySlides }: HeroSliderProps) {
  const defaultSlides: Slide[] = [
    {
      img: "/campus-1.jpg",
      title: "Excellence in CBC",
      sub: "Nurturing potential through competency-based learning.",
      primaryLink: "/admissions",
      secondaryLink: "/tour",
      primaryCtaText: "Enroll Your Child",
      secondaryCtaText: "Virtual Tour",
    },
    {
      img: "/sports.jpg",
      title: "Holistic Growth",
      sub: "Discovering talents beyond the traditional classroom.",
      primaryLink: "/admissions",
      secondaryLink: "/tour",
      primaryCtaText: "Join the Team",
      secondaryCtaText: "Take a Tour",
    },
  ];

  const slides = sanitySlides || defaultSlides;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-primary-dark">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.img || slide.imageUrl}
            className={`w-full h-full object-cover opacity-60 transition-transform duration-[6000ms] ease-out ${
              index === current ? "scale-110" : "scale-100"
            }`}
            alt={slide.title}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_var(--color-primary-dark)_120%)] opacity-80" />

          <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6">
            <div className="max-w-4xl w-full space-y-5 sm:space-y-7 md:space-y-8">
              {/* Eyebrow */}
              <div className="inline-block px-4 sm:px-6 py-2 bg-accent/10 border-y border-accent/30 backdrop-blur-sm">
                <span className="text-accent font-bold tracking-[0.3em] text-[10px] sm:text-xs uppercase">
                  Welcome to Kibali Educational Centre
                </span>
              </div>

              {/* Title — grows from mobile to desktop */}
              <h1
                className="text-surface font-black leading-[1.0] tracking-tighter drop-shadow-2xl uppercase
                text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
              >
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p
                className="text-surface/85 font-medium mx-auto leading-relaxed
                text-sm sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-xl md:max-w-2xl"
              >
                {slide.sub}
              </p>

              {/* CTAs — stack on mobile, row on sm+ */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 pt-2 sm:pt-4">
                <Link
                  href={slide.primaryLink || "#"}
                  className="bg-accent text-primary-dark font-black hover:bg-surface transition-all shadow-2xl uppercase rounded-sm
                    px-8 sm:px-12 py-4 sm:py-5 text-xs sm:text-sm tracking-widest"
                >
                  {slide.primaryCtaText || "Enroll Your Child"}
                </Link>
                <Link
                  href={slide.secondaryLink || "#"}
                  className="border-2 border-surface/40 text-surface font-bold hover:bg-surface/10 backdrop-blur-sm transition-all uppercase rounded-sm
                    px-8 sm:px-12 py-4 sm:py-5 text-xs sm:text-sm"
                >
                  {slide.secondaryCtaText || "Virtual Tour"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {slides.map((_, i) => (
            <button
              aria-label={`Go to slide ${i + 1}`}
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 transition-all duration-500 ${
                i === current
                  ? "w-12 bg-accent"
                  : "w-6 bg-surface/20 hover:bg-surface/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
