# Стандарти Python для WhytCard

## Вступ

Цей документ визначає стандарти та найкращі практики, яких слід дотримуватися для розробки на Python у проекті WhytCard. Ці правила спрямовані на забезпечення узгодженості, зручності підтримки та високої якості коду в усій кодовій базі.

## Зміст

1. [Стильові угоди](#style-conventions)
2. [Структура коду](#code-structure)
3. [Документація](#documentation)
4. [Тестування](#testing)
5. [Обробка помилок](#error-handling)
6. [Продуктивність](#performance)
7. [Безпека](#security)
8. [Специфіка парсингу](#scraping-specifics)
9. [Рекомендовані інструменти](#recommended-tools)

## Стильові угоди

### PEP 8

Ми суворо дотримуємося [PEP 8](https://www.python.org/dev/peps/pep-0008/), офіційного посібника зі стилю Python, з деякими специфічними адаптаціями для WhytCard.

### Відступи та форматування

- Використовуйте **4 пробіли** для відступів (без табуляції)
- Обмежте всі рядки **максимумом 88 символів** (стандарт Black)
- Використовуйте порожні рядки для розділення функцій та класів, а також великих блоків коду всередині функцій
- Використовуйте пробіли навколо операторів та після ком

```python
# Добре
def calculate_total(price, quantity=1):
total = price * quantity
return total

# Погано
def calculate_total(price, quantity = 1):
total=price*quantity
return total
```

### Правила іменування

- **Модулі та пакети**: Короткі назви в малому регістрі, без символів підкреслення (`scraper.py`, `utils.py`)
- **Класи**: CamelCase (`ScrapingConfig`, `DataProcessor`)
- **Функції та змінні**: snake_case (`extract_data()`, `user_agent`) 
- **Константи**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`) 
- **"Приватні" змінні**: Починаються з символу підкреслення (`_internal_cache`) 
- **Описові імена**: Пріоритет ясності над стислостю 

```python 
# Добре 
class UserDataProcessor: 
def __init__(self): 
self.MAX_BATCH_SIZE = 100 
self._temp_storage = {} 

def process_user_data(self, user_data): 
pass 

# Погано 
class Processor: 
def __init__(self): 
self.max = 100 
self.temp = {} 

def process(self, d): 
pass 
``` 

### Імпорт

- Організуйте імпорт у три розділи, розділені порожнім рядком:

1. Імпорт стандартних бібліотек

2. Імпорт сторонніх бібліотек

3. Імпорт локальних проектів

- Кожен розділ має бути відсортований в алфавітному порядку

- Надавайте перевагу явному імпорту над загальним

```python
# Добре
import os
import sys
from typing import Dict, List, Optional

import aiohttp
import bs4
from fastapi import HTTPException

from scraping.utils import URLUtils
from utils.logging import setup_logger

# Погано
from scraping.utils import *
import aiohttp, bs4
import sys, os
```

## Структура коду

### Організація модулів

- Кожен модуль повинен мати єдину, чітко визначену відповідальність
- Використовуйте пакети для організації пов'язаних модулів
- Створіть файл `__init__.py` для кожного пакета, чітко розкриваючи публічні API

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

### Класи та функції

- Дотримуйтесь принципу єдиної відповідальності (SRP)
- Обмежте розмір функції максимум 50 рядками
- Обмежте розмір класу максимум 300 рядками
- Використовуйте статичні методи або окремі функції для операцій, які не залежать від стану екземпляра

```python
# Добре
class DataProcessor:
def process_data(self, data):
cleaned_data = self._clean_data(data)
return self._transform_data(cleaned_data)

def _clean_data(self, data): 
# Логіка очищення
return cleaned_data

def _transform_data(self, data): 
# Логіка перетворення
return transformed_data

# Погано
class DataProcessor:
def process_data(self, data): 
# 200 рядків коду, що змішують очищення та перетворення
return result
```

### Статична типізація

- Використовуйте анотації типів для всіх функцій та методів
- Використовуйте модуль `typing` для складних типів
- Документуйте винятки, які можуть бути викликані

```python
from typing import Dict, List, Optional, Union, Any

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]:
"""
Отримує дані з вказаної URL-адреси.


Аргументи:
url: URL-адреса для запит 
тайм-аут: Тайм-аут у секундах 
Повертає: 
Словник, що містить отримані дані 
Викликає: 
HTTPException: Якщо запит не вдається 
""" 
# Реалізація 
``` 

## Документація 

### Рядки документації 

- Використовуйте рядки документації для всіх модулів, класів, методів та функцій 
- Дотримуйтесь формату Google для рядків документації 
- Документуйте параметри, повернуті значення та винятки 

```python 
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]: 
""" 
Витягує всі посилання з HTML-сторінки разом з їхніми текстами та атрибутами. 
Аргументи: 
html: HTML-вміст сторінки 
base_url: Базова URL-адреса для розв'язання відносних посилань 
Повертає: 
Список словників, що містять інформацію про посилання 
Викликає: 
ValueError: Якщо HTML недійсний 
""" 
``` 

### Коментарі 

- Використовуйте коментарі, щоб пояснити "чому", а не "що" 
- Коментуйте складний або неінтуїтивний код 
- Уникайте застарілих або надлишкових коментарів 

```python 
# Добре 
# Використовуйте 5-секундне обмеження, щоб уникнути частих тайм-аутів на повільних сайтах 
timeout = 5 

# Погано 
# Встановіть тайм-аут 
timeout = 5 
``` 

## Тестування 

### Структура тесту 

- Використовуйте pytest для всіх тестів 
- Організуйте тести в структурі, що відображає вихідний код 
- Назвіть тестові файли префіксом `test_` 
- Назвіть тестові функції префіксом `test_` 

``` 
scraping/ 
scraper.py 
utils.py 
tests/ 
scraping/ 
test_scraper.py 
test_utils.py 
``` 

### Покриття тесту 

- Прагніть до щонайменше 80% покриття тестами
- Тестування всіх критичних шляхів коду
- Включення тестів на граничні випадки та помилки

```python
def test_scrape_url_success(): 
# Тестування номінального випадку

def test_scrape_url_timeout(): 
# Тестування випадку, коли URL-адреса не відповідає

def test_scrape_url_invalid_url(): 
# Тестування з недійсною URL-адресою
```

### Асинхронні тести

- Використовуйте `pytest-asyncio` для тестування асинхронного коду
- Використовуйте макети для мережевих викликів у тестах

```python
import pytest

@pytest.mark.asyncio
async def test_async_function(): 
result = await async_function() 
assert result == expected_result 
```

## Обробка помилок

### Винятки

- Створюйте власні винятки для помилок, специфічних для програми
- Використовуйте стандартні винятки Python, коли це доречно
- Документуйте всі винятки, які можуть бути викликані

```python 
class ScrapingException(Exception): 
"""Базовий виняток для помилок скрапінгу.""" 
pass 

class RateLimitException(ScrapingException): 
"""Виникає, коли досягнуто ліміту швидкості.""" 
pass 
``` 

### Обробка помилок

- Використовуйте блоки try/except для належної обробки помилок
- Уникайте загального перехоплення винятків
- Реєструйте помилки з достатнім контекстом для налагодження

```python 
try: 
result = await scraper.scrape_url(url) 
except RateLimitException: 
logger.warning(f"Досягнуто ліміту швидкості для {url}, повторна спроба після затримки") 
await asyncio.sleep(RATE_LIMIT_DELAY) 
result = await scraper.scrape_url(url) 
except ScrapingException as e: 
logger.error(f"Не вдалося зібрати {url}: {str(e)}") 
raise 
``` 

## Продуктивність 

### Асинхронний 

- Використовуйте `asyncio` для операцій з інтенсивним вводом/виводом 
- Використовуйте `aiohttp` для асинхронних HTTP-запитів 
- Обмежте кількість одночасних завдань, щоб уникнути перевантаження 

```python 
async def scrape_batch(urls: List[str], max_concurrent: int = 10): 
semaphore = asyncio.Semaphore(max_concurrent) 

async def _scrape_with_semaphore(url): 
async with semaphore: 
return await scrape_url(url) 

tasks = [_scrape_with_semaphore(url) for url in urls] 
return await asyncio.gather(*tasks, return_exceptions=True) 
``` 

### Оптимізація 

- Використовуйте відповідні структури даних для поширених операцій (словники для частих пошуків) 
- Уникайте непотрібних копій великих даних 
- Використовуйте генератори для обробки великих обсягів даних 
- Кешуйте ресурсоємні обчислення або запити 

```python 
# Використання генераторів для обробки великих наборів даних 
def process_large_dataset(file_path): 
with open(file_path, 'r') as f: 
for line in f: 
yield process_line(line) 
``` 

## Безпека 

### Перевірка вхідних даних 

- Завжди перевіряйте вхідні дані користувача 
- Використовуйте Pydantic для перевірки даних 
- Ніколи не довіряйте зовнішнім даним 

```python 
from pydantic import BaseModel, HttpUrl, validator 

class ScrapingRequest(BaseModel): 
url: HttpUrl 
depth: int = 1 

@validator('depth') 
def validate_depth(cls, v): 
if v < 1 або v > 3: 
raise ValueError('Глибина має бути між 1 та 3') 
return v 
``` 

### Керування секретами 

- Ніколи не включайте секрети (паролі, ключі API) у вихідний код 
- Використовуйте змінні середовища або захищені файли конфігурації 
- Використовуйте python-dotenv для завантаження змінних середовища 

```python 
import os 
from dotenv import load_dotenv 

load_dotenv() 

API_KEY = os.getenv("API_KEY") 
if not API_KEY: 
raise EnvironmentError("Змінна середовища API_KEY не встановлена") 
``` 

## Особливості парсингу 

### Повага до robots.txt 

- Завжди поважайте файли robots.txt 
- Реалізуйте затримки між запитами 
- Правильно ідентифікуйте себе за допомогою відповідного Користувацький агент

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def can_fetch(url: str, user_agent: str) -> bool:
"""Перевіряє, чи можна отримати URL-адресу відповідно до robots.txt."""
parser = RobotFileParser()
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt"
parser.set_url(robots_url)
parser.read()
return parser.can_fetch(user_agent, url)
```

### Керування сеансами

- Повторне використання HTTP-сеансів для покращення продуктивності
- Правильне закриття сеансів після використання
- Використання асинхронних контекстів для забезпечення закриття ресурсів

```python
async def scrape_with_session(): 
async with aiohttp.ClientSession() as session: 
# Використовувати сесію для всіх запитів 
result1 = await fetch_url(session, url1) 
result2 = await fetch_url(session, url2) 
# Сесія тут автоматично закривається 
``` 

### Розбір HTML 

- Використовуйте `lxml` як парсер для BeautifulSoup для кращої продуктивності 
- Використовуйте селектори CSS або XPath для навігації DOM 
- Обробляйте випадки, коли очікувані елементи не існують 

```python 
from bs4 import BeautifulSoup 

def extract_title(html: str) -> Optional[str]: 
soup = BeautifulSoup(html, "lxml") 
title_tag = soup.find("title") 
return title_tag.text if title_tag else None 
``` 

## Рекомендовані інструменти 

### Лінтинг та форматування 

- **Black**: Автоматичний форматувальник коду
- **isort**: Автоматичний сортувальник імпорту
- **flake8**: Лінтер для виявлення помилок та проблем зі стилем
- **mypy**: Статична перевірка типів

### Рекомендована конфігурація

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

файл `.flake8`:

```
[flake8]
max-line-length = 88 
extend-ignore = E203 
exclude = .git,__pycache__,build,dist 
``` 

### Інтеграція CI 

Налаштуйте ці інструменти у вашому конвеєрі CI для автоматичної перевірки коду: 

```yaml 
# Приклад для дій GitHub 
name: Python Linting 

on: [push, pull_request] 

jobs: 
lint: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v2 
- name: Налаштування Python 
uses: actions/setup-python@v2 
with: 
python-version: '3.8' 
- name: Встановлення залежностей 
run: | 
python -m pip install --upgrade pip 
pip install black isort flake8 mypy 
- name: Запустити linters 
run: | 
black --check . 
isort --check . 
flake8 . 
mypy . 
``` 

--- 

## Висновок 

Ці стандарти розроблені для забезпечення якості, зручності обслуговування та узгодженості коду Python у проекті WhytCard. Очікується, що всі учасники дотримуватимуться цих рекомендацій. Якщо у вас є запитання або пропозиції щодо покращення, будь ласка, поділіться ними з командою. 

--- 

Останнє оновлення: 15.01.2025