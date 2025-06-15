# Standar Performa Web 

## Sasaran Performa 

- Skor Lighthouse: 90+ untuk semua metrik 
- Target Core Web Vitals: 
- LCP (Largest Contentful Paint): < 2,5 detik 
- FID (First Input Delay): < 100 md 
- CLS (Cumulative Layout Shift): < 0,1 
- INP (Interaction to Next Paint): < 200 md 
- Time to Interactive: < 3 detik 
- First Contentful Paint: < 1,8 detik 
- Total berat halaman: < 1 MB (idealnya < 500 KB) 
- Permintaan HTTP: < 50 per halaman 

## Optimasi Gambar 

- Gunakan format WebP/AVIF dengan fallback untuk browser lama 
- Terapkan gambar responsif dengan atribut `srcset` dan `sizes` 
- Gambar lazy load di bawah lipatan 
- Ukuran gambar yang tepat (hindari penyajian gambar besar yang diskalakan down via CSS) 
- Gunakan CDN gambar untuk mengubah ukuran dinamis jika memungkinkan 
- Optimalkan SVG dan hapus metadata yang tidak diperlukan 
- Kompres semua gambar dengan alat seperti ImageOptim, TinyPNG, atau Squoosh 
- Pertimbangkan teknik blur-up untuk pemuatan progresif 

## Optimasi JavaScript 

- Terapkan pemisahan kode dan impor dinamis 
- Tunda JavaScript yang tidak penting 
- Gunakan tree-shaking untuk menghilangkan kode mati 
- Minimalkan dan kompres file JavaScript 
- Hindari JavaScript yang memblokir render 
- Gunakan pekerja web untuk tugas-tugas yang intensif CPU 
- Terapkan prioritas permintaan 
- Optimalkan skrip pihak ketiga dan gunakan atribut async/defer 

## Optimasi CSS 

- Minimalkan dan sebariskan CSS penting 
- Hapus CSS yang tidak digunakan dengan alat seperti PurgeCSS 
- Hindari impor CSS (gunakan penggabungan sebagai gantinya) 
- Gunakan penahanan CSS untuk komponen independen 
- Optimalkan pemilih CSS untuk kinerja 
- Pertimbangkan implikasi kinerja CSS-in-JS 
- Gunakan CSS variabel untuk pemeliharaan yang lebih baik 
- Terapkan pemisahan kode CSS untuk aplikasi besar 

## Optimasi Font 

- Gunakan font sistem jika memungkinkan 
- Terapkan font-display: swap atau opsional 
- Subset font untuk menyertakan hanya karakter yang diperlukan 
- Host font sendiri alih-alih menggunakan layanan pihak ketiga 
- Muat font penting terlebih dahulu 
- Gunakan font variabel untuk beberapa bobot/gaya 
- Batasi variasi font (bobot, gaya) 

## Strategi Caching 

- Terapkan kebijakan cache yang efektif 
- Cache panjang untuk aset statis (1 tahun+) 
- Cache pendek/tidak ada untuk HTML 
- Gunakan nama file berversi atau string kueri untuk cache busting 
- Terapkan pekerja layanan untuk dukungan offline 
- Gunakan localStorage/IndexedDB untuk caching sisi klien 
- Konfigurasikan header cache HTTP dengan benar 
- Terapkan caching CDN 

## Optimasi Server 

- Aktifkan HTTP/2 atau HTTP/3 
- Terapkan kompresi sisi server (Brotli/Gzip) 
- Gunakan CDN untuk pengiriman konten global 
- Optimalkan respons API (paginasi, pemilihan bidang) 
- Terapkan komputasi tepi untuk konten dinamis 
- Konfigurasikan pengaturan CORS yang tepat 
- Optimalkan Waktu ke Byte Pertama (TTFB) 
- Gunakan petunjuk prakoneksi, praambil, dan pramuat HTTP 

## Optimalisasi Seluler 

- Prioritaskan kinerja seluler (pendekatan yang mengutamakan seluler) 
- Optimalkan target sentuh (min 44×44px) 
- Kurangi muatan jaringan untuk perangkat seluler 
- Terapkan pola desain responsif 
- Uji pada perangkat seluler yang sebenarnya, bukan hanya emulator 
- Pertimbangkan gerakan yang dikurangi untuk animasi 
- Optimalkan untuk skenario konektivitas offline/buruk 

## Pemantauan & Pengujian 

- Terapkan Pemantauan Pengguna Nyata (RUM) 
- Siapkan pemantauan sintetis untuk alur pengguna yang penting 
- Gunakan WebPageTest untuk analisis kinerja terperinci 
- Pantau Core Web Vitals di Google Search Console 
- Siapkan anggaran dan peringatan kinerja 
- Lakukan audit kinerja rutin 
- Terapkan pengujian A/B untuk kinerja perbaikan 
- Gunakan panel Kinerja Chrome DevTools untuk pembuatan profil 

## Teknik Lanjutan 

- Terapkan petunjuk sumber daya (prakoneksi, pramuat, praambil) 
- Gunakan pengamat persimpangan untuk pemuatan lambat 
- Pertimbangkan rendering sisi server atau pembuatan situs statis 
- Terapkan pola basi-saat-validasi-ulang 
- Gunakan requestIdleCallback untuk tugas yang tidak penting 
- Pertimbangkan peta impor untuk pemuatan modul 
- Terapkan praambil prediktif berdasarkan perilaku pengguna 
- Gunakan petunjuk prioritas untuk sumber daya penting