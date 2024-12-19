import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function SocialLogin  ({ imageSource }) {
  return (
    <TouchableOpacity style={styles.socialButton}>
      <Image
        resizeMode="contain"
        source={imageSource}
        style={styles.socialIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    borderRadius: 50,
    width: 75,
    aspectRatio: 1,
  },
  socialIcon: {
    width: '80%',
    height: '80%',
    borderRadius: 50,
  }
});