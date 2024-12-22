import { createContext, useState, useEffect } from "react";
import {
    useFonts,
    IBMPlexSerif_400Regular,
    IBMPlexSerif_400Regular_Italic,
    IBMPlexSerif_700Bold,
    IBMPlexSerif_600SemiBold,
  } from '@expo-google-fonts/ibm-plex-serif';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const SettingContext = createContext();

export function SettingProvider({ children }) {
  const [reading, setReading] = useState(false); // Người dùng đang xem bài viết?
  let [fontsLoaded] = useFonts({
    IBMPlexSerif_400Regular,
    IBMPlexSerif_400Regular_Italic,
    IBMPlexSerif_600SemiBold,
    IBMPlexSerif_700Bold,
  });

  const [darkMode, setDarkMode] = useState(false); // Chế độ tối mặc định tắt
  const [fontSize, setFontSize] = useState(16); // Kích thước phông chữ mặc định là 16

  // Tạo theme dựa trên darkMode
  const theme = {
    font: {
      bold: "IBMPlexSerif_700Bold",
      semiBold: "IBMPlexSerif_600SemiBold",
      reg: "IBMPlexSerif_400Regular",
      italic: "IBMPlexSerif_400Regular_Italic",
    },
    color: darkMode ? "#FFFFFF" : "#800000", // Màu chủ đạo
    inactive: darkMode ? "#555555" : "#B6B0A4", // Nút không hoạt động
    background: darkMode ? "#000000" : "#F4F3F0", // Nền
    fontSize, // Kích thước font chữ
  };

  // Lưu cài đặt vào AsyncStorage
  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem(
        "setting",
        JSON.stringify({ darkMode, fontSize })
      );
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  // Nạp cài đặt từ AsyncStorage khi khởi tạo ứng dụng
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem("setting");
        if (savedSettings) {
          const { darkMode, fontSize } = JSON.parse(savedSettings);
          setDarkMode(darkMode);
          setFontSize(fontSize);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };
    loadSettings();
  }, []);

  // Lưu cài đặt mỗi khi thay đổi
  useEffect(() => {
    saveSettings();
  }, [darkMode, fontSize]);

  return (
    <SettingContext.Provider
      value={{ theme, reading, setReading, darkMode, setDarkMode, fontSize, setFontSize }}
    >
      {children}
    </SettingContext.Provider>
  );
}
