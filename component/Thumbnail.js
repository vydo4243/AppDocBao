import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { SettingContext } from "../context/SettingContext";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const windowWidth = Dimensions.get('window').width;
import { updateHistory } from "../firebaseConfig";

export default function Thumbnail({ id, title, image, hashtag, nav }) {
    const navigation = useNavigation();
    const { theme, setReading, fontSize } = useContext(SettingContext);

    const handleSave = () => {
        console.log("Đã lưu bài viết:", title);
        alert("Đã lưu bài viết!");
    };

    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            width: windowWidth - 10,
            paddingVertical: 10,
            paddingHorizontal:20,
            backgroundColor: theme.cardBackground,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 8,
            borderRadius: 8,
            gap: 15,
            alignSelf: "center",
        },
        image: {
            width: "100%",
            height: 200,
            alignSelf: "center",
            backgroundColor: image ? "transparent" : "#d3d3d3",
            borderRadius: 8,
            resizeMode: "cover",
        },
        title: {
            fontFamily: theme.font.bold,
            fontSize: fontSize + 2,
            color: theme.textColor,
            lineHeight: fontSize + 6,
        },
        footerRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        hashtag: {
            fontFamily: theme.font.regular,
            fontSize: fontSize - 2,
            color: theme.inactive,
        },
        saveButton: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"center",
            alignContent:"center",
            paddingVertical: 5,
        },
        saveButtonText: {
            marginLeft: 5,
            fontFamily: theme.font.bold,
            fontSize: fontSize - 2,
            color: theme.textColor,
        },
    });

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
                if (nav !== "EditPost") setReading(true);
                updateHistory(id).then(() => {
                    navigation.navigate(nav, { id: id });
                });
            }}
        >
            <View style={styles.container}>
                {image ? (
                    <Image style={styles.image} source={{ uri: image }} />
                ) : (
                    <View style={styles.image} />
                )}
                <Text numberOfLines={3} ellipsizeMode="tail" style={styles.title}>
                    {title}
                </Text>

                {/* Footer: Hashtag và Nút Lưu */}
                <View style={styles.footerRow}>
                    <Text style={styles.hashtag}>
                        {hashtag ? hashtag : "Không có"}
                    </Text>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <MaterialCommunityIcons
                            name="bookmark-outline"
                            size={30}
                            color={theme.textColor}
                        />
                        <Text style={styles.saveButtonText}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}
