// app/page.tsx
import { getTestimonials } from "@/lib/services/testimonial";
import CTA from "./_components/CTA";
import FounderSection from "./_components/FounderSection";
import Gallery from "./_components/Gallery";
import Hero from "./_components/Hero";
import { SchoolStats } from "./_components/SchoolStats";
import WhyKibali from "./_components/WhyKibali";
import { getHeroSlides } from "@/lib/services/hero";
import Testimonials from "./_components/Testimonials";
import WelcomeMessage from "./_components/WelcomeMessage";
import { getGalleryItems } from "@/lib/services/gallery";

export default async function HomePage() {
  const [slides, testimonials, galleryPreview] = await Promise.all([
    getHeroSlides(),
    getTestimonials(),
    getGalleryItems(0, 6), // Use 6 for a balanced grid
  ]);

  return (
    <>
      {/* 1. ASPIRATION: High-impact visuals and core value prop */}
      <Hero sanitySlides={slides} />

      {/* 2. AUTHORITY: The "Face" of the institution. 
          Moved Welcome/Founder up to establish professional trust early. */}
      <section className="bg-white">
        <WelcomeMessage />
        <FounderSection />
      </section>

      {/* 3. DIFFERENTIATION: Why choose us over other international schools? */}
      <WhyKibali />

      {/* 4. EVIDENCE (Quantitative): The hard numbers of success */}
      <SchoolStats />

      {/* 5. EVIDENCE (Visual): Peek into campus life */}
      <Gallery items={galleryPreview} limit={6} />

      {/* 6. SOCIAL PROOF: Real stories from parents/students */}
      <Testimonials data={testimonials} />

      {/* 7. CONVERSION: The final nudge to act */}
      <CTA />
    </>
  );
}
