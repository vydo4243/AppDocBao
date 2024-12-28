import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useContext, useState, useEffect } from "react";
import { SettingContext } from "../context/SettingContext";
import { UserContext } from "../context/UserContext";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const windowWidth = Dimensions.get("window").width;
import { updateHistory, bookmarked, unbookmark, getBookmark, unbookmarkRSS, bookmarkRSS, getRSSBookmark, updateHistoryRSS} from "../firebaseConfig";
import Dialog from "react-native-dialog"; // Import thư viện Dialog

export default function Thumbnail({ id, title, image, hashtag, nav, initialSaved, onUnbookmark, type = "firebase", pubDate }) {
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
    useEffect(() => {
        setSaved(initialSaved);  // Đồng bộ khi initialSaved thay đổi từ Bookmark
    }, [initialSaved]);

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
            if (type === "rss") {
                await unbookmarkRSS(id);
            } else {
                await unbookmark(id);
            }
            newSavedStatus = false;  // Cập nhật icon và text khi bỏ lưu
            setDialogContent({
                title: "Đã bỏ lưu bài viết",
                description: "Bài viết đã được bỏ lưu khỏi mục yêu thích của bạn.",
                showLogin: false,
            });

            // Gọi callback khi bỏ lưu
            if (onUnbookmark) {
                onUnbookmark(id, newSavedStatus);
            }
            
        } else {
            if (type === "rss") {
                await bookmarkRSS(id);
            } else {
                await bookmarked(id);
            }

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
    };
    


    const syncBookmarkStatus = async () => {
        if (isAuthenticated) {
            if (type === "rss") {
                const rssDocs = await getRSSBookmark();
                const isBookmarked = rssDocs ? rssDocs.includes(id) : false;
                setSaved(isBookmarked);
                setIcon(isBookmarked ? "bookmark" : "bookmark-outline");
            } else {
                const docs = await getBookmark();
                const isBookmarked = docs ? docs.includes(id) : false;
                setSaved(isBookmarked);
                setIcon(isBookmarked ? "bookmark" : "bookmark-outline");
            }
        }
    };
    
    useEffect(() => {
        syncBookmarkStatus();
    }, [id, isAuthenticated]);

    // Hàm định dạng pubDate
    function formatPubDate(pubDate) {
        try {
            // Tách phần ngày, giờ và múi giờ
            const parts = pubDate.match(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}:\d{2}) \(GMT\+(\d+)\)/);
            
            if (!parts) throw new Error("Invalid pubDate format");
    
            const day = parts[1];
            const month = parts[2];
            const year = parts[3];
            const time = parts[4];
            const gmtOffset = parts[5];
    
            // Định dạng lại thành ISO 8601
            const isoDate = `${year}-${month}-${day}T${time}:00+0${gmtOffset}:00`;
    
            // Parse thành Date object
            const date = new Date(isoDate);
            
            if (isNaN(date.getTime())) throw new Error("Invalid date conversion");
    
            // Định dạng lại theo chuẩn VN
            return date.toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Ho_Chi_Minh'
            });
            
        } catch (error) {
            console.error("Lỗi định dạng pubDate:", error);
            return "Không rõ ngày";
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex:1,
            marginTop: 10,
            marginBottom:10,
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: theme.cardBackground,
            // Đổ bóng (iOS)
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },  // Đổ bóng chỉ phía dưới
            shadowOpacity: 0.2,
            shadowRadius: 8,

            // Đổ bóng (Android)
            elevation: 3,
            borderRadius: 8,
            gap: 15,
            alignSelf: "stretch",
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
            fontSize: fontSize + 4,
            color: theme.textColor,
            lineHeight: fontSize + 8,
            // flexShrink:1,
            // flexGrow:1,
            // textAlign:""
        },
        footerRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        hashtag: {
            fontFamily: theme.font.reg,
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
            color: isSaved ? theme.bottomTabIconColor : theme.textColor,
        },
    });

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
                if (nav !== "EditPost") setReading(true);
                if (isAuthenticated) {
                    if (type === "rss") {
                        updateHistoryRSS(id).then(() => {
                            navigation.navigate(nav, { 
                                id: id, 
                                initialSaved: isSaved,
                            });
                        });  // Lịch sử cho bài viết RSS
                    } else {
                        updateHistory(id).then(() => {
                            navigation.navigate(nav, { 
                                id: id, 
                                initialSaved: isSaved,
                            });
                        });  // Lịch sử cho bài viết firebase
                    }
                    navigation.navigate(nav, {
                        id: id,
                        initialSaved: isSaved,
                    });
                } else {
                    navigation.navigate(nav, { id: id });
                }
            }}
        >
            <View style={styles.container}>
                <Image style={styles.image} source={image ? { uri: image } : {uri: "https://www.shutterstock.com/image-photo/create-visual-breaking-news-image-260nw-2528875197.jpg"}} />
                <Text numberOfLines={3} ellipsizeMode="tail" style={styles.title}>
                    {title}
                </Text>
                <View style={styles.footerRow}>
                    {type === "firebase" && (
                        <Text style={styles.hashtag}>{hashtag || "Không rõ"}</Text>
                    )}
                    {type === "rss" && (
                        <Text style={styles.hashtag}>{formatPubDate(pubDate)}</Text>
                    )}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <MaterialCommunityIcons name={isSaved ? "bookmark" : "bookmark-outline"} size={30} color={isSaved ? theme.bottomTabIconColor : theme.textColor} />
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
