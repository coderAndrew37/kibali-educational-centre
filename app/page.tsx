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
import NewsPreview from "./_components/NewsPreview";
export default async function HomePage() {
  const [slides, testimonials, galleryPreview] = await Promise.all([
    getHeroSlides(),
    getTestimonials(),
    getGalleryItems(0, 6),
  ]);

  return (
    <>
      {/* 1. ASPIRATION */}
      <Hero sanitySlides={slides} />

      {/* 2. AUTHORITY */}
      <section className="bg-white">
        <WelcomeMessage />
        <FounderSection />
      </section>

      {/* 3. DIFFERENTIATION */}
      <WhyKibali />

      {/* 4. EVIDENCE — numbers */}
      <SchoolStats />

      {/* 5. EVIDENCE — visual */}
      <Gallery items={galleryPreview} limit={6} />

      {/* 6. NEWS — latest 3 posts */}
      <NewsPreview />

      {/* 7. SOCIAL PROOF */}
      <Testimonials data={testimonials} />

      {/* 8. CONVERSION */}
      <CTA />
    </>
  );
}
