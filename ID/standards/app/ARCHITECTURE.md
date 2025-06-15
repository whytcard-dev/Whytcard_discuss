# Arsitektur Global WhytCard 

## Pendahuluan 

Dokumen ini menyajikan arsitektur global proyek WhytCard, platform pelatihan AI dan pengikisan web sumber terbuka. Arsitektur ini dirancang agar modular, dapat diskalakan, dan dapat dipelihara, sehingga memungkinkan penambahan fitur baru dengan mudah sekaligus memastikan stabilitas sistem. 

## Tinjauan Umum 

WhytCard disusun menurut arsitektur klien-server dengan pemisahan yang jelas antara frontend dan backend. Pemisahan ini memungkinkan evolusi independen dari kedua komponen dan memfasilitasi kerja tim. 

``` 
┌────────────────┐ ┌────────────────┐ 
│ │ │ │ 
│ Frontend │◄────►│ Backend │ 
│ (Vue.js) │ │ (FastAPI) │ 
│ │ │ │ 
└─────────────────┘ └─────────────────┘ 
▲ 
│ 
▼ 
┌────────────────┐ 
│ │ 
│ Pengikisan & │ 
│ Alur Data │ 
│ │ 
└─────────────────┘ 
▲ 
│ 
▼ 
┌────────────────┐ 
│ │ 
│ Penyimpanan │ 
│ │ 
└────────────────────┘ 
``` 

## Utama Komponen 

### 1. Frontend (Vue.js) 

Frontend dikembangkan dengan Vue.js dan menggunakan Tailwind CSS untuk penataan gaya. Frontend bertanggung jawab atas antarmuka pengguna dan pengalaman pengguna. 

#### Fitur Utama 

- **Framework**: Vue.js 3 dengan Composition API 
- **Styling**: Tailwind CSS 
- **Animations**: Framer Motion 
- **Internationalization**: i18next dengan deteksi bahasa browser otomatis 
- **Routing**: Vue Router 
- **State Management**: Pinia 

#### Structure 

``` 
src/ 
├── components/ # Komponen yang dapat digunakan kembali 
├── config/ # Konfigurasi frontend 
├── i18n/ # File terjemahan 
├── router/ # Konfigurasi rute 
├── views/ # Halaman utama 
└── main.js # Titik masuk 
``` 

### 2. Backend (FastAPI) 

Backend dikembangkan dengan FastAPI, kerangka kerja Python yang modern dan berkinerja tinggi untuk membuat API. Kerangka kerja ini menangani semua operasi server, akses data, dan logika bisnis. #### Fitur Utama 

- **Framework**: FastAPI 
- **Authentication**: JWT 
- **Validation**: Pydantic 
- **Dokumentasi API**: UI Swagger Terintegrasi 

#### Struktur 

``` 
backend/ 
├── config/ # Konfigurasi backend 
├── core/ # Logika bisnis utama 
│ ├── api/ # Titik akhir API 
│ └── schemas/ # Skema Pydantic 
├── models/ # Model data 
├── utils/ # Utilitas 
└── main.py # Titik masuk 
``` 

### 3. Scraping & Data Pipeline 

Modul ini bertanggung jawab untuk mengumpulkan data dari sumber web dan mengubahnya untuk pelatihan model AI. #### Fitur Utama 

- **Scraping**: Sistem asinkron dengan aiohttp dan BeautifulSoup 
- **Orchestration**: Manajemen tugas dan prioritas 
- **Transformation**: Pembersihan dan normalisasi data 
- **Cache**: Sistem caching untuk menghindari permintaan yang berlebihan 

#### Struktur 

``` 
backend/ 
├── scraping/ 
│ ├── scrapers/ # Implementasi khusus untuk sumber yang berbeda 
│ ├── utils/ # Utilitas scraping 
│ ├── orchestrator.py # Task orchestrator 
│ └── cache.py # Sistem caching 
└── datasets/ # Data yang dikumpulkan dan diubah 
``` 

### 4. Penyimpanan 

Sistem penyimpanan mengelola data persistensi dan akses. #### Opsi Penyimpanan 

- **Basis Data**: PostgreSQL untuk data terstruktur 
- **Penyimpanan file**: Sistem file lokal atau kompatibel dengan S3 untuk data besar 
- **Cache**: Redis untuk cache terdistribusi 

## Aliran Data 

### 1. Pengumpulan Data 

``` 
┌────────────┐ ┌─────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ 
│ Web │────►│ Scraper │────►│ Cache │ 
│ Sumber │ │ │ │ 
└────────────┘ └──────────────┘ └──────────────┘ 
│ 
▼ 
┌────────────┐ ┌────────────┐ 
│ │ │ │ 
│ Prosesor │────►│ Penyimpanan │ 
│ │ │ │ 
└────────────┘ └────────────┘ 
``` 

1. Scraper mengumpulkan data dari sumber web 
2. Data di-cache untuk menghindari permintaan yang berulang 
3. Prosesor membersihkan dan mengubah data 
4. Data yang diubah disimpan untuk penggunaan selanjutnya 

### 2. Pelatihan Model 

``` 
┌────────────┐ ┌────────────┐ ┌────────────┐ 
│ │ │ │ │ │ 
│ Kumpulan data │────►│ Praprosesor│────►│ Pelatihan │ 
│ │ │ │ │ │ 
└───────────┘ └─────────────┘ └─────────────┘ 
│ 
▼ 
┌────────────┐ 
│ │ 
│ Model │ 
│ │ 
└───────────────┘ 
``` 

1. Kumpulan data diekstrak dari penyimpanan 
2. Data diproses terlebih dahulu untuk pelatihan 
3. Model dilatih pada data yang telah diproses terlebih dahulu 
4. Model yang dilatih disimpan 

### 3. Penggunaan Model 

``` 
┌────────────┐ ┌─────────────┐ ┌────────────┐ 
│ │ │ │ │ │ 
│ API │────►│ Model │────►│ Respons │ 
│ Permintaan │ │ │ │ 
└────────────┘ └──────────────┘ └──────────────┘ 
``` 

1. Permintaan API diterima 
2. Model yang sesuai digunakan untuk memproses permintaan 
3. Respons dibuat dan dikembalikan 

## Komunikasi Antar Komponen 

### REST API 

Komunikasi antara frontend dan backend utamanya melalui REST API. Titik akhir diatur secara logis dan didokumentasikan dengan Swagger UI. 

### WebSockets 

Untuk fitur yang memerlukan pembaruan waktu nyata (seperti pelacakan tugas scraping), WebSockets digunakan untuk mengaktifkan komunikasi dua arah. 

### Antrean Pesan 

Untuk tugas asinkron dan berjalan lama, antrean pesan (seperti RabbitMQ atau Redis Pub/Sub) digunakan untuk memisahkan komponen dan memastikan keandalan. 

## Penerapan 

### Opsi Penerapan 

WhytCard dapat diterapkan dengan beberapa cara: 

1. **Aplikasi desktop**: Menggunakan Tauri untuk membuat aplikasi desktop lintas platform 
2. **Penerapan cloud**: Penerapan pada layanan cloud seperti AWS, GCP, atau Azure 
3. **Self-hosting**: Instalasi pada server pribadi atau perusahaan 

### Arsitektur Penerapan 

``` 
┌──────────────────┐ ┌────────────────┐ 
│ │ │ │ 
│ Frontend │◄────►│ API Gateway │ 
│ (Statis) │ │ │ 
└─────────────────┘ └───────────────────┘ 
▲ 
│ 
▼ 
┌────────────────┐ 
│ │ 
│ API Backend │ 
│ │ 
└────────────────┘ 
▲ 
│ 
▼ 
┌─────────────────┐ ┌────────────────┐ 
│ │ │ │ 
│ Basis Data │ │ Penyimpanan File │ 
│ │ │ │ 
└─────────────────┘ └───────────────────┘ 
``` 

## Keamanan 

### Prinsip Keamanan 

1. **Pertahanan berlapis**: Beberapa lapisan keamanan 
2. **Prinsip hak istimewa paling rendah**: Akses minimum yang diperlukan 
3. **Validasi input**: Semua input pengguna divalidasi 
4. **Perlindungan data**: Enkripsi data sensitif 

### Langkah Keamanan 

- **Autentikasi**: JWT dengan rotasi token 
- **Otorisasi**: Kontrol akses berbasis peran 
- **Perlindungan terhadap serangan umum**: XSS, CSRF, injeksi SQL 
- **Audit**: Pencatatan tindakan penting 

## Skalabilitas 

Arsitektur dirancang agar dapat diskalakan secara horizontal dan vertikal: 

- **Layanan mikro**: Komponen dapat disebarkan secara independen 
- **Caching**: Penggunaan cache multi-level 
- **Penyeimbangan beban**: Distribusi lalu lintas di antara beberapa instans 
- **Pemartisian**: Pemisahan data untuk meningkatkan kinerja 

## Pemantauan dan Observability 

- **Logging**: Pencatatan terpusat dengan ELK Stack atau yang setara 
- **Metrik**: Pengumpulan metrik dengan Prometheus 
- **Tracing**: Pelacakan permintaan dengan OpenTelemetry 
- **Alerting**: Peringatan berdasarkan ambang batas yang telah ditetapkan 

## Kesimpulan 

Arsitektur WhytCard dirancang agar tangguh, dapat diskalakan, dan dapat dipelihara. Pemisahan tanggung jawab yang jelas antara berbagai komponen memungkinkan evolusi independen dan memfasilitasi kerja tim. Pilihan teknologi dibuat dengan mempertimbangkan kebutuhan proyek saat ini dan masa mendatang, serta praktik terbaik industri. 

Arsitektur ini akan ditinjau dan diperbarui secara berkala untuk beradaptasi dengan kebutuhan baru dan perkembangan teknologi. 

--- 

Terakhir diperbarui: 2025-01-15