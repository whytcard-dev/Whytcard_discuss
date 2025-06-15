# Padrões Python para WhytCard

## Introdução

Este documento define os padrões e as melhores práticas a serem seguidos para o desenvolvimento em Python no projeto WhytCard. Essas regras visam garantir um código consistente, sustentável e de alta qualidade em toda a base de código.

## Índice

1. [Convenções de Estilo](#convenções-de-estilo)
2. [Estrutura do Código](#estrutura-do-código)
3. [Documentação](#documentação)
4. [Testes](#testes)
5. [Tratamento de Erros](#tratamento-de-erros)
6. [Desempenho](#desempenho)
7. [Segurança](#segurança)
8. [Especificações de Scraping](#especificações-de-scraping)
9. [Ferramentas Recomendadas](#ferramentas-recomendadas)

## Convenções de Estilo

### PEP 8

Seguimos rigorosamente o [PEP 8](https://www.python.org/dev/peps/pep-0008/), o guia de estilo oficial do Python, com algumas adaptações específicas para o WhytCard.

### Recuo e Formatação

- Use **4 espaços** para recuo (sem tabulações)
- Limite todas as linhas a um **máximo de 88 caracteres** (padrão Black)
- Use linhas em branco para separar funções e classes, bem como grandes blocos de código dentro de funções
- Use espaços ao redor dos operadores e após vírgulas

```python
# Bom
def calculate_total(price, quantity=1):
total = price * quantity
return total

# Ruim
def calculate_total(price,quantity = 1):
total=price*quantity
return total
```

### Convenções de Nomenclatura

- **Módulos e pacotes**: Nomes curtos, em letras minúsculas, sem sublinhados (`scraper.py`, `utils.py`)
- **Classes**: CamelCase (`ScrapingConfig`, `DataProcessor`)
- **Funções e Variáveis**: snake_case (`extract_data()`, `user_agent`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **Variáveis "privadas"**: Prefixadas com um sublinhado (`_internal_cache`)
- **Nomes descritivos**: Priorize a clareza em vez da brevidade

```python
# Boa
classe UserDataProcessor:

def __init__(self):
self.MAX_BATCH_SIZE = 100
self._temp_storage = {}

def process_user_data(self, user_data):
pass

# Ruim
classe Processor:

def __init__(self):
self.max = 100
self.temp = {}

def process(self, d):
pass
```

### Importações

- Organize as importações em três seções separadas por uma linha em branco:
1. Importações de bibliotecas padrão
2. Importações de bibliotecas de terceiros
3. Importações de projetos locais
- Cada seção deve ser classificada em ordem alfabética
- Prefira importações explícitas a importações genéricas

```python
# Bom
import os
import sys
from typing import Dict, List, Optional

import aiohttp
import bs4
from fastapi import HTTPException

from scraping.utils import URLUtils
from utils.logging import setup_logger

# Ruim
from scraping.utils import *
import aiohttp, bs4
import sys, os
```

## Estrutura do Código

### Organização do Módulo

- Cada módulo deve ter uma responsabilidade única e bem definida
- Uso Pacotes para organizar módulos relacionados
- Crie um arquivo `__init__.py` para cada pacote, expondo claramente a API pública

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

### Classes e Funções

- Siga o Princípio da Responsabilidade Única (SRP)
- Limite o tamanho da função a um máximo de 50 linhas
- Limite o tamanho da classe a um máximo de 300 linhas
- Use métodos estáticos ou funções autônomas para operações que não dependem do estado da instância

```python
# Bom
classe DataProcessor:
def process_data(self, data):
cleaned_data = self._clean_data(data)
return self._transform_data(cleaned_data)

def _clean_data(self, data):
# Lógica de limpeza
return cleaned_data

def _transform_data(self, data):
# Lógica de transformação
return transformed_data

# Ruim
classe DataProcessor:
def process_data(self, data):
# 200 linhas de código misturando limpeza e transformação
return result
```

### Digitação Estática

- Use anotações de tipo para todas as funções e métodos
- Use o módulo `typing` para tipos complexos
- Documente exceções que possam ser geradas

```python
from typing import Dict, List, Optional, Union, Any

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]: 
""" 
Busca dados da URL especificada.

Args: 
url: A URL a ser consultada 
timeout: Tempo limite em segundos 

Retorna: 
Dicionário contendo os dados recuperados 

Leva: 
HTTPException: Se a solicitação falhar 
""" 
# Implementação 
``` 

## Documentação 

### Docstrings 

- Use docstrings para todos os módulos, classes, métodos e funções 
- Siga o formato do Google para docstrings 
- Documente parâmetros, valores de retorno e exceções 

```python 
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]: 
""" 
Extrai todos os links de uma página HTML com seus textos e atributos.

Argumentos:
html: conteúdo HTML da página
base_url: URL base para resolver links relativos

Retorna:
Lista de dicionários contendo informações de links

Retorna:
ValueError: se o HTML for inválido
""" 
``` 

### Comentários

- Use comentários para explicar o "porquê", não o "o quê"
- Comente códigos complexos ou não intuitivos
- Evite comentários desatualizados ou redundantes

```python
# Bom
# Use um limite de 5 segundos para evitar timeouts frequentes em sites lentos
timeout = 5

# Ruim
# Defina o timeout
timeout = 5
``` 

## Testes

### Estrutura de Teste

- Use pytest para todos os testes
- Organize os testes em uma estrutura que espelhe o código-fonte
- Nomeie os arquivos de teste com o prefixo `test_`
- Nomeie as funções de teste com o prefixo `test_` prefixo

``` 
scraping/ 
scraper.py 
utils.py 
tests/ 
scraping/ 
test_scraper.py 
test_utils.py 
``` 

### Cobertura de Teste

- Busque pelo menos 80% de cobertura de teste
- Teste todos os caminhos críticos de código
- Inclua testes para casos extremos e condições de erro

```python
def test_scrape_url_success(): 
# Teste o caso nominal

def test_scrape_url_timeout(): 
# Teste o caso em que a URL não responde

def test_scrape_url_invalid_url(): 
# Teste com uma URL inválida
``` 

### Testes Assíncronos

- Use `pytest-asyncio` para testar código assíncrono
- Use simulações para chamadas de rede em testes

```python
import pytest

@pytest.mark.asyncio
async def test_async_function():
result = await async_function()
assert result == expected_result
```

## Tratamento de Erros

### Exceções

- Crie exceções personalizadas para erros específicos da aplicação
- Use exceções padrão do Python quando apropriado
- Documente todas as exceções que podem ser geradas

```python
class ScrapingException(Exception):
"""Exceção base para erros de scraping."""
pass

class RateLimitException(ScrapingException):
"""Gerado quando um limite de taxa é atingido."""
pass
```

### Tratamento de Erros

- Use blocos try/except para tratar erros adequadamente
- Evite capturar exceções genericamente
- Registre erros com contexto suficiente para depuração

```python
try:
result = await scraper.scrape_url(url)
except RateLimitException:
logger.warning(f"Limite de taxa atingido para {url}, tentando novamente após atraso")
await asyncio.sleep(RATE_LIMIT_DELAY)
result = await scraper.scrape_url(url)
except ScrapingException as e:
logger.error(f"Falha ao extrair {url}: {str(e)}")
raise
```

## Desempenho

### Assíncrono

- Use `asyncio` para operações com uso intensivo de E/S
- Use `aiohttp` para solicitações HTTP assíncronas
- Limite o número de tarefas simultâneas para evitar sobrecarga

```python
async def scrape_batch(urls: List[str], max_concurrent: int = 10):
semáforo = asyncio.Semaphore(max_concurrent)

assíncrono def _scrape_with_semaphore(url):
async with semáforo:
return await scrape_url(url)

tasks = [_scrape_with_semaphore(url) for url in urls]
return await asyncio.gather(*tasks, return_exceptions=True)
```

### Otimizações

- Use estruturas de dados apropriadas para operações comuns (dicionários para consultas frequentes)
- Evite cópias desnecessárias de grandes volumes de dados
- Use geradores para processar grandes quantidades de dados
- Armazene em cache cálculos ou solicitações dispendiosas

```python
# Usando geradores para processar grandes conjuntos de dados
def process_large_dataset(file_path):
with open(file_path, 'r') as f:
for line in f:
yield process_line(line)
```

## Segurança

### Validação de Entrada

- Sempre valide a entrada do usuário
- Use Pydantic para validação de dados
- Nunca confie em dados externos

```python
from pydantic import BaseModel, HttpUrl, validator

class ScrapingRequest(BaseModel):
url: HttpUrl
depth: int = 1

@validator('depth')
def validate_depth(cls, v):
if v < 1 or v > 3:
raise ValueError('A profundidade deve estar entre 1 e 3')
return v
```

### Gerenciamento de Segredos

- Nunca inclua segredos (senhas, chaves de API) no código-fonte
- Use variáveis de ambiente ou arquivos de configuração seguros
- Use python-dotenv para carregar variáveis de ambiente

```python
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
if not API_KEY:
raise EnvironmentError("A variável de ambiente API_KEY não está definida")
```

## Detalhes do Scraping

### Respeitando o robots.txt

- Sempre respeite os arquivos robots.txt
- Implemente atrasos entre as requisições
- Identifique-se corretamente com um User-Agent apropriado

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def can_fetch(url: str, user_agent: str) -> bool:
""Verifica se a URL pode ser recuperada de acordo com o robots.txt."""
parser = RobotFileParser()
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt"
parser.set_url(robots_url)
parser.read()
return parser.can_fetch(user_agent, url)
```

### Gerenciamento de Sessão

- Reutilizar sessões HTTP para melhorar o desempenho
- Fechar sessões corretamente após o uso
- Usar contextos assíncronos para garantir o fechamento de recursos

```python
async def scrape_with_session():
async with aiohttp.ClientSession() as session:
# Usar a sessão para todas as solicitações
result1 = await fetch_url(session, url1)
result2 = await fetch_url(session, url2)
# A sessão é fechada automaticamente aqui
```

### Análise de HTML

- Use `lxml` como analisador para BeautifulSoup para melhor desempenho
- Use seletores CSS ou XPath para navegação DOM
- Lide com casos em que os elementos esperados não existem

```python
from bs4 import BeautifulSoup

def extract_title(html: str) -> Optional[str]:
soup = BeautifulSoup(html, "lxml")
title_tag = soup.find("title")
return title_tag.text if title_tag else None
```

## Ferramentas Recomendadas

### Linting e Formatação

- **Black**: Formatador de código automático
- **isort**: Classificador automático de importações
- **flake8**: Linter para detectar erros e problemas de estilo
- **mypy**: Verificação de tipo estático

### Configuração Recomendada

`pyproject.toml` arquivo:

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

`.flake8` arquivo:

```
[flake8]
max-line-length = 88
extend-ignore = E203
exclude = .git,__pycache__,build,dist
```

### Integração de CI

Configure estas ferramentas no seu pipeline de CI para verificar o código automaticamente:

```yaml
# Exemplo para Ações do GitHub
nome: Python Linting

em: [push, pull_request]

tarefas:
lint:
executa-em: ubuntu-latest
etapas:
- usa: actions/checkout@v2
- nome: Configurar Python
usa: actions/setup-python@v2
com:
python-version: '3.8'
- nome: Instalar dependências
executar: |
python -m pip install --upgrade pip
pip install black isort flake8 mypy
- nome: Executar linters
executar: |
black --check.
isort --check.
flake8.
mypy.
``` 

--- 

## Conclusão

Estes padrões foram elaborados para garantir a qualidade, a manutenibilidade e a consistência do código Python no projeto WhytCard. Espera-se que todos os colaboradores sigam estas diretrizes. Se você tiver dúvidas ou sugestões de melhoria, sinta-se à vontade para compartilhá-las com a equipe.

--- 

Última atualização: 15/01/2025