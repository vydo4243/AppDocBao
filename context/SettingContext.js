import React, { createContext, useState, useEffect, useMemo } from "react";
import {
    useFonts,
    IBMPlexSerif_400Regular,
    IBMPlexSerif_400Regular_Italic,
    IBMPlexSerif_700Bold,
    IBMPlexSerif_600SemiBold,
} from '@expo-google-fonts/ibm-plex-serif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, View, ActivityIndicator, Alert } from "react-native";

export const SettingContext = createContext();
console.log(Appearance);
const SETTINGS_KEY = "@app_settings";

export function SettingProvider({ children }) {
  // Trạng thái
  const [reading, setReading] = useState(false); // Người dùng đang xem bài viết?
  const [themeMode, setThemeMode] = useState("system"); // "on", "off", "system"
  const [darkMode, setDarkMode] = useState(false); // Chế độ tối
  const [fontSize, setFontSize] = useState(16); // Kích thước phông chữ mặc định
  const [loadingSettings, setLoadingSettings] = useState(true); // Trạng thái tải cài đặt ban đầu

  let [fontsLoaded] = useFonts({
    IBMPlexSerif_400Regular,
    IBMPlexSerif_400Regular_Italic,
    IBMPlexSerif_600SemiBold,
    IBMPlexSerif_700Bold,
  });

 // Lắng nghe thay đổi hệ thống nếu themeMode là "system"
 useEffect(() => {
  if (themeMode === "system") {
    const colorScheme = Appearance.getColorScheme();
    setDarkMode(colorScheme === "dark");

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === "dark");
    });

    return () => {
      if (subscription) subscription.remove(); // Dọn dẹp lắng nghe
    };
  }
}, [themeMode]);


  // Memo hóa theme để tránh tạo lại đối tượng theme không cần thiết
  const theme = useMemo(() => ({
    font: {
      bold: "IBMPlexSerif_700Bold",
      semiBold: "IBMPlexSerif_600SemiBold",
      reg: "IBMPlexSerif_400Regular",
      italic: "IBMPlexSerif_400Regular_Italic",
    },
    
    // Màu Chính và Màu Phụ
    primary: "#BB86FC", // Màu nhấn cho nút và liên kết
    secondary: "#03DAC6", // Màu phụ cho các yếu tố tương tác khác
    border: darkMode? "#3C3C3C" : "#D9D9D9", // Màu viền và chia cắt
    cardBackground: darkMode ? "#1E1E1E" : "#FFFFFF", // Nền cho các thẻ hoặc hộp chứa
    buttonCard: "rgba(217,217,217,0.24)", 
    overlayBG: darkMode ? "rgba(50, 50, 50, 0.5)" : "rgba(0, 0, 0, 0.5)",
    // Màu Chung
    color: "#800000", // Màu nút và màu header (không thay đổi)
    bg: "#C9858B", // Màu nền (không thay đổi)
    active: "#800000", // Màu nút hoạt động (không thay đổi)
    inactive: darkMode ? "#EAEAEA" : "#B6B0A4", // Màu nút không hoạt động (không thay đổi)
    background: darkMode ? "#121212" : "#F4F3F0", // Nền màn hình
    textColor: darkMode ? "#EAEAEA" : "#131313", // Màu văn bản chính
    textColor2: darkMode ? "#808080" : "#666666", // Màu văn bản phụ
    iconAvt: darkMode ? "#D9D9D9" : "#EAEAEA", // Màu icon avatar
    modeBG: darkMode ? "#767676" : "#D9D9D9",
    buttonSwitch: darkMode ? "#C4C4C4" : "#FFFFFF",
    unread: darkMode ? "#C4C4C4" : "#CACACA",
    textUnRead: darkMode ? "#121212" : "#808080",
    fontSize, // Kích thước font chữ
    borderFocus: darkMode ?"#D9D9D9": "#800000",
    // Màu cho các yếu tố không bị ảnh hưởng bởi theme
    bottomTabIconColor: "#800000", // Màu icon BottomTab cố định
    mainPageIconColor: darkMode ? "#947F4F": "#484132", // Màu header trang chính
  }), [darkMode, fontSize]);

  // Lưu cài đặt vào AsyncStorage
  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({ themeMode, fontSize })
      );
    } catch (error) {
      console.error("Failed to save settings:", error);
      Alert.alert("Lỗi", "Không thể lưu cài đặt. Vui lòng thử lại sau.");
    }
  };

// Tải cài đặt từ AsyncStorage khi khởi tạo ứng dụng
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
        if (savedSettings) {
          const { themeMode, fontSize } = JSON.parse(savedSettings);
          setThemeMode(themeMode || "system");
          setFontSize(fontSize || 16);

          if (themeMode === "on") {
            setDarkMode(true);
          } else if (themeMode === "off") {
            setDarkMode(false);
          } else if (themeMode === "system") {
            const colorScheme = Appearance.getColorScheme();
            setDarkMode(colorScheme === "dark");
          }
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setLoadingSettings(false); // Đánh dấu tải cài đặt hoàn thành
      }
    };
    loadSettings();
  }, []);

 // Lưu cài đặt mỗi khi themeMode hoặc fontSize thay đổi (Debounce)
 useEffect(() => {
  const timeout = setTimeout(() => {
    saveSettings();
  }, 200);  // Giảm thời gian lưu xuống 200ms

  return () => clearTimeout(timeout);
}, [themeMode, fontSize]);


  // Kiểm tra trạng thái tải font và cài đặt
  if (!fontsLoaded || loadingSettings) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#800000" />
      </View>
    );
  }

  return (
    <SettingContext.Provider
      value={{
        theme,
        reading,
        setReading,
        darkMode,
        setDarkMode,
        fontSize,
        setFontSize,
        themeMode,
        setThemeMode,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}