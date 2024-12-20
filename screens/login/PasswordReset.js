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
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import {UserContext} from "../../context/UserContext";

export default function PasswordReset() {
    const navigation = useNavigation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Mật khẩu
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // Mật khẩu xác nhận

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible); // Đảo ngược trạng thái mật khẩu
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible); // Đảo ngược trạng thái mật khẩu xác nhận
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
  
  const ConfirmPasswordRightComponent = () => (
    <View style={styles.passwordVisibility}>
      <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
        <Icon
          name={isConfirmPasswordVisible ? "visibility-off" : "visibility"}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
    const { logIn } = useContext(UserContext);
  
    const loginEvent = () => {
        if (password.trim() === "") {
            Alert.alert("Lỗi", "Vui lòng nhập mật khẩu.");
          } else if (confirmPassword.trim() === "") {
            Alert.alert("Lỗi", "Vui lòng xác nhận mật khẩu.");
          }
          else if (password !== confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu không khớp.");
          } 
          else {
            Alert.alert("Đổi mật khẩu thành công!");
            navigation.navigate('LogIn');
        }
    };
  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.logoContainer} />

        <View style={styles.formContainer}>
          <Input
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            value={password} 
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            rightComponent={<PasswordRightComponent />}
          />
            <Input
                label="Xác nhận mật khẩu"
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword} 
                onChangeText={setConfirmPassword}
                secureTextEntry={!isConfirmPasswordVisible}
                rightComponent={<ConfirmPasswordRightComponent />}
            />

        </View>

        <TouchableOpacity style={styles.loginButton} onPress={loginEvent}>
          <Text style={styles.loginButtonText}>Xác nhận</Text>
        </TouchableOpacity>


        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Đã có tài khoản?{"  "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text style={styles.signUpText2}>Đăng nhập ngay!</Text>           
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
    otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    },
    resendButton: {
    marginTop: 5,
    padding: 5,
    borderRadius: 20,
    width: 100,
    borderColor: "rgba(0, 0, 0, 0.5)",
    borderWidth: 1,
    justifyContent: "flex-end",
    alignContent:"stretch",
    alignItems: "flex-end",
    alignSelf:"stretch",
    marginBottom: 0,
    height: 100,
    },
    resendButtonText: {
    fontFamily: "IBM Plex Serif, sans-serif",
    fontSize: 16,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "700",
    letterSpacing: -0.32,
    textAlign: 'center',
    },
  signupContainer: {
    flexDirection: 'row',
    justifyContent:"center",
    borderTopWidth: 1,
    borderColor: "rgba(0, 0, 0, 1)",
    width: '100%',
    marginTop: 350,
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