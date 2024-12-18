import { createContext, useState, useEffect } from "react";
import {
    useFonts,
    IBMPlexSerif_400Regular,
    IBMPlexSerif_400Regular_Italic,
    IBMPlexSerif_700Bold,
  } from '@expo-google-fonts/ibm-plex-serif';
export const SettingContext = createContext();

export function SettingProvider({ children }) {
  const [reading, setReading] = useState(false); //ng dùng đang xem bài viết?
    let [fontsLoaded] = useFonts({
        IBMPlexSerif_400Regular,
        IBMPlexSerif_400Regular_Italic,
        IBMPlexSerif_700Bold,
    });
    const theme = {
        font:{
            bold: "IBMPlexSerif_700Bold",
            reg : "IBMPlexSerif_400Regular",
            italic: "IBMPlexSerif_400Regular_Italic"
        },
        color: "#73E3D4", //màu chủ đạo
        inactive: "#ccc", //nút không hoạt động
        background: "#D9F6F3" //nền giống màu chủ đạo nhưng nhạt hơn
        //chỉnh màu ở đây
    } 
    

    return (
        <SettingContext.Provider
          value={{ theme, reading, setReading }}
        >
          {children}
        </SettingContext.Provider>
      );
}