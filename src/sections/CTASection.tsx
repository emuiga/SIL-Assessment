import React from 'react';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="bg-accent py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start using the Galla today for free.</h2>
      <p className="text-base text-white/90 mb-8 max-w-2xl mx-auto">Join thousands of photographers showcasing their work with The Galla.</p>
      <Link to="/login" className="inline-block bg-white text-portfolio px-10 py-4 rounded-none font-semibold">Get Started</Link>
    </section>
  );
};

export default CTASection;


