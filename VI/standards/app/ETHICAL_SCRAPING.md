# Hướng dẫn thu thập dữ liệu có đạo đức cho WhytCard

## Giới thiệu

Thu thập dữ liệu web là cốt lõi của dự án WhytCard, nhưng phải được thực hiện theo cách có đạo đức, có trách nhiệm và hợp pháp. Hướng dẫn này xác định các nguyên tắc và thực hành cần tuân theo để đảm bảo rằng tất cả các hoạt động thu thập dữ liệu đều tôn trọng quyền của chủ sở hữu trang web, luật hiện hành và các tiêu chuẩn đạo đức.

## Mục lục

1. [Nguyên tắc cơ bản](#fundamental-principles)
2. [Các khía cạnh pháp lý](#legal-aspects)
3. [Các biện pháp thực hành kỹ thuật tốt nhất](#technical-best-practices)
4. [Tôn trọng tài nguyên](#resource-respect)
5. [Bảo vệ dữ liệu cá nhân](#personal-data-protection)
6. [Tài liệu và minh bạch](#documentation-and-transparency)
7. [Các trường hợp đặc biệt](#special-cases)
8. [Danh sách kiểm tra thu thập dữ liệu có đạo đức](#ethical-scraping-checklist)

## Nguyên tắc cơ bản

### Triết lý thu thập dữ liệu có đạo đức

Thu thập dữ liệu có đạo đức dựa trên ba nguyên tắc cơ bản:

1. **Tôn trọng**: Tôn trọng chủ sở hữu trang web, các điều khoản sử dụng và tài nguyên của họ
2. **Tỷ lệ**: Chỉ trích xuất dữ liệu cần thiết với tác động tối thiểu
3. **Minh bạch**: Minh bạch về danh tính của bot và ý định thu thập dữ liệu

### Giá trị của WhytCard liên quan đến việc thu thập dữ liệu

Là dự án WhytCard, chúng tôi cam kết:

- Không bao giờ gây hại cho các trang web mà chúng tôi thu thập dữ liệu
- Tuân thủ nghiêm ngặt các quy tắc rõ ràng và ngầm định của các trang web
- Minh bạch về danh tính và mục tiêu của chúng tôi
- Sử dụng dữ liệu một cách có trách nhiệm và phù hợp với sứ mệnh của chúng tôi
- Ưu tiên các API chính thức khi có sẵn

## Các khía cạnh pháp lý

### Khung pháp lý chung

Thu thập dữ liệu web phải tuân theo một số khung pháp lý khác nhau tùy theo quốc gia:

- **Bản quyền**: Nội dung trang web thường được bảo vệ bởi bản quyền
- **Điều khoản sử dụng**: Điều khoản dịch vụ của trang web có thể cấm rõ ràng việc thu thập dữ liệu
- **Bảo vệ dữ liệu**: Các luật như GDPR ở Châu Âu bảo vệ dữ liệu cá nhân
- **Truy cập trái phép**: Một số khu vực pháp lý coi việc truy cập trái phép vào hệ thống máy tính là hành vi phạm tội

### Trường hợp đáng chú ý Luật

Một số quyết định quan trọng của tòa án liên quan đến việc thu thập dữ liệu:

- **hiQ Labs v. LinkedIn** (Hoa Kỳ): Xác định rằng việc thu thập dữ liệu công khai không nhất thiết là bất hợp pháp
- **Ryanair v. PR Aviation** (EU): Xác nhận rằng các điều khoản sử dụng có thể hạn chế việc thu thập dữ liệu theo hợp đồng
- **QVC v. Resultly** (Hoa Kỳ): Nhấn mạnh tầm quan trọng của việc không làm quá tải máy chủ

### Tuân thủ pháp lý đối với WhytCard

Để duy trì tính hợp pháp:

1. **Luôn kiểm tra ToS** trước khi thu thập dữ liệu một trang web
2. **Tôn trọng các thẻ "noindex" và "nofollow"** trong thẻ meta
3. **Không bao giờ né tránh các biện pháp bảo vệ kỹ thuật** (CAPTCHA, giới hạn quyền truy cập)
4. **Ghi lại các hoạt động của bạn** để chứng minh thiện chí
5. **Tham khảo ý kiến luật sư** nếu nghi ngờ về tính hợp pháp của hoạt động thu thập dữ liệu

## Các hoạt động kỹ thuật tốt nhất

### Tôn trọng robots.txt

Tệp robots.txt định nghĩa các quy tắc truy cập cho robots:

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def is_allowed(url, user_agent="WhytCardBot/1.0"): 
"""Kiểm tra xem URL có thể được thu thập theo robots.txt hay không.""" 
rp = RobotFileParser() 
rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt") 
rp.read() 
return rp.can_fetch(user_agent, url) 
``` 

### Nhận dạng đúng 

Luôn sử dụng User-Agent nhận dạng rõ ràng bot của bạn: 

```python
headers = { 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)', 
# Các tiêu đề khác...
} 
``` 

### Độ trễ yêu cầu 

Triển khai độ trễ hợp lý giữa các yêu cầu: 

```python 
import time 
import random 

def polite_request(url, session, min_delay=1, max_delay=3): 
"""Thực hiện yêu cầu với độ trễ lịch sự giữa các yêu cầu.""" 
# Đợi độ trễ ngẫu nhiên 
delay = random.uniform(min_delay, max_delay) 
time.sleep(delay) 

# Thực hiện yêu cầu 
response = session.get(url, headers=headers) 
return response 
``` 

### Xử lý lỗi 

Tôn trọng mã lỗi HTTP và điều chỉnh hành vi của bạn cho phù hợp: 

```python 
async def respect_fetch(url, session): 
"""Lấy URL theo cách tôn trọng cách thức.""" 
thử: 
không đồng bộ với session.get(url, headers=headers) làm phản hồi: 
nếu response.status == 200: 
trả về chờ response.text() 
elif response.status == 429: # Quá nhiều yêu cầu 
# Đợi lâu hơn trước khi thử lại 
wait_time = int(response.headers.get('Retry-After', 60)) 
logger.info(f"Tốc độ có giới hạn, chờ {wait_time} giây") 
await asyncio.sleep(wait_time) 
trả về chờ respect_fetch(url, session) 
elif response.status trong (403, 404): 
# Không thử lại lỗi 403/404 
logger.warning(f"Truy cập bị từ chối hoặc không tìm thấy: {url}") 
trả về Không có 
else: 
# Đợi và thử lại các lỗi khác 
logger.warning(f"Lỗi {response.status} cho {url}, thử lại sau 5 giây") 
await asyncio.sleep(5) 
return await respect_fetch(url, session) 
except Exception as e: 
logger.error(f"Exception while fetching {url}: {str(e)}") 
return None 
``` 

## Resource Respect 

### Rate Limiting 

Điều chỉnh tốc độ yêu cầu của bạn theo kích thước và tài nguyên của trang web mục tiêu: 

- **Các trang web thương mại lớn**: 1 yêu cầu sau mỗi 1-3 giây
- **Các trang web vừa**: 1 yêu cầu sau mỗi 3-10 giây
- **Các trang web nhỏ**: 1 yêu cầu sau mỗi 10-60 giây trở lên

### Thời gian thu thập dữ liệu 

Ưu tiên các thời gian lưu lượng truy cập thấp cho các hoạt động chuyên sâu: 

- **Giờ ngoài giờ cao điểm**: Ưu tiên ban đêm hoặc cuối tuần
- **Tránh giờ cao điểm**: Không thu thập dữ liệu trong các giai đoạn cao điểm đã biết
- **Thích ứng**: Giảm tốc độ nếu phát hiện thấy tình trạng chậm lại

### Giảm thiểu tác động

Các kỹ thuật để giảm tác động lên máy chủ mục tiêu:

1. **Lưu trữ đệm thông minh**: Không truy xuất cùng một trang nhiều lần
2. **Tính chọn lọc**: Chỉ truy xuất các trang bạn thực sự cần
3. **Nén**: Yêu cầu phản hồi được nén để giảm băng thông
4. **Phân trang hiệu quả**: Tôn trọng cấu trúc phân trang của trang web

## Bảo vệ dữ liệu cá nhân

### Xác định dữ liệu cá nhân

Hãy cảnh giác về các loại dữ liệu bạn thu thập:

- **Dữ liệu nhận dạng trực tiếp**: Tên, email, điện thoại, địa chỉ
- **Dữ liệu nhận dạng gián tiếp**: ID người dùng, bút danh
- **Dữ liệu nhạy cảm**: Quan điểm chính trị, sức khỏe, khuynh hướng tình dục

### Nguyên tắc GDPR cần tôn trọng

Nếu bạn hoạt động tại Châu Âu hoặc thu thập dữ liệu từ người Châu Âu:

1. **Giảm thiểu**: Chỉ thu thập dữ liệu hoàn toàn cần thiết
2. **Mục đích**: Chỉ sử dụng dữ liệu cho mục đích đã định
3. **Lưu giữ có giới hạn**: Xóa dữ liệu khi không còn cần thiết
4. **Bảo mật**: Bảo vệ dữ liệu đã thu thập khỏi truy cập trái phép

### Ẩn danh dữ liệu

Các kỹ thuật ẩn danh dữ liệu cá nhân:

```python
import hashlib
import re

def anonymize_email(email):
"""Ẩn danh địa chỉ email.""" 
if not email:
return None

# Băm địa chỉ email
hashed = hashlib.sha256(email.encode()).hexdigest()[:10]
domain = email.split('@')[-1]

return f"anon_{hashed}@{domain}"

def anonymize_phone(phone):
"""Ẩn danh số điện thoại.""" 
if not phone:
return None

# Chỉ giữ lại các chữ số
digits = re.sub(r'\D', '', phone) 

# Che tất cả các chữ số ngoại trừ 2 chữ số cuối
if len(digits) > 2: 
return "X" * (len(digits) - 2) + digits[-2:] 
return "X" * len(digits) 
``` 

## Tài liệu và Minh bạch 

### Tài liệu về Hoạt động Thu thập dữ liệu 

Luôn ghi lại các hoạt động thu thập dữ liệu của bạn: 

- **Mục đích**: Tại sao dữ liệu này được thu thập? 
- **Phương pháp**: Dữ liệu được thu thập như thế nào? 
- **Lưu trữ**: Dữ liệu được lưu trữ ở đâu và như thế nào? 
- **Cách sử dụng**: Dữ liệu sẽ được sử dụng như thế nào? 
- **Xóa**: Khi nào dữ liệu sẽ bị xóa? 

### Liên hệ và Từ chối tham gia

Luôn cung cấp cách liên hệ với bạn:

1. **Trang thông tin**: Tạo một trang chuyên dụng giải thích về bot của bạn (ví dụ: whytcard.com/bot)
2. **Email liên hệ**: Cung cấp địa chỉ email trong User-Agent của bạn
3. **Cơ chế từ chối tham gia**: Cho phép các trang web yêu cầu loại trừ

### Ghi nhật ký hoạt động

Duy trì nhật ký chi tiết về các hoạt động thu thập dữ liệu của bạn:

```python
import logging
from datetime import datetime

# Cấu hình trình ghi nhật ký
logging.basicConfig(
filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log",
level=logging.INFO,
format='%(asctime)s - %(levelname)s - %(message)s'
)

def log_scraping_activity(url, success, data_points=0): 
"""Ghi lại hoạt động thu thập dữ liệu.""" 
logging.info(f"URL: {url}, Success: {success}, Data points: {data_points}") 
``` 

## Các trường hợp đặc biệt 

### API so với Thu thập dữ liệu 

Thứ tự ưu tiên để thu thập dữ liệu: 

1. **API chính thức**: Luôn ưu tiên các API chính thức khi chúng tồn tại 
2. **Nguồn cấp dữ liệu công khai**: Sử dụng nguồn cấp RSS, XML hoặc JSON nếu có 
3. **Thu thập dữ liệu**: Chỉ sử dụng thu thập dữ liệu như một giải pháp cuối cùng 

### Các trang web có Xác thực 

Đối với các trang web yêu cầu xác thực: 

- **Ủy quyền rõ ràng**: Xin ủy quyền bằng văn bản từ trang web 
- **Tôn trọng ToS**: Đảm bảo ToS cho phép sử dụng tự động 
- **Hạn chế**: Tuân thủ nghiêm ngặt các hạn chế sử dụng 

### Nội dung động (JavaScript) 

Đối với các trang web sử dụng nhiều JavaScript:

```python
from playwright.async_api import async_playwright

async def scrape_dynamic_content(url): 
"""Trích xuất nội dung do JavaScript tạo ra.""" 
async với async_playwright() là p: 
browser = await p.chromium.launch(headless=True) 
page = await browser.new_page() 

# Cấu hình User-Agent 
await page.set_extra_http_headers({ 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot)' 
}) 

# Tải trang và đợi mạng nhàn rỗi 
await page.goto(url) 
await page.wait_for_load_state('networkidle') 

# Trích xuất nội dung 
content = await page.content() 

await browser.close() 
return nội dung 
```

## Danh sách kiểm tra thu thập dữ liệu có đạo đức

Trước mỗi dự án thu thập dữ liệu, hãy kiểm tra các điểm sau: 

### Chuẩn bị
- [ ] Kiểm tra ToS của trang web mục tiêu
- [ ] Kiểm tra tệp robots.txt
- [ ] Tìm kiếm API hoặc các giải pháp thay thế cho việc thu thập dữ liệu
- [ ] Định nghĩa rõ ràng về dữ liệu cần thiết
- [ ] Tài liệu về mục đích thu thập dữ liệu

### Cấu hình kỹ thuật
- [ ] User-Agent minh bạch và có thể nhận dạng được
- [ ] Cơ chế giới hạn tốc độ
- [ ] Hệ thống bộ đệm để tránh các yêu cầu trùng lặp
- [ ] Xử lý lỗi và mã HTTP phù hợp
- [ ] Ghi nhật ký hoạt động

### Thực hiện
- [ ] Theo dõi hiệu suất của trang web mục tiêu
- [ ] Điều chỉnh tốc độ động nếu cần
- [ ] Tôn trọng chỉ dẫn của máy chủ (429, Thử lại sau)
- [ ] Dừng ngay lập tức nếu phát hiện sự cố

### Hậu xử lý
- [ ] Ẩn danh dữ liệu cá nhân
- [ ] Lưu trữ dữ liệu an toàn
- [ ] Lưu giữ có giới hạn thời gian
- [ ] Ghi lại dữ liệu đã thu thập

## Kết luận

Thu thập dữ liệu có đạo đức là sự cân bằng giữa quyền truy cập dữ liệu và tôn trọng quyền và tài nguyên của chủ sở hữu trang web. Bằng cách tuân theo các nguyên tắc và thông lệ này, dự án WhytCard có thể thu thập dữ liệu cần thiết trong khi vẫn duy trì cách tiếp cận có trách nhiệm và tôn trọng.

Hãy nhớ rằng đạo đức thu thập dữ liệu không chỉ là vấn đề tuân thủ pháp luật mà còn là trách nhiệm đối với toàn bộ hệ sinh thái web. Thu thập dữ liệu có tôn trọng góp phần tạo nên một trang web cởi mở và bền vững hơn cho tất cả mọi người.

---

Cập nhật lần cuối: 2025-01-15