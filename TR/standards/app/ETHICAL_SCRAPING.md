# WhytCard için Etik Kazıma Kılavuzu 

## Giriş 

Web kazıma, WhytCard projesinin merkezinde yer alır, ancak etik, sorumlu ve yasal bir şekilde gerçekleştirilmelidir. Bu kılavuz, tüm kazıma faaliyetlerinin web sitesi sahiplerinin haklarına, geçerli yasalara ve etik standartlara saygı göstermesini sağlamak için uyulması gereken ilkeleri ve uygulamaları tanımlar. 

## İçindekiler 

1. [Temel İlkeler](#temel-ilkeler) 
2. [Yasal Yönler](#yasal-yönler) 
3. [Teknik En İyi Uygulamalar](#teknik-en-iyi-uygulamalar) 
4. [Kaynaklara Saygı](#kaynaklara-saygı) 
5. [Kişisel Verilerin Korunması](#kişisel-verilerin-korunması) 
6. [Belgeleme ve Şeffaflık](#belgeleme-ve-şeffaflık) 
7. [Özel Durumlar](#özel-durumlar) 
8. [Etik Kazıma Kontrol Listesi](#etik-kazıma-kontrol-listesi) 

## Temel İlkeler 

### Etik Kazıma Felsefesi 

Etik kazıma üç temel ilkeye dayanmaktadır: 

1. **Saygı**: Web sitesi sahiplerine, kullanım şartlarına saygı gösterin kullanım ve kaynakları 
2. **Orantılılık**: Yalnızca asgari etkiyle gerekli verileri çıkarın 
3. **Şeffaflık**: Botun kimliği ve veri toplama niyetleri konusunda şeffaf olun 

### WhytCard'ın Veri Toplama Konusundaki Değerleri 

WhytCard projesi olarak şunları taahhüt ediyoruz: 

- Veri topladığımız web sitelerine asla zarar vermemek 
- Web sitelerinin açık ve örtük kurallarına kesinlikle uymak 
- Kimliğimiz ve hedeflerimiz konusunda şeffaf olmak 
- Verileri sorumlu bir şekilde ve misyonumuza uygun şekilde kullanmak 
- Mevcut olduğunda resmi API'lere öncelik vermek 

## Yasal Hususlar 

### Genel Yasal Çerçeve 

Web veri toplama, ülkeye göre değişen çeşitli yasal çerçevelere tabidir: 

- **Telif Hakkı**: Web sitesi içeriği genellikle telif hakkıyla korunmaktadır 
- **Kullanım Şartları**: Web sitesi Hizmet Şartları veri toplamayı açıkça yasaklayabilir 
- **Veri Koruması**: Avrupa'daki GDPR gibi yasalar kişisel verileri korur 
- **Yetkisiz Erişim**: Bazı yargı bölgeleri bilgisayar sistemlerine yetkisiz erişimi suç saymaktadır 

### Önemli İçtihatlar 

Kazıma ile ilgili bazı önemli mahkeme kararları: 

- **hiQ Labs v. LinkedIn** (ABD): Kamuya açık verilerin taranmasının mutlaka yasadışı olmadığını ortaya koymuştur 
- **Ryanair v. PR Aviation** (AB): Kullanım koşullarının sözleşmesel olarak kazımayı sınırlayabileceğini doğrulamıştır 
- **QVC v. Resultly** (ABD): Sunucuları aşırı yüklememenin önemini vurgulamıştır 

### WhytCard için Yasal Uyumluluk 

Yasal kalmak için: 

1. Bir siteyi taramadan önce **her zaman ToS'u kontrol edin** 
2. Meta etiketlerdeki **"noindex" ve "nofollow"** etiketlerine saygı gösterin 
3. **Teknik koruma önlemlerini asla atlatmayın** (CAPTCHA, erişim sınırlamaları) 
4. İyi niyetinizi göstermek için **uygulamalarınızı belgelendirin** 
5. Şüpheniz varsa **bir avukata danışın** bir kazıma işleminin yasallığı 

## Teknik En İyi Uygulamalar 

### robots.txt'ye saygı 

robots.txt dosyası robotlar için erişim kurallarını tanımlar: 

```python 
from urllib.robotparser import RobotFileParser 
from urllib.parse import urlparse 

def is_allowed(url, user_agent="WhytCardBot/1.0"): 
"""URL'nin robots.txt'ye göre kazınıp kazınamayacağını kontrol eder.""" 
rp = RobotFileParser() 
rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt") 
rp.read() 
return rp.can_fetch(user_agent, url) 
``` 

### Uygun Tanımlama 

Her zaman botunuzu açıkça tanımlayan bir Kullanıcı Aracısı kullanın: 

```python 
headers = { 
'Kullanıcı Aracısı': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)', 
# Diğer başlıklar... 
} 
``` 

### İstek Gecikmeleri 

İstekler arasında makul gecikmeler uygulayın: 

```python 
import time 
import random 

def polite_request(url, session, min_delay=1, max_delay=3): 
"""İstekler arasında nazik bir gecikmeyle bir istekte bulunur.""" 
# Rastgele bir gecikme bekleyin 
delay = random.uniform(min_delay, max_delay) 
time.sleep(delay) 

# İsteği yapın 
response = session.get(url, headers=headers) 
return response 
``` 

### Hata İşleme 

HTTP hata kodlarına saygı gösterin ve davranışınızı buna göre uyarlayın: 

```python 
async def respectful_fetch(url, session): 
"""Bir URL'yi saygılı bir şekilde getirir.""" 
try: 
async with session.get(url, headers=headers) as response: 
if response.status == 200: 
return await response.text() 
elif response.status == 429: # Çok Fazla İstek 
# Yeniden denemeden önce daha uzun süre bekleyin 
wait_time = int(response.headers.get('Retry-After', 60)) 
logger.info(f"Rate limited, waiting {wait_time} seconds") 
await asyncio.sleep(wait_time) 
return await respectful_fetch(url, session) 
elif response.status in (403, 404): 
# 403/404 hatalarını tekrar denemeyin 
logger.warning(f"Erişim engellendi veya bulunamadı: {url}") 
return None 
else: 
# Diğer hataları bekleyin ve tekrar deneyin 
logger.warning(f"{url} için {response.status} hatası, 5 saniye içinde tekrar deneniyor") 
await asyncio.sleep(5) 
return await respectful_fetch(url, session) 
except Exception as e: 
logger.error(f"{url} alınırken istisna: {str(e)}") 
return None 
``` 

## Kaynak Saygısı 

### Oran Sınırlaması 

İsteğinizin oranını hedef sitenin boyutuna ve kaynaklarına uyarlayın: 

- **Büyük ticari siteler**: Her 1-3 saniyede 1 istek
- **Orta büyüklükteki siteler**: Her 3-10 saniyede 1 istek
- **Küçük siteler**: Her 10-60 saniyede veya daha fazlasında 1 istek

### Kazıma Dönemleri

Yoğun işlemler için düşük trafik dönemlerini tercih edin:

- **Düşük yoğunluklu saatler**: Geceleri veya hafta sonlarını tercih edin
- **Yoğunluklardan kaçının**: Bilinen yoğunluk dönemlerinde kazıma yapmayın
- **Uyarlanabilir olun**: Yavaşlamalar tespit ederseniz oranınızı azaltın

### Etki En Aza İndirme

Hedef sunuculardaki etkiyi azaltma teknikleri:

1. **Akıllı önbelleğe alma**: Aynı sayfayı birden fazla kez almayın
2. **Seçicilik**: Yalnızca gerçekten ihtiyaç duyduğunuz sayfaları alın
3. **Sıkıştırma**: Bant genişliğini azaltmak için sıkıştırılmış yanıtlar isteyin
4. **Verimli sayfalandırma**: sitenin sayfalama yapısı 

## Kişisel Verilerin Korunması 

### Kişisel Verilerin Tanımlanması 

Topladığınız veri türleri konusunda dikkatli olun: 

- **Doğrudan tanımlama verileri**: Adlar, e-postalar, telefonlar, adresler 
- **Dolaylı tanımlama verileri**: Kullanıcı kimlikleri, takma adlar 
- **Hassas veriler**: Siyasi görüşler, sağlık, cinsel yönelim 

### Saygı Duyulması Gereken GDPR İlkeleri 

Avrupa'da faaliyet gösteriyorsanız veya Avrupalılardan veri topluyorsanız: 

1. **En aza indirme**: Yalnızca kesinlikle gerekli verileri toplayın 
2. **Amaç**: Verileri yalnızca amaçlanan amaçlar için kullanın 
3. **Sınırlı saklama**: Artık ihtiyaç duyulmadığında verileri silin 
4. **Güvenlik**: Toplanan verileri yetkisiz erişime karşı koruyun 

### Veri Anonimleştirme 

Kişisel verileri anonimleştirme teknikleri: 

```python 
import hashlib 
import re 

def anonymize_email(email): 
"""Bir e-posta adresini anonimleştirir.""" 
if not email: 
return None 

# E-posta adresinin karma değerini elde et 
hashlib.sha256(email.encode()).hexdigest()[:10] 
domain = email.split('@')[-1] 

return f"anon_{hashed}@{domain}" 

def anonymize_phone(phone): 
"""Bir telefon numarasını anonimleştirir.""" 
if not phone: 
return None 

# Yalnızca rakamları tut 
digits = re.sub(r'\D', '', phone) 

# Son 2 rakam hariç tüm rakamları maskele 
if len(digits) > 2: 
return "X" * (len(digits) - 2) + digits[-2:] 
return "X" * len(digits) 
``` 

## Belgeleme ve Şeffaflık 

### Kazıma Faaliyetlerini Belgeleme 

Kazıma faaliyetlerinizi her zaman belgelendirin: 

- **Amaç**: Bu veriler neden toplanıyor? 
- **Yöntem**: Nasıl toplanıyor? 
- **Depolama**: Nerede ve nasıl depolanıyor? 
- **Kullanım**: Nasıl kullanılacak? 
- **Silme**: Ne zaman silinecek? 

### İletişim ve Çıkış

Her zaman sizinle iletişim kurmanın bir yolunu sağlayın:

1. **Bilgi sayfası**: Botunuzu açıklayan özel bir sayfa oluşturun (ör. whytcard.com/bot)
2. **İletişim e-postası**: Kullanıcı Aracınızda bir e-posta adresi sağlayın
3. **Çıkış mekanizması**: Sitelerin hariç tutma isteğinde bulunmasına izin verin

### Etkinlik Günlüğü

Kazıma etkinliklerinizin ayrıntılı günlüklerini tutun:

```python
import logging
from datetime import datetime

# Kaydedici yapılandırması

logging.basicConfig(

filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log",
level=logging.INFO,
format='%(asctime)s - %(levelname)s - %(message)s'
)

def log_scraping_activity(url, success, data_points=0): 
"""Bir kazıma etkinliğini günlüğe kaydeder.""" 
logging.info(f"URL: {url}, Success: {success}, Veri noktaları: {data_points}") 
``` 

## Özel Durumlar 

### API ve Kazıma 

Veri toplama için öncelik sırası: 

1. **Resmi API'ler**: Mevcut olduklarında her zaman resmi API'lere öncelik verin 
2. **Genel veri akışları**: Mümkünse RSS, XML veya JSON akışlarını kullanın 
3. **Kazıma**: Kazımayı yalnızca son çare olarak kullanın 

### Kimlik Doğrulaması Olan Siteler 

Kimlik doğrulaması gerektiren siteler için: 

- **Açık yetkilendirme**: Siteden yazılı yetki alın 
- **ToS'a saygı**: ToS'un otomatik kullanıma izin verdiğinden emin olun 
- **Sınırlamalar**: Kullanım sınırlamalarına kesinlikle uyun

### Dinamik İçerik (JavaScript)

Çok fazla JavaScript kullanan siteler için:

```python
from playwright.async_api import async_playwright

async def scrape_dynamic_content(url):
""JavaScript tarafından oluşturulan içeriği kazı."""

async with async_playwright() as p:

browser = await p.chromium.launch(headless=True)
page = await browser.new_page()


# Kullanıcı Aracısını Yapılandır

await page.set_extra_http_headers({ 
'Kullanıcı Aracısı': 'WhytCardBot/1.0 (+https://whytcard.com/bot)'
})

# Sayfayı yükleyin ve ağın boşta kalmasını bekleyin
await page.goto(url) 
await page.wait_for_load_state('networkidle') 

# İçeriği çıkar 
content = await page.content() 

await browser.close() 
return content 
``` 

## Etik Kazıma Kontrol Listesi 

Her kazıma projesinden önce, aşağıdaki noktaları kontrol edin: 

### Hazırlık 
- [ ] Hedef sitenin ToS'unu kontrol edin 
- [ ] Robots.txt dosyasını kontrol edin 
- [ ] API veya kazımaya alternatifler arayın 
- [ ] Gerekli verilerin net tanımı 
- [ ] Kazıma amacının dokümantasyonu 

### Teknik Yapılandırma 
- [ ] Tanımlanabilir ve şeffaf Kullanıcı Aracısı 
- [ ] Hız sınırlama mekanizması 
- [ ] Gereksiz istekleri önlemek için önbellek sistemi 
- [ ] Hataların ve HTTP kodlarının uygun şekilde işlenmesi 
- [ ] Etkinlik günlük kaydı

### Yürütme
- [ ] Hedef site performansının izlenmesi
- [ ] Gerekirse dinamik oran ayarlaması
- [ ] Sunucu göstergelerine saygı (429, Yeniden Deneme Sonrası)
- [ ] Bir sorun algılanırsa hemen durdurma

### Son işleme
- [ ] Kişisel verilerin anonimleştirilmesi
- [ ] Güvenli veri depolama
- [ ] Zamanla sınırlı saklama
- [ ] Toplanan verilerin belgelenmesi

## Sonuç

Etik kazıma, veri erişimi ile web sitesi sahiplerinin haklarına ve kaynaklarına saygı arasında bir denge kurmaktır. Bu ilke ve uygulamaları izleyerek WhytCard projesi, sorumlu ve saygılı bir yaklaşımı sürdürürken gerekli verileri toplayabilir.

Kazıma etiğinin yalnızca yasal uyumluluk meselesi olmadığını, aynı zamanda web ekosistemine karşı bir sorumluluk meselesi olduğunu unutmayın. Saygılı kazıma, herkes için daha açık ve sürdürülebilir bir web'e katkıda bulunur.

--- 

Son güncelleme: 2025-01-15