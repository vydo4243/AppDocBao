// FontSizeSelect.js

import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { SettingContext } from "../../context/SettingContext"; // Đảm bảo đường dẫn đúng

export default function FontSizeSelect({ size, fontSize }) {
  const { theme } = useContext(SettingContext); // Truy cập theme từ context

  const styles = StyleSheet.create({
    fontSizeContainer: {
      justifyContent: "center",
      alignItems: "center",
      alignContent:"center",
      padding: 3,
      borderRadius: 5,
      backgroundColor: theme.buttonCard
    },
    fontSizeText: {
      color: theme.textColor,
      fontFamily: theme.font.reg,
      textAlign:'center',
      alignSelf:'center'
    },
  });
  
  return (
    <TouchableOpacity style={styles.fontSizeContainer} disabled>
      <Text style={[styles.fontSizeText, { fontSize }]}>{size}</Text>
    </TouchableOpacity>
  );
}
