import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Share,
  ActivityIndicator,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SettingContext } from "../../context/SettingContext";
import { useContext, useState, useRef, useEffect,useCallback } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Zocial from "@expo/vector-icons/Zocial";
import { getBookmark, getPost, bookmarked, unbookmark, getRelatedPosts} from "../../firebaseConfig";
import { UserContext } from "../../context/UserContext";
import Dialog from "react-native-dialog"; // Import thư viện Dialog
import { useFocusEffect } from "@react-navigation/native";

export default function Post({ route }) {
  const { id, initialSaved } = route.params; // Nhận trạng thái từ Thumbnail
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [hashtag, setHash] = useState();
  const [publisher, setWriter] = useState("");
  const [publishDate, setDate] = useState("");
  const [saved, setSaved] = useState(initialSaved);
  const [iconSaved, setIcon] = useState(initialSaved ? "bookmark" : "bookmark-outline");
  const { isAuthenticated } = useContext(UserContext);
  const { theme, fontSize, setReading } = useContext(SettingContext);
  const [loading, setLoading] = useState(true);  // Thêm trạng thái loading
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
    showLogin: false,
  });

  const navigation = useNavigation();
  const scrollRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPost(id);
      if (data) {
        setTitle(data.title);
        setImage(data.image);
        setContent(data.content);
        setHash(data.hashtag);
        setDate(data.publishDate);
        setWriter("HTC");
      }

      if (isAuthenticated) {
        const docs = await getBookmark();
        setSaved(docs.includes(id));
        setIcon(docs.includes(id) ? "bookmark" : "bookmark-outline");
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu bài viết:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, isAuthenticated]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [id])
  );

  const bookmark = async () => {
    if (!isAuthenticated) {
      // Dialog khi chưa đăng nhập
      setDialogContent({
        title: "Yêu cầu đăng nhập",
        description: "Bạn cần đăng nhập để lưu bài viết.",
        showLogin: true,
      });
      setDialogVisible(true);
      return;
    }

    let newSavedStatus;
    if (!saved) {
      await bookmarked(id);
      newSavedStatus = true;
      // Dialog khi lưu bài viết
      setDialogContent({
        title: "Đã lưu bài viết",
        description: "Bài viết đã được lưu vào mục yêu thích của bạn.",
        showLogin: false,
      });
    } else {
      await unbookmark(id);
      newSavedStatus = false;
      // Dialog khi bỏ lưu bài viết
      setDialogContent({
        title: "Đã bỏ lưu bài viết",
        description: "Bài viết đã được bỏ lưu khỏi mục yêu thích của bạn.",
        showLogin: false,
      });
    }

    setSaved(newSavedStatus);
    setIcon(newSavedStatus ? "bookmark" : "bookmark-outline");
    setDialogVisible(true);

    // Cập nhật trạng thái trên màn hình hiện tại
    navigation.setOptions({
      saved: newSavedStatus,
    });
  };

  useEffect(() => {
    if (hashtag) {  // Chỉ fetch khi hashtag đã được set
      const fetchRelatedPosts = async () => {
        const related = await getRelatedPosts(hashtag, id);
        setRelatedPosts(related);
      };
      fetchRelatedPosts();
    }
  }, [hashtag, id]);  // Lắng nghe khi hashtag hoặc id thay đổi

  const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS== "ios"?40:0,
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
      backgroundColor: theme.modeBG,
    },
    image: {
      marginBottom: 20,
      width: "100%",
      height: 300,
      backgroundColor: "gray",
    },
    title: {
      fontSize: fontSize+4,
      fontFamily: theme.font.bold,
      marginHorizontal: 20,
      color: theme.textColor
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
      fontSize: fontSize-2,
      fontFamily: theme.font.italic,
      color: theme.textColor2
    },
    content: {
      marginHorizontal: 20,
      fontSize: fontSize,
      fontFamily: theme.font.reg,
      lineHeight: 30,
      marginBottom: 20,
      color: theme.textColor,
    },

    relatedSection: {
      marginTop: 30,
      marginHorizontal: 20,
    },
    relatedTitle: {
      fontSize: fontSize + 2,
      fontFamily: theme.font.bold,
      color: theme.textColor,
      marginBottom: 10,
    },
    relatedItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
      gap: 15,
    },
    relatedImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
    },
    relatedText: {
      flex: 1,
      fontSize: fontSize,
      fontFamily: theme.font.reg,
      color: theme.textColor,
    },
    noRelatedText: {
      fontSize: fontSize - 2,
      fontFamily: theme.font.italic,
      color: theme.textColor2,
    },
  });

  
  const share = async() => {
    try{
      const result = await Share.share({
        message:title+".\n\n"+content,
      })
      if(result.action ===Share.sharedAction){
        Alert.alert("Chia sẻ thành công")
      }
      else{
        Alert.alert("Lỗi","Không thể tiến hành chia sẻ bài viết")
      }
    }catch(error){
      
    }
  };

  const handleNavigate = (relatedPost) => {
    const screenName = getScreenNameByCategory(relatedPost.category);  // Lấy tên màn hình theo category
    navigation.navigate(screenName, { id: relatedPost.id });
};

// Hàm xác định màn hình tương ứng dựa trên category
const getScreenNameByCategory = (category) => {
    switch (category) {
        case "Kinh doanh":
            return "BusinessPost";
        case "Thế giới":
            return "WorldPost";
        case "Bất động sản":
          return "RealEstatePost"
        case "Bất động sản":
          return "RealEstatePost"
        case "Khoa học":
          return "SciencePost"
        case "Giải trí":
          return "EntertainmentPost"
        case "Thể thao":
          return "SportPost"
        case "Pháp luật":
          return "LawPost"
        default:
            return "HomePost";  // Mặc định là màn hình HomePost
    }
};

  return (
    <View style={styles.container}>
       {loading ? (
        <ActivityIndicator size="large" color="#800000" />
      ) : (
      <ScrollView ref={scrollRef}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setReading(false);
            navigation.goBack();
          }}
        >
          <MaterialCommunityIcons name="keyboard-backspace" size={30} color="black" />
        </TouchableOpacity>

        <Image style={styles.image} source={image ? { uri: image } : image} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.publishInfoFrame}>
          <Text style={styles.publishInfo}>Người đăng: {publisher}</Text>
          <Text style={styles.publishInfo}>Ngày đăng: {publishDate}</Text>
        </View>

        <View style={styles.publishInfoFrame}>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <TouchableOpacity onPress={() => share()}>
              <MaterialCommunityIcons name="share" size={24} color={theme.color} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => bookmark()}>
            <MaterialCommunityIcons name={iconSaved} size={30} color={saved ? theme.bottomTabIconColor : theme.textColor} />
          </TouchableOpacity>
        </View>
        <Text style={styles.content}>{content}</Text>
        
        <View style={styles.relatedSection}>
        <Text style={styles.relatedTitle}>Bài viết liên quan</Text>
        {relatedPosts.length > 0 ? (
          relatedPosts.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.relatedItem}
              onPress={() => handleNavigate(post)}
            >
              <Image source={{ uri: post.image }} style={styles.relatedImage} />
              <Text numberOfLines={2} style={styles.relatedText}>{post.title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noRelatedText}>Không có bài viết liên quan</Text>
        )}
      </View>
      </ScrollView>
)}
      <TouchableOpacity
        style={styles.upButton}
        onPress={() => {
          scrollRef.current.scrollTo({ offset: 0, animated: true });
        }}
      >
        <MaterialCommunityIcons name="arrow-collapse-up" size={30} color={theme.textColor} />
      </TouchableOpacity>

      {/* Dialog */}
      <Dialog.Container
        style={{ backgroundColor: theme.background, borderRadius: 40 }}
        visible={dialogVisible}
        onBackdropPress={() => setDialogVisible(false)}
      >
        <Dialog.Title style={{ color: '#14375F', fontSize: 20, fontWeight: 'bold' }}>
          {dialogContent.title}
        </Dialog.Title>
        <Dialog.Description style={{ color: '#333', fontSize: 16, textAlign: 'center' }}>
          {dialogContent.description}
        </Dialog.Description>
        <Dialog.Button
          label="Đóng"
          onPress={() => setDialogVisible(false)}
          style={{ backgroundColor: '#f5f5f5', color: '#333', borderRadius: 10, padding: 10 }}
        />
        {dialogContent.showLogin && (
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
        )}
      </Dialog.Container>
    </View>
  );
}

