import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Appearance,
} from "react-native";
import { SettingContext } from "../../context/SettingContext";
import Slider from "@react-native-community/slider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontSizeSelect from "./FontSizeSelect";
export default function Ex({ visible, onClose }) {
  const {
    theme,
    fontSize,
    setFontSize,
    themeMode,
    setThemeMode,
    setDarkMode,
  } = useContext(SettingContext);

  // Lắng nghe thay đổi hệ thống để cập nhật darkMode khi themeMode là "system"
  useEffect(() => {
    if (themeMode === "system") {
      const colorScheme = Appearance.getColorScheme();
      setDarkMode(colorScheme === "dark");
    }

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === "system") {
        setDarkMode(colorScheme === "dark");
      }
    });

    return () => subscription.remove();
  }, [themeMode]);

  // Xử lý đổi chế độ sáng/tối
  const handleThemeChange = (value) => {
    setThemeMode(value);

    if (value === "system") {
      const colorScheme = Appearance.getColorScheme();
      setDarkMode(colorScheme === "dark");
    } else {
      setDarkMode(value === "on");
    }
  };

  // Đặt lại cài đặt về mặc định
  const resetSettings = () => {
    setFontSize(16);
    setThemeMode("system");
    const colorScheme = Appearance.getColorScheme();
    setDarkMode(colorScheme === "dark");
  };

  // Style
  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.overlayBG,
    },
    popupContainer: {
      width: "90%",
      borderRadius: 15,
      padding: 20,
      backgroundColor: theme.background,
    },
    fontSizeContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    slider: {
      flex: 1,
      marginHorizontal: 10,
    },
    fontSizeText: {
      fontSize: 16,
      fontWeight: "bold",
      marginHorizontal: 10,
      color: theme.textColor,
    },
    themeContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    themeText: {
      fontSize: 16,
      fontFamily:theme.font.bold,
      marginLeft: 10,
      color: theme.textColor,
    },
    themeOptions: {
      flexDirection: "row",
      backgroundColor: theme.modeBG,
      justifyContent: "space-between",
      marginBottom: 20,
      borderRadius: 10,
      padding: 3,
    },
    themeButton: {
      padding: 10,
      flex: 1,
      borderRadius: 10,
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    themeButtonText: {
      fontSize: 14,
      fontWeight: "bold",
    },
    systemInfo: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 20,
      color: theme.textColor2,
    },
    closeButton: {
      alignSelf: "center",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      backgroundColor: "#800000",
    },
    closeButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.popupContainer}>
          {/* Điều chỉnh font size */}
          <View style={styles.fontSizeContainer}>
             <FontSizeSelect size="Aa" fontSize={14} />
            {/* <MaterialCommunityIcons
              name="format-font"
              size={24}
              color={theme.textColor}
            /> */}
            <Slider
              style={styles.slider}
              minimumValue={14}
              maximumValue={30}
              step={2}
              value={fontSize}
              onValueChange={(value) => setFontSize(value)}
              minimumTrackTintColor={theme.color}
              maximumTrackTintColor={theme.textColor2}
              thumbTintColor={theme.textColor}
            />
            <FontSizeSelect size="Aa" fontSize={30} />
            <Text style={styles.fontSizeText}>{fontSize}</Text>
            <TouchableOpacity onPress={resetSettings}>
              <MaterialCommunityIcons
                name="restore"
                size={24}
                color={theme.textColor2}
              />
            </TouchableOpacity>
          </View>

          {/* Điều chỉnh chế độ tối */}
          <View style={styles.themeContainer}>
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={24}
              color={theme.textColor}
            />
            <Text style={styles.themeText}>Chế độ nền tối</Text>
          </View>
          <View style={styles.themeOptions}>
            {["on", "off", "system"].map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.themeButton,
                  themeMode === mode && { backgroundColor: theme.buttonSwitch },
                ]}
                onPress={() => handleThemeChange(mode)}
              >
                <Text
                  style={[
                    styles.themeButtonText,
                    themeMode === mode && { color: "#131313" },
                  ]}
                >
                  {mode === "on" ? "Bật" : mode === "off" ? "Tắt" : "Hệ thống*"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.systemInfo}>
            *Theo hệ thống: Giao diện của ứng dụng sẽ tự đổi theo cài đặt của
            thiết bị.
          </Text>

          {/* Nút đóng */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
