import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SettingContext } from "../../context/SettingContext";
import { useContext, useState, useRef , useEffect} from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Zocial from "@expo/vector-icons/Zocial";
import { getBookmark, getPost, bookmarked, unbookmark } from "../../firebaseConfig";
import { UserContext } from "../../context/UserContext"; 
import Dialog from "react-native-dialog"; // Import thư viện Dialog
export default function Post({ route }) {
  const {id} = route.params;
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [hashtag, setHash] = useState();
  const [publisher, setWriter] = useState("");
  const [publishDate, setDate] = useState("");
  const [saved, setSaved] = useState(false); // kiểm tra ng dùng đã lưu bài viết này chưa?
  const [iconSaved, setIcon] = useState("bookmark-outline");
  const { isAuthenticated } = useContext(UserContext);
  const [dialogVisible, setDialogVisible] = useState(false)
  useEffect(() => {
    const getData = async () => {
      const data = await getPost(id);
      if (data) {
        setTitle(data.title);
        setImage(data.image);
        setContent(data.content);
        setHash(data.hashtag);
        setDate(data.publishDate);
        setWriter("HTC");
      }

      if (isAuthenticated) { // Chỉ kiểm tra nếu đã đăng nhập
        const docs = await getBookmark();
        setSaved(docs.includes(id));
        setIcon(docs.includes(id) ? "bookmark" : "bookmark-outline");
      }
    };
    getData();
  }, [id, isAuthenticated]);
  

  const { theme, setReading } = useContext(SettingContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    backButton: {
      position: "absolute",
      top: 30,
      left: 10,
      width: 30,
      height: 30,
      zIndex: 10,
      borderRadius: 10,
      backgroundColor: "rgba(255,255,255,0.8)",
    },
    upButton: {
      position: "absolute",
      bottom: 30,
      right: 20,
      width: 30,
      height: 30,
      zIndex: 10,
      borderRadius: 10,
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    image: {
      marginBottom: 20,
      width: "100%",
      height: 300,
      backgroundColor: "gray",
    },
    title: {
      fontSize: 20,
      fontFamily: theme.font.bold,
      marginHorizontal: 20,
    },
    publishInfoFrame: {
      display: "flex",
      width: "90%",
      flexDirection: "row",
      marginHorizontal: 20,
      marginVertical: 10,
      justifyContent: "space-between",
    },
    publishInfo: {
      fontSize: 14,
      fontFamily: theme.font.italic,
    },
    content: {
      marginHorizontal: 20,
      fontSize: 16,
      fontFamily: theme.font.reg,
      lineHeight: 30,
      marginBottom: 20,
    },
  });
  
  const bookmark = () => {
    if (!isAuthenticated) {
      setDialogVisible(true); // Hiển thị hộp thoại nếu chưa đăng nhập
      return;
    }
    if (!saved) {
      setSaved(true);
      bookmarked(id);
      setIcon("bookmark");
    } else {
      setSaved(false);
      unbookmark(id);
      setIcon("bookmark-outline");
    }
  };

  const shareFB = () => {
    //share qua fb
    console.log("Share qua facebook thành công");
  };
  const shareGM = () => {
    //share qua gmail
    console.log("Share qua gmail thành công");
  };
  const navigation = useNavigation();
  const scrollRef = useRef(null);
  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setReading(false);
            navigation.goBack();
          }}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={30}
            color="black"
          />
        </TouchableOpacity>

        <Image style={styles.image} source={image?{uri:image}:image} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.publishInfoFrame}>
          <Text style={styles.publishInfo}>Người đăng: {publisher}</Text>
          <Text style={styles.publishInfo}>Ngày đăng: {publishDate}</Text>
        </View>
        <View style={styles.publishInfoFrame}>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <TouchableOpacity onPress={() => shareFB()}>
              <Zocial name="facebook" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => shareGM()}>
              <Zocial name="gmail" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => bookmark()}>
            <MaterialCommunityIcons name={iconSaved} size={30} />
          </TouchableOpacity>
        </View>
        <Text style={styles.content}>{content}</Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.upButton}
        onPress={() => {
          scrollRef.current.scrollTo({ offset: 0, animated: true });
        }}
      >
        <MaterialCommunityIcons
          name="arrow-collapse-up"
          size={30}
          color="black"
        />
      </TouchableOpacity>
      {/* Dialog */}
      <Dialog.Container visible={dialogVisible} onBackdropPress={() => setDialogVisible(false)}>
  <Dialog.Title style={{ color: '#14375F', fontSize: 20, fontWeight: 'bold' }}>
    Yêu cầu đăng nhập
  </Dialog.Title>
  <Dialog.Description style={{ color: '#333', fontSize: 16, textAlign: 'center' }}>
    Bạn cần đăng nhập để lưu bài viết.
  </Dialog.Description>
  <Dialog.Button
    label="Hủy"
    onPress={() => setDialogVisible(false)}
    style={{ backgroundColor: '#f5f5f5', color: '#333', borderRadius: 10, padding: 10 }}
  />
  <Dialog.Button
    label="Đăng nhập"
    onPress={() => {
      setDialogVisible(false);
      navigation.navigate("LogIn");
    }}
    style={{
      backgroundColor: '#14375F',
      color: '#fff',
      borderRadius: 10,
      padding: 10,
      marginLeft: 10,
    }}
  />
</Dialog.Container>
    </View>
  );
}
