import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const BackButton = ({ navigation, color = "black", size = 30, style }) => {
  return (
    <TouchableOpacity
      style={[styles.backButton, style]}
      onPress={() => {
        if (navigation && navigation.goBack) {
          navigation.goBack();
        }
      }}
    >
      <MaterialCommunityIcons name="keyboard-backspace" size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        top: 30,
        left: 10,
        width: 30,
        height: 30,
        zIndex: 10,
        borderRadius: 10,
        backgroundColor: "rgba(55,55,55,0.1)",
      },
});

export default BackButton;
