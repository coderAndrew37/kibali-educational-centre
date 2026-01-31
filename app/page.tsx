// app/page.tsx
import { getTestimonials } from "@/lib/services/testimonial";
import CTA from "./_components/CTA";
import FounderSection from "./_components/FounderSection";
import Gallery from "./_components/Gallery";
import Hero from "./_components/Hero"; // This is your HeroSlider
import { SchoolStats } from "./_components/SchoolStats";
import WhyKibali from "./_components/WhyKibali";
import { getHeroSlides } from "@/lib/services/hero";
import Testimonials from "./_components/Testimonials";

export default async function HomePage() {
  // Fetching slides on the server
  const [slides, testimonials] = await Promise.all([
    getHeroSlides(),
    getTestimonials(),
  ]);

  return (
    <>
      {/* 1. Hero - Passing fetched data to the client component */}
      <Hero sanitySlides={slides} />

      <FounderSection />

      {/* 2. Stats - Immediate Trust */}
      <SchoolStats />

      <Gallery />

      {/* 3. Welcome Section */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-primary font-bold uppercase tracking-tighter mb-4">
            A Message from our Director
          </h2>
          <p className="text-2xl md:text-3xl text-primary-dark italic max-w-4xl mx-auto leading-snug">
            "At Kibali Educational Centre, we believe that every child is a star
            waiting to shine. Our mission is to provide the sky."
          </p>
        </div>
      </section>

      {/* 4. Why Kibali - The Sales Pitch */}
      <WhyKibali />

      {/* 5. Testimonials - Social Proof */}
      <Testimonials data={testimonials} />

      {/* 5. CTA - The Conversion Point */}
      <CTA />
    </>
  );
}
