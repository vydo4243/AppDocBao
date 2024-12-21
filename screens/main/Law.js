import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from '../../firebaseConfig';
import fetchLatestNews from '../../fetchLatestNews';

const Law = ({ useFirebase = false }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (useFirebase) {
            fetchArticlesFromFirebase();
        } else {
            fetchArticlesFromAPI();
        }
    }, [useFirebase]);

    const fetchArticlesFromAPI = async () => {
        try {
            const data = await fetchLatestNews(); // Gọi API Currents
            setArticles(data);
        } catch (error) {
            console.error('Error fetching articles from API:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchArticlesFromFirebase = async () => {
        try {
            const articlesRef = firebase.firestore().collection('business-articles');
            const snapshot = await articlesRef.get();
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setArticles(data);
        } catch (error) {
            console.error('Error fetching articles from Firebase:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.articleContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
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
    articleContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    noArticlesText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 16,
    },
});

export default Law;
