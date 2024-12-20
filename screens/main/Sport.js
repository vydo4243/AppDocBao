import { StyleSheet,View,Text, FlatList } from "react-native";
import Thumbnail from "../../component/Thumbnail";

export default function Sport(){
    // Lấy từ CSDL (id, title, image) mà hashtag là thể thao và trong nước đưa vào list
    const list = [
        {
            id:1,
            title:"HLV Kim Sang-sik kỳ vọng vào hiệu ứng Nguyễn Xuân Son",
            image:"https://i1-thethao.vnecdn.net/2024/12/20/z6148453181474-fdf038827acc957-5689-4594-1734673213.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=dGbV4K1xbJzJYoZ-FuAh3g",
        },
        {
            id:2,
            title:"HLV Myanmar dọa gây sốc cho Việt Nam",
            image:"https://i1-thethao.vnecdn.net/2024/12/20/472973e9f2fe4fa016ef-173467284-7110-6086-1734672935.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=-xgGAkVXzrNrhm7wbrxvuQ",
        },
    ]
    return(
    <View style={styles.container}>
        {list.length===0?
            <Text style={styles.error}>Không có tin để hiển thị</Text>        
        :
      <FlatList
        data={list}
        renderItem={({item}) => <Thumbnail id={item.id} title={item.title} image={item.image} nav="SportPost"/>}
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