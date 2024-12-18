import { StyleSheet,View,Text } from "react-native";

export default function Personal(){
    return(
        <View style={styles.container}>
            <Text>Thông tin cá nhân</Text>
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