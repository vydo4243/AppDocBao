import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
import Policy from "./screens/profile-opt/Poilcy"
import AddPost  from "./screens/writer/AddPost"
import EditPost  from "./screens/writer/EditPost"
import YourPost  from "./screens/writer/YourPost"
import { useContext } from "react";
import { SettingProvider, SettingContext } from "./context/SettingContext";
import { UserProvider} from "./context/UserContext"; // Import UserProvider
const Stack = createStackNavigator();
function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomePost" component={Post} />
    </Stack.Navigator>
  );
}
function TTTN(){
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sport" component={Sport} />
      <Stack.Screen name="SportPost" component={Post} />
    </Stack.Navigator>
  );
}
function TTQT(){
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sport2" component={SportQT} />
      <Stack.Screen name="SportPostQT" component={Post} />
    </Stack.Navigator>
  );
}
const Tab = createMaterialTopTabNavigator();
function SportScreen() {
  const { theme, reading } = useContext(SettingContext);
  return (
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle:{
        width:"100%",
        fontSize: 16,
        fontFamily: theme.font.bold},
      tabBarIndicatorStyle:{
        backgroundColor: theme.color,
        height: "100%"
      },
      tabBarStyle:{
        display: reading?"none":"flex"
      }
      }}>
      <Tab.Screen name="SportTN" component={TTTN} options={{title:"Trong nước"}}/>
      <Tab.Screen name="SportQT" component={TTQT} options={{title:"Quốc tế"}} />
    </Tab.Navigator>
  );
}
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
      <Stack.Screen name="Notification" component={Notification} options={{title:"Thông báo"}}/>
      <Stack.Screen name="Personal" component={Personal} options={{title:"Thông tin cá nhân"}}/>
      <Stack.Screen name="Policy" component={Policy} options={{title:"Chính sách & Điều khoản"}}/>
      <Stack.Screen name="YourPost" component={YourPost} options={{title:"Bài viết của bạn"}}/>
      <Stack.Screen name="AddPost" component={AddPost} options={{title:"Tạo bài viết"}}/>
      <Stack.Screen name="EditPost" component={EditPost} options={{title:"Chỉnh sửa bài viết"}}/>
    </Stack.Navigator>
  );
}
const Drawer = createDrawerNavigator();
function AppNavigator() {
  const { theme, reading } = useContext(SettingContext);
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: theme.background,
          drawerActiveTintColor: theme.color,
          drawerInactiveTintColor:theme.inactive,
          drawerLabelStyle: { fontFamily: theme.font.bold, fontSize:13, },
          drawerStyle:{
            width:200,
          },
          drawerItemStyle:{
            borderRadius: 10,
          },
          headerTitleStyle:{
            width:"100%",
            fontSize: 18,
            fontFamily: theme.font.bold,
          }
        }}
      >
        <Drawer.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Trang chủ",
            headerShown: !reading,
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="home"
                size={24}
                color={focused ? theme.color : theme.inactive}
              />
            ),
            
          }}
        />
        <Drawer.Screen
          name="SportScreen"
          component={SportScreen}
          options={({route})=>({
            title: "Thể thao",
            headerShown: !reading,
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="soccer"
                size={24}
                color={focused ? theme.color : theme.inactive}
              />
            ),
          })}
        />
        <Drawer.Screen
          name="TrendScreen"
          component={TrendScreen}
          options={{
            title: "Xu hướng",
            headerShown: !reading,
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="trending-up"
                size={24}
                color={focused ? theme.color : theme.inactive}
              />
            ),
            
          }}
        />
        <Drawer.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={({route})=>({
            title: "Hồ sơ",
            headerShown: getFocusedRouteNameFromRoute(route) == "Profile"||(!getFocusedRouteNameFromRoute(route)),
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="account"
                size={24}
                color={focused ? theme.color : theme.inactive}
              />
            ),
          })}
        />
      </Drawer.Navigator>
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
