
import React, { createContext, useEffect, useState } from 'react';
import { login, logout } from "../firebaseConfig"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [uid,setUid] = useState(null)
  const [birth,setBirth] = useState(null);
  const [userType, setUserType] = useState('Reader');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(()=>{
    const auth = getAuth(); 
    const db = getFirestore(); 
      
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true); 
        console.log("Người dùng đã đăng nhập")
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setUid(userDoc.data().uid || "")
            setUsername(userDoc.data().name || "");
            setUserType(userDoc.data().userType || "");
            setEmail(userDoc.data().email || "");
            setPassword(userDoc.data().password || "");
            setBirth(userDoc.data().birth || "")
            setAvatar(userDoc.data().avt || "https://cdn.builder.io/api/v1/image/assets/TEMP/b463d37bf2cb16b4a605772df7c7398fd66a33fb96a9785a3ecf39425b7c3245");
          } else {
            console.warn("User document không tồn tại");
          }
        } catch (error) {
          console.error("Lỗi khi lấy thông tin người dùng:", error);
        }
      } else {
        setIsAuthenticated(false);
        console.log("Người dùng chưa đăng nhập")
      } });
      return () => unsubscribe();
  },[])

  const logIn = (username, userType, email, password, avatar) => {
    setUsername(username);
    setUserType(userType);
    setEmail(email);
    setPassword(password);
    setAvatar(avatar);
    setIsAuthenticated(true);
  };

  const logOut = () => {
    logout();
  };

  return (
    <UserContext.Provider value={{birth, setBirth, uid, userType, setUserType, username, setUsername, email, setEmail, password,setPassword, avatar, setAvatar, isAuthenticated, setIsAuthenticated, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

