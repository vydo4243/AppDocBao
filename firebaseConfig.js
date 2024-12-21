import { initializeApp, getApp } from "firebase/app";
import { getFirestore, setDoc, addDoc, doc, getDoc, getDocs, where, query, updateDoc, deleteDoc, writeBatch, collection, arrayRemove,arrayUnion} from "firebase/firestore";
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

const addPost = async(title,image,content,hashtag,publisher,publishDate) =>{
    console.log(title,image,content,hashtag,publisher,publishDate);
    const docRef = await addDoc(collection(db,"posts"),{
        title,
        image,
        content,
        hashtag,
        publisher,
        publishDate,
    })
    console.log("Document written with ID: ", docRef.id);
}
const getPost = async(postID) => {
    try{
        const postRef = await getDoc(doc(db, "posts", postID));
        if(postRef.exists()){
        const postData = postRef.data();
 
        return postData;
    }
    }catch(error){
        console.log(error)
    }
}
const getYourPost = async() =>{
    const userUid = auth.currentUser.uid;
    const q = query(collection(db, "posts"), where("publisher", "==", userUid));
    const tempDoc = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() })
     })
     return tempDoc;
}
const updatePost = async(postID,title,image,content,hashtag,publisher,publishDate) => {
    try{
        console.log("updatePost");
        const postRef = doc(db, "posts", postID);
        await updateDoc(postRef,{
            title,
            image,
            content,
            hashtag,
            publisher,
            publishDate,
        })
    }catch(error){
        console.log(error)
    }
}

const deletePost = async(postID) =>{
    try{
        await deleteDoc(doc(db, "posts", postID));
    }catch(error){
        console.log(error)
    }
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

const getPostsByHash = async(hashtag) =>{
    const q = query(collection(db, "posts"), where("hashtag", "==", hashtag));
    const tempDoc = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() })
     })
     return tempDoc;
}

const bookmarked = async(postID) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Người dùng chưa đăng nhập.");
    
        const uid = user.uid;
        const userDocRef = doc(db, "users", uid);
        // Lưu toàn bộ movieList vào history
        await updateDoc(userDocRef, { saved: arrayUnion(postID) });
    
      } catch (error) {
        console.error("Không thể cập nhật lịch sử:", error);
      }
}
const getBookmark = async() =>{
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Người dùng chưa đăng nhập.");
    
        const uid = user.uid;
        const userDoc = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDoc);
    
        if (userDocSnap.exists()) {
          const saved = userDocSnap.data().saved;
          return saved || null; // Trả về mảng rỗng nếu không có lịch sử
        } else {
          console.warn("Không tìm thấy tài liệu người dùng.");  
        }
      } catch (error) {
        console.error("Không thể lấy ds đã lưu:", error);
      }
}
const unbookmark = async(postID) =>{
    
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("Người dùng chưa đăng nhập.");
    
            const uid = user.uid;
            
            const userDoc = doc(db, "users", uid);
            // Lưu toàn bộ movieList vào history
            await updateDoc(userDoc, { saved: arrayRemove(postID) });
            
            const userDocSnap = await getDoc(userDoc);
    
            if (userDocSnap.exists()) {
                const currentSave = userDocSnap.data().saved || null;
                const updatedSave = currentSave.filter(post => post !== postID);
                await updateDoc(userDoc, { saved: updatedSave });
                return true;
            } else {
                console.log("User not found.");
                return false;
            }
        } catch (error) {
            console.error("Error removing bookmarked post:", error);
            return false;
        }
    
}
 export{ auth, signup, login, logout,uploadImage, updateAvatar, updateInfo, addPost, getYourPost, getPost, deletePost, updatePost, getPostsByHash, getBookmark, bookmarked, unbookmark}