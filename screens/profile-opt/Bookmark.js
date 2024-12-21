import { StyleSheet,View,Text, FlatList } from "react-native";
import Thumbnail from "../../component/Thumbnail";
import { getBookmark, getPost } from "../../firebaseConfig";
import { useState,useEffect } from "react";

export default function Bookmark(){
    const [list,setList] = useState([]);
    useEffect(()=>{
      async function fetchData() {
        try {
          // Lấy danh sách ID bài viết đã lưu
          const docs = await getBookmark();
          const fetchedPosts = [];
  
          for (const id of docs) {
            const post = await getPost(id); // Lấy thông tin bài viết
            fetchedPosts.push({ id, ...post });
          }
  
          // Cập nhật danh sách bài viết
          setList(fetchedPosts);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách bài viết:", error);
        }
      }
  
      fetchData(); 
  },[])  
    return(
    <View style={styles.container}>
        {list.length==0?
            <Text style={styles.error}>Không có tin để hiển thị</Text>        
        :
      <FlatList
        data={list}
        renderItem={({item}) => <Thumbnail key={item.id} id={item.id} title={item.title} image={item.image} nav="Post"/>}
        keyExtractor={item => item.id}
      />
    }
    </View>
       
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"flex-start",
        alignItems: "center",
    },
    error:{
        fontSize:18,
        marginTop: 50,
    }
})