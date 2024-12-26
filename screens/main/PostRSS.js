import React, { useState, useEffect,useRef, useContext, useCallback } from "react";
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
import { useRoute } from "@react-navigation/native";
import { SettingContext } from "../../context/SettingContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Dialog from "react-native-dialog";
import { UserContext } from "../../context/UserContext";
import { getRSSBookmark, getRSSPostById, unbookmarkRSS, bookmarkRSS } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

export default function PostRSS({ route }) {
  const { id , initialSaved} = route.params;  // id = link bài viết
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(initialSaved);
  const [iconSaved, setIcon] = useState(initialSaved ? "bookmark" : "bookmark-outline");
  const { isAuthenticated } = useContext(UserContext);
  const { theme, fontSize, setReading } = useContext(SettingContext);
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
      const fetchedPost = await getRSSPostById(id);
      if (fetchedPost) {
        setPost(fetchedPost);
      } else {
        console.error("Không tìm thấy bài viết");
      }

      if (isAuthenticated) {
        const docs = await getRSSBookmark();
        setSaved(docs.includes(id));
        setIcon(docs.includes(id) ? "bookmark" : "bookmark-outline");
      }
    } catch (error) {
      console.error("Lỗi khi fetch bài viết RSS:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [id])
  );
  
     // Bookmark hoặc Unbookmark bài viết
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
      if (saved) {
          await unbookmarkRSS(id);
          newSavedStatus = false;
          setDialogContent({
              title: "Đã bỏ lưu bài viết",
              description: "Bài viết đã được bỏ lưu khỏi mục yêu thích.",
              showLogin: false,
          });
      } else {
          await bookmarkRSS(id);
          newSavedStatus = true;
          setDialogContent({
              title: "Đã lưu bài viết",
              description: "Bài viết đã được lưu vào mục yêu thích.",
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
  });

  if (!post) {
      return (
          <View style={styles.container}>
              <Text style={styles.title}>Không tìm thấy bài viết</Text>
          </View>
      );
  }

    const share = async() => {
      try{
        const result = await Share.share({
          message:post.title+".\n\n"+post.content,
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

     // Hàm định dạng pubDate
     function formatPubDate(pubDate) {
      try {
          // Tách phần ngày, giờ và múi giờ
          const parts = pubDate.match(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}:\d{2}) \(GMT\+(\d+)\)/);
          
          if (!parts) throw new Error("Invalid pubDate format");
  
          const day = parts[1];
          const month = parts[2];
          const year = parts[3];
          const time = parts[4];
          const gmtOffset = parts[5];
  
          // Định dạng lại thành ISO 8601
          const isoDate = `${year}-${month}-${day}T${time}:00+0${gmtOffset}:00`;
  
          // Parse thành Date object
          const date = new Date(isoDate);
          
          if (isNaN(date.getTime())) throw new Error("Invalid date conversion");
  
          // Định dạng lại theo chuẩn VN
          return date.toLocaleDateString('vi-VN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Asia/Ho_Chi_Minh'
          });
          
      } catch (error) {
          console.error("Lỗi định dạng pubDate:", error);
          return "Không rõ ngày";
      }
  }

  return (
      <View style={styles.container}>
      {loading ? (
      <ActivityIndicator size="large" color="#800000" />
    ) : post ? (
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

      <Image style={styles.image} source={{ uri: post.imageUrl }} />
      <Text style={styles.title}>{post.title}</Text>
      <View style={styles.publishInfoFrame}>
        <Text style={styles.publishInfo}>Tác giả: {post.author}</Text>
        <Text style={styles.publishInfo}>Ngày đăng: {formatPubDate(post.pubDate)}</Text>
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
      <Text style={styles.content}>{post.content}</Text>
    </ScrollView>
 ) : (
  <Text style={styles.title}>Không tìm thấy bài viết</Text>
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

