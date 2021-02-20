import axios from 'axios';
import React, { createContext } from 'react';
import { useAsync } from 'react-async-hook';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const checkAuth = async () => {
    let userData = await axios.get('/checkauth');
    localStorage.setItem('usrID', JSON.stringify(userData.data._id));
    return userData.data;
  };
  const { result } = useAsync(checkAuth, []);

  return <AuthContext.Provider value={result}>{children}</AuthContext.Provider>;
};
