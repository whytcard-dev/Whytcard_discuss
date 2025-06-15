# Standar Pengujian Web 

## Filosofi Pengujian 

- Uji lebih awal dan uji lebih sering 
- Otomatiskan pengujian sedapat mungkin 
- Uji pada level yang sesuai (unit, integrasi, e2e) 
- Tulis pengujian yang dapat dipelihara dan andal 
- Uji jalur yang sesuai dan kasus tepi 
- Gunakan pengujian untuk mencegah regresi 
- Prioritaskan pengujian berdasarkan dampak bisnis 
- Perlakukan kode pengujian dengan perhatian yang sama seperti kode produksi 

## Jenis & Cakupan Pengujian 

### Pengujian Unit 

- **Target**: Fungsi, komponen, dan modul individual 
- **Tujuan Cakupan**: 80%+ logika dan utilitas bisnis 
- **Alat**: Jest, Vitest, React Testing Library 
- **Praktik Terbaik**: 
- Ikuti pola AAA (Arrange, Act, Assert) 
- Satu pernyataan per pengujian jika memungkinkan 
- Tiruan dependensi eksternal 
- Uji kasus tepi dan kondisi kesalahan 
- Jaga agar pengujian tetap cepat (< 100 md per pengujian) 
- Gunakan deskriptif nama pengujian 
- Pisahkan pengujian dari satu sama lain 

### Pengujian Integrasi 

- **Target**: Interaksi antara komponen dan layanan 
- **Tujuan Cakupan**: Alur pengguna penting dan interaksi komponen 
- **Alat**: Pustaka Pengujian React, MSW, Supertest 
- **Praktik Terbaik**: 
- Komposisi komponen pengujian 
- Pengiriman formulir pengujian 
- Respons API tiruan 
- Perubahan status pengujian 
- Verifikasi pembaruan DOM 
- Perutean dan navigasi pengujian 
- Gunakan data pengujian yang realistis 

### Pengujian Ujung-ke-Ujung 

- **Target**: Alur pengguna lengkap dari UI ke backend 
- **Tujuan Cakupan**: Jalur bisnis penting dan perjalanan pengguna 
- **Alat**: Cypress, Playwright 
- **Praktik Terbaik**: 
- Fokus pada perjalanan pengguna penting 
- Uji pada beberapa browser 
- Gunakan pemilih stabil (data-testid) 
- Siapkan lingkungan pengujian yang terisolasi 
- Kelola pengujian data secara efektif 
- Ambil tangkapan layar pada kegagalan 
- Terapkan logika coba lagi untuk pengujian yang tidak stabil 

### Pengujian Regresi Visual 

- **Target**: Tampilan dan tata letak UI 
- **Tujuan Cakupan**: Komponen dan halaman UI utama 
- **Alat**: Percy, Chromatic, Playwright 
- **Praktik Terbaik**: 
- Ambil tangkapan layar dasar 
- Uji di berbagai viewport 
- Abaikan konten dinamis 
- Tinjau perubahan visual dengan saksama 
- Uji mode terang/gelap 
- Uji dengan panjang konten yang berbeda 
- Integrasikan dengan jalur CI/CD 

### Pengujian Aksesibilitas 

- **Target**: Kepatuhan WCAG dan masalah aksesibilitas 
- **Tujuan Cakupan**: Semua komponen dan halaman yang menghadap pengguna 
- **Alat**: axe, Lighthouse, WAVE 
- **Praktik Terbaik**: 
- Uji navigasi keyboard 
- Verifikasi kompatibilitas pembaca layar 
- Periksa kontras warna 
- Uji fokus manajemen 
- Verifikasi atribut ARIA 
- Uji dengan teknologi bantuan 
- Otomatiskan pemeriksaan aksesibilitas dasar 

### Pengujian Kinerja 

- **Target**: Waktu muat halaman, kinerja rendering 
- **Sasaran Cakupan**: Halaman utama dan jalur pengguna kritis 
- **Alat**: Lighthouse, WebPageTest, k6 
- **Praktik Terbaik**: 
- Ukur Core Web Vitals 
- Uji pada perangkat kelas bawah 
- Simulasikan pembatasan jaringan 
- Pantau ukuran bundel 
- Uji dengan skenario caching yang realistis 
- Ukur waktu untuk interaktif 
- Tetapkan anggaran kinerja 

## Praktik Pengujian 

### Organisasi Pengujian 

- Kelompokkan pengujian secara logis menurut fitur atau komponen 
- Gunakan nama file deskriptif dan deskripsi pengujian 
- Pisahkan utilitas dan perlengkapan pengujian 
- Atur pengujian dalam hierarki yang mencerminkan basis kode 
- Simpan file pengujian dekat dengan kode yang diuji 
- Gunakan konvensi penamaan yang konsisten 
- Pisahkan unit, integrasi, dan Pengujian e2e 

### Manajemen Data Pengujian 

- Gunakan pabrik atau pembangun untuk data pengujian 
- Hindari data pengujian yang dikodekan secara keras 
- Gunakan data realistis yang sesuai dengan pola produksi 
- Atur ulang status pengujian di antara pengujian 
- Pisahkan lingkungan pengujian 
- Pertimbangkan privasi data dalam data pengujian 
- Gunakan data acak yang diunggulkan untuk kasus-kasus ekstrem 

### Mocking & Stubbing 

- Tiruan dependensi eksternal (API, layanan) 
- Gunakan respons tiruan yang realistis 
- Atur ulang tiruan di antara pengujian 
- Hindari tiruan yang berlebihan 
- Tiruan pada tingkat yang sesuai 
- Dokumentasikan perilaku tiruan 
- Gunakan MSW untuk tiruan API 

### Integrasi Berkelanjutan 

- Jalankan pengujian pada setiap permintaan tarik 
- Terapkan eksekusi pengujian paralel 
- Siapkan pelaporan dan dasbor pengujian 
- Konfigurasikan pemberitahuan kegagalan pengujian 
- Terapkan percobaan ulang pengujian untuk pengujian yang tidak stabil 
- Cache dependensi pengujian 
- Jalankan berbagai jenis pengujian pada tahap yang sesuai 

## Pengembangan Berbasis Pengujian (TDD) 

- Tulis pengujian sebelum mengimplementasikan fitur 
- Ikuti siklus Red-Green-Refactor 
- Mulai dengan kasus pengujian sederhana 
- Tambahkan kompleksitas secara bertahap 
- Gunakan pengujian untuk mendorong desain 
- Refaktor pengujian saat kode berkembang 
- Fokus pada perilaku, bukan implementasi 

## Pemeliharaan Pengujian 

- Tinjau dan perbarui pengujian secara berkala 
- Hapus atau perbaiki pengujian yang tidak stabil 
- Refaktor pengujian dengan perubahan kode 
- Pantau kinerja pengujian 
- Analisis cakupan pengujian secara berkala 
- Dokumentasikan strategi pengujian 
- Latih anggota tim tentang praktik pengujian 

## Pengujian Khusus 

### Pengujian API 

- Uji semua titik akhir API 
- Verifikasi skema permintaan/respons 
- Uji autentikasi dan otorisasi 
- Uji penanganan kesalahan dan kode status 
- Validasi logika bisnis 
- Uji pembatasan kecepatan dan kuota 
- Dokumentasikan kasus pengujian API 

### Pengujian Manajemen Status 

- Uji transisi status 
- Verifikasi status awal 
- Uji pereduksi dan tindakan 
- Uji pemilih dan status turunan 
- Ketergantungan eksternal tiruan 
- Uji perubahan status asinkron 
- Verifikasi persistensi status 

### Pengujian Formulir 

- Uji pengiriman formulir 
- Validasi input formulir 
- Uji status kesalahan 
- Uji fungsionalitas pengaturan ulang formulir 
- Uji logika formulir bersyarat 
- Verifikasi aksesibilitas elemen formulir 
- Uji formulir dengan navigasi keyboard 

### Pengujian Keamanan 

- Uji alur autentikasi 
- Verifikasi pemeriksaan otorisasi 
- Uji terhadap kerentanan umum (XSS, CSRF) 
- Validasi sanitasi input 
- Uji keamanan unggahan file 
- Verifikasi header aman 
- Uji terhadap OWASP Top 10