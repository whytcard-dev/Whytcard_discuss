# Estándares de Python para WhytCard

## Introducción

Este documento define los estándares y las mejores prácticas a seguir para el desarrollo en Python en el proyecto WhytCard. Estas reglas buscan garantizar un código consistente, fácil de mantener y de alta calidad en todo el código base.

## Índice

1. [Convenciones de estilo](#style-conventions)
2. [Estructura del código](#code-structure)
3. [Documentación](#documentation)
4. [Pruebas](#testing)
5. [Gestión de errores](#error-handling)
6. [Rendimiento](#performance)
7. [Seguridad](#security)
8. [Aspectos específicos del scraping](#scraping-specifics)
9. [Herramientas recomendadas](#recommended-tools)

## Convenciones de estilo

### PEP 8

Seguimos estrictamente [PEP 8](https://www.python.org/dev/peps/pep-0008/), la guía de estilo oficial de Python, con algunas adaptaciones específicas para WhytCard.

### Sangría y formato

- Use **4 espacios** para la sangría (sin tabulaciones)
- Limite todas las líneas a un **máximo de 88 caracteres** (estándar de Black)
- Use líneas en blanco para separar funciones y clases, así como bloques grandes de código dentro de las funciones
- Use espacios alrededor de los operadores y después de las comas

```python
# Bueno
def calculate_total(price, amount=1):
total = price * amount
devuelve total

# Malo
def calculate_total(price,quantity = 1):
total=price*quantity
devuelve total
```

### Convenciones de nombres

- **Módulos y paquetes**: Nombres cortos en minúsculas, sin guiones bajos (`scraper.py`, `utils.py`)
- **Clases**: CamelCase (`ScrapingConfig`, `DataProcessor`)
- **Funciones y variables**: snake_case (`extract_data()`, `user_agent`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **Variables "privadas"**: Con un guion bajo como prefijo (`_internal_cache`)
- **Nombres descriptivos**: Priorizar la claridad sobre la brevedad

```python
# Correcto
clase UserDataProcessor:
def __init__(self):
self.MAX_BATCH_SIZE = 100
self._temp_storage = {}


def process_user_data(self, user_data):
pass

# Incorrecto
clase Processor:
def __init__(self):
self.max = 100
self.temp = {}


def process(self, d): 
pass 
``` 

### Importaciones 

- Organice las importaciones en tres secciones separadas por una línea en blanco: 
1. Importaciones de la biblioteca estándar 
2. Importaciones de bibliotecas de terceros 
3. Importaciones del proyecto local 
- Cada sección debe estar ordenada alfabéticamente 
- Prefiera las importaciones explícitas a las genéricas 

```python 
# Correcto 
import os 
import sys 
from writing import Dict, List, Optional 

import aiohttp 
import bs4 
from fastapi import HTTPException 

from scraping.utils import URLUtils 
from utils.logging import setup_logger 

# Incorrecto 
from scraping.utils import * 
import aiohttp, bs4 
import sys, os 
``` 

## Estructura del código 

### Organización de los módulos 

- Cada módulo debe tener un único módulo bien definido Responsabilidad
- Usar paquetes para organizar módulos relacionados
- Crear un archivo `__init__.py` para cada paquete, exponiendo claramente la API pública

```python
# scraping/__init__.py
from .scraper import AdvancedScraper, ScrapingConfig, ScrapingMode
from .utils import URLUtils, ContentExtractor

__all__ = [ 
"AdvancedScraper", 
"ScrapingConfig", 
"ScrapingMode", 
"URLUtils", 
"ContentExtractor" 
] 
``` 

### Clases y funciones

- Seguir el principio de responsabilidad única (PRU)
- Limitar el tamaño de las funciones a un máximo de 50 líneas
- Limitar el tamaño de las clases a un máximo de 300 líneas
- Usar métodos estáticos o funciones independientes para operaciones que no dependen de la instancia estado

```python
# Correcto
class DataProcessor:

def process_data(self, data):
clean_data = self._clean_data(data)

return self._transform_data(cleaned_data)


def _clean_data(self, data):

# Lógica de limpieza

return clean_data

def _transform_data(self, data):

# Lógica de transformación

return transformation_data

# Incorrecto
class DataProcessor:

def process_data(self, data):

# 200 líneas de código que combinan limpieza y transformación

return result
```

### Tipado estático

- Usar anotaciones de tipo para todas las funciones y métodos
- Usar el módulo `typing` para tipos complejos
- Documentar las excepciones que puedan generarse

```python
from writing import Dict, List, Optional, Union, Cualquiera

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]: 
""" 
Obtiene datos de la URL especificada.

Args: 
url: La URL a consultar 
timeout: Tiempo de espera en segundos 

Devuelve: 
Diccionario que contiene los datos recuperados 

Genera: 
HTTPException: Si la solicitud falla 
""" 
# Implementación 
``` 

## Documentación 

### Docstrings 

- Usar docstrings para todos los módulos, clases, métodos y funciones 
- Seguir el formato de Google para docstrings 
- Documentar parámetros, valores de retorno y excepciones 

```python 
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]: 
""" 
Extrae todos los enlaces de un HTML Página con sus textos y atributos.

Argumentos: 
html: Contenido HTML de la página 
base_url: URL base para resolver enlaces relativos 

Devuelve: 
Lista de diccionarios que contienen información de enlaces 

Genera: 
ValueError: Si el HTML no es válido 
""" 
``` 

### Comentarios 

- Usar comentarios para explicar el "por qué", no el "qué". 
- Comentar código complejo o poco intuitivo 
- Evitar comentarios obsoletos o redundantes 

```python 
# Bueno 
# Usar un límite de 5 segundos para evitar tiempos de espera frecuentes en sitios lentos 
timeout = 5 

# Malo 
# Establecer el tiempo de espera 
timeout = 5 
``` 

## Pruebas 

### Estructura de las pruebas 

- Usar pytest para todas las pruebas 
- Organizar las pruebas en una estructura que refleje el código fuente 
- Nombrar los archivos de prueba con El prefijo `test_`
- Nombra las funciones de prueba con el prefijo `test_`

``` 
scraping/ 
scraper.py 
utils.py 
tests/ 
scraping/ 
test_scraper.py 
test_utils.py 
``` 

### Cobertura de la prueba

- Intentar una cobertura de prueba de al menos el 80 %
- Probar todas las rutas de código críticas
- Incluir pruebas para casos extremos y condiciones de error

```python 
def test_scrape_url_success(): 
# Probar el caso nominal

def test_scrape_url_timeout(): 
# Probar el caso donde la URL no responde

def test_scrape_url_invalid_url(): 
# Probar con una URL no válida
``` 

### Pruebas asíncronas

- Usar `pytest-asyncio` para probar código asíncrono
- Usar simulacros para llamadas de red en las pruebas

```python
import pytest

@pytest.mark.asyncio
async def test_async_function():
result = await async_function()
assert result == expected_result
```

## Manejo de errores

### Excepciones

- Crear excepciones personalizadas para errores específicos de la aplicación
- Usar excepciones estándar de Python cuando corresponda
- Documentar todas las excepciones que puedan generarse

```python
class ScrapingException(Exception):
""Excepción base para el scraping de errores."""
pass

class RateLimitException(ScrapingException):
""Se genera cuando se alcanza un límite de velocidad."""
pass

```

### Manejo de errores

- Usar bloques try/except para gestionar los errores adecuadamente
- Evitar la captura Excepción genérica
- Registrar errores con contexto suficiente para la depuración.

```python
try:

resultado = await scraper.scrape_url(url)
excepto RateLimitException:
logger.warning(f"Límite de velocidad alcanzado para {url}, reintentando tras retraso")
await asyncio.sleep(RATE_LIMIT_DELAY)
resultado = await scraper.scrape_url(url)
excepto ScrapingException como e:
logger.error(f"Error al extraer {url}: {str(e)}")
raise
```

## Rendimiento

### Asíncrono

- Usar `asyncio` para operaciones con uso intensivo de E/S
- Usar `aiohttp` para solicitudes HTTP asíncronas
- Limitar el número de tareas concurrentes para evitar la sobrecarga

```python
async def scrape_batch(urls: List[str], max_concurrent: int = 10): 
semaphore = asyncio.Semaphore(max_concurrent) 

async def _scrape_with_semaphore(url): 
async with semaphore: 
return await scrape_url(url) 

tasks = [_scrape_with_semaphore(url) for url in urls] 
return await asyncio.gather(*tasks, return_exceptions=True) 
``` 

### Optimizaciones 

- Usar estructuras de datos adecuadas para operaciones comunes (diccionarios para búsquedas frecuentes) 
- Evitar copias innecesarias de grandes cantidades de datos 
- Usar generadores para procesar grandes cantidades de datos 
- Almacenar en caché cálculos o solicitudes costosos 

```python 
# Usar generadores para procesar grandes conjuntos de datos 
def process_large_dataset(file_path): 
with open(file_path, 'r') as f: 
for line in f: 
yield process_line(line) 
``` 

## Seguridad 

### Validación de entrada 

- Validar siempre la entrada del usuario 
- Usar Pydantic para la validación de datos 
- Nunca confiar en datos externos 

```python 
from pydantic import BaseModel, HttpUrl, validator 

class ScrapingRequest(BaseModel): 
url: HttpUrl 
depth: int = 1 

@validator('depth') 
def validate_depth(cls, v): 
if v < 1 or v > 3: 
raise ValueError('La profundidad debe estar entre 1 y 3') 
return v 
``` 

### Gestión de secretos 

- Nunca incluir secretos (contraseñas, claves API) en el código fuente Código
- Usar variables de entorno o archivos de configuración seguros
- Usar python-dotenv para cargar variables de entorno

```python 
import os 
from dotenv import load_dotenv 

load_dotenv() 

API_KEY = os.getenv("API_KEY") 
if not API_KEY: 
raise EnvironmentError("La variable de entorno API_KEY no está establecida") 
``` 

## Detalles específicos de scraping

### Respetar robots.txt

- Respetar siempre los archivos robots.txt
- Implementar retrasos entre solicitudes
- Identificarse correctamente con un agente de usuario adecuado

```python 
from urllib.robotparser import RobotFileParser 
from urllib.parse import urlparse 

def can_fetch(url: str, user_agent: str) -> bool: 
"""Comprueba si La URL se puede obtener según robots.txt.

parser = RobotFileParser()
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt"
parser.set_url(robots_url)
parser.read()
return parser.can_fetch(user_agent, url)
```

### Gestión de sesiones

- Reutilizar sesiones HTTP para mejorar el rendimiento
- Cerrar sesiones correctamente después de su uso
- Usar contextos asíncronos para asegurar el cierre de recursos

```python
async def scrape_with_session():
async with aiohttp.ClientSession() as session:
# Usar la sesión para todas las solicitudes

resultado1 = await fetch_url(session, url1)
resultado2 = await fetch_url(session, url2) 
# La sesión se cierra automáticamente aquí
``` 

### Análisis HTML

- Usar `lxml` como analizador para BeautifulSoup para un mejor rendimiento
- Usar selectores CSS o XPath para la navegación DOM
- Gestionar casos donde los elementos esperados no existen

```python 
from bs4 import BeautifulSoup 

def extract_title(html: str) -> Optional[str]: 
soup = BeautifulSoup(html, "lxml") 
title_tag = soup.find("title") 
return title_tag.text if title_tag else None 
``` 

## Herramientas recomendadas

### Linting y formato

- **Black**: Formateador automático de código
- **isort**: Ordenador automático de importaciones
- **flake8**: Linter para detectar errores y problemas de estilo
- **mypy**: Comprobación de tipos estáticos

### Recomendado Configuración

Archivo `pyproject.toml`:

```toml
[tool.black]
longitud de línea = 88
versión de destino = ['py38']
include = '\.pyi?$'

[tool.isort]
perfil = "black"
longitud de línea = 88

[tool.mypy]
versión de Python = "3.8"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true
disallow_incomplete_defs = true
```

Archivo `.flake8`:

```
[flake8]
longitud máxima de línea = 88
extend-ignore = E203
exclude = .git,__pycache__,build,dist
```

### Integración de CI

Configure estas herramientas en su canalización de CI para verificar el código automáticamente:

```yaml 
# Ejemplo de acciones de GitHub 
nombre: Análisis de errores de Python 

en: [push, pull_request] 

trabajos: 
análisis de errores: 
se ejecuta en: ubuntu-latest 
pasos: 
- usos: actions/checkout@v2 
- nombre: Configurar Python 
usos: actions/setup-python@v2 
con: 
python-version: '3.8' 
- nombre: Instalar dependencias 
ejecutar: | 
python -m pip install --upgrade pip 
pip install black isort flake8 mypy 
- nombre: Ejecutar análisis de errores 
ejecutar: | 
black --check . 
isort --check . 
flake8 . 
mypy . 
``` 

--- 

## Conclusión 

Estos estándares están diseñados para garantizar la calidad, la mantenibilidad y la consistencia del código Python en el proyecto WhytCard. Se espera que todos los colaboradores sigan estas directrices. Si tiene alguna pregunta o sugerencia de mejora, no dude en compartirla con el equipo.

--- 

Última actualización: 15/01/2025