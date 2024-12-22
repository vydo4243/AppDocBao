import { StyleSheet,View,Text, FlatList, TextInput, TouchableOpacity, Platform, ActivityIndicator } from "react-native";
import Thumbnail from "../../component/Thumbnail";
import { useContext, useState } from "react";
import { SettingContext } from "../../context/SettingContext";
import { getPostBySearchWord } from "../../firebaseConfig";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export default function Trend(){
    const [list, setList] = useState([]); 
    const [searchWord,setWord] = useState("");
    const {theme} = useContext(SettingContext)
    const [loading,setLoading] = useState(false);
    const styles=StyleSheet.create({
        container:{
            flex:1,
            justifyContent:"flex-start",
            alignItems: "center",
            paddingBottom: 20,
            marginTop: Platform.OS == "ios"?50:10,
        },
        searchRow:{
            flexDirection: "row",
            height:50,
            justifyContent:"space-between",
            marginTop:10,
            gap:5, 
        },
        searchField:{
            width: "80%",
            borderRadius:10,
            borderWidth:1,
            paddingHorizontal:5,
            justifyContent:"space-between",
            flexDirection:"row",
            alignItems:"center"
        },
        searchInput:{      
            width:"50%",
            fontSize: 16,
            fontFamily: theme.font.italic,
            
        },
        searchButton:{
            borderRadius:10,
            width:"15%",
            backgroundColor: theme.color,
            justifyContent: "center",
        },
        searchButtonText:{
            color :"#fff",
            fontSize: 18,
            fontFamily: theme.font.bold,
            textAlign:"center"
        },
        resetsearchForm:{
            backgroundColor: theme.inactive,
            borderRadius:50,
        },
        error:{
            fontSize:18,
            marginTop: 50,
        }
    })
    async function fetchData(searchWord) {
        const posts = await getPostBySearchWord(searchWord);
        setList(posts);
        setLoading(false);
    }
    return(
    <View style={styles.container}>
        <View style={styles.searchRow}>
            <View style={styles.searchField}>
                <TextInput style={styles.searchInput} placeholder="Nhập từ ngữ cần tìm" value={searchWord} onChangeText={setWord} />
                <TouchableOpacity style={styles.resetsearchForm} onPress={()=>{setWord("")}}>
                    <MaterialCommunityIcons name="alpha-x" size={24} color={theme.color}/>
                </TouchableOpacity>
            </View>            
            <TouchableOpacity style={styles.searchButton} onPress={()=>{
                setLoading(true);
                fetchData(searchWord);
            }}>
                <Text style={styles.searchButtonText}>Tìm</Text>
                
            </TouchableOpacity>
        </View>
        {loading?(
        <ActivityIndicator size="large" color="#0000ff" />
        ):(
        list.length === 0?(
        <Text style={styles.error}>Không có kết quả tìm kiếm</Text>        
        ):(
          <FlatList
            data={list}
            renderItem={({item}) => <Thumbnail id={item.id} title={item.title} image={item.image} nav="TrendPost"/>}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false} // Tắt thanh cuộn dọc
            contentContainerStyle={{ paddingBottom: 20 }} // Thêm padding dưới cùng của danh sách
          />
        ))
        }
        
    </View>
       
    )
}

