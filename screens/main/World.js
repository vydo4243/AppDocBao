import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from '../../firebaseConfig';
import fetchLatestNews from '../../fetchLatestNews';
import Thumbnail from '../../component/Thumbnail'; // Đường dẫn đúng tới component Thumbnail

const World = ({ useFirebase = false }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (useFirebase) {
            fetchArticlesFromFirebase();
        } else {
            fetchArticlesFromAPI('world');
        }
    }, [useFirebase]);

    const fetchArticlesFromAPI = async (category) => {
        try {
            const data = await fetchLatestNews(category); // Gọi API Currents
            setArticles(data);
        } catch (error) {
            console.error('Error fetching articles from API:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchArticlesFromFirebase = async () => {
        try {
            const articlesRef = firebase.firestore().collection('articles');
            const snapshot = await articlesRef.where('category', '==', 'world').get();
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setArticles(data);
        } catch (error) {
            console.error('Error fetching articles from Firebase:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <Thumbnail
            id={item.id}
            title={item.title}
            image={item.image || null} // Đảm bảo có fallback nếu không có ảnh
            nav="ArticleDetail" // Đặt tên màn hình chi tiết bài báo
        />
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : articles.length > 0 ? (
                <FlatList
                    data={articles}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id || item.title}
                />
            ) : (
                <Text style={styles.noArticlesText}>Không có tin để hiển thị</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    noArticlesText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 16,
    },
});

export default World;
