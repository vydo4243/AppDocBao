import React, { useState, useContext } from 'react';
import { TouchableOpacity, ScrollView, Alert, Text, StyleSheet, View } from 'react-native';
import Input from './components/Input';
import RadioOption from './components/RadioOption';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'react-native-checkbox';
import { UserContext } from '../../context/UserContext';

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


  const signUpEvent = () => {
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
    // else if (!isChecked) {
    //   Alert.alert("Lỗi", "Vui lòng đọc và đồng ý với chính sách và điều khoản.");
    // } 
    else {
      logIn(username, userType); // Gọi hàm logIn từ UserContext
      Alert.alert("Đăng ký thành công!");
      navigation.navigate("Profile"); // Chỉ điều hướng khi đã xác thực
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.logo} />
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

        <View style={styles.radioGroup}>
          <RadioOption
            label="Độc giả"
            isSelected={userType === 'reader'}
            onPress={() => setUserType('reader')}
          />
          <RadioOption
            label="Tác giả"
            onPress={() => setUserType('author')}
            isSelected={userType === 'author'}
          />
        </View>

        <View style={styles.termsContainer}>

          {/* Checkbox được thêm vào ở đây */}

          <CheckBox
            label=""
            value={isChecked}
            onValueChange={setIsChecked}
            tintColors={{ true: '#73E3D4', false: '#000' }}
            style={styles.checkbox}
          />
          <View style={styles.textContainer}>

            <Text style={styles.termsText}>Tôi đồng ý với{' '}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Policy')}>
              <Text style={styles.policyButtonText}>Chính sách và Điều khoản của ....</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={signUpEvent}>
          <Text style={styles.signUpButtonText}>Đăng ký</Text>
        </TouchableOpacity>

        <View style={styles.loginPrompt}>

          <Text style={styles.loginPromptText}>Đã có tài khoản?{' '}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text style={styles.logInText2}>Đăng nhập ngay!</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'IBM Plex Serif',
    borderRadius: 25,
    flex: 1,
    maxWidth: 510,
    paddingTop: 16,
    padding: 30,
    alignItems: 'center',
  },
  logo: {
    marginTop: 56,
    width: 300,
    height: 100,
    marginBottom: 20,
    backgroundColor: '#D9D9D9',
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
  },
  checkbox: {
    width: 24,
    height: 24,
  },
  textContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    marginLeft: 5, // Thêm khoảng cách giữa checkbox và văn bản

  },
  termsText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'IBM Plex Serif',
    fontSize: 16,
    fontWeight: '700',
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
    fontFamily: 'IBM Plex Serif',
    fontSize: 24,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.48,
  },
  loginPrompt: {
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 1)',
    width: '100%',
    marginTop: 80,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPromptText: {
    fontFamily: 'IBM Plex Serif',
    fontSize: 18,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '700',
    textAlign: 'center',
    alignItems: 'center',
    letterSpacing: -0.36,
  },
  logInText2: {
    fontSize: 18,
    fontFamily: 'IBM Plex Serif, sans-serif',
    color: '#73E3D4',
    fontWeight: '700',
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    letterSpacing: -0.36,
  },
  policyButtonText: {
    fontSize: 16,
    color: '#73E3D4',
    fontWeight: '700',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    letterSpacing: -0.32,
  },
});

