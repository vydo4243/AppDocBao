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
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword() {
    const navigation = useNavigation();
    const [email, setemail] = useState('');
    const [otp, setOTP] = useState('');
  
    const handleEvent = () => {
        if (email.trim() === "") {
            Alert.alert("Lỗi", "Vui lòng nhập email.");
          } else if (otp.trim() === "") {
            Alert.alert("Lỗi", "Vui lòng nhập mã OTP.");
          } else {
            navigation.navigate('PasswordReset');
        }
    };
  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.logoContainer} />

        <View style={styles.formContainer}>
          <Input
            label="Email"
            placeholder="Nhập Email"
            value={email} 
            onChangeText={setemail}
          />
          <View style={styles.otpContainer}>
            <Input
                label="Mã OTP"
                placeholder="Nhập mã xác nhận"
                value={otp} 
                onChangeText={setOTP}
            />
            <TouchableOpacity style={styles.resendButton}>
                <Text style={styles.resendButtonText}>Gửi lại</Text>
            </TouchableOpacity>
           </ View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleEvent}>
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
    borderRadius: 20,
    width: 100,
    height: 50,
    borderColor: "rgba(0, 0, 0, 0.5)",
    borderWidth: 1,
    justifyContent: "center",
    alignContent:"center",
    alignItems: "center",
    alignSelf:"flex-end",
    marginBottom: 5,

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