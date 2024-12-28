import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity, Image, StyleSheet, StatusBar, Modal, Text, Platform, ScrollView } from "react-native";
// Import screens
import Home from "./screens/main/Home";
import Sport from "./screens/main/Sport";
import Trend from "./screens/main/Trend";
import Profile from "./screens/main/Profile";
import Post from "./screens/main/Post";
import LogIn from "./screens/login/LogIn"
import SignUp from "./screens/register/SignUp"
import ForgotPassword from "./screens/login/ForgotPassword"
import PasswordReset from "./screens/login/PasswordReset"
import AboutUs from "./screens/profile-opt/AboutUs"
import Bookmark from "./screens/profile-opt/Bookmark"
import Notification from "./screens/profile-opt/Notification"
import Personal from "./screens/profile-opt/Personal"
import Policy from "./screens/profile-opt/Policy"
import AddPost  from "./screens/writer/AddPost"
import EditPost  from "./screens/writer/EditPost"
import YourPost  from "./screens/writer/YourPost"
import World from "./screens/main/World"
import Business from "./screens/main/Business"
import Setting from "./screens/setting/Setting";
import RealEstate from "./screens/main/RealEstate";
import Science from "./screens/main/Science";
import Entertainment from "./screens/main/Entertainment";
import Law from "./screens/main/Law";
import History from "./screens/profile-opt/History";
import PopupSettings from "./screens/setting/PopupSetting";
import OTPSend from "./screens/login/OTPSend";
import Search from "./screens/main/Search";

// Import context
import { SettingProvider, SettingContext } from "./context/SettingContext";
import { UserProvider, UserContext} from "./context/UserContext"; // Import UserProvider
import Ex from "./screens/setting/Ex";
import PostRSS from "./screens/main/PostRSS";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

// Custom Header
const CustomHeader = () => {
  const { fontSize, setFontSize, darkMode, setDarkMode } = useContext(SettingContext); // Lấy giá trị từ SettingContext
  const [isModalVisible, setIsModalVisible] = React.useState(false); // Trạng thái của modal
  const [isPopupVisible, setPopupVisible] = useState(false);
  const {theme} = useContext(SettingContext)
  const styles = StyleSheet.create({
    headerContainer: {
      paddingTop: Platform.OS== "ios"?40:0, // Ensure the header is below the StatusBar
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: "row",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 60,
      paddingHorizontal: 20,
      paddingVertical:5,
      backgroundColor:  theme.background,
      elevation: 3,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    logo: {
      width: 100,
      height: 55,
      resizeMode: "contain",
    },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: theme.background,
    borderRadius: 10,
  },
  closeButton: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  });
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <StatusBar  />
      <View style={styles.header}>
          <TouchableOpacity onPress={() => setPopupVisible(true)}>
              <Icon name="format-size" size={24} color={theme.textColor2} />
          </TouchableOpacity>
          <Image
              source={require("./assets/logo.png")}
              style={styles.logo}
          />
          <TouchableOpacity onPress={() => {console.log("Navigating to SearchScreen"); navigation.navigate("SearchScreen")}}>
              <Ionicons name="search-sharp" size={24} color={theme.textColor2} />
          </TouchableOpacity>
      </View>
      <Ex visible={isPopupVisible} onClose={() => setPopupVisible(false)} />
    </View>
  );
};

// Custom Header
const CustomHeaderPost = () => {
  const { fontSize, setFontSize, darkMode, setDarkMode } = useContext(SettingContext); // Lấy giá trị từ SettingContext
  const [isModalVisible, setIsModalVisible] = React.useState(false); // Trạng thái của modal
  const [isPopupVisible, setPopupVisible] = useState(false);
  const {theme} = useContext(SettingContext)
  const styles = StyleSheet.create({
    headerContainer: {
      paddingTop: Platform.OS== "ios"?40:0, // Ensure the header is below the StatusBar
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: "row",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 60,
      paddingHorizontal: 20,
      paddingVertical:5,
      backgroundColor:  theme.background,
      elevation: 3,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    logo: {
      width: 100,
      height: 55,
      resizeMode: "contain",
    },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: theme.background,
    borderRadius: 10,
  },
  closeButton: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  });
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <StatusBar  />
      <View style={styles.header}>
          <TouchableOpacity onPress={() => setPopupVisible(true)}>
              <Icon name="format-size" size={24} color={theme.textColor2} />
          </TouchableOpacity>
          <Image
              source={require("./assets/logo.png")}
              style={styles.logo}
          />
          <TouchableOpacity onPress={() => {console.log("Navigating to Search"); navigation.navigate("Search")}}>
              <Ionicons name="search-sharp" size={24} color={theme.textColor2} />
          </TouchableOpacity>
      </View>
      <Ex visible={isPopupVisible} onClose={() => setPopupVisible(false)} />
    </View>
  );
};

const CustomHeader2 = ({ title, theme }) => (
  <View
    style={{
      paddingTop: Platform.OS== "ios"?40:0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:"flex-start",
      backgroundColor: theme.background,
      paddingHorizontal: 10,
      elevation:5,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      gap:5,
    }}
  >
    <Image
      source={require("./assets/logo.png")} // Thay bằng đường dẫn logo của bạn
      style={{ width: 90, height: 60, marginRight: 10 , resizeMode:"cover"}}
    />
    <Text
      style={{
        flexGrow:1,
        fontSize: 20,
        fontFamily: theme.font.bold,
        color: theme.mainPageIconColor,
        textAlign:'left'
      }}
    >
      {title}
    </Text>
  </View>
);

const CustomHeader3 = ({ title, theme }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingTop: Platform.OS== "ios"?40:0,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.background,
        paddingHorizontal: 10,
        elevation: 5,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
        height: Platform.OS== "ios"?"auto":60,
      }}
    >
      <TouchableOpacity
         onPress={() => {
          if (navigation && navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
        style={{ padding: 5 }}
        activeOpacity={0.7} // Reduce the opacity change to make the transition smoother
      >
        <Ionicons
          name="chevron-back-circle-outline"
          size={35}
          color={theme.mainPageIconColor}
        />
      </TouchableOpacity>

      <Text
        style={{
          flex: 1,
          fontSize: 20,
          fontFamily: theme.font.bold ,
          color: theme.mainPageIconColor,
          textAlign: "center",
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </View>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { theme } = useContext(SettingContext);
  const currentRouteName = state.routes[state.index].name;

  const styles = StyleSheet.create({
    tabRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.background,
      paddingHorizontal: 5,
      height: 50,
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
    },
    homeIcon: {
      width: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRightColor: theme.border,
      borderRightWidth: 0.5,
    },
  });

  return (
    <View style={styles.tabRow}>
      {/* Icon Home riêng biệt */}
      <TouchableOpacity
        style={styles.homeIcon}
        onPress={() => navigation.navigate("HomeStack")}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 30,
            backgroundColor:
              currentRouteName === "HomeStack" ? theme.bg : "#EAEAEA",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name="home"
            size={24}
            color={theme.color}
          />
        </View>
      </TouchableOpacity>

      {/* Tabs của MaterialTopTab */}
      <ScrollView
        contentContainerStyle={{
          elevation: 0,
          backgroundColor: theme.background,
          shadowOpacity: 0,
          gap: 10,
          marginLeft:5,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {state.routes
          .filter((route) => route.name !== "HomeStack")  // Loại bỏ HomeStack
          .map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = currentRouteName === route.name;

            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                }}
                style={{
                  minWidth: 100,
                  backgroundColor: "transparent",
                  borderBottomWidth: isFocused ? 2 : 0,
                  borderBottomColor: isFocused
                    ? theme.bottomTabIconColor
                    : "transparent",
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    fontSize: 16,
                    fontFamily: theme.font.bold,
                    textAlign: "center",
                    color: isFocused
                      ? theme.bottomTabIconColor
                      : theme.inactive,
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};


function HomeTab() {
  const { theme } = useContext(SettingContext);
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ tabBarLabel: null }}
      />
      <Tab.Screen name="WorldScreen" component={WorldScreen} options={{ title: "Thế giới" }}/>
      <Tab.Screen name="BusinessScreen" component={BusinessScreen} options={{ title: "Kinh doanh" }} />
      <Tab.Screen name="RealEstateScreen" component={RealEstateScreen} options={{ title: "Bất động sản" }} />
      <Tab.Screen name="ScienceScreen" component={ScienceScreen} options={{ title: "Khoa học" }} />
      <Tab.Screen name="EntertainmentScreen" component={EntertainmentScreen} options={{ title: "Giải trí" }} />
      <Tab.Screen name="SportScreen" component={SportScreen} options={{ title: "Thể thao" }} />
      <Tab.Screen name="LawScreen" component={LawScreen} options={{ title: "Pháp luật" }} />
    </Tab.Navigator>
  );
}

function TrendScreen({ navigation, route }) {
  const { theme } = useContext(SettingContext);

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Trend";
    if (routeName !== "Trend") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      // Cập nhật tabBarStyle theo theme khi quay lại màn hình Trend
      navigation.setOptions({
        tabBarStyle: {
          paddingVertical: 5,
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
      });
    }
  }, [navigation, route, theme]);


  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Trend"
        component={Trend}
        options={{
          header: () => <CustomHeader2 title="Xu hướng" theme={theme} />,
        }}
      />
      {/* Các màn hình khác ẩn header */}
      <Stack.Screen name="PostRSS" component={PostRSS} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function HomeStack({ navigation, route }) {
  const { theme } = useContext(SettingContext);

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    navigation.setOptions({
      tabBarStyle: routeName === "HomePost" 
        ? { display: "none" }
        : {
            paddingVertical: 5,
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
    });
  }, [navigation, route, theme]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomePost" component={Post} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function SearchScreen({ navigation, route }) {
  const { theme } = useContext(SettingContext);

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Search";
    navigation.setOptions({
      tabBarStyle: routeName === "SearchPost"
        ? { display: "none" }
        : {
            paddingVertical: 5,
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
    });
  }, [navigation, route, theme]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} options={{
          header: () => <CustomHeader3 title="Tìm kiếm" theme={theme} />,  // Thêm CustomHeader3
        }}/>
      <Stack.Screen name="SearchPost" component={Post} options={{
          header: () => <CustomHeaderPost title=""  theme={theme} />,  
        }}/>
    </Stack.Navigator>
  );
}

function WorldScreen({ navigation, route }) {
  const { theme } = useContext(SettingContext);

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "World";
    navigation.setOptions({
      tabBarStyle: routeName === "WorldPost"
        ? { display: "none" }
        : {
            paddingVertical: 5,
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
    });
  }, [navigation, route, theme]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="World" component={World} />
      <Stack.Screen name="WorldPost" component={Post} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function BusinessScreen({ navigation, route }) {
  const { theme } = useContext(SettingContext);

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Business";
    navigation.setOptions({
      tabBarStyle: routeName === "BusinessPost"
        ? { display: "none" }
        : {
            paddingVertical: 5,
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
    });
  }, [navigation, route, theme]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Business" component={Business} />
      <Stack.Screen name="BusinessPost" component={Post} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function RealEstateScreen({ navigation, route }) {
  const { theme } = useContext(SettingContext);

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "RealEstate";
    navigation.setOptions({
      tabBarStyle: routeName === "RealEstatePost"
        ? { display: "none" }
        : {
            paddingVertical: 5,
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
    });
  }, [navigation, route, theme]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RealEstate" component={RealEstate} />
      <Stack.Screen name="RealEstatePost" component={Post} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function ScienceScreen({ navigation, route }) {
  const { theme } = useContext(SettingContext);

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Science";
    navigation.setOptions({
      tabBarStyle: routeName === "SciencePost"
        ? { display: "none" }
        : {
            paddingVertical: 5,
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
    });
  }, [navigation, route, theme]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Science" component={Science} />
      <Stack.Screen name="SciencePost" component={Post} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function EntertainmentScreen({ navigation, route }) {
  const { theme } = useContext(SettingContext);

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Entertainment";
    navigation.setOptions({
      tabBarStyle: routeName === "EntertainmentPost"
        ? { display: "none" }
        : {
            paddingVertical: 5,
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
    });
  }, [navigation, route, theme]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Entertainment" component={Entertainment} />
      <Stack.Screen name="EntertainmentPost" component={Post} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function SportScreen({ navigation, route }) {
  const { theme } = useContext(SettingContext);

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Sport";
    navigation.setOptions({
      tabBarStyle: routeName === "SportPost"
        ? { display: "none" }
        : {
            paddingVertical: 5,
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
    });
  }, [navigation, route, theme]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sport" component={Sport} />
      <Stack.Screen name="SportPost" component={Post} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function LawScreen({ navigation, route }) {
  const { theme } = useContext(SettingContext);

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Law";
    navigation.setOptions({
      tabBarStyle: routeName === "LawPost"
        ? { display: "none" }
        : {
            paddingVertical: 5,
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
    });
  }, [navigation, route, theme]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Law" component={Law} />
      <Stack.Screen name="LawPost" component={Post} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function ProfileScreen({ navigation, route }) {
  const { theme } = useContext(SettingContext);

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Profile";
    if (routeName !== "Profile") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      // Cập nhật tabBarStyle theo theme khi quay lại màn hình Trend
      navigation.setOptions({
        tabBarStyle: {
          paddingBottom: 5,
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
      });
    }
  }, [navigation, route, theme]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => <CustomHeader2 title="Hồ sơ" theme={theme} />,
        }}
      />
      {/* Các màn hình khác ẩn header */}
      <Stack.Screen name="Personal" component={Personal}  options={{
          header: () => <CustomHeader3 title="Hồ sơ > Thông tin cá nhân" theme={theme} />,
        }} />
      <Stack.Screen name="YourPost" component={YourPost}  options={{
          header: () => <CustomHeader3 title="Hồ sơ >Bài viết của bạn" theme={theme} />,
        }} />
      <Stack.Screen name="AddPost" component={AddPost}  options={{
          header: () => <CustomHeader3 title="Hồ sơ > Thêm bài viết" theme={theme} />,
        }}  />
      <Stack.Screen name="EditPost" component={EditPost}  options={{
          header: () => <CustomHeader3 title="Hồ sơ > Chỉnh sửa bài viết" theme={theme} />,
        }} />
      <Stack.Screen name="Post" component={Post} options={{ headerShown: false }} />
      <Stack.Screen name="Policy" component={Policy} options={{
          header: () => <CustomHeader3 title="Hồ sơ > Chính sách và điều khoản" theme={theme} />,
        }}/>
      <Stack.Screen name="AboutUs" component={AboutUs} options={{
          header: () => <CustomHeader3 title="Hồ sơ > Về chúng tôi" theme={theme} />,
        }} />
      <Stack.Screen name="Bookmark" component={Bookmark} options={{
          header: () => <CustomHeader3 title="Hồ sơ > Bài viết đã lưu" theme={theme} />,
        }} />
      <Stack.Screen name="Notification" component={Notification} options={{
          header: () => <CustomHeader3 title="Hồ sơ > Thông báo" theme={theme} />,
        }} />
      <Stack.Screen name="Setting" component={Setting} 
        options={{
          header: () => <CustomHeader3 title="Hồ sơ > Cài đặt" theme={theme} />,
        }} />
      <Stack.Screen name="History" component={History} 
      options={{
          header: () => <CustomHeader3 title="Hồ sơ > Bài viết đã xem" theme={theme} />,
        }} />
    </Stack.Navigator>
  );
}


function MainStackNavigator() {
  const { theme } = useContext(SettingContext);
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {/* Đặt BottomTabNavigator bên trong StackNavigator */}
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }}/>
        {/* Các màn hình không cần BottomTabNavigator */}
        <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="OTPSend" component={OTPSend} options={{ headerShown: false }}/>
        <Stack.Screen name="Policy" component={Policy} options={{
          header: () => <CustomHeader3 title="Chính sách và điều khoản" theme={theme} />,
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function BottomTabNavigator() {
  const { theme } = useContext(SettingContext);

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "HomeScreen") iconName = "home";
          else if (route.name === "TrendScreen") iconName = "trending-up";
          else if (route.name === "ProfileScreen") iconName = "account";
          return (
            <MaterialCommunityIcons
              name={iconName}
              size={24}
              color={focused ? theme.bottomTabIconColor : theme.inactive}
            />
          );
        },
        tabBarActiveTintColor: theme.bottomTabIconColor,
        tabBarInactiveTintColor: theme.inactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarStyle: {
          paddingVertical: 5,
          backgroundColor: theme.background,
        },        
      })}
      tabBarOptions={{
        style: {
          paddingVertical: 5,
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
      }}
      
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeTab}
        options={{
          title: "Trang chủ",
          header: ({ navigation }) => <CustomHeader title="Trang chủ" theme={theme} />, // Header tùy chỉnh
        }}
      />
      <BottomTab.Screen
        name="TrendScreen"
        component={TrendScreen}
        options={{
          title: "Xu hướng",
          headerShown: false, // Tắt header TabNavigator
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Hồ sơ",
          headerShown: false, // Tắt header TabNavigator
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <SettingProvider>
      <UserProvider>
        <MainStackNavigator />
      </UserProvider>
    </SettingProvider>
  );
}
