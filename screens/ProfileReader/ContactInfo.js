import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Linking, Pressable, Image } from "react-native";
import { SettingContext } from "../../context/SettingContext";
function ContactInfo() {
  const {theme} = useContext(SettingContext);
  const handlePhonePress = () => {
    Linking.openURL('tel:0912227225');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:22521212@gmail.com');
  };

  const handleAddressPress = () => {
    Linking.openURL('https://maps.google.com/?q=Số 123, đường số 8, KP. Linh Trung, Thủ Đức, TP. Hồ Chí Minh');
  };
  const styles = StyleSheet.create({
    contactContainer: {
      padding: 20,
      backgroundColor: theme.background,
      marginTop: 8,
    },
    contactTitle: {
      fontSize: 20,
      color: theme.color,
      marginBottom: 16,
      fontFamily: theme.font.semiBold
    },
    contactDetails: {
      marginBottom: 20,
    },
    contactText: {
      fontSize: 16,
      color: theme.textColor2,
      marginBottom: 8,
      fontFamily: theme.font.reg
    },
    mapContainer: {
      alignItems: 'center',
    },
    logo: {
      width: 300,
      height: 100,
      resizeMode: 'contain',
    },
  });
  return (
    <View style={styles.contactContainer}>
      <Text style={styles.contactTitle}>Liên hệ</Text>
      <View style={styles.contactDetails}>
        <Pressable 
          onPress={handlePhonePress}
          accessibilityRole="link"
          accessibilityLabel="Call phone number"
        >
          <Text style={styles.contactText}>Điện thoại: 0912227225</Text>
        </Pressable>
        
        <Pressable 
          onPress={handleEmailPress}
          accessibilityRole="link"
          accessibilityLabel="Send email"
        >
          <Text style={styles.contactText}>Email: 22521212@gmail.com</Text>
        </Pressable>
        
        <Pressable 
          onPress={handleAddressPress}
          accessibilityRole="link"
          accessibilityLabel="Open address in maps"
        >
          <Text style={styles.contactText}>
            Địa chỉ: Số 123, đường số 8, KP. Linh Trung, Thủ Đức, TP. Hồ Chí Minh
          </Text>
        </Pressable>
      </View>
      <View style={styles.mapContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo}  />
      </View>
    </View>
  );
}


export default ContactInfo;