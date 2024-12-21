import { initializeApp, getApp } from "firebase/app";
import { getFirestore, setDoc, addDoc, doc, getDoc, getDocs, where, query, updateDoc, deleteDoc, writeBatch} from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, getAuth, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
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

// Cloudinary Configuration
const cloudinaryConfig = {
    cloudName: "dkcqv4uel",
    uploadPreset: "Default_preset",
    cloudinaryUrl: "https://api.cloudinary.com/v1_1/dkcqv4uel/image/upload",
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
            ...additionalData
        });  
        await sendEmailVerification(user);
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
        if (!user.emailVerified) {
            return "Vui lòng kiểm tra email của bạn để xác thực tài khoản.";
        }
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

// Cloudinary Functions
const uploadImage = async (fileUri) => {
    try {
        const formData = new FormData();
        formData.append("file", {
            uri: fileUri,
            type: "image/jpeg", // Ensure the MIME type matches the file type
            name: "image.jpg", // Adjust the name if necessary
        });
        formData.append("upload_preset", "Default_preset"); 

        const response = await axios.post(cloudinaryConfig.cloudinaryUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Upload response:", response.data); // Log response from Cloudinary
        return response.data.secure_url;
    } catch (error) {
        if (error.response) {
            console.error("Error uploading image:", error.response.data); // Log detailed error message
        } else {
            console.error("Error uploading image:", error.message); // Log generic error message
        }
        throw error;
    }
};

const addPost = () =>{

}
const getPost = () => {

}

const updatePost = () => {

}

const deletePost = () =>{

}

const updateAvatar = async (userId, fileUri) => {
    try {
      const uploadedImageUrl = await uploadImage(fileUri);
  
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { avt: uploadedImageUrl });
  
      return uploadedImageUrl;
    } catch (error) {
      console.error("Error updating avatar:", error);
      throw error;
    }
  };

const updateInfo = async(uid, updatedData) =>{
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, updatedData);
        return true;
      } catch (error) {
        console.error("Hồ sơ cập nhật thất bại:", error);
        return false;
      }
}

const getNotif = () =>{

}
const bookmarked = () => {

}
const getBookmark = () =>{

}

 export{ auth, signup, login, logout,uploadImage, updateAvatar, updateInfo}