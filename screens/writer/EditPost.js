import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { SettingContext } from "../../context/SettingContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { getPost, deletePost, updatePost, auth } from "../../firebaseConfig";
export default function EditPost({ route }) {
  const {id} = route.params;
  const { theme } = useContext(SettingContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [hashtag, setHash] = useState();
  useEffect(()=>{
    const getData = async()=>{
      const data = await getPost(id);
      if(data){
        setTitle(data.title);
        setImage(data.image);
        setContent(data.content);
        setHash(data.hashtag);
      }
    }
    getData();
  },[])
  
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 15,
      marginBottom: 30,
    },
    Fieldtitle: {
      fontFamily: theme.font.bold,
      fontSize: 20,
      margin: 10,
    },
    titleinput: {
      width: "100%",
      height: 80,
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 16,
      fontFamily: theme.font.reg,
      textAlignVertical: "top",
      padding: 10,
    },
    imageinput: {
      width: 300,
      height: 200,
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: theme.inactive,
      margin :10,
      alignSelf:"center"
    },
    contentinput: {
      width: "100%",
      height: 400,
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 16,
      fontFamily: theme.font.reg,
      textAlignVertical: "top",
      padding: 10,
    },
    hashtaginput: {
      width: "70%",
      height: 40,
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 16,
      fontFamily: theme.font.reg,
      textAlignVertical: "top",
      padding: 5,
    },
    hashtagList: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      padding: 10,
      gap: 10,
    },
    hashtagItem: {
      flexDirection: "row",
      width: "auto",
      height: 35,
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: "space-between",
      padding: 5,
      backgroundColor: theme.inactive,
    },
    hashtagText: {
      fontFamily: theme.font.reg,
      fontSize: 16,
    },
    addHash: {
      fontFamily: theme.font.bold,
      fontSize: 20,
    },
  });
  const [newHash, setNewHash] = useState("");
  const navigation = useNavigation();
  const deleteBv = () => {
    Alert.alert(
      "Bạn muốn xóa bài viết này?",
      "Bài viết sẽ bị xóa khỏi hệ thống. Hành động này không thể hoàn tác.",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Hủy xóa bài viết"),
        },
        {
          text: "Đồng ý",
          onPress: () => {
            deletePost(id).then(()=>{
              console.log("Xóa bài viết thành công");
              navigation.goBack();
            })            
          },
        },
      ]
    );
  };
  const updateBv = async() => {
    var datetime = new Date().toLocaleString();
    console.log("update...")
    await updatePost(id,title,image,content,hashtag,auth.currentUser.uid,datetime);
    console.log("Cập nhật bài viết thành công");
    navigation.goBack();
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.Fieldtitle}>Tiêu đề bài viết</Text>
        <TextInput
          style={styles.titleinput}
          onChangeText={setTitle}
          value={title}
          placeholder="Nhập tiêu đề bài viết"
          multiline
        />

        <Text style={styles.Fieldtitle}>Hình ảnh bài viết</Text>
          <TextInput
            style={styles.titleinput}
            onChangeText={setImage}
            value={image}
            placeholder="Nhập url hình ảnh"
            multiline
          />
          <Image style={styles.imageinput} source={image?{uri:image}:image}/>
        <Text style={styles.Fieldtitle}>Nội dung bài viết</Text>
        <TextInput
          style={styles.contentinput}
          onChangeText={setContent}
          value={content}
          placeholder="Nhập nội dung bài viết"
          multiline
        />
        <Text style={styles.Fieldtitle}>Thể loại bài viết</Text>
          <TextInput
            style={styles.titleinput}
            onChangeText={setHash}
            value={hashtag}
            placeholder="Nhập thể loại bài viết"
            multiline
          />
        <View
          style={{
            height: 50,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              deleteBv();
            }}
          >
            <View
              style={{
                borderRadius: 10,
                padding: 10,
                backgroundColor: "#E3737E",
              }}
            >
              <Text style={styles.addHash}>Xóa bài viết</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateBv();
            }}
          >
            <View
              style={{
                borderRadius: 10,
                padding: 10,
                backgroundColor: theme.color,
              }}
            >
              <Text style={styles.addHash}>Lưu chỉnh sửa</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
