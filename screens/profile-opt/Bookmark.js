import { StyleSheet, View, Text, FlatList, ActivityIndicator, Alert, ScrollView } from "react-native";
import Thumbnail from "../../component/Thumbnail";
import { getBookmark, getPost, getRSSBookmark, unbookmark, unbookmarkRSS,getRSSPostById  } from "../../firebaseConfig";
import { useState, useEffect, useCallback, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SettingContext } from "../../context/SettingContext";

export default function Bookmark() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);  // Trạng thái loading

    useFocusEffect(
        useCallback(() => {
          fetchData();  // Load lại dữ liệu mỗi khi quay về trang Bookmark
        }, [])
      );

    // Hàm fetch data từ firebase, RSS
    const fetchData = async () => {
        try {
            setLoading(true);
            const [savedPostIDs, savedRSSPostIDs] = await Promise.all([
                getBookmark().then((res) => res || []),
                getRSSBookmark().then((res) => res || []),
            ]);
    
            console.log("Bài viết đã lưu (Firebase):", savedPostIDs);
            console.log("RSS đã lưu:", savedRSSPostIDs);
    
            // Kiểm tra savedRSSPostIDs có phải là mảng không
            if (!Array.isArray(savedRSSPostIDs)) {
                console.error("savedRSSPostIDs không phải là mảng:", savedRSSPostIDs);
                return;
            }
    
            const postPromises = savedPostIDs.map((id) => getPost(id));
            const postResults = await Promise.all(postPromises);
    
            const fetchedPosts = postResults
                .map((post, index) => (post ? {
                    id: savedPostIDs[index],
                    ...post,
                    initialSaved: true,
                    type: "firebase",
                } : null))
                .filter(Boolean);
    
            const rssPromises = savedRSSPostIDs.map((id) => id ? getRSSPostById(id) : null);
            const rssResults = await Promise.all(rssPromises);
    
            rssResults.forEach((rssPost, index) => {
                if (rssPost) {
                    fetchedPosts.push({
                        id: savedRSSPostIDs[index],
                        title: rssPost.title || "Không có tiêu đề",
                        image: rssPost.image  || rssPost.imageUrl,
                        pubDate: rssPost.pubDate || new Date().toISOString(),
                        initialSaved: true,
                        type: "rss",
                    });
                }
            });
    
            fetchedPosts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
            setList(fetchedPosts);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bài viết:", error);
            Alert.alert("Lỗi", "Không thể tải danh sách bài viết đã lưu.");
        } finally {
            setLoading(false);
        }
    };

    // Xử lý khi người dùng bỏ lưu
    const handleUnbookmark = useCallback(async (id, type) => {
        // Cập nhật ngay lập tức để phản ánh giao diện
        setList((currentList) =>
            currentList.map((item) =>
                item.id === id ? { ...item, initialSaved: false } : item
            )
        );

        try {
            if (type === "rss") {
                await unbookmarkRSS(id);
            } else {
                await unbookmark(id);
            }

            // Xóa khỏi danh sách sau khi API thành công
            setList((currentList) =>
                currentList.filter((item) => item.id !== id)
            );

        } catch (error) {
            console.error("Lỗi khi bỏ lưu:", error);
            Alert.alert("Lỗi", "Không thể bỏ lưu bài viết.");

            // Khôi phục trạng thái nếu API lỗi
            setList((currentList) =>
                currentList.map((item) =>
                    item.id === id ? { ...item, initialSaved: true } : item
                )
            );
        }
    }, []);

    const {theme} = useContext (SettingContext);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.background,
            padding: 16,
        },
        error: {
            fontSize: 18,
            marginTop: 50,
        },
        loader: {
            marginTop: 20,
        },
    });

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                {loading ? (  // Nếu đang loading, hiển thị vòng quay
                    <ActivityIndicator size="large" color="#800000" style={styles.loader} />
                ) : list.length === 0 ? (
                    <Text style={styles.error}>Không có tin để hiển thị</Text>
                ) : (
                    <FlatList
                        data={list}
                        renderItem={({ item }) => {
                            console.log("Rendering item with image:", item.image);
                            return (
                            <Thumbnail
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                hashtag={item.hashtag}
                                initialSaved={item.initialSaved}
                                nav={item.type === "rss" ? "PostRSS" : "Post"}  // Điều hướng khác nhau
                                onUnbookmark={() => handleUnbookmark(item.id, item.type)}  // Truyền type
                                type={item.type}  // Truyền type để xử lý khác nhau
                                pubDate={item.pubDate}
                            />
                        );
                        }}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                    />
                )}
            </View>
        </ScrollView>
    );
}

