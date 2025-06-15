# Guía de Extracción Ética para WhytCard

## Introducción

La extracción de datos web es fundamental para el proyecto WhytCard, pero debe llevarse a cabo de forma ética, responsable y legal. Esta guía define los principios y prácticas a seguir para garantizar que todas las actividades de extracción respeten los derechos de los propietarios de sitios web, la legislación aplicable y los estándares éticos.

## Índice

1. [Principios Fundamentales](#principios-fundamentales)
2. [Aspectos Legales](#aspectos-legales)
3. [Mejores Prácticas Técnicas](#mejores-prácticas-técnicas)
4. [Respeto a los Recursos](#respeto-a-los-recursos)
5. [Protección de Datos Personales](#protección-de-datos-personales)
6. [Documentación y Transparencia](#documentación-y-transparencia)
7. [Casos Especiales](#casos-especiales)
8. [Lista de Verificación para el Scraping Ético](#lista-de-verificación-para-el-scraping-ético)

## Principios Fundamentales

### Filosofía del Scraping Ético

El scraping ético se basa en tres principios fundamentales:

1. **Respeto**: Respetar a los propietarios de sitios web, sus términos de uso y sus recursos.
2. **Proporcionalidad**: Extraer solo los datos necesarios con un impacto mínimo.
3. **Transparencia**: Ser transparentes sobre la identidad del bot y las intenciones del scraping.

### Valores de WhytCard con respecto al scraping

Como proyecto WhytCard, nos comprometemos a:

- Nunca dañar los sitios web que scrapeamos.
- Respetar estrictamente las normas explícitas e implícitas de los sitios web.
- Ser transparentes sobre nuestra identidad y objetivos.
- Usar los datos de forma responsable y de acuerdo con nuestra misión.
- Priorizar las API oficiales cuando estén disponibles.

## Aspectos legales

### Marco legal general

El scraping web está sujeto a varios marcos legales que varían según el país:

- **Copyright**: El contenido del sitio web generalmente está protegido por derechos de autor.
- **Condiciones de uso**: Las condiciones de servicio del sitio web pueden prohibir explícitamente el scraping.
- **Protección de datos**: Leyes como el RGPD en Europa protegen los datos personales.
- **Acceso no autorizado**: Algunas jurisdicciones penalizan el acceso no autorizado a computadoras. Sistemas

### Jurisprudencia Destacada

Algunas decisiones judiciales importantes sobre el scraping:

- **hiQ Labs v. LinkedIn** (EE. UU.): Se estableció que el scraping de datos públicos no es necesariamente ilegal.
- **Ryanair v. PR Aviation** (UE): Se confirmó que las condiciones de uso pueden limitar contractualmente el scraping.
- **QVC v. Resultly** (EE. UU.): Se enfatizó la importancia de no sobrecargar los servidores.

### Cumplimiento Legal para WhytCard

Para mantener la legalidad:

1. **Consulte siempre las Condiciones de Servicio** antes de scrapear un sitio web.
2. **Respete las etiquetas "noindex" y "nofollow"** en las metaetiquetas.
3. **Nunca eluda las medidas técnicas de protección** (CAPTCHA, limitaciones de acceso).
4. **Documente sus prácticas** para demostrar buena fe.
5. **Consulte a un abogado** si tiene dudas sobre la legalidad de una operación de scraping.

## Mejores Prácticas Técnicas

### Respeto del archivo robots.txt

El archivo robots.txt Define las reglas de acceso para robots:

```python 
from urllib.robotparser import RobotFileParser 
from urllib.parse import urlparse 

def is_allowed(url, user_agent="WhytCardBot/1.0"): 
"""Comprueba si la URL se puede extraer según robots.txt.""" 
rp = RobotFileParser() 
rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt") 
rp.read() 
return rp.can_fetch(user_agent, url) 
``` 

### Identificación correcta 

Utilice siempre un agente de usuario que identifique claramente a su bot: 

```python 
headers = { 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)', 
# Otros encabezados... 
} 
``` 

### Retrasos en las solicitudes 

Implementar retrasos razonables entre solicitudes: 

```python 
import time 
import random 

def polite_request(url, session, min_delay=1, max_delay=3): 
"""Realiza una solicitud con un retraso moderado entre solicitudes.""" 
# Esperar un retraso aleatorio 
delay = random.uniform(min_delay, max_delay) 
time.sleep(delay) 

# Realizar la solicitud 
response = session.get(url, headers=headers) 
return response 
``` 

### Manejo de errores 

Respetar los códigos de error HTTP y adaptar su comportamiento en consecuencia: 

```python 
async def respectful_fetch(url, session): 
"""Obtiene una URL de forma respetuosa.""" 
try: 
async with session.get(url, headers=headers) as response: 
if response.status == 200: 
return await response.text() 
elif response.status == 429: # Demasiadas solicitudes 
# Esperar más tiempo antes de reintentar 
wait_time = int(response.headers.get('Retry-After', 60)) 
logger.info(f"Velocidad limitada, esperando {wait_time} segundos") 
await asyncio.sleep(wait_time) 
return await respectful_fetch(url, session) 
elif response.status in (403, 404): 
# No reintentar errores 403/404 
logger.warning(f"Acceso denegado o no encontrado: {url}") 
devuelve Ninguno 
de lo contrario: 
# Esperar y reintentar por otros errores 
logger.warning(f"Error {response.status} para {url}, reintentando en 5 segundos") 
await asyncio.sleep(5) 
devuelve await respectful_fetch(url, session) 
except Exception as e: 
logger.error(f"Excepción al obtener {url}: {str(e)}") 
devuelve Ninguno 
``` 

## Respeto de recursos 

### Limitación de velocidad 

Adapte la velocidad de sus solicitudes al tamaño y los recursos del sitio de destino: 

- **Sitios comerciales grandes**: 1 solicitud cada 1-3 segundos 
- **Sitios medianos**: 1 solicitud cada 3-10 segundos 
- **Sitios pequeños**: 1 solicitud cada 10-60 segundos o más 

### Periodos de scraping 

Favor Periodos de bajo tráfico para operaciones intensivas:

- **Horas valle**: Preferiblemente noches o fines de semana
- **Evite picos**: No rastree datos durante periodos pico conocidos
- **Sea adaptable**: Reduzca su velocidad si detecta ralentizaciones

### Minimización del impacto

Técnicas para reducir el impacto en los servidores de destino:

1. **Almacenamiento en caché inteligente**: No recupere la misma página varias veces
2. **Selectividad**: Recupere solo las páginas que realmente necesita
3. **Compresión**: Solicite respuestas comprimidas para reducir el ancho de banda
4. **Paginación eficiente**: Respete la estructura de paginación del sitio

## Protección de datos personales

### Datos personales de identificación

Sea precavido con los tipos de datos que recopila:

- **Datos de identificación directa**: Nombres, correos electrónicos, teléfonos, direcciones
- **Datos de identificación indirecta**: ID de usuario, seudónimos
- **Datos sensibles**: Opiniones políticas Salud, orientación sexual

### Principios del RGPD que deben respetarse

Si opera en Europa o recopila datos de europeos:

1. **Minimización**: Recopilar únicamente los datos estrictamente necesarios
2. **Finalidad**: Utilizar los datos únicamente para los fines previstos
3. **Retención limitada**: Eliminar los datos cuando ya no sean necesarios
4. **Seguridad**: Proteger los datos recopilados contra el acceso no autorizado

### Anonimización de datos

Técnicas para anonimizar datos personales:

```python 
import hashlib 
import re 

def anonymize_email(email): 
"""Anonimiza una dirección de correo electrónico.""" 
if not email: 
return None 

# Hash de la dirección de correo electrónico
hashed = hashlib.sha256(email.encode()).hexdigest()[:10] 
domain = email.split('@')[-1] 

return f"anon_{hashed}@{domain}" 

def anonymize_phone(phone): 
"""Anonimiza un número de teléfono.""" 
if not phone: 
return None 

# Conservar solo dígitos 
digits = re.sub(r'\D', '', phone) 

# Enmascarar todos los dígitos excepto los dos últimos 
if len(digits) > 2: 
return "X" * (len(digits) - 2) + digits[-2:] 
return "X" * len(digits) 
``` 

## Documentación y transparencia 

### Documentación de actividades de scraping 

Documente siempre sus actividades de scraping: 

- **Propósito**: ¿Por qué se recopilan estos datos? 
- **Método**: ¿Cómo se recopilan? 
- **Almacenamiento**: ¿Dónde y cómo se almacenan? **Uso**: ¿Cómo se usará?

**Eliminación**: ¿Cuándo se eliminará?

### Contacto y cancelación de suscripción

Siempre proporcione una forma de contactarle:

1. **Página de información**: Cree una página dedicada a su bot (p. ej., whytcard.com/bot)
2. **Correo electrónico de contacto**: Proporcione una dirección de correo electrónico en su agente de usuario
3. **Mecanismo de cancelación de suscripción**: Permita que los sitios soliciten la exclusión

### Registro de actividad

Mantenga registros detallados de sus actividades de scraping:

```python 
import logging 
from datetime import datetime 

# Configuración del registrador 
logging.basicConfig( 
filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log", 
level=logging.INFO, 
format='%(asctime)s - %(levelname)s - %(message)s' 
) 

def log_scraping_activity(url, success, data_points=0): 
"""Registra una actividad de scraping.""" 
logging.info(f"URL: {url}, Success: {success}, Data points: {data_points}") 
``` 

## Casos especiales 

### API vs. Scraping 

Orden de prioridad para la recopilación de datos: 

1. **API oficiales**: Priorizar siempre las API oficiales cuando existan.
2. **Fuentes de datos públicas**: Usar fuentes RSS, XML o JSON si están disponibles.
3. **Scraping**: Usar el scraping solo como último recurso.

### Sitios con autenticación 

Para sitios que requieren autenticación: 

- **Autorización explícita**: Obtener autorización por escrito del sitio.
- **Respeto de las condiciones de servicio**: Asegurarse de que las condiciones de servicio permitan el uso automatizado.
- **Limitaciones**: Respetar estrictamente las limitaciones de uso.

### Contenido dinámico (JavaScript)

Para sitios que usan mucho JavaScript:

```python 
from playwright.async_api import async_playwright 

async def scrape_dynamic_content(url): 
"""Extraer contenido generado por JavaScript.""" 
async with async_playwright() as p: 
browser = await p.chromium.launch(headless=True) 
page = await browser.new_page() 

# Configurar el agente de usuario 
await page.set_extra_http_headers({ 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot)' 
}) 

# Cargar la página y esperar a que la red esté inactiva 
await page.goto(url) 
await page.wait_for_load_state('networkidle') 

# Extraer Contenido
contenido = await page.content()

await browser.close()
devolver contenido
```

## Lista de verificación para el scraping ético

Antes de cada proyecto de scraping, verifique los siguientes puntos:

### Preparación
- [ ] Verificar las condiciones de servicio del sitio de destino
- [ ] Verificar el archivo robots.txt
- [ ] Buscar API o alternativas al scraping
- [ ] Definición clara de los datos necesarios
- [ ] Documentación del propósito del scraping

### Configuración técnica
- [ ] Agente de usuario identificable y transparente
- [ ] Mecanismo de limitación de velocidad
- [ ] Sistema de caché para evitar solicitudes redundantes
- [ ] Gestión adecuada de errores y códigos HTTP
- [ ] Registro de actividad

### Ejecución
- [ ] Monitoreo del rendimiento del sitio de destino
- [ ] Ajuste dinámico de la velocidad si es necesario
- [ ] Respeto a las indicaciones del servidor (429, Reintentar después)
- [ ] Detención inmediata si se detecta un problema

### Posprocesamiento
- [ ] Anonimización de datos personales
- [ ] Almacenamiento seguro de datos
- [ ] Retención por tiempo limitado
- [ ] Documentación de los datos recopilados

## Conclusión

El scraping ético busca un equilibrio entre el acceso a los datos y el respeto a los derechos y recursos de los propietarios de sitios web. Siguiendo estos principios y prácticas, el proyecto WhytCard puede recopilar los datos necesarios manteniendo un enfoque responsable y respetuoso.

Recuerde que la ética del scraping no se limita al cumplimiento legal, sino también a la responsabilidad hacia el ecosistema web en su conjunto. El scraping respetuoso contribuye a una web más abierta y sostenible para todos.

---

Última actualización: 15/01/2025