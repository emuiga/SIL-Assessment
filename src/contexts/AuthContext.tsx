import React, { useEffect, useState } from 'react';
import {
  type User,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../hooks/useAuth';


/**
 * Authentication provider component that manages user authentication state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap with auth context
 * @returns {JSX.Element} Provider component with authentication context
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Check for redirect result on page load
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log('Redirect sign-in successful');
        }
      })
      .catch((error) => {
        console.error('Redirect sign-in error:', error);
      });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Popup sign-in failed, trying redirect:', error);
      
      // If popup fails, try redirect as fallback
      try {
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
        // Note: User will be redirected away from the page
        // The result will be handled in the useEffect above
      } catch (redirectError) {
        console.error('Redirect sign-in also failed:', redirectError);
        // Log more detailed error information
        if (error instanceof Error) {
          console.error('Error message:', error.message);
          console.error('Error code:', (error as unknown as { code: string }).code);
        }
        throw error; // Re-throw the original popup error
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
