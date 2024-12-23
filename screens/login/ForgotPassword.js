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
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../component/BackButton';
import { SettingContext } from '../../context/SettingContext';

export default function ForgotPassword({ route }) {
    const navigation = useNavigation();
    const { email } = route.params; // Nhận email từ OTPSend

    const [otp, setOTP] = useState('');
  
    const handleEvent = () => {
          if (otp.trim() === "") {
            Alert.alert("Lỗi", "Vui lòng nhập mã OTP.");
          } else {
            navigation.navigate('PasswordReset');
        }
    };

    const { theme } = useContext(SettingContext);
    const styles = StyleSheet.create({
      container: {
        borderRadius: 25,
        maxWidth: 510,
        paddingTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30, 
        display: 'flex',
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
        gap: 16,
      },
      forgotPassword: {
        color: "rgba(0, 0, 0, 0.7)",
        fontFamily: theme.font.bold,
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
        otpContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,

        alignItems: 'flex-end',
   
        },
        resendButton: {
        borderRadius: 20,
        width: 100,
        height: 50,
        borderColor: "rgba(0, 0, 0, 0.5)",
        borderWidth: 1,
 
        alignContent:"center",
        justifyContent: 'center',
        marginBottom: 5,
    
        },
        resendButtonText: {
        fontFamily: theme.font.bold,
        fontSize: 16,
        color: "rgba(0, 0, 0, 1)",
        letterSpacing: -0.32,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent : 'center',
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
        color: theme.color,
        textAlign: "center",
        alignContent: "center",
        alignSelf: "center",
        alignItems: "stretch",
        letterSpacing: -0.36,
      }
    });
  return (
    <View style={{flex:1,height:"100%", marginTop: Platform.OS === 'ios' ? 40 : 0,}}>
      <ScrollView>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <Image source={require("../../assets/logo.png")} style={styles.logo}  />

        <View style={styles.formContainer}>
          <Input
            label="Email"
            
            value={email}  // Sử dụng email truyền vào
            editable={false} // Không cho phép chỉnh sửa
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
      </View>
    </ScrollView>
    <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Đã có tài khoản?{"  "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text style={styles.signUpText2}>Đăng nhập ngay!</Text>           
        </TouchableOpacity>
        </View>
    </View>
  );
};

