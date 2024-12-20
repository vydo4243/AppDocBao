
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [userType, setUserType] = useState('reader');
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logIn = (username, userType) => {
    setUsername(username);
    setUserType(userType);
    setIsAuthenticated(true);
  };

  const logOut = () => {
    setUsername('');
    setUserType('');
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ userType, setUserType, username, setUsername, isAuthenticated, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

