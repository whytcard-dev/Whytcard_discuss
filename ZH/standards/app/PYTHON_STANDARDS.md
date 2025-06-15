# WhytCard 的 Python 标准

## 简介

本文档定义了 WhytCard 项目中 Python 开发应遵循的标准和最佳实践。这些规则旨在确保整个代码库的代码一致、可维护且高质量。

## 目录

1. [样式约定](#style-conventions)
2. [代码结构](#code-structure)
3. [文档](#documentation)
4. [测试](#testing)
5. [错误处理](#error-handling)
6. [性能](#performance)
7. [安全性](#security)
8. [抓取细节](#scraping-specifics)
9. [推荐工具](#recommended-tools)

## 样式约定

### PEP 8

我们严格遵循 Python 官方样式指南 [PEP 8](https://www.python.org/dev/peps/pep-0008/)，并针对 WhytCard 做了一些特定的调整。

### 缩进和格式

- 使用 **4 个空格** 进行缩进（不使用制表符）
- 所有行**最多 88 个字符**（黑色标准）
- 使用空行分隔函数、类以及函数内的大段代码
- 在运算符周围和逗号后使用空格

```python
# 好
def calculate_total(price, amount=1):
total = price * amount
return total

# 不好
def calculate_total(price, amount = 1):
total=price* amount
return total
```

### 命名约定

- **模块和包**：简短、小写的名称，不带下划线（`scraper.py`、`utils.py`）
- **类**：驼峰命名法（`ScrapingConfig`、`DataProcessor`）
- **函数和变量**：蛇形命名法 (`extract_data()`, `user_agent`)
- **常量**: 大写蛇形命名法 (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **“私有”变量**: 以下划线为前缀 (`_internal_cache`)
- **描述性名称**: 清晰优先于简洁

```python
# 好
class UserDataProcessor:
def __init__(self):
self.MAX_BATCH_SIZE = 100
self._temp_storage = {}

def process_user_data(self, user_data):
pass

# 不好
class Processor:
def __init__(self):
self.max = 100
self.temp = {}

def process(self, d):
pass
```

###导入

- 将导入文件组织成三个部分，并用空行分隔：
1. 标准库导入
2. 第三方库导入
3. 本地项目导入
- 每个部分应按字母顺序排序
- 优先使用显式导入，而不是泛型导入

```python
# 好的做法
导入 os
导入 sys
从 Typing 导入 Dict、List、Optional

导入 aiohttp
导入 bs4
从 fastapi 导入 HTTPException

从 scraping.utils 导入 URLUtils
从 utils.logging 导入 setup_logger

# 不好的做法
从 scraping.utils 导入 *
导入 aiohttp、bs4
导入 sys、os
```

## 代码结构

### 模块组织

- 每个模块应具有单一且定义明确的职责
- 使用包来组织相关模块
- 为每个包创建一个 `__init__.py` 文件，并清晰地公开 API

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

### 类和函数

- 遵循单一职责原则 (SRP)
- 函数大小限制为最多 50 行
- 类大小限制为最多 300 行
- 对于不依赖于实例状态的操作，使用静态方法或独立函数

```python
# 好
class DataProcessor:
def process_data(self, data):
cleaned_data = self._clean_data(data)
return self._transform_data(cleaned_data)

def _clean_data(self, data):
# 清理逻辑
return cleaned_data

def _transform_data(self, data):
# 转换逻辑
return transformed_data

# 错误
class DataProcessor:
def process_data(self, data):
# 200 行代码混合了清理和转换
返回结果
```

### 静态类型

- 对所有函数和方法使用类型注解
- 对复杂类型使用 `typing` 模块
- 记录可能引发的异常

```python
from Typing import Dict, List, Optional, Union, Any

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]:
"""
从指定的 URL 获取数据。

Args:
url:要查询的 URL
timeout：超时时间（秒）


返回：
包含检索到的数据的字典


抛出：
HTTPException：如果请求失败
"""
# 实现
```

## 文档

### 文档字符串

- 对所有模块、类、方法和函数使用文档字符串
- 遵循 Google 的文档字符串格式
- 记录参数、返回值和异常

```python
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]:
"""
从 HTML 页面中提取所有链接及其文本和属性。


参数：
html：页面的 HTML 内容
base_url：用于解析相对链接的基准 URL


返回：
包含链接信息的字典列表


抛出：
ValueError：如果 HTML 无效
"""
```

### 注释

- 使用注释解释“为什么”，而不是“什么”
- 注释复杂或不直观的代码
- 避免使用过时或多余的注释

```python
# 好
# 使用 5 秒限制，避免在速度慢的网站上频繁超时
timeout = 5

# 坏
# 设置超时
timeout = 5
```

## 测试

### 测试结构

- 使用 pytest 进行所有测试
- 使用与源代码相同的结构组织测试
- 使用 `test_` 前缀命名测试文件
- 使用 `test_` 前缀命名测试函数

```
scraping/
scraper.py
utils.py
tests/
scraping/
test_scraper.py
test_utils.py
```

### 测试覆盖率

- 目标至少 80% 的测试覆盖率
- 测试所有关键代码路径
- 包含边缘情况和错误条件的测试

```python
def test_scrape_url_success():
# 测试正常情况

def test_scrape_url_timeout():
# 测试 URL 无响应的情况

def test_scrape_url_invalid_url():
# 使用无效 URL 进行测试
```

### 异步测试

- 使用 `pytest-asyncio` 测试异步代码
- 在测试中使用模拟代码进行网络调用

```python
import pytest

@pytest.mark.asyncio
async def test_async_function():
result = await async_function()
assert result == expected_result
```

## 错误处理

### 异常

- 创建自定义异常应用程序特定的错误
- 适当时使用标准 Python 异常
- 记录所有可能引发的异常

```python
class ScrapingException(Exception):
"""抓取错误的基本异常。"""
pass

class RateLimitException(ScrapingException):
"""达到速率限制时引发。"""
pass
```

### 错误处理

- 使用 try/except 块适当处理错误
- 避免泛型捕获异常
- 记录错误并包含足够的上下文以便调试

```python
try:
result = await scraper.scrape_url(url)
except RateLimitException:
logger.warning(f"{url} 的速率已达到限制，延迟后重试")
await asyncio.sleep(RATE_LIMIT_DELAY)
result = await scraper.scrape_url(url)
except ScrapingException as e:
logger.error(f"无法抓取 {url}: {str(e)}")
raise
```

## 性能

### 异步

- 使用 `asyncio` 进行 I/O 密集型操作
- 使用 `aiohttp` 进行异步 HTTP 请求
- 限制并发任务数以避免过载

```python
async def scrape_batch(urls: List[str], max_concurrent: int = 10):
semaphore = asyncio.Semaphore(max_concurrent)

async def _scrape_with_semaphore(url):
async with semaphore:
return await scrape_url(url)

tasks = [_scrape_with_semaphore(url) for url in urls]
return await asyncio.gather(*tasks, return_exceptions=True)
```

### 优化

- 为常用操作使用合适的数据结构（例如，频繁查找时使用字典）
- 避免不必要的大数据复制
- 使用生成器处理大量数据
- 缓存开销大的计算或请求

```python
# 使用生成器处理大型数据集
def process_large_dataset(file_path):
with open(file_path, 'r') as f:
for line in f:
yield process_line(line)
```

## 安全性

### 输入验证

- 始终验证用户输入
- 使用 Pydantic 进行数据验证
- 切勿信任外部数据

```python
from pydantic import BaseModel, HttpUrl, validator

class ScrapingRequest(BaseModel):
url: HttpUrl
depth: int = 1

@validator('depth')
def validate_depth(cls, v):
如果 v < 1 或 v > 3:
抛出 ValueError('深度必须介于 1 和 3 之间')
返回 v
```

### 密钥管理

- 切勿在源代码中包含密钥（密码、API 密钥）
- 使用环境变量或安全配置文件
- 使用 python-dotenv 加载环境变量

```python
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
if not API_KEY:
抛出 EnvironmentError("API_KEY 环境变量未设置")
```

## 数据抓取细节

### 遵守 robots.txt 文件

- 始终遵守 robots.txt 文件
- 在请求之间设置延迟
- 使用适当的身份验证User-Agent

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def can_fetch(url: str, user_agent: str) -> bool:
"""根据 robots.txt 检查 URL 是否可获取。"""
parser = RobotFileParser()
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt"
parser.set_url(robots_url)
parser.read()
return parser.can_fetch(user_agent, url)
```

### 会话管理

- 重用 HTTP 会话以提高性能
- 使用后正确关闭会话
- 使用异步上下文确保资源关闭

```python
async def scrape_with_session():
async with aiohttp.ClientSession() as session:
# 所有请求均使用会话
result1 = await fetch_url(session, url1)
result2 = await fetch_url(session, url2)
# 会话在此自动关闭
```

### HTML 解析

- 使用 `lxml` 作为 BeautifulSoup 的解析器以获得更佳性能
- 使用 CSS 或 XPath 选择器进行 DOM 导航
- 处理预期元素不存在的情况

```python
from bs4 import BeautifulSoup

def extract_title(html: str) -> Optional[str]:
soup = BeautifulSoup(html, "lxml")
title_tag = soup.find("title")
return title_tag.text if title_tag else None
```

## 推荐工具

### 代码检查和格式化

- **Black**：自动代码格式化程序
- **isort**：自动导入排序器
- **flake8**：用于检测错误和样式问题的 Linter
- **mypy**：静态类型检查

### 推荐配置

`pyproject.toml` 文件：

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

`.flake8` 文件：

```
[flake8]
max-line-length = 88
extend-ignore = E203
exclude = .git,__pycache__,build,dist
```

### CI 集成

在您的 CI 流水线中配置以下工具以自动检查代码：

```yaml
# GitHub Actions 示例
名称：Python Linting

on：[push, pull_request]

jobs：
lint：
runs-on：ubuntu-latest
步骤：
- uses：actions/checkout@v2
- name：设置 Python
uses：actions/setup-python@v2
with：
python-version：'3.8'
- name：安装依赖项
run：|
python -m pip install --upgrade pip
pip install black isort flake8 mypy
- name：运行 linters
run：|
black --check .
isort --check .
flake8 .
mypy .
```

---

## 结论

这些标准旨在确保 WhytCard 项目中 Python 代码的质量、可维护性和一致性。所有贡献者都应遵循这些准则。如果您有任何疑问或改进建议，请随时与团队分享。

---

最后更新时间：2025-01-15