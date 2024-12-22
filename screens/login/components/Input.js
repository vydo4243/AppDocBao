import React, { useContext }  from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SettingContext } from '../../../context/SettingContext';
export default function Input  ({ label, placeholder,value, secureTextEntry, rightComponent,onChangeText }) {
  const { theme } = useContext(SettingContext);
  const styles = StyleSheet.create({
    inputContainer: {
      minHeight: 70,
      flexGrow: 1,
    },
    inputLabel: {
      fontFamily: theme.font.reg,
      color: "rgba(0, 0, 0, 1)",
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
      paddingVertical: 10,
    },
    input: {
      flex: 1,
      fontFamily: theme.font.bold,
      fontSize: 18,
      color: "rgba(0, 0, 0, 1)",
    }
  });
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

