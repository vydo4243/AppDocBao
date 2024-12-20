import { StyleSheet,View,Text, FlatList } from "react-native";
import Thumbnail from "../../component/Thumbnail";

export default function Trend(){
    // Lấy từ CSDL (id, title, image) mà hashtag là thể thao và trong nước đưa vào list
    const list = [
        {
            id:1,
            title:'Du lịch nội địa "lên ngôi" trong xu hướng tìm kiếm về địa điểm đến',
            image:"https://i1-dulich.vnecdn.net/2024/12/18/a15-1734507134-1163-1734507321.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=RcYyIWcnTomOoXHVcLnbsA",
        },
        {
            id:2,
            title:"Người Việt tìm kiếm công cụ AI nào trên Google trong năm 2024?",
            image:"https://phongvu.vn/cong-nghe/wp-content/uploads/2024/12/xu-huong-tim-kiem-noi-bat-10.jpg",
        },
        {
            id:3,
            title:'Ukraine tạo ra "con đường tử thần" ở tỉnh Kursk',
            image:"https://nld.mediacdn.vn/291774122806476800/2024/12/3/ukraine-17332190420101027006116.jpg",
        },
    ]
    return(
    <View style={styles.container}>
        {list.length === 0?
            <Text style={styles.error}>Không có tin để hiển thị</Text>        
        :
      <FlatList
        data={list}
        renderItem={({item}) => <Thumbnail id={item.id} title={item.title} image={item.image} nav="TrendPost"/>}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false} // Tắt thanh cuộn dọc
        contentContainerStyle={{ paddingBottom: 20 }} // Thêm padding dưới cùng của danh sách
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
        paddingBottom: 20,
    },
    error:{
        fontSize:18,
        marginTop: 50,
    }
})