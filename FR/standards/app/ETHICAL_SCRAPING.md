# Guide de scraping éthique pour WhytCard

## Introduction

Le scraping web est au cœur du projet WhytCard, mais il doit être mené de manière éthique, responsable et légale. Ce guide définit les principes et les pratiques à suivre pour garantir que toutes les activités de scraping respectent les droits des propriétaires de sites web, les lois applicables et les normes éthiques.

## Table des matières 

1. [Principes fondamentaux](#principes-fondamentaux) 
2. [Aspects juridiques](#aspects-juridiques) 
3. [Bonnes pratiques techniques](#bonnes-pratiques-techniques) 
4. [Respect des ressources](#respect-des-ressources) 
5. [Protection des données personnelles](#protection-des-donnees-personnelles) 
6. [Documentation et transparence](#documentation-et-transparence) 
7. [Cas particuliers](#cas-particuliers) 
8. [Liste de contrôle éthique pour le scraping](#liste-de-contrôle-éthique) 

## Principes fondamentaux 

### Philosophie du scraping éthique 

Le scraping éthique repose sur trois principes fondamentaux :

1. **Respect** : Respecter les propriétaires de sites web, leurs conditions d'utilisation et leurs ressources.
2. **Proportionnalité** : Extraire uniquement les données nécessaires avec un impact minimal.
3. **Transparence** : Être transparent sur l’identité du robot et ses intentions de scraping.

### Valeurs de WhytCard concernant le scraping.

Au sein du projet WhytCard, nous nous engageons à :

- Ne jamais nuire aux sites web que nous scrapons.
- Respecter strictement les règles explicites et implicites des sites web.
- Être transparents sur notre identité et nos objectifs.
- Utiliser les données de manière responsable et conformément à notre mission.
- Privilégier les API officielles lorsqu’elles sont disponibles.

## Aspects juridiques

### Cadre juridique général

Le scraping web est soumis à plusieurs cadres juridiques qui varient selon les pays :

- **Droit d’auteur** : Le contenu des sites web est généralement protégé par le droit d’auteur.
- **Conditions d’utilisation** : Les conditions d’utilisation des sites web peuvent interdire explicitement le scraping.
- **Protection des données** : Des lois comme le RGPD en Europe protègent les données personnelles.
- **Accès non autorisé** : Certaines juridictions criminalisent l’accès non autorisé aux systèmes informatiques.

### Cas notable Droit

Quelques décisions de justice importantes concernant le scraping :

- **hiQ Labs c. LinkedIn** (États-Unis) : A établi que le scraping de données publiques n’est pas nécessairement illégal
- **Ryanair c. PR Aviation** (UE) : A confirmé que les conditions d’utilisation peuvent limiter contractuellement le scraping
- **QVC c. Resultly** (États-Unis) : A souligné l’importance de ne pas surcharger les serveurs

### Conformité juridique pour WhytCard

Pour rester dans la légalité :

1. **Consultez toujours les conditions d’utilisation** avant de scraper un site
2. **Respectez les balises « noindex » et « nofollow »** dans les métabalises
3. **Ne contournez jamais les mesures de protection techniques** (CAPTCHA, limitations d’accès)
4. **Documentez vos pratiques** pour démontrer votre bonne foi
5. **Consultez un avocat** en cas de doute sur la légalité d’une opération de scraping

## Bonnes pratiques techniques

### Respect du fichier robots.txt

Le fichier robots.txt définit les règles d’accès pour robots: 

```python 
from urllib.robotparser import RobotFileParser 
from urllib.parse import urlparse 

def is_allowed(url, user_agent="WhytCardBot/1.0"): 
"""Vérifie si l'URL peut être récupérée selon le fichier robots.txt.""" 
rp = RobotFileParser() 
rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt") 
rp.read() 
return rp.can_fetch(user_agent, url) 
``` 

### Identification correcte

Utilisez toujours un agent utilisateur qui identifie clairement votre bot : 

```python 
headers = { 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)', 
# Autres en-têtes... 
} 
``` 

### Délais de requêtes 

Implémentez des délais raisonnables entre les requêtes : 

```python 
import time 
import random 

def polite_request(url, session, min_delay=1, max_delay=3): 
"""Envoie une requête avec un délai court entre les requêtes.""" 
# Attendre un délai aléatoire
delay = random.uniform(min_delay, max_delay) 
time.sleep(delay) 

# Exécuter la requête
response = session.get(url, headers=headers) 
return response 
``` 

### Gestion des erreurs

Respectez les codes d'erreur HTTP et adaptez votre comportement en conséquence : 

```python 
async def respectueux_fetch(url, session): 
"""Récupère une URL de manière respectueuse.""" 
try: 
async with session.get(url, headers=headers) as response: 
if response.status == 200: 
return await response.text() 
elif response.status == 429: # Trop de requêtes 
# Attendre plus longtemps avant de réessayer 
wait_time = int(response.headers.get('Retry-After', 60)) 
logger.info(f"Débit limité, attente de {wait_time} secondes") 
await asyncio.sleep(wait_time) 
return await respectueux_fetch(url, session) 
elif response.status in (403, 404): 
# Ne pas réessayer Erreurs 403/404 
logger.warning(f"Accès refusé ou introuvable: {url}") 
return None 
else: 
# Attendre et réessayer pour d'autres erreurs 
logger.warning(f"Erreur {response.status} pour {url}, réessayer dans 5 s") 
await asyncio.sleep(5) 
return await respectful_fetch(url, session) 
except Exception as e: 
logger.error(f"Exception lors de la récupération de {url}: {str(e)}") 
return None 
``` 

## Respect des ressources 

### Limitation du débit 

Adaptez votre débit de requêtes à la taille et aux ressources du site cible : 

- **Grands sites commerciaux** : 1 requête toutes les 1 à 3 secondes 
- **Sites de taille moyenne** : 1 requête toutes les 3 à 10 secondes 
- **Petits sites** : 1 requête toutes les 10 à 60 secondes ou plus 

### Périodes de scraping 

Privilégier Périodes de faible trafic pour des opérations intensives :

- **Heures creuses** : Privilégiez les nuits ou les week-ends
- **Évitez les pics** : Ne récupérez pas de données pendant les périodes de pointe connues
- **Soyez adaptatif** : Réduisez votre débit si vous détectez des ralentissements

### Minimisation de l'impact

Techniques pour réduire l'impact sur les serveurs cibles :

1. **Mise en cache intelligente** : Ne récupérez pas la même page plusieurs fois
2. **Sélectivité** : Ne récupérez que les pages réellement nécessaires
3. **Compression** : Demandez des réponses compressées pour réduire la bande passante
4. **Pagination efficace** : Respectez la structure de pagination du site

## Protection des données personnelles

### Identification des données personnelles

Soyez vigilant quant aux types de données que vous collectez :

- **Données d'identification directes** : Noms, e-mails, téléphones, adresses
- **Données d'identification indirectes** : Identifiants utilisateurs, pseudonymes
- **Données sensibles** : Opinions politiques, santé, sexualité Orientation

### Principes du RGPD à respecter

Si vous opérez en Europe ou collectez des données auprès d'Européens :

1. **Minimisation** : Ne collectez que les données strictement nécessaires.
2. **Finalité** : N'utilisez les données qu'aux fins prévues.
3. **Conservation limitée** : Supprimez les données lorsqu'elles ne sont plus nécessaires.
4. **Sécurité** : Protégez les données collectées contre tout accès non autorisé.

### Anonymisation des données

Techniques d'anonymisation des données personnelles :

```python 
import hashlib 
import re 

def anonymize_email(email): 
"""Anonymise une adresse e-mail.""" 
if not email: 
return None 

# Hacher l'adresse e-mail
hashed = hashlib.sha256(email.encode()).hexdigest()[:10] 
domain = email.split('@')[-1] 

return f"anon_{hashed}@{domain}" 

def anonymize_phone(phone): 
"""Anonymise un numéro de téléphone.""" 
if not phone: 
return None 

# Conserver uniquement les chiffres 
digits = re.sub(r'\D', '', phone) 

# Masquer tous les chiffres sauf les 2 derniers 
if len(digits) > 2: 
return "X" * (len(digits) - 2) + digits[-2:] 
return "X" * len(digits) 
``` 

## Documentation et transparence 

### Documentation des activités de scraping 

Documentez toujours vos activités de scraping : 

- **Objectif** : Pourquoi ces données sont-elles collectées ? 
- **Méthode** : Comment sont-elles collectées ? 
- **Stockage** : Où et comment sont-elles stockées ?
- **Utilisation** : Comment sera-t-il utilisé ?

- **Suppression** : Quand sera-t-il supprimé ?

### Contact et désinscription

Fournissez toujours un moyen de vous contacter :

1. **Page d'informations** : Créez une page dédiée expliquant votre bot (par exemple, whytcard.com/bot)
2. **Adresse e-mail de contact** : Indiquez une adresse e-mail dans votre agent utilisateur
3. **Mécanisme de désinscription** : Autorisez les sites à demander leur exclusion

### Journalisation des activités

Gardez des journaux détaillés de vos activités de scraping :

```python 
import logging 
from datetime import datetime 

# Configuration de l'enregistreur
logging.basicConfig( 
filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log", 
level=logging.INFO, 
format='%(asctime)s - %(levelname)s - %(message)s' 
) 

def log_scraping_activity(url, success, data_points=0): 
"""Enregistre une activité de scraping.""" 
logging.info(f"URL: {url}, Success: {success}, Data points: {data_points}") 
``` 

## Cas particuliers 

### API vs Scraping 

Ordre de priorité pour la collecte de données : 

1. **API officielles** : Privilégiez toujours les API officielles lorsqu'elles existent.
2. **Flux de données publics** : Utilisez les flux RSS, XML ou JSON, si disponibles.
3. **Scraping** : N'utilisez le scraping qu'en dernier recours.

### Sites avec authentification

Pour les sites nécessitant une authentification : 

- **Autorisation explicite** : Obtenez une autorisation écrite du site.
- **Respect des conditions d'utilisation** : Assurez-vous que les conditions d'utilisation autorisent l'utilisation automatisée.
- **Limitations** : Respectez scrupuleusement les limitations d'utilisation.

### Contenu dynamique (JavaScript)

Pour les sites utilisant beaucoup de JavaScript : 

```python 
from playwright.async_api import async_playwright 

async def scrape_dynamic_content(url): 
"""Scrape le contenu généré par JavaScript.""" 
async with async_playwright() as p: 
browser = await p.chromium.launch(headless=True) 
page = await browser.new_page() 

# Configuration de l'agent utilisateur 
await page.set_extra_http_headers({ 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot)' 
}) 

# Charge la page et attend que le réseau soit inactif 
await page.goto(url) 
await page.wait_for_load_state('networkidle') 

# Extraire le contenu 
content = await page.content() 

await browser.close()

Contenu renvoyé
```

## Liste de contrôle pour le scraping éthique

Avant chaque projet de scraping, vérifiez les points suivants :

### Préparation
- [ ] Vérification des conditions d'utilisation du site cible
- [ ] Vérification du fichier robots.txt
- [ ] Recherche d'API ou d'alternatives au scraping
- [ ] Définition claire des données nécessaires
- [ ] Documentation de l'objectif du scraping

### Configuration technique
- [ ] Agent utilisateur identifiable et transparent
- [ ] Mécanisme de limitation du débit
- [ ] Système de cache pour éviter les requêtes redondantes
- [ ] Gestion appropriée des erreurs et des codes HTTP
- [ ] Journalisation des activités

### Exécution
- [ ] Suivi des performances du site cible
- [ ] Ajustement dynamique du débit si nécessaire
- [ ] Respect des indications du serveur (429, Retry-After)
- [ ] Arrêt immédiat en cas de problème Détecté

### Post-traitement
- [ ] Anonymisation des données personnelles
- [ ] Stockage sécurisé des données
- [ ] Conservation limitée dans le temps
- [ ] Documentation des données collectées

## Conclusion

Le scraping éthique est un équilibre entre l'accès aux données et le respect des droits et des ressources des propriétaires de sites web. En suivant ces principes et pratiques, le projet WhytCard peut collecter les données nécessaires tout en adoptant une approche responsable et respectueuse.

N'oubliez pas que l'éthique du scraping n'est pas seulement une question de conformité légale, mais aussi de responsabilité envers l'écosystème web dans son ensemble. Un scraping respectueux contribue à un web plus ouvert et durable pour tous.

--- 

Dernière mise à jour : 15/01/2025