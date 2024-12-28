import React, { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SettingContext } from "../../context/SettingContext";

export default function Notification() {
  const { theme, fontSize } = useContext(SettingContext);
  const [notifications, setNotifications] = useState([
    { id: "1", title: "Bài viết mới được đăng", time: "10 phút trước", read: false },
    { id: "2", title: "Cập nhật chính sách quyền riêng tư", time: "2 giờ trước", read: false },
    { id: "3", title: "Tin tức nổi bật hôm nay", time: "Hôm qua", read: true },
  ]);

  // Đánh dấu tất cả là đã đọc
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
    Alert.alert("Thông báo", "Tất cả thông báo đã được đánh dấu là đã đọc.");
  };

  // Đánh dấu thông báo cụ thể là đã đọc
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handlePress = (id, title) => {
    markAsRead(id);
    Alert.alert("Thông báo", `Bạn vừa mở thông báo: ${title}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        { backgroundColor: item.read ? theme.cardBackground : theme.unread  },
      ]}
      onPress={() => handlePress(item.id, item.title)}
    >
      <Ionicons
        name={item.read ? "notifications-outline" : "notifications"}
        size={30}
        color={theme.color}
      />
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            { color: item.read ? theme.textColor : theme.textUnread, fontSize: 18 },
          ]}
        >
          {item.title}
        </Text>
        <Text style={[styles.time, { color: theme.textColor2 }]}>
          {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor:theme.background,
    },
    notificationItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
      elevation: 2,
    },
    textContainer: {
      marginLeft: 15,
      flex: 1,
    },
    title: {
      fontFamily: theme.font.bold
    },
    time: {
      marginTop: 5,
      fontSize: 14,
      corlor: theme.textColor2,
    },
    emptyText: {
      textAlign: "center",
      marginTop: 50,
      fontSize: 18,
      color: theme.textColor2,
    },
    fab: {
      position: "absolute",
      right: 20,
      bottom: 30,
      backgroundColor: "#800000",
      borderRadius: 50,
      paddingVertical: 12,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      elevation: 5,
    },
    fabText: {
      color: "#fff",
      marginLeft: 10,
      fontSize: 16,
      fontFamily: theme.font.bold,
    },
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Không có thông báo</Text>}
      />

      {/* Nút FAB - Đánh dấu tất cả là đã đọc */}
      <TouchableOpacity
        style={styles.fab}
        onPress={markAllAsRead}
      >
        <Ionicons name="checkmark-done" size={28} color="#fff" />
        <Text style={styles.fabText}>Đã đọc tất cả</Text>
      </TouchableOpacity>
    </View>
  );
}

