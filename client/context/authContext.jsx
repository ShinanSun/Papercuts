import axios from 'axios';
import React, { createContext } from 'react';
import { useAsync } from 'react-async-hook';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const checkAuth = async () => {
    let userData = await axios.get('http://localhost:3000/checkauth');
    return userData.data;
  };
  // const { result } = useAsync(checkAuth, []);
  const result = checkAuth();
  return <AuthContext.Provider value={result}>{children}</AuthContext.Provider>;
};
