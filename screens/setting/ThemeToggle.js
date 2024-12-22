import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ThemeToggle({ label, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.toggleOption, isActive && styles.activeOption]}
      onPress={onPress}
    >
      <Text style={[styles.toggleText, isActive && styles.activeText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggleOption: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
  },
  activeOption: {
    backgroundColor: "#E53935",
  },
  toggleText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeText: {
    color: "#FFF",
  },
});
