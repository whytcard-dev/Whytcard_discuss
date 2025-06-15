# Standar Internasionalisasi (i18n) 

## Prinsip Inti 

- Desain untuk audiens global sejak awal 
- Pisahkan konten dari kode 
- Mendukung berbagai bahasa dan lokal 
- Hargai perbedaan dan kepekaan budaya 
- Terapkan deteksi bahasa otomatis 
- Izinkan pemilihan bahasa manual 
- Uji dengan pengguna asli dari pasar sasaran 

## Bahasa & Konten 

### Manajemen Teks 

- Simpan semua teks yang dihadapi pengguna dalam file sumber daya 
- Jangan pernah membuat kode keras string teks dalam komponen 
- Gunakan kunci deskriptif yang unik untuk sumber daya teks 
- Atur terjemahan berdasarkan fitur atau halaman 
- Mendukung aturan pluralisasi untuk berbagai bahasa 
- Tangani variasi khusus gender 
- Mendukung bahasa kanan-ke-kiri (RTL) 
- Terapkan mekanisme fallback untuk terjemahan yang hilang 

### Proses Penerjemahan 

- Berikan konteks untuk penerjemah 
- Sertakan deskripsi placeholder/variabel 
- Gunakan layanan terjemahan profesional 
- Terapkan sistem memori terjemahan 
- Izinkan perluasan teks (beberapa bahasa memerlukan lebih banyak spasi) 
- Berikan tangkapan layar untuk konteks 
- Terapkan proses peninjauan untuk terjemahan 
- Dukung pembaruan terjemahan berkelanjutan 

### Pertimbangan Konten 

- Hindari metafora atau idiom yang spesifik secara budaya 
- Waspadai simbolisme warna lintas budaya 
- Pertimbangkan format nama dan standar alamat yang berbeda 
- Hargai kepekaan dan tabu budaya 
- Sesuaikan konten untuk pasar lokal bila perlu 
- Gunakan citra yang netral secara budaya 
- Pertimbangkan arah membaca (LTR vs RTL) 
- Hindari bahasa gaul dan bahasa sehari-hari 

## Implementasi Teknis 

### Kerangka Kerja & Pustaka 

- Gunakan pustaka i18n yang sudah ada: 
- react-i18next / i18next (React) 
- vue-i18n (Vue) 
- angular/localize (Angular) 
- next-intl (Next.js) 
- Format.js (React) 
- Terapkan deteksi bahasa yang tepat 
- Dukung bahasa beralih tanpa memuat ulang halaman 
- Konfigurasikan bahasa fallback 
- Terapkan pemuatan lambat untuk terjemahan 
- Terjemahan cache untuk kinerja 
- Mendukung kunci terjemahan bersarang 
- Terapkan pluralisasi dan pemformatan 

### Struktur Kode 

- Pisahkan file terjemahan menurut bahasa 
- Gunakan JSON atau YAML untuk sumber daya terjemahan 
- Terapkan namespace untuk aplikasi besar 
- Jaga agar kunci terjemahan tetap teratur dan dapat dipelihara 
- Ikuti konvensi penamaan yang konsisten untuk kunci 
- Dokumentasikan pemformatan atau variabel khusus 
- Terapkan keamanan tipe untuk kunci terjemahan (TypeScript) 
- Mendukung pembuatan kunci dinamis bila perlu 

### Pemformatan 

#### Tanggal & Waktu 

- Gunakan pustaka yang mendukung format tanggal internasional 
- Tampilkan tanggal dalam format pilihan pengguna 
- Pertimbangkan zona waktu dan waktu musim panas 
- Format tanggal menurut konvensi lokal 
- Mendukung sistem kalender yang berbeda bila diperlukan 
- Gunakan format ISO untuk pertukaran data 
- Tampilkan waktu relatif dengan tepat menurut budaya 

#### Angka & Mata Uang 

- Format angka menurut untuk konvensi lokal 
- Gunakan pemisah desimal dan ribuan yang tepat 
- Format mata uang dengan simbol yang sesuai 
- Posisikan simbol mata uang dengan benar berdasarkan lokal 
- Mendukung sistem penomoran yang berbeda 
- Format persentase menurut lokal 
- Pertimbangkan nilai tukar untuk aplikasi multi-wilayah 

#### Alamat & Nomor Telepon 

- Mendukung format alamat yang berbeda 
- Mengakomodasi berbagai format kode pos 
- Menangani nomor telepon internasional (format E.164) 
- Format nomor telepon menurut konvensi lokal 
- Mendukung konvensi urutan nama yang berbeda 
- Pertimbangkan gelar kehormatan dan gelar lintas budaya 
- Validasi alamat menurut aturan khusus negara 

## Pertimbangan UI 

### Tata Letak & Desain 

- Mendesain tata letak fleksibel yang mengakomodasi perluasan teks 
- Mendukung arah teks LTR dan RTL 
- Menerapkan dukungan teks dua arah (bidi) 
- Menguji tata letak dengan string teks yang lebih panjang 
- Hindari wadah dengan lebar tetap untuk teks 
- Pertimbangkan variasi ukuran font di berbagai bahasa 
- Menguji dengan teks yang diterjemahkan secara aktual konten, bukan lorem ipsum 
- Terapkan CSS khusus bahasa saat dibutuhkan 

### Tipografi 

- Gunakan font yang mendukung banyak bahasa 
- Sertakan font fallback yang sesuai 
- Pertimbangkan set karakter untuk bahasa yang berbeda 
- Mendukung karakter khusus dan diakritik 
- Sesuaikan tinggi baris untuk skrip yang berbeda 
- Uji keterbacaan di berbagai bahasa 
- Pertimbangkan teks vertikal untuk beberapa bahasa Asia Timur 
- Gunakan Unicode dengan benar 

### Navigasi & Kontrol 

- Terjemahkan item dan kontrol navigasi 
- Sesuaikan navigasi untuk bahasa RTL 
- Pertimbangkan pola membaca budaya 
- Pastikan ikon netral secara budaya 
- Uji pintasan keyboard di seluruh tata letak keyboard 
- Berikan bantuan dan dokumentasi yang dilokalkan 
- Terjemahkan pesan kesalahan dan pemberitahuan 
- Lokalkan fungsi pencarian 

## Pengujian & Jaminan Kualitas 

### Strategi Pengujian 

- Uji dengan penutur asli 
- Verifikasi terjemahan dalam konteks 
- Uji perluasan dan pemotongan teks 
- Validasi format tanggal, angka, dan mata uang 
- Uji RTL tata letak secara menyeluruh 
- Verifikasi fungsi peralihan bahasa 
- Uji dengan pengaturan lokal yang berbeda 
- Terapkan pengujian i18n otomatis 

### Masalah Umum 

- Periksa string yang dikodekan secara keras 
- Verifikasi pluralisasi yang tepat 
- Cari string yang dirangkai 
- Uji masalah penanganan Unicode 
- Verifikasi pengurutan dan kolasi 
- Periksa asumsi budaya dalam logika 
- Uji dengan kata dan string yang panjang 
- Verifikasi penanganan karakter khusus 

### Alat & Otomatisasi 

- Terapkan linting untuk masalah i18n 
- Gunakan sistem manajemen terjemahan 
- Otomatiskan pembuatan tangkapan layar untuk konteks 
- Terapkan pseudo-lokalisasi untuk pengujian 
- Gunakan pengujian otomatis untuk masalah tata letak 
- Lacak cakupan dan kualitas terjemahan 
- Terapkan pemeriksaan CI/CD untuk i18n 
- Pantau terjemahan yang hilang 

## Hukum & Kepatuhan 

- Teliti persyaratan hukum setempat 
- Sesuaikan kebijakan privasi untuk berbagai wilayah 
- Pertimbangkan GDPR dan peraturan privasi lainnya 
- Sesuaikan ketentuan layanan untuk pasar lokal 
- Waspadai pembatasan konten menurut negara 
- Pertimbangkan persyaratan aksesibilitas menurut wilayah 
- Dokumentasikan langkah-langkah kepatuhan 
- Konsultasikan dengan pakar hukum untuk pasar utama