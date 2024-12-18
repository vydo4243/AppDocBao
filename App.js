import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Home from "./screens/main/Home";
import Sport from "./screens/main/Sport";
import Trend from "./screens/main/Trend";
import Profile from "./screens/main/Profile";
import { useContext } from "react";
import { SettingProvider, SettingContext } from "./context/SettingContext";
const Stack = createStackNavigator();
function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
function SportScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sport" component={Sport} />
    </Stack.Navigator>
  );
}
function TrendScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Trend" component={Trend} />
    </Stack.Navigator>
  );
}
function ProfileScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
const Drawer = createDrawerNavigator();
function AppNavigator() {
  const { theme } = useContext(SettingContext);
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: "#ebf1f9",
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
          options={{
            title: "Thể thao",
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="soccer"
                size={24}
                color={focused ? theme.color : theme.inactive}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="TrendScreen"
          component={TrendScreen}
          options={{
            title: "Xu hướng",
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
