import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState('Reader');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState("https://cdn.builder.io/api/v1/image/assets/TEMP/b463d37bf2cb16b4a605772df7c7398fd66a33fb96a9785a3ecf39425b7c3245");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logIn = (username, userType, email, password, avatar ="https://cdn.builder.io/api/v1/image/assets/TEMP/b463d37bf2cb16b4a605772df7c7398fd66a33fb96a9785a3ecf39425b7c3245") => {
    setUsername(username);
    setUserType(userType);
    setEmail(email);
    setPassword(password);
    setAvatar(avatar);
    setIsAuthenticated(true);
  };

  const logOut = () => {
    setUsername('');
    setUserType('Reader');
    setEmail('');
    setPassword('');
    setAvatar('');
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ userType, setUserType, username, setUsername, email, setEmail, password,setPassword, avatar, setAvatar, isAuthenticated, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};