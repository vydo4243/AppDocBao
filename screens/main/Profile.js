import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "../../context/UserContext";

const menuItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/97f2cac25e67d3a2606d82d7ba5fba51e9b3988ff3e9aa46277af8b0a3c0434f?placeholderIfAbsent=true&apiKey=ed88ccc76b9841ed868b106d756c46f3",
    title: "Thông tin cá nhân"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/10e037ac944ecbecc557d621dd30886cb63cbd478362be9931394d93681990e6?placeholderIfAbsent=true&apiKey=ed88ccc76b9841ed868b106d756c46f3",
    title: "Thông báo"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/91ab67b800227799852394cdb7a5581247e9da4bb7a002d4e27931a3ee9503af?placeholderIfAbsent=true&apiKey=ed88ccc76b9841ed868b106d756c46f3",
    title: "Bài viết đã lưu"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/814106cd1ed2734b6cb2a450d014ef309e131ee11ce35c0819ad5776dd4a8ed1?placeholderIfAbsent=true&apiKey=ed88ccc76b9841ed868b106d756c46f3",
    title: "Chính sách & Điều khoản"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a67045d7c63de71f57d4fe1851a0468436b8f9918c8aaa502b4437beeeb6f3a?placeholderIfAbsent=true&apiKey=ed88ccc76b9841ed868b106d756c46f3",
    title: "Về chúng tôi"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f6b1a8fec17cbd87c63f2fa2af13a9e36fc032a7efde76b4a8ba00cf4f733eb9?placeholderIfAbsent=true&apiKey=ed88ccc76b9841ed868b106d756c46f3",
    title: "Đăng xuất"
  }
];

function ProfileHeader() {
    const { username } = useContext(UserContext);  // Accessing username from context
    
    return (
      <View style={styles.profileContent}>
        <View style={styles.avatarContainer}>
            <Image
                resizeMode="cover"
                source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/b463d37bf2cb16b4a605772df7c7398fd66a33fb96a9785a3ecf39425b7c3245?placeholderIfAbsent=true&apiKey=ed88ccc76b9841ed868b106d756c46f3"
                }}
                style={styles.avatarImage}
            />
        </View>
        <View style={styles.usernameContainer}>
            <Text style={styles.username}>{username || "Username"}</Text> 
        </View>
      </View>
    );
  }

function ProfileMenuItem({ icon, title, onPress }) {
  const arrowIcon =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/b4392048b56e7df4936fb6d43b5c839b1a37d70311169f5f59e5d6195269cd36?placeholderIfAbsent=true&apiKey=ed88ccc76b9841ed868b106d756c46f3";

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Image resizeMode="contain" source={{ uri: icon }} style={styles.menuIcon} />
      <View style={styles.menuTitle}>
        <Text style={styles.menuText}>{title}</Text>
      </View>
      <Image
        resizeMode="contain"
        source={{ uri: arrowIcon }}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );
}

function ProfileScreen({ logOut }) {
  const navigation = useNavigation();

  const navigationRoutes = {
    "Thông tin cá nhân": "Personal",
    "Thông báo": "Notification",
    "Bài viết đã lưu": "Bookmark",
    "Chính sách & Điều khoản": "Policy",
    "Về chúng tôi": "AboutUs",
  };

  const navigateTo = (item) => {
    if (item.title === "Đăng xuất") {
      logOut();
    } else {
      const route = navigationRoutes[item.title];
      if (route) {
        navigation.navigate(route);
      }
    }
  };

  return (
    <>
      <ProfileHeader />
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <ProfileMenuItem
            key={index}
            icon={item.icon}
            title={item.title}
            onPress={() => navigateTo(item)}
          />
        ))}
      </View>

      <View style={styles.bottomSpacing} />
    </>
  );
}

export default function Profile() {
  const { isAuthenticated } = useContext(UserContext);
  const { logOut } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <ProfileScreen logOut={logOut} />
      ) : (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text>Vui lòng đăng nhập để xem hồ sơ</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingTop:40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
    overflow: "hidden",
  },
  profileContent: {
    gap: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center", 
    width: "100%",  
    paddingLeft: 30,
    paddingRight: 30,
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
    width: "100%",
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
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
    gap: 10,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "#f5f5f5", // Light background for better visibility
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
  },
});
