import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { SettingContext } from "../context/SettingContext";
import { UserContext } from "../context/UserContext"; 
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const windowWidth = Dimensions.get('window').width;
import { updateHistory, bookmarked, unbookmark, getBookmark } from "../firebaseConfig";
import Dialog from "react-native-dialog"; // Import thư viện Dialog

export default function Thumbnail({ id, title, image, hashtag, nav }) {
    const navigation = useNavigation();
    const { theme, setReading, fontSize } = useContext(SettingContext);
    const [saved, setSaved] = useState(false);
    const [icon, setIcon] = useState("bookmark-outline");
    const { isAuthenticated } = useContext(UserContext);
    const [dialogVisible, setDialogVisible] = useState(false)
    useEffect(()=>{
        const fetchData = async() =>{
            if (isAuthenticated) { // Chỉ kiểm tra nếu đã đăng nhập
                const docs = await getBookmark();
                setSaved(docs.includes(id));
                setIcon(docs.includes(id) ? "bookmark" : "bookmark-outline");
            }else{
                setSaved(false);
                setIcon("bookmark-outline");
            }
        }
        fetchData();
    },[isAuthenticated])

    const handleSave = () => {
        if (!isAuthenticated) {
            setDialogVisible(true); // Hiển thị hộp thoại nếu chưa đăng nhập
            return;
          }
          if (!saved) {
            setSaved(true);
            bookmarked(id);
            setIcon("bookmark");
            console.log("Đã lưu bài viết");
            setDialogVisible(true);
          } else {
            setSaved(false);
            unbookmark(id);
            console.log("Đã bỏ lưu bài viết");
            setIcon("bookmark-outline");
          }
    };

    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            width: windowWidth - 10,
            paddingVertical: 10,
            paddingHorizontal:20,
            backgroundColor: theme.cardBackground,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 8,
            borderRadius: 8,
            gap: 15,
            alignSelf: "center",
        },
        image: {
            width: "100%",
            height: 200,
            alignSelf: "center",
            backgroundColor: image ? "transparent" : "#d3d3d3",
            borderRadius: 8,
            resizeMode: "cover",
        },
        title: {
            fontFamily: theme.font.bold,
            fontSize: fontSize + 2,
            color: theme.textColor,
            lineHeight: fontSize + 6,
        },
        footerRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        hashtag: {
            fontFamily: theme.font.regular,
            fontSize: fontSize - 2,
            color: theme.inactive,
        },
        saveButton: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"center",
            alignContent:"center",
            paddingVertical: 5,
        },
        saveButtonText: {
            marginLeft: 5,
            fontFamily: theme.font.bold,
            fontSize: fontSize - 2,
            color: theme.textColor,
        },
    });

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
                if (nav !== "EditPost") setReading(true);
                if(isAuthenticated){
                    updateHistory(id).then(() => {
                        navigation.navigate(nav, { id: id });
                    });
                }else{
                    navigation.navigate(nav, { id: id });
                }
                
            }}
        >
            <View style={styles.container}>
                {image ? (
                    <Image style={styles.image} source={{ uri: image }} />
                ) : (
                    <View style={styles.image} />
                )}
                <Text numberOfLines={3} ellipsizeMode="tail" style={styles.title}>
                    {title}
                </Text>

                {/* Footer: Hashtag và Nút Lưu */}
                <View style={styles.footerRow}>
                    <Text style={styles.hashtag}>
                        {hashtag ? hashtag : "Không có"}
                    </Text>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <MaterialCommunityIcons
                            name={icon}
                            size={30}
                            color={theme.textColor}
                        />
                        <Text style={styles.saveButtonText}>{saved? "Đã lưu" : "Lưu"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Dialog */}
      <Dialog.Container  style={{ backgroundColor: theme.background, borderRadius: 40 }} visible={dialogVisible} onBackdropPress={() => setDialogVisible(false)}>
        <Dialog.Title style={{ color: '#14375F', fontSize: 20, fontWeight: 'bold' }}>
          {saved ? 'Đã lưu bài viết' : 'Yêu cầu đăng nhập'}
        </Dialog.Title>
        <Dialog.Description style={{ color: '#333', fontSize: 16, textAlign: 'center' }}>
          {saved
            ? 'Bài viết đã được lưu vào mục yêu thích của bạn.'
            : 'Bạn cần đăng nhập để lưu bài viết.'}
        </Dialog.Description>
        <Dialog.Button
          label="Hủy"
          onPress={() => setDialogVisible(false)}
          style={{ backgroundColor: '#f5f5f5', color: '#333', borderRadius: 10, padding: 10 }}
        />
        {saved ? (
          <Dialog.Button
            label="Đóng"
            onPress={() => setDialogVisible(false)}
            style={{
              backgroundColor: '#14375F',
              color: '#fff',
              borderRadius: 10,
              padding: 10,
              marginLeft: 10,
            }}
          />
        ) : (
          <Dialog.Button
            label="Đăng nhập"
            onPress={() => {
              setDialogVisible(false);
              navigation.navigate("LogIn");
            }}
            style={{
              backgroundColor: '#14375F',
              color: '#fff',
              borderRadius: 10,
              padding: 10,
              marginLeft: 10,
            }}
          />
        )}
      </Dialog.Container>
        </TouchableOpacity>
        
    );
}
