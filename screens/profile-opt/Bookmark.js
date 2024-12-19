import { StyleSheet,View,Text, FlatList } from "react-native";
import Thumbnail from "../../component/Thumbnail";

export default function Bookmark(){
    // Lấy id bài viết trong mục saved từ người dùng x title, image bài viết
    const list = [
        {
            id:1,
            title:"Bài viết bạn đã lưu (mẫu)",
            image:"",
        },
        {
            id:2,
            title:"On iOS you can specify any number of buttons",
            image:"",
        },
        {
            id:3,
            title:"On Android at most three buttons can be specified. Android has a concept of a neutral, negative and a positive button",
            image:"",
        },
        {
            id:4,
            title:"The cancel event can be handled by providing an onDismiss callback property inside the options parameter.",
            image:"",
        },
    ]
    return(
    <View style={styles.container}>
        {list.length==0?
            <Text style={styles.error}>Không có tin để hiển thị</Text>        
        :
      <FlatList
        data={list}
        renderItem={({item}) => <Thumbnail id={item.id} title={item.title} image={item.image} nav="Post"/>}
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