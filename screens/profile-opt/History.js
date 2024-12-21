import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const History = ({ viewedArticles }) => {
    const renderItem = ({ item }) => (
        <View style={styles.articleContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.dateViewed}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Lịch sử bài viết đã xem</Text>
            <FlatList
                data={viewedArticles}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            {viewedArticles.length === 0 && (
                <Text>Không có bài viết nào trong lịch sử</Text>
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    articleContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
});

export default History;