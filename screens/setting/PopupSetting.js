// PopupSettings.js

import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, Appearance } from "react-native";
import FontSizeSelect from "./FontSizeSelect";
import ThemeToggle from "./ThemeToggle";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { SettingContext } from "../../context/SettingContext";

export default function PopupSettings() {
  const { fontSize, setFontSize, themeMode, setThemeMode, darkMode, setDarkMode, theme } =
    useContext(SettingContext);

  const themeOptions = [
    { label: "Bật", value: "on" },
    { label: "Tắt", value: "off" },
    { label: "Hệ thống*", value: "system" },
  ];

  const handleThemeChange = (value) => {
    setThemeMode(value);
    if (value === "system") {
      const colorScheme = Appearance.getColorScheme();
      setDarkMode(colorScheme === "dark");
    }
  };

  // Các giá trị cỡ chữ cho slider
  const fontSizes = [14, 16, 18, 20, 22, 24, 26, 28];
  const styles = StyleSheet.create({
    settingsContainer: {
      borderRadius: 16,
      paddingHorizontal: 20,
      paddingVertical: 40,
      maxWidth: 408,
      // backgroundColor: "#FFF", // Đã chuyển sang sử dụng theme
    },
    fontSection: {
      width: "100%",
      gap: 9,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
    },
    fontSizeControls: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 15,
      gap: 10,
    },
    /* Khu vực tick marks */
    tickContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
      paddingHorizontal: 10,
    },
    tickWrapper: {
      alignItems: "center",
      width: 250 / 7, // Độ dài slider chia cho số khoảng cách giữa các tick
    },
    tick: {
      width: 8,
      height: 8,
      borderRadius: 4,
      // backgroundColor: "#CCC", // Đã chuyển sang sử dụng theme
    },
    activeTick: {
      // backgroundColor: "#E53935", // Đã chuyển sang sử dụng theme
    },
    tickLabel: {
      fontSize: 10,
      marginTop: 4,
    },
    fontImage: {
      marginTop: 20,
      width: 38,
      height: 38,
    },
    themeSection: {
      marginTop: 24,
    },
    themeHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    themeIcon: {
      width: 16,
      height: 16,
    },
    themeToggleContainer: {
      marginTop: 15,
      flexDirection: "row",
      gap: 8,
      backgroundColor: "#D9D9D9"
    },
    themeDescription: {
      fontSize: 12,
      color: theme.color, // Đã chuyển sang sử dụng theme
      marginTop: 12,
    },
    /* Styles cho MultiSlider */
    markerStyle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      // backgroundColor: "#E53935", // Đã chuyển sang sử dụng theme
      borderWidth: 0,
    },
    trackStyle: {
      height: 4,
      borderRadius: 2,
      // backgroundColor: "#CCCCCC", // Đã chuyển sang sử dụng theme
    },
  });
  return (
    <View style={[styles.settingsContainer, { backgroundColor: theme.popupBackground }]}>
      {/* Phần cỡ chữ */}
      <View style={styles.fontSection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Chọn cỡ chữ</Text>

        <View style={styles.fontSizeControls}>
          {/* Aa nhỏ - luôn 14 */}
          <FontSizeSelect size="Aa" fontSize={14} />

          {/* MultiSlider */}
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <MultiSlider
              values={[fontSize]}
              min={14}
              max={28}
              step={2}
              onValuesChange={(values) => setFontSize(values[0])}
              sliderLength={250} // Bạn có thể điều chỉnh độ dài slider tùy ý
              selectedStyle={{ backgroundColor: theme.sliderSelected }}
              unselectedStyle={{ backgroundColor: theme.sliderUnselected }}
              markerStyle={[styles.markerStyle, { backgroundColor: theme.sliderMarker }]}
              trackStyle={[styles.trackStyle, { backgroundColor: theme.sliderTrack }]}
              snapped
            />

            {/* Tick marks */}
            <View style={styles.tickContainer}>
              {fontSizes.map((size, index) => (
                <View key={index} style={styles.tickWrapper}>
                  <View
                    style={[
                      styles.tick,
                      size === fontSize ? styles.activeTick : null,
                      { backgroundColor: size === fontSize ? theme.activeTick : theme.inactiveTick },
                    ]}
                  />
                  <Text style={[styles.tickLabel, { color: theme.text }]}>
                    {size}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Aa to - luôn 28 */}
          <FontSizeSelect size="Aa" fontSize={28} />
        </View>
      </View>

      {/* Hình minh họa */}
      <Image
        resizeMode="contain"
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1a0ca6bd45ff719c96d047fce1db0e013aa0f7ceb1f39fbc76900e4ce49c0b3a",
        }}
        style={styles.fontImage}
      />

      {/* Phần chế độ nền tối */}
      <View style={styles.themeSection}>
        <View style={styles.themeHeader}>
          <Image
            resizeMode="contain"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/302aee92a05a65ddd006fc43c114b7acd613b191d560a59ff99e977e5c1238d4",
            }}
            style={styles.themeIcon}
          />
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Chế độ nền tối</Text>
        </View>

        <View style={styles.themeToggleContainer}>
          {themeOptions.map((option) => (
            <ThemeToggle
              key={option.value}
              label={option.label}
              isActive={
                (option.value === "on" && darkMode) ||
                (option.value === "off" && !darkMode) ||
                (option.value === "system" && themeMode === "system")
              }
              onPress={() => handleThemeChange(option.value)}
            />
          ))}
        </View>
        <Text style={[styles.themeDescription, { color: theme.inactiveText }]}>
          *Theo hệ thống: Giao diện của ứng dụng sẽ tự đổi theo cài đặt của thiết bị.
        </Text>
      </View>
    </View>
  );
}


