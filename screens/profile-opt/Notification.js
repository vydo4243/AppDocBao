import { StyleSheet,View,Text } from "react-native";

export default function Notification(){
    return(
        <View style={styles.container}>
            <Text>Thông báo</Text>
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