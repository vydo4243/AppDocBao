import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import FontSizeSelect from "./FontSizeSelect";
import ThemeToggle from "./ThemeToggle";
import Slider from "@react-native-community/slider";

export default function PopupSettings() {
  const themeOptions = [
    { label: "Bật", value: "on" },
    { label: "Tắt", value: "off" },
    { label: "Hệ thống*", value: "system" },
  ];
  const [fontSize, setFontSize] = React.useState(18); // Giá trị cỡ chữ
  const [activeTheme, setActiveTheme] = React.useState("system"); // Giá trị chế độ nền tối

  return (
    <View style={styles.settingsContainer}>
      {/* Phần cỡ chữ */}
      <View style={styles.fontSection}>
        <Text style={styles.sectionTitle}>Chọn cỡ chữ</Text>
        <View style={styles.fontSizeControls}>
          <FontSizeSelect size="Aa" />
          <Slider
            style={styles.slider}
            minimumValue={14}
            maximumValue={28}
            step={2}
            value={fontSize}
            onValueChange={(value) => setFontSize(value)}
            minimumTrackTintColor="#E53935"
            maximumTrackTintColor="#CCCCCC"
            thumbTintColor="#E53935"
          />
          <FontSizeSelect size="Aa" fontSize={fontSize} />
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
          <Text style={styles.sectionTitle}>Chế độ nền tối</Text>
        </View>

        <View style={styles.themeToggleContainer}>
          {themeOptions.map((option) => (
            <ThemeToggle
              key={option.value}
              label={option.label}
              isActive={activeTheme === option.value}
              onPress={() => setActiveTheme(option.value)}
            />
          ))}
        </View>
        <Text style={styles.themeDescription}>
          *Theo hệ thống: Giao diện của ứng dụng sẽ tự đổi theo cài đặt của thiết bị.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 40,
    maxWidth: 408,
  },
  fontSection: {
    width: "100%",
    gap: 9,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  fontSizeControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    gap: 10,
  },
  slider: {
    flex: 1,
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
  },
  themeDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 12,
  },
});
