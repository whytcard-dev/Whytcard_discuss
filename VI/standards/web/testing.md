# Tiêu chuẩn kiểm thử web

## Triết lý kiểm thử

- Kiểm thử sớm và kiểm thử thường xuyên
- Tự động hóa các bài kiểm thử bất cứ khi nào có thể
- Kiểm thử ở các cấp độ phù hợp (đơn vị, tích hợp, e2e)
- Viết các bài kiểm thử có thể bảo trì và đáng tin cậy
- Kiểm thử cả các đường dẫn may mắn và các trường hợp ngoại lệ
- Sử dụng kiểm thử để ngăn ngừa sự hồi quy
- Ưu tiên các bài kiểm thử dựa trên tác động kinh doanh
- Xử lý mã kiểm thử cẩn thận như mã sản xuất

## Các loại kiểm thử & Phạm vi bao phủ

### Kiểm thử đơn vị

- **Mục tiêu**: Các hàm, thành phần và mô-đun riêng lẻ
- **Mục tiêu bao phủ**: 80%+ logic và tiện ích kinh doanh
- **Công cụ**: Jest, Vitest, Thư viện kiểm thử React
- **Các phương pháp hay nhất**: 
- Thực hiện theo mô hình AAA (Sắp xếp, Hành động, Khẳng định)
- Một khẳng định cho mỗi bài kiểm thử khi có thể
- Mô phỏng các phụ thuộc bên ngoài
- Kiểm thử các trường hợp ngoại lệ và điều kiện lỗi
- Giữ cho các bài kiểm thử nhanh (< 100ms cho mỗi bài kiểm thử)
- Sử dụng mô tả tên thử nghiệm
- Tách biệt các thử nghiệm với nhau

### Kiểm thử tích hợp

- **Mục tiêu**: Tương tác giữa các thành phần và dịch vụ
- **Mục tiêu bao phủ**: Luồng người dùng quan trọng và tương tác thành phần
- **Công cụ**: Thư viện thử nghiệm React, MSW, Supertest
- **Thực hành tốt nhất**: 
- Kiểm tra thành phần thành phần
- Gửi biểu mẫu thử nghiệm
- Phản hồi API giả
- Thay đổi trạng thái thử nghiệm
- Xác minh cập nhật DOM
- Kiểm tra định tuyến và điều hướng
- Sử dụng dữ liệu thử nghiệm thực tế

### Kiểm thử đầu cuối

- **Mục tiêu**: Hoàn thành luồng người dùng từ UI đến phần phụ trợ
- **Mục tiêu bao phủ**: Đường dẫn kinh doanh quan trọng và hành trình của người dùng
- **Công cụ**: Cypress, Playwright
- **Thực hành tốt nhất**: 
- Tập trung vào hành trình quan trọng của người dùng
- Kiểm tra trên nhiều trình duyệt
- Sử dụng bộ chọn ổn định (data-testid)
- Thiết lập môi trường thử nghiệm bị cô lập
- Quản lý dữ liệu thử nghiệm hiệu quả
- Chụp ảnh màn hình trên thất bại
- Triển khai logic thử lại cho các bài kiểm tra không ổn định

### Kiểm tra hồi quy trực quan

- **Mục tiêu**: Giao diện và bố cục UI
- **Mục tiêu bao phủ**: Các thành phần và trang UI chính
- **Công cụ**: Percy, Chromatic, Playwright
- **Thực hành tốt nhất**: 
- Chụp ảnh màn hình cơ sở
- Kiểm tra trên nhiều chế độ xem khác nhau
- Bỏ qua nội dung động
- Xem xét cẩn thận các thay đổi trực quan
- Kiểm tra chế độ sáng/tối
- Kiểm tra với độ dài nội dung khác nhau
- Tích hợp với quy trình CI/CD

### Kiểm tra khả năng truy cập

- **Mục tiêu**: Các vấn đề về khả năng truy cập và tuân thủ WCAG
- **Mục tiêu bao phủ**: Tất cả các thành phần và trang hướng đến người dùng
- **Công cụ**: axe, Lighthouse, WAVE
- **Thực hành tốt nhất**: 
- Kiểm tra điều hướng bàn phím
- Xác minh khả năng tương thích của trình đọc màn hình
- Kiểm tra độ tương phản màu
- Kiểm tra quản lý tiêu điểm
- Xác minh các thuộc tính ARIA
- Kiểm tra với hỗ trợ công nghệ
- Tự động kiểm tra khả năng truy cập cơ bản

### Kiểm tra hiệu suất

- **Mục tiêu**: Thời gian tải trang, hiệu suất hiển thị
- **Mục tiêu bao phủ**: Các trang chính và đường dẫn người dùng quan trọng
- **Công cụ**: Lighthouse, WebPageTest, k6
- **Thực hành tốt nhất**: 
- Đo lường Core Web Vitals
- Kiểm tra trên các thiết bị cấp thấp
- Mô phỏng điều tiết mạng
- Theo dõi kích thước gói
- Kiểm tra với các kịch bản lưu trữ đệm thực tế
- Đo thời gian tương tác
- Đặt ngân sách hiệu suất

## Thực hành kiểm tra

### Tổ chức kiểm tra

- Nhóm các bài kiểm tra một cách hợp lý theo tính năng hoặc thành phần
- Sử dụng tên tệp mô tả và mô tả kiểm tra
- Tách biệt các tiện ích và đồ đạc kiểm tra
- Tổ chức các bài kiểm tra theo thứ bậc phản ánh cơ sở mã
- Giữ các tệp kiểm tra gần với mã mà chúng kiểm tra
- Sử dụng quy ước đặt tên nhất quán
- Tách biệt các bài kiểm tra đơn vị, tích hợp và e2e

### Quản lý dữ liệu kiểm tra

- Sử dụng nhà máy hoặc trình xây dựng để kiểm tra dữ liệu
- Tránh dữ liệu thử nghiệm được mã hóa cứng
- Sử dụng dữ liệu thực tế phù hợp với các mẫu sản xuất
- Đặt lại trạng thái thử nghiệm giữa các lần thử nghiệm
- Cô lập môi trường thử nghiệm
- Xem xét quyền riêng tư dữ liệu trong dữ liệu thử nghiệm
- Sử dụng dữ liệu ngẫu nhiên được gieo cho các trường hợp ngoại lệ

### Mô phỏng & Stubbing

- Mô phỏng các phụ thuộc bên ngoài (API, dịch vụ)
- Sử dụng phản hồi mô phỏng thực tế
- Đặt lại mô phỏng giữa các lần thử nghiệm
- Tránh mô phỏng quá mức
- Mô phỏng ở mức thích hợp
- Ghi lại hành vi mô phỏng
- Sử dụng MSW để mô phỏng API

### Tích hợp liên tục

- Chạy thử nghiệm trên mọi yêu cầu kéo
- Triển khai thực hiện thử nghiệm song song
- Thiết lập báo cáo thử nghiệm và bảng thông tin
- Cấu hình thông báo lỗi thử nghiệm
- Triển khai thử nghiệm lại cho các thử nghiệm không ổn định
- Lưu trữ các phụ thuộc thử nghiệm
- Chạy các loại thử nghiệm khác nhau ở các giai đoạn thích hợp

## Phát triển theo hướng thử nghiệm (TDD)

- Viết thử nghiệm trước khi triển khai các tính năng
- Thực hiện chu kỳ Đỏ-Xanh-Tái cấu trúc
- Bắt đầu bằng các trường hợp thử nghiệm đơn giản
- Tăng dần độ phức tạp
- Sử dụng các bài kiểm tra để thúc đẩy thiết kế
- Kiểm tra lại khi mã phát triển
- Tập trung vào hành vi, không phải triển khai

## Bảo trì kiểm tra

- Thường xuyên xem xét và cập nhật các bài kiểm tra
- Xóa hoặc sửa các bài kiểm tra không ổn định
- Kiểm tra lại các bài kiểm tra với các thay đổi về mã
- Theo dõi hiệu suất kiểm tra
- Phân tích phạm vi kiểm tra thường xuyên
- Tài liệu về chiến lược kiểm tra
- Đào tạo các thành viên trong nhóm về các hoạt động kiểm tra

## Kiểm tra chuyên biệt

### Kiểm tra API

- Kiểm tra tất cả các điểm cuối API
- Xác minh lược đồ yêu cầu/phản hồi
- Kiểm tra xác thực và ủy quyền
- Kiểm tra xử lý lỗi và mã trạng thái
- Xác thực logic kinh doanh
- Kiểm tra giới hạn tỷ lệ và hạn ngạch
- Tài liệu về các trường hợp kiểm tra API

### Kiểm tra quản lý trạng thái

- Kiểm tra chuyển đổi trạng thái
- Xác minh trạng thái ban đầu
- Kiểm tra bộ giảm tốc và hành động
- Kiểm tra bộ chọn và trạng thái phái sinh
- Mô phỏng các phụ thuộc bên ngoài
- Kiểm tra các thay đổi trạng thái không đồng bộ
- Xác minh tính bền vững của trạng thái

### Kiểm tra biểu mẫu

- Kiểm tra gửi biểu mẫu
- Xác thực đầu vào biểu mẫu
- Kiểm tra trạng thái lỗi
- Kiểm tra chức năng đặt lại biểu mẫu
- Kiểm tra logic biểu mẫu có điều kiện
- Xác minh khả năng truy cập của các thành phần biểu mẫu
- Kiểm tra biểu mẫu có điều hướng bằng bàn phím

### Kiểm tra bảo mật

- Kiểm tra luồng xác thực
- Xác minh kiểm tra ủy quyền
- Kiểm tra các lỗ hổng phổ biến (XSS, CSRF)
- Xác thực vệ sinh đầu vào
- Kiểm tra bảo mật tải tệp lên
- Xác minh tiêu đề bảo mật
- Kiểm tra so với OWASP Top 10