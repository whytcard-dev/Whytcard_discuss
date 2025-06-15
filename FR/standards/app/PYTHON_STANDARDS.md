# Normes Python pour WhytCard

## Introduction

Ce document définit les normes et les bonnes pratiques à suivre pour le développement Python dans le projet WhytCard. Ces règles visent à garantir un code cohérent, maintenable et de haute qualité dans l'ensemble de la base de code.

## Table des matières 

1. [Conventions de style](#style-conventions) 
2. [Structure du code](#code-structure) 
3. [Documentation](#documentation) 
4. [Tests](#testing) 
5. [Gestion des erreurs](#error-handling) 
6. [Performances](#performance) 
7. [Sécurité](#security) 
8. [Spécificités du scraping](#scraping-specifics) 
9. [Outils recommandés](#recommended-tools) 

## Conventions de style

### PEP 8 

Nous suivons scrupuleusement le [PEP 8](https://www.python.org/dev/peps/pep-0008/), le guide de style officiel de Python, avec quelques adaptations spécifiques pour WhytCard.

### Indentation et formatage

- Utilisez **4 espaces** pour l'indentation (pas de tabulations)
- Limitez toutes les lignes à un **maximum de 88 caractères** (norme noire)
- Utilisez des lignes vides pour séparer les fonctions et les classes, ainsi que les gros blocs de code au sein des fonctions
- Utilisez des espaces autour des opérateurs et après les virgules

```python
# Bon
def calculate_total(price, quantity=1): 
total = price * quantity 
return total

# Mauvais
def calculate_total(price, quantity = 1): 
total=price*quantity 
return total
```

### Conventions de nommage

- **Modules et packages** : Noms courts en minuscules, sans traits de soulignement (`scraper.py`, `utils.py`)
- **Classes** : CamelCase (`ScrapingConfig`, `DataProcessor`)
- **Fonctions et variables** : snake_case (`extract_data()`, `user_agent`) 
- **Constantes** : MAJUSCULES (`MAX_RETRIES`, `DEFAULT_TIMEOUT`) 
- **Variables « privées »** : Préfixées par un trait de soulignement (`_internal_cache`) 
- **Noms descriptifs** : Privilégier la clarté à la concision 

```python 
# Bonne 
classe UserDataProcessor : 
def __init__(self): 
self.MAX_BATCH_SIZE = 100 
self._temp_storage = {} 

def process_user_data(self, user_data): 
pass 

# Mauvaise 
classe Processor : 
def __init__(self): 
self.max = 100 
self.temp = {} 

def process(self, d): 
pass
``` 

### Imports

- Organisez les importations en trois sections séparées par une ligne vide : 
1. Imports de bibliothèques standard
2. Imports de bibliothèques tierces
3. Imports de projets locaux
- Chaque section doit être triée par ordre alphabétique
- Privilégiez les importations explicites aux importations génériques

```python
# Bon
import os
import sys
from typing import Dict, List, Optional

import aiohttp
import bs4
from fastapi import HTTPException

from scraping.utils import URLUtils
from utils.logging import setup_logger

# Mauvais
from scraping.utils import *
import aiohttp, bs4
import sys, os
``` 

## Structure du code

### Organisation des modules

- Chaque module doit avoir une responsabilité unique et bien définie
- Utilisez des packages pour organiser les éléments connexes Modules
- Créez un fichier `__init__.py` pour chaque package, exposant clairement l'API publique.

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

### Classes et fonctions

- Respectez le principe de responsabilité unique (SRP)
- Limitez la taille des fonctions à 50 lignes maximum
- Limitez la taille des classes à 300 lignes maximum
- Utilisez des méthodes statiques ou des fonctions autonomes pour les opérations indépendantes de l'état de l'instance.

```python
# Good
class DataProcessor: 
def process_data(self, data): 
clean_data = self._clean_data(data) 
return self._transform_data(cleaned_data) 

def _clean_data(self, data): 
# Logique de nettoyage 
return cleaned_data 

def _transform_data(self, data): 
# Logique de transformation 
return transformed_data 

# Mauvaise 
class DataProcessor: 
def process_data(self, data): 
# 200 lignes de code mélangeant nettoyage et transformation 
return result 
``` 

### Typage statique 

- Utiliser des annotations de type pour toutes les fonctions et méthodes 
- Utiliser le module `typing` pour les types complexes 
- Documenter les exceptions qui peuvent être levées 

```python 
from typing import Dict, List, Optional, Union, Any 

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, [Any]: 
""" 
Récupère les données de l'URL spécifiée. 

Arguments : 
url : URL à interroger 
timeout : Délai d'expiration en secondes 

Renvoie : 
Dictionnaire contenant les données récupérées 

Génère : 
HTTPException : Si la requête échoue 
""" 
# Implémentation 
``` 

## Documentation 

### Docstrings 

- Utiliser des docstrings pour tous les modules, classes, méthodes et fonctions 
- Suivre le format Google pour les docstrings 
- Documenter les paramètres, les valeurs de retour et les exceptions 

```python 
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]: 
""" 
Extrait tous les liens d'une page HTML avec leurs textes et attributs. 

Arguments : 
html : Contenu HTML de la page 
base_url : URL de base pour résoudre les liens relatifs 

Renvoie : 
Liste des dictionnaires contenant les informations de lien 

Génère : 
ValueError : Si le code HTML est invalide 
""" 
``` 

### Commentaires 

- Utilisez les commentaires pour expliquer le « pourquoi », et non le « quoi ». 
- Commentez le code complexe ou non intuitif 
- Évitez les commentaires obsolètes ou redondants 

```python 
# Bon 
# Utilisez une limite de 5 secondes pour éviter les dépassements de délai fréquents sur les sites lents 
timeout = 5 

# Mauvais 
# Définissez le délai d'expiration 
timeout = 5 
``` 

## Tests 

### Structure des tests 

- Utilisez pytest pour tous les tests 
- Organisez les tests dans une structure reflétant le code source 
- Nommez les fichiers de test avec le préfixe `test_` 
- Nommez les fonctions de test avec le préfixe `test_` 

``` 
scraping/ 
scraper.py 
utils.py 
tests/ 
scraping/ 
test_scraper.py 
test_utils.py 
``` 

### Couverture des tests 

- Visez une couverture de test d'au moins 80 % 
- Testez tous les chemins de code critiques 
- Incluez des tests pour les cas limites et les conditions d'erreur 

```python 
def test_scrape_url_success(): 
# Testez le cas nominal 

def test_scrape_url_timeout(): 
# Testez le cas où l'URL ne répond pas 

def test_scrape_url_invalid_url(): 
# Testez avec une URL invalide 
``` 

### Tests asynchrones 

- Utilisez `pytest-asyncio` pour tester le code asynchrone 
- Utilisez des simulations pour les appels réseau dans les tests 

```python 
import pytest 

@pytest.mark.asyncio 
async def test_async_function(): 
result = await async_function() 
assert result == expected_result 
``` 

## Gestion des erreurs 

### Exceptions 

- Créer des exceptions personnalisées pour les erreurs spécifiques à l'application 
- Utiliser les exceptions Python standard lorsque cela est approprié 
- Documenter toutes les exceptions susceptibles d'être levées 

```python 
class ScrapingException(Exception): 
"""Exception de base pour les erreurs de scraping.""" 
pass 

class RateLimitException(ScrapingException): 
"""Lancée lorsqu'une limite de débit est atteinte.""" 
pass 
``` 

### Gestion des erreurs 

- Utiliser les blocs try/except pour gérer les erreurs correctement 
- Éviter d'intercepter les exceptions de manière générique 
- Enregistrer les erreurs avec suffisamment de contexte pour le débogage 

```python 
try: 
result = await scraper.scrape_url(url) 
except RateLimitException: 
logger.warning(f"Limite de débit atteinte pour {url}, nouvelle tentative après un délai") 
await asyncio.sleep(RATE_LIMIT_DELAY) 
result = await scraper.scrape_url(url) 
except ScrapingException as e: 
logger.error(f"Échec du scraping de {url} : {str(e)}") 
raise 
``` 

## Performances 

### Asynchrone 

- Utiliser `asyncio` pour les opérations gourmandes en E/S 
- Utiliser `aiohttp` pour les requêtes HTTP asynchrones 
- Limiter le nombre de tâches simultanées pour éviter la surcharge 

```python 
async def scrape_batch(urls: List[str], max_concurrent: int = 10): 
semaphore = asyncio.Semaphore(max_concurrent)

async def _scrape_with_semaphore(url): 
async with semaphore: 
return await scrape_url(url) 

tasks = [_scrape_with_semaphore(url) for url in urls] 
return await asyncio.gather(*tasks, return_exceptions=True) 
``` 

### Optimisations 

- Utiliser des structures de données appropriées pour les opérations courantes (dictionnaires pour les recherches fréquentes) 
- Éviter les copies inutiles de données volumineuses 
- Utiliser des générateurs pour traiter de grandes quantités de données 
- Mettre en cache les calculs ou requêtes coûteux 

```python 
# Utiliser des générateurs pour traiter de grands ensembles de données 
def process_large_dataset(file_path): 
with open(file_path, 'r') as f: 
for line in f: 
yield process_line(line) 
``` 

## Sécurité 

### Validation des entrées 

- Toujours valider les entrées utilisateur 
- Utiliser Pydantic pour la validation des données 
- Ne jamais faire confiance aux données externes 

```python 
from pydantic import BaseModel, HttpUrl, validator 

class ScrapingRequest(BaseModel): 
url: HttpUrl 
depth: int = 1 

@validator('depth') 
def validate_depth(cls, v): 
if v < 1 or v > 3: 
raise ValueError('Depth must be between 1 and 3') 
return v 
``` 

### Gestion des secrets 

- Ne jamais inclure de secrets (mots de passe, clés API) dans le code source 
- Utiliser des variables d'environnement ou des fichiers de configuration sécurisés 
- Utiliser python-dotenv pour charger les variables d'environnement 

```python 
import os
from dotenv import load_dotenv 

load_dotenv() 

API_KEY = os.getenv("API_KEY") 
if not API_KEY: 
raise EnvironmentError("API_KEY environment variable is not set") 
``` 

## Spécificités du scraping

### Respect du fichier robots.txt 

- Toujours respecter les fichiers robots.txt 
- Implémenter des délais entre les requêtes 
- S'identifier correctement avec un User-Agent approprié 

```python 
from urllib.robotparser import RobotFileParser 
from urllib.parse import urlparse 

def can_fetch(url: str, user_agent: str) -> bool: 
"""Vérifie si l'URL peut être récupérée conformément au fichier robots.txt.""" 
parser = RobotFileParser() 
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt" 
parser.set_url(robots_url) 
parser.read() 
return parser.can_fetch(user_agent, url) 
``` 

### Gestion des sessions 

- Réutilisation des sessions HTTP pour améliorer les performances 
- Fermeture correcte des sessions après utilisation 
- Utilisation de contextes asynchrones pour garantir la fermeture des ressources 

```python 
async def scrape_with_session(): 
async with aiohttp.ClientSession() as session: 
# Utiliser la session pour toutes les requêtes 
result1 = await fetch_url(session, url1) 
result2 = await fetch_url(session, url2) 
# La session est automatiquement fermée ici 
``` 

### Analyse HTML 

- Utilisation `lxml` comme analyseur pour BeautifulSoup pour de meilleures performances
- Utiliser des sélecteurs CSS ou XPath pour la navigation DOM
- Gérer les cas où les éléments attendus n'existent pas

```python 
from bs4 import BeautifulSoup 

def extract_title(html: str) -> Optional[str]: 
soup = BeautifulSoup(html, "lxml") 
title_tag = soup.find("title") 
return title_tag.text if title_tag else None 
``` 

## Outils recommandés

### Linting et formatage

- **Black** : Formateur de code automatique
- **isort** : Trieur d'importation automatique
- **flake8** : Linter pour détecter les erreurs et les problèmes de style
- **mypy** : Vérification de type statique

### Configuration recommandée

Fichier `pyproject.toml` : 

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

Fichier `.flake8` : 

``` 
[flake8] 
max-line-length = 88 
extend-ignore = E203 
exclude = .git,__pycache__,build,dist 
``` 

### Intégration CI

Configurez ces outils dans votre pipeline CI pour vérifier automatiquement le code : 

```yaml 
# Exemple pour les actions GitHub 
nom : Python Linting

on: [push, pull_request]

jobs: 
lint: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v2 
- name: Configurer Python 
uses: actions/setup-python@v2 
with: 
python-version: '3.8' 
- name: Installer les dépendances 
run: | 
python -m pip install --upgrade pip 
pip install black isort flake8 mypy 
- name: Exécuter les linters 
run: | 
black --check . 
isort --check . 
flake8 . 
mypy . 
``` 

--- 

## Conclusion

Ces normes sont conçues pour garantir la qualité, la maintenabilité et la cohérence du code Python du projet WhytCard. Tous les contributeurs sont tenus de les suivre. Si vous avez des questions ou des suggestions d'amélioration, n'hésitez pas à les partager avec l'équipe.

---

Dernière mise à jour : 15/01/2025