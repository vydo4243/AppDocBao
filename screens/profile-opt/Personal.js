import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { SettingContext } from "../../context/SettingContext";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { updateInfo } from "../../firebaseConfig";
import { getAuth, updatePassword } from "firebase/auth";
import { updateAvatar } from "../../firebaseConfig";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from 'expo-image-picker';

export default function Personal() {
    const { uid, userType, username, email, avatar, password, setAvatar, setUsername, setPassword } = useContext(UserContext);
    const [newName, changeName] = useState();
    const [newPass, changePass] = useState();
    const { theme } = useContext(SettingContext);

    useEffect(() => {
        changeName(username);
        changePass(password);
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 30,
        },
        avt: {
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: theme.inactive,
        },
        avtChange: {
            fontFamily: theme.font.bold,
            color: theme.color,
            fontSize: 18,
            margin: 10,
        },
        fieldFrame: {
            margin: 10,
            width: "100%",
            justifyContent: "center",
        },
        fieldName: {
            fontFamily: theme.font.bold,
            color: theme.inactive,
            fontSize: 18,
        },
        field: {
            width: "100%",
            height: 50,
            borderBottomWidth: 1,
            fontFamily: theme.font.bold,
            color: "black",
            fontSize: 18,
        },
        typeField: {
            width: "100%",
            height: 50,
            borderBottomWidth: 1,
            fontFamily: theme.font.bold,
            color: 'gray',
            fontSize: 18,
        },
        updateButton: {
            backgroundColor: theme.color,
            padding: 15,
            borderRadius: 25,
            margin: 10,
        },
        updateText: {
            fontFamily: theme.font.bold,
            fontSize: 18,
        }
    });

    const handleAvatarUpdate = async (fileUri) => {
        try {
            // Upload ảnh lên Cloudinary và lấy URL mới
            const newAvatarUrl = await updateAvatar(uid, fileUri);
    
            if (newAvatarUrl) {
                // Cập nhật avatar mới trong Firestore
                const updateSuccess = await updateInfo(uid, { avt: newAvatarUrl });
    
                if (updateSuccess) {
                    // Cập nhật trong UserContext
                    setAvatar(newAvatarUrl);
                    console.log("Cập nhật ảnh đại diện thành công:", newAvatarUrl);
                } else {
                    console.error("Không thể cập nhật avatar trong Firestore.");
                }
            } else {
                console.error("URL ảnh mới không hợp lệ.");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật ảnh đại diện:", error);
        }
    };
    
    const selectImage = async () => {
        try {
            // Yêu cầu quyền truy cập thư viện ảnh
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
            if (!permissionResult.granted) {
                alert("Ứng dụng cần quyền để truy cập thư viện ảnh!");
                return;
            }
    
            // Chọn ảnh từ thư viện
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
                allowsEditing: true,
            });
    
            if (!result.canceled && result.assets && result.assets[0]?.uri) {
                const fileUri = result.assets[0].uri;
                console.log("Avatar URI:", fileUri);
                await handleAvatarUpdate(fileUri);
            } else {
                console.log("Người dùng đã hủy chọn ảnh.");
            }
        } catch (error) {
            console.error("Lỗi khi chọn ảnh:", error);
        }
    };
    
    const changeAvt = async () => {
        try {
            await selectImage();
        } catch (error) {
            console.error("Failed to change avatar:", error);
        }
    };

    const updateName = async () => {
        try {
            await updateInfo(uid, { name: newName });
            setUsername(newName);
            console.log("Cập nhật tên người dùng thành công");
        } catch (error) {
            console.error("Failed to update name:", error);
        }
    };

    const updatePass = async () => {
        try {
            await updatePassword(getAuth().currentUser, newPass);
            await updateInfo(uid, { password: newPass });
            setPassword(newPass);
            console.log("Cập nhật mật khẩu thành công");
        } catch (error) {
            console.error("Failed to update password:", error);
        }
    };

    const update = () => {
        if (newName !== username) {
            updateName();
        }
        if (newPass !== password) {
            updatePass();
        }
    };

    return (
        <View style={styles.container}>
            <Image alt="avatar" source={{ uri: avatar }} style={styles.avt} />
            <TouchableOpacity onPress={changeAvt}>
                <Text style={styles.avtChange}>Thay đổi ảnh đại diện</Text>
            </TouchableOpacity>
            <View style={styles.fieldFrame}>
                <Text style={styles.fieldName}>Tên người dùng</Text>
                <TextInput style={styles.field} onChangeText={changeName} value={newName} />
            </View>
            <View style={styles.fieldFrame}>
                <Text style={styles.fieldName}>Email</Text>
                <TextInput style={styles.typeField} value={email} editable={false} />
            </View>
            <View style={styles.fieldFrame}>
                <Text style={styles.fieldName}>Password</Text>
                <TextInput style={styles.field} onChangeText={changePass} value={newPass} secureTextEntry={true} />
            </View>
            <View style={styles.fieldFrame}>
                <Text style={styles.fieldName}>Loại người dùng</Text>
                <TextInput style={styles.typeField} value={userType} editable={false} />
            </View>
            <TouchableOpacity style={styles.updateButton} onPress={update}>
                <Text style={styles.updateText}>Cập nhật thông tin</Text>
            </TouchableOpacity>
        </View>
    );
}