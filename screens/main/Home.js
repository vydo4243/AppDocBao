import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getHome } from '../../firebaseConfig';
import Thumbnail from '../../component/Thumbnail';
import { SettingContext } from '../../context/SettingContext';
import { useFocusEffect } from '@react-navigation/native';  // Import useFocusEffect

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme, fontSize } = useContext(SettingContext);

    // Fetch dữ liệu từ Firebase
    const fetchData = async () => {
        setLoading(true);
        const docs = await getHome();
        setArticles(docs.reverse());
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();  // Load lại dữ liệu mỗi khi màn hình Home được focus
        }, [])
    );

    const handleSaveChange = (id, newSavedStatus) => {
        const updatedList = articles.map(article =>
            article.id === id ? { ...article, saved: newSavedStatus } : article
        );
        setArticles(updatedList);
    };

    const renderItem = ({ item }) => (
        <Thumbnail
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image || null}
            hashtag={item.hashtag || "Không có"}
            fontSize={fontSize}
            nav="HomePost"
            initialSaved={item.saved}
            onSaveChange={handleSaveChange}  // Truyền callback cập nhật trạng thái
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
            textAlign: 'center',
            marginTop: 16,
        },
    });

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={theme.color} />
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

export default Home;
