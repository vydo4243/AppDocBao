import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert,
  } from "react-native";
  import { useContext, useState } from "react";
  import { SettingContext } from "../../context/SettingContext";
  import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
  import { useNavigation } from "@react-navigation/native";
  import { auth,addPost } from "../../firebaseConfig";
  export default function AddPost() {
    const { theme } = useContext(SettingContext);
    //Lấy từ CSDL các thông tin bài viết dựa theo ID
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [hashtag, setHash] = useState();
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
    const [keyword, setKeyword] = useState("");
    const navigation = useNavigation();
    const [loading,setLoading] = useState(false);
    const createPost = async() => {
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      const datetime = dd + '/' + mm + '/' + yyyy;
      setLoading(true);
      console.log("Đang tạo bài viết")
      await addPost(title,image,content,hashtag,auth.currentUser.uid,datetime,keyword);
      console.log("Thêm bài viết thành công");
      setLoading(false);
      navigation.goBack();
    };
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
         <ActivityIndicator style={{ flex: 1 }} size="large" animating={loading}/>
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
          <Text style={styles.Fieldtitle}>Từ khóa bài viết</Text>
          <TextInput
            style={styles.titleinput}
            onChangeText={setKeyword}
            value={keyword}
            placeholder="Nhập từ khóa bài viết"
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
                createPost();
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: theme.color,
                }}
              >
                <Text style={styles.addHash}>Tạo bài viết</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  