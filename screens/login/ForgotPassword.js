import { StyleSheet,View,Text } from "react-native";

export default function ForgotPassword(){
    return(
        <View style={styles.container}>
            <Text>Quên mật khẩu</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: "center",
    },
})