import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBannerStore } from '../stores/bannerStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { showBanner, toggleBanner } = useBannerStore();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-portfolio font-playfair">
      {/* Top Banner */}
      {showBanner && (
        <div className="bg-accent text-white py-2 px-8 text-center text-sm font-medium relative">
          Special offer of March - 20% discount for product photography!
          <button
            onClick={toggleBanner}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-white cursor-pointer text-base hover:bg-orange-600 rounded px-1"
          >
            ×
          </button>
        </div>
      )}
      
      {/* Site Header (present on all pages) */}
      <header className="w-full bg-portfolio">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-portfolio no-underline tracking-wide">
            THE GALLA
          </Link>
          {/* Navigation items removed per request */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-portfolio text-sm">{user.displayName || user.email}</span>
                <button onClick={logout} className="px-4 py-2 bg-accent text-white rounded-none font-semibold border-0 cursor-pointer">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 border border-portfolio rounded-none text-portfolio no-underline">
                  Log In
                </Link>
                <Link to="/login" className="px-4 py-2 bg-accent text-white rounded-none no-underline font-semibold">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
