import { StyleSheet,View,Text, FlatList } from "react-native";
import Thumbnail from "../../component/Thumbnail";

export default function Sport(){
    // Lấy từ CSDL (id, title, image) mà hashtag là thể thao và trong nước đưa vào list
    const list = [
        {
            id:1,
            title:"Cách chúng tôi sử dụng dữ liệu cá nhân của bạn",
            image:"",
        },
        {
            id:2,
            title:"Bóng đá Việt Nam",
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