# Standar Desain UI/UX 

## Prinsip Desain 

- **Konsistensi**: Pertahankan konsistensi visual dan fungsional di seluruh situs 
- **Kejelasan**: Desain antarmuka yang jelas yang meminimalkan beban kognitif 
- **Umpan Balik**: Berikan umpan balik yang jelas untuk semua interaksi pengguna 
- **Efisiensi**: Minimalkan langkah-langkah untuk menyelesaikan tugas 
- **Pengampunan**: Izinkan pengguna untuk membatalkan tindakan dan memulihkan dari kesalahan 
- **Aksesibilitas**: Desain untuk pengguna dengan semua kemampuan 
- **Kesederhanaan**: Jaga agar antarmuka tetap sederhana dan intuitif 

## Desain Visual 

### Sistem Warna 

- Tetapkan palet warna primer, sekunder, dan aksen 
- Sertakan warna semantik (sukses, peringatan, kesalahan, info) 
- Pastikan rasio kontras yang cukup (minimum WCAG AA: 4,5:1 untuk teks normal) 
- Tetapkan variabel warna untuk mode terang dan gelap 
- Batasi palet warna hingga 5-7 warna inti dengan variasi 
- Dokumentasikan panduan penggunaan warna dan makna 
- Uji warna untuk aksesibilitas buta warna 

### Tipografi 

- Pilih font utama untuk UI dan font sekunder untuk konten (jika diperlukan) 
- Tetapkan skala jenis huruf yang jelas dengan ukuran terbatas (misalnya, 12, 14, 16, 18, 24, 30, 36, 48px) 
- Pertahankan tinggi baris yang tepat (1,4-1,6 untuk teks isi) 
- Pastikan ukuran font minimum 16px untuk teks isi 
- Tetapkan ketebalan font (reguler, sedang, tebal) 
- Tetapkan spasi huruf yang sesuai 
- Pastikan teks tetap dapat dibaca di semua latar belakang 
- Gunakan unit relatif (rem/em) alih-alih piksel 

### Spasi & Tata Letak 

- Buat skala spasi yang konsisten (4px, 8px, 16px, 24px, 32px, 48px, 64px) 
- Terapkan padding dan margin yang konsisten 
- Gunakan sistem grid untuk penyelarasan dan struktur 
- Pertahankan ruang putih yang tepat untuk keterbacaan 
- Tentukan spasi komponen standar 
- Pastikan hierarki konten yang tepat 
- Terapkan pola tata letak responsif 

### Citra & Ikon 

- Gunakan gaya dan ukuran ikon yang konsisten 
- Pastikan ikon dapat dikenali dan bermakna 
- Berikan alternatif teks untuk ikon 
- Optimalkan gambar untuk kinerja 
- Terapkan gambar responsif 
- Pertahankan rasio aspek gambar yang konsisten 
- Gunakan SVG untuk ikon dan ilustrasi sederhana 

## Komponen & Pola 

### Pustaka Komponen 

- Bangun pustaka komponen yang komprehensif 
- Dokumentasikan penggunaan dan variasi komponen 
- Pastikan komponen dapat diakses 
- Buat komponen responsif 
- Tentukan status komponen (default, hover, active, focus, disabled) 
- Terapkan pola animasi yang konsisten 
- Buat pola yang dapat digunakan kembali untuk kebutuhan UI umum 

### Navigasi 

- Terapkan navigasi yang jelas dan konsisten 
- Berikan indikator visual untuk lokasi saat ini 
- Pastikan navigasi dapat diakses dengan keyboard 
- Buat item navigasi deskriptif 
- Batasi navigasi utama ke 7±2 item 
- Menyediakan navigasi sekunder untuk situs yang kompleks 
- Menerapkan breadcrumb untuk struktur navigasi mendalam 

### Formulir 

- Mengelompokkan bidang formulir terkait 
- Menyediakan label yang jelas untuk semua bidang formulir 
- Menampilkan kesalahan validasi sebaris 
- Menunjukkan bidang yang diperlukan 
- Menggunakan jenis input yang sesuai 
- Menerapkan urutan tab yang logis 
- Menampilkan pesan kesalahan yang membantu 
- Menyediakan konfirmasi keberhasilan 
- Mempertahankan status selama kesalahan pengiriman formulir 

### Konten 

- Membuat konten yang dapat dipindai dengan judul yang jelas 
- Menggunakan daftar berpoin untuk beberapa item 
- Menjaga paragraf tetap pendek (3-5 baris) 
- Menggunakan subjudul yang bermakna 
- Menerapkan hierarki konten yang tepat 
- Memastikan keterbacaan (skor membaca Flesch) 
- Menggunakan bahasa yang sederhana (menghindari jargon) 

## Desain Interaksi 

### Interaksi mikro 

- Mendesain animasi yang halus dan bertujuan 
- Menjaga animasi di bawah 300 ms untuk umpan balik UI 
- Memberikan umpan balik visual untuk semua interaksi 
- Pastikan animasi tidak mengganggu kegunaan 
- Terapkan pola transisi yang konsisten 
- Gunakan animasi untuk memandu perhatian 
- Hargai preferensi gerakan yang dikurangi 

### Status & Umpan Balik 

- Rancang semua status elemen interaktif: 
- Default 
- Arahkan kursor 
- Fokus 
- Aktif 
- Dinonaktifkan 
- Berikan umpan balik langsung untuk tindakan pengguna 
- Tunjukkan status sistem dengan jelas 
- Gunakan indikator pemuatan yang sesuai 
- Terapkan status kesalahan yang memandu resolusi 
- Rancang status kosong untuk daftar dan tampilan data 

### Seluler & Sentuh 

- Rancang untuk target sentuh (minimal 44×44px) 
- Perhitungkan zona jempol pada perangkat seluler 
- Terapkan interaksi berbasis gerakan secara konsisten 
- Hindari interaksi yang bergantung pada gerakan kursor pada perangkat seluler 
- Rancang untuk orientasi potret dan lanskap 
- Pastikan target ketuk memiliki jarak yang cukup 
- Optimalkan untuk penggunaan satu tangan jika memungkinkan 

## Pengalaman Pengguna 

### Prinsip Kegunaan 

- Ikuti pola desain yang dikenal 
- Minimalkan beban kognitif 
- Jadikan tindakan penting jelas 
- Berikan ajakan bertindak yang jelas 
- Desain antarmuka yang dapat diprediksi 
- Prioritaskan konten berdasarkan kepentingan 
- Hilangkan kerumitan yang tidak perlu 

### Desain Responsif 

- Terapkan pendekatan desain yang mengutamakan perangkat seluler 
- Tentukan titik henti standar (misalnya, 320 piksel, 768 piksel, 1024 piksel, 1440 piksel) 
- Sesuaikan tata letak dengan tepat untuk setiap titik henti 
- Pastikan antarmuka yang ramah sentuhan di perangkat seluler 
- Uji pada perangkat sebenarnya, bukan hanya emulator 
- Pertimbangkan kemampuan dan keterbatasan perangkat 
- Optimalkan kinerja untuk jaringan seluler 

### Aksesibilitas (WCAG) 

- Ikuti standar minimum WCAG 2.1 AA 
- Pastikan navigasi keyboard 
- Berikan kontras warna yang cukup 
- Sertakan atribut ARIA yang tepat 
- Buat formulir yang dapat diakses 
- Uji dengan pembaca layar 
- Mendukung pengubahan ukuran teks hingga 200% 
- Terapkan indikator fokus 
- Berikan teks alternatif untuk gambar 
- Buat tabel data yang dapat diakses 

## Riset & Pengujian 

### Riset Pengguna 

- Lakukan wawancara dan survei pengguna 
- Buat persona berbasis bukti 
- Petakan perjalanan pengguna 
- Identifikasi titik masalah dan peluang 
- Validasi asumsi dengan pengguna nyata 
- Gunakan analitik untuk menginformasikan keputusan desain 
- Terapkan mekanisme umpan balik berkelanjutan 

### Pengujian Kegunaan 

- Uji desain dengan pengguna representatif 
- Lakukan pengujian yang dimoderasi dan tidak dimoderasi 
- Uji di berbagai perangkat dan browser 
- Ukur rasio penyelesaian tugas 
- Kumpulkan umpan balik kualitatif 
- Ulangi berdasarkan hasil pengujian 
- Uji dengan teknologi bantuan