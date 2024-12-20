import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Thumbnail from "../../component/Thumbnail";
import { useContext } from "react";
import { SettingContext } from "../../context/SettingContext";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function YourPost() {
  const navigation = useNavigation();
  // Lấy id, title, image từ các bài viết mà publisher là id người dùng đưa vào list
  const list = [
    {
      id: 1,
      title:
        "Chủ tiệm tạp hóa ở TPHCM bị đánh tới tấp vì không bán dao lúc rạng sáng",
      image: "https://image.tienphong.vn/w645/Uploaded/2024/qjh-vcobuhviob/2024_12_19/danh-chu-tiem-tap-hoa-5303.jpg",
    },
    {
      id: 2,
      title:
        "Vụ phóng hỏa quán cà phê làm 11 người tử vong: Chuyên gia tội phạm học lên tiếng",
      image: "https://image.tienphong.vn/w645/Uploaded/2024/aohuooh/2024_12_19/f5-529.jpg",
    },
    {
      id: 3,
      title:
        "Kỹ sư cơ khí 'bẻ lái', biến lá dứa thành vải đầu tiên tại Việt Nam",
      image: "https://cdn.tcdulichtphcm.vn/upload/4-2024/images/2024-10-18/1729244893-a1.jpg",
    },
  ];
  const { theme } = useContext(SettingContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    list: {
      paddingBottom: 50,
    },
    error: {
      fontSize: 18,
      marginTop: 50,
    },
    addButton: {
      width: 80,
      height: 80,
      position: "absolute",
      alignSelf: "center",
      bottom: 10,
      backgroundColor: theme.color,
      borderRadius: 50,
      borderWidth: 5,
      borderColor: "#fff",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    editFrame: {
      marginHorizontal: 10,
      backgroundColor: theme.color,
      borderRadius: 10,
      justifyContent: "center",
      alignSelf: "flex-end",
    },
    editButton: {
      fontFamily: theme.font.bold,
      color: "black",
      fontSize: 16,
      textAlign: "center",
      padding: 10,
    },
    watchFrame: {
      marginHorizontal: 10,
      backgroundColor: "#A2E79C",
      borderRadius: 10,
      justifyContent: "center",
      alignSelf: "flex-end",
    },
    item: {
      paddingBottom: 10,
      gap: 5,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {list.length == 0 ? (
          <View style={styles.container}>
            <Text style={styles.error}>Bạn chưa đăng bài viết nào</Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={list}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Thumbnail
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    nav="Post"
                  />
                  <View
                    style={{
                      justifyContent: "space-evenly",
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      style={styles.watchFrame}
                      onPress={() => navigation.navigate("Post", item.id)}
                    >
                      <Text style={styles.editButton}>Xem bài viết</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.editFrame}
                      onPress={() => navigation.navigate("EditPost", item.id)}
                    >
                      <Text style={styles.editButton}>Chỉnh sửa bài viết</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("AddPost")}>
        <View style={styles.addButton}>
          <MaterialCommunityIcons name="plus" size={50} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
