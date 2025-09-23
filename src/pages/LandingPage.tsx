import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-portfolio font-body">
      {/* Header rendered globally in Layout */}

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-start">
        <img
          src="/pexels-valeriya-724644.jpg"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-left reveal">
          <h1 className="text-white text-hero-title leading-[62px] mb-6">
            Designed for photographers. <br /> Built to help you grow.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl">
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

      {/* Features */}
      <section id="products" className="py-28 px-6 bg-portfolio">
        <div className="max-w-6xl mx-auto text-center reveal relative">
          {/* Dots/texture background bottom-left */}
          <div className="pointer-events-none absolute -left-10 -bottom-10 w-64 h-64 opacity-20" style={{backgroundImage:'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize:'12px 12px', color:'var(--portfolio-text)'}}></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-portfolio">
            Everything you need to grow
          </h2>
          <p className="text-lg text-portfolio mb-16 max-w-2xl mx-auto">
            Create beautiful galleries, impress clients, and streamline your
            business — all in one platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Dots in top-right for extra texture */}
            <div className="pointer-events-none absolute -right-10 -top-10 w-52 h-52 opacity-15 hidden md:block" style={{backgroundImage:'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize:'12px 12px', color:'var(--portfolio-text)'}}></div>
            {[
              {
                title: "Portfolio Galleries",
                desc: "Create stunning, professional galleries that showcase your work beautifully.",
                img: "/pexels-vladyslav-dukhin-296649.jpg",
              },
              {
                title: "Client Portals",
                desc: "Deliver a premium experience with secure, branded photo delivery.",
                img: "/pexels-fotios-photos-3024996.jpg",
              },
              {
                title: "Business Tools",
                desc: "Simplify contracts, invoices, and client management in one place.",
                img: "/pexels-hikaique-108148.jpg",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-10 bg-portfolio rounded-none border-2 border-portfolio reveal text-left relative overflow-hidden"
              >
                <img src={f.img} alt="" className="w-full h-40 object-cover mb-4" />
                {/* subtle dots inside card */}
                <div className="pointer-events-none absolute -left-6 bottom-4 w-36 h-36 opacity-10" style={{backgroundImage:'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize:'10px 10px', color:'var(--portfolio-text)'}}></div>
                <h3 className="text-2xl mb-2 text-portfolio">{f.title}</h3>
                <p className="text-portfolio">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-28 px-6 bg-portfolio">
        <div className="max-w-5xl mx-auto text-center reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-portfolio">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-portfolio mb-16">
            Choose the plan that works best for your photography business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: "Starter",
                price: "$29/mo",
                perks: ["1,000 photos", "3 client galleries", "Basic tools"],
              },
              {
                name: "Professional",
                price: "$79/mo",
                perks: [
                  "Unlimited photos",
                  "Unlimited galleries",
                  "Full customization",
                  "Client portals",
                ],
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "$199/mo",
                perks: [
                  "Everything in Pro",
                  "White-label",
                  "API access",
                  "Dedicated support",
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-10 rounded-none border-2 ${
                  plan.highlight ? "border-accent" : "border-portfolio"
                } bg-portfolio reveal`}
              >
                {plan.highlight && (
                  <div className="mb-3 text-sm font-semibold text-accent">Most Popular</div>
                )}
                <h3 className="text-2xl mb-4 text-portfolio">{plan.name}</h3>
                <p className="text-3xl font-bold mb-6 text-portfolio">{plan.price}</p>
                <ul className="space-y-3 text-portfolio">
                  {plan.perks.map((perk, j) => (
                    <li key={j}>{perk}</li>
                  ))}
                </ul>
                <Link
                  to="/login"
                  className="mt-8 block bg-accent text-white py-3 rounded-none font-semibold no-underline"
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-28 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to grow your photography business?
        </h2>
        <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
          Join thousands of photographers showcasing their work with The Galla.
        </p>
        <Link
          to="/login"
          className="inline-block bg-white text-portfolio px-10 py-4 rounded-none font-semibold"
        >
          Start Free Trial
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-portfolio text-portfolio py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-3">THE GALLA</h3>
            <p className="text-portfolio/70">
              The complete platform for professional photographers.
            </p>
          </div>
          {["Product", "Support", "Company"].map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-3">{col}</h4>
              <ul className="space-y-2 text-portfolio/70">
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Examples</a></li>
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center text-portfolio/60 text-sm border-t border-portfolio/20 pt-6">
          © 2024 The Galla. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
