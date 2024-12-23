import { StyleSheet, View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import Thumbnail from "../../component/Thumbnail";
import { getBookmark, getPost } from "../../firebaseConfig";
import { useState, useEffect, useCallback } from "react";

export default function Bookmark() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);  // Trạng thái loading

    useEffect(() => {
        fetchData();
    }, []);

    // Hàm fetch data từ firebase
    const fetchData = async () => {
        try {
            setLoading(true);
            const docs = await getBookmark();
            const fetchedPosts = [];

            for (const id of docs) {
                const post = await getPost(id);  // Lấy thông tin bài viết
                fetchedPosts.push({ id, ...post, initialSaved: true });
            }
            setList(fetchedPosts);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bài viết:", error);
        } finally {
            setLoading(false);
        }
    };

    // Xử lý khi người dùng bỏ lưu
    const handleUnbookmark = useCallback(async () => {
        await fetchData();  // Gọi lại fetchData để tải lại danh sách
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (  // Nếu đang loading, hiển thị vòng quay
                <ActivityIndicator size="large" color="#800000" style={styles.loader} />
            ) : list.length === 0 ? (
                <Text style={styles.error}>Không có tin để hiển thị</Text>
            ) : (
                <FlatList
                    data={list}
                    renderItem={({ item }) => (
                        <Thumbnail
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            hashtag={item.hashtag}
                            initialSaved={item.initialSaved}
                            nav="Post"
                            onUnbookmark={handleUnbookmark}  // Truyền hàm xóa bài viết
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    error: {
        fontSize: 18,
        marginTop: 50,
    },
    loader: {
        marginTop: 20,
    },
});
