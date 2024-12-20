import { StyleSheet,View,Text, FlatList } from "react-native";
import Thumbnail from "../../component/Thumbnail";

export default function Home(){
    // Lấy từ CSDL (id, title, image) mà hashtag là thể thao và trong nước đưa vào list
    const list = [
        {
            id:1,
            title:"Tổng Bí thư: 'Quân đội ta phải dám đánh, biết đánh và quyết đánh thắng'",
            image:"https://i1-vnexpress.vnecdn.net/2024/12/20/ad4b9530b3240e7a57351-17346672-3561-9476-1734667925.jpg?w=680&h=408&q=100&dpr=2&fit=crop&s=UYcrOMnAoKRBSQcowI8d1w",
        },
        {
            id:2,
            title:"Nguy cơ chiến sự Ukraine khốc liệt hơn sau vụ ám sát tướng Nga",
            image:"https://i1-vnexpress.vnecdn.net/2024/12/18/gettyimages-2189835753-1734512-8149-8116-1734513290.jpg?w=300&h=180&q=100&dpr=2&fit=crop&s=Nn02ePSTERw6PEgzu1s3xQ",
        },
        {
            id:3,
            title:"Đề xuất cá nhân nợ thuế 50 triệu đồng bị tạm hoãn xuất cảnh",
            image:"https://i1-kinhdoanh.vnecdn.net/2024/12/20/221220220528-dsc-3713-17346645-2526-5892-1734664618.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=MhSUrfFVmIGx-9x5NkymMw",
        },
    ]
    return(
    <View style={styles.container}>
        {list.length==0?
            <Text style={styles.error}>Không có tin để hiển thị</Text>        
        :
      <FlatList
        data={list}
        renderItem={({item}) => <Thumbnail id={item.id} title={item.title} image={item.image} nav="HomePost"/>}
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
        paddingBottom: 20,
    },
    error:{
        fontSize:18,
        marginTop: 50,
    }
})