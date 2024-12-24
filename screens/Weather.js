import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import * as Location from 'expo-location';
import axios from "axios";
import { SettingContext } from "../context/SettingContext";
import { Ionicons } from '@expo/vector-icons';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [locationName, setLocationName] = useState("Không rõ địa điểm");
    const API_KEY = "90ed8941efeff24b599611b73a2b29a4";

    useEffect(() => {
        getLocation();
    }, []);

    // Lấy tọa độ bằng GPS (chính xác cao nhất)
    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setError("Quyền truy cập vị trí bị từ chối");
            setLoading(false);
            fetchLocationByIP();  // Fallback sang IP nếu bị từ chối quyền
            return;
        }

        try {
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
                timeout: 20000,
            });
            const { latitude, longitude } = location.coords;
            reverseGeocoding(latitude, longitude);  // Gọi Nominatim để lấy tên địa điểm
            fetchWeather(latitude, longitude);  // Gọi API thời tiết
        } catch (error) {
            console.log("Không thể lấy tọa độ bằng GPS:", error);
            fetchLocationByIP();
        }
    };

    // Lấy tọa độ bằng địa chỉ IP
    const fetchLocationByIP = async () => {
        try {
            const response = await axios.get("https://ipapi.co/json/");
            const { latitude, longitude, city } = response.data;
            console.log("Vị trí theo IP:", city, latitude, longitude);
            console.log("Response data:", response.data);
            fetchWeather(latitude, longitude);
            reverseGeocoding(latitude, longitude);  // Lấy địa chỉ từ IP
        } catch (err) {
            console.error("Lỗi lấy tọa độ qua IP:", err);
        }
    };
    // Reverse Geocoding bằng Nominatim (Lấy tên địa điểm)
    const reverseGeocoding = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
                {
                    headers: {
                        "User-Agent": "WeatherApp/1.0 (contact@22521701@gm.uit.edu.vn)",  // Thêm User-Agent hợp lệ
                    },
                }
            );
            const address = response.data.address;
            const city = address.city || address.town || address.village || address.state || "Không rõ địa điểm";
            setLocationName(city);
        } catch (err) {
            console.error("Lỗi khi reverse geocoding:", err);
            setLocationName("Không rõ địa điểm");
        }
    };

    // const fetchLocationName = async (lat, lon) => {
    //     try {
    //         const response = await axios.get(
    //             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyDHdOeEucnzWLsrK0MSL6aNY4GREWvh4M8&language=vi`
    //         );
    //         const address = response.data.results[0].formatted_address;
    //         return address;  // Địa chỉ được trả về dưới dạng tiếng Việt
    //     } catch (err) {
    //         console.error("Lỗi lấy tên địa điểm:", err);
    //         return weather.name;  // Trả về tên địa điểm gốc nếu lỗi
    //     }
    // };
    
    // Fetch dữ liệu thời tiết từ API
    const fetchWeather = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            console.log("Data:",response.data)
            setWeather(response.data);
        } catch (err) {
            console.error("Lỗi tải dữ liệu thời tiết:", err);
            setError("Không thể tải dữ liệu thời tiết");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getLocation();
        const interval = setInterval(() => {
            getLocation();
        }, 900000);  // 15 phút
        return () => clearInterval(interval);
    }, []);

    const {theme, fontSize} = useContext(SettingContext);
    const styles = StyleSheet.create({
        container: {
            justifyContent:"center",
            alignItems: "center",
            padding: 15,
            borderRadius: 10,
            backgroundColor: theme.cardBackground,
            marginBottom: 10,
        },
        title: {
            fontSize: fontSize+6,
            fontFamily: theme.font.bold,
            color: theme.color,
            textAlign:"center"
        },
        location: {
            fontSize: fontSize+2,
            marginTop: 5,
            fontFamily: theme.font.bold,
            color: theme.textColor,
        },
        weatherRow: {
            flexDirection: "row",
            flexShrink:1,
            alignItems: "center",
            marginVertical: 10,
        },
        icon: {
            width: 80,
            height: 80,
            marginRight: 10,
        },
        temp: {
            fontSize: fontSize+13,
            fontFamily: theme.font.bold,
            color: theme.textColor,
        },
        feelsLike: {
            fontSize: fontSize,
            color: theme.textColor2,
            marginLeft: 10,
            fontFamily:theme.font.reg,
        },
        desc: {
            fontSize: fontSize+2,
            fontFamily: theme.font.semiBold,
            color: theme.textColor,
            justifyContent:"flex-start",
            alignSelf:"flex-start",
            fontFamily:theme.font.reg,
        },
        detailContainer:{
            display:"flex",
            flexDirection:"column",
            justifyContent:"flex-start",
            alignSelf:"flex-start",
            alignContent:"flex-start",
            alignItems:"flex-start",

        },
        details: {
            flexDirection: "row",
            display:"flex",
            justifyContent:"space-between",
            alignSelf:"flex-start",
            width: "100%",
            marginTop: 10,

        },
        detailText: {
            paddingHorizontal:5,
            fontSize: fontSize,
            display:"flex",
            flexShrink:1,
            alignContent:"space-between",
            color: theme.textColor2,
            textAlign:"center",
            fontFamily:theme.font.reg,
        },
        text: {
            marginTop: 10,
            fontSize: fontSize,
            color: theme.textColor2,
        },
        errorText: {
            fontSize: 18,
            color: "red",
        },
    });

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#800000" />
                <Text style={styles.text}>Đang tải thời tiết...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }
    const translateDescription = (desc) => {
        const translations = {
            "clear sky": "Trời quang",
            "few clouds": "Ít mây",
            "scattered clouds": "Mây rải rác",
            "broken clouds": "Mây đứt đoạn",
            "overcast clouds": "Mây u ám",
            "shower rain": "Mưa rào",
            "rain": "Mưa",
            "thunderstorm": "Dông bão",
            "snow": "Tuyết",
            "mist": "Sương mù",
            "haze": "Khói mù",
        };
    
        return translations[desc] || desc;  // Nếu không tìm thấy trả về mô tả gốc
    };

    // Object ánh xạ theo mô tả thời tiết
    const weatherIcons = {
        "clear sky": require("../assets/sunny.png"),  // Trời quang
        "few clouds": require("../assets/cloud.png"),    // Ít mây
        "scattered clouds": require("../assets/cloud.png"), // Mây rải rác
        "broken clouds": require("../assets/cloud.png"),  // Mây đứt đoạn
        "overcast clouds": require("../assets/overcast.png"), // Mây u ám
        "shower rain": require("../assets/shower.png"),  // Mưa rào
        "rain": require("../assets/rain.png"),         // Mưa
        "thunderstorm": require("../assets/storm.png"), // Dông
        "snow": require("../assets/snow.png"),         // Tuyết
        "mist": require("../assets/mist.png"),         // Sương
        "haze": require("../assets/mist.png"),         // Sương mù nhẹ
    };

    const getWeatherIcon = (weatherData) => {
        const description = weatherData?.weather[0]?.description || "clear sky";
        return weatherIcons[description] || weatherIcons["clear sky"];
    };
    
    const translatedDesc = translateDescription(weather.weather[0].description);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thời tiết</Text>
            
            {/* Hiển thị địa điểm từ API */}
            <Text style={styles.location}>
                <Ionicons name="location-sharp" size={fontSize+4} color={theme.color} style={{marginRight:10}}/>
                {" "}{locationName}
            </Text>

            <View style={styles.weatherRow}>
               <Image source={getWeatherIcon(weather)} style={styles.icon} />
                <Text style={styles.temp}>{weather.main.temp}°</Text>
                <Text style={styles.feelsLike}>Cảm giác như {weather.main.feels_like}°</Text>
            </View>
            
            <Text style={styles.desc}>{translatedDesc}</Text>
            <View style={styles.detailContainer}>
                <View style={styles.details}>
                    <Text style={styles.detailText}>Cao: {weather.main.temp_max}°</Text>
                    <Text style={styles.detailText}>Thấp: {weather.main.temp_min}°</Text>
                </View>

                <View style={styles.details}>
                    <Text style={styles.detailText}>Độ ẩm: {weather.main.humidity}%</Text>
                    <Text style={styles.detailText}>Mây: {weather.clouds.all}%</Text>
                </View>
            </View>
        </View>
    );
};


export default Weather;
