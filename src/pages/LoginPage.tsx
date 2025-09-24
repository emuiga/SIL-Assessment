import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FooterSection from '../sections/FooterSection';

const LoginPage: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
      navigate('/users');
    } catch (error) {
      console.error('Sign in failed:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-portfolio flex items-start justify-center px-6 pt-16 pb-20 font-playfair">
        <div className="w-full max-w-lg text-center">
          {/* Title */}
          <h1 className="text-3xl font-bold text-portfolio mb-2 font-playfair">
            Log in to The Galla
          </h1>
          <p className="text-portfolio/70 mb-8 text-sm">
            Don't have an account? <span className="text-accent">Sign up</span>
          </p>

          {/* Subheading */}
          <p className="text-portfolio/70 mb-8 text-sm">
            Use your Google account to continue
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white text-portfolio border border-portfolio py-4 px-8 rounded-none text-base font-medium cursor-pointer flex items-center justify-center gap-3 mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/google (1).png" alt="Google" className="w-5 h-5" />
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>

          {/* Features List */}
          {/* Removed "Why sign in?" section per request */}

          {/* Back to Home Link */}
          <Link
            to="/"
            className="text-portfolio no-underline text-sm border-b border-transparent transition-colors hover:border-portfolio"
          >
            ← Return to home
          </Link>

        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default LoginPage;