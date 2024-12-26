import React, { useContext, useEffect, useState , useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl, ScrollView } from "react-native";
import Thumbnail from "../../component/Thumbnail";
import { getRSSPosts, getRSSBookmark } from "../../firebaseConfig";
import { SettingContext } from "../../context/SettingContext";
import { useFocusEffect } from '@react-navigation/native';  // Import useFocusEffect
export default function Trend() {
    const [rssPosts, setRssPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const { theme, fontSize } = useContext(SettingContext);

    // Fetch RSS posts từ Firebase
    const fetchRSSPosts = async (isRefreshing = false) => {
        // Nếu là làm mới, không set loading (tránh vòng quay lớn giữa trang)
        if (!isRefreshing) {
            setLoading(true);
        }

        try {
            const posts = await getRSSPosts();
            setRssPosts(posts);
        } catch (error) {
            console.error("Lỗi khi tải RSS Posts:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);  // Dù lỗi hay thành công đều dừng RefreshControl
        }
    };

    // Gọi fetchRSSPosts khi màn hình Trend focus
    useFocusEffect(
        useCallback(() => {
            fetchRSSPosts();  // Tải lại dữ liệu khi focus
        }, [])
    );
    const handleSaveChange = (id, newSavedStatus) => {
        // Cập nhật nhanh trạng thái trong state hiện tại (UI phản hồi ngay)
        const updatedList = rssPosts.map(post =>
            post.id === id ? { ...post, saved: newSavedStatus } : post
        );
        setRssPosts(updatedList);
    
        // Thực hiện gọi API trong nền để đồng bộ trạng thái
        if (newSavedStatus) {
            bookmarkRSS(id).catch(() => {
                // Nếu thất bại, rollback trạng thái
                setRssPosts((prev) =>
                    prev.map((post) =>
                        post.id === id ? { ...post, saved: !newSavedStatus } : post
                    )
                );
                alert("Lỗi khi lưu bài viết. Vui lòng thử lại.");
            });
        } else {
            unbookmarkRSS(id).catch(() => {
                setRssPosts((prev) =>
                    prev.map((post) =>
                        post.id === id ? { ...post, saved: !newSavedStatus } : post
                    )
                );
                alert("Lỗi khi bỏ lưu bài viết. Vui lòng thử lại.");
            });
        }
    };
    
    // Làm mới danh sách khi kéo xuống
    const handleRefresh = async () => {
        setRefreshing(true);
    
        // Tải dữ liệu mới nhưng giữ lại dữ liệu cũ cho đến khi có phản hồi
        const oldList = [...rssPosts];  // Lưu danh sách cũ
    
        try {
            const newPosts = await getRSSPosts();
            setRssPosts(newPosts);
        } catch (error) {
            console.error("Lỗi khi tải RSS Posts:", error);
            // Nếu lỗi, khôi phục danh sách cũ
            setRssPosts(oldList);
            alert("Lỗi mạng. Không thể làm mới dữ liệu.");
        } finally {
            setRefreshing(false);
        }
    };

    
    const renderItem = ({ item }) => (
        <Thumbnail
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.imageUrl}
            initialSaved={item.saved}
            onUnbookmark={handleSaveChange}
            nav="PostRSS"
            fontSize={fontSize}  // Truyền fontSize
            type="rss"
            pubDate={item.pubDate}
        />
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: theme.background,
        },
        noArticlesText: {
            fontSize: fontSize,
            color: theme.textColor,
            textAlign: "center",
            marginTop: 16,
        },
        loader: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
    });

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[theme.textColor]}  // Vòng xoay - Android
                        tintColor={theme.textColor} // Vòng xoay - iOS
                        progressBackgroundColor={theme.background} // Nền của vòng xoay - Android
                        style={{ backgroundColor: theme.background }} // Nền của RefreshControl
                    />
                }
            >
                <View style={styles.container}>
                    {loading ? (  // Nếu đang loading, hiển thị vòng quay
                        <ActivityIndicator size="large" color="#800000" style={styles.loader} />
                    ) : rssPosts.length > 0 ? (
                        <FlatList
                            data={rssPosts}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}  // Vô hiệu hóa cuộn của FlatList
                            ListEmptyComponent={<Text style={styles.noArticlesText}>Không có tin để hiển thị</Text>}
                        />
                    ) : (
                        <Text style={styles.noArticlesText}>Không có tin để hiển thị</Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
