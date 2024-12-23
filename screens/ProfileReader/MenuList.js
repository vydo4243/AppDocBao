// MenuList.js

import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

import { UserContext } from "../../context/UserContext";
import { SettingContext } from "../../context/SettingContext";

function MenuList() {
  const { isAuthenticated, userType, logOut } = useContext(UserContext);
  const { theme } = useContext(SettingContext);
  const navigation = useNavigation();

  const baseMenu = [
    {
      id: 2,
      icon: "settings-outline",
      title: "Cài đặt",
      route: "Setting",
    },
    {
      id: 7,
      icon: "document-text-outline",
      title: "Chính sách & Điều khoản",
      route: "Policy",
    },
    {
      id: 8,
      icon: "information-circle-outline",
      title: "Về chúng tôi",
      route: "AboutUs",
    },
  ];

  const readerMenu = [
    {
      id: 1,
      icon: "person-outline",
      title: "Thông tin cá nhân",
      route: "Personal",
    },
    {
      id: 3,
      icon: "notifications-outline",
      title: "Thông báo",
      route: "Notification",
    },
    {
      id: 5,
      icon: "bookmark-outline",
      title: "Bài viết đã lưu",
      route: "Bookmark",
    },
    {
      id: 6,
      icon: "time-outline",
      title: "Bài viết đã xem",
      route: "History",
    },
    {
      id: 9,
      icon: "log-out-outline",
      title: "Đăng xuất",
      action: "logout",
    },
  ];

  const writerMenu = [
    {
      id: 4,
      icon: "create-outline",
      title: "Bài viết của tôi",
      route: "YourPost",
    },
  ];

  // Tùy chỉnh menu theo userType với thứ tự mong muốn
  const getMenu = () => {
    let menu = [];

    if (!isAuthenticated) {
      menu = baseMenu;
    } else {
      if (userType === "Writer") {
        menu = [...readerMenu, ...writerMenu, ...baseMenu];
      } else {
        menu = [...readerMenu, ...baseMenu];
      }
    }

    // Sắp xếp menu theo id từ nhỏ đến lớn
    menu.sort((a, b) => a.id - b.id);

    return menu;
  };

  const handlePress = (item) => {
    if (item.action === "logout") {
      logOut();
      navigation.replace("Profile");
    } else if (item.route) {
      navigation.navigate(item.route);
    }
  };

  const styles = StyleSheet.create({
    menuContainer: {
      paddingHorizontal: 15,
      gap: 10,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 13,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.cardBackground,
    },
    menuText: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      fontFamily: theme.font.semiBold,
      textAlign: "left",
      color: theme.textColor,
    },
  });

  return (
    <View style={[styles.menuContainer, { backgroundColor: theme.background }]}>
      {getMenu().map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={() => handlePress(item)}
        >
          <Ionicons
            name={item.icon}
            size={30} // Độ lớn của icon là 30
            color={theme.textColor}
          />
          <Text style={styles.menuText}>{item.title}</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={30} // Độ lớn của icon mũi tên cũng có thể đặt là 30 nếu bạn muốn
            color={theme.textColor}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default MenuList;
