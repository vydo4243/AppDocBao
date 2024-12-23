import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import XMLParser from 'react-xml-parser';  // Sửa import

export default function TrendingNews() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNews = async () => {
        try {
            const response = await fetch(
                "https://news.google.com/rss?hl=vi&gl=VN&ceid=VN:vi"
            );
            const text = await response.text();
            const xml = new XMLParser().parseFromString(text);  // Tạo đối tượng XMLParser
            const items = xml.getElementsByTagName('item');

            const parsedArticles = items.map((item) => {
                return {
                    title: item.getElementsByTagName('title')[0]?.value,
                    link: item.getElementsByTagName('link')[0]?.value,
                    description: item.getElementsByTagName('description')[0]?.value,
                };
            });

            setArticles(parsedArticles);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.articleContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description || "Không có mô tả"}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#800000" />
            ) : (
                <FlatList
                    data={articles}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    articleContainer: {
        marginBottom: 20,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
