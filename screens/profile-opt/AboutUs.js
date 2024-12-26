import React from 'react';
import { useContext, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SettingContext } from "../../context/SettingContext";

export default function AboutUs() {
    const { theme } = useContext(SettingContext);
    const styles = StyleSheet.create({
        container: {
          flexGrow: 1,
          padding: 20,
          backgroundColor: theme.background,
          alignItems: 'center',
        },
        logo: {
          width: 150,
          height: 120,
          borderRadius: 60,
          resizeMode:"contain"
        },
        title: {
          fontSize: 24,
          fontFamily: theme.font.bold,
          color: theme.textColor,
          textAlign: 'center',
          marginBottom: 16,
        },
        subtitle: {
          fontSize: 20,
          fontFamily: theme.font.semiBold,
          color: theme.textColor,
          marginTop: 20,
          marginBottom: 10,
          textAlign: 'left',
          width: '100%',
          flexWrap: 'wrap',
          alignSelf: 'flex-start',
        },
        subtitle2: {
            fontSize: 20,
            fontFamily: theme.font.semiBold,
            color: '#444',
            marginBottom: 10,
            textAlign: 'left',
            width: '100%',
            flexWrap: 'wrap',
            textAlign: 'center',
          },
        paragraph: {
          fontSize: 16,
          lineHeight: 24,
          fontFamily: theme.font.reg,
          color: theme.textColor2,
          textAlign: 'justify',
          marginBottom: 12,
        },
        highlight: {
          fontFamily:theme.font.bold,
          color: theme.color,
        },
        listItem: {
          fontSize: 16,
          lineHeight: 24,
          fontFamily: theme.font.reg,
          color: theme.textColor2,
          textAlign: 'left',
          alignSelf: 'flex-start',
          marginLeft: 10,
          marginBottom: 4,
        },
        footer: {
          fontSize: 16,
          color: '#666',
          fontFamily: theme.font.reg,
          textAlign: 'center',
          marginTop: 20,
        },
        contactContainer: {
          marginTop: 30,
          padding: 20,
          width: '100%',
          backgroundColor: '#e9f7f6',
          borderRadius: 10,
          alignItems: 'center',
        },
        contactItem: {
          fontFamily: theme.font.reg,
          fontSize: 16,
          color: '#333',
          marginBottom: 8,
          alignItems:'flex-start',
        },
        contactButton: {
          fontFamily: theme.font.semiBold,
          marginTop: 12,
          fontSize: 16,
          color: theme.color,
          fontWeight: '700',
          textDecorationLine: 'underline',
        },
      });
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Giới thiệu về <Text style={styles.highlight}>U&V</Text> </Text>

      <Text style={styles.paragraph}>
        Chào mừng bạn đến với <Text style={styles.highlight}>U&V</Text> – người bạn đồng hành lý tưởng để cập nhật tin tức mọi lúc, mọi nơi! 
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>U&V</Text> được thiết kế nhằm mang đến cho bạn trải nghiệm đọc báo hiện đại, thuận tiện và thú vị. 
        Chúng tôi không chỉ cung cấp các tin tức mới nhất mà còn giúp bạn dễ dàng khám phá các bài viết theo sở thích, từ kinh tế, thể thao, giải trí, đến đời sống thường ngày.
      </Text>

      <Text style={styles.subtitle}>Tại sao chọn chúng tôi?</Text>
      <Text style={styles.listItem}>• Tin tức cập nhật liên tục</Text>
      <Text style={styles.listItem}>• Cá nhân hóa nội dung theo sở thích</Text>
      <Text style={styles.listItem}>• Giao diện thân thiện, dễ sử dụng</Text>
      <Text style={styles.listItem}>• Chế độ đọc tối ưu, bảo vệ mắt</Text>
      <Text style={styles.listItem}>• Thông báo tin nóng, không bỏ lỡ thông tin quan trọng</Text>

      <Text style={styles.subtitle}>Chúng tôi là ai?</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>U&V</Text> là sản phẩm của hai bạn sinh viên Uyên và Vy, được phát triển với tâm huyết mang lại giá trị thông tin và tri thức đến cộng đồng.
      </Text>

      <Text style={styles.footer}>
        Cảm ơn bạn đã lựa chọn <Text style={styles.highlight}>U&V</Text>. 
        Chúng tôi cam kết không ngừng cải tiến để phục vụ bạn tốt hơn mỗi ngày!
      </Text>

    
      {/* Thông tin liên hệ */}
      <View style={styles.contactContainer}>
        <Text style={styles.subtitle2}>Liên hệ với chúng tôi</Text>
        <Text style={styles.contactItem}>📧 Email: support@example.com</Text>
        <Text style={styles.contactItem}>📞 Số điện thoại: +84 123 456 789</Text>
        <Text style={styles.contactItem}>🌐 Website: www.example.com</Text>
        <TouchableOpacity>
          <Text style={styles.contactButton}>Gửi email ngay</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


