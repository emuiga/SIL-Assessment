import React from 'react';

const ClientGallerySection: React.FC = () => {
  return (
    <section className="bg-portfolio py-16 px-4 md:px-6 relative overflow-hidden">
      {/* Icon sprinkles */}
      <div className="icon-sprinkle icon-40" style={{WebkitMask:"url('/camera.png') center/contain no-repeat", mask:"url('/camera.png') center/contain no-repeat", top:'24px', left:'-8px'}}></div>
      <div className="icon-sprinkle icon-56" style={{WebkitMask:"url('/studio-lighting.png') center/contain no-repeat", mask:"url('/studio-lighting.png') center/contain no-repeat", top:'80px', right:'-12px'}}></div>
      <div className="icon-sprinkle icon-56" style={{WebkitMask:"url('/studio-lighting.png') center/contain no-repeat", mask:"url('/studio-lighting.png') center/contain no-repeat", top:'300px', left:'20px'}}></div>
      <div className="icon-sprinkle icon-24" style={{WebkitMask:"url('/tripod.png') center/contain no-repeat", mask:"url('/tripod.png') center/contain no-repeat", top:'20%', right:'6%'}}></div>
      <div className="icon-sprinkle icon-32" style={{WebkitMask:"url('/camera (1).png') center/contain no-repeat", mask:"url('/camera (1).png') center/contain no-repeat", bottom:'70%', right:'10px'}}></div>
      <div className="icon-sprinkle icon-32" style={{WebkitMask:"url('/camera (1).png') center/contain no-repeat", mask:"url('/camera (1).png') center/contain no-repeat", top:'50%', left:'-10px'}}></div>
      <div className="icon-sprinkle icon-24" style={{WebkitMask:"url('/tripod.png') center/contain no-repeat", mask:"url('/tripod.png') center/contain no-repeat", bottom:'20%', right:'6%'}}></div>
      <div className="icon-sprinkle icon-40" style={{WebkitMask:"url('/photography.png') center/contain no-repeat", mask:"url('/photography.png') center/contain no-repeat", bottom:'10%', left:'10%'}}></div>
      <div className="icon-sprinkle icon-32" style={{WebkitMask:"url('/gallery.png') center/contain no-repeat", mask:"url('/gallery.png') center/contain no-repeat", top:'30%', right:'12%'}}></div>

      <div className="max-w-6xl mx-auto text-center">
        <div className="text-accent text-sm tracking-widest mb-3">CLIENT GALLERY</div>
        <h2 className="text-3xl md:text-4xl font-bold text-portfolio mb-4">
          The ultimate photo gallery that redefined the industry.
        </h2>
        <p className="text-portfolio text-base mb-8 max-w-3xl mx-auto">
          Trusted by more than a million photographers today, Client Gallery turns every photo
          delivery into an unforgettable brand moment.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {['Share photos','Digital delivery','Online proofing','Sell photos'].map((label) => (
            <span key={label} className="px-5 py-2 border border-portfolio text-portfolio rounded-full bg-portfolio">
              {label}
            </span>
          ))}
        </div>

        {/* Collage */}
        <div className="max-w-6xl mx-auto relative">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
            <h3 className="uppercase tracking-[0.35em] text-white text-5xl md:text-7xl xl:text-[9rem] font-bold drop-shadow-sm">GALLA</h3>
          </div>
          <div className="grid grid-cols-12 gap-0">
            <img src="/pexels-vladyslav-dukhin-296649.jpg" alt="w1" className="col-span-3 h-56 md:h-64 object-cover" />
            <img src="/pexels-valeriya-724644.jpg" alt="w2" className="col-span-3 h-56 md:h-64 object-cover" />
            <img src="/pexels-siri-202700-698922.jpg" alt="w3" className="col-span-3 h-56 md:h-64 object-cover" />
            <img src="/pexels-fotios-photos-3024996.jpg" alt="w4" className="col-span-3 h-56 md:h-64 object-cover" />

            <img src="/pexels-hikaique-108148.jpg" alt="p1" className="col-span-4 h-60 md:h-72 object-cover" />
            <img src="/pexels-valeriya-724644.jpg" alt="p2" className="col-span-4 h-60 md:h-72 object-cover" />
            <img src="/pexels-vladyslav-dukhin-296649.jpg" alt="p3" className="col-span-4 h-60 md:h-72 object-cover" />

            <img src="/pexels-siri-202700-698922.jpg" alt="d1" className="col-span-3 h-56 md:h-64 object-cover" />
            <img src="/pexels-fotios-photos-3024996.jpg" alt="d2" className="col-span-3 h-56 md:h-64 object-cover" />
            <img src="/pexels-hikaique-108148.jpg" alt="d3" className="col-span-3 h-56 md:h-64 object-cover" />
            <img src="/pexels-valeriya-724644.jpg" alt="d4" className="col-span-3 h-56 md:h-64 object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientGallerySection;


