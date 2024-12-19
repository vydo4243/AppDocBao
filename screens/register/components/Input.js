import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Input  ({ label, placeholder,value, secureTextEntry, rightComponent,onChangeText }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="rgba(194, 194, 194, 1)"
          accessibilityLabel={label}
          onChangeText={onChangeText}
          value={value}
        />
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    minHeight: 86,
    width: '100%',
  },
  inputLabel: {
    fontFamily: "IBM Plex Serif, sans-serif",
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "400",
    fontSize: 18,
  },
  inputWrapper: {
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.5)",
    borderWidth: 1,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    fontFamily: "IBM Plex Serif, sans-serif",
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(0, 0, 0, 1)",
  }
});