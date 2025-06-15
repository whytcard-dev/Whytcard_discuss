# WhytCard için Python Standartları 

## Giriş 

Bu belge, WhytCard projesinde Python geliştirme için uyulması gereken standartları ve en iyi uygulamaları tanımlar. Bu kurallar, kod tabanında tutarlı, sürdürülebilir ve yüksek kaliteli kod sağlamayı amaçlar. 

## İçindekiler 

1. [Stil Sözleşmeleri](#stil-sözleşmeleri) 
2. [Kod Yapısı](#kod-yapısı) 
3. [Belgeler](#belgeler) 
4. [Test](#test) 
5. [Hata İşleme](#hata-işleme) 
6. [Performans](#performans) 
7. [Güvenlik](#güvenlik) 
8. [Özellikleri Kazıma](#scraping-specifics) 
9. [Önerilen Araçlar](#önerilen-araçlar) 

## Stil Sözleşmeleri 

### PEP 8 

WhytCard için bazı özel uyarlamalarla birlikte resmi Python stil kılavuzu [PEP 8](https://www.python.org/dev/peps/pep-0008/)'i kesinlikle takip ediyoruz. 

### Girinti ve Biçimlendirme

- Girinti için **4 boşluk** kullanın (sekme yok)
- Tüm satırları **en fazla 88 karakter** ile sınırlayın (Siyah standart)
- İşlevleri ve sınıfları ve işlevler içindeki büyük kod bloklarını ayırmak için boş satırlar kullanın
- Operatörlerin etrafında ve virgüllerden sonra boşluk kullanın

```python 
# İyi 
def calculate_total(price, amount=1): 
total = price * amount 
return total 

# Kötü 
def calculate_total(price,quantity = 1): 
total=price*quantity 
return total 
``` 

### Adlandırma Kuralları 

- **Modüller ve paketler**: Kısa, küçük harfli adlar, alt çizgi olmadan (`scraper.py`, `utils.py`) 
- **Sınıflar**: CamelCase (`ScrapingConfig`, `DataProcessor`) 
- **İşlevler ve değişkenler**: snake_case (`extract_data()`, `user_agent`) 
- **Sabitler**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`) 
- **"Özel" değişkenler**: Alt çizgiyle öneki (`_internal_cache`) 
- **Açıklayıcı adlar**: Kısalıktan çok açıklığa öncelik verin 

```python 
# İyi 
sınıf UserDataProcessor: 
def __init__(self): 
self.MAX_BATCH_SIZE = 100 
self._temp_storage = {} 

def process_user_data(self, user_data): 
pass 

# Kötü 
sınıf Processor: 
def __init__(self): 
self.max = 100 
self.temp = {} 

def process(self, d): 
pass 
``` 

### İçe Aktarımlar 

- İçe aktarımları boş bir satırla ayrılmış üç bölüme düzenleyin: 
1. Standart kitaplık içe aktarımları 
2. Üçüncü taraf kitaplık içe aktarımları 
3. Yerel proje içe aktarımları 
- Her bölüm alfabetik olarak sıralanmalıdır 
- Genel içe aktarımlar yerine açık içe aktarımları tercih edin 

```python 
# İyi 
import os 
import sys 
from typing import Dict, List, Optional 

import aiohttp 
import bs4 
from fastapi import HTTPException 

from scraping.utils import URLUtils 
from utils.logging import setup_logger 

# Kötü 
from scraping.utils import * 
import aiohttp, bs4 
import sys, os 
``` 

## Kod Yapı 

### Modül Organizasyonu 

- Her modülün tek, iyi tanımlanmış bir sorumluluğu olmalıdır 
- İlgili modülleri düzenlemek için paketleri kullanın 
- Her paket için genel API'yi açıkça ortaya koyan bir `__init__.py` dosyası oluşturun 

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

### Sınıflar ve Fonksiyonlar 

- Tek Sorumluluk İlkesini (SRP) izleyin 
- Fonksiyon boyutunu maksimum 50 satırla sınırlayın 
- Sınıf boyutunu maksimum 300 satır 
- Örnek durumuna bağlı olmayan işlemler için statik yöntemler veya bağımsız işlevler kullanın 

```python 
# İyi 
sınıf Veri İşlemcisi: 
def process_data(self, data): 
cleaning_data = self._clean_data(data) 
return self._transform_data(cleaned_data) 

def _clean_data(self, data): 
# Temizleme mantığı 
return cleaning_data 

def _transform_data(self, data): 
# Dönüştürme mantığı 
return transformed_data 

# Kötü 
sınıf Veri İşlemcisi: 
def process_data(self, data): 
# Temizleme ve dönüştürmeyi karıştıran 200 satır kod 
return result 
``` 

### Statik Yazma 

- Tüm işlevler ve yöntemler için tür açıklamaları kullanın 
- Karmaşık işlemler için `typing` modülünü kullanın türler 
- Ortaya çıkabilecek istisnaları belgele 

```python 
from typing import Dict, List, Optional, Union, Any 

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]: 
""" 
Belirtilen URL'den veri alır. 

Argümanlar: 
url: Sorgulanacak URL 
timeout: Saniye cinsinden zaman aşımı 

Döndürür: 
Alınan verileri içeren sözlük 

Yükseltir: 
HTTPException: İstek başarısız olursa 
""" 
# Uygulama 
``` 

## Belgeler 

### Belge dizeleri 

- Tüm modüller, sınıflar, yöntemler ve işlevler için belge dizelerini kullan 
- Belge dizeleri için Google biçimini izle 
- Parametreleri, dönüş değerlerini ve istisnaları belgele 

```python 
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]: 
""" 
Bir HTML sayfasından tüm bağlantıları, metinleri ve öznitelikleriyle birlikte çıkarır. 

Argümanlar: 
html: Sayfanın HTML içeriği 
base_url: Göreceli bağlantıları çözmek için temel URL 

Döndürür: 
Bağlantı bilgilerini içeren sözlüklerin listesi 

Yükseltir: 
ValueError: HTML geçersizse 
""" 
``` 

### Yorumlar 

- "Ne"yi değil, "neden"i açıklamak için yorumları kullanın 
- Karmaşık veya sezgisel olmayan kod yorumları 
- Güncel olmayan veya gereksiz yorumlardan kaçının 

```python 
# İyi 
# Yavaş sitelerde sık sık zaman aşımı yaşamamak için 5 saniyelik bir sınır kullanın 
timeout = 5 

# Kötü 
# Zaman aşımını ayarlayın 
timeout = 5 
``` 

## Test 

### Test Yapısı 

- Tüm testler için pytest kullanın 
- Testleri kaynak kodunu yansıtan bir yapıda düzenleyin 
- Test dosyalarını `test_` önekiyle adlandırın 
- Test işlevlerini `test_` önekiyle adlandırın 

``` 
scraping/ 
scraper.py 
utils.py 
tests/ 
scraping/ 
test_scraper.py 
test_utils.py 
``` 

### Test Kapsamı 

- En az %80 test kapsamını hedefleyin 
- Tüm kritik kod yollarını test edin 
- Uç durumlar ve hata koşulları için testleri ekleyin 

```python 
def test_scrape_url_success(): 
# Nominal durumu test edin 

def test_scrape_url_timeout(): 
# URL'nin yanıt vermediği durumu test edin 

def test_scrape_url_invalid_url(): 
# Geçersiz bir URL ile test edin 
``` 

### Eşzamansız Testler 

- Eşzamansız kodu test etmek için `pytest-asyncio` kullanın 
- Testlerde ağ çağrıları için mock'ları kullanın 

```python 
import pytest 

@pytest.mark.asyncio 
async def test_async_function(): 
result = await async_function() 
assert result == expected_result 
``` 

## Hata İşleme 

### İstisnalar 

- Uygulamaya özgü hatalar için özel istisnalar oluşturun 
- Uygun olduğunda standart Python istisnalarını kullanın 
- Ortaya çıkabilecek tüm istisnaları belgelendirin 

```python 
class ScrapingException(Exception): 
"""Kazıma hataları için temel istisna.""" 
pass 

class RateLimitException(ScrapingException): 
"""Bir oran sınırına ulaşıldığında yükseltilir.""" 
pass 
``` 

### Hata İşleme 

- Hataları uygun şekilde işlemek için try/except bloklarını kullanın 
- İstisnayı genel olarak yakalamaktan kaçının 
- Hataları hata ayıklama için yeterli bağlamla günlüğe kaydedin 

```python 
try: 
result = await scraper.scrape_url(url) 
except RateLimitException: 
logger.warning(f"{url} için oran sınırına ulaşıldı, gecikmeden sonra yeniden deneniyor") 
await asyncio.sleep(RATE_LIMIT_DELAY) 
result = await scraper.scrape_url(url) 
except ScrapingException as e: 
logger.error(f"{url}: {str(e)} kazınamadı") 
raise 
``` 

## Performans 

### Eşzamansız 

- G/Ç yoğun işlemler için `asyncio` kullanın 
- Eşzamansız HTTP istekleri için `aiohttp` kullanın 
- Aşırı yüklemeyi önlemek için eşzamanlı görev sayısını sınırlayın 

```python 
async def scrape_batch(urls: List[str], max_concurrent: int = 10): 
semaphore = asyncio.Semaphore(max_concurrent) 

async def _scrape_with_semaphore(url): 
async with semaphore: 
return await scrape_url(url) 

tasks = [_scrape_with_semaphore(url) for url in urls] 
return await asyncio.gather(*tasks, return_exceptions=True) 
``` 

### Optimizasyonlar 

- Ortak işlemler için uygun veri yapılarını kullanın (sık aramalar için sözlükler) 
- Büyük verilerin gereksiz kopyalarından kaçının 
- Büyük miktarda veriyi işlemek için üreteçleri kullanın 
- Pahalı hesaplamaları veya istekleri önbelleğe alın 

```python 
# Büyük veri kümelerini işlemek için üreteçleri kullanma 
def process_large_dataset(file_path): 
with open(file_path, 'r') as f: 
for line in f: 
yield process_line(line) 
``` 

## Güvenlik 

### Giriş Doğrulaması 

- Kullanıcı girdisini her zaman doğrulayın 
- Veri doğrulaması için Pydantic kullanın 
- Harici verilere asla güvenmeyin 

```python 
from pydantic import BaseModel, HttpUrl, validator 

class ScrapingRequest(BaseModel): 
url: HttpUrl 
depth: int = 1 

@validator('depth') 
def validate_depth(cls, v): 
if v < 1 or v > 3: 
raise ValueError('Derinlik 1 ile 3 arasında olmalı') 
return v 
``` 

### Gizli Yönetim 

- Kaynak koduna asla gizli bilgiler (parolalar, API anahtarları) ekleme 
- Ortam değişkenleri veya güvenli yapılandırma dosyaları kullanma 
- Ortam değişkenlerini yüklemek için python-dotenv kullanma 

```python 
import os 
from dotenv import load_dotenv 

load_dotenv() 

API_KEY = os.getenv("API_KEY") 
if not API_KEY: 
raise EnvironmentError("API_KEY ortam değişkeni ayarlanmamış") 
``` 

## Ayrıntıları Kazıma 

### robots.txt'ye saygı gösterme 

- Her zaman saygı gösterme robots.txt dosyaları 
- İstekler arasında gecikmeler uygulayın 
- Uygun bir Kullanıcı Aracısı ile kendinizi doğru şekilde tanımlayın 

```python 
from urllib.robotparser import RobotFileParser 
from urllib.parse import urlparse 

def can_fetch(url: str, user_agent: str) -> bool: 
"""URL'nin robots.txt'ye göre alınıp alınamayacağını kontrol eder.""" 
parser = RobotFileParser() 
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt" 
parser.set_url(robots_url) 
parser.read() 
return parser.can_fetch(user_agent, url) 
``` 

### Oturum Yönetimi 

- HTTP oturumlarını yeniden kullanın performansı artırmak için 
- Kullanımdan sonra oturumları düzgün bir şekilde kapatın 
- Kaynak kapanışını sağlamak için eşzamansız bağlamlar kullanın 

```python 
async def scrape_with_session(): 
async with aiohttp.ClientSession() as session: 
# Tüm istekler için oturumu kullanın 
result1 = await fetch_url(session, url1) 
result2 = await fetch_url(session, url2) 
# Oturum burada otomatik olarak kapatılır 
``` 

### HTML Ayrıştırma 

- Daha iyi performans için BeautifulSoup için ayrıştırıcı olarak `lxml` kullanın 
- DOM gezintisi için CSS veya XPath seçicileri kullanın 
- Beklenen öğelerin olmadığı durumları işleyin 

```python 
from bs4 import BeautifulSoup 

def extract_title(html: str) -> Optional[str]: 
soup = BeautifulSoup(html, "lxml") 
title_tag = soup.find("title") 
return title_tag.text if title_tag else None 
``` 

## Önerilen Araçlar 

### Linting ve Biçimlendirme 

- **Black**: Otomatik kod biçimlendirici 
- **isort**: Otomatik içe aktarma sıralayıcı 
- **flake8**: Hataları ve stil sorunlarını algılamak için Linter 
- **mypy**: Statik tür denetimi 

### Önerilen Yapılandırma 

`pyproject.toml` dosyası: 

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

`.flake8` dosyası: 

``` 
[flake8] 
max-line-length = 88 
extend-ignore = E203 
exclude = .git,__pycache__,build,dist 
``` 

### CI Entegrasyonu 

Kodu otomatik olarak kontrol etmek için CI boru hattınızda bu araçları yapılandırın: 

```yaml 
# GitHub Eylemleri için Örnek 
name: Python Linting 

on: [push, pull_request] 

jobs: 
lint: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v2 
- name: Python'u kurun 
uses: actions/setup-python@v2 
with: 
python-version: '3.8' 
- name: Bağımlılıkları yükle 
run: | 
python -m pip install --upgrade pip 
pip install black isort flake8 mypy 
- name: Linters'ı çalıştır 
run: | 
black --check . 
isort --check . 
flake8 . 
mypy . 
``` 

--- 

## Sonuç 

Bu standartlar WhytCard projesinde Python kodunun kalitesini, sürdürülebilirliğini ve tutarlılığını sağlamak için tasarlanmıştır. Tüm katkıda bulunanların bu yönergeleri izlemesi beklenir. Sorularınız veya iyileştirme önerileriniz varsa lütfen bunları ekiple paylaşmaktan çekinmeyin. 

--- 

Son güncelleme: 2025-01-15