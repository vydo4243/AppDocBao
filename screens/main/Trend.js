import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Platform, ActivityIndicator } from "react-native";
import Thumbnail from "../../component/Thumbnail";
import { useContext, useState } from "react";
import { SettingContext } from "../../context/SettingContext";
import { getPostBySearchWord } from "../../firebaseConfig";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Dialog from "react-native-dialog"; // Import Dialog

export default function Trend() {
  const [list, setList] = useState([]);
  const [searchWord, setWord] = useState("");
  const { theme } = useContext(SettingContext);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Trạng thái focus của input
  const [dialogVisible, setDialogVisible] = useState(false); // Hiển thị hộp thoại

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingBottom: 20,
      backgroundColor: theme.background,
    },
    searchRow: {
      flexDirection: "row",
      height: 50,
      justifyContent: "space-between",
      marginTop: 10,
      gap: 5,
    },
    searchField: {
      width: "80%",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: isFocused ? theme.borderFocus : theme.border,
      paddingHorizontal: 5,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.cardBackground,
    },
    searchInput: {
      width: "70%",
      fontSize: 16,
      fontFamily: theme.font.italic,
      color: theme.textColor,
    },
    searchButton: {
      borderRadius: 10,
      width: "15%",
      backgroundColor: theme.color,
      justifyContent: "center",
    },
    searchButtonText: {
      color: theme.textColor,
      fontSize: 18,
      fontFamily: theme.font.bold,
      textAlign: "center",
    },
    resetsearchForm: {
      backgroundColor: theme.inactive,
      borderRadius: 50,
    },
    error: {
      fontSize: 18,
      marginTop: 50,
      color: theme.textColor2,
    },
  });

  async function fetchData(searchWord) {
    const posts = await getPostBySearchWord(searchWord);
    setList(posts);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchField}>
          <TextInput
            style={styles.searchInput}
            placeholder="Nhập từ khóa"
            placeholderTextColor={theme.textColor2}
            value={searchWord}
            onChangeText={setWord}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <TouchableOpacity
            style={styles.resetsearchForm}
            onPress={() => {
              setWord("");
            }}
          >
            <MaterialCommunityIcons name="alpha-x" size={24} color={theme.color} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            if (searchWord.trim() === "") {
              setDialogVisible(true); // Hiển thị hộp thoại nếu từ khóa rỗng
              return;
            }
            setLoading(true);
            fetchData(searchWord);
          }}
        >
          <Text style={styles.searchButtonText}>Tìm</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : list.length === 0 ? (
        <Text style={styles.error}>Không có kết quả tìm kiếm</Text>
      ) : (
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <Thumbnail id={item.id} title={item.title} image={item.image} nav="TrendPost" />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* Dialog nhỏ */}
      <Dialog.Container visible={dialogVisible} onBackdropPress={() => setDialogVisible(false)}>
        <Dialog.Title style={{ fontSize: 18, textAlign: "center", fontFamily: theme.font.bold }}>
          Lỗi
        </Dialog.Title>
        <Dialog.Description style={{ fontSize: 16, textAlign: "center", color:"#131313" }}>
          Vui lòng nhập từ khóa tìm kiếm.
        </Dialog.Description>
        <Dialog.Button
          label="Đóng"
          onPress={() => setDialogVisible(false)}
          style={{
            backgroundColor: theme.color,
            color: theme.textColor,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        />
      </Dialog.Container>
    </View>
  );
}
