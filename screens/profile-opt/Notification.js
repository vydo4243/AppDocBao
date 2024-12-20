import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SettingContext } from "../../context/SettingContext";
import { useContext, useState } from "react";
export default function Notification() {
  //lấy từ csdl (tên, hình ảnh, trạng thái) thông báo từ người dùng
  const [notifList, setList] = useState([
    {
      ten: "Đổi mật khẩu thành công",
      image: "",
      state: "Chưa đọc",
    },
    {
      ten: "Chào mừng bạn đến với AppDocBao của Uyên và Vy :))",
      image: "",
      state: "Đã đọc",
    },
  ]);
  const { theme } = useContext(SettingContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    scroll: {
      width: "100%",
    },
    error: {
      fontSize: 18,
      marginTop: 50,
    },
    buttonFrame: {
      backgroundColor: theme.color,
      padding: 10,
      borderRadius: 25,
      margin: 10,
    },
    buttonText: {
      fontFamily: theme.font.bold,
      fontSize: 18,
    },
    image: {
      width: "30%",
      height: 80,
      backgroundColor: theme.inactive,
    },
    notifName: {
      width: "60%",
      fontFamily: theme.font.bold,
      fontSize: 16,
      flexWrap: "wrap",
      margin: 10,
    },
  });
  const seen = (ten) => {
    setList(
      notifList.map((notif) => {
        if (notif.ten === ten && notif.state == "Chưa đọc") {
          return {
            ...notif,
            state: "Đã đọc",
          };
        } else return notif;
      })
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonFrame}
        onPress={() => {
          setList(
            notifList.map((notif) => {
              if (notif.state == "Chưa đọc") {
                return {
                  ...notif,
                  state: "Đã đọc",
                };
              } else return notif;
            })
          );
        }}
      >
        <Text style={styles.buttonText}>Đánh dấu tất cả là đã đọc</Text>
      </TouchableOpacity>
      {notifList.length == 0 ? (
        <View style={styles.container}>
          <Text style={styles.error}>Bạn không có thông báo nào</Text>
        </View>
      ) : (
        <ScrollView style={styles.scroll}>
          {notifList.map((notif) => {
            return (
              <TouchableOpacity
                key={notif.ten}
                onPress={() => {
                  seen(notif.ten);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                  backgroundColor:
                    notif.state == "Chưa đọc" ? theme.color : theme.background,
                  width: "100%",
                  height: 100,
                  borderBottomWidth: 1,
                }}
              >
                <Image style={styles.image} src={notif.image} />
                <Text style={styles.notifName}>{notif.ten}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
