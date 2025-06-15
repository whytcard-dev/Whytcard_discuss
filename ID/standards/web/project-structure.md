# Standar Struktur Proyek 

## Organisasi Direktori 

### Struktur Root 

``` 
project-root/ 
├── src/ # Kode sumber 
├── public/ # Aset statis 
├── dist/ # Output build (dihasilkan) 
├── node_modules/ # Ketergantungan (dihasilkan) 
├── tests/ # File uji 
├── docs/ # Dokumentasi 
├── .github/ # Alur kerja dan templat GitHub 
├── .vscode/ # Konfigurasi VS Code 
├── scripts/ # Skrip build dan utilitas 
├── package.json # Metadata dan ketergantungan proyek 
├── tsconfig.json # Konfigurasi TypeScript 
├── .eslintrc.js # Konfigurasi ESLint 
├── .prettierrc # Konfigurasi Prettier 
├── .gitignore # Pola abaikan Git 
├── .env.example # Contoh variabel lingkungan 
└── README.md # Dokumentasi proyek 
``` 

### Struktur Direktori Sumber 

``` 
src/ 
├── assets/ # Aset statis yang memerlukan pemrosesan 
│ ├── images/ # Gambar 
│ ├── font/ # Berkas font 
│ └── styles/ # Gaya global 
│ 
├── components/ # UI yang dapat digunakan kembali komponen 
│ ├── common/ # Komponen bersama di seluruh fitur 
│ ├── layout/ # Komponen tata letak 
│ └── ui/ # Komponen UI dasar 
│ 
├── hooks/ # Hook React khusus 
│ 
├── pages/ # Komponen halaman / komponen rute 
│ 
├── features/ # Modul berbasis fitur 
│ ├── feature1/ # Fitur khusus 
│ │ ├── components/ # Komponen khusus fitur 
│ │ ├── hooks/ # Hook khusus fitur 
│ │ ├── api/ # Panggilan API khusus fitur 
│ │ ├── utils/ # Utilitas khusus fitur 
│ │ ├── types/ # Jenis khusus fitur 
│ │ └── index.ts # Ekspor fitur 
│ └── feature2/ # Fitur lain 
│ 
├── services/ # Integrasi layanan 
│ ├── api/ # Klien API dan titik akhir 
│ ├── auth/ # Layanan autentikasi 
│ └── analytics/ # Layanan analitik 
│ 
├── store/ # Manajemen status 
│ ├── slice/ # Irisan Redux atau penyedia konteks 
│ ├── actions/ # Pembuat tindakan 
│ └── selectors/ # Pemilih status 
│ 
├── utils/ # Fungsi utilitas 
│ ├── formatting/ # Utilitas pemformatan 
│ ├── validation/ # Utilitas validasi 
│ └── helpers/ # Fungsi pembantu 
│ 
├── types/ # Definisi tipe TypeScript 
│ ├── api/ # Tipe respons API 
│ ├── models/ # Tipe model data 
│ └── common/ # Definisi tipe umum 
│ 
├── constants/ # Konstanta aplikasi 
│ 
├── i18n/ # Internasionalisasi 
│ ├── locales/ # File terjemahan 
│ └── config.ts # Konfigurasi i18n 
│ 
├── config/ # Konfigurasi aplikasi 
│ ├── routes.ts # Definisi rute 
│ └── settings.ts # Pengaturan aplikasi 
│ 
└── App.tsx # Komponen aplikasi utama 
``` 

## Konvensi Penamaan 

### File dan Direktori 

- **Komponen React**: PascalCase dengan ekstensi 
- `Button.tsx`, `UserProfile.tsx` 
- **Hooks**: camelCase dengan awalan 'use' 
- `useAuth.ts`, `useFetch.ts` 
- **Utilities**: camelCase 
- `formatDate.ts`, `validateEmail.ts` 
- **Constants**: UPPER_SNAKE_CASE 
- `API_ENDPOINTS.ts`, `ROUTE_PATHS.ts` 
- **Types/Interfaces**: PascalCase dengan nama deskriptif 
- `UserData.ts`, `ApiResponse.ts` 
- **Test Files**: Nama yang sama dengan file yang diuji dengan sufiks `.test` atau `.spec` 
- `Button.test.tsx`, `formatDate.spec.ts` 

### Organisasi Komponen 

- **File Komponen**: Satu komponen per file 
- **Struktur Komponen**: 
```tsx 
// Impor 
import React from 'bereaksi'; 
impor './styles.css'; 

// Jenis 
antarmuka ButtonProps { 
// ... 
} 

// Komponen 
ekspor const Button: React.FC<ButtonProps> = ({ children, ...props }) => { 
// ... 
kembali ( 
// JSX 
); 
}; 

// Fungsi pembantu khusus untuk komponen ini 
const helperFunction = () => { 
// ... 
}; ``` 

## Organisasi Modul 

### Urutan Impor 

1. Pustaka eksternal 
2. Modul internal 
3. Komponen 
4. Hook 
5. Utilitas 
6. Tipe 
7. Aset/gaya 

Contoh: 
```tsx 
// Pustaka eksternal 
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

// Modul internal 
import { API_ENDPOINTS } from '@/constants/api'; 
import { fetchData } from '@/services/api'; 

// Komponen 
import { Button } from '@/components/ui'; 
import { Modal } from '@/components/common'; 

// Hooks 
import { useAuth } dari '@/hooks'; 

// Utilities 
import { formatDate } dari '@/utils/formatting'; 

// Types 
import type { UserData } dari '@/types'; 

// Assets/styles 
import './styles.css'; 
``` 

### Pola Ekspor 

- Gunakan ekspor bernama untuk sebagian besar komponen dan fungsi 
- Gunakan ekspor barrel (index.ts) untuk menyederhanakan impor 
- Hindari ekspor default kecuali untuk komponen halaman 

Contoh ekspor barrel: 
```tsx 
// components/ui/index.ts 
export * dari './Button'; 
export * dari './Input'; 
export * dari './Card'; ``` 

## File Konfigurasi 

### Variabel Lingkungan 

- Gunakan file `.env` untuk konfigurasi khusus lingkungan 
- Sertakan `.env.example` dengan dokumentasi 
- Gunakan file khusus lingkungan (`.env.development`, `.env.production`) 
- Jangan pernah melakukan komit nilai sensitif ke kontrol versi 

### Konfigurasi TypeScript 

- Gunakan mode ketat 
- Konfigurasikan alias jalur untuk impor yang lebih bersih 
- Pisahkan konfigurasi untuk lingkungan yang berbeda jika diperlukan 
- Dokumentasikan pilihan konfigurasi yang tidak jelas 

### Manajemen Paket 

- Gunakan file kunci (package-lock.json, yarn.lock, pnpm-lock.yaml) 
- Dokumentasikan versi Node.js yang diperlukan 
- Kelompokkan dependensi secara logis dalam package.json 
- Pisahkan dependensi dev dari dependensi produksi 

## Dokumentasi 

### Dokumentasi Kode 

- Dokumentasikan fungsi dan komponen yang kompleks 
- Gunakan JSDoc untuk dokumentasi fungsi 
- Mendokumentasikan properti untuk komponen React 
- Menyertakan contoh untuk komponen yang dapat digunakan kembali 
- Mendokumentasikan pola manajemen status 

### Dokumentasi Proyek 

- Menyertakan README.md yang komprehensif 
- Mendokumentasikan proses penyiapan dan instalasi 
- Menyertakan instruksi alur kerja pengembangan 
- Mendokumentasikan proses pembuatan dan penerapan 
- Menyimpan CHANGELOG.md untuk riwayat versi 
- Menyertakan panduan kontribusi 

## Praktik Terbaik 

- Mengelompokkan file terkait bersama-sama 
- Menjaga file komponen tetap kecil dan terfokus 
- Memisahkan logika bisnis dari komponen UI 
- Menggunakan alias jalur untuk menghindari jalur impor yang dalam 
- Menjaga organisasi file yang konsisten di seluruh proyek 
- Mendokumentasikan struktur proyek untuk anggota tim baru 
- Menggunakan generator kode untuk konsistensi jika berlaku 
- Meninjau dan menyusun ulang struktur proyek secara berkala