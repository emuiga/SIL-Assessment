import React from 'react';

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-portfolio text-portfolio py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">THE GALLA</h3>
          <p className="text-portfolio/70 text-xs leading-relaxed">
            An all‑in‑one platform for modern photographers: client galleries,
            websites and simple business tools.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a href="#" aria-label="Instagram" className="text-portfolio hover:text-accent transition-colors">
              <img src="/instagram.png" alt="Instagram" className="w-5 h-5" style={{filter: 'sepia(100%) saturate(200%) hue-rotate(30deg) brightness(0.8)'}} />
            </a>
            <a href="#" aria-label="Twitter" className="text-portfolio hover:text-accent transition-colors">
              <img src="/twitter.png" alt="Twitter" className="w-5 h-5" style={{filter: 'sepia(100%) saturate(200%) hue-rotate(30deg) brightness(0.8)'}} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-portfolio hover:text-accent transition-colors">
              <img src="/linkedin.png" alt="LinkedIn" className="w-5 h-5" style={{filter: 'sepia(100%) saturate(200%) hue-rotate(30deg) brightness(0.8)'}} />
            </a>
            <a href="#" aria-label="Facebook" className="text-portfolio hover:text-accent transition-colors">
              <img src="/facebook-app-symbol.png" alt="Facebook" className="w-5 h-5" style={{filter: 'sepia(100%) saturate(200%) hue-rotate(30deg) brightness(0.8)'}} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2">Products</h4>
          <ul className="space-y-1 text-xs text-portfolio/70">
            <li><a href="#" className="no-underline">Client Gallery</a></li>
            <li><a href="#" className="no-underline">Website</a></li>
            <li><a href="#" className="no-underline">Studio Manager</a></li>
            <li><a href="#" className="no-underline">Examples</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2">Resources</h4>
          <ul className="space-y-1 text-xs text-portfolio/70">
            <li><a href="#" className="no-underline">Help & Support</a></li>
            <li><a href="#" className="no-underline">Blog</a></li>
            <li><a href="#" className="no-underline">Apps & Plugins</a></li>
            <li><a href="#" className="no-underline">Service Status</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2">Company</h4>
          <ul className="space-y-1 text-xs text-portfolio/70">
            <li><a href="#" className="no-underline">About</a></li>
            <li><a href="#" className="no-underline">Careers</a></li>
            <li><a href="#" className="no-underline">Terms of Service</a></li>
            <li><a href="#" className="no-underline">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-portfolio/60 text-xs border-top border-portfolio/20 pt-4">
        © {new Date().getFullYear()} The Galla. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;