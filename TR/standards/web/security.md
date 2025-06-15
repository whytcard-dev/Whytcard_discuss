# Web Güvenlik Standartları 

## Temel Güvenlik İlkeleri 

- Derinlemesine savunma (birden fazla güvenlik katmanı) 
- En az ayrıcalık ilkesi 
- Tasarım ve varsayılan olarak güvenli 
- Düzenli güvenlik testi ve denetimi 
- Güvenlik bağımlılıklarını güncel tutun 
- Güvenli bir şekilde başarısız olun (güvenli varsayılanlar) 
- Tam arabuluculuk (her isteği doğrulayın) 
- Tüm ekip üyeleri için güvenlik eğitimi 

## Kimlik Doğrulama ve Yetkilendirme 

### Kimlik Doğrulama 

- Güçlü parola politikaları uygulayın 
- Minimum uzunluk: 12 karakter 
- Karakter, sayı ve sembol kombinasyonunu zorunlu kılın 
- Yaygın parola listelerine karşı kontrol edin 
- Çok faktörlü kimlik doğrulamayı (MFA) destekleyin 
- Güvenli oturum yönetimini kullanın 
- Yalnızca HTTP çerezleri 
- HTTPS için güvenli bayrak 
- SameSite niteliği 
- Uygun son kullanma tarihi 
- Başarısız girişimlerden sonra hesap kilitlemeyi uygulayın 
- Güvenli parola sıfırlama akışları 
- Güvenli parola depolamasını kullanın (bcrypt/Argon2) 
- Parolasız seçenekleri göz önünde bulundurun (WebAuthn, sihirli bağlantılar) 

### Yetkilendirme 

- Rol tabanlı erişim denetimini (RBAC) uygulayın 
- Karmaşık izinler için öznitelik tabanlı erişim denetimi kullanın 
- Her istekte yetkilendirmeyi doğrulayın 
- Uygun erişim denetimi kontrollerini uygulayın 
- Güvenli oturum işlemeyi kullanın 
- API yetkilendirmesini uygulayın (OAuth 2.0, JWT) 
- Doğrudan nesne referanslarından kaçının 
- Tüm erişim denetimi hatalarını günlüğe kaydedin 

## Veri Koruması 

### Hassas Veriler 

- Hassas verileri tanımlayın ve sınıflandırın 
- Hareket halindeki hassas verileri şifreleyin 
- Aktarım halindeki veriler için TLS 1.3 kullanın 
- Uygun anahtar yönetimini uygulayın 
- Hassas verilerin toplanmasını en aza indirin 
- Veri en aza indirme ilkelerini uygulayın 
- Güvenli veri silmeyi uygulayın 
- API anahtarları ve sırları için güvenli depolama kullanın 

### Giriş Doğrulaması 

- Sunucu tarafında tüm girdileri doğrulayın 
- Veritabanı erişimi için parametreli sorgular kullanın 
- Giriş temizliğini uygulayın 
- Uygun veri türleri, uzunluk ve biçim için doğrulama yapın
- Reddedilenler yerine izin verilenler listelerini kullanın
- Bağlama özgü çıktı kodlamasını uygulayın
- Dosya yüklemelerini (tür, boyut, içerik) doğrulayın
- Girişler için hız sınırlamasını uygulayın

## Yaygın Güvenlik Açıklarını Önleme

### Enjeksiyon Önleme

- Parametreli sorgular/hazırlanmış ifadeler kullanın
- Uygun kaçışla ORM uygulayın
- Tüm girişleri doğrulayın ve temizleyin
- Bağlama duyarlı çıktı kodlamasını uygulayın
- Yorumlayıcı enjeksiyonundan kaçınan güvenli API'leri kullanın

### XSS Önleme

- İçerik Güvenlik Politikasını (CSP) uygulayın
- Otomatik çıktı kodlamasını kullanın
- Bağlama özgü kodlamayı uygulayın
- HTML girişini temizleyin
- Dahili XSS korumasına sahip modern çerçeveleri kullanın
- Yönlendirmelerdeki URL'leri doğrulayın
- Hassas çerezlere HTTPOnly bayrağını uygulayın

### CSRF Önleme

- CSRF karşıtını uygulayın belirteçler 
- SameSite çerez niteliğini kullan 
- Kaynak ve yönlendiren başlıklarını doğrula 
- Hassas eylemler için yeniden kimlik doğrulaması gerektir 
- Uygun CORS yapılandırmasını kullan 

### Güvenlik Başlıkları 

- İçerik-Güvenlik-Politikası (CSP) 
- X-İçerik-Türü-Seçenekleri: nosniff 
- Kesin-Taşıma-Güvenliği (HSTS) 
- X-Çerçeve-Seçenekleri 
- Yönlendiren-Politikası 
- İzinler-Politikası 
- Hassas veriler için Önbellek-Kontrol başlıkları 
- Oturum kapatma için Site-Verilerini-Temizle 

## Altyapı Güvenliği 

### Sunucu Güvenliği 

- Sunucu yazılımını güncel tut 
- Güvenli sunucu yapılandırmalarını kullan 
- Uygun güvenlik duvarı kurallarını uygula 
- Yalnızca HTTPS'yi etkinleştir (HTTP'yi HTTPS'ye yönlendir) 
- Uygun TLS ayarlarını yapılandır 
- Gereksiz hizmetleri devre dışı bırak 
- Güvenliğe odaklı web sunucusu kullan modüller 
- Hız sınırlaması ve DDoS koruması uygulayın 

### API Güvenliği 

- Tüm API uç noktaları için HTTPS kullanın 
- Uygun kimlik doğrulamayı uygulayın 
- Hız sınırlaması uygulayın 
- İstek yüklerini doğrulayın 
- Uygun durum kodlarını döndürün 
- Yanıtlarda hassas bilgileri ifşa etmekten kaçının 
- Hizmetten hizmete iletişim için API anahtarlarını kullanın 
- API tüketicileri için güvenlik gereksinimlerini belgelendirin 

### Bağımlılık Yönetimi 

- Güvenlik açığı olan bağımlılıkları düzenli olarak tarayın 
- Bağımlılık sürümlerini sabitlemek için kilit dosyalarını kullanın 
- Otomatik güvenlik açığı taramasını uygulayın 
- Bağımlılıkları derhal güncelleyin 
- Bağımlılık kullanımını en aza indirin 
- Bağımlılık bütünlüğünü doğrulayın (sağlama toplamları) 
- Tedarik zinciri saldırılarını izleyin 
- Bir güvenlik açığı yanıt planınız olsun 

## Güvenlik Testi 

### Statik Analiz 

- Otomatik SAST araçlarını uygulayın 
- CI/CD'de güvenlik taramasını entegre edin 
- Sabit kodlu sırları tarayın 
- Güvenlik için kodu analiz edin anti-desenler 
- Güvenlik yapılandırmalarını doğrulayın 
- Güncel olmayan bağımlılıkları kontrol edin 
- Güvenli kodlama standartlarını uygulayın 

### Dinamik Test 

- Düzenli sızma testi gerçekleştirin 
- Otomatik DAST taramasını uygulayın 
- Etkileşimli uygulama güvenlik testini kullanın 
- Düzenli güvenlik açığı değerlendirmeleri yapın 
- Kimlik doğrulama ve yetkilendirme akışlarını test edin 
- Güvenlik başlıklarını ve yapılandırmalarını doğrulayın 
- Yaygın saldırı senaryolarını simüle edin 

## Güvenlik İzleme ve Yanıt 

### Günlük Kaydı ve İzleme 

- Kapsamlı güvenlik günlüğü uygulayın 
- Kimlik doğrulama olaylarını kaydedin 
- Erişim denetimi hatalarını kaydedin 
- Şüpheli etkinlikleri izleyin 
- Gerçek zamanlı uyarıları uygulayın 
- Merkezi günlük yönetimini kullanın 
- Günlüklerin kurcalanmaya dayanıklı olduğundan emin olun 
- Günlükleri uygun zaman dilimleri boyunca saklayın 

### Olay Yanıtı 

- Bir olay yanıt planı geliştirin 
- Rolleri ve sorumlulukları tanımlayın 
- İletişim protokollerini oluşturun 
- Belgeleme sınırlama prosedürlerini uygulayın 
- Adli analiz uygulayın yetenekler 
- Olay sonrası incelemeler yapın 
- Olay yanıt senaryolarını uygulayın 
- Güvenlik topluluğuyla iletişimi sürdürün 

## Uyumluluk ve Gizlilik 

### Mevzuata Uygunluk 

- Uygulanabilir düzenlemeleri belirleyin (GDPR, CCPA, vb.) 
- Gerekli güvenlik kontrollerini uygulayın 
- Düzenli uyumluluk değerlendirmeleri yapın 
- Uyumluluk önlemlerini belgelendirin 
- Ekibi uyumluluk gereklilikleri konusunda eğitin 
- Tasarıma göre gizliliği uygulayın 
- Gerekli belgeleri koruyun 

### Gizlilik Hususları 

- Net gizlilik politikaları uygulayın 
- Veri toplama için uygun onayı alın 
- Veri erişim ve silme mekanizmaları sağlayın 
- Veri toplama ve saklamayı en aza indirin 
- Veri taşınabilirliğini uygulayın 
- Gizlilik etki değerlendirmeleri yapın 
- Tüm tasarım kararlarında gizliliği göz önünde bulundurun