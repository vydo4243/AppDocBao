import * as React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

function UserInfo() {
  const handleEditProfile = () => {
    // Handle edit profile action
  };

  return (
    <Pressable 
      onPress={handleEditProfile}
      style={({pressed}) => [
        styles.userInfoContainer,
        pressed && styles.pressed
      ]}
      accessibilityRole="button"
      accessibilityLabel="Edit profile"
    >
      <View style={styles.userInfoWrapper}>
        <View style={styles.avatarContainer}>
          <Image
            resizeMode="cover"
            source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/b463d37bf2cb16b4a605772df7c7398fd66a33fb96a9785a3ecf39425b7c3245?placeholderIfAbsent=true&apiKey=ed88ccc76b9841ed868b106d756c46f3" }}
            style={styles.avatarImage}
            accessibilityIgnoresInvertColors={true}
          />
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.usernameText}>Username</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  pressed: {
    opacity: 0.7,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  usernameContainer: {
    flex: 1,
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
    fontFamily: "IBM Plex Serif",
  },
  editProfileText: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "IBM Plex Serif",
  },
});

export default UserInfo;