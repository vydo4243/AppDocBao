import { StyleSheet,View,Text } from "react-native";

export default function EditPost(){
    return(
        <View style={styles.container}>
            <Text>Edit Post</Text>
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