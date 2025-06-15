# Tiêu chuẩn quốc tế hóa (i18n) 

## Nguyên tắc cốt lõi 

- Thiết kế cho đối tượng toàn cầu ngay từ đầu
- Tách nội dung khỏi mã
- Hỗ trợ nhiều ngôn ngữ và địa phương
- Tôn trọng sự khác biệt và nhạy cảm về văn hóa
- Triển khai phát hiện ngôn ngữ tự động
- Cho phép chọn ngôn ngữ thủ công
- Kiểm tra với người dùng thực tế từ các thị trường mục tiêu

## Ngôn ngữ & Nội dung

### Quản lý văn bản

- Lưu trữ tất cả văn bản hướng đến người dùng trong các tệp tài nguyên
- Không bao giờ mã hóa cứng các chuỗi văn bản trong các thành phần
- Sử dụng các khóa mô tả duy nhất cho các tài nguyên văn bản
- Sắp xếp bản dịch theo tính năng hoặc trang
- Hỗ trợ các quy tắc số nhiều cho các ngôn ngữ khác nhau
- Xử lý các biến thể theo giới tính
- Hỗ trợ các ngôn ngữ từ phải sang trái (RTL)
- Triển khai các cơ chế dự phòng cho các bản dịch bị thiếu

### Quy trình dịch

- Cung cấp ngữ cảnh cho người dịch
- Bao gồm các mô tả biến/giữ chỗ
- Sử dụng các dịch vụ dịch thuật chuyên nghiệp
- Triển khai các hệ thống bộ nhớ dịch
- Cho phép mở rộng văn bản (một số ngôn ngữ yêu cầu nhiều không gian hơn)
- Cung cấp ảnh chụp màn hình để làm bối cảnh
- Triển khai quy trình đánh giá bản dịch
- Hỗ trợ cập nhật bản dịch liên tục

### Cân nhắc về nội dung

- Tránh ẩn dụ hoặc thành ngữ cụ thể về mặt văn hóa
- Nhận thức được biểu tượng màu sắc giữa các nền văn hóa
- Xem xét các định dạng tên và tiêu chuẩn địa chỉ khác nhau
- Tôn trọng sự nhạy cảm và điều cấm kỵ về văn hóa
- Điều chỉnh nội dung cho thị trường địa phương khi cần thiết
- Sử dụng hình ảnh trung lập về mặt văn hóa
- Xem xét hướng đọc (LTR so với RTL)
- Tránh tiếng lóng và thành ngữ thông tục

## Triển khai kỹ thuật

### Khung & Thư viện

- Sử dụng các thư viện i18n đã thiết lập:
- react-i18next / i18next (React)
- vue-i18n (Vue)
- angular/localize (Angular)
- next-intl (Next.js)
- Format.js (React)
- Triển khai phát hiện ngôn ngữ phù hợp
- Hỗ trợ chuyển đổi ngôn ngữ mà không cần tải lại trang
- Cấu hình dự phòng ngôn ngữ
- Triển khai tải lười biếng cho bản dịch
- Lưu trữ bản dịch để tăng hiệu suất
- Hỗ trợ các khóa dịch lồng nhau
- Triển khai định dạng và số nhiều

### Cấu trúc mã

- Phân tách các tệp dịch theo ngôn ngữ
- Sử dụng JSON hoặc YAML cho các tài nguyên dịch
- Triển khai không gian tên cho các ứng dụng lớn
- Giữ cho các khóa dịch được sắp xếp và dễ bảo trì
- Tuân theo các quy ước đặt tên nhất quán cho các khóa
- Tài liệu định dạng hoặc biến đặc biệt
- Triển khai an toàn kiểu cho các khóa dịch (TypeScript)
- Hỗ trợ tạo khóa động khi cần thiết

### Định dạng

#### Ngày & Giờ

- Sử dụng các thư viện hỗ trợ định dạng ngày quốc tế
- Hiển thị ngày theo định dạng ưa thích của người dùng
- Xem xét múi giờ và giờ tiết kiệm ánh sáng ban ngày
- Định dạng ngày theo quy ước của địa phương
- Hỗ trợ các hệ thống lịch khác nhau khi cần thiết
- Sử dụng định dạng ISO để trao đổi dữ liệu
- Hiển thị thời gian tương đối phù hợp theo văn hóa

#### Số & Tiền tệ

- Định dạng số theo quy ước của địa phương
- Sử dụng số thập phân và số nghìn thích hợp dấu phân cách
- Định dạng tiền tệ bằng các ký hiệu thích hợp
- Định vị ký hiệu tiền tệ đúng theo ngôn ngữ
- Hỗ trợ các hệ thống đánh số khác nhau
- Định dạng phần trăm theo ngôn ngữ
- Xem xét tỷ giá hối đoái cho các ứng dụng đa vùng

#### Địa chỉ & Số điện thoại

- Hỗ trợ các định dạng địa chỉ khác nhau
- Hỗ trợ nhiều định dạng mã bưu chính khác nhau
- Xử lý số điện thoại quốc tế (định dạng E.164)
- Định dạng số điện thoại theo các quy ước địa phương
- Hỗ trợ các quy ước sắp xếp tên khác nhau
- Xem xét các danh xưng và chức danh trên khắp các nền văn hóa
- Xác thực địa chỉ theo các quy tắc cụ thể của từng quốc gia

## Cân nhắc về UI

### Bố cục & Thiết kế

- Thiết kế các bố cục linh hoạt hỗ trợ việc mở rộng văn bản
- Hỗ trợ cả hướng văn bản LTR và RTL
- Triển khai hỗ trợ văn bản hai chiều (bidi)
- Kiểm tra các bố cục với chuỗi văn bản dài hơn
- Tránh các vùng chứa có chiều rộng cố định cho văn bản
- Xem xét các biến thể kích thước phông chữ trên các ngôn ngữ
- Kiểm tra với nội dung đã dịch thực tế, không phải lorem ipsum
- Triển khai CSS dành riêng cho ngôn ngữ khi cần thiết

### Kiểu chữ

- Sử dụng phông chữ hỗ trợ nhiều ngôn ngữ
- Bao gồm các phông chữ dự phòng phù hợp
- Xem xét các bộ ký tự cho các ngôn ngữ khác nhau
- Hỗ trợ các ký tự đặc biệt và dấu phụ
- Điều chỉnh độ cao dòng cho các tập lệnh khác nhau
- Kiểm tra khả năng đọc giữa các ngôn ngữ
- Xem xét văn bản dọc cho một số ngôn ngữ Đông Á
- Sử dụng Unicode đúng cách

### Điều hướng & Điều khiển

- Dịch các mục điều hướng và điều khiển
- Điều chỉnh điều hướng cho các ngôn ngữ RTL
- Xem xét các mẫu đọc văn hóa
- Đảm bảo các biểu tượng trung lập về mặt văn hóa
- Kiểm tra các phím tắt trên các bố cục bàn phím
- Cung cấp trợ giúp và tài liệu bản địa hóa
- Dịch các thông báo và thông báo lỗi
- Bản địa hóa chức năng tìm kiếm

## Kiểm tra & Đảm bảo chất lượng

### Chiến lược kiểm tra

- Kiểm tra với người bản ngữ
- Xác minh bản dịch trong ngữ cảnh
- Kiểm tra việc mở rộng và cắt bớt văn bản
- Xác thực định dạng ngày, số và tiền tệ
- Kiểm tra kỹ lưỡng các bố cục RTL
- Xác minh chức năng chuyển đổi ngôn ngữ
- Kiểm tra với các cài đặt ngôn ngữ khác nhau
- Triển khai thử nghiệm i18n tự động

### Các vấn đề phổ biến

- Kiểm tra các chuỗi được mã hóa cứng
- Xác minh số nhiều đúng
- Tìm các chuỗi được nối
- Kiểm tra các vấn đề xử lý Unicode
- Xác minh sắp xếp và đối chiếu
- Kiểm tra các giả định về văn hóa trong logic
- Kiểm tra với các từ và chuỗi dài
- Xác minh việc xử lý các ký tự đặc biệt

### Công cụ & Tự động hóa

- Triển khai linting cho các vấn đề i18n
- Sử dụng hệ thống quản lý bản dịch
- Tự động tạo ảnh chụp màn hình cho ngữ cảnh
- Triển khai bản địa hóa giả để thử nghiệm
- Sử dụng thử nghiệm tự động cho các vấn đề về bố cục
- Theo dõi phạm vi và chất lượng bản dịch
- Triển khai kiểm tra CI/CD cho i18n
- Theo dõi các bản dịch bị thiếu

## Pháp lý & Tuân thủ

- Nghiên cứu các yêu cầu pháp lý tại địa phương
- Điều chỉnh chính sách bảo mật cho các khu vực khác nhau
- Xem xét GDPR và các quy định về quyền riêng tư khác
- Điều chỉnh các điều khoản dịch vụ cho các thị trường địa phương
- Lưu ý các hạn chế về nội dung theo quốc gia
- Xem xét các yêu cầu về khả năng truy cập theo khu vực
- Tài liệu các biện pháp tuân thủ
- Tham khảo ý kiến pháp lý chuyên gia cho các thị trường trọng điểm