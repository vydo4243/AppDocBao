import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useContext } from "react";

import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";

const menuItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/97f2cac25e67d3a2606d82d7ba5fba51e9b3988ff3e9aa46277af8b0a3c0434f", title: "Thông tin cá nhân" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/10e037ac944ecbecc557d621dd30886cb63cbd478362be9931394d93681990e6", title: "Thông báo" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/91ab67b800227799852394cdb7a5581247e9da4bb7a002d4e27931a3ee9503af", title: "Bài viết đã lưu" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/814106cd1ed2734b6cb2a450d014ef309e131ee11ce35c0819ad5776dd4a8ed1", title: "Chính sách & Điều khoản" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a67045d7c63de71f57d4fe1851a0468436b8f9918c8aaa502b4437beeeb6f3a", title: "Về chúng tôi" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f6b1a8fec17cbd87c63f2fa2af13a9e36fc032a7efde76b4a8ba00cf4f733eb9", title: "Đăng xuất" },
];

function ProfileHeader({ username ,avatar}) {
  return (
    <View style={styles.profileContent}>
      <Image
        resizeMode="cover"
        source={{
          uri: avatar,
        }}
        style={styles.avatarImage}
      />
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{username || "Người dùng"}</Text>
      </View>
    </View>
  );
}

function ProfileMenuItem({ icon, title, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Image source={{ uri: icon }} style={styles.menuIcon} />
      <Text style={styles.menuText}>{title}</Text>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/b4392048b56e7df4936fb6d43b5c839b1a37d70311169f5f59e5d6195269cd36",
        }}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );
}


function ProfileScreen({ logOut, userType, username, avatar }) {
  const navigation = useNavigation();
  
  const enhancedMenuItems = userType === "Writer"
    ? [
        menuItems[0], // "Thông tin cá nhân"
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d799ab0018b4fb8a973c8ba61f24b7f698e73df75548e6ce1628d045e8413113?placeholderIfAbsent=true&apiKey=ed88ccc76b9841ed868b106d756c46f3", title: "Bài viết của tôi" }, // Bài viết của tôi in the second position
        ...menuItems.slice(1), // The rest of the items
      ]
    : menuItems;

  const handleMenuPress = (title) => {
    if (title === "Đăng xuất") {
      logOut();
      navigation.navigate("LogIn");
    } else {
      const routes = {
        "Thông tin cá nhân": "Personal",
        "Thông báo": "Notification",
        "Bài viết đã lưu": "Bookmark",
        "Chính sách & Điều khoản": "Policy",
        "Về chúng tôi": "AboutUs",
        "Bài viết của tôi": "YourPost",
      };
      navigation.navigate(routes[title]);

    }
  };

  return (
    <>

      <ProfileHeader username={username} avatar={avatar}/>
      <View style={styles.menuContainer}>
        {enhancedMenuItems.map((item, index) => (

          <ProfileMenuItem
            key={index}
            icon={item.icon}
            title={item.title}

            onPress={() => handleMenuPress(item.title)}
          />
        ))}
      </View>

    </>
  );
}

export default function Profile() {

  const { isAuthenticated, username, userType, avatar, logOut } = useContext(UserContext);
  const navigation = useNavigation();

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text>Vui lòng </Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("LogIn")} >
          <Text>Đăng nhập</Text>
        </TouchableOpacity>
        <Text> để xem hồ sơ.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProfileScreen logOut={logOut} userType={userType} username={username} avatar={avatar}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
    overflow: "hidden",
  },
  loginContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 20,
  },
  loginButton: {
    backgroundColor: '#73E3D4',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  profileContent: {
    gap: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center", 
    width: "100%",  

    padding: 20,

  },
  avatarContainer: {
    justifyContent: "center", 
  },
  avatarImage: {
    borderRadius: 50,
    width: 90,
    height: 90, // Ensure the avatar has a fixed height and width
    flexShrink: 0,
  },
  usernameContainer: {
    justifyContent: "right",
    paddingLeft: 10,  // Cung cấp một chút khoảng cách giữa avatar và tên
  },
  username: {
    color: "black",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.4,
    flexWrap: "wrap",  // Cho phép username quấn khi quá dài
    textAlign: "left",  // Căn trái để dễ đọc
  },
  menuContainer: {
    display: "flex",

    width: "95%",

    paddingTop: 20,
    paddingBottom: 100,
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "stretch",
  },
  bottomSpacing: {
    alignSelf: "center",
    display: "flex",
    minHeight: 100,
    width: 300,
    maxWidth: "100%",
  },

  menuItem: {
    display: "flex",
    paddingLeft: 30,
    paddingRight: 30,

    padding: 15,

    alignItems: "center",
    gap: 10,
    overflow: "hidden",
    flexDirection: "row",

    backgroundColor: "#f9f9f9",

    borderRadius: 10, // Rounded corners for each menu item
    marginBottom: 10, // Space between menu items
  },
  menuIcon: {
    width: 40,
    height: 40, // Ensure icon is square and properly sized
  },
  menuTitle: {
    width: "70%", // Allow space for the title text
    justifyContent: "center",
  },
  menuText: {
    fontFamily: "IBM Plex Serif, sans-serif",
    fontSize: 18,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "600",
    letterSpacing: -0.4,
  },
  arrowIcon: {
    width: 25,
    height: 25, // Set a fixed size for the arrow icon
    marginLeft: "auto", // Push arrow icon to the right

    tintColor: "#666"
  },

});

