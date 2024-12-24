import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import xml2js from 'react-native-xml2js';  // Import thư viện
import RenderHTML from 'react-native-render-html';
import { Dimensions } from "react-native";
import { useWindowDimensions } from 'react-native';
export default function TrendingNews() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const windowWidth = Dimensions.get("window").width;
    const fetchNews = async () => {
        try {
            const response = await fetch(
                "https://news.google.com/rss?hl=vi&gl=VN&ceid=VN:vi"
            );
            const text = await response.text();
    
            xml2js.parseString(text, (error, result) => {
                if (error) {
                    console.error("Error parsing XML:", error);
                    return;
                }
                const items = result.rss.channel[0].item;
                const parsedArticles = items.map((item) => {
                    // Trích xuất ảnh từ description (nếu có)
                    const imgMatch = item.description[0].match(/<img[^>]+src="([^">]+)"/);
                    const imgUrl = imgMatch ? imgMatch[1] : null;
    
                    return {
                        title: item.title[0],
                        link: item.link[0],
                        description: item.description ? item.description[0] : "Không có mô tả",
                        pubDate: item.pubDate ? item.pubDate[0] : "Không rõ ngày đăng",
                        image: imgUrl,  // Thêm ảnh vào bài viết
                    };
                });
    
                setArticles(parsedArticles);
            });
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
            {item.image && (
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
            <Text style={styles.title}>{item.title}</Text>
            <RenderHTML
                contentWidth={windowWidth}
                source={{ html: item.description }}
                ignoredDomTags={['font']}
            />
            <Text style={styles.pubDate}>{item.pubDate}</Text>
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
        marginBottom: 10,
    },
    pubDate: {
        fontSize: 14,
        color: "gray",
        marginTop: 5,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
});