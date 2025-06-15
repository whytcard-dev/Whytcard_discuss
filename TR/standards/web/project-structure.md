# Proje Yapısı Standartları 

## Dizin Organizasyonu 

### Kök Yapısı 

``` 
project-root/ 
├── src/ # Kaynak kodu 
├── public/ # Statik varlıklar 
├── dist/ # Derleme çıktısı (oluşturulan) 
├── node_modules/ # Bağımlılıklar (oluşturulan) 
├── tests/ # Test dosyaları 
├── docs/ # Belgeler 
├── .github/ # GitHub iş akışları ve şablonları 
├── .vscode/ # VS Code yapılandırması 
├── scripts/ # Derleme ve yardımcı program betikleri 
├── package.json # Proje meta verileri ve bağımlılıklar 
├── tsconfig.json # TypeScript yapılandırması 
├── .eslintrc.js # ESLint yapılandırması 
├── .prettierrc # Daha güzel yapılandırma 
├── .gitignore # Git desenleri yoksay 
├── .env.example # Örnek ortam değişkenleri 
└── README.md # Proje belgeleri 
``` 

### Kaynak Dizin Yapısı 

``` 
src/ 
├── asset/ # İşlenmesi gereken statik varlıklar 
│ ├── images/ # Resimler 
│ ├── fonts/ # Font dosyaları 
│ └── styles/ # Genel stiller 
│ 
├── components/ # Yeniden kullanılabilir kullanıcı arayüzü bileşenleri 
│ ├── common/ # Özellikler arasında paylaşılan bileşenler 
│ ├── layout/ # Düzen bileşenleri 
│ └── ui/ # Temel kullanıcı arayüzü bileşenleri 
│ 
├── hooks/ # Özel React kancaları 
│ 
├── pages/ # Sayfa bileşenleri / rota bileşenleri 
│ 
├── features/ # Özellik tabanlı modüller 
│ ├── feature1/ # Belirli özellik 
│ │ ├── components/ # Özelliğe özgü bileşenler 
│ │ ├── hooks/ # Özelliğe özgü kancalar 
│ │ ├── api/ # Özellik-özel API çağrıları 
│ │ ├── utils/ # Özellik-özel yardımcı programlar 
│ │ ├── types/ # Özellik-özel türler 
│ │ └── index.ts # Özellik dışa aktarmaları 
│ └── feature2/ # Başka bir özellik 
│ 
├── services/ # Hizmet bütünleştirmeleri 
│ ├── api/ # API istemcisi ve uç noktaları 
│ ├── auth/ # Kimlik doğrulama hizmeti 
│ └── analytics/ # Analitik hizmeti 
│ 
├── store/ # Durum yönetimi 
│ ├── dilimler/ # Redux dilimleri veya bağlam sağlayıcıları 
│ ├── eylemler/ # Eylem oluşturucuları 
│ └── seçiciler/ # Durum seçiciler 
│ 
├── utils/ # Yardımcı işlevler 
│ ├── biçimlendirme/ # Biçimlendirme yardımcı programları 
│ ├── doğrulama/ # Doğrulama yardımcı programları 
│ └── yardımcılar/ # Yardımcı işlevler 
│ 
├── türleri/ # TypeScript tür tanımları 
│ ├── api/ # API yanıt türleri 
│ ├── modeller/ # Veri modeli türleri 
│ └── ortak/ # Ortak tür tanımlar 
│ 
├── constants/ # Uygulama sabitleri 
│ 
├── i18n/ # Uluslararasılaştırma 
│ ├── locales/ # Çeviri dosyaları 
│ └── config.ts # i18n yapılandırması 
│ 
├── config/ # Uygulama yapılandırması 
│ ├── routes.ts # Rota tanımları 
│ └── settings.ts # Uygulama ayarları 
│ 
└── App.tsx # Ana uygulama bileşeni 
``` 

## Adlandırma Kuralları 

### Dosyalar ve Dizinler 

- **React Bileşenleri**: Uzantılı PascalCase 
- `Button.tsx`, `UserProfile.tsx` 
- **Kancalar**: 'use' önekiyle camelCase 
- `useAuth.ts`, `useFetch.ts` 
- **Yardımcı Programlar**: camelCase 
- `formatDate.ts`, `validateEmail.ts` 
- **Sabitler**: UPPER_SNAKE_CASE 
- `API_ENDPOINTS.ts`, `ROUTE_PATHS.ts` 
- **Türler/Arayüzler**: Açıklayıcı adlarla PascalCase 
- `UserData.ts`, `ApiResponse.ts` 
- **Test Dosyaları**: `.test` veya `.spec` son ekiyle test edilen dosyayla aynı ad 
- `Button.test.tsx`, `formatDate.spec.ts` 

### Bileşen Organizasyonu 

- **Bileşen Dosyaları**: Dosya başına bir bileşen 
- **Bileşen Yapısı**: 
```tsx 
// İçe Aktarımlar 
import React from 'react'; 
import './styles.css'; 

// Türler 
interface ButtonProps { 
// ... 
} 

// Bileşen 
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => { 
// ... 
return ( 
// JSX 
); 
}; 

// Bu bileşene özgü yardımcı işlevler 
const helperFunction = () => { 
// ... 
};
``` 

## Modül Organizasyonu 

### İçe Aktarma Sırası 

1. Harici kütüphaneler 
2. Dahili modüller 
3. Bileşenler 
4. Kancalar 
5. Yardımcı Programlar 
6. Türler 
7. Varlıklar/stiller 

Örnek: 
```tsx 
// Harici kütüphaneler 
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

// Dahili modüller 
import { API_ENDPOINTS } from '@/constants/api'; 
import { fetchData } from '@/services/api'; 

// Bileşenler 
import { Button } from '@/components/ui'; 
import { Modal } from '@/components/common'; 

// Kancalar 
import { useAuth } from '@/hooks'; 

// Yardımcı Programlar 
import { formatDate } from '@/utils/formatting'; 

// Türler 
import type { UserData } from '@/types'; 

// Varlıklar/stililer 
import './styles.css'; 
``` 

### Desenleri Dışa Aktar 

- Çoğu bileşen ve işlev için adlandırılmış dışa aktarmaları kullan 
- İçe aktarmaları basitleştirmek için barrel dışa aktarmalarını (index.ts) kullan 
- Sayfa bileşenleri hariç varsayılan dışa aktarmalardan kaçın 

Örnek barrel dışa aktarma: 
```tsx 
// components/ui/index.ts 
export * from './Button'; 
export * from './Input'; 
export * from './Card'; 
``` 

## Yapılandırma Dosyaları 

### Ortam Değişkenleri 

- Ortama özgü yapılandırma için `.env` dosyalarını kullanın 
- Belgelerle `.env.example` ekleyin 
- Ortama özgü dosyaları kullanın (`.env.development`, `.env.production`) 
- Hassas değerleri asla sürüm denetimine kaydetmeyin 

### TypeScript Yapılandırması 

- Sıkı modu kullanın 
- Daha temiz içe aktarımlar için yol takma adlarını yapılandırın 
- Gerekirse farklı ortamlar için ayrı yapılandırmalar yapın 
- Açık olmayan yapılandırma seçimlerini belgelendirin 

### Paket Yönetimi 

- Bir kilit dosyası kullanın (package-lock.json, yarn.lock, pnpm-lock.yaml) 
- Gerekli Node.js sürümünü belgelendirin 
- Bağımlılıkları mantıksal olarak package.json'da gruplayın 
- Geliştirme bağımlılıklarını üretim bağımlılıklarından ayırın 

## Belgeler 

### Kod Belgeleri 

- Belge karmaşık işlevler ve bileşenler 
- İşlev dokümantasyonu için JSDoc kullanın 
- React bileşenleri için belgeleri destekleyin 
- Yeniden kullanılabilir bileşenler için örnekler ekleyin 
- Durum yönetimi kalıplarını belgelendirin 

### Proje Dokümantasyonu 

- Kapsamlı bir README.md ekleyin 
- Kurulum ve yükleme sürecini belgelendirin 
- Geliştirme iş akışı talimatlarını ekleyin 
- Derleme ve dağıtım sürecini belgelendirin 
- Sürüm geçmişi için bir CHANGELOG.md tutun 
- Katkıda bulunma yönergelerini ekleyin 

## En İyi Uygulamalar 

- İlgili dosyaları birlikte gruplandırın 
- Bileşen dosyalarını küçük ve odaklı tutun 
- İş mantığını kullanıcı arayüzü bileşenlerinden ayırın 
- Derin içe aktarma yollarından kaçınmak için yol takma adları kullanın 
- Proje genelinde tutarlı dosya organizasyonunu koruyun 
- Yeni ekip üyeleri için proje yapısını belgelendirin 
- Uygun olduğunda tutarlılık için kod oluşturucuları kullanın 
- Proje yapısını periyodik olarak inceleyin ve yeniden düzenleyin