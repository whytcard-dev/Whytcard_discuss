# Tiêu chuẩn chất lượng mã 

## Nguyên tắc cốt lõi 

- Viết mã sạch, dễ bảo trì và tự ghi chú
- Tuân thủ các nguyên tắc SOLID và DRY 
- Giữ các hàm nhỏ và tập trung (trách nhiệm duy nhất) 
- Sử dụng tên mô tả cho các biến, hàm và lớp 
- Duy trì phong cách mã nhất quán trong toàn bộ dự án 
- Ghi lại logic phức tạp và API công khai 
- Viết mã cho con người, không chỉ máy móc 

## Tiêu chuẩn JavaScript/TypeScript 

### Cấu hình TypeScript 

- Sử dụng chế độ nghiêm ngặt (`"strict": true`) 
- Bật tất cả các tùy chọn kiểm tra kiểu được đề xuất 
- Cấu hình độ phân giải mô-đun phù hợp 
- Đặt phiên bản ECMAScript mục tiêu phù hợp 
- Chỉ định các mẫu bao gồm/loại trừ 
- Sử dụng bí danh đường dẫn để nhập sạch hơn 

### Quy ước đặt tên 

- **Biến/Hàm**: camelCase (`getUserData`, `calculateTotal`) 
- **Lớp/Giao diện/Kiểu**: PascalCase (`UserProfile`, `ApiResponse`)
- **Hằng số**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_URL`)
- **Thuộc tính riêng tư**: Sử dụng tiền tố `#` hoặc quy ước `_` (`#privateField`, `_privateMethod`)
- **Biến Boolean**: Sử dụng tiền tố "is", "has", "can" (`isActive`, `hasPermission`)
- **Tệp thành phần**: PascalCase có phần mở rộng (`UserCard.tsx`)
- **Tệp tiện ích**: camelCase có phần mở rộng (`formatDate.ts`)

### Tổ chức mã

- Một lớp/thành phần cho mỗi tệp
- Nhóm các mục nhập theo bên ngoài/bên trong
- Sắp xếp các mục nhập theo thứ tự bảng chữ cái
- Sử dụng xuất barrel (`index.ts`) cho các chức năng liên quan
- Tổ chức mã theo tính năng/mô-đun
- Giữ các tệp dưới 400 dòng (chia nếu lớn hơn)
- Giữ các hàm dưới 50 dòng
- Lồng nhau tối đa: sâu 3-4 cấp

### Thực hành tốt nhất

- Ưu tiên tính bất biến (const, readonly, Object.freeze)
- Sử dụng chuỗi tùy chọn và hợp nhất nullish
- Triển khai xử lý lỗi phù hợp
- Tránh bất kỳ loại nào trừ khi cần thiết
- Sử dụng bảo vệ loại để kiểm tra loại thời gian chạy
- Ưu tiên async/await hơn các lời hứa thô
- Tránh các số và chuỗi ma thuật (sử dụng hằng số)
- Triển khai kiểm tra null/undefined phù hợp
- Sử dụng trả về sớm để giảm lồng nhau

## Tiêu chuẩn React

### Cấu trúc thành phần

- Ưu tiên các thành phần chức năng có móc
- Sử dụng xuất có tên cho các thành phần
- Triển khai xác thực prop với TypeScript
- Trích xuất logic phức tạp thành móc tùy chỉnh
- Giữ các thành phần tập trung vào các mối quan tâm về UI
- Triển khai ranh giới lỗi phù hợp
- Sử dụng React.memo để tối ưu hóa hiệu suất
- Trích xuất các thành phần có thể tái sử dụng

### Quản lý trạng thái

- Sử dụng trạng thái cục bộ cho dữ liệu cụ thể của thành phần
- Sử dụng ngữ cảnh cho trạng thái được chia sẻ giữa các thành phần
- Xem xét quản lý trạng thái bên ngoài cho các ứng dụng phức tạp
- Giữ trạng thái được chuẩn hóa và tối thiểu
- Triển khai khởi tạo trạng thái phù hợp
- Sử dụng bộ giảm tốc cho logic trạng thái phức tạp
- Tránh prop drilling (sử dụng thành phần hoặc ngữ cảnh)

### Tối ưu hóa hiệu suất

- Sử dụng React.memo cho các thành phần thuần túy
- Triển khai useMemo cho các phép tính tốn kém
- Sử dụng useCallback để ghi nhớ hàm
- Ảo hóa các danh sách dài (react-window, react-virtualized)
- Triển khai các mảng phụ thuộc phù hợp trong các hook
- Tránh kết xuất lại không cần thiết
- Sử dụng React Profiler để xác định các nút thắt

## Tiêu chuẩn kiểm thử

### Kiểm thử đơn vị

- Kiểm thử tất cả các logic và tiện ích kinh doanh
- Sử dụng Jest hoặc Vitest làm trình chạy thử nghiệm
- Triển khai chế nhạo phụ thuộc phù hợp
- Sử dụng Thư viện kiểm thử để kiểm thử thành phần
- Thực hiện theo mẫu AAA (Arrange, Act, Assert)
- Viết tên thử nghiệm mô tả
- Mục tiêu cho độ phủ mã >80%
- Kiểm tra các trường hợp ngoại lệ và kịch bản lỗi

### Kiểm tra tích hợp

- Kiểm tra tương tác thành phần
- Kiểm tra gửi biểu mẫu và luồng người dùng
- Sử dụng MSW để mô phỏng API
- Kiểm tra định tuyến và điều hướng
- Xác minh các thay đổi trạng thái
- Kiểm tra với dữ liệu thực tế

### Kiểm tra đầu cuối

- Sử dụng Cypress hoặc Playwright
- Kiểm tra hành trình người dùng quan trọng
- Kiểm tra trên nhiều trình duyệt
- Triển khai cách ly thử nghiệm phù hợp
- Sử dụng thuộc tính dữ liệu cho bộ chọn thử nghiệm
- Triển khai logic thử lại cho các thử nghiệm không ổn định
- Kiểm tra khả năng truy cập

## Tiêu chuẩn đánh giá mã

### Quy trình

- Tất cả mã phải được đánh giá trước khi hợp nhất
- Kiểm tra tự động phải vượt qua trước khi đánh giá
- Sử dụng mẫu yêu cầu kéo
- Giữ cho các PR nhỏ và tập trung
- Phản hồi các bình luận đánh giá kịp thời
- Giải quyết tất cả các bình luận trước khi hợp nhất
- Cam kết Squash trước khi hợp nhất

### Danh sách kiểm tra đánh giá

- Mã tuân theo dự án tiêu chuẩn
- Bao gồm các bài kiểm tra và vượt qua
- Tài liệu được cập nhật
- Không có lỗ hổng bảo mật
- Xem xét các tác động về hiệu suất
- Đáp ứng các yêu cầu về khả năng truy cập
- Xử lý các trường hợp ngoại lệ
- Không có mã hoặc phụ thuộc không cần thiết

## Công cụ

### Linting và Định dạng

- ESLint với các quy tắc phù hợp
- Prettier để định dạng nhất quán
- Husky để móc trước khi cam kết
- lint-staged để linting gia tăng
- Trình biên dịch TypeScript để kiểm tra kiểu
- Stylelint cho CSS/SCSS

### Phân tích tĩnh

- SonarQube hoặc CodeClimate
- Theo dõi số liệu về độ phức tạp
- Phát hiện mã trùng lặp
- Quét lỗ hổng bảo mật
- Phân tích kích thước gói
- Phát hiện mã không sử dụng

### Tích hợp CI/CD

- Chạy tất cả các lần kiểm tra trên mọi PR
- Hợp nhất khối nếu kiểm tra không thành công
- Tạo và công bố báo cáo phạm vi kiểm tra
- Triển khai thử nghiệm hồi quy hiệu suất
- Tự động cập nhật phụ thuộc
- Triển khai môi trường xem trước