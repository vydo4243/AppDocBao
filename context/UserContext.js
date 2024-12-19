import React, { createContext, useState } from 'react'; // Đỗ Mai Tường Vy - 22521701

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const logIn = (username) => {
    setIsAuthenticated(true);
    setUsername(username); // Cập nhật username khi đăng nhập
  };

  const logOut = () => {
    setIsAuthenticated(false);
    setUsername(""); // Xóa username khi đăng xuất
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, username, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
