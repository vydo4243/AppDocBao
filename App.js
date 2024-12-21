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
} from "react-native";

// Custom Header
const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
          <TouchableOpacity>
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
    </View>
  );
};

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

function HomeTab() {
  const { theme } = useContext(SettingContext);

  return (
    <View style={{ flex: 1 }}>
      {/* Header với Icon Home và Tabs */}
      <View style={styles.tabRow}>
        {/* Icon Home */}
        <TouchableOpacity style={styles.homeIcon}>
          <Icon name="home" size={24} color={theme.color} />
        </TouchableOpacity>

        {/* Tabs */}
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 14,
              fontFamily: theme.font.bold,
              textAlign: "center", // Căn giữa chữ trong Tab
              whiteSpace: "nowrap",
            },
            tabBarIndicatorStyle: { backgroundColor: theme.color },
            tabBarScrollEnabled: true, // Cho phép cuộn ngang
            tabBarStyle: {
              elevation: 0, // Ẩn đổ bóng
              backgroundColor: "transparent",
              shadowOpacity: 0,
            },
            tabBarItemStyle: {
              maxWidth: 200, // Đảm bảo tabs không quá rộng
              backgroundColor: "transparent", // Đảm bảo các tab không có hiệu ứng nền
            },
          }}
          style={styles.tabsContainer} // Style cho toàn bộ navigator
        >
          <Tab.Screen name="World" component={World} options={{ title: "Thế giới" }} />
          <Tab.Screen name="Business" component={Bussiness} options={{ title: "Kinh doanh" }} />
          <Tab.Screen name="RealEstate" component={RealEstate} options={{ title: "Bất động sản" }} />
          <Tab.Screen name="Science" component={Science} options={{ title: "Khoa học" }} />
          <Tab.Screen name="Entertainment" component={Entertainment} options={{ title: "Giải trí" }} />
          <Tab.Screen name="Sport" component={Sport} options={{ title: "Thể thao" }} />
          <Tab.Screen name="Law" component={Law} options={{ title: "Pháp luật" }} />
        </Tab.Navigator>
      </View>
    </View>
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

function ProfileScreen() {
  const { theme } = useContext(SettingContext);
  return (
    <Stack.Navigator screenOptions={{
      headerTitleStyle:{        
          width:"100%",
          fontSize: 18,
          fontFamily: theme.font.bold,
      }
    }}>
      <Stack.Screen name="Profile" component={Profile} options={{headerShown:false, title:"Hồ sơ"}}/>
      <Stack.Screen name="LogIn" component={LogIn} options={{headerShown:false}}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}/>
      <Stack.Screen name="PasswordReset" component={PasswordReset} options={{headerShown:false}}/>
      <Stack.Screen name="AboutUs" component={AboutUs} options={{title:"Về chúng tôi"}}/>
      <Stack.Screen name="Bookmark" component={Bookmark} options={{title:"Bài viết đã lưu"}}/>
      <Stack.Screen name="History" component={History} options={{ title: "Bài viết đã xem" }} />
      <Stack.Screen name="Notification" component={Notification} options={{title:"Thông báo"}}/>
      <Stack.Screen name="Personal" component={Personal} options={{title:"Thông tin cá nhân"}}/>
      <Stack.Screen name="Policy" component={Policy} options={{title:"Chính sách & Điều khoản"}}/>
      <Stack.Screen name="YourPost" component={YourPost} options={{title:"Bài viết của bạn"}}/>
      <Stack.Screen name="AddPost" component={AddPost} options={{title:"Tạo bài viết"}}/>
      <Stack.Screen name="EditPost" component={EditPost} options={{title:"Chỉnh sửa bài viết"}}/>
      <Stack.Screen name="Post" component={Post} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

// BottomTabNavigator
function AppNavigator() {
  const { theme } = useContext(SettingContext);
  return (
    
    <NavigationContainer>
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
          header: (props) =>
            route.name === "HomeScreen" ? <CustomHeader {...props} /> : undefined, // Chỉ hiển thị CustomHeader ở Home
        })}
      >
        <BottomTab.Screen name="HomeScreen" component={HomeTab} options={{  title: "Trang chủ"}} />
        <BottomTab.Screen name="TrendScreen" component={TrendScreen} options={{ title: "Xu hướng"}} />
        <BottomTab.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: "Hồ sơ" }} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SettingProvider>
      <UserProvider>
      <AppNavigator />
      </UserProvider>
    </SettingProvider>
  );
}

const styles = StyleSheet.create({
  // headerContainer: {
  //   paddingTop: StatusBar.currentHeight, // Ensure the header is below the StatusBar
  //   backgroundColor: '#fff',
  // },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: "#F4F3F0",
    elevation: 2,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "center",
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
});