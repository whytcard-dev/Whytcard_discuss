# Tiêu chuẩn thiết kế UI/UX

## Nguyên tắc thiết kế

- **Tính nhất quán**: Duy trì tính nhất quán về mặt hình ảnh và chức năng trên toàn bộ trang web
- **Tính rõ ràng**: Thiết kế giao diện rõ ràng giúp giảm thiểu tải nhận thức
- **Phản hồi**: Cung cấp phản hồi rõ ràng cho mọi tương tác của người dùng
- **Hiệu quả**: Giảm thiểu các bước để hoàn thành nhiệm vụ
- **Sự tha thứ**: Cho phép người dùng hoàn tác các hành động và phục hồi sau lỗi
- **Khả năng truy cập**: Thiết kế cho người dùng ở mọi khả năng
- **Tính đơn giản**: Giữ giao diện đơn giản và trực quan

## Thiết kế trực quan

### Hệ thống màu

- Xác định bảng màu chính, phụ và nhấn mạnh
- Bao gồm các màu ngữ nghĩa (thành công, cảnh báo, lỗi, thông tin)
- Đảm bảo tỷ lệ tương phản đủ (WCAG AA tối thiểu: 4,5:1 cho văn bản thông thường)
- Xác định các biến màu cho chế độ sáng và tối
- Giới hạn bảng màu ở mức 5-7 màu cốt lõi với các biến thể
- Tài liệu hướng dẫn sử dụng màu sắc và ý nghĩa
- Kiểm tra màu sắc để phát hiện mù màu khả năng truy cập

### Kiểu chữ

- Chọn một phông chữ chính cho UI và một phông chữ phụ cho nội dung (nếu cần)
- Xác định một tỷ lệ kiểu chữ rõ ràng với các kích thước giới hạn (ví dụ: 12, 14, 16, 18, 24, 30, 36, 48px)
- Duy trì chiều cao dòng thích hợp (1,4-1,6 cho văn bản chính)
- Đảm bảo kích thước phông chữ tối thiểu là 16px cho văn bản chính
- Xác định độ đậm của phông chữ (thường, trung bình, đậm)
- Đặt khoảng cách chữ thích hợp
- Đảm bảo văn bản vẫn có thể đọc được trên mọi nền
- Sử dụng đơn vị tương đối (rem/em) thay vì pixel

### Khoảng cách & Bố cục

- Tạo một tỷ lệ khoảng cách nhất quán (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Triển khai khoảng đệm và lề nhất quán
- Sử dụng hệ thống lưới để căn chỉnh và cấu trúc
- Duy trì khoảng trắng thích hợp để dễ đọc
- Xác định khoảng cách thành phần chuẩn
- Đảm bảo phân cấp nội dung phù hợp
- Triển khai các mẫu bố cục phản hồi

### Hình ảnh & Biểu tượng

- Sử dụng kiểu biểu tượng và kích thước nhất quán
- Đảm bảo biểu tượng dễ nhận biết và có ý nghĩa
- Cung cấp các lựa chọn thay thế văn bản cho biểu tượng
- Tối ưu hóa hình ảnh để tăng hiệu suất
- Triển khai hình ảnh phản hồi
- Duy trì tỷ lệ khung hình ảnh nhất quán
- Sử dụng SVG cho biểu tượng và hình minh họa đơn giản

## Thành phần & Mẫu

### Thư viện thành phần

- Xây dựng thư viện thành phần toàn diện
- Ghi lại cách sử dụng và các biến thể của thành phần
- Đảm bảo thành phần có thể truy cập được
- Tạo thành phần phản hồi
- Xác định trạng thái thành phần (mặc định, di chuột, hoạt động, lấy nét, tắt)
- Triển khai các mẫu hoạt ảnh nhất quán
- Tạo các mẫu có thể tái sử dụng cho các nhu cầu UI phổ biến

### Điều hướng

- Triển khai điều hướng rõ ràng và nhất quán
- Cung cấp các chỉ báo trực quan cho vị trí hiện tại
- Đảm bảo điều hướng có thể truy cập bằng bàn phím
- Làm cho các mục điều hướng mang tính mô tả
- Giới hạn điều hướng chính ở mức 7±2 mục
- Cung cấp điều hướng phụ cho các trang web phức tạp
- Triển khai đường dẫn để điều hướng sâu cấu trúc 

### Biểu mẫu 

- Nhóm các trường biểu mẫu liên quan
- Cung cấp nhãn rõ ràng cho tất cả các trường biểu mẫu
- Hiển thị lỗi xác thực trực tuyến
- Chỉ ra các trường bắt buộc
- Sử dụng các kiểu nhập liệu phù hợp
- Triển khai thứ tự tab hợp lý
- Hiển thị thông báo lỗi hữu ích
- Cung cấp xác nhận thành công
- Duy trì trạng thái trong khi gửi biểu mẫu có lỗi

### Nội dung 

- Tạo nội dung có thể quét được với các tiêu đề rõ ràng
- Sử dụng danh sách có dấu đầu dòng cho nhiều mục
- Giữ cho các đoạn văn ngắn (3-5 dòng)
- Sử dụng các tiêu đề phụ có ý nghĩa
- Triển khai phân cấp nội dung phù hợp
- Đảm bảo khả năng đọc (điểm đọc Flesch)
- Sử dụng ngôn ngữ đơn giản (tránh thuật ngữ chuyên ngành)

## Thiết kế tương tác

### Tương tác nhỏ

- Thiết kế hoạt ảnh tinh tế, có mục đích
- Giữ hoạt ảnh dưới 300ms để phản hồi UI
- Cung cấp phản hồi trực quan cho tất cả các tương tác
- Đảm bảo hoạt ảnh không ảnh hưởng đến khả năng sử dụng
- Triển khai các mẫu chuyển tiếp nhất quán
- Sử dụng hoạt ảnh để hướng dẫn chú ý
- Tôn trọng các tùy chọn chuyển động giảm

### Trạng thái & Phản hồi

- Thiết kế tất cả các trạng thái của phần tử tương tác:
- Mặc định
- Di chuột
- Tập trung
- Hoạt động
- Tắt
- Cung cấp phản hồi ngay lập tức cho các hành động của người dùng
- Hiển thị trạng thái hệ thống rõ ràng
- Sử dụng các chỉ báo tải phù hợp
- Triển khai các trạng thái lỗi hướng dẫn giải pháp
- Thiết kế các trạng thái trống cho danh sách và hiển thị dữ liệu

### Di động & Cảm ứng

- Thiết kế cho các mục tiêu cảm ứng (tối thiểu 44×44px)
- Tính đến các vùng ngón tay cái trên thiết bị di động
- Triển khai các tương tác dựa trên cử chỉ một cách nhất quán
- Tránh các tương tác phụ thuộc vào việc di chuột trên thiết bị di động
- Thiết kế cho cả hướng dọc và hướng ngang
- Đảm bảo các mục tiêu chạm có đủ khoảng cách
- Tối ưu hóa để sử dụng bằng một tay khi có thể

## Trải nghiệm người dùng

### Nguyên tắc khả năng sử dụng

- Thực hiện theo các mẫu thiết kế được công nhận
- Giảm thiểu tải nhận thức
- Làm cho các hành động quan trọng trở nên rõ ràng
- Cung cấp các lời kêu gọi hành động rõ ràng
- Thiết kế các giao diện có thể dự đoán được
- Ưu tiên nội dung theo tầm quan trọng
- Loại bỏ sự phức tạp không cần thiết

### Thiết kế đáp ứng

- Triển khai phương pháp thiết kế ưu tiên thiết bị di động
- Xác định các điểm ngắt chuẩn (ví dụ: 320px, 768px, 1024px, 1440px)
- Điều chỉnh bố cục phù hợp cho từng điểm ngắt
- Đảm bảo giao diện thân thiện với cảm ứng trên thiết bị di động
- Kiểm tra trên thiết bị thực tế, không chỉ trình giả lập
- Xem xét khả năng và hạn chế của thiết bị
- Tối ưu hóa hiệu suất cho mạng di động

### Khả năng truy cập (WCAG)

- Tuân thủ tối thiểu các tiêu chuẩn WCAG 2.1 AA
- Đảm bảo khả năng điều hướng bàn phím
- Cung cấp độ tương phản màu đủ
- Bao gồm các thuộc tính ARIA phù hợp
- Tạo biểu mẫu có thể truy cập được
- Kiểm tra bằng trình đọc màn hình
- Hỗ trợ thay đổi kích thước văn bản lên đến 200%
- Triển khai các chỉ báo tiêu điểm
- Cung cấp văn bản thay thế cho hình ảnh
- Tạo bảng dữ liệu có thể truy cập được

## Nghiên cứu & Kiểm tra

### Nghiên cứu người dùng

- Tiến hành phỏng vấn và khảo sát người dùng
- Tạo personas dựa trên bằng chứng
- Lập bản đồ hành trình của người dùng
- Xác định các điểm khó khăn và cơ hội
- Xác thực các giả định với người dùng thực
- Sử dụng phân tích để thông báo các quyết định thiết kế
- Triển khai các cơ chế phản hồi liên tục

### Kiểm tra khả năng sử dụng

- Kiểm tra thiết kế với người dùng đại diện
- Tiến hành cả các bài kiểm tra có kiểm duyệt và không có kiểm duyệt
- Kiểm tra trên nhiều thiết bị và trình duyệt khác nhau
- Đo lường tỷ lệ hoàn thành nhiệm vụ
- Thu thập phản hồi định tính
- Lặp lại dựa trên kết quả kiểm tra
- Kiểm tra bằng các công nghệ hỗ trợ