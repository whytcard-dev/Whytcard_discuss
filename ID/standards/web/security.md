# Standar Keamanan Web 

## Prinsip Keamanan Inti 

- Pertahanan mendalam (berbagai lapisan keamanan) 
- Prinsip hak istimewa paling rendah 
- Aman berdasarkan desain dan default 
- Pengujian dan audit keamanan rutin 
- Selalu perbarui dependensi keamanan 
- Gagal dengan aman (default aman) 
- Mediasi lengkap (verifikasi setiap permintaan) 
- Edukasi keamanan untuk semua anggota tim 

## Autentikasi & Otorisasi 

### Autentikasi 

- Terapkan kebijakan kata sandi yang kuat 
- Panjang minimum: 12 karakter 
- Memerlukan kombinasi karakter, angka, simbol 
- Periksa dengan daftar kata sandi umum 
- Mendukung autentikasi multifaktor (MFA) 
- Gunakan manajemen sesi yang aman 
- Cookie khusus HTTP 
- Bendera aman untuk HTTPS 
- Atribut SameSite 
- Kedaluwarsa yang sesuai 
- Terapkan penguncian akun setelah upaya yang gagal 
- Alur pengaturan ulang kata sandi yang aman 
- Gunakan penyimpanan kata sandi yang aman (bcrypt/Argon2) 
- Pertimbangkan opsi tanpa kata sandi (WebAuthn, magic tautan) 

### Otorisasi 

- Terapkan kontrol akses berbasis peran (RBAC) 
- Gunakan kontrol akses berbasis atribut untuk izin kompleks 
- Validasi otorisasi pada setiap permintaan 
- Terapkan pemeriksaan kontrol akses yang tepat 
- Gunakan penanganan sesi yang aman 
- Terapkan otorisasi API (OAuth 2.0, JWT) 
- Hindari referensi objek langsung 
- Catat semua kegagalan kontrol akses 

## Perlindungan Data 

### Data Sensitif 

- Identifikasi dan klasifikasikan data sensitif 
- Enkripsi data sensitif saat tidak aktif 
- Gunakan TLS 1.3 untuk data saat transit 
- Terapkan manajemen kunci yang tepat 
- Minimalkan pengumpulan data sensitif 
- Terapkan prinsip minimalisasi data 
- Terapkan penghapusan data yang aman 
- Gunakan penyimpanan yang aman untuk kunci dan rahasia API 

### Validasi Input 

- Validasi semua input di sisi server 
- Gunakan kueri berparameter untuk akses basis data 
- Terapkan sanitasi input 
- Validasi untuk jenis data, panjang, format yang tepat 
- Gunakan daftar yang diizinkan alih-alih daftar yang ditolak 
- Terapkan penyandian keluaran khusus konteks 
- Validasi unggahan file (jenis, ukuran, konten) 
- Terapkan pembatasan laju untuk masukan 

## Pencegahan Kerentanan Umum 

### Pencegahan Penyuntikan 

- Gunakan kueri/pernyataan yang disiapkan dengan parameter 
- Terapkan ORM dengan escape yang tepat 
- Validasi dan bersihkan semua masukan 
- Terapkan penyandian keluaran yang sadar konteks 
- Gunakan API aman yang menghindari penyuntikan interpreter 

### Pencegahan XSS 

- Terapkan Kebijakan Keamanan Konten (CSP) 
- Gunakan penyandian keluaran otomatis 
- Terapkan penyandian khusus konteks 
- Bersihkan masukan HTML 
- Gunakan kerangka kerja modern dengan perlindungan XSS bawaan 
- Validasi URL dalam pengalihan 
- Terapkan tanda HTTPOnly ke kuki sensitif 

### Pencegahan CSRF 

- Terapkan token anti-CSRF 
- Gunakan atribut kuki SameSite 
- Verifikasi header asal dan rujukan 
- Memerlukan autentikasi ulang untuk tindakan sensitif 
- Gunakan konfigurasi CORS yang tepat 

### Header Keamanan 

- Content-Security-Policy (CSP) 
- X-Content-Type-Options: nosniff 
- Strict-Transport-Security (HSTS) 
- X-Frame-Options 
- Referrer-Policy 
- Permissions-Policy 
- Header Cache-Control untuk data sensitif 
- Clear-Site-Data untuk logout 

## Keamanan Infrastruktur 

### Keamanan Server 

- Jaga agar perangkat lunak server tetap terbarui 
- Gunakan konfigurasi server yang aman 
- Terapkan aturan firewall yang tepat 
- Aktifkan HTTPS saja (alihkan HTTP ke HTTPS) 
- Konfigurasikan pengaturan TLS yang tepat 
- Nonaktifkan layanan yang tidak perlu 
- Gunakan modul server web yang berfokus pada keamanan 
- Terapkan pembatasan kecepatan dan perlindungan DDoS 

### Keamanan API 

- Gunakan HTTPS untuk semua titik akhir API 
- Terapkan autentikasi yang tepat 
- Terapkan pembatasan laju 
- Validasi muatan permintaan 
- Kembalikan kode status yang sesuai 
- Hindari mengekspos informasi sensitif dalam respons 
- Gunakan kunci API untuk komunikasi antar-layanan 
- Dokumentasikan persyaratan keamanan untuk konsumen API 

### Manajemen Ketergantungan 

- Pindai secara berkala untuk dependensi yang rentan 
- Gunakan lockfile untuk menyematkan versi dependensi 
- Terapkan pemindaian kerentanan otomatis 
- Perbarui dependensi dengan segera 
- Minimalkan penggunaan dependensi 
- Verifikasi integritas dependensi (checksum) 
- Pantau serangan rantai pasokan 
- Miliki rencana respons kerentanan 

## Pengujian Keamanan 

### Analisis Statis 

- Terapkan alat SAST otomatis 
- Integrasikan linting keamanan dalam CI/CD 
- Pindai rahasia yang dikodekan secara keras 
- Analisis kode untuk anti-pola keamanan 
- Validasi konfigurasi keamanan 
- Periksa dependensi yang sudah ketinggalan zaman 
- Terapkan standar pengodean yang aman 

### Pengujian Dinamis 

- Lakukan pengujian penetrasi secara berkala 
- Terapkan pemindaian DAST otomatis 
- Gunakan pengujian keamanan aplikasi interaktif 
- Lakukan penilaian kerentanan rutin 
- Uji alur autentikasi dan otorisasi 
- Verifikasi header dan konfigurasi keamanan 
- Simulasikan skenario serangan umum 

## Pemantauan & Respons Keamanan 

### Pencatatan & Pemantauan 

- Terapkan pencatatan keamanan komprehensif 
- Catat peristiwa autentikasi 
- Catat kegagalan kontrol akses 
- Pantau aktivitas mencurigakan 
- Terapkan peringatan waktu nyata 
- Gunakan manajemen log terpusat 
- Pastikan log tahan terhadap gangguan 
- Simpan log untuk jangka waktu yang sesuai 

### Respons Insiden 

- Kembangkan rencana respons insiden 
- Tetapkan peran dan tanggung jawab 
- Tetapkan protokol komunikasi 
- Dokumentasikan prosedur penahanan 
- Terapkan kemampuan analisis forensik 
- Lakukan tinjauan pascainsiden 
- Praktikkan skenario respons insiden 
- Jaga kontak dengan komunitas keamanan 

## Kepatuhan & Privasi 

### Kepatuhan Peraturan 

- Identifikasi peraturan yang berlaku (GDPR, CCPA, dll.) 
- Menerapkan kontrol keamanan yang diperlukan 
- Melakukan penilaian kepatuhan secara berkala 
- Mendokumentasikan langkah-langkah kepatuhan 
- Melatih tim tentang persyaratan kepatuhan 
- Menerapkan privasi berdasarkan desain 
- Menjaga dokumentasi yang diperlukan 

### Pertimbangan Privasi 

- Menerapkan kebijakan privasi yang jelas 
- Memperoleh persetujuan yang tepat untuk pengumpulan data 
- Menyediakan mekanisme akses dan penghapusan data 
- Meminimalkan pengumpulan dan penyimpanan data 
- Menerapkan portabilitas data 
- Melakukan penilaian dampak privasi 
- Mempertimbangkan privasi dalam semua keputusan desain