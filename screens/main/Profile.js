import { StyleSheet,View,Text, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function Profile(){
    const [logIn,setLogIn] = useState(false);  
    return(
        <View style={styles.container}>
            {logIn?
            <View>

            </View>
            :
            <View>
                <TouchableOpacity>
                    <Text>Vui lòng đăng nhập để xem hồ sơ</Text>
                </TouchableOpacity>
            </View>}
            
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