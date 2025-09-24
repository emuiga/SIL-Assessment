import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-start">
      <img
        src="/pexels-valeriya-724644.jpg"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-left reveal">
        <h1 className="text-white text-hero-title leading-[62px] mb-4 md:mb-6">
          Designed for photographers. <br /> Built to help you grow.
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-10 max-w-2xl">
          Industry-leading photo galleries, websites, and tools to simplify
          your workflow and grow your photography business.
        </p>
        <Link
          to="/login"
          className="bg-accent text-white px-8 py-4 rounded-none text-lg font-semibold no-underline"
        >
          Start Free Trial
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;


