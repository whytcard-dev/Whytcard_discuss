# Web Test Standartları 

## Test Felsefesi 

- Erken ve sık test edin 
- Mümkün olan her yerde testleri otomatikleştirin 
- Uygun seviyelerde test edin (birim, entegrasyon, e2e) 
- Sürdürülebilir ve güvenilir testler yazın 
- Hem mutlu yolları hem de uç durumları test edin 
- Gerilemeleri önlemek için testi kullanın 
- Testleri iş etkisine göre önceliklendirin 
- Test koduna üretim koduyla aynı özeni gösterin 

## Test Türleri ve Kapsam 

### Birim Testi 

- **Hedef**: Bireysel işlevler, bileşenler ve modüller 
- **Kapsam Hedefi**: İş mantığının ve yardımcı programların %80'inden fazlası 
- **Araçlar**: Jest, Vitest, React Testing Library 
- **En İyi Uygulamalar**: 
- AAA modelini izleyin (Düzenle, Harekete geç, İddia et) 
- Mümkün olduğunda test başına bir iddia 
- Harici bağımlılıkları taklit edin 
- Uç durumları ve hata koşullarını test edin 
- Testleri hızlı tutun (test başına < 100 ms)
- Açıklayıcı test adları kullanın
- Testleri birbirinden ayırın

### Entegrasyon Testi

- **Hedef**: Bileşenler ve hizmetler arasındaki etkileşimler
- **Kapsam Hedefi**: Kritik kullanıcı akışları ve bileşen etkileşimleri
- **Araçlar**: React Testing Library, MSW, Supertest
- **En İyi Uygulamalar**:
- Test bileşeni bileşimleri
- Test formu gönderimleri
- Sahte API yanıtları
- Test durumu değişiklikleri
- DOM güncellemelerini doğrulayın
- Test yönlendirmesi ve gezinme
- Gerçekçi test verileri kullanın

### Uçtan Uca Test

- **Hedef**: Kullanıcı akışlarını UI'den arka uca tamamlayın
- **Kapsam Hedefi**: Kritik iş yolları ve kullanıcı yolculukları
- **Araçlar**: Cypress, Playwright
- **En İyi Uygulamalar**: 
- Kritik kullanıcı yolculuklarına odaklanın 
- Birden fazla tarayıcıda test edin 
- Kararlı seçiciler kullanın (data-testid) 
- İzole test ortamları kurun 
- Test verilerini etkili bir şekilde yönetin 
- Başarısızlıklarda ekran görüntüleri alın 
- Kararsız testler için yeniden deneme mantığını uygulayın 

### Görsel Gerileme Testi 

- **Hedef**: UI görünümü ve düzeni 
- **Kapsam Hedefi**: Önemli UI bileşenleri ve sayfaları 
- **Araçlar**: Percy, Chromatic, Playwright 
- **En İyi Uygulamalar**: 
- Temel ekran görüntüleri yakalayın 
- Farklı görünüm alanlarında test edin 
- Dinamik içeriği yoksayın 
- Görsel değişiklikleri dikkatlice inceleyin 
- Açık/koyu modları test edin 
- Farklı içerik uzunluklarıyla test edin 
- CI/CD işlem hattıyla entegre edin 

### Erişilebilirlik Testi 

- **Hedef**: WCAG uyumluluğu ve erişilebilirlik sorunları 
- **Kapsam Hedef**: Tüm kullanıcıya bakan bileşenler ve sayfalar
- **Araçlar**: axe, Lighthouse, WAVE
- **En İyi Uygulamalar**:
- Klavye gezintisini test edin
- Ekran okuyucu uyumluluğunu doğrulayın

- Renk kontrastını kontrol edin
- Odak yönetimini test edin
- ARIA niteliklerini doğrulayın
- Yardımcı teknolojilerle test edin
- Temel erişilebilirlik kontrollerini otomatikleştirin

### Performans Testi

- **Hedef**: Sayfa yükleme süreleri, işleme performansı
- **Kapsam Hedefi**: Önemli sayfalar ve kritik kullanıcı yolları
- **Araçlar**: Lighthouse, WebPageTest, k6
- **En İyi Uygulamalar**:
- Temel Web Vitals'ı ölçün

- Düşük uçlu cihazlarda test edin
- Ağ kısıtlamasını simüle edin
- Paket boyutunu izleyin
- Gerçekçi önbelleğe alma senaryolarıyla test edin
- Etkileşime kadar geçen süreyi ölçün
- Performans bütçeleri belirleyin

## Test Uygulamaları

### Test Organizasyon 

- Grup testleri mantıksal olarak özellik veya bileşene göre 
- Açıklayıcı dosya adları ve test açıklamaları kullanın 
- Test yardımcı programlarını ve fikstürlerini ayırın 
- Testleri kod tabanını yansıtan bir hiyerarşide düzenleyin 
- Test dosyalarını test ettikleri koda yakın tutun 
- Tutarlı adlandırma kuralları kullanın 
- Birim, entegrasyon ve uçtan uca testleri ayırın 

### Test Veri Yönetimi 

- Test verileri için fabrikalar veya oluşturucular kullanın 
- Sabit kodlu test verilerinden kaçının 
- Üretim kalıplarıyla eşleşen gerçekçi veriler kullanın 
- Testler arasında test durumunu sıfırlayın 
- Test ortamlarını izole edin 
- Test verilerinde veri gizliliğini göz önünde bulundurun 
- Uç durumlar için eklenmiş rastgele veriler kullanın 

### Alay Etme ve Saplama 

- Harici bağımlılıkları (API'ler, hizmetler) alay edin 
- Gerçekçi alay yanıtları kullanın 
- Testler arasında alayları sıfırlayın 
- Aşırı alay etmekten kaçının 
- Uygun düzeyde alay edin 
- Alay davranışını belgelendirin 
- API alayı için MSW kullanın 

### Sürekli Entegrasyon 

- Her çekme isteğinde testler çalıştırın 
- Paralel test yürütmeyi uygulayın 
- Test raporlaması ve panoları ayarlayın 
- Test başarısızlığı bildirimlerini yapılandırın 
- Kararsız testler için test yeniden denemeleri uygulayın 
- Test bağımlılıklarını önbelleğe alın 
- Uygun aşamalarda farklı test türlerini çalıştırın 

## Test Odaklı Geliştirme (TDD) 

- Özellikleri uygulamadan önce testleri yazın 
- Kırmızı-Yeşil-Yeniden Düzenleme döngüsünü izleyin 
- Basit test vakalarıyla başlayın 
- Karmaşıklığı kademeli olarak ekleyin 
- Tasarımı yönlendirmek için testleri kullanın 
- Kod geliştikçe testleri yeniden düzenleyin 
- Uygulamaya değil, davranışa odaklanın 

## Test Bakımı 

- Testleri düzenli olarak inceleyin ve güncelleyin 
- Kararsız testleri kaldırın veya düzeltin 
- Kod değişiklikleriyle testleri yeniden düzenleyin 
- Test performansını izleyin 
- Test kapsamını düzenli olarak analiz edin 
- Test stratejisini belgelendirin 
- Ekip üyelerini test uygulamaları konusunda eğitin 

## Uzmanlaşmış Test 

### API Testi 

- Tüm API uç noktalarını test edin 
- Doğrulayın istek/yanıt şemaları
- Kimlik doğrulama ve yetkilendirmeyi test edin
- Hata işleme ve durum kodlarını test edin
- İş mantığını doğrulayın
- Oran sınırlamasını ve kotaları test edin
- API test durumlarını belgelendirin

### Durum Yönetimi Testi

- Durum geçişlerini test edin
- Başlangıç durumunu doğrulayın
- Azaltıcıları ve eylemleri test edin
- Seçicileri ve türetilmiş durumu test edin
- Harici bağımlılıkları taklit edin
- Eşzamansız durum değişikliklerini test edin
- Durum kalıcılığını doğrulayın

### Form Testi

- Form gönderimlerini test edin
- Form girdilerini doğrulayın
- Hata durumlarını test edin
- Form sıfırlama işlevselliğini test edin
- Koşullu form mantığını test edin
- Form öğelerinin erişilebilirliğini doğrulayın
- Klavye gezintili formu test edin

### Güvenlik Testi

- Kimlik doğrulama akışlarını test edin
- Yetkilendirme kontrollerini doğrulayın
- Yaygın güvenlik açıklarına (XSS, CSRF) karşı test edin
- Giriş temizliğini doğrulayın
- Dosya yükleme güvenliğini test edin
- Güvenliği doğrulayın başlıklar 
- OWASP Top 10'a karşı test edin