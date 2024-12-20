import { StyleSheet,View,Text, FlatList } from "react-native";
import Thumbnail from "../../component/Thumbnail";

export default function SportQT(){
    // Lấy từ CSDL (id, title, image) mà hashtag là thể thao và quốc tế đưa vào list
    const list = [
        {
            id:1,
            title:"Mbappe vẫn mơ làm đồng đội của Ronaldo",
            image:"https://i1-thethao.vnecdn.net/2024/12/20/mba7-1734663068-2813-1734663203.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=_BVE26Ma-jWUzklgJNZSKg",
        },
        {
            id:2,
            title:"Vinicius - người hùng chung kết của Real",
            image:"https://i1-thethao.vnecdn.net/2024/12/20/vini11-1734682243-9516-1734682340.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=YG02qWE6s5wG54IwAWIFAw",
        },
    ]
    return(
    <View style={styles.container}>
        {list.length==0?
            <Text style={styles.error}>Không có tin để hiển thị</Text>        
        :
      <FlatList
        data={list}
        renderItem={({item}) => <Thumbnail id={item.id} title={item.title} image={item.image} nav="SportPostQT"/>}
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