import React, { useContext } from 'react';       // Đỗ Mai Tường Vy - 22521701
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { SettingContext } from '../../context/SettingContext';
import SwitchManage from './SwitchManage'

const Setting = () => {
  const {darkMode, setDarkMode, fontSize, setFontSize } = useContext(SettingContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      backgroundColor: darkMode ? '#0E0E0E' : 'rgba(217, 217, 217, 0.4)',
      paddingHorizontal:30,
    },
    textStyle: {
      color: darkMode ? 'white': 'black',
      fontSize: fontSize ,
    },
    fontSizeContainer: {
      flexDirection: 'column',
      marginTop: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    slider: {
      flex: 1,
      alignItems:'center',
      marginTop:30,
    },
  });
  
  return (
    <View style={styles.container}>
      {/* Tùy chọn chế độ tối */}
      <SwitchManage darkMode={darkMode}
        title="Dark Mode"                            // Đỗ Mai Tường Vy - 22521701
        value={darkMode}
        switchEvent ={setDarkMode}
    /> 

      {/* Tùy chọn kích thước phông chữ */}
      <View style={styles.fontSizeContainer}>
      <View style={styles.header}>
        <Text style={styles.textStyle}>Font Size</Text>
        <Text style={styles.textStyle}>{fontSize}</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumTrackTintColor= '#FFB8C6'
        minimumValue={12}
        maximumValue={36}
        step={2}
        value={fontSize}
        onValueChange={setFontSize}
      />
      </View>
    </View>
  );
};
export default Setting;