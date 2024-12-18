import { StyleSheet, View, Text, Image } from "react-native";

export default function Thumbnail(){
    return(
        <View style={styles.container}>

        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        width:500,
        height:300,
        padding: 30,
        shadowOffset: {width: 0,height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        backgroundColor: "fff"
    }
})