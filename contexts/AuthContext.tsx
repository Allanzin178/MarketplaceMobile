import React, { createContext, useContext, useState } from 'react';

type UserType = 'usuario' | 'farmacia' | null;

interface AuthContextData {
  userType: UserType;
  isAuthenticated: boolean;
  signIn: (type: 'usuario' | 'farmacia') => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null);

  const signIn = (type: 'usuario' | 'farmacia') => {
    console.log('AuthContext: signIn como', type);
    setUserType(type);
  };

  const signOut = () => {
    setUserType(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userType,
        isAuthenticated: !!userType,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}