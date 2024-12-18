import { StyleSheet,View,Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SettingContext } from "../../context/SettingContext";
import { useContext } from "react";
export default function Post({title,image,content}){
    const {theme, setReading} = useContext(SettingContext)
    const styles=StyleSheet.create({
        container:{
            flex:1,
            marginTop:50,
            justifyContent: "flex-start",
            alignItems: "center",
        },
        backButton:{
            position: "absolute",
            top:30,
            left: 30,
            width: 50,
            height: 50,
        }
    })
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={()=>{
                setReading(value=>!value);
                navigation.goBack();
            }}>
                <Text>Back</Text>
            </TouchableOpacity>
        </View>
    )
}