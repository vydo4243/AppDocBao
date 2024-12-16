import { StyleSheet,View,Text } from "react-native";

export default function Trend(){
    return(
        <View style={styles.container}>
            <Text>Hi</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    }
})