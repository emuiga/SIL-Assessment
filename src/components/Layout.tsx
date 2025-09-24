import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBannerStore } from '../stores/bannerStore';
import { getAvatarForUser } from '../utils/avatarUtils';

/**
 * Props for the Layout component
 */
interface LayoutProps {
  /** Child components to render within the layout */
  children: React.ReactNode;
}

/**
 * Main layout component that wraps all pages with header, navigation, and footer
 * Provides responsive navigation with mobile menu and user authentication state
 * @param {LayoutProps} props - Component props
 * @returns {JSX.Element} Layout component with header and main content area
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { showBanner, toggleBanner } = useBannerStore();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          
          {/* Desktop Navigation menu for logged in users */}
          {user && (
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/users" className="text-portfolio hover:text-accent transition-colors duration-200 no-underline">
                Browse Users
              </Link>
            </nav>
          )}
          
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Desktop user info */}
                <div className="hidden md:flex items-center gap-2">
                  <img 
                    src={getAvatarForUser(user.uid)} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-portfolio text-sm">{user.displayName || user.email}</span>
                </div>
                
                {/* Mobile menu button */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-portfolio hover:text-accent transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                <button onClick={logout} className="hidden md:block px-4 py-2 bg-accent text-white rounded-none font-semibold border-0 cursor-pointer">
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
        
        {/* Mobile Navigation Menu */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden bg-portfolio border-t border-gray-200">
            <div className="px-6 py-4 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <img 
                  src={getAvatarForUser(user.uid)} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-portfolio font-medium">{user.displayName || user.email}</p>
                </div>
              </div>
              <Link 
                to="/users" 
                className="block text-portfolio hover:text-accent transition-colors duration-200 no-underline py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Users
              </Link>
              <button 
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }} 
                className="block w-full text-left px-4 py-2 bg-accent text-white rounded-none font-semibold border-0 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
