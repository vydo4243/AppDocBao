import { StyleSheet, Text, View, Switch} from 'react-native';         // Đỗ Mai Tường Vy - 22521701
import React, {useContext} from 'react';
import { SettingContext } from '../../context/SettingContext';

const SwitchManage = ({title, value, switchEvent}) => {
  const {darkMode, fontSize  } = useContext(SettingContext);
  const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textStyle : {
      color: darkMode ? 'white': 'black',
      fontSize: fontSize ,
      flexShrink:1,
      justifyContent:'center',
      alignContent:'flex-start',
      paddingRight: 10,
      alignSelf:'stretch',
    },
})
  return (
    <View style={styles.container}>
    <Text style={styles.textStyle}>{title}</Text>
    <Switch 
      trackColor={{false: '#BFCBC2', true: '#FFB8C6'}}
      value={value}
      style={{ transform: [{ scaleX: fontSize / 16 }, { scaleY: fontSize / 16 }] }} // Điều chỉnh kích thước của Switch dựa trên fontSize
      onValueChange={() =>switchEvent(previousState => !previousState)}
      
    /> 
    </View>
  )
}

export default SwitchManage;