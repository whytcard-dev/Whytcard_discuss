# Tiêu chuẩn Python cho WhytCard

## Giới thiệu

Tài liệu này định nghĩa các tiêu chuẩn và phương pháp hay nhất cần tuân theo để phát triển Python trong dự án WhytCard. Các quy tắc này nhằm đảm bảo mã nhất quán, có thể bảo trì và chất lượng cao trong toàn bộ cơ sở mã.

## Mục lục

1. [Quy ước về phong cách](#style-conventions)
2. [Cấu trúc mã](#code-structure)
3. [Tài liệu](#documentation)
4. [Kiểm thử](#testing)
5. [Xử lý lỗi](#error-handling)
6. [Hiệu suất](#performance)
7. [Bảo mật](#security)
8. [Thông số cụ thể về thu thập dữ liệu](#scraping-specifics)
9. [Công cụ được đề xuất](#recommended-tools)

## Quy ước về phong cách

### PEP 8

Chúng tôi tuân thủ nghiêm ngặt [PEP 8](https://www.python.org/dev/peps/pep-0008/), hướng dẫn về phong cách Python chính thức, với một số điều chỉnh cụ thể cho WhytCard.

### Thụt lề và Định dạng

- Sử dụng **4 khoảng trắng** để thụt lề (không có tab)
- Giới hạn tất cả các dòng ở mức **tối đa 88 ký tự** (Tiêu chuẩn Black)
- Sử dụng các dòng trống để phân tách các hàm và lớp, cũng như các khối mã lớn trong các hàm
- Sử dụng khoảng trắng xung quanh các toán tử và sau dấu phẩy

```python
# Tốt
def calculate_total(price, quantity=1):
total = price * quantity
return total

# Xấu
def calculate_total(price,quantity = 1):
total=price*quantity
return total
```

### Quy ước đặt tên

- **Mô-đun và gói**: Tên viết thường, ngắn, không có dấu gạch dưới (`scraper.py`, `utils.py`)
- **Các lớp**: CamelCase (`ScrapingConfig`, `DataProcessor`)
- **Các hàm và biến**: snake_case (`extract_data()`, `user_agent`)
- **Hằng số**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **Biến "Riêng tư"**: Có tiền tố là dấu gạch dưới (`_internal_cache`)
- **Tên mô tả**: Ưu tiên sự rõ ràng hơn là sự ngắn gọn

```python
# Tốt
lớp UserDataProcessor:

def __init__(self):

self.MAX_BATCH_SIZE = 100

self._temp_storage = {}


def process_user_data(self, user_data):

pass

# Xấu
lớp Processor:

def __init__(self):

self.max = 100

self.temp = {}


def process(self, d):

pass 
``` 

### Nhập 

- Sắp xếp các mục nhập thành ba phần được phân tách bằng một dòng trống: 
1. Nhập thư viện chuẩn 
2. Nhập thư viện của bên thứ ba 
3. Nhập dự án cục bộ 
- Mỗi phần phải được sắp xếp theo thứ tự bảng chữ cái 
- Ưu tiên nhập rõ ràng hơn nhập chung 

```python 
# Tốt 
import os 
import sys 
from typing import Dict, List, Optional 

import aiohttp 
import bs4 
from fastapi import HTTPException 

from scraping.utils import URLUtils 
from utils.logging import setup_logger 

# Xấu 
from scraping.utils import * 
import aiohttp, bs4 
import sys, os 
``` 

## Cấu trúc mã 

### Tổ chức mô-đun 

- Mỗi mô-đun phải có một trách nhiệm duy nhất, được xác định rõ ràng 
- Sử dụng các gói để sắp xếp các mô-đun liên quan 
- Tạo một Tệp `__init__.py` cho mỗi gói, hiển thị rõ ràng API công khai

```python
# scraping/__init__.py
from .scraper import AdvancedScraper, ScrapingConfig, ScrapingMode
from .utils import URLUtils, ContentExtractor

__all__ = [ 
"AdvancedScraper", 
"ScrapingConfig", 
"ScrapingMode", 
"URLUtils", 
"ContentExtractor"
]
```

### Lớp và hàm

- Tuân theo Nguyên tắc trách nhiệm đơn (SRP)
- Giới hạn kích thước hàm ở mức tối đa 50 dòng
- Giới hạn kích thước lớp ở mức tối đa 300 dòng
- Sử dụng các phương thức tĩnh hoặc hàm độc lập cho các hoạt động không phụ thuộc vào trạng thái của thể hiện

```python
# Tốt
class DataProcessor: 
def process_data(self, data): 
washed_data = self._clean_data(data) 
return self._transform_data(cleaned_data) 

def _clean_data(self, data): 
# Logic dọn dẹp 
return cleanse_data 

def _transform_data(self, data): 
# Logic chuyển đổi 
return converted_data 

# Bad
class DataProcessor: 
def process_data(self, data): 
# 200 dòng mã kết hợp giữa dọn dẹp và chuyển đổi 
return result 
``` 

### Kiểu tĩnh 

- Sử dụng chú thích kiểu cho tất cả các hàm và phương thức 
- Sử dụng mô-đun `typing` cho các kiểu phức tạp 
- Ghi lại các ngoại lệ có thể phát sinh 

```python 
from typing import Dict, List, Optional, Union, Any 

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]: 
""" 
Lấy dữ liệu từ URL đã chỉ định. 

Đối số: 
url: URL để truy vấn 
timeout: Hết thời gian chờ tính bằng giây 

Trả về: 
Từ điển chứa dữ liệu đã truy xuất 

Nâng lên: 
HTTPException: Nếu yêu cầu không thành công 
""" 
# Triển khai 
``` 

## Tài liệu 

### Docstrings 

- Sử dụng docstrings cho tất cả các mô-đun, lớp, phương thức và hàm 
- Thực hiện theo định dạng của Google cho docstrings 
- Tham số tài liệu, giá trị trả về và ngoại lệ 

```python 
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]: 
""" 
Trích xuất tất cả các liên kết từ một trang HTML cùng với văn bản và thuộc tính của chúng. 

Đối số: 
html: Nội dung HTML của trang 
base_url: URL cơ sở để giải quyết các liên kết tương đối 

Trả về: 
Danh sách các từ điển chứa thông tin liên kết 

Raises: 
ValueError: Nếu HTML không hợp lệ 
""" 
``` 

### Bình luận 

- Sử dụng bình luận để giải thích "tại sao", không phải "cái gì" 
- Bình luận mã phức tạp hoặc không trực quan 
- Tránh bình luận lỗi thời hoặc thừa 

```python 
# Tốt 
# Sử dụng giới hạn 5 giây để tránh hết thời gian chờ thường xuyên trên các trang web chậm 
timeout = 5 

# Xấu 
# Đặt thời gian chờ 
timeout = 5 
``` 

## Kiểm tra 

### Cấu trúc kiểm tra 

- Sử dụng pytest cho tất cả các bài kiểm tra 
- Tổ chức các bài kiểm tra trong một cấu trúc phản ánh mã nguồn 
- Đặt tên cho các tệp kiểm tra với tiền tố `test_` 
- Đặt tên cho các hàm kiểm tra với tiền tố `test_` 

``` 
scraping/ 
scraper.py 
utils.py 
tests/ 
scraping/ 
test_scraper.py 
test_utils.py 
``` 

### Phạm vi kiểm tra 

- Mục tiêu là phạm vi kiểm tra ít nhất 80% 
- Kiểm tra tất cả các đường dẫn mã quan trọng 
- Bao gồm các bài kiểm tra cho các trường hợp ngoại lệ và điều kiện lỗi 

```python 
def test_scrape_url_success(): 
# Kiểm tra trường hợp danh nghĩa 

def test_scrape_url_timeout(): 
# Kiểm tra trường hợp URL không phản hồi 

def test_scrape_url_invalid_url(): 
# Kiểm tra với URL không hợp lệ 
``` 

### Kiểm tra không đồng bộ 

- Sử dụng `pytest-asyncio` để kiểm tra mã không đồng bộ 
- Sử dụng bản mô phỏng cho các cuộc gọi mạng trong các bài kiểm tra 

```python 
import pytest 

@pytest.mark.asyncio 
async def test_async_function(): 
result = await async_function() 
assert result == expected_result 
``` 

## Xử lý lỗi 

### Ngoại lệ 

- Tạo ngoại lệ tùy chỉnh cho các lỗi cụ thể của ứng dụng 
- Sử dụng ngoại lệ Python chuẩn khi thích hợp 
- Ghi lại tất cả các ngoại lệ có thể được đưa ra 

```python 
class ScrapingException(Exception): 
"""Ngoại lệ cơ sở cho lỗi thu thập dữ liệu.""" 
pass 

class RateLimitException(ScrapingException): 
"""Được đưa ra khi đạt đến giới hạn tốc độ.""" 
pass 
``` 

### Xử lý lỗi 

- Sử dụng các khối try/except để xử lý lỗi một cách thích hợp 
- Tránh bắt Ngoại lệ chung chung 
- Ghi nhật ký lỗi với đủ ngữ cảnh để gỡ lỗi 

```python 
try: 
result = await scraper.scrape_url(url) 
except RateLimitException: 
logger.warning(f"Đã đạt đến giới hạn tốc độ cho {url}, đang thử lại sau khi trì hoãn") 
await asyncio.sleep(RATE_LIMIT_DELAY) 
result = await scraper.scrape_url(url)
except ScrapingException as e: 
logger.error(f"Không thể scrape {url}: {str(e)}") 
raise 
``` 

## Hiệu suất 

### Không đồng bộ 

- Sử dụng `asyncio` cho các hoạt động đòi hỏi nhiều I/O 
- Sử dụng `aiohttp` cho các yêu cầu HTTP không đồng bộ 
- Giới hạn số lượng tác vụ đồng thời để tránh quá tải 

```python 
async def scrape_batch(urls: List[str], max_concurrent: int = 10): 
semaphore = asyncio.Semaphore(max_concurrent) 

async def _scrape_with_semaphore(url): 
async with semaphore: 
return await scrape_url(url) 

tasks = [_scrape_with_semaphore(url) cho url trong url] 
return await asyncio.gather(*tasks, return_exceptions=True) 
``` 

### Tối ưu hóa 

- Sử dụng cấu trúc dữ liệu phù hợp cho các hoạt động chung (từ điển để tra cứu thường xuyên) 
- Tránh sao chép dữ liệu lớn không cần thiết 
- Sử dụng trình tạo để xử lý lượng dữ liệu lớn 
- Lưu trữ đệm các phép tính hoặc yêu cầu tốn kém 

```python 
# Sử dụng trình tạo để xử lý các tập dữ liệu lớn 
def process_large_dataset(file_path): 
with open(file_path, 'r') as f: 
for line in f: 
yield process_line(line) 
``` 

## Bảo mật 

### Xác thực đầu vào 

- Luôn xác thực đầu vào của người dùng 
- Sử dụng Pydantic để xác thực dữ liệu 
- Không bao giờ tin tưởng dữ liệu bên ngoài 

```python
from pydantic import BaseModel, HttpUrl, validator

class ScrapingRequest(BaseModel):
url: HttpUrl
depth: int = 1

@validator('depth')
def validate_depth(cls, v):
if v < 1 or v > 3:
raise ValueError('Depth must be between 1 and 3')
return v
```

### Quản lý bí mật

- Không bao giờ bao gồm bí mật (mật khẩu, khóa API) trong mã nguồn
- Sử dụng biến môi trường hoặc tệp cấu hình an toàn
- Sử dụng python-dotenv để tải biến môi trường

```python
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
if not API_KEY:
raise EnvironmentError("API_KEY environment variable is not set") 
```

## Thông số cụ thể về việc thu thập dữ liệu

### Tôn trọng robots.txt

- Luôn tôn trọng các tệp robots.txt
- Triển khai độ trễ giữa các yêu cầu
- Xác định đúng bản thân với User-Agent phù hợp

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def can_fetch(url: str, user_agent: str) -> bool: 
"""Kiểm tra xem URL có thể được truy xuất theo robots.txt hay không.""" 
parser = RobotFileParser() 
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt" 
parser.set_url(robots_url) 
parser.read() 
return parser.can_fetch(user_agent, url) 
``` 

### Quản lý phiên 

- Tái sử dụng các phiên HTTP để cải thiện hiệu suất
- Đóng phiên đúng cách sau khi sử dụng
- Sử dụng ngữ cảnh không đồng bộ để đảm bảo đóng tài nguyên

```python
async def scrape_with_session():
async with aiohttp.ClientSession() as session:
# Sử dụng phiên cho tất cả các yêu cầu
result1 = await fetch_url(session, url1)
result2 = await fetch_url(session, url2)
# Phiên được tự động đóng tại đây
```

### Phân tích cú pháp HTML

- Sử dụng `lxml` làm trình phân tích cú pháp cho BeautifulSoup để có hiệu suất tốt hơn
- Sử dụng bộ chọn CSS hoặc XPath để điều hướng DOM
- Xử lý các trường hợp không tồn tại các phần tử mong đợi

```python
from bs4 import BeautifulSoup

def extract_title(html: str) -> Optional[str]:
soup = BeautifulSoup(html, "lxml")
title_tag = soup.find("title") 
return title_tag.text if title_tag else None 
``` 

## Công cụ được đề xuất 

### Linting và Định dạng 

- **Black**: Trình định dạng mã tự động 
- **isort**: Trình sắp xếp nhập tự động 
- **flake8**: Linter để phát hiện lỗi và các vấn đề về kiểu 
- **mypy**: Kiểm tra kiểu tĩnh 

### Cấu hình được đề xuất 

```toml 
[tool.black] 
line-length = 88 
target-version = ['py38'] 
include = '\.pyi?$' 

[tool.isort] 
profile = "black" 
line_length = 88 

[tool.mypy] 
python_version = "3.8" 
warn_return_any = true 
warn_unused_configs = true
disallow_untyped_defs = true
disallow_incomplete_defs = true
```

`.flake8` file:

```
[flake8]

max-line-length = 88
extend-ignore = E203
exclude = .git,__pycache__,build,dist
```

### Tích hợp CI

Cấu hình các công cụ này trong đường ống CI của bạn để tự động kiểm tra mã:

```yaml
# Ví dụ về GitHub Actions
name: Python Linting

on: [push, pull_request]

jobs:
lint:
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v2
- name: Thiết lập Python
uses: actions/setup-python@v2
with:

python-version: '3.8'
- name: Cài đặt các phụ thuộc
run: | 
python -m pip install --upgrade pip 
pip install black isort flake8 mypy 
- name: Chạy các trình kiểm tra lỗi 
run: | 
black --check . 
isort --check . 
flake8 . 
mypy . 
``` 

--- 

## Kết luận

Các tiêu chuẩn này được thiết kế để đảm bảo chất lượng, khả năng bảo trì và tính nhất quán của mã Python trong dự án WhytCard. Tất cả những người đóng góp đều phải tuân theo các hướng dẫn này. Nếu bạn có câu hỏi hoặc đề xuất cải tiến, vui lòng chia sẻ với nhóm. 

--- 

Cập nhật lần cuối: 2025-01-15