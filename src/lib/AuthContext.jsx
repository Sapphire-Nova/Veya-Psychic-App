import React, { createContext, useContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ email: 'lunabloomtarot@gmail.com', isAdmin: true });
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const navigateToLogin = () => { window.location.href = 'https://auth.base44.io/login?app_id=veya'; };
  const logout = () => { setUser(null); };
  return (
    <AuthContext.Provider value={{ user, isAdmin: true, isLoadingAuth, navigateToLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
