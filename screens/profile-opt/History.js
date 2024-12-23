import { StyleSheet,View,Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import Thumbnail from "../../component/Thumbnail";
import { deleteHistory, getHistory, getPost } from "../../firebaseConfig";
import { useState,useEffect, useContext } from "react";
import { SettingContext } from "../../context/SettingContext";

export default function Bookmark(){
    const [list,setList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
      
  
      fetchData(); 
  },[])  
  async function fetchData() {
    try {
      setLoading(true);
      // Lấy danh sách ID lịch sử bài viết
      const docs = await getHistory();
      const fetchedPosts = [];

      for (const id of docs) {
        const post = await getPost(id); // Lấy thông tin bài viết
        fetchedPosts.push({ id, ...post });
      }

      // Cập nhật danh sách bài viết
      setList(fetchedPosts);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài viết:", error);
    }
  }
  const {theme} = useContext(SettingContext)
  const Item = ({item}) => (
    <View style={{flex:1}}>
      <Thumbnail key={item.id} id={item.id} title={item.title} image={item.image} hashtag={item.hashtag} nav="Post"/>
      <TouchableOpacity style={{marginVertical:10,padding:5,alignSelf:"center",backgroundColor:theme.inactive, borderRadius:10}}
      onPress={()=>{
        deleteHistory(item.id)
        fetchData();
    }}>
        <Text style={{fontSize:16,fontFamily:theme.font.bold}}>Xóa khỏi lịch sử xem</Text>
      </TouchableOpacity>
    </View>
  );
    return(
    <View style={styles.container}>
         {loading ? (
                <ActivityIndicator size="large" color={theme.color} />
            ):
            list.length==0? (
            <Text style={styles.error}>Không có lịch sử để hiển thị</Text>        
             ) :(
      <FlatList
        data={list.reverse()}
        renderItem={({item}) => <Item item={item}/>}
        keyExtractor={item => item.id}
      />
   ) }
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