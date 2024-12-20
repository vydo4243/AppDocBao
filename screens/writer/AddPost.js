import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    Alert,
  } from "react-native";
  import { useContext, useState } from "react";
  import { SettingContext } from "../../context/SettingContext";
  import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
  import { useNavigation } from "@react-navigation/native";
  export default function AddPost({ id }) {
    const { theme } = useContext(SettingContext);
    //Lấy từ CSDL các thông tin bài viết dựa theo ID
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [hashtag, setHash] = useState(["Khoa học", "Đời sống", "Xu hướng"]);
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
        width: "100%",
        height: 200,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: theme.inactive,
      },
      image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      },
      addImage: {
        color: "#fff",
        fontSize: 30,
        fontFamily: theme.font.bold,
        textAlign: "left",
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
    const addImage = () => {
      //tải hình ảnh từ thiết bị
    };
    const navigation = useNavigation();
    const addPost = () => {
      // update csdl...
      console.log("Thêm bài viết thành công");
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
          <TouchableOpacity
            style={styles.imageinput}
            onPress={() => {
              addImage();
            }}
          >
            <ImageBackground style={styles.image} source={image}>
              <MaterialCommunityIcons name="plus" size={50} color="#fff" />
              <Text style={styles.addImage}>Thêm hình ảnh</Text>
            </ImageBackground>
          </TouchableOpacity>
          <Text style={styles.Fieldtitle}>Nội dung bài viết</Text>
          <TextInput
            style={styles.contentinput}
            onChangeText={setContent}
            value={content}
            placeholder="Nhập nội dung bài viết"
            multiline
          />
          <Text style={styles.Fieldtitle}>Hashtag bài viết</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <TextInput
              style={styles.hashtaginput}
              onChangeText={setNewHash}
              value={newHash}
            />
            <TouchableOpacity
              onPress={() => {
                //thêm hash
                if (newHash != "") {
                  hashtag.push(newHash);
                  setNewHash("");
                }
              }}
            >
              <Text style={styles.addHash}>Thêm</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hashtagList}>
            {hashtag.map((item) => {
              return (
                <View key={item} style={styles.hashtagItem}>
                  <Text style={styles.hashtagText}>{item}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      //xóa hash
                      setHash(
                        hashtag.filter((remainHash) => remainHash !== item)
                      );
                    }}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <View
            style={{
              height: 50,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                addPost();
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
  