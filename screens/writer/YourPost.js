import { StyleSheet,View,Text } from "react-native";

export default function YourPost(){
    return(
        <View style={styles.container}>
            <Text>Your Post</Text>
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