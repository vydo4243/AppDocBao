import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getPostsByHash } from '../../firebaseConfig';
import Thumbnail from '../../component/Thumbnail';
import { SettingContext } from '../../context/SettingContext';

const Business = ({ useFirebase = false }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const { theme, fontSize } = useContext(SettingContext);  // Lấy fontSize từ context

    useEffect(() => {
        getPostsByHash('Kinh doanh').then((docs) => {
            setList(docs);
            setLoading(false);
        });
    }, []);

    const renderItem = ({ item }) => (
        <Thumbnail
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image || null}
            hashtag={item.hashtag || "Không có"}  // Truyền hashtag, fallback nếu không có
            fontSize={fontSize}  // Truyền fontSize
            nav="BusinessPost"
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
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color={theme.color} />
                ) : list.length > 0 ? (
                    <FlatList
                        data={list}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id || item.title}
                        scrollEnabled={false}  // Tắt cuộn của FlatList
                    />
                ) : (
                    <Text style={styles.noArticlesText}>Không có tin để hiển thị</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default Business;
