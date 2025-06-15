# Standar Python untuk WhytCard 

## Pendahuluan 

Dokumen ini mendefinisikan standar dan praktik terbaik yang harus diikuti untuk pengembangan Python dalam proyek WhytCard. Aturan ini bertujuan untuk memastikan kode yang konsisten, dapat dipelihara, dan berkualitas tinggi di seluruh basis kode. 

## Daftar Isi 

1. [Konvensi Gaya](#style-conventions) 
2. [Struktur Kode](#code-structure) 
3. [Dokumentasi](#documentation) 
4. [Pengujian](#testing) 
5. [Penanganan Kesalahan](#error-handling) 
6. [Kinerja](#performance) 
7. [Keamanan](#security) 
8. [Spesifikasi Scraping](#scraping-specifics) 
9. [Alat yang Direkomendasikan](#recommended-tools) 

## Konvensi Gaya 

### PEP 8 

Kami benar-benar mengikuti [PEP 8](https://www.python.org/dev/peps/pep-0008/), panduan gaya Python resmi, dengan beberapa adaptasi khusus untuk WhytCard. 

### Indentasi dan Pemformatan 

- Gunakan **4 spasi** untuk indentasi (tanpa tab) 
- Batasi semua baris hingga **maksimum 88 karakter** (standar Hitam) 
- Gunakan baris kosong untuk memisahkan fungsi dan kelas, serta blok kode yang besar dalam fungsi 
- Gunakan spasi di sekitar operator dan setelah koma 

```python 
# Baik 
def calculate_total(price, amount=1): 
total = price * amount 
return total 

# Buruk 
def calculate_total(price,quantity = 1): 
total=price*quantity 
return total 
``` 

### Konvensi Penamaan 

- **Modul dan paket**: Nama pendek, huruf kecil, tanpa garis bawah (`scraper.py`, `utils.py`) 
- **Kelas**: CamelCase (`ScrapingConfig`, `DataProcessor`) 
- **Fungsi dan variabel**: snake_case (`extract_data()`, `user_agent`) 
- **Konstanta**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`) 
- **Variabel "Pribadi"**: Diawali dengan garis bawah (`_internal_cache`) 
- **Nama deskriptif**: Utamakan kejelasan daripada keringkasan 

```python 
# Baik 
class UserDataProcessor: 
def __init__(self): 
self.MAX_BATCH_SIZE = 100 
self._temp_storage = {} 

def process_user_data(self, user_data): 
pass 

# Buruk 
class Processor: 
def __init__(self): 
self.max = 100 
self.temp = {} 

def process(self, d): 
pass 
``` 

### Impor 

- Atur impor menjadi tiga bagian yang dipisahkan oleh baris kosong: 
1. Impor pustaka standar 
2. Impor pustaka pihak ketiga 
3. Impor proyek lokal 
- Setiap bagian harus diurutkan berdasarkan abjad 
- Lebih baik impor eksplisit daripada impor generik 

```python 
# Baik 
import os 
import sys 
from typing import Dict, List, Optional 

import aiohttp 
import bs4 
from fastapi import HTTPException 

from scraping.utils import URLUtils 
from utils.logging import setup_logger 

# Buruk 
from scraping.utils import * 
import aiohttp, bs4 
import sys, os 
``` 

## Struktur Kode 

### Organisasi Modul 

- Setiap modul harus memiliki satu tanggung jawab yang terdefinisi dengan baik 
- Gunakan paket untuk mengatur modul terkait 
- Buat file `__init__.py` untuk setiap paket, yang memperlihatkan API publik dengan jelas 

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

### Kelas dan Fungsi 

- Ikuti Prinsip Tanggung Jawab Tunggal (SRP) 
- Batasi ukuran fungsi hingga maksimum 50 baris 
- Batasi ukuran kelas hingga maksimum 300 baris 
- Gunakan metode statis atau fungsi mandiri untuk operasi yang tidak bergantung pada status instans 

```python 
# Baik 
kelas DataProcessor: 
def process_data(self, data): 
cleanse_data = self._clean_data(data) 
return self._transform_data(cleaned_data) 

def _clean_data(self, data): 
# Logika pembersihan 
return cleanse_data 

def _transform_data(self, data): 
# Logika transformasi 
return transformation_data 

# Buruk 
class DataProcessor: 
def process_data(self, data): 
# 200 baris kode yang menggabungkan pembersihan dan transformasi 
return result 
``` 

### Pengetikan Statis 

- Gunakan anotasi tipe untuk semua fungsi dan metode 
- Gunakan modul `typing` untuk tipe kompleks 
- Dokumentasikan pengecualian yang mungkin muncul 

```python 
from typing import Dict, List, Optional, Union, Any 

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]: 
""" 
Mengambil data dari URL yang ditentukan. 

Args: 
url: URL yang akan ditanyakan 
timeout: Batas waktu dalam detik 

Returns: 
Kamus yang berisi data yang diambil 

Raises: 
HTTPException: Jika permintaan gagal 
""" 
# Implementasi 
``` 

## Dokumentasi 

### Docstrings 

- Gunakan docstrings untuk semua modul, kelas, metode, dan fungsi 
- Ikuti format Google untuk docstrings 
- Dokumentasikan parameter, nilai pengembalian, dan pengecualian 

```python 
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]: 
""" 
Mengekstrak semua tautan dari halaman HTML beserta teks dan atributnya. 

Args: 
html: Konten HTML halaman 
base_url: URL dasar untuk mengatasi tautan relatif 

Mengembalikan: 
Daftar kamus yang berisi informasi tautan 

Menimbulkan: 
ValueError: Jika HTML tidak valid 
""" 
``` 

### Komentar 

- Gunakan komentar untuk menjelaskan "mengapa", bukan "apa" 
- Komentari kode yang kompleks atau tidak intuitif 
- Hindari komentar yang ketinggalan zaman atau berlebihan 

```python 
# Baik 
# Gunakan batas 5 detik untuk menghindari seringnya waktu habis pada situs yang lambat 
timeout = 5 

# Buruk 
# Tetapkan waktu habis 
timeout = 5 
``` 

## Pengujian 

### Struktur Pengujian 

- Gunakan pytest untuk semua pengujian 
- Atur pengujian dalam struktur yang mencerminkan kode sumber 
- Beri nama file pengujian dengan awalan `test_` 
- Beri nama fungsi pengujian dengan awalan `test_` 

``` 
scraping/ 
scraper.py 
utils.py 
tests/ 
scraping/ 
test_scraper.py 
test_utils.py 
``` 

### Cakupan Pengujian 

- Targetkan setidaknya 80% cakupan pengujian 
- Uji semua jalur kode penting 
- Sertakan pengujian untuk kasus tepi dan kondisi kesalahan 

```python 
def test_scrape_url_success(): 
# Uji kasus nominal 

def test_scrape_url_timeout(): 
# Uji kasus saat URL tidak merespons 

def test_scrape_url_invalid_url(): 
# Uji dengan URL yang tidak valid 
``` 

### Pengujian Asinkron 

- Gunakan `pytest-asyncio` untuk menguji kode asinkron 
- Gunakan tiruan untuk panggilan jaringan dalam pengujian 

```python 
import pytest 

@pytest.mark.asyncio 
async def test_async_function(): 
result = await async_function() 
assert result == expected_result 
``` 

## Penanganan Kesalahan 

### Pengecualian 

- Buat pengecualian khusus untuk kesalahan khusus aplikasi 
- Gunakan pengecualian Python standar jika sesuai 
- Dokumentasikan semua pengecualian yang mungkin muncul 

```python 
class ScrapingException(Exception): 
"""Pengecualian dasar untuk kesalahan scraping.""" 
pass 

class RateLimitException(ScrapingException): 
"""Dimunculkan saat batas kecepatan tercapai.""" 
pass 
``` 

### Penanganan Kesalahan 

- Gunakan blok try/except untuk menangani kesalahan dengan tepat 
- Hindari menangkap Pengecualian secara umum 
- Catat kesalahan dengan konteks yang cukup untuk debugging 

```python 
try: 
result = await scraper.scrape_url(url) 
kecuali RateLimitException: 
logger.warning(f"Batas kecepatan tercapai untuk {url}, mencoba lagi setelah penundaan") 
await asyncio.sleep(RATE_LIMIT_DELAY) 
result = await scraper.scrape_url(url) 
except ScrapingException as e: 
logger.error(f"Gagal mengikis {url}: {str(e)}") 
raise 
``` 

## Kinerja 

### Asinkron 

- Gunakan `asyncio` untuk operasi intensif I/O 
- Gunakan `aiohttp` untuk permintaan HTTP asinkron 
- Batasi jumlah tugas bersamaan untuk menghindari kelebihan beban 

```python 
async def scrape_batch(urls: List[str], max_concurrent: int = 10): 
semaphore = asyncio.Semaphore(max_concurrent) 

async def _scrape_with_semaphore(url): 
async with semaphore: 
return await scrape_url(url) 

task = [_scrape_with_semaphore(url) for url in urls] 
return await asyncio.gather(*tasks, return_exceptions=True) 
``` 

### Optimasi 

- Gunakan struktur data yang sesuai untuk operasi umum (kamus untuk pencarian yang sering) 
- Hindari salinan data besar yang tidak perlu 
- Gunakan generator untuk memproses data dalam jumlah besar 
- Cache kalkulasi atau permintaan yang mahal 

```python 
# Menggunakan generator untuk memproses kumpulan data besar 
def process_large_dataset(file_path): 
with open(file_path, 'r') as f: 
for line in f: 
yield process_line(line) 
``` 

## Keamanan 

### Validasi Input 

- Selalu validasi input pengguna 
- Gunakan Pydantic untuk validasi data 
- Jangan pernah percaya data eksternal 

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

### Manajemen Rahasia 

- Jangan pernah menyertakan rahasia (kata sandi, kunci API) dalam kode sumber 
- Gunakan variabel lingkungan atau file konfigurasi yang aman 
- Gunakan python-dotenv untuk memuat variabel lingkungan 

```python 
import os 
from dotenv import load_dotenv 

load_dotenv() 

API_KEY = os.getenv("API_KEY") 
if not API_KEY: 
raise EnvironmentError("API_KEY environment variable is not set") 
``` 

## Spesifikasi Scraping 

### Menghormati robots.txt 

- Selalu hormati file robots.txt 
- Terapkan penundaan antar permintaan 
- Identifikasi diri Anda dengan User-Agent yang tepat 

```python 
from urllib.robotparser import RobotFileParser 
from urllib.parse import urlparse 

def can_fetch(url: str, user_agent: str) -> bool: 
"""Memeriksa apakah URL dapat diambil sesuai dengan robots.txt.""" 
parser = RobotFileParser() 
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt" 
parser.set_url(robots_url) 
parser.read() 
return parser.can_fetch(user_agent, url) 
``` 

### Manajemen Sesi 

- Gunakan kembali sesi HTTP untuk meningkatkan kinerja 
- Tutup sesi dengan benar setelah digunakan 
- Gunakan konteks asinkron untuk memastikan penutupan sumber daya 

```python 
async def scrape_with_session(): 
async with aiohttp.ClientSession() as session: 
# Gunakan sesi untuk semua permintaan 
result1 = await fetch_url(session, url1) 
result2 = await fetch_url(session, url2) 
# Sesi ditutup secara otomatis di sini 
``` 

### Penguraian HTML 

- Gunakan `lxml` sebagai pengurai untuk BeautifulSoup agar lebih baik kinerja 
- Gunakan pemilih CSS atau XPath untuk navigasi DOM 
- Tangani kasus di mana elemen yang diharapkan tidak ada 

```python 
from bs4 import BeautifulSoup 

def extract_title(html: str) -> Optional[str]: 
soup = BeautifulSoup(html, "lxml") 
title_tag = soup.find("title") 
return title_tag.text if title_tag else None 
``` 

## Alat yang Direkomendasikan 

### Linting dan Pemformatan 

- **Black**: Pemformat kode otomatis 
- **isort**: Pengurut impor otomatis 
- **flake8**: Linter untuk mendeteksi kesalahan dan masalah gaya 
- **mypy**: Pemeriksaan tipe statis 

### Konfigurasi yang Direkomendasikan 

file `pyproject.toml`: 

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

### Integrasi CI 

Konfigurasikan alat-alat ini di jalur CI Anda untuk memeriksa kode secara otomatis: 

```yaml 
# Contoh untuk GitHub Actions 
name: Python Linting 

on: [push, pull_request] 

jobs: 
lint: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v2 
- name: Menyiapkan Python 
uses: actions/setup-python@v2 
with: 
python-version: '3.8' 
- name: Menginstal dependensi 
run: | 
python -m pip install --upgrade pip 
pip install black isort flake8 mypy 
- name: Menjalankan linters 
run: | 
black --check . 
isort --check . 
flake8 . 
mypy . 
``` 

--- 

## Kesimpulan 

Standar-standar ini dirancang untuk memastikan kualitas, kemudahan perawatan, dan konsistensi kode Python dalam proyek WhytCard. Semua kontributor diharapkan mengikuti panduan ini. Jika Anda memiliki pertanyaan atau saran untuk perbaikan, jangan ragu untuk membagikannya dengan tim. 

--- 

Terakhir diperbarui: 2025-01-15