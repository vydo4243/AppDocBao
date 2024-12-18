import { StyleSheet,View,Text } from "react-native";

export default function Policy(){
    return(
        <View style={styles.container}>
            <Text>Chính sách</Text>
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