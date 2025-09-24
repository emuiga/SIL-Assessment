import React, { useEffect } from "react";
import HeroSection from "../sections/HeroSection";
import ClientGallerySection from "../sections/ClientGallerySection";
import FeaturesSection from "../sections/FeaturesSection";
import CTASection from "../sections/CTASection";
import FooterSection from "../sections/FooterSection";

const LandingPage: React.FC = () => {
  // Scroll-reveal: fade/slide in on view
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            // Unobserve after revealing to avoid reflows
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-portfolio font-body overflow-x-hidden">
      {/* Header rendered globally in Layout */}

      <HeroSection />

      <ClientGallerySection />

      <FeaturesSection />

      {/* Pricing */}
      {/* Pricing section removed per request */}

      <CTASection />

      <FooterSection />
    </div>
  );
};

export default LandingPage;
