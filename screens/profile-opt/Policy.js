import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useContext } from "react";
import { SettingContext } from "../../context/SettingContext";
export default function Policy() {
  const { theme } = useContext(SettingContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 20,
      gap: 10,
    },
    title: {
      fontSize: 20,
      fontFamily: theme.font.bold,
      lineHeight: 32,
      color: "#3CBBAA"
    },
    normal: {
      fontSize: 16,
      fontFamily: theme.font.reg,
      lineHeight: 30,
    },
  });
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>1. Chính sách bảo mật</Text>
      <Text style={styles.normal}>
        Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, chia
        sẻ dữ liệu cá nhân của bạn khi bạn sử dụng các dịch vụ được cung cấp
        trên các trang web và ứng dụng của chúng tôi hoặc tương tác với chúng
        tôi. Dữ liệu cá nhân là bất kỳ thông tin nào về bạn mà bạn có thể được
        nhận dạng hoặc có thể nhận dạng được. Điều này có thể bao gồm các thông
        tin như:{"\n"}* Tên, ngày sinh, địa chỉ email, địa chỉ bưu điện, số điện
        thoại, số điện thoại di động, chi tiết tài chính, chẳng hạn như thẻ
        thanh toán mà bạn sử dụng để mua sản phẩm…{"\n"}* Thông tin về thiết bị
        của bạn (chẳng hạn như địa chỉ IP, là mã số để xác định thiết bị của bạn
        có thể cung cấp thông tin về quốc gia, khu vực hoặc thành phố nơi bạn ở)
        {"\n"}* Thông tin liên quan đến cách bạn sử dụng và tương tác với các
        trang web, ứng dụng và dịch vụ của chúng tôi. Đôi khi các trang web và
        ứng dụng của chúng tôi có thể chứa các liên kết đến các trang web và
        dịch vụ không thuộc nhóm dịch vụ của báo Thanh Niên. Các trang web và
        dịch vụ này có chính sách bảo mật của riêng họ. Nếu bạn nhấp vào liên
        kết đến các trang web và ứng dụng không phải của "Tên App", bạn nên đọc
        chính sách bảo mật được hiển thị trên trang web của họ.
      </Text>
      <Text style={styles.title}>
        2. Các loại dữ liệu cá nhân chúng tôi thu thập về bạn:
      </Text>
      <Text style={styles.normal}>
        Thông tin liên quan đến cách bạn sử dụng và tương tác với các trang web,
        ứng dụng và dịch vụ của chúng tôi. Đôi khi các trang web và ứng dụng của
        chúng tôi có thể chứa các liên kết đến các trang web và dịch vụ không
        thuộc nhóm dịch vụ của "Tên App". Các trang web và dịch vụ này có chính
        sách bảo mật của riêng họ. Nếu bạn nhấp vào liên kết đến các trang web
        và ứng dụng không phải của báo Thanh Niên, bạn nên đọc chính sách bảo
        mật được hiển thị trên trang web của họ.{"\n"}
        Chúng tôi thu thập dữ liệu cá nhân của bạn khi bạn truy cập các trang
        web và ứng dụng của chúng tôi, đăng ký sản phẩm hoặc dịch vụ, đóng góp
        cho báo Thanh Niên hoặc khi bạn tương tác với chúng tôi. Chúng tôi sẽ
        chỉ thu thập dữ liệu cá nhân của bạn theo luật hiện hành. Chúng tôi thu
        thập dữ liệu cá nhân của bạn theo nhiều cách khác nhau:{"\n"}* Trực tiếp
        từ bạn, khi bạn đăng ký dịch vụ của chúng tôi và khi bạn duyệt các trang
        web của chúng tôi hoặc sử dụng các ứng dụng của chúng tôi{"\n"}* Dữ liệu
        cá nhân chúng tôi tạo ra về bạn, ví dụ: dữ liệu cá nhân mà chúng tôi sử
        dụng để xác thực bạn hoặc dữ liệu cá nhân ở dạng địa chỉ IP của bạn hoặc
        tùy chọn của bạn.{"\n"}* Dữ liệu cá nhân mà chúng tôi thu thập từ các
        bên thứ ba, ví dụ: dữ liệu cá nhân giúp chúng tôi chống gian lận hoặc
        chúng tôi thu thập, với sự cho phép của bạn, khi bạn tương tác với các
        tài khoản mạng xã hội của mình.
        {"\n"}
        Khi bạn đăng ký tài khoản trên ứng dụng, chúng tôi thu thập:{"\n"}* Tên
        của bạn{"\n"}* Địa chỉ email của bạn{"\n"}* Các chi tiết khác như địa
        chỉ cư trú hoặc địa chỉ thanh toán của bạn khi bạn đăng ký thành viên{" "}
        {"\n"}* Ảnh của bạn, nếu bạn thêm một bức ảnh vào trang hồ sơ của mình
        {"\n"} Bạn có thể thay đổi các chi tiết này bằng cách sử dụng chức năng
        cài đặt Thông tin cá nhân trong tài khoản của mình.
        {"\n"}
        Dữ liệu cá nhân chúng tôi tạo ra về bạn
        {"\n"}
        Khi bạn đăng ký tài khoản, chúng tôi chỉ định cho bạn một số ID duy nhất
        mà chúng tôi sử dụng để nhận dạng bạn khi bạn đăng nhập vào các dịch vụ
        của chúng tôi. Điều này sẽ nhận ra bạn nếu bạn đăng nhập bằng cùng một
        tài khoản trên một thiết bị mới.
        {"\n"}
        Chúng tôi sẽ không thu thập các danh mục dữ liệu đặc biệt từ bạn - chẳng
        hạn như dữ liệu cá nhân liên quan đến chủng tộc, quan điểm chính trị,
        tôn giáo, sức khỏe hoặc khuynh hướng tình dục của bạn…
        {"\n"}
        Sử dụng mạng xã hội của bạn để đăng nhập vào tài khoản của bạn: Khi bạn
        đăng nhập vào các trang web hoặc ứng dụng của chúng tôi bằng thông tin
        đăng nhập Facebook của bạn, bạn cho phép Facebook chia sẻ với chúng tôi
        địa chỉ email của bạn và một số khía cạnh nhất định của hồ sơ Facebook
        nếu bạn đã công khai những điều này trên hồ sơ Facebook của mình. Điều
        này chỉ bao gồm họ và tên, độ tuổi, liên kết đến hồ sơ Facebook và ảnh
        hồ sơ của bạn. Chúng tôi không có quyền truy cập vào các cập nhật trên
        hồ sơ Facebook của bạn. Nếu bạn sử dụng chi tiết đăng nhập Google của
        mình, bạn cho phép Google chia sẻ dữ liệu cá nhân mà bạn đã công khai
        trong hồ sơ trên Google của mình. Thông tin này chỉ bao gồm họ và tên,
        địa chỉ email của bạn và liệu địa chỉ email của bạn đã được xác thực hay
        chưa, độ tuổi của bạn, liên kết đến hồ sơ trên Google của bạn và nếu có,
        ảnh hồ sơ của bạn. Nếu bạn sử dụng chi tiết đăng nhập Zalo của mình, bạn
        cho phép Zalo chia sẻ dữ liệu cá nhân mà bạn đã công khai trong hồ sơ
        trên Zalo của mình. Thông tin này chỉ bao gồm họ và tên, địa chỉ email
        của bạn và liệu địa chỉ email của bạn đã được xác thực hay chưa, độ tuổi
        của bạn, liên kết đến hồ sơ trên Zalo của bạn và nếu có, ảnh hồ sơ của
        bạn.
        {"\n"}
        Sau đó, chúng tôi sẽ sử dụng dữ liệu cá nhân này để tạo hồ sơ cho tài
        khoản của bạn. Nếu bạn xóa ứng dụng khỏi cài đặt Facebook, hoặc khỏi cài
        đặt Google hoặc Zalo của bạn, chúng tôi sẽ không có quyền truy cập vào
        dữ liệu này nữa. Tuy nhiên, chúng tôi sẽ vẫn có dữ liệu cá nhân mà chúng
        tôi nhận được khi bạn thiết lập tài khoản lần đầu tiên bằng thông tin
        đăng nhập Facebook, Google hoặc Zalo của bạn. Khi bạn công khai (bình
        luận) trên các trang web của chúng tôi Khi bạn bình luận công khai về
        một bài báo trên một trong các trang web của chúng tôi, dữ liệu cá nhân
        bạn đăng, bao gồm tên người dùng và thông tin khác về bản thân, sẽ có
        thể truy cập công khai. Dữ liệu cá nhân này có thể được xem trực tuyến
        và được thu thập bởi những người khác. Chúng tôi không chịu trách nhiệm
        về cách những người khác sử dụng dữ liệu cá nhân này. Khi tham gia vào
        một cuộc thảo luận, chúng tôi đặc biệt khuyên bạn nên tránh chia sẻ bất
        kỳ chi tiết cá nhân nào, bao gồm thông tin có thể được sử dụng để nhận
        dạng trực tiếp bạn như tên, tuổi, địa chỉ... Chúng tôi không chịu trách
        nhiệm về quyền riêng tư của bất kỳ thông tin nhận dạng nào mà bạn đăng
        trong cộng đồng trực tuyến của chúng tôi hoặc các trang công khai khác.
      </Text>
      <Text style={styles.title}>
        3. Cách chúng tôi sử dụng dữ liệu cá nhân của bạn
      </Text>
      <Text style={styles.normal}>
        Chúng tôi chỉ sử dụng dữ liệu cá nhân được thu thập thông qua các trang
        web và ứng dụng của mình khi chúng tôi có lý do chính đáng và cơ sở pháp
        lý để làm như vậy. Chúng tôi xác định các cơ sở pháp lý dựa trên các mục
        đích mà chúng tôi đã thu thập dữ liệu cá nhân của bạn.
      </Text>
      <Text style={styles.title}>4. Cookie và các công nghệ tương tự</Text>
      <Text style={styles.normal}>
        Khi bạn truy cập các trang web của chúng tôi hoặc khi bạn sử dụng các
        ứng dụng của chúng tôi, chúng tôi có thể tự động thu thập dữ liệu cá
        nhân từ bạn bằng cách sử dụng cookie hoặc các công nghệ tương tự. Cookie
        là một tệp nhỏ có thể được đặt trên thiết bị của bạn cho phép chúng tôi
        nhận ra và ghi nhớ bạn. Chúng tôi sử dụng cookie theo nhiều cách để cải
        thiện trải nghiệm của bạn trên trang web của chúng tôi, bao gồm:
        {"\n"}* Giữ cho bạn đăng nhập
        {"\n"}* Hiểu cách bạn sử dụng trang web của chúng tôi
        {"\n"}* Hiển thị cho bạn các nội dung có liên quan đến bạn
        {"\n"}* Hiển thị cho bạn các sản phẩm và dịch vụ phù hợp với bạn
        {"\n"}* Làm việc với các đối tác để cung cấp cho bạn quảng cáo phù hợp
      </Text>
    </ScrollView>
  );
}
