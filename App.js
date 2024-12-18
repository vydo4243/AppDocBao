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
import AboutUs from "./screens/profile-opt/AboutUs"
import Bookmark from "./screens/profile-opt/Bookmark"
import Notification from "./screens/profile-opt/Notification"
import Personal from "./screens/profile-opt/Personal"
import Policy from "./screens/profile-opt/Poilcy"
import { useContext } from "react";
import { SettingProvider, SettingContext } from "./context/SettingContext";
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
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="LogIn" component={Profile} />
      <Stack.Screen name="SignUp" component={Profile} />
      <Stack.Screen name="ForgotPassword" component={Profile} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="Bookmark" component={Bookmark} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Personal" component={Personal} />
      <Stack.Screen name="Policy" component={Policy} />
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
            fontSize: 16,
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
          options={{
            title: "Hồ sơ",
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="account"
                size={24}
                color={focused ? theme.color : theme.inactive}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <SettingProvider>
      <AppNavigator />
    </SettingProvider>
  );
}
