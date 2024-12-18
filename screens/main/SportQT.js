import { StyleSheet,View,Text } from "react-native";

export default function SportQT(){
    return(
        <View style={styles.container}>
            <Text>Sport quốc tế</Text>
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