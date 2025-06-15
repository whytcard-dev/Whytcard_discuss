# Tasarım Sistemi Standartları 

## Temel İlkeler 

- **Tutarlılık**: Tüm platformlarda birleşik bir görsel dil yaratın 
- **Erişilebilirlik**: Yeteneklerden bağımsız olarak tüm kullanıcılar için tasarım yapın 
- **Esneklik**: Bileşenler farklı bağlamlara uyum sağlamalıdır 
- **Verimlilik**: Tasarım ve geliştirme iş akışlarını kolaylaştırın 
- **Ölçeklenebilirlik**: Kaliteyi tehlikeye atmadan büyümeyi destekleyin 
- **Belgeleme**: Tüm öğeleri ve kullanım yönergelerini ayrıntılı bir şekilde belgelendirin 
- **Bakım Kolaylığı**: Uzun vadeli bakım ve evrim için tasarım yapın 

## Tasarım Simgeleri 

### Renk Sistemi 

- Kapsamlı bir renk paleti tanımlayın: 
- Birincil marka renkleri 
- İkincil/vurgu renkleri 
- Nötr/gri tonlamalı renkler 
- Anlamsal renkler (başarı, uyarı, hata, bilgi) 
- Yüzey renkleri (arka plan, kart vb.) 
- Renk değişkenlerini net adlandırmayla uygulayın sözleşmeler 
- Renk kullanım yönergelerini ve erişilebilirlik gereksinimlerini tanımlayın 
- Erişilebilirlik için renk kontrast oranlarını belgelendirin 
- Açık ve koyu mod varyantlarını ekleyin 
- Uygulanabilir olduğunda renk opaklık düzeylerini tanımlayın 
- Renk kombinasyonları ve kullanım örnekleri oluşturun 

### Tipografi 

- Sınırlı seçeneklerle net bir yazı ölçeği tanımlayın 
- Uygun yazı tipi ailelerini seçin (birincil, ikincil, tek aralıklı) 
- Tutarlı bir satır yüksekliği ölçeği oluşturun 
- Yazı tipi ağırlıklarını ve kullanımlarını tanımlayın 
- Harf aralığı yönergelerini ayarlayın 
- Başlık stilleri oluşturun (h1-h6) 
- Paragraf ve gövde metin stilleri tanımlayın 
- Metin hizalama kurallarını belirleyin 
- Duyarlı tipografi davranışını belgelendirin 

### Aralık 

- Tutarlı bir aralık ölçeği oluşturun (4px, 8px, 16px, 24px, 32px, vb.) 
- Kenar boşlukları ve dolgu için aralık kullanımını tanımlayın 
- Bileşenler arasındaki aralığı belgelendirin 
- Düzen ızgarası aralık yönergeleri oluşturun 
- Tanımlayın duyarlı aralık varyasyonları
- Bileşene özgü aralık kurallarını belgelendirin
- Aralık yardımcı programları oluşturun

### İkonografi

- Tutarlı bir simge stili oluşturun
- Simge boyutlarını ve ızgarayı tanımlayın
- Simge kullanım yönergelerini belgelendirin
- Simge renk yönergeleri oluşturun
- Uygulama yönergeleri sağlayın (SVG, simge yazı tipi, vb.)
- Simgeler için erişilebilirlik hususlarını ekleyin
- Simgeleri kategoriye göre düzenleyin
- Simge oluşturma sürecini belgelendirin

### Görüntüler ve İllüstrasyonlar

- Fotoğraf stil yönergelerini tanımlayın
- İllüstrasyon stil yönergelerini oluşturun
- Görüntü en boy oranlarını belgelendirin
- Duyarlı görüntü yönergeleri oluşturun
- Görüntü işleme stillerini tanımlayın (gölgeler, kenarlıklar, vb.)
- Görüntüler için erişilebilirlik gereksinimlerini belgelendirin
- Optimizasyon yönergeleri sağlayın

## Bileşenler

### Bileşen Mimarisi

- Bileşen hiyerarşisini ve kompozisyon desenlerini tanımlayın
- Bileşen API standartlarını oluşturun
- Bileşen durumlarını ve varyasyonlarını belgelendirin
- Bileşen genişletilebilirliği için yönergeler oluşturun
- Bileşen duyarlılığını tanımlayın yaklaşım 
- Bileşen başına belge erişilebilirlik gereksinimleri 
- Bileşenler için test standartları oluşturma 

### Temel Bileşenler 

#### Düzen Bileşenleri 

- Izgara sistemi 
- Kapsayıcı 
- Yığın (dikey/yatay) 
- Ayırıcı 
- Aralayıcı 
- Kart 
- Bölüm 
- Duyarlı sarmalayıcılar 

#### Gezinme Bileşenleri 

- Gezinme çubuğu 
- Kenar çubuğu 
- Ekmek kırıntıları 
- Sekmeler 
- Sayfalandırma 
- Menü 
- Açılır menü 
- Bağlantı 

#### Form Bileşenleri 

- Giriş 
- Metin alanı 
- Seç 
- Onay kutusu 
- Radyo düğmesi 
- Geçiş/Anahtar 
- Tarih seçici 
- Dosya yükleme 
- Form düzeni 
- Form doğrulama 
- Form geri bildirimi 

#### Eylem Bileşenleri 

- Düğme (birincil, ikincil, üçüncül) 
- Simge düğmesi 
- Düğme grup 
- Yüzen eylem düğmesi 
- Bağlantı düğmesi 
- Menü düğmesi 

#### Geribildirim Bileşenleri 

- Uyarı/Bildirim 
- Bildirim 
- İlerleme göstergesi 
- İskelet yükleyici 
- Hata durumu 
- Boş durum 
- Başarı durumu 

#### Veri Görüntüleme Bileşenleri 

- Tablo 
- Liste 
- Rozet 
- Avatar 
- Araç ipucu 
- Etiket/Çip 
- İlerleme çubuğu 
- Veri görselleştirme 
- Zaman çizelgesi 

#### Modal Bileşenler 

- İletişim kutusu 
- Modal 
- Çekmece 
- Açılır pencere 
- Alt sayfa 

### Bileşen Belgeleri 

- Kullanım yönergeleri ve örnekleri 
- Özellikler/API belgeleri 
- Erişilebilirlik hususları 
- Kod örnekleri 
- Görsel örnekler 
- Yapılması ve yapılmaması gerekenler 
- İlgili bileşenler 
- Duyarlı davranış 

## Desenler 

### Etkileşim Desenleri 

- Form gönderimi 
- Veri yükleme 
- Hata işleme 
- Sonsuz kaydırma 
- Sürükle ve bırak 
- Seçim 
- Filtreleme 
- Sıralama 
- Sayfalandırma 
- Arama 
- Kimlik doğrulama akışları 

### Düzen Desenleri 

- Sayfa düzenleri 
- Duyarlı desenler 
- Izgara sistemleri 
- Kart düzenleri 
- Liste düzenleri 
- Pano düzenleri 
- Form düzenleri 
- Gezinme düzenleri 

### Animasyon ve Hareket 

- Animasyon ilkelerini tanımla 
- Zamanlama işlevleri oluştur 
- Süre yönergeleri oluştur 
- Belge geçiş desenleri 
- Mikro etkileşimleri tanımla 
- Yükleme animasyonları oluştur 
- Hareket hiyerarşisi oluştur 
- Azaltılmış hareket tercihlerini destekle 

## Uygulama 

### Kod Standartları 

- Bileşen mimarisi (Atomik Tasarım, vb.) 
- CSS metodolojisi (BEM, CSS Modülleri, vb.) 
- CSS-in-JS yaklaşımı varsa 
- JavaScript/TypeScript standartları 
- Erişilebilirlik uygulaması 
- Performans optimizasyonu 
- Tarayıcı/cihaz desteği 

### Tasarım Araçları 

- Tasarım aracı standartları (Figma, Sketch, vb.) 
- Bileşen kitaplığı organizasyonu 
- Tasarım belirteci uygulaması 
- Tasarım teslim süreci 
- Tasarım dosyaları için sürüm kontrolü 
- Tasarım QA süreci 

### Geliştirme Araçları 

- Bileşen geliştirme ortamı (Storybook, vb.) 
- Belge sitesi araçları 
- Test çerçevesi 
- Erişilebilirlik test araçları 
- Görsel regresyon testi 
- CI/CD entegrasyonu 

## Yönetim 

### Sürümleme 

- Anlamsal sürümleme stratejisi 
- Kullanım dışı bırakma politikası 
- Değişiklik yönergelerini bozma 
- Göç kılavuzları 
- Sürüm notları standartları 
- Sürüm geçmişi belgeleri 

### Katkı Süreci 

- Bileşen teklif süreci 
- Tasarım inceleme süreci 
- Kod incelemesi standartlar 
- Belgeleme gereksinimleri 
- Test gereksinimleri 
- Erişilebilirlik incelemesi 
- Sürüm süreci 

### Bakım 

- Düzenli denetim programı 
- Performans izleme 
- Erişilebilirlik izleme 
- Kullanım analitiği 
- Geri bildirim toplama 
- Sürekli iyileştirme süreci 
- Kullanımdan kaldırma ve kaldırma süreci