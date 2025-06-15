# Стандарты Python для WhytCard 

## Введение 

Этот документ определяет стандарты и передовые практики, которым необходимо следовать при разработке Python в проекте WhytCard. Эти правила направлены на обеспечение согласованного, поддерживаемого и высококачественного кода во всей кодовой базе. 

## Содержание 

1. [Условия стиля](#style-conventions) 
2. [Структура кода](#code-structure) 
3. [Документация](#documentation) 
4. [Тестирование](#testing) 
5. [Обработка ошибок](#error-handling) 
6. [Производительность](#performance) 
7. [Безопасность](#security) 
8. [Особенности скрапинга](#scraping-specifics) 
9. [Рекомендуемые инструменты](#recommended-tools) 

## Соглашения стиля 

### PEP 8 

Мы строго следуем [PEP 8](https://www.python.org/dev/peps/pep-0008/), официальному руководству по стилю Python, с некоторыми специфическими адаптациями для WhytCard. 

### Отступы и форматирование 

- Используйте **4 пробела** для отступов (без табуляции) 
- Ограничьте все строки **максимум 88 символами** (черный стандарт) 
- Используйте пустые строки для разделения функций и классов, а также больших блоков кода внутри функций 
- Используйте пробелы вокруг операторов и после запятых 

```python 
# Хорошо 
def calculate_total(price, quantity=1): 
total = price * quantity 
return total 

# Плохо 
def calculate_total(price,quantity = 1): 
total=price*quantity 
return total 
``` 

### Соглашения об именовании 

- **Модули и пакеты**: Короткие, строчные имена, без подчеркиваний (`scraper.py`, `utils.py`) 
- **Классы**: CamelCase (`ScrapingConfig`, `DataProcessor`) 
- **Функции и переменные**: snake_case (`extract_data()`, `user_agent`) 
- **Константы**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`) 
- **"Частные" переменные**: с префиксом в виде подчеркивания (`_internal_cache`) 
- **Описательные имена**: отдавайте приоритет ясности, а не краткости 

```python 
# Хорошо 
класс UserDataProcessor: 
def __init__(self): 
self.MAX_BATCH_SIZE = 100 
self._temp_storage = {} 

def process_user_data(self, user_data): 
pass 

# Плохо 
класс Processor: 
def __init__(self): 
self.max = 100 
self.temp = {} 

def process(self, d): 
pass 
``` 

### Импорт 

- Организуйте импорт в три раздела, разделенных пустой строкой: 
1. Импорт стандартной библиотеки 
2. Импорт сторонних библиотек 
3. Импорт локального проекта 
- Каждый раздел должен быть отсортирован в алфавитном порядке 
- Предпочитайте явный импорт общему импорту 

```python 
# Хорошо 
import os 
import sys 
from typing import Dict, List, Optional 

import aiohttp 
import bs4 
from fastapi import HTTPException 

from scraping.utils import URLUtils 
from utils.logging import setup_logger 

# Плохо 
from scraping.utils import * 
import aiohttp, bs4 
import sys, os 
``` 

## Структура кода 

### Организация модулей 

- Каждый модуль должен иметь одну четко определенную ответственность 
- Используйте пакеты для организации связанных модулей 
- Создайте файл `__init__.py` для каждого пакета, четко раскрывая публичный API 

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

### Классы и функции 

- Соблюдайте принцип единой ответственности (SRP) 
- Ограничьте размер функции максимум 50 строки 
- Ограничьте размер класса максимум 300 строками 
- Используйте статические методы или автономные функции для операций, которые не зависят от состояния экземпляра 

```python 
# Хорошо 
class DataProcessor: 
def process_data(self, data): 
cleaning_data = self._clean_data(data) 
return self._transform_data(cleaned_data) 

def _clean_data(self, data): 
# Логика очистки 
return cleaning_data 

def _transform_data(self, data): 
# Логика преобразования 
return transformed_data 

# Плохо 
class DataProcessor: 
def process_data(self, data): 
# 200 строк кода, смешивающих очистку и преобразование 
return result 
``` 

### Статическая типизация 

- Используйте аннотации типов для всех функций и методов 
- Используйте модуль `typing` для сложных типов 
- Исключения документа, которые могут быть вызваны 

```python 
при вводе import Dict, List, Optional, Union, Any 

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]: 
""" 
Извлекает данные с указанного URL. 

Аргументы: 
url: URL для запроса 
timeout: Время ожидания в секундах 

Возвращает: 
Словарь, содержащий извлеченные данные 

Вызывает: 
HTTPException: Если запрос не выполнен 
""" 
# Реализация 
``` 

## Документация 

### Строки документации 

- Используйте строки документации для всех модулей, классов, методов и функций 
- Следуйте формату Google для строк документации 
- Параметры документа, возвращаемые значения и исключения 

```python 
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]: 
""" 
Извлекает все ссылки со страницы HTML с их текстами и атрибутами. 

Аргументы: 
html: HTML-содержимое страницы 
base_url: Базовый URL для разрешения относительных ссылок 

Возвращает: 
Список словарей, содержащих информацию о ссылках 

Вызывает: 
ValueError: Если HTML недействителен 
""" 
``` 

### Комментарии 

- Используйте комментарии, чтобы объяснить "почему", а не "что" 
- Комментируйте сложный или неинтуитивный код 
- Избегайте устаревших или избыточных комментариев 

```python 
# Хорошо 
# Используйте 5-секундный лимит, чтобы избежать частых тайм-аутов на медленных сайтах 
timeout = 5 

# Плохо 
# Установите тайм-аут 
timeout = 5 
``` 

## Тестирование 

### Структура теста 

- Используйте pytest для всех тестов 
- Организуйте тесты в структуру, отражающую исходный код 
- Назовите тестовые файлы с префиксом `test_` 
- Назовите тестовые функции с префиксом `test_` 

``` 
scraping/ 
scraper.py 
utils.py 
tests/ 
scraping/ 
test_scraper.py 
test_utils.py 
``` 

### Покрытие тестом 

- Стремитесь к покрытию тестом не менее 80% 
- Протестируйте все критические пути кода 
- Включите тесты для пограничных случаев и условий ошибок 

```python 
def test_scrape_url_success(): 
# Тестируйте номинальный случай 

def test_scrape_url_timeout(): 
# Тестируйте случай, когда URL не отвечает 

def test_scrape_url_invalid_url(): 
# Тест с недействительным URL 
``` 

### Асинхронные тесты 

- Используйте `pytest-asyncio` для тестирования асинхронного кода 
- Используйте фиктивные объекты для сетевых вызовов в тестах 

```python 
import pytest 

@pytest.mark.asyncio 
async def test_async_function(): 
result = await async_function() 
assert result == expected_result 
``` 

## Обработка ошибок 

### Исключения 

- Создайте пользовательские исключения для ошибок, специфичных для приложения 
- Используйте стандартные исключения Python, когда это уместно 
- Документируйте все исключения, которые могут возникнуть 

```python 
class ScrapingException(Exception): 
"""Базовое исключение для ошибок скрапинга.""" 
pass 

class RateLimitException(ScrapingException): 
"""Вызывается при достижении ограничения скорости.""" 
pass 
``` 

### Обработка ошибок 

- Используйте блоки try/except для надлежащей обработки ошибок 
- Избегайте перехвата исключений в общем виде 
- Регистрируйте ошибки с достаточным контекстом для отладки 

```python 
try: 
result = await scraper.scrape_url(url) 
except RateLimitException: 
logger.warning(f"Достигнуто ограничение скорости для {url}, повтор после задержки") 
await asyncio.sleep(RATE_LIMIT_DELAY) 
result = await scraper.scrape_url(url) 
except ScrapingException as e: 
logger.error(f"Не удалось выполнить очистку {url}: {str(e)}") 
raise 
``` 

## Производительность 

### Асинхронный 

- Используйте `asyncio` для операций с интенсивным вводом-выводом 
- Используйте `aiohttp` для асинхронных HTTP-запросов 
- Ограничьте количество одновременных задач, чтобы избежать перегрузки 

```python 
async def scrape_batch(urls: List[str], max_concurrent: int = 10): 
semaphore = asyncio.Semaphore(max_concurrent) 

async def _scrape_with_semaphore(url): 
async with semaphore: 
return await scrape_url(url) 

tasks = [_scrape_with_semaphore(url) for url in urls] 
return await asyncio.gather(*tasks, return_exceptions=True) 
``` 

### Оптимизации 

- Используйте соответствующие структуры данных для общих операций (словари для частых поисков) 
- Избегайте ненужных копий больших данных 
- Используйте генераторы для обработки больших объемов данных 
- Кэшируйте дорогостоящие вычисления или запросы 

```python 
# Использование генераторов для обработки больших наборов данных 
def process_large_dataset(file_path): 

with open(file_path, 'r') as f: 
for line in f: 
yield process_line(line) 
``` 

## Безопасность 

### Проверка входных данных 

- Всегда проверяйте вводимые пользователем данные 
- Используйте Pydantic для проверки данных 
- Никогда не доверяйте внешним данным 

```python 
from pydantic import BaseModel, HttpUrl, validator 

class ScrapingRequest(BaseModel): 
url: HttpUrl 
depth: int = 1 

@validator('depth') 
def validate_depth(cls, v): 
if v < 1 or v > 3: 
raise ValueError('Глубина должна быть между 1 и 3') 
return v 
``` 

### Управление секретами 

- Никогда не включайте секреты (пароли, ключи API) в исходный код 
- Используйте переменные среды или защищенные файлы конфигурации 
- Используйте python-dotenv для загрузки переменных среды 

```python 
import os 
from dotenv import load_dotenv 

load_dotenv() 

API_KEY = os.getenv("API_KEY") 
if not API_KEY: 
raise EnvironmentError("Переменная среды API_KEY не задана") 
``` 

## Особенности скрейпинга 

### Соблюдение robots.txt 

- Всегда соблюдайте файлы robots.txt 
- Реализуйте задержки между запросы 
- Правильно идентифицируйте себя с соответствующим User-Agent 

```python 
from urllib.robotparser import RobotFileParser 
from urllib.parse import urlparse 

def can_fetch(url: str, user_agent: str) -> bool: 
"""Проверяет, может ли быть получен URL в соответствии с robots.txt.""" 
parser = RobotFileParser() 
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt" 
parser.set_url(robots_url) 
parser.read() 
return parser.can_fetch(user_agent, url) 
``` 

### Управление сеансами 

- Повторное использование сеансов HTTP для повышения производительности 
- Правильно закрывайте сеансы после использования 
- Используйте асинхронные контексты для обеспечения закрытия ресурсов 

```python 
async def scrape_with_session(): 
async with aiohttp.ClientSession() as session: 
# Используйте сеанс для всех запросов 
result1 = await fetch_url(session, url1) 
result2 = await fetch_url(session, url2) 
# Сеанс автоматически закрывается здесь 
``` 

### Анализ HTML 

- Используйте `lxml` в качестве анализатора для BeautifulSoup для лучшей производительности 
- Используйте селекторы CSS или XPath для навигации по DOM 
- Обрабатывайте случаи, когда ожидаемые элементы не существуют 

```python 
from bs4 import BeautifulSoup 

def extract_title(html: str) -> Optional[str]: 
soup = BeautifulSoup(html, "lxml") 
title_tag = soup.find("title") 
return title_tag.text if title_tag else None 
``` 

## Рекомендуемые инструменты 

### Линтинг и форматирование 

- **Black**: Автоматический форматировщик кода 
- **isort**: Автоматический сортировщик импорта 
- **flake8**: Линтинг для обнаружения ошибок и проблем со стилем 
- **mypy**: Статическая проверка типов 

### Рекомендуемая конфигурация 

файл `pyproject.toml`: 

```toml 
[tool.black] 
line-length = 88 
target-version = ['py38'] 
include = '\.pyi?$' 

[tool.isort] 
profile = "black" 
line_length = 88 

[tool.mypy] 
python_version = "3.8" 
warn_return_any = true 
warn_unused_configs = true 
disallow_untyped_defs = true 
disallow_incomplete_defs = true 
``` 

`.flake8` файл: 

``` 
[flake8] 
max-line-length = 88 
extend-ignore = E203 
exclude = .git,__pycache__,build,dist 
``` 

### Интеграция CI 

Настройте эти инструменты в вашем конвейере CI для автоматической проверки кода: 

```yaml 
# Пример для действий GitHub 
name: Python Linting 

on: [push, pull_request] 

jobs: 
lint: 
running-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v2 
- name: Настройка Python 
uses: actions/setup-python@v2 
with: 
python-version: '3.8' 
- name: Установить зависимости 
run: | 
python -m pip install --upgrade pip 
pip install black isort flake8 mypy 
- name: Запустить линтеры 
run: | 
black --check . 
isort --check . 
flake8 . 
mypy . 
``` 

--- 

## Заключение 

Эти стандарты разработаны для обеспечения качества, удобства обслуживания и согласованности кода Python в проекте WhytCard. Все участники должны следовать этим рекомендациям. Если у вас есть вопросы или предложения по улучшению, не стесняйтесь делиться ими с командой. 

--- 

Последнее обновление: 2025-01-15