import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import  Input  from './components/Input';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import  SocialLoginButton from './components/SocialLogin';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import {UserContext} from "../../context/UserContext";
import { login } from '../../firebaseConfig';
import { SettingContext } from '../../context/SettingContext';
import BackButton from '../../component/BackButton';
const socialLoginOptions = [
  { id: 1, uri: "https://cdn.builder.io/api/v1/image/assets/9c7992bcbe164b8dad4f2629b8fc1688/601391a9a676842ff158bb60ba0b43dd7c4777f81735dca4f02b7a468fdcbb6e?apiKey=9c7992bcbe164b8dad4f2629b8fc1688&" },
  { id: 2, uri: "https://cdn.builder.io/api/v1/image/assets/9c7992bcbe164b8dad4f2629b8fc1688/2ec15b707eee1d75d7e78910d07735cad9d960d002fece29c9b17813df02a5e9?apiKey=9c7992bcbe164b8dad4f2629b8fc1688&" },
  { id: 3, uri: "https://cdn.builder.io/api/v1/image/assets/9c7992bcbe164b8dad4f2629b8fc1688/20044b8d5d83403cb0077e49fb51068a329b3dc331428dd41c1358ec653935fa?apiKey=9c7992bcbe164b8dad4f2629b8fc1688&" },
];



export default function LogIn () {
    const navigation = useNavigation();

    const { logIn } = useContext(UserContext); // Truy cập logIn từ UserContext
  
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Hiển thị/ẩn mật khẩu
    const [email, setEmail] = useState(""); // Trạng thái email
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
  
    const loginEvent = async() => {
      if (email.trim() === "") {
        Alert.alert("Lỗi", "Vui lòng nhập email.");
      } else if (password.trim() === "") {
        Alert.alert("Lỗi", "Vui lòng nhập mật khẩu.");
      } else {
        try {
          const userData = await login(email, password);
          if (userData && typeof userData !== "string") {
            // lấy dữ liệu ng dùng đưa vào context
              const userName = userData.name;
              const em = userData.email;
              const pass = userData.password;
              const type = userData.userType;
              const avt = userData.avt;
              logIn(userName,type,em,pass,avt); // Gọi hàm logIn từ UserContext
              Alert.alert("Đăng nhập thành công!");
              navigation.navigate("Profile"); // Điều hướng đến màn hình Profile
          }else{
              Alert.alert("Đăng nhập thất bại",userData);
          }
      } catch (error) {
         
      }
      }
    };

    const {theme} = useContext(SettingContext);
    const styles = StyleSheet.create({
      x:{
        flex:1,
        backgroundColor: "#F4F3F0",
        marginTop: Platform.OS === 'ios' ? 40 : 0,
      },
      backButton: {
        position: "absolute",
        top: 30,
        left: 10,
        width: 30,
        height: 30,
        zIndex: 10,
        borderRadius: 10,
        backgroundColor: "rgba(55,55,55,0.1)",
      },
      container: {
        height:"80%",
        borderRadius: 25,
        maxWidth: 510,
        paddingTop: 10,
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom:50,
      },
      logo: {
        width: 300,
        height: 100,
        resizeMode: 'contain',
      },
      formContainer: {
        marginTop: 39,
        width: '100%',
        maxWidth: 400,
        gap: 16,
      },
      forgotPassword: {
        fontFamily: theme.font.semiBold,
        color: "rgba(0, 0, 0, 0.7)",
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
        fontFamily: theme.font.bold,
        fontSize: 24,
        color: "rgba(0, 0, 0, 1)",
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
        fontFamily: theme.font.semiBold,
        fontSize: 18,
        color: "rgba(0, 0, 0, 1)",
        fontWeight: "600",
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
      signupContainer: {
        flexDirection: 'row',
        justifyContent:"center",
        borderTopWidth: 1,
        borderColor: "rgba(0, 0, 0, 1)",
        width: '100%',
        position:"absolute",
        bottom:0,
        paddingVertical: 20,
        backgroundColor: "#F4F3F0",
      },
      signupText: {
        fontFamily: theme.font.bold,
        fontSize: 18,
        color: "rgba(0, 0, 0, 1)",
        textAlign: "center",
        alignItems: "stretch",
        letterSpacing: -0.36,
      },
      signUpText2: {
        fontFamily: theme.font.bold,
        fontSize: 18,
        color: "#73E3D4",
        textAlign: "center",
        alignContent: "center",
        alignSelf: "center",
        alignItems: "stretch",
        letterSpacing: -0.36,
      }
    });
  return (
    <View style={styles.x} >
      <BackButton navigation={navigation} />
    <ScrollView>
      <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo}  />
        <View style={styles.formContainer}>
          <Input
            label="Email"
            placeholder="Email"
            value={email} 
            onChangeText={setEmail}
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

        
      </View>
    </ScrollView>
    <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Chưa có tài khoản?{"  "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText2}>Đăng ký ngay!</Text>           
        </TouchableOpacity>
        </View>
    </View>
  );
};

