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
  const [reading, setReading] = useState(false); //ng dùng đang xem bài viết?
    let [fontsLoaded] = useFonts({
        IBMPlexSerif_400Regular,
        IBMPlexSerif_400Regular_Italic,
        IBMPlexSerif_600SemiBold,
        IBMPlexSerif_700Bold,
    });
    const theme = {
        font:{
            bold: "IBMPlexSerif_700Bold",
            semiBold: "IBMPlexSerif_600SemiBold",
            reg : "IBMPlexSerif_400Regular",
            italic: "IBMPlexSerif_400Regular_Italic"
        },
        color: "#4B3813", //màu chủ đạo
        inactive: "#B6B0A4", //nút không hoạt động
        background: "#6D614B" //nền giống màu chủ đạo nhưng nhạt hơn
        //chỉnh màu ở đây
    } 
    
    const [darkMode, setDarkMode] = useState(false); // Chế độ tối mặc định tắt
    const [fontSize, setFontSize] = useState(16); // Kích thước phông chữ mặc định là 16
  
    // Lưu cài đặt vào AsyncStorage
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem('setting', JSON.stringify({ darkMode, fontSize }));
      } catch (error) {
        console.error('Failed to save settings:', error);
      }
    };
  
    // Nạp cài đặt từ AsyncStorage khi khởi tạo ứng dụng
    useEffect(() => {
      const loadSettings = async () => {
        try {
          const savedSettings = await AsyncStorage.getItem('setting');
          if (savedSettings) {
            const { darkMode, fontSize } = JSON.parse(savedSettings);
            setDarkMode(darkMode);
            setFontSize(fontSize);
          }
        } catch (error) {
          console.error('Failed to load settings:', error);
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
          value={{ theme, reading, setReading }}
        >
          {children}
        </SettingContext.Provider>
      );
}