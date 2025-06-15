# Tiêu chuẩn kiến trúc web 

## Nguyên tắc cốt lõi 

- Kiến trúc mô-đun và có thể mở rộng
- Phân tách rõ ràng các mối quan tâm
- Nguyên tắc SOLID và DRY
- Cấu trúc thư mục nhất quán
- Kiến trúc được ghi chép với sơ đồ
- Thiết kế dựa trên thành phần

## Kiến trúc được đề xuất 

### Kiến trúc giao diện người dùng 

- **Kiến trúc thành phần** 
- Phương pháp thiết kế nguyên tử 
- Thành phần thông minh so với thành phần trình bày 
- Thành phần kết hợp trên kế thừa 
- Thư viện thành phần và hệ thống thiết kế 

- **Quản lý trạng thái** 
- Trạng thái tập trung cho dữ liệu trên toàn ứng dụng 
- Trạng thái cục bộ cho dữ liệu cụ thể của thành phần 
- Trạng thái máy chủ cho dữ liệu API 
- API ngữ cảnh cho chủ đề/xác thực/bản địa hóa 

- **Luồng dữ liệu** 
- Luồng dữ liệu một chiều 
- Cập nhật trạng thái không thay đổi 
- Giao tiếp theo sự kiện 
- Các mẫu Pub/sub cho giao tiếp giữa các thành phần 

### Kiến trúc ứng dụng 

- **Kết xuất phía máy khách (CSR)** 
- Dành cho tính tương tác cao ứng dụng
- Mô hình Ứng dụng trang đơn (SPA)
- Định tuyến phía máy khách

- **Kết xuất phía máy chủ (SSR)**
- Dành cho các ứng dụng quan trọng đối với SEO
- Cải thiện hiệu suất tải ban đầu
- Khả năng truy cập và SEO tốt hơn

- **Tạo trang tĩnh (SSG)**
- Dành cho các trang web tập trung vào nội dung
- HTML được kết xuất trước
- Yêu cầu JavaScript tối thiểu

- **Tái tạo tĩnh gia tăng (ISR)**
- Dành cho nội dung động với các lợi ích tĩnh
- Tái tạo nền
- Mẫu cũ trong khi xác thực lại

- **Kiến trúc đảo**
- Dành cho hầu hết các trang web tĩnh với các thành phần tương tác
- Hydrat hóa các thành phần cụ thể
- Giảm tải JavaScript

## Cấu trúc dự án

``` 
src/
├── components/ # Các thành phần giao diện người dùng có thể tái sử dụng
│ ├── atoms/ # Các khối xây dựng cơ bản
│ ├── phân tử/ # Nhóm nguyên tử
│ ├── sinh vật/ # Nhóm phân tử
│ └── mẫu/ # Bố cục trang
├── móc/ # Móc React tùy chỉnh
├── lib/ # Hàm tiện ích và thư viện
├── trang/ # Thành phần tuyến đường (Next.js)
├── tính năng/ # Mã dành riêng cho tính năng
├── dịch vụ/ # API và dịch vụ bên ngoài
├── lưu trữ/ # Quản lý trạng thái
├── kiểu/ # Kiểu và chủ đề toàn cục
└── kiểu/ # Định nghĩa kiểu TypeScript
```

## Thực hành tốt nhất

- Nhóm tệp theo tính năng/mô-đun
- Duy trì ranh giới rõ ràng giữa các mô-đun
- Giữ tệp cấu hình ở root
- Triển khai quản lý trạng thái được tối ưu hóa
- Giảm thiểu sự phụ thuộc giữa các mô-đun
- Thực hiện nguyên tắc đặc quyền tối thiểu
- Sử dụng tải lười biếng để phân tách mã
- Triển khai ranh giới lỗi phù hợp

## Các khuôn khổ được đề xuất

- **Next.js** - Dành cho các ứng dụng SSR, SSG và ISR
- **React** - Dành cho giao diện người dùng dựa trên thành phần
- **Vue.js** - Giải pháp thay thế cho React với đường cong học tập đơn giản hơn
- **Astro** - Dành cho các trang web tập trung vào nội dung với JS tối thiểu
- **Remix** - Dành cho các ứng dụng web đầy đủ
- **SvelteKit** - Dành cho các ứng dụng hiệu suất cao