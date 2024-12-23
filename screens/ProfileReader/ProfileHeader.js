import * as React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ProfileHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <Pressable 
        onPress={() => navigation.goBack()}
        style={({pressed}) => [
          styles.backButton,
          pressed && styles.backButtonPressed
        ]}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Image
          resizeMode="contain"
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/a7cc5bf275f0d1a9129cead56f7ebcc401cc62cd4a5a58914066168111252f1c?placeholderIfAbsent=true&apiKey=ed88ccc76b9841ed868b106d756c46f3" }}
          style={styles.headerIcon}
          accessibilityIgnoresInvertColors={true}
        />
      </Pressable>
      <View style={styles.headerTextWrapper}>
        <Text style={styles.headerText}>Hồ sơ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerTextWrapper: {
    flex: 1,
    alignItems: 'center',
    marginRight: 24,
  },
  headerText: {
    fontFamily: "IBM Plex Serif",
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: -0.4,
  },
});

export default ProfileHeader;