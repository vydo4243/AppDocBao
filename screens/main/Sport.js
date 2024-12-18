import { StyleSheet,View,Text } from "react-native";
import Thumbnail from "../../component/Thumbnail";
export default function Sport(){
    return(
        <View style={styles.container}>
            <Text>Sport trong nước</Text>
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