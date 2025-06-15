# Uluslararasılaştırma (i18n) Standartları 

## Temel İlkeler 

- Baştan itibaren küresel kitleler için tasarım 
- İçeriği koddan ayırın 
- Birden fazla dili ve yerel ayarı destekleyin 
- Kültürel farklılıklara ve hassasiyetlere saygı gösterin 
- Otomatik dil algılamayı uygulayın 
- Manuel dil seçimine izin verin 
- Hedef pazarlardan gerçek kullanıcılarla test edin 

## Dil ve İçerik 

### Metin Yönetimi 

- Tüm kullanıcıya bakan metni kaynak dosyalarında saklayın 
- Bileşenlere asla metin dizelerini sabit kodlamayın 
- Metin kaynakları için benzersiz, açıklayıcı anahtarlar kullanın 
- Çevirileri özellik veya sayfaya göre düzenleyin 
- Farklı diller için çoğulculuk kurallarını destekleyin 
- Cinsiyete özgü varyasyonları işleyin 
- Sağdan sola (RTL) dilleri destekleyin 
- Eksik çeviriler için geri dönüş mekanizmaları uygulayın 

### Çeviri Süreci 

- Çevirmenler için bağlam sağlayın 
- Yer tutucu/değişken açıklamaları ekleyin 
- Profesyonel çeviri hizmetleri kullanın 
- Çeviri belleği sistemlerini uygulayın 
- Metin genişlemesine izin verin (bazı diller daha fazla alan gerektirir) 
- Bağlam için ekran görüntüleri sağlayın 
- Çeviriler için bir inceleme süreci uygulayın 
- Sürekli çeviri güncellemelerini destekleyin 

### İçerik Hususları 

- Kültüre özgü metaforlardan veya deyimlerden kaçının 
- Kültürler arası renk sembolizminin farkında olun 
- Farklı isim formatlarını ve adres standartlarını göz önünde bulundurun 
- Kültürel hassasiyetlere ve tabulara saygı gösterin 
- Gerektiğinde içeriği yerel pazarlara uyarlayın 
- Kültürel açıdan nötr imgeler kullanın 
- Okuma yönünü göz önünde bulundurun (LTR ve RTL) 
- Argo ve günlük konuşma diline özgü ifadelerden kaçının 

## Teknik Uygulama 

### Çerçeve ve Kütüphaneler 

- Yerleşik i18n kütüphanelerini kullanın: 
- react-i18next / i18next (React) 
- vue-i18n (Vue) 
- angular/localize (Angular) 
- next-intl (Next.js) 
- Format.js (React) 
- Uygun dil algılamayı uygulayın
- Sayfa yeniden yüklemesi olmadan dil değiştirmeyi destekleyin
- Yedek dilleri yapılandırın
- Çeviriler için tembel yüklemeyi uygulayın
- Performans için çevirileri önbelleğe alın
- İç içe geçmiş çeviri anahtarlarını destekleyin
- Çoğulculuk ve biçimlendirmeyi uygulayın

### Kod Yapısı

- Çeviri dosyalarını dile göre ayırın
- Çeviri kaynakları için JSON veya YAML kullanın
- Büyük uygulamalar için ad alanları uygulayın
- Çeviri anahtarlarını düzenli ve sürdürülebilir tutun
- Anahtarlar için tutarlı adlandırma kurallarını izleyin
- Özel biçimlendirmeyi veya değişkenleri belgelendirin
- Çeviri anahtarları için tür güvenliğini uygulayın (TypeScript)
- Gerektiğinde dinamik anahtar oluşturmayı destekleyin

### Biçimlendirme

#### Tarih ve Saat

- Uluslararası tarih biçimlerini destekleyen kitaplıkları kullanın
- Tarihleri kullanıcının tercih ettiği biçimde görüntüleyin
- Saat dilimlerini ve yaz saati uygulamasını göz önünde bulundurun
- Tarihleri yerel kurallara göre biçimlendirin
- Gerektiğinde farklı takvim sistemlerini destekleyin
- Veri alışverişi için ISO biçimini kullanın
- Göreceli zamanları uygun şekilde görüntüleyin kültür 

#### Sayılar ve Para Birimi 

- Sayıları yerel kurallara göre biçimlendirin 
- Uygun ondalık ve binlik ayırıcıları kullanın 
- Para birimlerini uygun sembollerle biçimlendirin 
- Para birimi sembollerini yerel ayarlara göre doğru şekilde konumlandırın 
- Farklı numaralandırma sistemlerini destekleyin 
- Yüzdeleri yerel ayarlara göre biçimlendirin 
- Çok bölgeli uygulamalar için döviz kurlarını göz önünde bulundurun 

#### Adresler ve Telefon Numaraları 

- Farklı adres biçimlerini destekleyin 
- Çeşitli posta kodu biçimlerini barındırın 
- Uluslararası telefon numaralarını işleyin (E.164 biçimi) 
- Telefon numaralarını yerel kurallara göre biçimlendirin 
- Farklı isim sıralama kurallarını destekleyin 
- Kültürler arasında onursal ifadeleri ve unvanları göz önünde bulundurun 
- Adresleri ülkeye özgü kurallara göre doğrulayın 

## Kullanıcı Arayüzü Hususları 

### Düzen ve Tasarım 

- Metin genişlemesini barındıran esnek düzenler tasarlayın 
- Hem LTR hem de RTL metin yönlerini destekleyin 
- Çift yönlü (bidi) metin desteğini uygulayın 
- Daha uzun metin içeren düzenleri test edin dizeler 
- Metin için sabit genişlikte kapsayıcılardan kaçının 
- Diller arasında yazı tipi boyutu farklılıklarını göz önünde bulundurun 
- Gerçek çevrilmiş içerikle test edin, lorem ipsum ile değil 
- Gerektiğinde dil özelinde CSS uygulayın 

### Tipografi 

- Birden fazla dili destekleyen yazı tipleri kullanın 
- Uygun yazı tipi yedeklerini ekleyin 
- Farklı diller için karakter kümelerini göz önünde bulundurun 
- Özel karakterleri ve diakritik işaretleri destekleyin 
- Farklı betikler için satır yüksekliklerini ayarlayın 
- Diller arasında okunabilirliği test edin 
- Bazı Doğu Asya dilleri için dikey metni göz önünde bulundurun 
- Unicode'u düzgün kullanın 

### Gezinme ve Kontroller 

- Gezinme öğelerini ve kontrollerini çevirin 
- RTL dilleri için gezinmeyi ayarlayın 
- Kültürel okuma kalıplarını göz önünde bulundurun 
- Simgelerin kültürel açıdan nötr olduğundan emin olun 
- Klavye düzenleri arasında klavye kısayollarını test edin 
- Yerelleştirilmiş yardım ve belgeler sağlayın 
- Hata mesajlarını ve bildirimleri çevirin 
- Arama işlevini yerelleştirin 

## Test ve Kalite Güvencesi 

### Test Stratejisi 

- Yerel hoparlörler 
- Bağlamdaki çevirileri doğrulayın 
- Metin genişletme ve kesmeyi test edin 
- Tarih, sayı ve para birimi biçimlendirmesini doğrulayın 
- RTL düzenlerini iyice test edin 
- Dil değiştirme işlevini doğrulayın 
- Farklı yerel ayarlarla test edin 
- Otomatik i18n testini uygulayın 

### Genel Sorunlar 

- Sabit kodlanmış dizeleri kontrol edin 
- Uygun çoğullamayı doğrulayın 
- Birleştirilmiş dizeleri arayın 
- Unicode işleme sorunlarını test edin 
- Sıralama ve sıralamayı doğrulayın 
- Mantıkta kültürel varsayımları kontrol edin 
- Uzun kelimeler ve dizelerle test edin 
- Özel karakterlerin işlenmesini doğrulayın 

### Araçlar ve Otomasyon 

- i18n sorunları için tarama uygulayın 
- Çeviri yönetim sistemlerini kullanın 
- Bağlam için ekran görüntüsü oluşturmayı otomatikleştirin 
- Test için sözde yerelleştirmeyi uygulayın 
- Düzen sorunları için otomatik test kullanın 
- Çeviri kapsamını ve kalitesini izleyin 
- i18n için CI/CD kontrollerini uygulayın 
- Eksik çeviriler 

## Yasal ve Uyumluluk 

- Yerel yasal gereklilikleri araştırın 
- Farklı bölgeler için gizlilik politikalarını uyarlayın 
- GDPR ve diğer gizlilik düzenlemelerini göz önünde bulundurun 
- Hizmet şartlarını yerel pazarlar için uyarlayın 
- Ülkeye göre içerik kısıtlamalarının farkında olun 
- Bölgeye göre erişilebilirlik gerekliliklerini göz önünde bulundurun 
- Uyumluluk önlemlerini belgelendirin 
- Önemli pazarlar için hukuk uzmanlarına danışın