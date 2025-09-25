import { createContext, useContext } from 'react';
import { type User } from 'firebase/auth';

/**
 * Authentication context type definition
 */
interface AuthContextType {
  /** Current authenticated user or null if not logged in */
  user: User | null;
  /** Loading state for authentication operations */
  loading: boolean;
  /** Sign in with Google using popup or redirect fallback */
  signInWithGoogle: () => Promise<void>;
  /** Sign out the current user */
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook to access authentication context
 * @returns {AuthContextType} Authentication context with user state and methods
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};