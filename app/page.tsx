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
import WelcomeMessage from "./_components/WelcomeMessage";

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

      {/* 4. Why Kibali - The Sales Pitch */}
      <WhyKibali />

      <WelcomeMessage />

      {/* 5. Testimonials - Social Proof */}
      <Testimonials data={testimonials} />

      {/* 5. CTA - The Conversion Point */}
      <CTA />
    </>
  );
}
