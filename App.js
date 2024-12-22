import React from "react";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Home from "./screens/main/Home";
import Sport from "./screens/main/Sport";
import SportQT from "./screens/main/SportQT";
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
import Bussiness from "./screens/main/Bussiness"
import { useContext } from "react";
import { SettingProvider, SettingContext } from "./context/SettingContext";
import { UserProvider, UserContext} from "./context/UserContext"; // Import UserProvider
import Setting from "./screens/setting/Setting";
import RealEstate from "./screens/main/RealEstate";
import Science from "./screens/main/Science";
import Entertainment from "./screens/main/Entertainment";
import Law from "./screens/main/Law";
import History from "./screens/profile-opt/History";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  Modal,
  Switch,
  Platform,
} from "react-native";
import PopupSettings from "./screens/setting/PopupSetting";
// Custom Header
const CustomHeader = () => {
  const { fontSize, setFontSize, darkMode, setDarkMode } = useContext(SettingContext); // Lấy giá trị từ SettingContext
  const [isModalVisible, setIsModalVisible] = React.useState(false); // Trạng thái của modal

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible); // Hiện hoặc ẩn modal
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Thay đổi trạng thái dark mode trong context
  };
  return (
    <View style={styles.headerContainer}>
      <StatusBar  />
      <View style={styles.header}>
          <TouchableOpacity onPress={toggleModal}>
              <Icon name="format-size" size={24} color="gray" />
          </TouchableOpacity>
          <Image
              source={require("./assets/logo.png")}
              style={styles.logo}
          />
          <TouchableOpacity>
              <Icon name="bell-outline" size={24} color="gray" />
          </TouchableOpacity>
      </View>
      {/* Hiển thị modal khi isModalVisible là true */}
      <Modal transparent={true} visible={isModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Chèn PopupSettings vào modal */}
            <PopupSettings />
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();
const CustomTabBar = ({state, descriptors, navigation }) =>{
  const { theme } = useContext(SettingContext);
  return(
    <View style={styles.tabRow}>      
      <TouchableOpacity style={styles.homeIcon}>
      <View
        style={{
          width: 40, // Kích thước tổng thể của nền (hình vuông hoặc hình tròn)
          height: 40,
          borderRadius: 30, // Đảm bảo biểu tượng nằm trong nền tròn
          backgroundColor: theme.background, // Màu nền bên ngoài
          justifyContent: "center",
          alignItems: "center", // Căn giữa biểu tượng
        }}
      >
        <Icon name="home" size={24} color={theme.color} />
      </View>
      </TouchableOpacity>
      <ScrollView  
      contentContainerStyle={{ 
        elevation: 0, // Ẩn đổ bóng
        backgroundColor: "transparent",
        shadowOpacity: 0,
        gap:10,
      }} 
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          return (
            <TouchableOpacity
            key={route.key}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              style={{ 
                minWidth: 100, // Đảm bảo tabs không quá rộng
                backgroundColor: "transparent", // Đảm bảo các tab không có hiệu ứng nền
                borderBottomWidth:isFocused?2:0,
                borderBottomColor: isFocused ? theme.color : "transparent",
              }}
            >
              <Text style={{ 
                padding:5,
                fontSize: 16,
                fontFamily: theme.font.bold,
                textAlign: "center", // Căn giữa chữ trong Tab
                whiteSpace: "nowrap",
                color:isFocused?theme.color:theme.inactive
               }}>{label}</Text>
              
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  )
}

function HomeTab() {
  const { theme } = useContext(SettingContext);
  return (
        <Tab.Navigator
        tabBar={props => <CustomTabBar {...props}/>}
        >
          <Tab.Screen name="WorldScreen" component={WorldScreen} options={{ title: "Thế giới" }} />
          <Tab.Screen name="Business" component={Bussiness} options={{ title: "Kinh doanh" }} />
          <Tab.Screen name="RealEstate" component={RealEstate} options={{ title: "Bất động sản" }} />
          <Tab.Screen name="Science" component={Science} options={{ title: "Khoa học" }} />
          <Tab.Screen name="Entertainment" component={Entertainment} options={{ title: "Giải trí" }} />
          <Tab.Screen name="Sport" component={Sport} options={{ title: "Thể thao" }} />
          <Tab.Screen name="Law" component={Law} options={{ title: "Pháp luật" }} />
        </Tab.Navigator>
  );
}


// Profile Stack
// function ProfileScreen() {
//   const { theme } = useContext(SettingContext);
//   const { isAuthenticated } = useContext(UserContext);

//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTitleStyle: { fontSize: 18, fontFamily: theme.font.bold },
//       }}
//     >
//       {isAuthenticated ? (
//         <>
//           <Stack.Screen name="Profile" component={Profile} options={{headerShown:false, title:"Hồ sơ"}}/>
//           <Stack.Screen name="EditAccount" component={Personal} options={{ title: "Thông tin cá nhân" }} />
//           <Stack.Screen name="History" component={History} options={{ title: "Bài viết đã xem" }} />
//           <Stack.Screen name="Bookmark" component={Bookmark} options={{ title: "Bài viết đã lưu" }} />
//         </>
//       ) : (
//         <>
//           <Stack.Screen name="LogIn" component={LogIn} options={{ title: "Đăng nhập/Đăng ký" }} />
//           <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
//           <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}/>
//           <Stack.Screen name="PasswordReset" component={PasswordReset} options={{headerShown:false}}/>
//         </>
//       )}
//       <Stack.Screen name="Setting" component={Setting} options={{ title: "Về chúng tôi" }} />
//       <Stack.Screen name="AboutUs" component={AboutUs} options={{ title: "Về chúng tôi" }} />
//       <Stack.Screen name="Policy" component={Policy} options={{ title: "Chính sách bảo mật" }} />
//     </Stack.Navigator>
//   );
// }

function TrendScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Trend" component={Trend} />
      <Stack.Screen name="TrendPost" component={Post} />
    </Stack.Navigator>
  );
}
function WorldScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="World" component={World} />
      <Stack.Screen name="WorldPost" component={Post} />
    </Stack.Navigator>
  );
}

function ProfileScreen({ navigation, route }) {
  const { theme } = useContext(SettingContext);

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Profile";
    if (routeName !== "Profile") {
      // Ẩn thanh BottomTab khi không phải màn hình chính của Profile
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      // Hiện thanh BottomTab khi ở màn hình chính
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          width: "100%",
          fontSize: 18,
          fontFamily: theme.font.bold,
        },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, title: "Hồ sơ" }}
      />
      <Stack.Screen
        name="Personal"
        component={Personal}
        options={{ title: "Thông tin cá nhân" }}
      />
      <Stack.Screen
        name="YourPost"
        component={YourPost}
        options={{ title: "Bài viết của bạn" }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{ title: "Tạo bài viết" }}
      />
      <Stack.Screen
        name="EditPost"
        component={EditPost}
        options={{ title: "Chỉnh sửa bài viết" }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Đặt BottomTabNavigator bên trong StackNavigator */}
        <Stack.Screen name="Main" component={BottomTabNavigator} />

        {/* Các màn hình không cần BottomTabNavigator */}
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="PasswordReset" component={PasswordReset} />
        <Stack.Screen name="Policy" component={Policy} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Bookmark" component={Bookmark} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// BottomTabNavigator
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
              color={focused ? theme.color : theme.inactive}
            />
          );
        },
        tabBarActiveTintColor: theme.color,
        tabBarInactiveTintColor: theme.inactive,
      })}
    >
      {/* Trang chủ với CustomHeader */}
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeTab}
        options={{
          title: "Trang chủ",
          header: ({ navigation }) => <CustomHeader navigation={navigation} />, // CustomHeader riêng
        }}
      />
      
      {/* Các màn hình khác hiển thị Header mặc định */}
      <BottomTab.Screen
        name="TrendScreen"
        component={TrendScreen}
        options={{
          title: "Xu hướng",
          headerTitle: "Xu hướng", // Tiêu đề mặc định
          headerStyle: { backgroundColor: theme.background }, // Tuỳ chỉnh nền header
          headerTintColor: theme.color, // Màu chữ tiêu đề
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Hồ sơ",
          headerTitle: "Hồ sơ cá nhân", // Tiêu đề mặc định
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.color,
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

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS== "ios"?40:0, // Ensure the header is below the StatusBar
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    elevation: 2,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    height: 50, // Chiều cao cố định cho hàng chứa icon và tabs
  },
  homeIcon: {
    width: 50, // Chiều rộng cố định để giữ bố cục ổn định
    justifyContent: "center",
    alignItems: "center",
  },
  tabsContainer: {
    flex: 1, // Để tabs chiếm phần còn lại của không gian
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
    backgroundColor: "#fff",
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