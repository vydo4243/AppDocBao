import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import {getPostsByHash} from '../../firebaseConfig';
import fetchLatestNews from '../../fetchLatestNews';
import Thumbnail from '../../component/Thumbnail'; // Đường dẫn đúng tới component Thumbnail

const World = ({ useFirebase = false }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [list,setList] = useState([]);
    useEffect(()=>{
      getPostsByHash('Thế giới').then((docs)=>{
        setList(docs);
        
      })
      setLoading(false)
    },[])  
    const renderItem = ({ item }) => (
        <Thumbnail
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image || null} // Đảm bảo có fallback nếu không có ảnh
            nav="worldpost" // Đặt tên màn hình chi tiết bài báo
        />
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : list.length > 0 ? (
                <FlatList
                    data={list}
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
