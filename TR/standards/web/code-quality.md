# Kod Kalite Standartları 

## Temel İlkeler 

- Temiz, sürdürülebilir ve kendi kendini belgeleyen kod yazın 
- SOLID ve DRY ilkelerini izleyin 
- İşlevleri küçük ve odaklı tutun (tek sorumluluk) 
- Değişkenler, işlevler ve sınıflar için açıklayıcı adlandırma kullanın 
- Proje genelinde tutarlı kod stilini koruyun 
- Karmaşık mantığı ve genel API'leri belgelendirin 
- Kodunuzu yalnızca makineler için değil, insanlar için yazın 

## JavaScript/TypeScript Standartları 

### TypeScript Yapılandırması 

- Sıkı modu kullanın (`"strict": true`) 
- Önerilen tüm tür denetimi seçeneklerini etkinleştirin 
- Uygun modül çözünürlüğünü yapılandırın 
- Uygun hedef ECMAScript sürümünü ayarlayın 
- Dahil etme/hariç tutma kalıplarını belirtin 
- Daha temiz içe aktarmalar için yol takma adları kullanın 

### Adlandırma Kuralları 

- **Değişkenler/İşlevler**: camelCase (`getUserData`, `calculateTotal`) 
- **Sınıflar/Arayüzler/Türler**: PascalCase (`UserProfile`, `ApiResponse`) 
- **Sabitler**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_URL`) 
- **Özel özellikler**: `#` önekini veya `_` kuralını kullanın (`#privateField`, `_privateMethod`) 
- **Boole değişkenleri**: "is", "has", "can" öneklerini kullanın (`isActive`, `hasPermission`) 
- **Bileşen dosyaları**: Uzantılı PascalCase (`UserCard.tsx`) 
- **Yardımcı program dosyaları**: Uzantılı camelCase (`formatDate.ts`) 

### Kod Düzenlemesi 

- Dosya başına bir sınıf/bileşen 
- İçe aktarımları şu şekilde gruplandırın harici/dahili 
- İçe aktarmaları alfabetik olarak sıralayın 
- İlgili işlevler için barrel dışa aktarmalarını (`index.ts`) kullanın 
- Kodu özellik/modül bazında düzenleyin 
- Dosyaları 400 satırın altında tutun (daha büyükse bölün) 
- İşlevleri 50 satırın altında tutun 
- Maksimum iç içe yerleştirme: 3-4 seviye derinlik 

### En İyi Uygulamalar 

- Değişmezliği tercih edin (sabit, salt okunur, Object.freeze) 
- İsteğe bağlı zincirleme ve nullish birleştirmeyi kullanın 
- Uygun hata işlemeyi uygulayın 
- Gerekmedikçe herhangi bir türden kaçının 
- Çalışma zamanı tür denetimi için tür koruyucuları kullanın 
- Ham vaatler yerine async/await'i tercih edin 
- Sihirli sayılar ve dizelerden kaçının (sabitleri kullanın) 
- Uygun null/tanımsız denetimleri uygulayın 
- İç içe yerleştirmeyi azaltmak için erken dönüşleri kullanın 

## React Standartları 

### Bileşen Yapısı 

- Kancalı işlevsel bileşenleri tercih edin 
- Bileşenler için adlandırılmış dışa aktarmaları kullanın 
- Prop doğrulamasını uygulayın TypeScript ile
- Karmaşık mantığı özel kancalara ayıklayın
- Bileşenleri kullanıcı arayüzü endişelerine odaklı tutun
- Uygun hata sınırlarını uygulayın
- Performans optimizasyonu için React.memo kullanın
- Yeniden kullanılabilir bileşenleri ayıklayın

### Durum Yönetimi

- Bileşene özgü veriler için yerel durumu kullanın
- Bileşenler arasında paylaşılan durum için bağlamı kullanın
- Karmaşık uygulamalar için harici durum yönetimini göz önünde bulundurun
- Durumu normalleştirilmiş ve minimumda tutun
- Uygun durum başlatmayı uygulayın
- Karmaşık durum mantığı için indirgeyicileri kullanın
- Prop delmeyi önleyin (kompozisyon veya bağlam kullanın)

### Performans Optimizasyonu

- Saf bileşenler için React.memo kullanın
- Pahalı hesaplamalar için useMemo uygulayın
- İşlev belleği için useCallback kullanın
- Uzun listeleri sanallaştırın (react-window, react-virtualized)
- Kancalarda uygun bağımlılık dizilerini uygulayın
- Gereksiz yeniden işlemelerden kaçının
- Darboğazları belirlemek için React Profiler kullanın

## Test Standartları

### Birim Testi

- Tüm iş mantığını ve yardımcı programlarını test edin
- Test yürütücüsü olarak Jest veya Vitest kullanın
- Bağımlılıkların uygun şekilde taklit edilmesini uygulayın
- Bileşen testi için Test Kütüphanesi kullanın
- AAA modelini izleyin (Düzenle, Harekete geç, İddia Et)
- Açıklayıcı test adları yazın
- %80'den fazla kod kapsamını hedefleyin
- Uç durumları ve hata senaryolarını test edin

### Entegrasyon Testi

- Bileşen etkileşimlerini test edin
- Form gönderimlerini ve kullanıcı akışlarını test edin
- API taklitleri için MSW kullanın
- Yönlendirme ve gezinmeyi test edin
- Durum değişikliklerini doğrulayın
- Gerçekçi verilerle test edin

### Uçtan Uca Test

- Cypress veya Playwright kullanın
- Kritik kullanıcı yolculuklarını test edin
- Birden fazla tarayıcıda test edin
- Uygun test izolasyonunu uygulayın
- Test seçicileri için veri niteliklerini kullanın
- Kararsız testler için yeniden deneme mantığını uygulayın
- Erişilebilirliği test edin

## Kod İncelemesi Standartlar 

### İşlem 

- Tüm kod birleştirmeden önce incelenmelidir 
- Otomatik kontroller incelemeden önce geçmelidir 
- Çekme isteği şablonlarını kullanın 
- PR'leri küçük ve odaklı tutun 
- İnceleme yorumlarına derhal yanıt verin 
- Tüm yorumları birleştirmeden önce çözün 
- Birleştirmeden önce taahhütleri sıkıştırın 

### İnceleme Kontrol Listesi 

- Kod proje standartlarına uygundur 
- Testler dahildir ve geçer 
- Belgeler güncellenir 
- Hiçbir güvenlik açığı yoktur 
- Performans etkileri dikkate alınmaz 
- Erişilebilirlik gereksinimleri karşılanır 
- Uç durumlar ele alınır 
- Gereksiz kod veya bağımlılıklar yoktur 

## Araçlar 

### Linting ve Biçimlendirme 

- Uygun kurallarla ESLint 
- Tutarlı biçimlendirme için Prettier 
- Ön taahhüt kancaları için Husky 
- Artımlı linting için lint-staged 
- Tür denetimi için TypeScript derleyicisi 
- CSS/SCSS için Stylelint 

### Statik Analiz 

- SonarQube veya CodeClimate 
- Karmaşıklık ölçümlerinin izlenmesi 
- Yinelenen kod tespiti 
- Güvenlik açığı taraması 
- Paket boyutu analizi 
- Kullanılmayan kod tespiti 

### CI/CD Entegrasyonu 

- Her PR'de tüm kontrolleri çalıştırın 
- Kontroller başarısız olursa birleştirmeyi engelleyin 
- Test kapsamı raporları oluşturun ve yayınlayın 
- Performans gerileme testini uygulayın 
- Bağımlılık güncellemelerini otomatikleştirin 
- Önizleme ortamlarını dağıtın