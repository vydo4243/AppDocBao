import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FontSizeSelect({ size, fontSize = 18 }) {
  return (
    <View style={[styles.fontSizeContainer, { height: fontSize + 20 }]}>
      <Text style={[styles.fontSizeText, { fontSize }]}>{size}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fontSizeContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    width: 38,
    borderRadius: 4,
    backgroundColor: "#F5F5F5",
  },
  fontSizeText: {
    color: "#131313",
    fontWeight: "500",
  },
});
