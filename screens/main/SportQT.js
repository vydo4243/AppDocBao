import { StyleSheet,View,Text, FlatList } from "react-native";
import Thumbnail from "../../component/Thumbnail";

export default function SportQT(){
    // Lấy từ CSDL (id, title, image) mà hashtag là thể thao và quốc tế đưa vào list
    const list = [
        {
            id:1,
            title:"Bóng đá quốc tế 1",
            image:"",
        },
        {
            id:2,
            title:"Bóng đá quốc tế 2",
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