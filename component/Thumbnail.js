import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useContext, useState, useEffect } from "react";
import { SettingContext } from "../context/SettingContext";
import { UserContext } from "../context/UserContext";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const windowWidth = Dimensions.get("window").width;
import { updateHistory, bookmarked, unbookmark, getBookmark } from "../firebaseConfig";
import Dialog from "react-native-dialog"; // Import thư viện Dialog

export default function Thumbnail({ id, title, image, hashtag, nav, initialSaved, onSaveChange }) {
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
    
        // Gọi callback cập nhật trạng thái trong danh sách Home
        if (onSaveChange) {
            onSaveChange(id, newSavedStatus);
        }
    };
    


    const syncBookmarkStatus = async () => {
        if (isAuthenticated) {
            const docs = await getBookmark();
            const isBookmarked = docs.includes(id);
            setSaved(isBookmarked);
            setIcon(isBookmarked ? "bookmark" : "bookmark-outline");
        }
    };

    useEffect(() => {
        syncBookmarkStatus();
    }, [id, isAuthenticated]);

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
                if (isAuthenticated) {
                    updateHistory(id).then(() => {
                        navigation.navigate(nav, { 
                            id: id, 
                            initialSaved: isSaved,
                            onSaveChange: (newSavedStatus) => {
                                setSaved(newSavedStatus);
                                setIcon(newSavedStatus ? "bookmark" : "bookmark-outline");
                        
                                if (route.params?.onSaveChange) {
                                    route.params.onSaveChange(id, newSavedStatus);
                                }
                            }
                        });
                    });
                } else {
                    navigation.navigate(nav, { id: id });
                }
            }}
        >
            <View style={styles.container}>
                <Image style={styles.image} source={image ? { uri: image } : image} />
                <Text numberOfLines={3} ellipsizeMode="tail" style={styles.title}>
                    {title}
                </Text>
                <View style={styles.footerRow}>
                    <Text style={styles.hashtag}>{hashtag || "Không có"}</Text>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <MaterialCommunityIcons name={iconSaved} size={30} />
                        <Text style={styles.saveButtonText}>
                            {isSaved ? "Bỏ lưu" : "Lưu"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>{dialogContent.title}</Dialog.Title>
                <Dialog.Description>{dialogContent.description}</Dialog.Description>
                <Dialog.Button label="Đóng" onPress={() => setDialogVisible(false)} />
            </Dialog.Container>
        </TouchableOpacity>
    );
}
