import { StyleSheet,View,Text } from "react-native";

export default function Bookmark(){
    return(
        <View style={styles.container}>
            <Text>Đã lưu</Text>
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