import { initializeApp, getApp } from "firebase/app";
import { getFirestore, setDoc, addDoc, doc, getDoc, getDocs, where, query, updateDoc, deleteDoc, writeBatch} from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, getAuth, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkWsJTynxB8V7GNHLC6T9VCyMjdfzbSlo",
  authDomain: "appdocbao-d8d94.firebaseapp.com",
  projectId: "appdocbao-d8d94",
  storageBucket: "appdocbao-d8d94.firebasestorage.app",
  messagingSenderId: "50414891525",
  appId: "1:50414891525:web:3acce699265c4b4987e26c",
  measurementId: "G-SJKXN84DJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
const db = getFirestore(app);

const signup = async (name, email, password, additionalData) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            email,
            password,
            authProvider: "local",
            ...additionalData
        });  
        return user;     
    } catch (error) {
        if(error.message == "Firebase: Password should be at least 6 characters (auth/weak-password)."){
             return "Mật khẩu phải có ít nhất 6 ký tự"
        }    
        if(error.message == "Firebase: Error (auth/email-already-in-use)."){
            return "Email này đã được sử dụng"
       }       
        else
        return "Thông tin đăng ký không hợp lệ."
    }finally { 
    }
};

const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Lấy thông tin người dùng từ Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData; // Trả về dữ liệu người dùng
        } else {
           return "Thông tin người dùng không tồn tại.";
        }
    } catch (error) {
        if(error.message == "Firebase: Error (auth/invalid-email)."){
            return "Email không hợp lệ"
       }     
       else
       return "Thông tin đăng ký không hợp lệ."
    }
};

const logout = () => {
    signOut(auth);
}

const uploadImage = async (selectedFileName) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFileName);
      formData.append("upload_preset", "discenda");
  
      const response = await axios.post(
        process.env.REACT_APP_CLOUDINARY_URL,
        formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }
      );
  
      const uploadedImageUrl = response.data.secure_url;
      return uploadedImageUrl;
    } catch (error) {
      if (error.response) {
        console.error("Phản hồi lỗi từ Cloudinary:", error.response.data);
      } else {
        console.error("Lỗi yêu cầu:", error.message);
      }
      console.error("Error uploading image:", error);
      throw error;
    }
  };

const addPost = () =>{

}
const updatePost = () => {

}

const deletePost = () =>{

}

const updateAvatar = async (userId, selectedFile) => {
    try {
      // Bước 1: Upload ảnh lên Cloudinary
      const uploadedImageUrl = await uploadImage(selectedFile);
  
      // Bước 2: Cập nhật URL avatar trong Firestore
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        avatar: uploadedImageUrl
      });
  
      return uploadedImageUrl; // Trả về URL của ảnh đại diện mới
    } catch (error) {
      console.error("Failed to update avatar:", error);
      throw error; // Ném lỗi để xử lý bên ngoài
    }
};

const updateInfo = () =>{

}

const getNotif = () =>{

}
const bookmarked = () => {
    
}

 export{ auth, signup, login, logout,uploadImage, updateAvatar}