# Web Performans Standartları 

## Performans Hedefleri 

- Lighthouse puanı: Tüm metrikler için 90+ 
- Temel Web Vitals hedefleri: 
- LCP (En Büyük İçerikli Boyama): < 2,5 sn 
- FID (İlk Giriş Gecikmesi): < 100 ms 
- CLS (Kümülatif Düzen Kayması): < 0,1 
- INP (Etkileşimden Sonraki Boyamaya): < 200 ms 
- Etkileşim Süresi: < 3 sn 
- İlk İçerikli Boyama: < 1,8 sn 
- Toplam sayfa ağırlığı: < 1 MB (ideal olarak < 500 KB) 
- HTTP istekleri: Sayfa başına < 50 

## Görüntü Optimizasyonu 

- Eski tarayıcılar için geri dönüşlerle WebP/AVIF formatlarını kullanın 
- `srcset` ve `sizes` öznitelikleriyle duyarlı görüntüleri uygulayın 
- Sayfanın alt kısmındaki görüntüleri tembel yükleyin 
- Uygun şekilde boyutlandırın resimler (CSS ile küçültülmüş büyük resimler sunmaktan kaçının) 
- Mümkün olduğunda dinamik yeniden boyutlandırma için resim CDN'sini kullanın 
- SVG'leri optimize edin ve gereksiz meta verileri kaldırın 
- ImageOptim, TinyPNG veya Squoosh gibi araçlarla tüm resimleri sıkıştırın 
- Aşamalı yükleme için bulanıklaştırma tekniğini göz önünde bulundurun 

## JavaScript Optimizasyonu 

- Kod bölme ve dinamik içe aktarmaları uygulayın 
- Kritik olmayan JavaScript'i erteleyin 
- Ölü kodu ortadan kaldırmak için ağaç sallamayı kullanın 
- JavaScript dosyalarını küçültün ve sıkıştırın 
- İşlemeyi engelleyen JavaScript'ten kaçının 
- CPU yoğun görevler için web çalışanlarını kullanın 
- İstek önceliklendirmesini uygulayın 
- Üçüncü taraf betiklerini optimize edin ve async/defer özniteliklerini kullanın 

## CSS Optimizasyonu 

- Kritik CSS'yi küçültün ve satır içi yapın 
- PurgeCSS gibi araçlarla kullanılmayan CSS'yi kaldırın 
- CSS içe aktarmalarından kaçının (bunun yerine birleştirmeyi kullanın) 
- Bağımsız bileşenler için CSS sınırlamasını kullanın 
- CSS seçicilerini optimize edin performans 
- CSS-in-JS performans etkilerini göz önünde bulundurun 
- Daha iyi sürdürülebilirlik için CSS değişkenlerini kullanın 
- Büyük uygulamalar için CSS kod bölmeyi uygulayın 

## Yazı Tipi Optimizasyonu 

- Mümkün olduğunda sistem yazı tiplerini kullanın 
- Font-display: swap veya isteğe bağlı uygulayın 
- Yalnızca gerekli karakterleri içerecek şekilde alt küme yazı tipleri 
- Üçüncü taraf hizmetleri kullanmak yerine kendi kendine barındırılan yazı tipleri 
- Kritik yazı tiplerini önceden yükleyin 
- Birden fazla ağırlık/stil için değişken yazı tipleri kullanın 
- Yazı tipi varyasyonlarını sınırlayın (ağırlıklar, stiller) 

## Önbelleğe Alma Stratejisi 

- Etkili önbellek politikaları uygulayın 
- Statik varlıklar için uzun önbellek (1 yıl+) 
- HTML için kısa/önbellek yok 
- Önbelleği bozmak için sürümlü dosya adları veya sorgu dizeleri kullanın 
- Çevrimdışı destek için servis çalışanlarını uygulayın 
- İstemci tarafı önbelleğe alma için localStorage/IndexedDB kullanın 
- HTTP önbellek başlıklarını düzgün şekilde yapılandırın 
- CDN önbelleğe almayı uygulayın 

## Sunucu Optimizasyonu 

- HTTP/2'yi etkinleştirin veya HTTP/3 
- Sunucu tarafı sıkıştırmayı uygulayın (Brotli/Gzip) 
- Küresel içerik dağıtımı için CDN kullanın 
- API yanıtlarını optimize edin (sayfalandırma, alan seçimi) 
- Dinamik içerik için uç bilişimi uygulayın 
- Uygun CORS ayarlarını yapılandırın 
- İlk Bayta Kadar Süreyi Optimize Edin (TTFB) 
- HTTP ön bağlantı, ön getirme ve ön yükleme ipuçlarını kullanın 

## Mobil Optimizasyon 

- Mobil performansa öncelik verin (mobil öncelikli yaklaşım) 
- Dokunmatik hedefleri optimize edin (min 44×44px) 
- Mobil cihazlar için ağ yükünü azaltın 
- Duyarlı tasarım kalıplarını uygulayın 
- Sadece emülatörlerde değil, gerçek mobil cihazlarda test edin 
- Animasyonlar için azaltılmış hareketi düşünün 
- Çevrimdışı/zayıf bağlantı senaryoları için optimize edin 

## İzleme ve Test 

- Gerçek Kullanıcı İzlemeyi (RUM) uygulayın 
- Kritik kullanıcı akışları için sentetik izleme ayarlayın 
- Ayrıntılı performans analizi için WebPageTest kullanın 
- Çekirdek Web'i izleyin Google Search Console'daki Önemli Noktalar 
- Performans bütçeleri ve uyarıları ayarlayın 
- Düzenli performans denetimleri gerçekleştirin 
- Performans iyileştirmeleri için A/B testi uygulayın 
- Profilleme için Chrome DevTools Performans panelini kullanın 

## Gelişmiş Teknikler 

- Kaynak ipuçlarını uygulayın (ön bağlantı, ön yükleme, ön getirme) 
- Tembel yükleme için kesişim gözlemcisini kullanın 
- Sunucu tarafı oluşturmayı veya statik site oluşturmayı düşünün 
- Stale-while-revalidate modelini uygulayın 
- Kritik olmayan görevler için requestIdleCallback'i kullanın 
- Modül yüklemesi için içe aktarma haritalarını düşünün 
- Kullanıcı davranışına dayalı tahmini ön getirmeyi uygulayın 
- Kritik kaynaklar için öncelik ipuçlarını kullanın