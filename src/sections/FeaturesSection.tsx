import React from 'react';

const cards = [
  { title: 'Portfolio Galleries', desc: 'Create stunning, professional galleries that showcase your work beautifully.', img: '/pexels-vladyslav-dukhin-296649.jpg' },
  { title: 'Client Portals', desc: 'Deliver a premium experience with secure, branded photo delivery.', img: '/pexels-fotios-photos-3024996.jpg' },
  { title: 'Business Tools', desc: 'Simplify contracts, invoices, and client management in one place.', img: '/pexels-hikaique-108148.jpg' },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="products" className="py-16 px-4 md:px-6 bg-portfolio">
      <div className="max-w-6xl mx-auto text-center reveal relative">
        <div className="pointer-events-none absolute -left-10 -bottom-10 w-64 h-64 opacity-20" style={{backgroundImage:'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize:'12px 12px', color:'var(--portfolio-text)'}}></div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-portfolio">Everything you need to grow</h2>
        <p className="text-base text-portfolio mb-10 max-w-2xl mx-auto">Create beautiful galleries, impress clients, and streamline your business — all in one platform.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="pointer-events-none absolute -right-10 -top-10 w-52 h-52 opacity-15 hidden md:block" style={{backgroundImage:'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize:'12px 12px', color:'var(--portfolio-text)'}}></div>
          {cards.map((f, i) => (
            <div key={i} className="p-0 bg-portfolio rounded-none border-2 border-portfolio reveal text-left relative overflow-hidden">
              <img src={f.img} alt="" className="w-full h-40 object-cover" />
              <div className="pointer-events-none absolute -left-6 bottom-3 w-36 h-36 opacity-10" style={{backgroundImage:'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize:'10px 10px', color:'var(--portfolio-text)'}}></div>
              <div className="px-3 py-3">
                <h3 className="text-xl mb-1 text-portfolio">{f.title}</h3>
                <p className="text-portfolio text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;


