# Web Mimarisi Standartları 

## Temel İlkeler 

- Modüler ve ölçeklenebilir mimari 
- Endişelerin net bir şekilde ayrılması 
- SOLID ve DRY ilkeleri 
- Tutarlı klasör yapısı 
- Diyagramlarla belgelenmiş mimari 
- Bileşen tabanlı tasarım 

## Önerilen Mimariler 

### Ön Uç Mimarisi 

- **Bileşen Mimarisi** 
- Atomik Tasarım metodolojisi 
- Akıllı ve Sunumsal bileşenler 
- Kalıtım yerine kompozisyon 
- Bileşen kitaplıkları ve tasarım sistemleri 

- **Durum Yönetimi** 
- Uygulama genelindeki veriler için merkezi durum 
- Bileşene özgü veriler için yerel durum 
- API verileri için sunucu durumu 
- Tema/kimlik doğrulama/yerelleştirme için Bağlam API'si 

- **Veri Akışı** 
- Tek yönlü veri akışı 
- Değiştirilemez durum güncellemeleri 
- Olay odaklı iletişim 
- Bileşenler arası iletişim için yayınla/abone ol kalıpları 

### Uygulama Mimarisi 

- **İstemci Tarafı İşleme (CSR)** 
- Yüksek etkileşimli uygulamalar için 
- Tek Sayfalık Uygulama (SPA) modeli 
- İstemci tarafı yönlendirme 

- **Sunucu Tarafı İşleme (SSR)** 
- SEO açısından kritik uygulamalar için 
- İyileştirilmiş ilk yükleme performansı 
- Daha iyi erişilebilirlik ve SEO 

- **Statik Site Oluşturma (SSG)** 
- İçerik odaklı web siteleri için 
- Önceden işlenmiş HTML 
- Minimum JavaScript gereksinimleri 

- **Artımlı Statik Yenileme (ISR)** 
- Statik avantajlara sahip dinamik içerik için 
- Arka plan yenileme 
- Yeniden doğrulama sırasında eski model 

- **Adalar Mimarisi** 
- Etkileşimli bileşenlere sahip çoğunlukla statik siteler için 
- Belirli bileşenlerin nemlendirilmesi 
- Azaltılmış JavaScript yükü 

## Proje Yapısı 

``` 
src/ 
├── components/ # Yeniden kullanılabilir UI bileşenleri 
│ ├── atoms/ # Temel yapı taşları 
│ ├── molecular/ # Atom grupları 
│ ├── organism/ # Molekül grupları 
│ └── templates/ # Sayfa düzenleri 
├── hooks/ # Özel React kancaları 
├── lib/ # Yardımcı işlevler ve kütüphaneler 
├── pages/ # Rota bileşenleri (Next.js) 
├── features/ # Özelliğe özgü kod 
├── services/ # API ve harici hizmetler 
├── store/ # Durum yönetimi 
├── styles/ # Genel stiller ve temalar 
└── types/ # TypeScript türü tanımlar 
``` 

## En İyi Uygulamalar 

- Dosyaları özellik/modül bazında gruplandırın 
- Modüller arasında net sınırlar koruyun 
- Yapılandırma dosyalarını kökte tutun 
- Optimize edilmiş durum yönetimini uygulayın 
- Modüller arasındaki bağımlılıkları en aza indirin 
- En az ayrıcalık ilkesini izleyin 
- Kod bölme için tembel yüklemeyi kullanın 
- Uygun hata sınırlarını uygulayın 

## Önerilen Çerçeveler 

- **Next.js** - SSR, SSG ve ISR uygulamaları için 
- **React** - Bileşen tabanlı kullanıcı arayüzleri için 
- **Vue.js** - Daha basit öğrenme eğrisine sahip React'e alternatif 
- **Astro** - Minimum JS içeren içerik odaklı web siteleri için 
- **Remix** - Tam yığın web uygulamaları için 
- **SvelteKit** - Yüksek performanslı uygulamalar için