# Tiêu chuẩn cấu trúc dự án

## Tổ chức thư mục

### Cấu trúc gốc

```
project-root/
├── src/ # Mã nguồn
├── public/ # Tài sản tĩnh
├── dist/ # Đầu ra bản dựng (đã tạo)
├── node_modules/ # Phụ thuộc (đã tạo)
├── tests/ # Tệp thử nghiệm
├── docs/ # Tài liệu
├── .github/ # Quy trình làm việc và mẫu GitHub
├── .vscode/ # Cấu hình VS Code
├── scripts/ # Bản dựng và tập lệnh tiện ích
├── package.json # Siêu dữ liệu và phụ thuộc của dự án
├── tsconfig.json # TypeScript cấu hình 
├── .eslintrc.js # Cấu hình ESLint 
├── .prettierrc # Cấu hình Prettier 
├── .gitignore # Git bỏ qua các mẫu 
├── .env.example # Biến môi trường ví dụ 
└── README.md # Tài liệu dự án 
``` 

### Cấu trúc thư mục nguồn 

``` 
src/ 
├── asset/ # Tài sản tĩnh cần xử lý 
│ ├── images/ # Hình ảnh 
│ ├── fonts/ # Tệp phông chữ 
│ └── styles/ # Kiểu toàn cục 
│ 
├── components/ # Thành phần giao diện người dùng có thể tái sử dụng 
│ ├── common/ # Các thành phần được chia sẻ trên các tính năng
│ ├── layout/ # Các thành phần bố cục
│ └── ui/ # Các thành phần UI cơ bản
│ 
├── hooks/ # Các hook React tùy chỉnh
│ 
├── pages/ # Các thành phần trang / các thành phần tuyến đường
│ 
├── features/ # Các mô-đun dựa trên tính năng
│ ├── feature1/ # Tính năng cụ thể
│ │ ├── components/ # Các thành phần dành riêng cho tính năng
│ │ ├── hooks/ # Các hook dành riêng cho tính năng
│ │ ├── api/ # Các lệnh gọi API dành riêng cho tính năng
│ │ ├── utils/ # Tiện ích dành riêng cho tính năng
│ │ ├── types/ # Các loại dành riêng cho tính năng
│ │ └── index.ts # Xuất tính năng
│ └── feature2/ # Một tính năng khác
│ 
├── services/ # Tích hợp dịch vụ
│ ├── api/ # Máy khách API và điểm cuối
│ ├── auth/ # Dịch vụ xác thực
│ └── analytics/ # Dịch vụ phân tích
│ 
├── store/ # Quản lý trạng thái
│ ├── slice/ # Các lát cắt Redux hoặc nhà cung cấp ngữ cảnh
│ ├── actions/ # Hành động creator 
│ └── selectors/ # Bộ chọn trạng thái 
│ 
├── utils/ # Hàm tiện ích 
│ ├── formatting/ # Tiện ích định dạng 
│ ├── validation/ # Tiện ích xác thực 
│ └── helpers/ # Hàm trợ giúp 
│ 
├── types/ # Định nghĩa kiểu TypeScript 
│ ├── api/ # Kiểu phản hồi API 
│ ├── models/ # Kiểu mô hình dữ liệu 
│ └── common/ # Định nghĩa kiểu chung 
│ 
├── constants/ # Hằng ứng dụng 
│ 
├── i18n/ # Quốc tế hóa
│ ├── locales/ # Tệp dịch
│ └── config.ts # Cấu hình i18n
│
├── config/ # Cấu hình ứng dụng
│ ├── routes.ts # Định nghĩa tuyến đường
│ └── settings.ts # Cài đặt ứng dụng
│ 
└── App.tsx # Thành phần ứng dụng chính
```

## Quy ước đặt tên

### Tệp và thư mục

- **Thành phần React**: PascalCase có phần mở rộng
- `Button.tsx`, `UserProfile.tsx`
- **Móc**: camelCase có tiền tố 'use'
- `useAuth.ts`, `useFetch.ts`
- **Tiện ích**: camelCase
- `formatDate.ts`, `validateEmail.ts`
- **Hằng số**: UPPER_SNAKE_CASE
- `API_ENDPOINTS.ts`, `ROUTE_PATHS.ts`
- **Kiểu/Giao diện**: PascalCase với tên mô tả
- `UserData.ts`, `ApiResponse.ts`
- **Tệp thử nghiệm**: Tên giống với tệp đang được thử nghiệm với hậu tố `.test` hoặc `.spec`
- `Button.test.tsx`, `formatDate.spec.ts`

### Tổ chức thành phần

- **Tệp thành phần**: Một thành phần cho mỗi tệp
- **Cấu trúc thành phần**: 
```tsx 
// Nhập 
import React from 'react'; 
import './styles.css'; 

// Các loại 
interface ButtonProps { 
// ... 
} 

// Thành phần 
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => { 
// ... 
return ( 
// JSX 
); 
}; 

// Các hàm trợ giúp dành riêng cho thành phần này 
const helperFunction = () => { 
// ... 
}; 
``` 

## Tổ chức mô-đun 

### Thứ tự nhập 

1. Thư viện bên ngoài 
2. Mô-đun bên trong 
3. Thành phần 
4. Móc 
5. Tiện ích 
6. Các loại 
7. Tài sản/kiểu 

Ví dụ: 
```tsx 
// Thư viện bên ngoài 
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

// Các mô-đun nội bộ
import { API_ENDPOINTS } từ '@/constants/api'; 
import { fetchData } từ '@/services/api'; 

// Các thành phần
import { Button } từ '@/components/ui'; 
import { Modal } từ '@/components/common'; 

// Các móc
import { useAuth } từ '@/hooks'; 

// Các tiện ích
import { formatDate } từ '@/utils/formatting'; 

// Các loại
import type { UserData } từ '@/types'; 

// Tài sản/kiểu 
import './styles.css'; 
```

### Mẫu xuất

- Sử dụng xuất có tên cho hầu hết các thành phần và hàm
- Sử dụng xuất barrel (index.ts) để đơn giản hóa nhập
- Tránh xuất mặc định ngoại trừ các thành phần trang

Ví dụ xuất barrel:
```tsx
// components/ui/index.ts
export * from './Button';
export * from './Input';
export * from './Card';
```

## Tệp cấu hình

### Biến môi trường

- Sử dụng tệp `.env` cho cấu hình dành riêng cho môi trường
- Bao gồm `.env.example` với tài liệu
- Sử dụng tệp dành riêng cho môi trường (`.env.development`, `.env.production`)
- Không bao giờ cam kết các giá trị nhạy cảm với kiểm soát phiên bản

### Cấu hình TypeScript

- Sử dụng chế độ nghiêm ngặt
- Cấu hình bí danh đường dẫn để nhập sạch hơn
- Tách riêng các cấu hình cho các môi trường khác nhau nếu cần
- Ghi lại các lựa chọn cấu hình không rõ ràng

### Quản lý gói

- Sử dụng tệp khóa (package-lock.json, yarn.lock, pnpm-lock.yaml)
- Ghi lại phiên bản Node.js bắt buộc
- Nhóm các phụ thuộc một cách hợp lý trong package.json
- Tách riêng các phụ thuộc dev khỏi các phụ thuộc production

## Tài liệu

### Tài liệu mã

- Ghi lại các hàm và thành phần phức tạp
- Sử dụng JSDoc để ghi lại tài liệu hàm
- Ghi lại các thuộc tính cho các thành phần React
- Bao gồm các ví dụ cho các thành phần có thể tái sử dụng
- Tài liệu về các mẫu quản lý trạng thái

### Tài liệu dự án

- Bao gồm README.md toàn diện
- Tài liệu về quy trình thiết lập và cài đặt
- Bao gồm hướng dẫn quy trình phát triển
- Tài liệu về quy trình xây dựng và triển khai
- Duy trì CHANGELOG.md để biết lịch sử phiên bản
- Bao gồm các hướng dẫn đóng góp

## Thực hành tốt nhất

- Nhóm các tệp liên quan lại với nhau
- Giữ các tệp thành phần nhỏ và tập trung
- Tách logic kinh doanh khỏi các thành phần UI
- Sử dụng bí danh đường dẫn để tránh các đường dẫn nhập sâu
- Duy trì tổ chức tệp nhất quán trong toàn bộ dự án
- Tài liệu về cấu trúc dự án cho các thành viên nhóm mới
- Sử dụng trình tạo mã để đảm bảo tính nhất quán khi áp dụng
- Xem xét và sắp xếp lại cấu trúc dự án định kỳ