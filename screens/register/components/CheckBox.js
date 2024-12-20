import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CheckBox = ({value, onValueChange}) => {

  const toggleCheckbox = () => {
    onValueChange(!value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, value && styles.checkboxChecked]}
        onPress={toggleCheckbox}
      >
        {value && <Text style={styles.checkmark}>✔</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#73E3D4',
    borderColor: '#73E3D4',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CheckBox;
