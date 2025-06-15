# Kiến trúc toàn cầu của WhytCard

## Giới thiệu

Tài liệu này trình bày kiến trúc toàn cầu của dự án WhytCard, một nền tảng đào tạo AI và thu thập dữ liệu web nguồn mở. Kiến trúc được thiết kế theo dạng mô-đun, có thể mở rộng và bảo trì, cho phép dễ dàng thêm các tính năng mới trong khi vẫn đảm bảo tính ổn định của hệ thống.

## Tổng quan

WhytCard được tổ chức theo kiến trúc máy khách-máy chủ với sự tách biệt rõ ràng giữa giao diện người dùng và giao diện quản trị. Sự tách biệt này cho phép cả hai thành phần phát triển độc lập và tạo điều kiện cho làm việc nhóm.

```
┌────────────────────┐ ┌───────────────────┐ 
│ │ │ │ 
│ Giao diện │◄────►│ Giao diện │ 
│ (Vue.js) │ │ (FastAPI) │ 
│ │ │ │
└────────────────────┘ └────────────────┘ 
▲ 
│ 
▼ 
┌───────────────────────┐ 
│ │ 
│ Thu thập & │ 
│ Đường ống dữ liệu │ 
│ │ 
└───────────────────┘ 
▲ 
│ 
▼ 
┌────────────────────┐ 
│ │ 
│ │ 
│ 
└───────────────────┘ 
``` 

## Chính Thành phần 

### 1. Frontend (Vue.js) 

Frontend được phát triển bằng Vue.js và sử dụng Tailwind CSS để tạo kiểu. Nó chịu trách nhiệm về giao diện người dùng và trải nghiệm người dùng. 

#### Các tính năng chính

- **Framework**: Vue.js 3 với Composition API
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Internationalization**: i18next với chức năng tự động phát hiện ngôn ngữ trình duyệt
- **Routing**: Vue Router
- **State Management**: Pinia

#### Structure

```
src/
├── components/ # Reusable components
├── config/ # Frontend configuration
├── i18n/ # Translation files
├── router/ # Route configuration
├── views/ # Main pages
└── main.js # Entry point
```

### 2. Backend (FastAPI)

Backend được phát triển với FastAPI, một khuôn khổ Python hiện đại và hiệu suất cao để tạo API. Nó xử lý tất cả các hoạt động của máy chủ, truy cập dữ liệu và logic kinh doanh.

#### Các tính năng chính

- **Khung**: FastAPI
- **Xác thực**: JWT
- **Xác thực**: Pydantic
- **Tài liệu API**: Giao diện người dùng Swagger tích hợp

#### Cấu trúc

```
backend/
├── config/ # Cấu hình backend
├── core/ # Logic kinh doanh chính
│ ├── api/ # Điểm cuối API
│ └── schemas/ # Lược đồ Pydantic
├── models/ # Mô hình dữ liệu
├── utils/ # Tiện ích
└── main.py # Điểm vào
```

### 3. Thu thập dữ liệu & Đường ống dữ liệu

Mô-đun này chịu trách nhiệm thu thập dữ liệu từ các nguồn web và chuyển đổi dữ liệu đó cho Đào tạo mô hình AI.

#### Các tính năng chính

- **Scraping**: Hệ thống không đồng bộ với aiohttp và BeautifulSoup
- **Orchestration**: Quản lý tác vụ và mức độ ưu tiên
- **Transformation**: Làm sạch và chuẩn hóa dữ liệu
- **Cache**: Hệ thống lưu trữ đệm để tránh các yêu cầu trùng lặp

#### Cấu trúc

```
backend/
├── scraping/
│ ├── scrapers/ # Các triển khai cụ thể cho các nguồn khác nhau
│ ├── utils/ # Tiện ích thu thập dữ liệu
│ ├── orchestrator.py # Task orchestrator
│ └── cache.py # Hệ thống lưu trữ đệm
└── datasets/ # Dữ liệu đã thu thập và chuyển đổi
```

### 4. Lưu trữ

Hệ thống lưu trữ quản lý tính bền vững và khả năng truy cập dữ liệu.

#### Tùy chọn lưu trữ

- **Cơ sở dữ liệu**: PostgreSQL cho dữ liệu có cấu trúc
- **Lưu trữ tệp**: Hệ thống tệp cục bộ hoặc tương thích với S3 cho dữ liệu lớn
- **Bộ nhớ đệm**: Redis cho bộ nhớ đệm phân tán

## Luồng dữ liệu

### 1. Thu thập dữ liệu

```
┌──────────────┐ ┌────────────┐ ┌────────────┐ 
│ │ │ │ │ │
│ Web │────►│ Scrapers │───►│ Bộ nhớ đệm │
│ Nguồn │ │ │ │ │ │ 
└─────────────────┘ └───────────┘ └────────────┘ 
│ 
▼
┌──────────────┐ ┌─────────────┐ 
│ │ │ │ 
│ Bộ xử lý │────►│ Lưu trữ │ 
│ │ │ 
└─────────────┘ └─────────────┘ 
``` 

1. Scraper thu thập dữ liệu từ các nguồn web
2. Dữ liệu được lưu vào bộ nhớ đệm để tránh các yêu cầu trùng lặp
3. Bộ xử lý dọn dẹp và chuyển đổi dữ liệu
4. Dữ liệu đã chuyển đổi được lưu trữ để sử dụng sau

### 2. Đào tạo mô hình

``` 
┌─────────────┐ ┌──────────────┐ ┌──────────────┐ 
│ │ │ │ │ │ 
│ Bộ dữ liệu │────►│ Bộ tiền xử lý│───►│ Đào tạo │ 
│ │ │ │ │ │ 
└────────────┘ └──────────────┘ └────────────┘ 
│ 
▼ 
┌───────────────┐ 
│ │ 
│ Các mô hình │ 
│ │ 
└───────────────┘ 
``` 

1. Các tập dữ liệu là trích xuất từ kho lưu trữ
2. Dữ liệu được xử lý trước để đào tạo
3. Các mô hình được đào tạo trên dữ liệu được xử lý trước
4. Các mô hình được đào tạo được lưu

### 3. Sử dụng mô hình

```
┌───────────────┐ ┌─────────────┐ ┌────────────┐ 
│ │ │ │ │ │ │ 
│ API │────►│ Mô hình │────►│ Phản hồi │ 
│ Yêu cầu │ │ │ │ │ 
└────────────────┘ └────────────┘ └─────────────┘ 
``` 

1. Nhận được yêu cầu API
2. Sử dụng các mô hình phù hợp để xử lý yêu cầu
3. Tạo và trả về phản hồi

## Giao tiếp giữa các thành phần

### REST API 

Giao tiếp giữa frontend và backend chủ yếu thông qua REST API. Các điểm cuối được sắp xếp hợp lý và ghi lại bằng Swagger UI. 

### WebSockets 

Đối với các tính năng yêu cầu cập nhật theo thời gian thực (chẳng hạn như theo dõi các tác vụ thu thập dữ liệu), WebSockets được sử dụng để cho phép giao tiếp hai chiều. 

### Hàng đợi tin nhắn 

Đối với các tác vụ không đồng bộ và chạy lâu, hàng đợi tin nhắn (như RabbitMQ hoặc Redis Pub/Sub) được sử dụng để tách các thành phần và đảm bảo độ tin cậy. 

## Triển khai

### Tùy chọn triển khai

WhytCard có thể được triển khai theo nhiều cách:

1. **Ứng dụng máy tính để bàn**: Sử dụng Tauri để tạo ứng dụng máy tính để bàn đa nền tảng
2. **Triển khai đám mây**: Triển khai trên các dịch vụ đám mây như AWS, GCP hoặc Azure
3. **Tự lưu trữ**: Cài đặt trên máy chủ cá nhân hoặc công ty

### Kiến trúc triển khai

```
┌──────────────────┐ ┌─────────────────┐ 
│ │ │ │
│ Giao diện │◄────►│ Cổng API │
│ (Tĩnh) │ │ │
└──────────────────────┘ └─────────────────┘ 
▲ 
│ 
▼
┌───────────────────┐ 
│ │ 
│ API phía sau │ 
│ │ 
└───────────────────┘ 
▲ 
│ 
▼ 
┌───────────────────┐ ┌───────────────────┐ 
│ │ │ │ 
│ Cơ sở dữ liệu │ │ Lưu trữ tệp │ 
│ │ │ 
└──────────────────────┘ └──────────────────┘ 
``` 

## Bảo mật

### Nguyên tắc bảo mật

1. **Phòng thủ chuyên sâu**: Nhiều lớp bảo mật
2. **Nguyên tắc đặc quyền tối thiểu**: Quyền truy cập tối thiểu cần thiết
3. **Xác thực đầu vào**: Tất cả đầu vào của người dùng đều được xác thực
4. **Bảo vệ dữ liệu**: Mã hóa dữ liệu nhạy cảm

### Biện pháp bảo mật

- **Xác thực**: JWT với luân chuyển mã thông báo
- **Ủy quyền**: Kiểm soát truy cập dựa trên vai trò
- **Bảo vệ chống lại các cuộc tấn công phổ biến**: XSS, CSRF, tiêm SQL
- **Kiểm toán**: Ghi nhật ký các hành động quan trọng

## Khả năng mở rộng

Kiến trúc được thiết kế để có thể mở rộng theo chiều ngang và chiều dọc:

- **Vi dịch vụ**: Các thành phần có thể được triển khai độc lập
- **Bộ nhớ đệm**: Sử dụng bộ nhớ đệm nhiều cấp
- **Cân bằng tải**: Phân phối lưu lượng giữa nhiều phiên bản
- **Phân vùng**: Phân tách dữ liệu để cải thiện hiệu suất

## Giám sát và khả năng quan sát

- **Ghi nhật ký**: Tập trung ghi nhật ký bằng ELK Stack hoặc tương đương
- **Metrics**: Thu thập Metrics bằng Prometheus
- **Tracing**: Theo dõi yêu cầu bằng OpenTelemetry
- **Alerting**: Cảnh báo dựa trên ngưỡng được xác định trước

## Kết luận

Kiến trúc của WhytCard được thiết kế để mạnh mẽ, có thể mở rộng và bảo trì được. Việc phân tách rõ ràng trách nhiệm giữa các thành phần khác nhau cho phép phát triển độc lập và tạo điều kiện cho làm việc nhóm. Các lựa chọn công nghệ được đưa ra có tính đến nhu cầu dự án hiện tại và tương lai, cũng như các thông lệ tốt nhất của ngành.

Kiến trúc này sẽ được xem xét và cập nhật thường xuyên để thích ứng với các nhu cầu mới và sự phát triển công nghệ.

---

Cập nhật lần cuối: 2025-01-15