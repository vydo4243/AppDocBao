import firebase_admin
from firebase_admin import credentials, firestore
import requests
from bs4 import BeautifulSoup
import os
import logging
from datetime import datetime, timedelta, timezone

vietnam_tz = timezone(timedelta(hours=7))

def parse_custom_date(date_string):
    try:
        # Tách các phần từ chuỗi dựa vào dấu phẩy
        parts = date_string.split(', ')
        
        # Nếu có đủ ba phần (Ngày, Ngày tháng năm, Giờ)
        if len(parts) == 3:
            day, date, time = parts
            pub_date = f"{date}, {time}"
        
        # Nếu chỉ có hai phần (Ngày tháng năm, Giờ)
        elif len(parts) == 2:
            date, time = parts
            pub_date = f"{date}, {time}"
        
        # Nếu chỉ có một phần (Trường hợp hiếm gặp)
        else:
            pub_date = parts[0]
        
        return pub_date
    
    except Exception as e:
        # Nếu có lỗi, in lỗi và trả về giá trị mặc định
        print(f"Lỗi định dạng pubDate: {e}")
        return "Không rõ ngày"

# Cấu hình logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Khởi tạo Firebase Admin SDK
cred_path = '../serviceAccountKey.json'  # Thay đổi đường dẫn tới file JSON của bạn
if not os.path.exists(cred_path):
    logging.error(f"Service account key file not found tại {cred_path}")
    exit(1)

cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)
db = firestore.client()

# Hàm tạo và lưu dữ liệu vào Firestore
def makeFastNews(item):
    try:
        # Lưu dữ liệu vào Firestore
        rss_data = {
            'title': item["title"],
            'abstract': item["abstract"],
            'content': item["content"],
            'imageUrl': item["image"],  # Chỉ lưu imageUrl trực tiếp từ nguồn
            'articleUrl': item["link"],
            'pubDate': item["pubDate"],
            'author': item.get("author", "Unknown"),  # Thêm trường tác giả nếu có
            'createdAt': firestore.SERVER_TIMESTAMP
        }
        db.collection('rssPosts').add(rss_data)
        logging.info(f"Đã lưu vào Firestore: '{item['title']}'")
    except Exception as e:
        logging.error(f"Lỗi khi lưu dữ liệu vào Firestore cho '{item['title']}': {e}")

# Hàm crawl dữ liệu từ VnExpress bằng HTML scraping
def crawl_vnexpress():
    base_url = "https://vnexpress.net"
    news_section = "/tin-xem-nhieu"  # Bạn có thể thay đổi mục tin tức cụ thể nếu cần

    target_url = f"{base_url}{news_section}"
    try:
        logging.info(f"Đang crawl trang: {target_url}")
        response = requests.get(target_url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")

        # Tìm tất cả các bài viết trên trang mục tin "tin xem nhiều"
        articles = soup.find_all('article', class_='item-news')

        # Nếu không tìm thấy, thử các selector khác
        if not articles:
            articles = soup.find_all('div', class_='item-news-common')  # Thử thay đổi selector
            logging.warning("Không tìm thấy thẻ <article> với class 'item-news'. Đang thử tìm thẻ <div> với class 'item-news-common'.")

        # Nếu vẫn không tìm thấy, in ra thông báo
        if not articles:
            logging.error("Không tìm thấy bài viết với các selector đã cố định. Vui lòng kiểm tra cấu trúc HTML của trang và cập nhật selector trong script.")
            return

        logging.info(f"Tìm thấy {len(articles)} bài viết trên trang {target_url}.")

        for index, article in enumerate(articles, start=1):
            try:
                # Tìm tiêu đề và liên kết đến bài viết
                title_tag = article.find('h3', class_='title-news')
                if not title_tag:
                    title_tag = article.find('h2', class_='title-news')  # Alternative

                title = title_tag.get_text().strip() if title_tag else ""
                link = title_tag.find('a')['href'] if title_tag and title_tag.find('a') else ""

                # Kiểm tra nếu không có tiêu đề hoặc link, bỏ qua bài viết
                if not title or not link:
                    logging.warning(f"Bài báo không có tiêu đề hoặc link. Bỏ qua bài viết với link: {link}")
                    continue

                # Tìm hình ảnh bên trong div.thumb-art
                thumb_art_div = article.find('div', class_='thumb-art')
                image_url = ""
                if thumb_art_div:
                    # Tìm thẻ <picture>
                    picture_tag = thumb_art_div.find('picture')
                    if picture_tag:
                        # Cách 1: Tìm thẻ <source> và lấy srcset
                        source_tag = picture_tag.find('source')
                        if source_tag and source_tag.get('srcset'):
                            srcset = source_tag['srcset']
                            logging.debug(f"srcset cho bài báo '{title}': {srcset}")
                            # Tách và lấy URL có độ phân giải cao hơn (2x)
                            urls = [s.strip() for s in srcset.split(',')]
                            for u in urls:
                                if '2x' in u:
                                    potential_url = u.split(' ')[0]
                                    if potential_url.startswith('http'):
                                        image_url = potential_url
                                        break
                            # Nếu không tìm thấy 2x hoặc URL không hợp lệ, lấy URL đầu tiên bắt đầu bằng 'http'
                            if not image_url:
                                for u in urls:
                                    potential_url = u.split(' ')[0]
                                    if potential_url.startswith('http'):
                                        image_url = potential_url
                                        break

                        # Cách 2: Nếu không tìm thấy từ <source>, tìm thẻ <img> với itemprop="contentUrl"
                        if not image_url:
                            img_tag = picture_tag.find('img', itemprop='contentUrl')
                            if not img_tag:
                                # Nếu không tìm thấy thẻ <img> với itemprop, tìm thẻ <img> thông thường
                                img_tag = picture_tag.find('img')
                            if img_tag:
                                image_url = img_tag.get('data-src') or img_tag.get('src') or ""
                                logging.debug(f"Đã trích xuất image_url từ <img>: {image_url}")
                    else:
                        # Nếu không tìm thấy thẻ <picture>, tìm thẻ <img> thông thường
                        img_tag = thumb_art_div.find('img')
                        if img_tag:
                            image_url = img_tag.get('data-src') or img_tag.get('src') or ""
                            logging.debug(f"Đã trích xuất image_url từ <img> ngoài <picture>: {image_url}")
                else:
                    # Nếu không tìm thấy div.thumb-art, tìm thẻ <img> trực tiếp trong bài viết
                    img_tag = article.find('img', itemprop='contentUrl')
                    if not img_tag:
                        # Nếu không tìm thấy thẻ <img> với itemprop, tìm thẻ <img> thông thường
                        img_tag = article.find('img')
                    if img_tag:
                        image_url = img_tag.get('data-src') or img_tag.get('src') or ""
                        logging.debug(f"Đã trích xuất image_url từ <img> trực tiếp trong bài viết: {image_url}")

                logging.info(f"Image URL hợp lệ cho bài báo '{title}': {image_url}")

                # Kiểm tra Data URI và xử lý hình ảnh
                if not image_url:
                    logging.warning(f"Bài báo '{title}' không có imageUrl. Bỏ qua bài viết.")
                    continue  # Bỏ qua bài viết nếu không có imageUrl

                # Kiểm tra xem image_url có phải Data URI không
                if image_url.startswith('data:image'):
                    logging.warning(f"Bài báo '{title}' có imageUrl là Data URI. Bỏ qua bài viết.")
                    continue  # Bỏ qua bài viết nếu image_url là Data URI

                # Đảm bảo URL đầy đủ
                if image_url.startswith('//'):
                    image_url = 'https:' + image_url
                elif image_url.startswith('/'):
                    image_url = base_url + image_url
                elif not image_url.startswith('http'):
                    image_url = base_url + '/' + image_url

                # Kiểm tra lại image_url sau khi đã đảm bảo đầy đủ
                if not image_url.startswith('http'):
                    logging.warning(f"Image URL không hợp lệ cho bài báo '{title}': {image_url}. Bỏ qua bài viết.")
                    continue

                 # Truy cập vào bài viết để lấy abstract, location, description, và author
                content = ""
                author = "Unknown"  # Mặc định là Unknown
                try:
                    logging.info(f"Đang truy cập bài viết: {link}")
                    article_response = requests.get(link, timeout=10)
                    article_response.raise_for_status()
                    article_soup = BeautifulSoup(article_response.content, "html.parser")

                    # Trích xuất pubDate từ thẻ span.date hoặc datetime
                    pub_date_tag = article_soup.find('span', class_='date')
                    if pub_date_tag:
                        pub_date_text = pub_date_tag.get_text().strip()
                        pub_date = parse_custom_date(pub_date_text)
                    else:
                        pub_date = parse_custom_date(datetime.now(timezone.utc).isoformat())

                    # Truy cập vào bài viết để lấy abstract và location từ thẻ <p class="description">
                    description_tag = article_soup.find('p', class_='description')
                    abstract = ""
                    location = ""

                    if description_tag:
                        # Tìm thẻ <span class="location-stamp"> bên trong <p class="description">
                        location_tag = description_tag.find('span', class_='location-stamp')
                        
                        # Lấy toàn bộ nội dung thẻ <p class="description">
                        full_text = description_tag.get_text().strip()

                        if location_tag:
                            location = location_tag.get_text().strip()
                            # Lấy phần nội dung còn lại sau khi loại bỏ location
                            abstract = full_text.replace(location, '').strip(' -')
                            # Tạo abstract với location nối bằng gạch ngang
                            abstract = f"{location} - {abstract}" if location else abstract
                        else:
                            # Nếu không có location, lấy toàn bộ nội dung làm abstract
                            abstract = full_text

                        logging.debug(f"Abstract được tạo ra: {abstract}")
                    else:
                        abstract = ""
                        logging.warning("Không tìm thấy thẻ <p class='description'> để trích xuất abstract.")

                    # Lấy nội dung bài viết
                    content_div = article_soup.find('article', class_='fck_detail')
                    if content_div:
                        paragraphs = content_div.find_all('p')
                        # Tìm tất cả các thẻ <p> với style="text-align:right"
                        author_tags = content_div.find_all('p', style=lambda value: value and "text-align:right" in value)

                        if author_tags:
                            # Lấy thẻ <p> cuối cùng trong danh sách
                            author_tag = author_tags[-1]
                            author_text = author_tag.get_text().strip()
                            
                            if "Tác giả:" in author_text:
                                author = author_text.split("Tác giả:")[-1].strip()
                            else:
                                author = author_text
                            
                            logging.debug(f"Đã trích xuất tác giả từ thẻ <p> cuối cùng: {author}")
                            
                            # Lọc bỏ thẻ chứa tác giả khỏi content
                            content = "\n\n".join([p.get_text().strip() for p in paragraphs if p != author_tag])
                        else:
                            # Nếu không tìm thấy thẻ <p> nào có style="text-align:right"
                            if paragraphs:
                                author_tag = paragraphs[-1]
                                author_text = author_tag.get_text().strip()
                                if "Tác giả:" in author_text:
                                    author = author_text.split("Tác giả:")[-1].strip()
                                else:
                                    author = author_text
                                
                                logging.debug(f"Không tìm thấy thẻ <p> với style cụ thể, lấy thẻ <p> cuối cùng làm tác giả: {author}")
                                content = "\n\n".join([p.get_text().strip() for p in paragraphs[:-1]])
                            else:
                                content = ""
                    if not content or not title or not image_url:
                        logging.warning(f"Bỏ qua bài báo '{title}' do thiếu nội dung hoặc ảnh.")
                        continue
                except Exception as e:
                    logging.error(f"Lỗi khi truy cập bài viết {link}: {e}")
                    abstract = ""
                    content = "No Content"

                # Tạo một dict chứa thông tin bài báo
                news_item = {
                    "title": title,
                    "abstract": abstract,
                    "content": content,
                    "image": image_url,
                    "link": link,
                    'pubDate':  pub_date , 
                    "author": author  # Trường author đã được cập nhật
                }

                # Kiểm tra duplicate (bỏ qua nếu đã tồn tại)
                existing_docs = list(db.collection('rssPosts').where('articleUrl', '==', link).stream())
                if len(existing_docs) > 0:
                    logging.info(f"Bài báo '{title}' đã tồn tại trong Firestore. Bỏ qua.")
                    continue

                # Tạo và lưu dữ liệu
                makeFastNews(news_item)

            except Exception as e:
                logging.error(f"Lỗi khi xử lý bài viết {index}: {e}")
    except Exception as e:
        logging.error(f"Lỗi khi crawl trang {target_url}: {e}")

    logging.info("Hoàn thành crawl dữ liệu.")

# Đảm bảo rằng hàm crawl_vnexpress được gọi khi chạy script
if __name__ == "__main__":
    crawl_vnexpress()
