// Profile.js

import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity,ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import MenuList from "../ProfileReader/MenuList"; 
import ContactInfo from "../ProfileReader/ContactInfo";
import { SettingContext } from "../../context/SettingContext";


function  ProfileHeader({ username, avatar, isAuthenticated }) {
  const { theme } = useContext(SettingContext);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    profileContent: {
      gap: 20,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      padding: 15,
      backgroundColor: theme.background,
    },
    avatarImage: {
      borderRadius: 50,
      width: 90,
      height: 90,
      flexShrink: 0,
      color: theme.textColor,
      borderColor: theme.iconAvt,
      borderStyle:"solid",
      borderWidth:1
    },
    usernameContainer: {
      justifyContent: "center",
      paddingLeft: 10,
    },
    username: {
      color: theme.textColor,
      fontSize: 20,
      fontFamily: theme.font.bold,
      letterSpacing: -0.4,
      flexWrap: "wrap",
      textAlign: "left",
    },
    loginRegisterButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 5,
      backgroundColor: theme.cardBackground
    },
    loginRegisterText: {
      color: theme.textColor,
      fontSize: 18,
      fontFamily: theme.font.bold,
    },
  });

  if (isAuthenticated) {
    return (
      <View style={styles.profileContent}>
        <Image
          resizeMode="cover"
          source={{
            uri: avatar || "https://cdn.builder.io/api/v1/image/assets/TEMP/default-avatar",
          }}
          style={styles.avatarImage}
        />
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{username || "Người dùng"}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.profileContent}>
        <Image
          resizeMode="cover"
          source={{
            uri: avatar ||  "https://cdn.builder.io/api/v1/image/assets/TEMP/b463d37bf2cb16b4a605772df7c7398fd66a33fb96a9785a3ecf39425b7c3245",
          }}
          style={styles.avatarImage}
        />
        <TouchableOpacity
          style={styles.loginRegisterButton}
          onPress={() => navigation.navigate("LogIn")}
        >
          <Text style={styles.loginRegisterText}>Đăng nhập/Đăng ký</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default function Profile() {
  const { isAuthenticated, username, userType, avatar, logOut } = useContext(UserContext);
  const navigation = useNavigation();
  const { theme } = useContext(SettingContext);
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <ProfileHeader username={username} avatar={avatar} isAuthenticated={isAuthenticated}/>
            <MenuList />
            <ContactInfo />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },

  guestText: {
    fontSize: 18,
    color: "#666",
    marginLeft: 10,
  },
});