import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function RadioOption({ label, icon, isSelected, onPress }) {
  return (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={styles.iconContainer}>
        {icon ? (
          <Image
            resizeMode="contain"
            source={icon}
            style={styles.icon}
          />
        ) : (
          <View style={[styles.radio, isSelected && styles.radioSelected]} />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  radioContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    flex: 1,
  },
  iconContainer: {
    minHeight: 24,
    padding: 2,
  },
  icon: {
    width: 20,
    aspectRatio: 1,
  },
  radio: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#AEAEB2',
    width: 22,
    height: 22,
  },
  radioSelected: {
    backgroundColor: '#22AB99',
  },
  label: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'IBM Plex Serif',
    fontWeight: '700',
    letterSpacing: -0.32,
  }
});