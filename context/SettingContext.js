import { createContext, useState, useEffect } from "react";
import {
    useFonts,
    IBMPlexSerif_400Regular,
    IBMPlexSerif_400Regular_Italic,
    IBMPlexSerif_700Bold,
  } from '@expo-google-fonts/ibm-plex-serif';
export const SettingContext = createContext();

export function SettingProvider({ children }) {
    let [fontsLoaded] = useFonts({
        IBMPlexSerif_400Regular,
        IBMPlexSerif_400Regular_Italic,
        IBMPlexSerif_700Bold,
    });
    const theme = {
        color: "#14375f",
        font:{
            bold: "IBMPlexSerif_700Bold",
            reg : "IBMPlexSerif_400Regular",
            italic: "IBMPlexSerif_400Regular_Italic"
        },
        inactive: "#ccc",
    } 
    

    return (
        <SettingContext.Provider
          value={{ theme }}
        >
          {children}
        </SettingContext.Provider>
      );
}