import React, { useState, useContext } from 'react';
import { TouchableOpacity, ScrollView, Alert, Text, StyleSheet, View } from 'react-native';
import Input from './components/Input';
import RadioOption from './components/RadioOption';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import CheckBox from './components/CheckBox';
import { UserContext } from '../../context/UserContext';
import { signup } from '../../firebaseConfig';
import { Image } from 'react-native';
import { SettingContext } from '../../context/SettingContext';

export default function SignUp() {
  const [isChecked, setIsChecked] = useState(false); // Trạng thái cho checkbox
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  // Tách biệt trạng thái hiển thị mật khẩu cho từng trường
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Mật khẩu
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // Mật khẩu xác nhận
  const { userType, setUserType, logIn } = useContext(UserContext);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Đảo ngược trạng thái mật khẩu
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible); // Đảo ngược trạng thái mật khẩu xác nhận
  };


  const signUpEvent = async() => {
    if (username.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập tên người dùng.");
    } else if (email.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập email.");
    } else if (password.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu.");
    } else if (confirmPassword.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng xác nhận lại mật khẩu.");
    } else if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu không khớp.");
    } 
    else if (!isChecked) {
      Alert.alert("Lỗi", "Vui lòng đọc và đồng ý với chính sách và điều khoản.");
    } 
    else {
        //tạo user trên firebase;
        try{
          const additionalData = {
          userType: userType,
          avt: "https://cdn.builder.io/api/v1/image/assets/TEMP/b463d37bf2cb16b4a605772df7c7398fd66a33fb96a9785a3ecf39425b7c3245",
          saved: {},
          history:{},
          };
          const user = await signup(username, email, password, additionalData);
          if (user && typeof user !== "string") {
            Alert.alert("Đăng ký thành công!","Vui lòng kiểm tra Email để xác thực.");
            navigation.goBack(); // Quay lại trang đăng nhập
          }else {
            Alert.alert("Đăng ký thất bại",user);
          }
      } catch (error) {
      }
    }
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
  const {theme} = useContext(SettingContext);
  const styles = StyleSheet.create({
    x:{
      flex:1,
      backgroundColor: "#F4F3F0"
    },
    container: {
      borderRadius: 25,
      paddingTop: 10,
      padding: 30,
      alignItems: 'center',
      height:"80%",
    },
    logo: {
      width: 300,
      height: 100,
      resizeMode: 'contain',
    },
    form: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
    radioGroup: {
      display: 'flex',
      marginTop: 23,
      width: 262,
      maxWidth: '100%',
      alignItems: 'stretch',
      flexDirection: 'row',
      gap: 40,
    },
    termsContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 25,
      alignSelf: 'center',
      alignContent: 'center',
      alignItems: 'center',
      gap:3,
      paddingHorizontal:20,
    },
    checkbox: {
      width: 24,
      height: 24,
    },
    textContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      flexDirection: 'row',
  
    },
    termsText: {
      color: 'rgba(0, 0, 0, 1)',
      fontSize: 16,
      fontFamily: theme.font.semiBold,
      textAlign: 'center',
      letterSpacing: -0.32,
    },
    signUpButton: {
      borderRadius: 20,
      borderColor: 'rgba(0, 0, 0, 0.5)',
      borderWidth: 1,
      marginTop: 28,
      width: 250,
      maxWidth: '100%',
      paddingVertical: 13,
    },
    signUpButtonText: {
      fontFamily: theme.font.bold,
      fontSize: 24,
      color: 'rgba(0, 0, 0, 1)',
      textAlign: 'center',
      letterSpacing: -0.48,
    },
    loginPrompt: {
      borderTopWidth: 1,
      borderColor: 'rgba(0, 0, 0, 1)',
      width: '100%',
      paddingVertical: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginPromptText: {
      fontFamily: theme.font.bold,
      fontSize: 18,
      color: 'rgba(0, 0, 0, 1)',
      textAlign: 'center',
      alignItems: 'center',
      letterSpacing: -0.36,
    },
    logInText2: {
      fontSize: 18,
      fontFamily: theme.font.bold,
      color: '#73E3D4',
      textAlign: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      letterSpacing: -0.36,
    },
    policyButtonText: {
      fontFamily: theme.font.semiBold,
      fontSize: 16,
      color: '#73E3D4',
      textAlign: 'center',
      alignContent: 'center',
      alignItems: 'center',
      letterSpacing: -0.32,
      overflow: 'hidden',
  
    },
  });
  return (
    <View style={styles.x}>
    <ScrollView>
      <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo}  />
        <View style={styles.form}>
          <Input
            label="Tên người dùng"
            placeholder="Tên người dùng"
            value={username}

            onChangeText={setUsername}
          />
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
          <Input
            label="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu"

            value={confirmPassword}

            onChangeText={setConfirmPassword}
            secureTextEntry={!isConfirmPasswordVisible}
            rightComponent={<ConfirmPasswordRightComponent />}
          />
        </View>

        

        <View style={styles.termsContainer}>
          {/* Checkbox được thêm vào ở đây */}
          <CheckBox
            value={isChecked}
            onValueChange={setIsChecked}
          />
          <View style={styles.textContainer}>
            <Text style={styles.termsText}>Tôi đồng ý với{' '}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Policy')}>
              <Text style={styles.policyButtonText}  numberOfLines={1}  ellipsizeMode="tail">Chính sách và Điều kh...</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={signUpEvent}>
          <Text style={styles.signUpButtonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    <View style={styles.loginPrompt}>

          <Text style={styles.loginPromptText}>Đã có tài khoản?{' '}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text style={styles.logInText2}>Đăng nhập ngay!</Text>
          </TouchableOpacity>

        </View>
    </View>
  );
}



