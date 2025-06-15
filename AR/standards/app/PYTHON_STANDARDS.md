# معايير بايثون لمشروع WhytCard

## مقدمة

تُحدد هذه الوثيقة المعايير وأفضل الممارسات الواجب اتباعها لتطوير بايثون في مشروع WhytCard. تهدف هذه القواعد إلى ضمان اتساق الكود، وقابليته للصيانة، وجودته العالية في جميع أجزاء قاعدة الكود.

## جدول المحتويات

1. [اتفاقيات الأسلوب](#style-conventions)
2. [بنية الكود](#code-structure)
3. [التوثيق](#documentation)
4. [الاختبار](#testing)
5. [معالجة الأخطاء](#error-handling)
6. [الأداء](#performance)
7. [الأمان](#security)
8. [مواصفات الكشط](#scraping-specifics)
9. [الأدوات الموصى بها](#recommended-tools)

## اتفاقيات الأسلوب

### PEP 8

نتبع بدقة [PEP 8](https://www.python.org/dev/peps/pep-0008/)، دليل أسلوب بايثون الرسمي، مع بعض التعديلات الخاصة بـ WhytCard.

### المسافة البادئة والتنسيق

- استخدم **4 مسافات** للمسافة البادئة (بدون علامات تبويب)
- حدد جميع الأسطر بـ **88 حرفًا كحد أقصى** (المعيار الأسود)
- استخدم أسطرًا فارغة لفصل الدوال والفئات، بالإضافة إلى كتل التعليمات البرمجية الكبيرة داخل الدوال.
- استخدم المسافات حول العوامل وبعد الفواصل.

```python
# جيد
def calculate_total(price, amount=1):
total = price * amount
return total

# سيئ
def calculate_total(price,quantity = 1):
total=price*quantity
return total
```

### اصطلاحات التسمية

- **الوحدات النمطية والحزم**: أسماء قصيرة، بأحرف صغيرة، بدون شرطات سفلية (`scraper.py`، `utils.py`)
- **الفئات**: CamelCase (`ScrapingConfig`، `معالج البيانات`)
- **الدوال والمتغيرات**: snake_case (`extract_data()`، `user_agent`)
- **الثوابت**: UPPER_SNAKE_CASE (`MAX_RETRIES`، `DEFAULT_TIMEOUT`)
- **المتغيرات "الخاصة"**: مسبوقة بشرطة سفلية (`_internal_cache`)
- **الأسماء الوصفية**: إعطاء الأولوية للوضوح على الإيجاز

```python
# جيد
class UserDataProcessor:
def __init__(self):

self.MAX_BATCH_SIZE = 100

self._temp_storage = {}


def process_user_data(self, user_data):
pass

# سيئ
class Processor:
def __init__(self):
self.max = 100
self.temp = {}

def process(self, d):
pass
```

### عمليات الاستيراد

- نظّم عمليات الاستيراد في ثلاثة أقسام، مفصولة بسطر فارغ:

1. عمليات استيراد المكتبات القياسية

2. عمليات استيراد مكتبات الجهات الخارجية

3. عمليات استيراد المشاريع المحلية
- يجب ترتيب كل قسم أبجديًا
- يُفضّل الاستيراد الصريح على الاستيراد العام

```python
# جيد
import os
import sys
من الكتابة import Dict, List, Optional

import aiohttp
import bs4
من fastapi import HTTPException

من scraping.utils import URLUtils
من utils.logging import setup_logger

# سيئ
من scraping.utils import *
import aiohttp, bs4
import sys, نظام التشغيل
```

## بنية الكود

### تنظيم الوحدات

- يجب أن تكون لكل وحدة مسؤولية واحدة محددة جيدًا.
- استخدم الحزم لتنظيم الوحدات ذات الصلة.
- أنشئ ملف `__init__.py` لكل حزمة، مع عرض واجهة برمجة التطبيقات العامة بوضوح.

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

### الفئات والوظائف

- اتبع مبدأ المسؤولية الفردية (SRP)
- حدّ حجم الوظيفة إلى الحد الأقصى ٥٠ سطرًا
- حد أقصى لحجم الصنف ٣٠٠ سطر
- استخدم دوال ثابتة أو دوال مستقلة للعمليات التي لا تعتمد على حالة المثيل

```python
# جيد
معالج بيانات الفئة:
def process_data(self, data):
clean_data = self._clean_data(data)
return self._transform_data(cleaned_data)


def _clean_data(self, data):
# منطق التنظيف
return clean_data


def _transform_data(self, data):
# منطق التحويل
return transformed_data

# سيئ
معالج بيانات الفئة:
def process_data(self, data):
# ٢٠٠ سطر من الكود تجمع بين التنظيف والتحويل
return result
```

### الكتابة الثابتة

- استخدم تعليقات توضيحية للنوع لجميع الدوال و الأساليب
- استخدم وحدة "الكتابة" للأنواع المعقدة
- استثناءات التوثيق التي قد تُثار

```python
من الكتابة استيراد Dict، قائمة، اختياري، اتحاد، أي

def fetch_data(url: str، timeout: Optional[int] = None) -> Dict[str، أي]:
"""

يجلب البيانات من عنوان URL المحدد.


الوسيطات:
url: عنوان URL للاستعلام

مهلة: المهلة بالثواني


الإرجاع:

قاموس يحتوي على البيانات المستردة


يُثار:
استثناء HTTP: في حال فشل الطلب

""
# التنفيذ
```

## التوثيق

### سلاسل التوثيق

- استخدم سلاسل التوثيق لجميع الوحدات والفئات والطرق والوظائف
- اتبع تنسيق جوجل لسلاسل التوثيق
- معلمات التوثيق، وقيم الإرجاع، و استثناءات

```python
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]:
"""

يستخرج جميع الروابط من صفحة HTML مع نصوصها وسماتها.


الوسيطات:
html: محتوى HTML للصفحة

base_url: عنوان URL الأساسي لحل الروابط النسبية


الإرجاع:
قائمة القواميس التي تحتوي على معلومات الرابط


الرفع:

خطأ القيمة: إذا كان HTML غير صالح

""
```

### التعليقات

- استخدم التعليقات لشرح "السبب"، وليس "المعنى".
- علّق على الكود المعقد أو غير البديهي.
- تجنب التعليقات القديمة أو المكررة.

```python
# جيد
# استخدم حدًا زمنيًا قدره 5 ثوانٍ لتجنب انقطاعات العمل المتكررة على المواقع البطيئة.

المهلة = 5

# سيئ
# اضبط مهلة زمنية
مهلة زمنية = 5
```

## الاختبار

### هيكل الاختبار

- استخدم pytest لجميع الاختبارات
- نظّم الاختبارات في هيكل يعكس الكود المصدري
- سمِّ ملفات الاختبار بالبادئة `test_`
- سمِّ دوال الاختبار بالبادئة `test_`

``` 
scraping/
scraper.py
utils.py
tests/
scraping/
test_scraper.py
test_utils.py
```

### تغطية الاختبار

- استهدف تغطية 80% على الأقل من الاختبار
- اختبر جميع مسارات الكود الحرجة
- أدرج اختبارات للحالات الحدية وحالات الخطأ

```python
def test_scrape_url_success():
# اختبر الحالة الاسمية

def test_scrape_url_timeout():
# اختبر الحالة التي عنوان URL لا يستجيب

def test_scrape_url_invalid_url():
# اختبار باستخدام عنوان URL غير صالح
```

### اختبارات غير متزامنة

- استخدم `pytest-asyncio` لاختبار الكود غير المتزامن
- استخدم نماذج محاكاة لاستدعاءات الشبكة في الاختبارات

```python
import pytest

@pytest.mark.asyncio
async def test_async_function():
result = await async_function()
assert result == expected_result
```

## معالجة الأخطاء

### الاستثناءات

- إنشاء استثناءات مخصصة للأخطاء الخاصة بالتطبيق
- استخدام استثناءات بايثون القياسية عند الاقتضاء
- توثيق جميع الاستثناءات التي قد تُثار

```python
class ScrapingException(Exception):
"""استثناء أساسي لأخطاء الكشط."""
تمرير

استثناء تحديد المعدل (استثناء الاستقصاء):
"""يُثار عند الوصول إلى حد المعدل."""
تمرير
```

### معالجة الأخطاء

- استخدم كتل المحاولة/الاستثناء لمعالجة الأخطاء بشكل صحيح
- تجنب التقاط الاستثناءات بشكل عام
- سجل الأخطاء بسياق كافٍ لتصحيحها

```python
try:
result = await scraper.scrape_url(url)
except RateLimitException:
logger.warning(f"تم الوصول إلى حد المعدل لـ {url}، إعادة المحاولة بعد التأخير")
await asyncio.sleep(RATE_LIMIT_DELAY)
result = await scraper.scrape_url(url)
except ScrapingException as e:
logger.error(f"فشل استخراج {url}: {str(e)}")
رفع
```

## الأداء

### غير متزامن

- استخدم `asyncio` للعمليات كثيفة الإدخال/الإخراج
- استخدم `aiohttp` لطلبات HTTP غير المتزامنة
- قلل عدد المهام المتزامنة لتجنب التحميل الزائد

```python
async def scrape_batch(urls: List[str], max_concurrent: int = 10):

semaphore = asyncio.Semaphore(max_concurrent)


async def _scrape_with_semaphore(url):

async with semaphore:
return await scrape_url(url)

task = [_scrape_with_semaphore(url) for url in urls]

return await asyncio.gather(*tasks, return_exceptions=True)
```

### التحسينات

- استخدم هياكل بيانات مناسبة للعمليات الشائعة (قواميس للبحث المتكرر)
- تجنب النسخ غير الضرورية للبيانات الكبيرة
- استخدم المولدات لمعالجة كميات كبيرة من البيانات
- تخزين العمليات الحسابية أو الطلبات المكلفة مؤقتًا

```python
# استخدام المولدات لمعالجة مجموعات البيانات الكبيرة
def process_large_dataset(file_path):
with open(file_path, 'r') as f:
for line in f:
yield process_line(line)
```

## الأمان

### التحقق من صحة المدخلات

- تحقق دائمًا من صحة مدخلات المستخدم
- استخدم Pydantic للتحقق من صحة البيانات
- لا تثق أبدًا بالبيانات الخارجية

```python
from pydantic import BaseModel, HttpUrl, validator

class ScrapingRequest(BaseModel):
url: HttpUrl
depth: int = 1

@validator('depth')
def validate_depth(cls, v):
if v < 1 or v > 3:
raise ValueError('يجب أن يكون العمق بين 1 و3')
return v
```

### إدارة الأسرار

- لا تُضمّن الأسرار (كلمات المرور، مفاتيح API) في الكود المصدري.
- استخدم متغيرات البيئة أو ملفات التكوين الآمنة.
- استخدم python-dotenv لتحميل متغيرات البيئة.

```python
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
if not API_KEY:
raise EnvironmentError("لم يتم تعيين متغير بيئة API_KEY")
```

## تفاصيل الاستخلاص

### احترام ملفات robots.txt

- احترم ملفات robots.txt دائمًا
- نفّذ فترات تأخير بين الطلبات
- عرّف نفسك بشكل صحيح باستخدام وكيل مستخدم مناسب

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def can_fetch(url: str, user_agent: str) -> bool:
"""يتحقق مما إذا كان من الممكن جلب عنوان URL وفقًا لملف robots.txt."""
parser = RobotFileParser()
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt"
parser.set_url(robots_url)
parser.read()
return parser.can_fetch(user_agent, url)
```

### إدارة الجلسات

- إعادة استخدام جلسات HTTP لتحسين الأداء
- إغلاق الجلسات بشكل صحيح بعد الاستخدام
- استخدام سياقات غير متزامنة لضمان إغلاق الموارد

```python
async def scrape_with_session():
async with aiohttp.ClientSession() as session:
# استخدام الجلسة لجميع الطلبات

result1 = await fetch_url(session, url1)
result2 = await fetch_url(session, url2)
# تُغلق الجلسة تلقائيًا هنا
```

### تحليل HTML

- استخدام `lxml` كمحلل لـ BeautifulSoup لتحسين الأداء
- استخدام محددات CSS أو XPath للتنقل في DOM
- معالجة الحالات التي لا توجد فيها عناصر متوقعة

```python
from bs4 import BeautifulSoup

def extract_title(html: str) -> اختياري[str]:
soup = BeautifulSoup(html, "lxml")
title_tag = soup.find("title")
return title_tag.text if title_tag else None
```

## أدوات مُوصى بها

### التدقيق والتنسيق

- **Black**: مُنسّق أكواد تلقائي
- **isort**: مُفرز استيراد تلقائي
- **flake8**: مُدقق لكشف الأخطاء ومشاكل التنسيق
- **mypy**: فحص النوع الثابت

### التكوين المُوصى به

ملف `pyproject.toml`:

```toml
[tool.black]

line-length = 88
target-version = ['py38']
include = '\.pyi?$'

[tool.isort]
profile = "black"
line_length = ٨٨

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
max-line-length = ٨٨
extend-ignore = E203
exclude = .git,__pycache__,build,dist
```

### تكامل CI

قم بتكوين هذه الأدوات في مسار CI للتحقق من الكود تلقائيًا:

```yaml
# مثال لإجراءات GitHub
الاسم: فحص بايثون

تشغيل: [push, pull_request]

الوظائف:
lint:
runs-on: أحدث إصدار من أوبونتو
الخطوات:
- الاستخدامات: actions/checkout@v2
- الاسم: إعداد بايثون
- الاستخدامات: actions/setup-python@v2
- مع:
python-version: '3.8'
- الاسم: تثبيت التبعيات
- التشغيل: |

python -m pip install --upgrade pip
- pip install black isort flake8 mypy
- الاسم: تشغيل أدوات التحسين
- التشغيل: |

black --check .

isort --check .

flake8 .
mypy .
```

---

## الخاتمة

صُممت هذه المعايير لضمان جودة كود بايثون وقابليته للصيانة واتساقه في مشروع WhytCard. يُرجى من جميع المساهمين اتباع هذه الإرشادات. إذا كانت لديكم أي أسئلة أو اقتراحات للتحسين، يُرجى مشاركتها مع الفريق.

---

آخر تحديث: ١٥ يناير ٢٠٢٥