import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useContext, useState } from "react";
import { SettingContext } from "../../context/SettingContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
export default function EditPost({ id }) {
  const { theme } = useContext(SettingContext);
  //Lấy từ CSDL các thông tin bài viết dựa theo ID
  const [title, setTitle] = useState(
    "You can configure supported styles with the UIUserInterfaceStyle key in your app Info.plist"
  );
  const [image, setImage] = useState("");
  const [content, setContent] = useState(
    `Bài viết này là bài viết mẫu, với mục đích làm mẫu để thiết kết FE, do chưa kết nối CSDL nên chưa có dữ liệu cụ thể cho các bài viết. 
Vải dứa - sản phẩm thương mại từ tơ, sợi dứa của ECOFA lần đầu ra mắt thu hút cộng đồng khởi nghiệp, nhất là những người ủng hộ sản phẩm thời trang xanh.
Tốt nghiệp Đại học Bách khoa Hà Nội, anh Đậu Văn Nam (32 tuổi, Hà Nội) sang Nhật làm việc theo diện phái cử với công việc thiết kế cơ khí, máy móc tại một công ty đối tác của Toyota. Nhưng Đậu Văn Nam lúc nào cũng nung nấu ý định về Việt Nam khởi nghiệp. 
Một lần tình cờ, khi tới một quán bar ở Nhật, Nam được nhân viên pha chế giới thiệu cho rượu Tequila – một loại rượu được làm từ cây họ thùa có nguồn gốc từ Mexico. Anh tìm hiểu sâu hơn thì biết củ của loại cây này được chưng lên thành rượu, còn lá thì được sử dụng để kéo thành sợi. Cơ duyên ấy gợi cho Nam ý tưởng về việc tìm về cây dứa tương tự ở Việt Nam.
Khi biết rằng người Philipines đang sử dụng sợi của cây dứa tương tự dứa Việt Nam để làm quốc phục, anh nhận ra đây là một cơ hội lớn. Bởi lẽ, Việt Nam có lợi thế vùng trồng lớn với diện tích 50.000ha dứa trải dài từ Bắc chí Nam, đặc biệt hiện chưa có dự án nào từng thử nghiệm ứng dụng cây dứa vào sản xuất sợi và các thành phẩm khác.
Trong lĩnh vực sợi, vùng trồng lớn là điều kiện bắt buộc, tầm nhìn của Nam là cải tiến quy trình sản xuất sợi dứa trên quy mô công nghiệp thay vì thủ công, từ đó xuất khẩu ra thế giới.
Nghĩ là làm, Nam nhanh chóng quyết định trở về mảnh đất Ninh Bình để nghiên cứu vùng nguyên liệu dứa.
“Sau khi về thăm vùng nguyên liệu, thấy cuộc sống bà con nơi đây còn bấp bênh, giá cả phụ thuộc vào thương lái, lá dứa bị bỏ đi, bị đốt cùng với túi nilon trong quá trình trồng, rất lãng phí và gây hại cho môi trường, động lực khởi nghiệp trong tôi càng trở nên mạnh mẽ ”, Nam tâm sự.
Mọi thứ từ số 0, họ bắt đầu tách sợi dứa bằng tay lấy mẫu xơ đầu tiên rồi và những ấp ủ về một sản phẩm thuần tự nhiên của người Việt ra đời với những bước đệm từ đó.

11 sản phẩm từ phế phẩm của quá trình sản xuất vải dứa
Ở các vùng trồng dứa, sau khi thu hoạch, lá dứa chỉ là phế phẩm, thường được nông dân phun cỏ cháy rồi đốt đi. Các vùng bằng phẳng hơn như tại Nghệ An, họ dùng máy băm rồi đốt vừa tốn công vừa gây ô nhiễm môi trường.
Làm xong máy tách xơ lá dứa bán tự động đầu tiên với chi phí 150-200 triệu đồng, ECOFA đã nhân bản lên 15 máy rồi phát cho mỗi hộ dân một cái, sau đó thu gom lại sợi. Nhiều bài học được các kỹ sư trẻ vỡ ra, có lúc tưởng như thất bại.
"Khi phát máy cho các hộ dân trồng dứa tự tách xơ, sản lượng rất thấp, lúc 5 lúc 10 cân, không có định mức nào cả. Tính ra chi phí mỗi cân lá dứa lên đến 2.000 đồng", Nam nói về thất bại đầu tiên.
Đầu năm 2022, anh bắt đầu nghiên cứu chiếc máy tách xơ dứa tự động. Tháng 6 năm đó chính thức ra mắt mẫu máy tách xơ tự động ECOFA "một đầu cho lá, một đầu ra xơ".
Ở lần cải tiến máy này, ECOFA thay đổi cách làm. Họ hợp tác với các hợp tác xã mua lá dứa của người dân ở các vùng lân cận, tự tổ chức thu gom đưa lá dứa về sản xuất tập trung tại xưởng.
Hai sự thay đổi này giúp ECOFA vượt qua được thử thách đầu tiên. Mỗi ca làm việc, máy tự động tách xơ cho công suất 200kg, tương đương 10 tấn lá dứa tươi. Giá thu gom giảm còn 800 đồng/kg lá dứa tươi.
Đánh giá về tiềm năng của vải dứa, anh Nam nói nếu khai thác hết vùng nguyên liệu, mỗi năm có thể khai thác 2 triệu tấn lá. Với tỉ lệ sợi 2% sẽ thu được 40.000 tấn xơ lá dứa.
Bên cạnh công nghệ kéo sợi từ lá dứa, công ty còn tập trung nghiên cứu và phát triển các sản phẩm từ phụ phẩm nông nghiệp khác của cây dứa. Điển hình, công ty nghiên cứu quy trình ủ thịt lá dứa trong khi kéo sợi thô thành thức ăn chăn nuôi và phân bón hữu cơ, quy trình thu thập bụi và tạp chất trong bông hóa sợi dứa thành giá thể nuôi nấm… Hiện tại, ECOFA đã sản xuất ra được 11 sản phẩm từ phế phẩm của quá trình sản xuất vải dứa.
Mục tiêu của ECOFA là tạo ra một mô hình kinh tế tuần hoàn cho sản phẩm của mình tận dụng tất cả phụ phẩm nông nghiệp để tạo ra giá trị kinh tế cho chính mình và sinh kế cho nông dân. Không có bất cứ sản phẩm nào trong quá trình mô hình trên là lãng phí.
Với khả năng làm chủ công nghệ đảm bảo được chất lượng và công suất, đội ngũ ECOFA hiểu rằng giờ đây chính là thời điểm để xuất kích - mở rộng vùng trồng để đáp ứng nhu cầu của ngành vải, sợi không chỉ ở Việt Nam mà còn trên thế giới.`
  );
  const [hashtag, setHash] = useState(["Khoa học", "Đời sống", "Xu hướng"]);
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 15,
      marginBottom: 30,
    },
    Fieldtitle: {
      fontFamily: theme.font.bold,
      fontSize: 20,
      margin: 10,
    },
    titleinput: {
      width: "100%",
      height: 80,
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 16,
      fontFamily: theme.font.reg,
      textAlignVertical: "top",
      padding: 10,
    },
    imageinput: {
      width: "100%",
      height: 200,
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: theme.inactive,
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    addImage: {
      color: "#fff",
      fontSize: 30,
      fontFamily: theme.font.bold,
      textAlign: "left",
    },
    contentinput: {
      width: "100%",
      height: 400,
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 16,
      fontFamily: theme.font.reg,
      textAlignVertical: "top",
      padding: 10,
    },
    hashtaginput: {
      width: "70%",
      height: 40,
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 16,
      fontFamily: theme.font.reg,
      textAlignVertical: "top",
      padding: 5,
    },
    hashtagList: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      padding: 10,
      gap: 10,
    },
    hashtagItem: {
      flexDirection: "row",
      width: "auto",
      height: 35,
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: "space-between",
      padding: 5,
      backgroundColor: theme.inactive,
    },
    hashtagText: {
      fontFamily: theme.font.reg,
      fontSize: 16,
    },
    addHash: {
      fontFamily: theme.font.bold,
      fontSize: 20,
    },
  });
  const [newHash, setNewHash] = useState("");
  const addImage = () => {
    //tải hình ảnh từ thiết bị
  };
  const navigation = useNavigation();
  const deletePost = () => {
    Alert.alert(
      "Bạn muốn xóa bài viết này?",
      "Bài viết sẽ bị xóa khỏi hệ thống. Hành động này không thể hoàn tác.",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Hủy xóa bài viết"),
        },
        {
          text: "Đồng ý",
          onPress: () => {
            // update csdl...
            console.log("Xóa bài viết thành công");
            navigation.goBack();
          },
        },
      ]
    );
  };
  const updatePost = () => {
    // update csdl...
    console.log("Cập nhật bài viết thành công");
    navigation.goBack();
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.Fieldtitle}>Tiêu đề bài viết</Text>
        <TextInput
          style={styles.titleinput}
          onChangeText={setTitle}
          value={title}
          placeholder="Nhập tiêu đề bài viết"
          multiline
        />
        <Text style={styles.Fieldtitle}>Hình ảnh bài viết</Text>
        <TouchableOpacity
          style={styles.imageinput}
          onPress={() => {
            addImage();
          }}
        >
          <ImageBackground style={styles.image} source={image}>
            <MaterialCommunityIcons name="plus" size={50} color="#fff" />
            <Text style={styles.addImage}>Thêm hình ảnh</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.Fieldtitle}>Nội dung bài viết</Text>
        <TextInput
          style={styles.contentinput}
          onChangeText={setContent}
          value={content}
          placeholder="Nhập nội dung bài viết"
          multiline
        />
        <Text style={styles.Fieldtitle}>Hashtag bài viết</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TextInput
            style={styles.hashtaginput}
            onChangeText={setNewHash}
            value={newHash}
          />
          <TouchableOpacity
            onPress={() => {
              //thêm hash
              if (newHash != "") {
                hashtag.push(newHash);
                setNewHash("");
              }
            }}
          >
            <Text style={styles.addHash}>Thêm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.hashtagList}>
          {hashtag.map((item) => {
            return (
              <View key={item} style={styles.hashtagItem}>
                <Text style={styles.hashtagText}>{item}</Text>
                <TouchableOpacity
                  onPress={() => {
                    //xóa hash
                    setHash(
                      hashtag.filter((remainHash) => remainHash !== item)
                    );
                  }}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View
          style={{
            height: 50,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              deletePost();
            }}
          >
            <View
              style={{
                borderRadius: 10,
                padding: 10,
                backgroundColor: "#E3737E",
              }}
            >
              <Text style={styles.addHash}>Xóa bài viết</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updatePost();
            }}
          >
            <View
              style={{
                borderRadius: 10,
                padding: 10,
                backgroundColor: theme.color,
              }}
            >
              <Text style={styles.addHash}>Lưu chỉnh sửa</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
