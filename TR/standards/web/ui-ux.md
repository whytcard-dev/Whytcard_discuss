# UI/UX Tasarım Standartları 

## Tasarım İlkeleri 

- **Tutarlılık**: Site genelinde görsel ve işlevsel tutarlılığı koruyun 
- **Netlik**: Bilişsel yükü en aza indiren net arayüzler tasarlayın 
- **Geri bildirim**: Tüm kullanıcı etkileşimleri için net geri bildirim sağlayın 
- **Verimlilik**: Görevleri tamamlamak için adımları en aza indirin 
- **Affetme**: Kullanıcıların eylemleri geri almasına ve hatalardan kurtulmasına izin verin 
- **Erişilebilirlik**: Her yetenekteki kullanıcı için tasarım yapın 
- **Basitlik**: Arayüzleri basit ve sezgisel tutun 

## Görsel Tasarım 

### Renk Sistemi 

- Birincil, ikincil ve vurgu renk paletini tanımlayın 
- Anlamsal renkleri ekleyin (başarı, uyarı, hata, bilgi) 
- Yeterli kontrast oranlarını sağlayın (normal metin için WCAG AA minimum: 4,5:1) 
- Açık ve koyu modlar için renk değişkenlerini tanımlayın 
- Renk paletini 5-7 ile sınırlayın varyasyonlu temel renkler
- Renk kullanım yönergelerini ve anlamını belgeleyin
- Renk körlüğü erişilebilirliği için renkleri test edin

### Tipografi

- UI için birincil bir yazı tipi ve içerik için ikincil bir yazı tipi seçin (gerekirse)
- Sınırlı boyutlara sahip net bir yazı tipi ölçeği tanımlayın (örn. 12, 14, 16, 18, 24, 30, 36, 48px)
- Uygun satır yüksekliğini koruyun (gövde metni için 1,4-1,6)
- Gövde metni için minimum yazı tipi boyutunun 16px olduğundan emin olun
- Yazı tipi ağırlıklarını tanımlayın (normal, orta, kalın)
- Uygun harf aralığını ayarlayın
- Metnin tüm arka planlarda okunabilir kalmasını sağlayın
- Piksel yerine bağıl birimler (rem/em) kullanın

### Aralık ve Düzen

- Tutarlı bir aralık ölçeği oluşturun (4px, 8px, 16px, 24px, 32px, 48px, 64px) 
- Tutarlı dolgu ve kenar boşlukları uygulayın 
- Hizalama ve yapı için ızgara sistemleri kullanın 
- Okunabilirlik için uygun beyaz alanı koruyun 
- Standart bileşen aralığını tanımlayın 
- Uygun içerik hiyerarşisini sağlayın 
- Duyarlı düzen desenleri uygulayın 

### Görüntüler ve Simgeler 

- Tutarlı simge stili ve boyutu kullanın 
- Simgelerin tanınabilir ve anlamlı olduğundan emin olun 
- Simgeler için metin alternatifleri sağlayın 
- Performans için görüntüleri optimize edin 
- Duyarlı görüntüleri uygulayın 
- Tutarlı görüntü en boy oranlarını koruyun 
- Simgeler ve basit çizimler için SVG kullanın 

## Bileşenler ve Desenler 

### Bileşen Kitaplığı 

- Kapsamlı bir bileşen kitaplığı oluşturun 
- Bileşen kullanımını ve varyasyonlarını belgelendirin 
- Bileşenlerin erişilebilir olduğundan emin olun 
- Duyarlı bileşenler oluşturun 
- Bileşen durumlarını tanımlayın (varsayılan, gezinme, etkin, odak, devre dışı) 
- Tutarlı animasyon desenleri uygulayın 
- Genel kullanıcı arayüzü ihtiyaçları için yeniden kullanılabilir desenler oluşturun 

### Gezinme 

- Net ve tutarlı gezinme uygulayın 
- Sağlayın geçerli konum için görsel göstergeler 
- Navigasyonun klavyeden erişilebilir olduğundan emin olun 
- Navigasyon öğelerini açıklayıcı yapın 
- Birincil navigasyonu 7±2 öğeyle sınırlayın 
- Karmaşık siteler için ikincil navigasyon sağlayın 
- Derin navigasyon yapıları için ekmek kırıntıları uygulayın 

### Formlar 

- İlgili form alanlarını gruplandırın 
- Tüm form alanları için net etiketler sağlayın 
- Doğrulama hatalarını satır içinde gösterin 
- Gerekli alanları belirtin 
- Uygun giriş türlerini kullanın 
- Mantıksal sekme sırasını uygulayın 
- Yardımcı hata mesajlarını gösterin 
- Başarı onayı sağlayın 
- Form gönderim hataları sırasında durumu koruyun 

### İçerik 

- Net başlıklarla taranabilir içerik oluşturun 
- Birden fazla öğe için madde işaretli listeler kullanın 
- Paragrafları kısa tutun (3-5 satır) 
- Anlamlı alt başlıklar kullanın 
- Uygun içerik hiyerarşisini uygulayın 
- Okunabilirliği sağlayın (Flesch okuma puanı) 
- Sade dil kullanın (jargondan kaçının) 

## Etkileşim Tasarımı 

### Mikro etkileşimler 

- İnce tasarım, amaçlı animasyonlar
- Kullanıcı arayüzü geri bildirimi için animasyonları 300 ms'nin altında tutun
- Tüm etkileşimler için görsel geri bildirim sağlayın
- Animasyonların kullanılabilirliği engellemediğinden emin olun
- Tutarlı geçiş desenleri uygulayın
- Dikkat çekmek için animasyon kullanın
- Azaltılmış hareket tercihlerine saygı gösterin

### Durumlar ve Geri Bildirim

- Tüm etkileşimli öğe durumlarını tasarlayın:

- Varsayılan
- Üzerine Gelme
- Odaklanma
- Etkin
- Devre Dışı
- Kullanıcı eylemleri için anında geri bildirim sağlayın
- Sistem durumunu açıkça gösterin
- Uygun yükleme göstergeleri kullanın
- Çözünürlüğü yönlendiren hata durumları uygulayın
- Listeler ve veri gösterimleri için boş durumlar tasarlayın

### Mobil ve Dokunmatik

- Dokunmatik hedefler için tasarım yapın (minimum 44×44 piksel)
- Mobil cihazlarda başparmak bölgelerini hesaba katın
- Hareket tabanlı etkileşimleri tutarlı bir şekilde uygulayın
- Mobil cihazlarda üzerine gelmeye bağlı etkileşimlerden kaçının
- Hem dikey hem de yatay yönlendirmeler için tasarım yapın
- Dokunma hedeflerinin yeterli boşluğa sahip olduğundan emin olun
- İçin optimize edin mümkün olduğunda tek elle kullanım

## Kullanıcı Deneyimi

### Kullanılabilirlik İlkeleri

- Tanınan tasarım kalıplarını takip edin
- Bilişsel yükü en aza indirin
- Önemli eylemleri belirgin hale getirin
- Net harekete geçirici mesajlar sağlayın
- Tahmin edilebilir arayüzler tasarlayın
- İçeriği öneme göre önceliklendirin
- Gereksiz karmaşıklığı ortadan kaldırın

### Duyarlı Tasarım

- Mobil öncelikli tasarım yaklaşımını uygulayın
- Standart kesme noktalarını tanımlayın (örn. 320 piksel, 768 piksel, 1024 piksel, 1440 piksel)
- Her kesme noktası için düzenleri uygun şekilde uyarlayın
- Mobil cihazlarda dokunmatik dostu arayüzler sağlayın
- Sadece emülatörlerde değil, gerçek cihazlarda test edin
- Cihaz yeteneklerini ve sınırlamalarını göz önünde bulundurun
- Mobil ağlar için performansı optimize edin

### Erişilebilirlik (WCAG)

- En azından WCAG 2.1 AA standartlarını izleyin
- Klavye gezinilebilirliğini sağlayın
- Yeterli renk kontrastı sağlayın
- Uygun ARIA öznitelikleri 
- Erişilebilir formlar oluşturun 
- Ekran okuyucularla test edin 
- %200'e kadar metin yeniden boyutlandırmayı destekleyin 
- Odak göstergeleri uygulayın 
- Görüntüler için alternatif metin sağlayın 
- Erişilebilir veri tabloları oluşturun 

## Araştırma ve Test 

### Kullanıcı Araştırması 

- Kullanıcı görüşmeleri ve anketleri gerçekleştirin 
- Kanıta dayalı kişiler oluşturun 
- Kullanıcı yolculuklarını haritalayın 
- Sorun noktalarını ve fırsatları belirleyin 
- Varsayımları gerçek kullanıcılarla doğrulayın 
- Tasarım kararlarını bilgilendirmek için analitik kullanın 
- Sürekli geri bildirim mekanizmaları uygulayın 

### Kullanılabilirlik Testi 

- Temsili kullanıcılarla tasarımları test edin 
- Hem denetlenen hem de denetlenmeyen testler gerçekleştirin 
- Farklı cihazlarda ve tarayıcılarda test edin 
- Görev tamamlama oranlarını ölçün 
- Nitel geri bildirim toplayın 
- Test sonuçlarına göre yineleme yapın 
- Yardımcı teknolojilerle test edin