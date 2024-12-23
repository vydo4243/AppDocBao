import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useContext, useState, useEffect } from "react";
import { SettingContext } from "../context/SettingContext";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const windowWidth = Dimensions.get('window').width;
import { getBookmark, bookmarked, unbookmark } from "../firebaseConfig";
import { UserContext } from "../context/UserContext"; 
import Dialog from "react-native-dialog";

export default function Thumbnail({ id, title, image, hashtag, nav, initialSaved, onUnbookmark }) {
    const navigation = useNavigation();
    const { theme, setReading, fontSize } = useContext(SettingContext);
    const { isAuthenticated } = useContext(UserContext);

    const [isSaved, setSaved] = useState(initialSaved);  
    const [iconSaved, setIcon] = useState(initialSaved ? "bookmark" : "bookmark-outline");
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogContent, setDialogContent] = useState({
        title: "",
        description: "",
        showLogin: false,
    });

    const handleSave = async () => {
        if (!isAuthenticated) {
            setDialogContent({
                title: "Yêu cầu đăng nhập",
                description: "Bạn cần đăng nhập để lưu bài viết.",
                showLogin: true,
            });
            setDialogVisible(true);
            return;
        }
    
        let newSavedStatus;
        if (isSaved) {
            await unbookmark(id);
            newSavedStatus = false;
            setDialogContent({
                title: "Đã bỏ lưu bài viết",
                description: "Bài viết đã được bỏ lưu khỏi mục yêu thích của bạn.",
                showLogin: false,
            });
        } else {
            await bookmarked(id);
            newSavedStatus = true;
            setDialogContent({
                title: "Đã lưu bài viết",
                description: "Bài viết đã được lưu vào mục yêu thích của bạn.",
                showLogin: false,
            });
        }
    
        setSaved(newSavedStatus);
        setIcon(newSavedStatus ? "bookmark" : "bookmark-outline");
        setDialogVisible(true);

        // Cập nhật danh sách Bookmark khi bỏ lưu
        if (!newSavedStatus && onUnbookmark) {
            onUnbookmark(id);
        }
    };

    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            width: windowWidth - 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
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
            justifyContent: "center",
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
                navigation.navigate(nav, {
                    id: id,
                    initialSaved: isSaved,
                });
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

                <View style={styles.footerRow}>
                    <Text style={styles.hashtag}>{hashtag || "Không có"}</Text>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <MaterialCommunityIcons
                            name={iconSaved}
                            size={30}
                            color={isSaved ? theme.bottomTabIconColor : theme.textColor}
                        />
                        <Text style={styles.saveButtonText}>
                            {isSaved ? "Bỏ lưu" : "Lưu"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Dialog */}
            <Dialog.Container
                style={{ backgroundColor: theme.background, borderRadius: 40 }}
                visible={dialogVisible}
                onBackdropPress={() => setDialogVisible(false)}
            >
                <Dialog.Title style={{ color: '#14375F', fontSize: 20, fontWeight: 'bold' }}>
                    {dialogContent.title}
                </Dialog.Title>
                <Dialog.Description style={{ color: '#333', fontSize: 16, textAlign: 'center' }}>
                    {dialogContent.description}
                </Dialog.Description>
                <Dialog.Button
                    label="Đóng"
                    onPress={() => setDialogVisible(false)}
                    style={{ backgroundColor: '#f5f5f5', color: '#333', borderRadius: 10, padding: 10 }}
                />
                {dialogContent.showLogin && (
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
