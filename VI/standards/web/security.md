# Tiêu chuẩn bảo mật web

## Nguyên tắc bảo mật cốt lõi

- Phòng thủ chuyên sâu (nhiều lớp bảo mật)
- Nguyên tắc đặc quyền tối thiểu
- Bảo mật theo thiết kế và mặc định
- Kiểm tra và kiểm toán bảo mật thường xuyên
- Cập nhật các phụ thuộc bảo mật
- Thất bại an toàn (mặc định an toàn)
- Hoàn tất quá trình hòa giải (xác minh mọi yêu cầu)
- Giáo dục bảo mật cho tất cả các thành viên trong nhóm

## Xác thực & Ủy quyền

### Xác thực

- Triển khai chính sách mật khẩu mạnh
- Độ dài tối thiểu: 12 ký tự
- Yêu cầu kết hợp các ký tự, số, ký hiệu
- Kiểm tra với danh sách mật khẩu phổ biến
- Hỗ trợ xác thực đa yếu tố (MFA)
- Sử dụng quản lý phiên bảo mật
- Cookie chỉ HTTP
- Cờ bảo mật cho HTTPS
- Thuộc tính SameSite
- Hết hạn phù hợp
- Triển khai khóa tài khoản sau các lần thử không thành công
- Luồng đặt lại mật khẩu an toàn
- Sử dụng lưu trữ mật khẩu an toàn (bcrypt/Argon2)
- Cân nhắc các tùy chọn không cần mật khẩu (WebAuthn, liên kết ma thuật)

### Ủy quyền

- Triển khai kiểm soát truy cập dựa trên vai trò (RBAC)
- Sử dụng kiểm soát truy cập dựa trên thuộc tính cho các quyền phức tạp
- Xác thực ủy quyền trên mọi yêu cầu
- Triển khai kiểm tra kiểm soát truy cập phù hợp
- Sử dụng xử lý phiên an toàn
- Triển khai ủy quyền API (OAuth 2.0, JWT)
- Tránh tham chiếu đối tượng trực tiếp
- Ghi lại tất cả các lỗi kiểm soát truy cập

## Bảo vệ dữ liệu

### Dữ liệu nhạy cảm

- Xác định và phân loại dữ liệu nhạy cảm
- Mã hóa dữ liệu nhạy cảm khi không hoạt động
- Sử dụng TLS 1.3 cho dữ liệu đang truyền
- Triển khai quản lý khóa phù hợp
- Giảm thiểu việc thu thập dữ liệu nhạy cảm
- Áp dụng các nguyên tắc giảm thiểu dữ liệu
- Triển khai xóa dữ liệu an toàn
- Sử dụng lưu trữ an toàn cho khóa API và bí mật

### Xác thực đầu vào

- Xác thực tất cả đầu vào ở phía máy chủ
- Sử dụng truy vấn có tham số để truy cập cơ sở dữ liệu
- Triển khai vệ sinh đầu vào
- Xác thực các loại dữ liệu, độ dài, định dạng phù hợp
- Sử dụng danh sách cho phép thay vì danh sách từ chối
- Triển khai theo ngữ cảnh cụ thể mã hóa đầu ra
- Xác thực tệp tải lên (loại, kích thước, nội dung)
- Triển khai giới hạn tốc độ cho đầu vào

## Phòng ngừa lỗ hổng phổ biến

### Phòng ngừa tiêm mã

- Sử dụng truy vấn tham số hóa/câu lệnh đã chuẩn bị
- Áp dụng ORM với thoát đúng cách
- Xác thực và vệ sinh tất cả đầu vào
- Triển khai mã hóa đầu ra nhận biết ngữ cảnh
- Sử dụng API an toàn tránh tiêm mã thông dịch

### Phòng ngừa XSS

- Triển khai Chính sách bảo mật nội dung (CSP)
- Sử dụng mã hóa đầu ra tự động
- Áp dụng mã hóa theo ngữ cảnh
- Vệ sinh đầu vào HTML
- Sử dụng các khuôn khổ hiện đại có bảo vệ XSS tích hợp
- Xác thực URL trong chuyển hướng
- Áp dụng cờ HTTPOnly cho cookie nhạy cảm

### Phòng ngừa CSRF

- Triển khai mã thông báo chống CSRF
- Sử dụng thuộc tính cookie SameSite
- Xác minh tiêu đề nguồn gốc và tiêu đề giới thiệu
- Yêu cầu xác thực lại cho các hành động nhạy cảm
- Sử dụng cấu hình CORS phù hợp

### Bảo mật Tiêu đề

- Content-Security-Policy (CSP)
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (HSTS)
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- Tiêu đề Cache-Control cho dữ liệu nhạy cảm
- Clear-Site-Data để đăng xuất

## Bảo mật cơ sở hạ tầng

### Bảo mật máy chủ

- Cập nhật phần mềm máy chủ
- Sử dụng cấu hình máy chủ an toàn
- Triển khai các quy tắc tường lửa phù hợp
- Chỉ bật HTTPS (chuyển hướng HTTP sang HTTPS)
- Cấu hình cài đặt TLS phù hợp
- Vô hiệu hóa các dịch vụ không cần thiết
- Sử dụng các mô-đun máy chủ web tập trung vào bảo mật
- Triển khai giới hạn tốc độ và bảo vệ DDoS

### Bảo mật API

- Sử dụng HTTPS cho tất cả các điểm cuối API
- Triển khai xác thực phù hợp
- Áp dụng giới hạn tốc độ
- Xác thực tải trọng yêu cầu
- Trả về mã trạng thái phù hợp
- Tránh tiết lộ thông tin nhạy cảm trong phản hồi
- Sử dụng khóa API để giao tiếp giữa các dịch vụ
- Tài liệu yêu cầu bảo mật cho người dùng API

### Quản lý phụ thuộc

- Quét thường xuyên để tìm các phụ thuộc dễ bị tấn công
- Sử dụng tệp khóa để ghim các phiên bản phụ thuộc
- Triển khai quét lỗ hổng tự động
- Cập nhật phụ thuộc kịp thời
- Giảm thiểu việc sử dụng phụ thuộc
- Xác minh tính toàn vẹn của phụ thuộc (tổng kiểm tra)
- Giám sát các cuộc tấn công chuỗi cung ứng
- Có kế hoạch ứng phó với lỗ hổng

## Kiểm tra bảo mật

### Phân tích tĩnh

- Triển khai các công cụ SAST tự động
- Tích hợp kiểm tra bảo mật trong CI/CD
- Quét các bí mật được mã hóa cứng
- Phân tích mã để tìm các mẫu chống bảo mật
- Xác thực cấu hình bảo mật
- Kiểm tra các phụ thuộc đã lỗi thời
- Thực thi các tiêu chuẩn mã hóa an toàn

### Kiểm tra động

- Thực hiện kiểm tra thâm nhập thường xuyên
- Triển khai quét DAST tự động
- Sử dụng kiểm tra bảo mật ứng dụng tương tác
- Tiến hành đánh giá lỗ hổng thường xuyên
- Kiểm tra luồng xác thực và ủy quyền
- Xác minh tiêu đề và cấu hình bảo mật
- Mô phỏng các cuộc tấn công phổ biến kịch bản

## Giám sát & Phản hồi Bảo mật

### Ghi nhật ký & Giám sát

- Triển khai ghi nhật ký bảo mật toàn diện
- Ghi nhật ký sự kiện xác thực
- Ghi nhật ký lỗi kiểm soát truy cập
- Giám sát hoạt động đáng ngờ
- Triển khai cảnh báo theo thời gian thực
- Sử dụng quản lý nhật ký tập trung
- Đảm bảo nhật ký chống giả mạo
- Lưu giữ nhật ký trong khoảng thời gian thích hợp

### Phản hồi Sự cố

- Phát triển kế hoạch phản hồi sự cố
- Xác định vai trò và trách nhiệm
- Thiết lập giao thức truyền thông
- Quy trình lưu trữ tài liệu
- Triển khai khả năng phân tích pháp y
- Tiến hành đánh giá sau sự cố
- Thực hành các kịch bản phản hồi sự cố
- Duy trì liên lạc với cộng đồng bảo mật

## Tuân thủ & Quyền riêng tư

### Tuân thủ Quy định

- Xác định các quy định hiện hành (GDPR, CCPA, v.v.)
- Triển khai các biện pháp kiểm soát bảo mật bắt buộc
- Tiến hành đánh giá tuân thủ thường xuyên
- Ghi lại các biện pháp tuân thủ
- Đào tạo nhóm về các yêu cầu tuân thủ
- Triển khai quyền riêng tư theo thiết kế
- Duy trì tài liệu bắt buộc

### Quyền riêng tư Cân nhắc

- Triển khai chính sách bảo mật rõ ràng
- Có được sự đồng ý thích hợp cho việc thu thập dữ liệu
- Cung cấp cơ chế truy cập và xóa dữ liệu
- Giảm thiểu việc thu thập và lưu giữ dữ liệu
- Triển khai tính di động của dữ liệu
- Thực hiện đánh giá tác động đến quyền riêng tư
- Xem xét quyền riêng tư trong mọi quyết định thiết kế