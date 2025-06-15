# Standar Kualitas Kode 

## Prinsip Inti 

- Tulis kode yang bersih, dapat dipelihara, dan mendokumentasikan diri sendiri 
- Ikuti prinsip SOLID dan DRY 
- Jaga fungsi tetap kecil dan fokus (tanggung jawab tunggal) 
- Gunakan penamaan deskriptif untuk variabel, fungsi, dan kelas 
- Pertahankan gaya kode yang konsisten di seluruh proyek 
- Dokumentasikan logika kompleks dan API publik 
- Tulis kode untuk manusia, bukan hanya mesin 

## Standar JavaScript/TypeScript 

### Konfigurasi TypeScript 

- Gunakan mode ketat (`"strict": true`) 
- Aktifkan semua opsi pemeriksaan tipe yang direkomendasikan 
- Konfigurasikan resolusi modul yang tepat 
- Tetapkan versi ECMAScript target yang sesuai 
- Tentukan pola penyertaan/pengecualian 
- Gunakan alias jalur untuk impor yang lebih bersih 

### Konvensi Penamaan 

- **Variabel/Fungsi**: camelCase (`getUserData`, `calculateTotal`) 
- **Kelas/Antarmuka/Tipe**: PascalCase (`UserProfile`, `ApiResponse`) 
- **Konstanta**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_URL`) 
- **Properti pribadi**: Gunakan awalan `#` atau konvensi `_` (`#privateField`, `_privateMethod`) 
- **Variabel Boolean**: Gunakan awalan "is", "has", "can" (`isActive`, `hasPermission`) 
- **Berkas komponen**: PascalCase dengan ekstensi (`UserCard.tsx`) 
- **Berkas utilitas**: camelCase dengan ekstensi (`formatDate.ts`) 

### Organisasi Kode 

- Satu kelas/komponen per berkas 
- Kelompokkan impor berdasarkan eksternal/internal 
- Urutkan impor menurut abjad 
- Gunakan ekspor barel (`index.ts`) untuk fungsi terkait 
- Atur kode berdasarkan fitur/modul 
- Pertahankan file di bawah 400 baris (pisahkan jika lebih besar) 
- Pertahankan fungsi di bawah 50 baris 
- Nesting maksimum: kedalaman 3-4 level 

### Praktik Terbaik 

- Lebih suka kekekalan (const, readonly, Object.freeze) 
- Gunakan rantai opsional dan penggabungan nullish 
- Terapkan penanganan kesalahan yang tepat 
- Hindari semua tipe kecuali bila perlu 
- Gunakan pelindung tipe untuk pemeriksaan tipe runtime 
- Lebih suka async/await daripada janji mentah 
- Hindari angka dan string ajaib (gunakan konstanta) 
- Terapkan pemeriksaan null/undefined yang tepat 
- Gunakan pengembalian awal untuk mengurangi nesting 

## Standar React 

### Struktur Komponen 

- Lebih suka komponen fungsional dengan kait 
- Gunakan ekspor bernama untuk komponen 
- Terapkan validasi prop dengan TypeScript 
- Ekstrak logika kompleks ke kait khusus 
- Jaga komponen tetap fokus pada UI kekhawatiran 
- Terapkan batasan kesalahan yang tepat 
- Gunakan React.memo untuk pengoptimalan kinerja 
- Ekstrak komponen yang dapat digunakan kembali 

### Manajemen Status 

- Gunakan status lokal untuk data khusus komponen 
- Gunakan konteks untuk status bersama di seluruh komponen 
- Pertimbangkan manajemen status eksternal untuk aplikasi yang kompleks 
- Jaga status tetap normal dan minimal 
- Terapkan inisialisasi status yang tepat 
- Gunakan pereduksi untuk logika status yang kompleks 
- Hindari pengeboran prop (gunakan komposisi atau konteks) 

### Optimalisasi Kinerja 

- Gunakan React.memo untuk komponen murni 
- Terapkan useMemo untuk kalkulasi mahal 
- Gunakan useCallback untuk memoisasi fungsi 
- Virtualisasi daftar panjang (react-window, react-virtualized) 
- Terapkan array dependensi yang tepat dalam kait 
- Hindari render ulang yang tidak perlu 
- Gunakan React Profiler untuk mengidentifikasi kemacetan 

## Standar Pengujian 

### Pengujian Unit 

- Uji semua logika bisnis dan utilitas 
- Gunakan Jest atau Vitest sebagai pelari pengujian 
- Terapkan tiruan dependensi yang tepat 
- Gunakan Pustaka Pengujian untuk pengujian komponen 
- Ikuti pola AAA (Arrange, Act, Assert) 
- Tulis nama pengujian yang deskriptif 
- Targetkan cakupan kode >80% 
- Uji kasus tepi dan skenario kesalahan 

### Pengujian Integrasi 

- Uji interaksi komponen 
- Uji pengiriman formulir dan alur pengguna 
- Gunakan MSW untuk tiruan API 
- Uji perutean dan navigasi 
- Verifikasi perubahan status 
- Uji dengan data yang realistis 

### Pengujian Ujung-ke-Ujung 

- Gunakan Cypress atau Playwright 
- Uji perjalanan pengguna yang penting 
- Uji pada beberapa browser 
- Terapkan isolasi pengujian yang tepat 
- Gunakan atribut data untuk pemilih pengujian 
- Terapkan logika coba lagi untuk pengujian yang tidak stabil 
- Uji aksesibilitas 

## Standar Tinjauan Kode 

### Proses 

- Semua kode harus ditinjau sebelum digabungkan 
- Pemeriksaan otomatis harus lulus sebelum ditinjau 
- Gunakan templat permintaan tarik 
- Pertahankan PR kecil dan terfokus 
- Tanggapi komentar ulasan dengan segera 
- Selesaikan semua komentar sebelum penggabungan 
- Batalkan komitmen sebelum penggabungan 

### Daftar Periksa Tinjauan 

- Kode mengikuti standar proyek 
- Pengujian disertakan dan lulus 
- Dokumentasi diperbarui 
- Tidak ada kerentanan keamanan 
- Implikasi kinerja dipertimbangkan 
- Persyaratan aksesibilitas terpenuhi 
- Kasus tepi ditangani 
- Tidak ada kode atau dependensi yang tidak perlu 

## Perkakas 

### Linting dan Pemformatan 

- ESLint dengan aturan yang sesuai 
- Lebih cantik untuk pemformatan yang konsisten 
- Husky untuk kait pra-komit 
- lint-staged untuk linting inkremental 
- Kompiler TypeScript untuk pemeriksaan tipe 
- Stylelint untuk CSS/SCSS 

### Analisis Statis 

- SonarQube atau CodeClimate 
- Pemantauan metrik kompleksitas 
- Deteksi kode duplikat 
- Pemindaian kerentanan keamanan 
- Analisis ukuran bundel 
- Deteksi kode yang tidak digunakan 

### Integrasi CI/CD 

- Jalankan semua pemeriksaan pada setiap PR 
- Penggabungan blok jika pemeriksaan gagal 
- Hasilkan dan publikasikan laporan cakupan pengujian 
- Terapkan pengujian regresi kinerja 
- Otomatiskan pembaruan dependensi 
- Terapkan lingkungan pratinjau