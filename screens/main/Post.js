import { StyleSheet,View,Text, TouchableOpacity, Image , ScrollView} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SettingContext } from "../../context/SettingContext";
import { useContext, useState, useRef} from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export default function Post({id}){
    //Lấy từ CSDL các thông tin bài viết dựa theo ID
    const [title,setTitle] = useState("Đây là bài viết mẫu");
    const [image,setImage] = useState("");
    const [content,setContent] = useState(
`Bài viết này là bài viết mẫu, với mục đích làm mẫu để thiết kết FE, do chưa kết nối CSDL nên chưa có dữ liệu cụ thể cho các bài viết. 
Nội dung hiển thị là như nhau.

Chiều 18/12, Công ty Xổ số Điện toán Việt Nam (Vietlott) - Bộ Tài chính trao giải đặc biệt của sản phẩm Max 3D+ kỳ quay 853 với tổng trị giá hơn 30 tỷ đồng cho bà P. (ngụ TP.HCM).

Trước đó, bà P. đã mua 30 vé (số vé tối đa mua trong 1 kỳ của sản phẩm Max 3D+) chứa bộ số 704 - 065 và may mắn đã đến với bà khi tất cả các vé đều trúng giải đặc biệt trị giá 1 tỷ đồng/vé. Đây là giải đặc biệt lớn nhất từ trước đến nay của sản phẩm Max 3D+.
Bên cạnh đó, bà P. còn trúng thêm hơn 40 triệu đồng từ các giải thưởng nhỏ khác. Sau khi trừ thuế thu nhập cá nhân theo quy định, bà P. thực lĩnh hơn 27 tỷ đồng.

Theo bà P., bà đang là lao động tự do. Bà thường xuyên mua vé số Vietlott để cầu may. Vào cuối tháng 11/2024, bà quyết định “chơi lớn” nên mua một lúc 30 vé. Những tấm vé này được bà chọn số ngẫu nhiên. Bà vẫn chưa có kế hoạch sử dụng đối với số tiền trúng thưởng.
Trước đó, vào năm 2020, anh A. - sinh viên tại TP.HCM cũng trúng cùng lúc 20 giải đặc biệt (số vé được mua tối đa thời điểm đó) của sản phẩm Max 3D+ với tổng trị giá lên tới 20 tỷ đồng. Bộ số may mắn của anh A là 123044.
Đầu tháng 12/2024, Vietlott cũng đã trao giải Jackpot (độc đắc) sản phẩm Mega 6/45 kỳ quay 1277 trị giá hơn 45 tỷ đồng cho anh P.L (ngụ TP.HCM). Sau khi trừ thuế thu nhập cá nhân, anh L. thực lĩnh khoảng hơn 40,5 tỷ đồng. Anh L. dự định sẽ dùng tiền trúng thưởng để đầu tư kinh doanh và phát triển sự nghiệp. 
`);
    const [publisher,setWriter] = useState("HacThienCau");
    const [publishDate,setDate] = useState("18-12-2024");

    const {theme, setReading} = useContext(SettingContext)
    const styles=StyleSheet.create({
        container:{
            flex:1,
            marginTop:50,
        },
        backButton:{
            position: "absolute",
            top: 30,
            left: 10,
            width: 30,
            height: 30,
            zIndex:10,
            borderRadius:10,
            backgroundColor:"lightgray",
        },
        upButton:{
            position: "absolute",
            bottom: 30,
            right: 20,
            width: 30,
            height: 30,
            zIndex:10,
            borderRadius:10,
            backgroundColor:"lightgray",
        },
        image:{
            marginVertical: 20,
            width:"100%",
            height:300,
            backgroundColor:"gray"
        },
        title:{
            fontSize:24,
            fontFamily: theme.font.bold,
            marginHorizontal: 20,
        },
        publishInfoFrame:{
            display:"flex",
            width:"90%",
            flexDirection:"row",
            margin: 20,
            justifyContent:"space-between",  
        },
        publishInfo:{            
            fontSize:14,
            fontFamily: theme.font.italic,       
        },
        content:{
            marginHorizontal:20,
            fontSize:16,
            fontFamily: theme.font.reg,
            lineHeight:30,   
        }
    })
    const navigation = useNavigation();
    const scrollRef = useRef(null);
    return(
        <ScrollView style={styles.container} ref={scrollRef}>
            <TouchableOpacity style={styles.backButton} onPress={()=>{
                setReading(false);
                navigation.goBack();
            }}>
                <MaterialCommunityIcons name="keyboard-backspace" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.upButton} onPress={()=>{
                scrollRef.current.scrollTo({ offset: 0, animated: true });
            }}>
                <MaterialCommunityIcons name="arrow-collapse-up" size={30} color="black" />
            </TouchableOpacity>
            <Image style={styles.image} source={image}/>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.publishInfoFrame}>
                <Text style={styles.publishInfo}>Người đăng: {publisher}</Text>
                <Text style={styles.publishInfo}>Ngày đăng: {publishDate}</Text>
            </View>
            <Text style={styles.content}>{content}</Text>
        </ScrollView>
    )
}