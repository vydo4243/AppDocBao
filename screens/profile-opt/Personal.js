import { StyleSheet,View,Text, Image, TouchableOpacity, TextInput } from "react-native";
import { SettingContext } from "../../context/SettingContext";
import { useContext, useState} from "react";

export default function Personal(){
    //Lấy từ csdl thông tin người dùng (tên, avt, email,loại người dùng)
    const [username,setUsername] = useState("HacThienCau");
    const [email,setEmail] = useState("dragneel.takeshi@gmail.com");
    const [userType,setType] = useState("Writer");
    const [avt, setAvt] = useState("");
    const {theme} = useContext(SettingContext);
    const styles=StyleSheet.create({
        container:{
            flex:1,
            justifyContent:"flex-start",
            alignItems:"center",
            padding:30,
        },
        avt:{
            width:150,
            height:150,
            borderRadius:75,
            backgroundColor:theme.inactive,
        },
        avtChange:{
            fontFamily: theme.font.bold,
            color: theme.color,
            fontSize:18,
            margin:10,
           
        },
        fieldFrame:{
            margin:10,
            width:"100%",
            justifyContent:"center",
        },
        fieldName:{
            fontFamily: theme.font.bold,
            color: theme.inactive,
            fontSize: 18,
        },
        field:{
            width:"100%",
            height: 50,
            borderBottomWidth:1,
            fontFamily: theme.font.bold,
            color: "black",
            fontSize: 18,
        },
        typeField:{
            width:"100%",
            height: 50,
            borderBottomWidth:1,
            fontFamily: theme.font.bold,
            color: 'gray',
            fontSize: 18,
        },
        updateButton:{
            backgroundColor: theme.color,
            padding: 15,
            borderRadius: 25,
            margin: 10,
        },
        updateText:{
            fontFamily: theme.font.bold,
            fontSize: 18,
        }
    })
    const changeAvt = () => {   //truy cập vòa bộ sưu tập trên thiết bị và đăng tải ảnh lên

    }
    const update = () => {  
        // cập nhật thông tin lên csdl
        console.log("Cập nhật thông tin thành công")
    }
    return(
        <View style={styles.container}>
            <Image alt="avatar" source={avt} style={styles.avt}/>
            <TouchableOpacity onPress={()=>{changeAvt()}}>
                <Text style={styles.avtChange}>Thay đổi ảnh đại diện</Text>
            </TouchableOpacity>
            <View style={styles.fieldFrame}>
                <Text style={styles.fieldName}>Tên người dùng</Text>
                <TextInput style={styles.field} onChangeText={setUsername} value={username}/>
            </View>
            <View style={styles.fieldFrame}>
                <Text style={styles.fieldName}>Email</Text>
                <TextInput style={styles.field} onChangeText={setEmail} value={email}/>
            </View>
            <View style={styles.fieldFrame}>
                <Text style={styles.fieldName}>Email</Text>
                <TextInput style={styles.typeField} value={userType} editable={false}/>
            </View>
            <TouchableOpacity style={styles.updateButton} onPress={()=>{update()}}>
                <Text style={styles.updateText}>Cập nhật thông tin</Text>
            </TouchableOpacity>
        </View>
    )
}
