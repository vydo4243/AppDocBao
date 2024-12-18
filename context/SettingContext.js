import { createContext, useState, useEffect } from "react";

export const SettingContext = createContext();

export function SettingProvider({ children }) {
    const theme = {
        color: "#14375f",
        font : "serif",
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