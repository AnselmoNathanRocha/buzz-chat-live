import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  logged: boolean;
  token: string | null;
  login: (token: string, expirationDate: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const expiresIn = localStorage.getItem('expiresIn');
    if (storedToken && expiresIn) {
      const expirationDate = new Date(expiresIn);
      if (expirationDate > new Date()) {
        setLogged(true);
        setToken(storedToken);
      } else {
        localStorage.removeItem('authToken');
        localStorage.removeItem('expiresIn');
      }
    }
  }, []);

  const login = (token: string, expirationDate: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('expiresIn', expirationDate);
    setLogged(true);
    setToken(token);
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('expiresIn');
    setLogged(false);
    setToken(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ logged, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
