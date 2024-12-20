import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import  Input  from './components/Input';
import  SocialLoginButton from './components/SocialLogin';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import {UserContext} from "../../context/UserContext";

const socialLoginOptions = [
  { id: 1, uri: "https://cdn.builder.io/api/v1/image/assets/9c7992bcbe164b8dad4f2629b8fc1688/601391a9a676842ff158bb60ba0b43dd7c4777f81735dca4f02b7a468fdcbb6e?apiKey=9c7992bcbe164b8dad4f2629b8fc1688&" },
  { id: 2, uri: "https://cdn.builder.io/api/v1/image/assets/9c7992bcbe164b8dad4f2629b8fc1688/2ec15b707eee1d75d7e78910d07735cad9d960d002fece29c9b17813df02a5e9?apiKey=9c7992bcbe164b8dad4f2629b8fc1688&" },
  { id: 3, uri: "https://cdn.builder.io/api/v1/image/assets/9c7992bcbe164b8dad4f2629b8fc1688/20044b8d5d83403cb0077e49fb51068a329b3dc331428dd41c1358ec653935fa?apiKey=9c7992bcbe164b8dad4f2629b8fc1688&" },
];

export default function LogIn () {
    const navigation = useNavigation();
    const { logIn } = useContext(UserContext); // Truy cập logIn từ UserContext
  
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Hiển thị/ẩn mật khẩu
    const [username, setUsername] = useState(""); // Trạng thái tên người dùng/email
    const [password, setPassword] = useState(""); // Trạng thái mật khẩu
  
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
  
    const PasswordRightComponent = () => (
      <View style={styles.passwordVisibility}>
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon
            name={isPasswordVisible ? "visibility-off" : "visibility"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
    );
  
    const loginEvent = () => {
      if (username.trim() === "") {
        Alert.alert("Lỗi", "Vui lòng nhập tên người dùng hoặc email.");
      } else if (password.trim() === "") {
        Alert.alert("Lỗi", "Vui lòng nhập mật khẩu.");
      } else {
        const userType = "Reader"; // Mặc định userType là "Reader"
        logIn(username, userType, password); // Gọi hàm logIn từ UserContext
        Alert.alert("Đăng nhập thành công!");
        navigation.navigate("Profile"); // Điều hướng đến màn hình Profile
      }
    };
  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.logoContainer} />

        <View style={styles.formContainer}>
          <Input
            label="Tên người dùng hoặc Email"
            placeholder="Tên người dùng hoặc Email"
            value={username} 
            onChangeText={setUsername}
          />
          <Input
            label="Mật khẩu"
            placeholder="Mật khẩu"
            value={password} 
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            rightComponent={<PasswordRightComponent />}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={loginEvent}>
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Hoặc đăng nhập với</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialLoginContainer}>
          {socialLoginOptions.map((option) => (
            <SocialLoginButton
              key={option.id}
              imageSource={{ uri: option.uri }}
            />
          ))}
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Chưa có tài khoản?{"  "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText2}>Đăng ký ngay!</Text>           
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "IBM Plex Serif, sans-serif",
    borderRadius: 25,
    maxWidth: 510,
    paddingTop: 16,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 56,
    width: 300,
    height: 100,
    backgroundColor:"#D9D9D9"
  },
  formContainer: {
    marginTop: 39,
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  forgotPassword: {
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "IBM Plex Serif, sans-serif",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "right",
    marginTop: 5,
  },
  loginButton: {
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.5)",
    borderWidth: 1,
    marginTop: 32,
    width: 250,
    paddingVertical: 13,
    alignItems: 'center',
  },
  loginButtonText: {
    fontFamily: "IBM Plex Serif, sans-serif",
    fontSize: 24,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "700",
    letterSpacing: -0.48,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    marginTop: 38,
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  dividerText: {
    fontFamily: "IBM Plex Serif, sans-serif",
    fontSize: 18,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "500",
    letterSpacing: -0.36,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    marginTop: 40,
    width: '60%',
    justifyContent: 'space-between',
  },
  passwordVisibility: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  hideIcon: {
    width: 20,
    height: 20,
  },
  hideText: {
    color: "rgba(171, 177, 187, 1)",
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent:"center",
    borderTopWidth: 1,
    borderColor: "rgba(0, 0, 0, 1)",
    width: '100%',
    marginTop: 133,
    paddingVertical: 20,
  },
  signupText: {
    fontFamily: "IBM Plex Serif, sans-serif",
    fontSize: 18,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "700",
    textAlign: "center",
    alignItems: "stretch",
    letterSpacing: -0.36,
  },
  signUpText2: {
    fontFamily: "IBM Plex Serif, sans-serif",
    fontSize: 18,
    color: "#73E3D4",
    fontWeight: "700",
    textAlign: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "stretch",
    letterSpacing: -0.36,
  }
});