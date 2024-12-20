import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { SettingContext } from "../context/SettingContext";
import {Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;

export default function Thumbnail({id, title, image, nav}){
    const navigation = useNavigation();
    const {theme, setReading} = useContext(SettingContext);
    const styles=StyleSheet.create({
        container:{
            marginTop: 10,
            width:windowWidth-10,
            padding: 20,
            backgroundColor: "#fff",
            shadowOffset: {width: 0,height: 3},
            shadowOpacity: 0.5,
            shadowRadius: 5,            
            zIndex:1,
            borderRadius: 3,
            gap: 20,
        },
        image:{
            width: "100%",
            height: 200,
            alignSelf: "center",   
            backgroundColor: image ? "transparent" : "lightgray",
            borderRadius: 5,
            resizeMode: "cover",
        },
        title:{
            fontFamily: theme.font.bold,
            fontSize: 18,
        }
    })
    return(
        <TouchableOpacity onPress={()=>{
            if(nav!="EditPost") setReading(true);
            navigation.navigate(nav,id) ;
        }}>
        <View style={styles.container}>
            {image ? (
            <Image style={styles.image} source={{ uri: image }} />
            ) : (
            <View style={styles.image} />
            )}
            <Text style={styles.title}>{title}</Text>
        </View>
        </TouchableOpacity>
    )
}
