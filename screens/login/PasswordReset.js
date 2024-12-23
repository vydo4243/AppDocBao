import React, { useState, useContext } from 'react';
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
import Input from './components/Input';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "../../context/UserContext";
import { SettingContext } from '../../context/SettingContext';
import BackButton from '../../component/BackButton';

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
    } else if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu không khớp.");
    } else {
      Alert.alert("Đổi mật khẩu thành công!");
      navigation.navigate('LogIn');
    }
  };

  const { theme } = useContext(SettingContext);
  const styles = StyleSheet.create({
    x:{
      flex:1,
      backgroundColor: "#F4F3F0",
      marginTop: Platform.OS === 'ios' ? 40 : 0,
    },
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
    signupContainer: {
      flexDirection: 'row',
      justifyContent: "center",
      borderTopWidth: 1,
      borderColor: "rgba(0, 0, 0, 1)",
      width: '100%',
      paddingVertical: 20,
      backgroundColor: "#F4F3F0",
      position: "absolute",  // Fix the position at the bottom
      bottom: 0,
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
    },
  });

  return (
    <View style={styles.x}>
      <ScrollView>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <Image style={styles.logo} source={require('../../assets/logo.png')} />

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
      </View>


    </ScrollView>
          {/* Signup section */}
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
}
