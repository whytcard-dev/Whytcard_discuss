# Tiêu chuẩn hiệu suất web

## Mục tiêu hiệu suất

- Điểm Lighthouse: 90+ cho tất cả các số liệu
- Mục tiêu Core Web Vitals:
- LCP (Largest Contentful Paint): < 2,5 giây
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0,1
- INP (Interaction to Next Paint): < 200ms
- Thời gian tương tác: < 3 giây
- First Contentful Paint: < 1,8 giây
- Tổng trọng lượng trang: < 1MB (lý tưởng nhất là < 500KB)
- Yêu cầu HTTP: < 50 trên mỗi trang

## Tối ưu hóa hình ảnh

- Sử dụng định dạng WebP/AVIF với các phương án dự phòng cho các trình duyệt cũ hơn
- Triển khai hình ảnh phản hồi với các thuộc tính `srcset` và `sizes`
- Tải chậm hình ảnh bên dưới phần gấp
- Định kích thước hình ảnh phù hợp (tránh phục vụ hình ảnh lớn được thu nhỏ thông qua CSS)
- Sử dụng CDN hình ảnh để thay đổi kích thước động khi có thể
- Tối ưu hóa SVG và xóa siêu dữ liệu không cần thiết
- Nén tất cả hình ảnh bằng các công cụ như ImageOptim, TinyPNG hoặc Squoosh
- Cân nhắc kỹ thuật làm mờ để tải dần

## Tối ưu hóa JavaScript

- Triển khai phân tách mã và nhập động
- Hoãn JavaScript không quan trọng
- Sử dụng tree-shaking để loại bỏ mã chết
- Thu nhỏ và nén các tệp JavaScript
- Tránh JavaScript chặn hiển thị
- Sử dụng web workers cho các tác vụ tốn nhiều CPU
- Triển khai ưu tiên yêu cầu
- Tối ưu hóa các tập lệnh của bên thứ ba và sử dụng các thuộc tính async/defer

## Tối ưu hóa CSS

- Thu nhỏ và nội tuyến CSS quan trọng
- Xóa CSS không sử dụng bằng các công cụ như PurgeCSS
- Tránh nhập CSS (thay vào đó hãy sử dụng nối)
- Sử dụng CSS chứa cho các thành phần độc lập
- Tối ưu hóa bộ chọn CSS để tăng hiệu suất
- Cân nhắc tác động của CSS-in-JS đến hiệu suất
- Sử dụng các biến CSS để bảo trì tốt hơn
- Triển khai phân tách mã CSS cho các ứng dụng 

## Tối ưu hóa phông chữ 

- Sử dụng phông chữ hệ thống khi có thể
- Triển khai font-display: swap hoặc tùy chọn
- Phông chữ con để chỉ bao gồm các ký tự cần thiết
- Tự lưu trữ phông chữ thay vì sử dụng dịch vụ của bên thứ ba
- Tải trước các phông chữ quan trọng
- Sử dụng phông chữ biến đổi cho nhiều kiểu/độ đậm nhạt
- Giới hạn các biến thể phông chữ (độ đậm nhạt, kiểu) 

## Chiến lược lưu trữ đệm 

- Triển khai các chính sách lưu trữ đệm hiệu quả 
- Lưu trữ đệm dài cho các tài sản tĩnh (1 năm trở lên) 
- Lưu trữ đệm ngắn/không lưu trữ đệm cho HTML 
- Sử dụng tên tệp có phiên bản hoặc chuỗi truy vấn để phá vỡ bộ nhớ đệm 
- Triển khai các công nhân dịch vụ để hỗ trợ ngoại tuyến 
- Sử dụng localStorage/IndexedDB để lưu trữ đệm phía máy khách 
- Cấu hình đúng tiêu đề bộ nhớ đệm HTTP 
- Triển khai bộ nhớ đệm CDN 

## Tối ưu hóa máy chủ 

- Bật HTTP/2 hoặc HTTP/3 
- Triển khai nén phía máy chủ (Brotli/Gzip) 
- Sử dụng CDN để phân phối nội dung toàn cầu 
- Tối ưu hóa phản hồi API (phân trang, chọn trường) 
- Triển khai edge tính toán cho nội dung động
- Cấu hình cài đặt CORS phù hợp
- Tối ưu hóa Thời gian đến Byte đầu tiên (TTFB)
- Sử dụng gợi ý kết nối trước, tìm nạp trước và tải trước HTTP

## Tối ưu hóa thiết bị di động

- Ưu tiên hiệu suất thiết bị di động (phương pháp ưu tiên thiết bị di động)
- Tối ưu hóa mục tiêu cảm ứng (tối thiểu 44×44px)
- Giảm tải trọng mạng cho thiết bị di động
- Triển khai các mẫu thiết kế phản hồi
- Kiểm tra trên thiết bị di động thực tế, không chỉ trình giả lập
- Cân nhắc giảm chuyển động cho hoạt ảnh
- Tối ưu hóa cho các tình huống kết nối kém/ngoại tuyến

## Giám sát & Kiểm tra

- Triển khai Giám sát người dùng thực (RUM)
- Thiết lập giám sát tổng hợp cho luồng người dùng quan trọng
- Sử dụng WebPageTest để phân tích hiệu suất chi tiết
- Giám sát Core Web Vitals trong Google Search Console
- Thiết lập ngân sách hiệu suất và cảnh báo
- Thực hiện kiểm toán hiệu suất thường xuyên
- Triển khai thử nghiệm A/B để cải thiện hiệu suất
- Sử dụng bảng điều khiển Hiệu suất của Chrome DevTools để lập hồ sơ

## Kỹ thuật nâng cao

- Triển khai gợi ý tài nguyên (kết nối trước, tải trước, tìm nạp trước)
- Sử dụng trình quan sát giao lộ để tải chậm
- Xem xét kết xuất phía máy chủ hoặc tạo trang web tĩnh
- Triển khai mẫu stale-while-revalidate
- Sử dụng requestIdleCallback cho các tác vụ không quan trọng
- Xem xét nhập bản đồ để tải mô-đun
- Triển khai tìm nạp trước dự đoán dựa trên hành vi của người dùng
- Sử dụng gợi ý ưu tiên cho các tài nguyên quan trọng