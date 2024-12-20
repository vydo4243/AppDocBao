import { StyleSheet,View,Text, Image, TouchableOpacity, TextInput } from "react-native";
import { SettingContext } from "../../context/SettingContext";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState} from "react";
import {updateInfo} from "../../firebaseConfig"
import { getAuth ,updatePassword } from "firebase/auth";

export default function Personal(){
    //Lấy từ csdl thông tin người dùng (tên, avt, email,loại người dùng)
    const {uid, userType, username, email, avatar, password, setAvatar, setUsername, setPassword} = useContext(UserContext);
    const [newName , changeName] = useState();
    const [newPass , changePass] = useState();
    const {theme} = useContext(SettingContext);
    useEffect(()=>{
        changeName(username)
        changePass(password);
    },[])
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
    //Vy làm phần này!!!!
    const changeAvt = async() => {   
        //truy cập vòa bộ sưu tập trên thiết bị và đăng tải ảnh lên biến newAvatar
        await updateInfo(uid,{
            "avt" : avatar, // thay avatar => newAvatar
        })
        console.log("Cập nhật ảnh đại diện thành công")
        setAvatar(avatar); // thay avatar => newAvatar
    }
    //!!!
    const updateName = async() => {  
        await updateInfo(uid,{
            "name" : newName,
        })
        console.log("Cập nhật tên người dùng thành công")       
    }
    const updatePass = async() => {  
        await updateInfo(uid,{
            "password" : newPass,
        })
        await updatePassword(getAuth().currentUser,newPass)
        console.log("Cập nhật mật khẩu thành công") 
    }
    const update = () =>{
        if(newName != username){
            updateName();
            setUsername(newName);
        }
        if(newPass != password){
            updatePass();
            setPassword(newPass);
        }
    }
    return(
        <View style={styles.container}>
            <Image alt="avatar" source={{uri: avatar}} style={styles.avt}/>
            <TouchableOpacity onPress={()=>{changeAvt()}}>
                <Text style={styles.avtChange}>Thay đổi ảnh đại diện</Text>
            </TouchableOpacity>
            <View style={styles.fieldFrame}>
                <Text style={styles.fieldName}>Tên người dùng</Text>
                <TextInput style={styles.field} onChangeText={changeName} value={newName}/>
            </View>
            <View style={styles.fieldFrame}>
                <Text style={styles.fieldName}>Email</Text>
                <TextInput style={styles.typeField} value={email} editable={false}/>
            </View>
            <View style={styles.fieldFrame}>
                <Text style={styles.fieldName}>Password</Text>
                <TextInput style={styles.field} onChangeText={changePass} value={newPass}/>
            </View>
            <View style={styles.fieldFrame}>
                <Text style={styles.fieldName}>Loại người dùng</Text>
                <TextInput style={styles.typeField} value={userType} editable={false}/>
            </View>
            <TouchableOpacity style={styles.updateButton} onPress={()=>{update()}}>
                <Text style={styles.updateText}>Cập nhật thông tin</Text>
            </TouchableOpacity>
        </View>
    )
}
