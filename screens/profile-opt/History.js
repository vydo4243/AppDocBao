import { StyleSheet,View,Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import Thumbnail from "../../component/Thumbnail";
import { deleteHistory, getHistory, getPost, deleteHistoryRSS, getHistoryRSS, getRSSPostById } from "../../firebaseConfig";
import { useState,useEffect, useContext } from "react";
import { SettingContext } from "../../context/SettingContext";

export default function Bookmark(){
    const [list,setList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
      
  
      fetchData(); 
  },[])  
  // async function fetchData() {
  //   try {
  //     setLoading(true);
  //     // Lấy danh sách ID lịch sử bài viết
  //     const docs = await getHistory();
  //     const fetchedPosts = [];

  //     for (const id of docs) {
  //       const post = await getPost(id); // Lấy thông tin bài viết
  //       fetchedPosts.push({ id, ...post });
  //     }

  //     // Cập nhật danh sách bài viết
  //     setList(fetchedPosts);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Lỗi khi lấy danh sách bài viết:", error);
  //   }
  // }
  async function fetchData() {
    try {
      setLoading(true);
  
      // Lấy danh sách ID lịch sử từ bài viết thường và RSS
      const [docs, rssDocs] = await Promise.all([
        getHistory(),
        getHistoryRSS()
      ]);
  
      const fetchedPosts = [];
  
      // Fetch bài viết thường từ collection "posts"
      for (const id of docs) {
        const post = await getPost(id);
        if (post) {
          fetchedPosts.push({ id, ...post, type: "firebase" });
        }
      }
  
      // Fetch bài viết RSS từ collection "rssPosts"
      for (const id of rssDocs) {
        const rssPost = await getRSSPostById(id);
        if (rssPost) {
          fetchedPosts.push({ id, ...rssPost, type: "rss" });
        }
      }
  
      // Sắp xếp theo thời gian mới nhất
      fetchedPosts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  
      // Cập nhật danh sách bài viết
      setList(fetchedPosts);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài viết:", error);
    } finally {
      setLoading(false);
    }
  }
  const {theme} = useContext(SettingContext)
  const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"flex-start",
      alignItems: "center",
      backgroundColor: theme.background,
      padding:16,

    },
    error:{
      fontSize:18,
      marginTop: 50,
    }
})
  const Item = ({item}) => (
    <View style={{flex:1}}>
      {/* <Thumbnail key={item.id} id={item.id} title={item.title} image={item.image} hashtag={item.hashtag}  nav="Post"/> */}
      <Thumbnail
      key={item.id}
      id={item.id}
      title={item.title}
      image={item.image || item.imageUrl}  // image cho post thường, imageUrl cho rss
      hashtag={item.hashtag}
      initialSaved={item.initialSaved}
      nav={item.type === "rss" ? "PostRSS" : "Post"}  // Điều hướng khác nhau
      type={item.type}  // Truyền type để xử lý khác nhau
      pubDate={item.pubDate}
    />
    <TouchableOpacity
      style={{
        marginVertical: 10,
        padding: 5,
        alignSelf: "center",
        backgroundColor: theme.inactive,
        borderRadius: 10,
      }}
      onPress={() => {
        if (item.type === "rss") {
          deleteHistoryRSS(item.id);
        } else {
          deleteHistory(item.id);
        }
        fetchData();
      }}
    >
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

