# WhytCard'ın Küresel Mimarisi 

## Giriş 

Bu belge, açık kaynaklı bir web kazıma ve yapay zeka eğitim platformu olan WhytCard projesinin küresel mimarisini sunar. Mimari, yeni özelliklerin kolayca eklenmesine olanak tanırken sistem kararlılığını garanti altına alarak modüler, ölçeklenebilir ve sürdürülebilir olacak şekilde tasarlanmıştır. 

## Genel Bakış 

WhytCard, ön uç ve arka uç arasında net bir ayrım olan bir istemci-sunucu mimarisine göre düzenlenmiştir. Bu ayrım, her iki bileşenin bağımsız olarak evrimleşmesine olanak tanır ve ekip çalışmasını kolaylaştırır. 

``` 
┌──────────────────┐ ┌─────────────────┐ 
│ │ │ 
│ Ön uç │◄────►│ Arka uç │ 
│ (Vue.js) │ │ (FastAPI) │ 
│ │ │ │ 
└───────────────────┘ └────────────────┘ 
▲ 
│ 
▼ 
┌──────────────────┐ 
│ │ 
│ Kazıma ve │ 
│ Veri Boru Hattı │ 
│ │ 
└──────────────────┘ 
▲ 
│ 
▼ 
┌─────────────────┐ 
│ │ 
│ Depolama │ 
│ │ 
└────────────────┘ 
``` 

## Ana Bileşenler 

### 1. Önyüz (Vue.js) 

Önyüz Vue.js ile geliştirilmiştir ve stil için Tailwind CSS kullanır. Kullanıcı arayüzü ve kullanıcı deneyiminden sorumludur. 

#### Temel Özellikler 

- **Çerçeve**: Composition API ile Vue.js 3 
- **Stil**: Tailwind CSS 
- **Animasyonlar**: Framer Motion 
- **Uluslararasılaştırma**: Otomatik tarayıcı dili algılama ile i18next 
- **Yönlendirme**: Vue Router 
- **Durum Yönetimi**: Pinia 

#### Yapı 

``` 
src/ 
├── components/ # Yeniden kullanılabilir bileşenler 
├── config/ # Ön uç yapılandırması 
├── i18n/ # Çeviri dosyaları 
├── router/ # Yönlendirme yapılandırması 
├── views/ # Ana sayfalar 
└── main.js # Giriş noktası 
``` 

### 2. Arka uç (FastAPI) 

Arka uç, API'ler oluşturmak için modern ve yüksek performanslı bir Python çerçevesi olan FastAPI ile geliştirilmiştir. Tüm sunucu işlemlerini, veri erişimini ve iş mantığını yönetir. 

#### Temel Özellikler 

- **Çerçeve**: FastAPI 
- **Kimlik Doğrulama**: JWT 
- **Doğrulama**: Pydantic 
- **API Belgeleri**: Entegre Swagger Kullanıcı Arayüzü 

#### Yapı 

``` 
backend/ 
├── config/ # Arka uç yapılandırması 
├── core/ # Ana iş mantığı 
│ ├── api/ # API uç noktaları 
│ └── schemas/ # Pydantic şemaları 
├── models/ # Veri modelleri 
├── utils/ # Yardımcı programlar 
└── main.py # Giriş noktası 
``` 

### 3. Kazıma ve Veri Boru Hattı 

Bu modül, web kaynaklarından veri toplamaktan ve bunları AI model eğitimi için dönüştürmekten sorumludur. 

#### Temel Özellikler 

- **Kazıma**: aiohttp ve BeautifulSoup ile eşzamansız sistem 
- **Orkestrasyon**: Görev ve öncelik yönetimi 
- **Dönüşüm**: Veri temizleme ve normalleştirme 
- **Önbellek**: Gereksiz istekleri önlemek için önbellekleme sistemi 

#### Yapı 

``` 
arka uç/ 
├── kazıma/ 
│ ├── kazıyıcılar/ # Farklı kaynaklar için özel uygulamalar 
│ ├── utils/ # Kazıma yardımcı programları 
│ ├── orchestrator.py # Görev orkestratörü 
│ └── cache.py # Önbellekleme sistemi 
└── datasets/ # Toplanan ve dönüştürülen veriler 
``` 

### 4. Depolama 

Depolama sistemi veri kalıcılığını ve erişimini yönetir. 

#### Depolama Seçenekleri 

- **Veritabanı**: Yapılandırılmış veriler için PostgreSQL 
- **Dosya depolaması**: Büyük veriler için yerel dosya sistemi veya S3 uyumlu 
- **Önbellek**: Dağıtılmış önbellek için Redis 

## Veri Akışı 

### 1. Veri Toplama 

``` 
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ 
│ Web │────►│ Kazıyıcılar │────►│ Önbellek │ 
│ Kaynaklar │ │ │ │ 
└─────────────┘ └─────────────┘ └──────────────┘ 
│ 
▼ 
┌─────────────┐ ┌─────────────┐┐ 
│ │ │ │ 
│ İşlemciler │────►│ Depolama │ 
│ │ │ │ 
└────────────┘ └─────────────┘ 
``` 

1. Kazıyıcılar web kaynaklarından veri toplar 
2. Veriler, gereksiz istekleri önlemek için önbelleğe alınır 
3. İşlemciler verileri temizler ve dönüştürür 
4. Dönüştürülen veriler daha sonraki kullanım için saklanır 

### 2. Model Eğitimi 

``` 
┌────────────┐ ┌─────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ 
│ Veri kümeleri │────►│ Ön işlemci│────►│ Eğitim │ 
│ │ │ │ │ │ 
└─────────────┘ └──────────────┘ └────────────┘ 
│ 
▼ 
┌─────────────┐ 
│ │ 
│ Modeller │ 
│ │ 
└────────────┘ 
``` 

1. Veri kümeleri depolama alanından çıkarıldı 
2. Veriler eğitim için ön işlenir 
3. Modeller ön işlenmiş veriler üzerinde eğitilir 
4. Eğitilen modeller kaydedilir 

### 3. Model Kullanımı 

``` 
┌─────────────┐ ┌─────────────┐ ┌────────────┐ 
│ │ │ │ │ │ 
│ API │────►│ Modeller │────►│ Yanıt │ 
│ İstek │ │ │ │ 
└─────────────┘ └────────────┘ └─────────────┘ 
``` 

1. Bir API isteği alındı 
2. İsteği işlemek için uygun modeller kullanıldı 
3. Bir yanıt oluşturuldu ve döndürüldü 

## İletişim Arasında Bileşenler 

### REST API 

Ön uç ve arka uç arasındaki iletişim öncelikle bir REST API aracılığıyla sağlanır. Uç noktalar mantıksal olarak düzenlenir ve Swagger UI ile belgelenir. 

### WebSockets 

Gerçek zamanlı güncellemeler gerektiren özellikler için (kazıma görevlerini izleme gibi) WebSockets çift yönlü iletişimi etkinleştirmek için kullanılır. 

### Mesaj Kuyruğu 

Eşzamansız ve uzun süreli görevler için bileşenleri ayırmak ve güvenilirliği sağlamak için bir mesaj kuyruğu (RabbitMQ veya Redis Pub/Sub gibi) kullanılır. 

## Dağıtım 

### Dağıtım Seçenekleri 

WhytCard çeşitli şekillerde dağıtılabilir: 

1. **Masaüstü uygulaması**: Platformlar arası bir masaüstü uygulaması oluşturmak için Tauri'yi kullanma 
2. **Bulut dağıtımı**: AWS, GCP veya Azure gibi bulut hizmetlerinde dağıtım 
3. **Kendi kendine barındırma**: Kişisel veya şirket sunucusuna kurulum 

### Dağıtım Mimarisi 

``` 
┌────────────────┐ ┌─────────────────┐ 
│ │ │ │ 
│ Ön uç │◄────►│ API Ağ Geçidi │ 
│ (Statik) │ │ │ 
└──────────────────┘ └──────────────────┘ 
▲ 
│ 
▼ 
┌───────────────────┐ 
│ │ 
│ Arka uç API'si │ 
│ │ 
└─────────────────┘ 
▲ 
│ 
▼ 
┌──────────────────┐ ┌──────────────────┐ 
│ │ │ │ 
│ Veritabanı │ │ Dosya Depolama │ 
│ │ │ │ 
└─────────────────┘ └─────────────────┘ 
``` 

## Güvenlik 

### Güvenlik İlkeleri 

1. **Derinlemesine savunma**: Çoklu güvenlik katmanları 
2. **En az ayrıcalık ilkesi**: Minimum gerekli erişim 
3. **Giriş doğrulaması**: Tüm kullanıcı girişleri doğrulanır 
4. **Veri koruması**: Hassas verilerin şifrelenmesi 

### Güvenlik Önlemleri 

- **Kimlik doğrulaması**: Jeton rotasyonlu JWT 
- **Yetkilendirme**: Rol tabanlı erişim kontrolü 
- **Yaygın saldırılara karşı koruma**: XSS, CSRF, SQL enjeksiyonu 
- **Denetim**: Önemli eylemlerin günlüğe kaydedilmesi 

## Ölçeklenebilirlik 

Mimari yatay ve dikey olarak ölçeklenebilir olacak şekilde tasarlanmıştır: 

- **Mikro hizmetler**: Bileşenler bağımsız olarak dağıtılabilir 
- **Önbelleğe alma**: Çok düzeyli önbelleklerin kullanımı 
- **Yük dengeleme**: Birden fazla örnek arasında trafik dağıtımı 
- **Bölümlendirme**: Performansı iyileştirmek için veri ayırma

## İzleme ve Gözlemlenebilirlik

- **Günlük Kaydı**: ELK Stack veya eşdeğeri ile merkezi günlük kaydı
- **Metrikler**: Prometheus ile Metrik toplama
- **İzleme**: OpenTelemetry ile istek takibi
- **Uyarılar**: Önceden tanımlanmış eşiklere dayalı uyarılar

## Sonuç

WhytCard'ın mimarisi sağlam, ölçeklenebilir ve sürdürülebilir olacak şekilde tasarlanmıştır. Farklı bileşenler arasındaki sorumlulukların net bir şekilde ayrılması bağımsız evrime olanak tanır ve ekip çalışmasını kolaylaştırır. Teknoloji seçimleri, mevcut ve gelecekteki proje ihtiyaçlarının yanı sıra sektörün en iyi uygulamaları dikkate alınarak yapılmıştır.

Bu mimari, yeni ihtiyaçlara ve teknolojik gelişmelere uyum sağlamak için düzenli olarak gözden geçirilecek ve güncellenecektir.

--- 

Son güncelleme: 2025-01-15