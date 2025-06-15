# Panduan Scraping Etis untuk WhytCard 

## Pendahuluan 

Scraping web merupakan inti dari proyek WhytCard, tetapi harus dilakukan dengan cara yang etis, bertanggung jawab, dan sah. Panduan ini mendefinisikan prinsip dan praktik yang harus diikuti untuk memastikan bahwa semua aktivitas scraping menghormati hak pemilik situs web, hukum yang berlaku, dan standar etika. 

## Daftar Isi 

1. [Prinsip Dasar](#fundamental-principles) 
2. [Aspek Hukum](#legal-aspects) 
3. [Praktik Terbaik Teknis](#technical-best-practices) 
4. [Penghormatan terhadap Sumber Daya](#resource-respect) 
5. [Perlindungan Data Pribadi](#personal-data-protection) 
6. [Dokumentasi dan Transparansi](#documentation-and-transparency) 
7. [Kasus Khusus](#special-cases) 
8. [Daftar Periksa Pengikisan Etis](#ethical-scraping-checklist) 

## Prinsip Dasar 

### Filosofi Pengikisan Etis 

Pengikisan etis didasarkan pada tiga prinsip dasar: 

1. **Penghormatan**: Hormati pemilik situs web, ketentuan penggunaan mereka, dan sumber daya 
2. **Proporsionalitas**: Ekstrak hanya data yang diperlukan dengan dampak minimal 
3. **Transparansi**: Bersikap transparan tentang identitas bot dan tujuan pengikisan 

### Nilai-nilai WhytCard Mengenai Pengikisan 

Sebagai proyek WhytCard, kami berkomitmen untuk: 

- Jangan pernah merusak situs web yang kami iki 
- Benar-benar menghormati aturan eksplisit dan implisit situs web 
- Bersikap transparan tentang identitas dan tujuan kami 
- Menggunakan data secara bertanggung jawab dan sesuai dengan misi kami 
- Prioritaskan API resmi jika tersedia 

## Aspek Hukum 

### Kerangka Hukum Umum 

Pengikisan web tunduk pada beberapa kerangka hukum yang berbeda-beda di setiap negara: 

- **Hak Cipta**: Konten situs web pada umumnya dilindungi oleh hak cipta 
- **Ketentuan Penggunaan**: ToS situs web dapat secara eksplisit melarang pengikisan 
- **Perlindungan Data**: Undang-undang seperti GDPR di Eropa melindungi data pribadi 
- **Akses Tidak Sah**: Beberapa yurisdiksi mengkriminalisasi akses tidak sah ke komputer sistem 

### Hukum Kasus Terkemuka 

Beberapa keputusan pengadilan penting terkait scraping: 

- **hiQ Labs v. LinkedIn** (AS): Menetapkan bahwa scraping data publik belum tentu ilegal 
- **Ryanair v. PR Aviation** (UE): Menetapkan bahwa ketentuan penggunaan dapat membatasi scraping secara kontrak 
- **QVC v. Resultly** (AS): Menekankan pentingnya tidak membebani server secara berlebihan 

### Kepatuhan Hukum untuk WhytCard 

Agar tetap legal: 

1. **Selalu periksa ToS** sebelum melakukan scraping situs 
2. **Hargai tag "noindex" dan "nofollow"** dalam tag meta 
3. **Jangan pernah menghindari tindakan perlindungan teknis** (CAPTCHA, batasan akses) 
4. **Dokumentasikan praktik Anda** untuk menunjukkan itikad baik 
5. **Konsultasikan dengan pengacara** jika ragu tentang legalitas operasi scraping 

## Praktik Terbaik Teknis 

### Menghormati robots.txt 

File robots.txt mendefinisikan aturan akses untuk robot: 

```python 
from urllib.robotparser import RobotFileParser 
from urllib.parse import urlparse 

def is_allowed(url, user_agent="WhytCardBot/1.0"): 
"""Memeriksa apakah URL dapat di-scraping menurut robots.txt.""" 
rp = RobotFileParser() 
rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt") 
rp.read() 
return rp.can_fetch(user_agent, url) 
``` 

### Identifikasi yang Tepat 

Selalu gunakan User-Agent yang mengidentifikasi bot Anda dengan jelas: 

```python 
headers = { 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)', 
# Header lainnya... 
} 
``` 

### Penundaan Permintaan 

Terapkan penundaan yang wajar di antara permintaan: 

```python 
import time 
import random 

def polite_request(url, session, min_delay=1, max_delay=3): 
"""Membuat permintaan dengan penundaan yang sopan di antara permintaan.""" 
# Tunggu penundaan acak 
delay = random.uniform(min_delay, max_delay) 
time.sleep(delay) 

# Buat permintaan 
response = session.get(url, headers=headers) 
return response 
``` 

### Penanganan Kesalahan 

Hargai kode kesalahan HTTP dan sesuaikan perilaku Anda sebagaimana mestinya: 

```python 
async def respectful_fetch(url, session): 
"""Mengambil URL dengan cara yang sopan.""" 
try: 
async with session.get(url, headers=headers) as response: 
if response.status == 200: 
return await response.text() 
elif response.status == 429: # Terlalu Banyak Permintaan 
# Tunggu lebih lama sebelum mencoba lagi 
wait_time = int(response.headers.get('Retry-After', 60)) 
logger.info(f"Rate limited, waiting {wait_time} seconds") 
await asyncio.sleep(wait_time) 
return await respectful_fetch(url, session) 
elif response.status in (403, 404): 
# Jangan coba lagi kesalahan 403/404 
logger.warning(f"Akses ditolak atau tidak ditemukan: {url}") 
return None 
else: 
# Tunggu dan coba lagi untuk kesalahan lainnya 
logger.warning(f"Kesalahan {response.status} untuk {url}, coba lagi dalam 5 detik") 
await asyncio.sleep(5) 
return await respectful_fetch(url, session) 
except Exception as e: 
logger.error(f"Pengecualian saat mengambil {url}: {str(e)}") 
return None 
``` 

## Penghormatan Sumber Daya 

### Pembatasan Kecepatan 

Sesuaikan kecepatan permintaan Anda dengan ukuran dan sumber daya situs target: 

- **Situs komersial besar**: 1 permintaan setiap 1-3 detik 
- **Situs berukuran sedang**: 1 permintaan setiap 3-10 detik 
- **Situs kecil**: 1 permintaan setiap 10-60 detik atau lebih 

### Periode Pengikisan 

Pilih periode lalu lintas rendah untuk operasi intensif: 

- **Di luar jam sibuk jam**: Lebih suka malam atau akhir pekan
- **Hindari puncak**: Jangan melakukan scraping selama periode puncak yang diketahui
- **Bersikap adaptif**: Kurangi kecepatan Anda jika Anda mendeteksi pelambatan

### Minimalisasi Dampak

Teknik untuk mengurangi dampak pada server target:

1. **Smart caching**: Jangan mengambil halaman yang sama beberapa kali

2. **Selektivitas**: Hanya mengambil halaman yang benar-benar Anda perlukan

3. **Kompresi**: Minta respons terkompresi untuk mengurangi bandwidth

4. **Paginasi yang efisien**: Hargai struktur paginasi situs

## Perlindungan Data Pribadi

### Mengidentifikasi Data Pribadi

Waspadai jenis data yang Anda kumpulkan:

- **Data identifikasi langsung**: Nama, email, telepon, alamat

- **Data identifikasi tidak langsung**: ID pengguna, nama samaran

- **Data sensitif**: Opini politik, kesehatan, orientasi seksual

### Prinsip GDPR untuk Hormati

Jika Anda beroperasi di Eropa atau mengumpulkan data dari orang Eropa:

1. **Minimalisasi**: Hanya kumpulkan data yang benar-benar diperlukan

2. **Tujuan**: Hanya gunakan data untuk tujuan yang dimaksudkan

3. **Penyimpanan terbatas**: Hapus data saat tidak lagi diperlukan

4. **Keamanan**: Lindungi data yang dikumpulkan dari akses yang tidak sah

### Anonimisasi Data

Teknik untuk menganonimkan data pribadi:

```python

import hashlib

import re

def anonymize_email(email):

"""Menganonimkan alamat email."""

if not email:

return None


# Hash alamat email

hashed = hashlib.sha256(email.encode()).hexdigest()[:10]

domain = email.split('@')[-1]


return f"anon_{hashed}@{domain}" 

def anonymize_phone(phone): 
"""Menganonimkan nomor telepon.""" 
if not phone: 
return None 

# Simpan hanya digit 
digits = re.sub(r'\D', '', phone) 

# Tutupi semua digit kecuali 2 digit terakhir 
if len(digits) > 2: 
return "X" * (len(digits) - 2) + digits[-2:] 
return "X" * len(digits) 
``` 

## Dokumentasi dan Transparansi 

### Mendokumentasikan Aktivitas Scraping 

Selalu dokumentasikan aktivitas scraping Anda: 

- **Tujuan**: Mengapa data ini dikumpulkan? 
- **Metode**: Bagaimana cara pengumpulannya? 
- **Penyimpanan**: Di mana dan bagaimana data disimpan? - **Penggunaan**: Bagaimana cara penggunaannya? 
- **Penghapusan**: Kapan akan dihapus? 

### Kontak dan Opt-out 

Selalu sediakan cara untuk menghubungi Anda: 

1. **Halaman informasi**: Buat halaman khusus yang menjelaskan bot Anda (misalnya, whytcard.com/bot) 
2. **Email kontak**: Berikan alamat email di User-Agent Anda 
3. **Mekanisme opt-out**: Izinkan situs untuk meminta pengecualian 

### Pencatatan Aktivitas 

Simpan log terperinci dari aktivitas scraping Anda: 

```python 
import logging 
from datetime import datetime 

# Konfigurasi logger 
logging.basicConfig( 
filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log", 
level=logging.INFO, 
format='%(asctime)s - %(levelname)s - %(message)s' 
) 

def log_scraping_activity(url, success, data_points=0): 
"""Mencatat aktivitas scraping.""" 
logging.info(f"URL: {url}, Success: {success}, Data points: {data_points}") 
``` 

## Kasus Khusus 

### API vs Scraping 

Urutan prioritas untuk pengumpulan data: 

1. **API Resmi**: Selalu prioritaskan API resmi jika ada 
2. **Umpan data publik**: Gunakan umpan RSS, XML, atau JSON jika tersedia 
3. **Scraping**: Gunakan scraping hanya sebagai pilihan terakhir 

### Situs dengan Autentikasi 

Untuk situs yang memerlukan autentikasi: 

- **Otorisasi eksplisit**: Dapatkan otorisasi tertulis dari situs 
- **Penghormatan terhadap ToS**: Pastikan ToS mengizinkan penggunaan otomatis 
- **Keterbatasan**: Patuhi batasan penggunaan secara ketat 

### Konten Dinamis (JavaScript) 

Untuk situs yang menggunakan banyak JavaScript: 

```python 
from playwright.async_api import async_playwright 

async def scrape_dynamic_content(url): 
"""Mengikis konten yang dihasilkan oleh JavaScript.""" 
async with async_playwright() as p: 
browser = await p.chromium.launch(headless=True) 
page = await browser.new_page() 

# Mengonfigurasi User-Agent 
await page.set_extra_http_headers({ 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot)' 
}) 

# Memuat halaman dan menunggu jaringan dalam keadaan diam 
await page.goto(url) 
await page.wait_for_load_state('networkidle') 

# Mengekstrak konten 
content = await page.content() 

await browser.close() 
return content 
``` 

## Daftar Periksa Scraping Etis 

Sebelum setiap proyek scraping, periksa poin-poin berikut: 

### Persiapan 
- [ ] Periksa ToS situs target 
- [ ] Periksa file robots.txt 
- [ ] Cari API atau alternatif untuk scraping 
- [ ] Definisi yang jelas tentang data yang diperlukan 
- [ ] Dokumentasi tujuan scraping 

### Konfigurasi Teknis 
- [ ] User-Agent yang dapat diidentifikasi dan transparan 
- [ ] Mekanisme pembatasan laju 
- [ ] Sistem cache untuk menghindari permintaan yang berlebihan 
- [ ] Penanganan kesalahan dan kode HTTP yang tepat 
- [ ] Pencatatan aktivitas 

### Eksekusi 
- [ ] Pemantauan kinerja situs target 
- [ ] Penyesuaian laju dinamis jika diperlukan 
- [ ] Penghormatan terhadap indikasi server (429, Coba Lagi-Setelah) 
- [ ] Segera hentikan jika terdeteksi masalah 

### Pasca-pemrosesan 
- [ ] Anonimisasi data pribadi 
- [ ] Penyimpanan data aman 
- [ ] Retensi terbatas waktu 
- [ ] Dokumentasi data yang dikumpulkan 

## Kesimpulan 

Pengikisan etis adalah keseimbangan antara akses data dan penghormatan terhadap hak dan sumber daya pemilik situs web. Dengan mengikuti prinsip dan praktik ini, proyek WhytCard dapat mengumpulkan data yang diperlukan sambil mempertahankan pendekatan yang bertanggung jawab dan penuh hormat. 

Ingatlah bahwa etika pengikisan bukan hanya masalah kepatuhan hukum, tetapi juga tanggung jawab terhadap ekosistem web secara keseluruhan. Pengikisan yang penuh hormat berkontribusi pada web yang lebih terbuka dan berkelanjutan untuk semua orang. 

--- 

Terakhir diperbarui: 2025-01-15