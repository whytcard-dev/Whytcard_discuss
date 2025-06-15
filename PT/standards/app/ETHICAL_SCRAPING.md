# Guia de Scraping Ético para WhytCard

## Introdução

O scraping web é a essência do projeto WhytCard, mas deve ser conduzido de forma ética, responsável e legal. Este guia define os princípios e práticas a serem seguidos para garantir que todas as atividades de scraping respeitem os direitos dos proprietários de sites, as leis aplicáveis e os padrões éticos.

## Índice

1. [Princípios Fundamentais](#princípios-fundamentais)
2. [Aspectos Legais](#aspectos-legais)
3. [Melhores Práticas Técnicas](#melhores-práticas-técnicas)
4. [Respeito aos Recursos](#respeito-aos-recursos)
5. [Proteção de Dados Pessoais](#proteção-de-dados-pessoais)
6. [Documentação e Transparência](#documentação-e-transparência)
7. [Casos Especiais](#casos-especiais)
8. [Lista de Verificação de Scraping Ético](#lista-de-verificação-de-scraping-ético)

## Princípios Fundamentais

### Filosofia do Scraping Ético

O scraping ético baseia-se em três princípios fundamentais:

1. **Respeito**: Respeite os proprietários de sites, seus termos de uso e seus recursos.
2. **Proporcionalidade**: Extraia apenas os dados necessários com o mínimo impacto
3. **Transparência**: Seja transparente sobre a identidade do bot e as intenções de scraping

### Valores da WhytCard em relação ao scraping

Como projeto WhytCard, nos comprometemos a:

- Nunca prejudicar os sites que scraping
- Respeitar rigorosamente as regras explícitas e implícitas dos sites
- Ser transparentes sobre nossa identidade e objetivos
- Usar os dados de forma responsável e de acordo com nossa missão
- Priorizar APIs oficiais quando disponíveis

## Aspectos Legais

### Marco Legal Geral

O scraping da web está sujeito a diversos marcos legais que variam de acordo com o país:

- **Direitos Autorais**: O conteúdo do site é geralmente protegido por direitos autorais
- **Termos de Uso**: Os Termos de Serviço do site podem proibir explicitamente o scraping
- **Proteção de Dados**: Leis como o GDPR na Europa protegem dados pessoais
- **Acesso Não Autorizado**: Algumas jurisdições criminalizam o acesso não autorizado a sistemas de computador

### Caso Notável Lei

Algumas decisões judiciais importantes sobre scraping:

- **hiQ Labs v. LinkedIn** (EUA): Estabeleceu que o scraping de dados públicos não é necessariamente ilegal
- **Ryanair v. PR Aviation** (UE): Confirmou que os termos de uso podem limitar contratualmente o scraping
- **QVC v. Resultly** (EUA): Enfatizou a importância de não sobrecarregar os servidores

### Conformidade Legal para WhytCard

Para se manter legal:

1. **Sempre verifique os Termos de Serviço** antes de fazer scraping de um site
2. **Respeite as tags "noindex" e "nofollow"** nas meta tags
3. **Nunca burle as medidas técnicas de proteção** (CAPTCHA, limitações de acesso)
4. **Documente suas práticas** para demonstrar boa-fé
5. **Consulte um advogado** em caso de dúvida sobre a legalidade de uma operação de scraping

## Melhores Práticas Técnicas

### Respeitando o robots.txt

O arquivo robots.txt define as regras de acesso para robôs:

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def is_allowed(url, user_agent="WhytCardBot/1.0"):
"""Verifica se a URL pode ser extraída de acordo com robots.txt."""
rp = RobotFileParser()
rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt")
rp.read()
return rp.can_fetch(user_agent, url)
```

### Identificação Adequada

Sempre use um User-Agent que identifique claramente seu bot:

```python
headers = {
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)', 
# Outros cabeçalhos... 
} 
``` 

### Atrasos de Requisição

Implemente atrasos razoáveis entre requisições: 

```python 
import time 
import random 

def polite_request(url, session, min_delay=1, max_delay=3): 
"""Faz uma requisição com um atraso educado entre as requisições.""" 
# Aguarda um atraso aleatório 
delay = random.uniform(min_delay, max_delay) 
time.sleep(delay) 

# Faz a requisição 
response = session.get(url, headers=headers) 
return response 
``` 

### Tratamento de Erros

Respeite os códigos de erro HTTP e adapte seu comportamento conforme:

```python
async def respectful_fetch(url, session):
"""Busca uma URL de forma respeitosa."""
try:
async with session.get(url, headers=headers) as response:
if response.status == 200:
return await response.text()
elif response.status == 429: # Muitas Requisições
# Aguarde mais tempo antes de tentar novamente
wait_time = int(response.headers.get('Retry-After', 60))
logger.info(f"Taxa limitada, aguardando {wait_time} segundos")
await asyncio.sleep(wait_time)
return await respectful_fetch(url, session)
elif response.status in (403, 404):
# Não tente novamente erros 403/404
logger.warning(f"Acesso negado ou não encontrado: {url}")
return None 
else: 
# Aguarde e tente novamente se houver outros erros
logger.warning(f"Erro {response.status} para {url}, tentando novamente em 5s")
await asyncio.sleep(5)
return await respectful_fetch(url, session)
except Exception as e: 
logger.error(f"Exceção ao buscar {url}: {str(e)}")
return None 
``` 

## Respeito aos Recursos

### Limitação de Taxa

Adapte sua taxa de solicitações ao tamanho e aos recursos do site de destino:

- **Sites comerciais de grande porte**: 1 solicitação a cada 1-3 segundos
- **Sites de médio porte**: 1 solicitação a cada 3-10 segundos
- **Sites pequenos**: 1 solicitação a cada 10-60 segundos ou mais

### Períodos de Scraping

Prefira períodos de baixo tráfego para operações intensivas:

- **Horários fora de pico**: Prefira noites ou fins de semana
- **Evite picos**: Não faça scraping durante períodos de pico conhecidos
- **Seja adaptável**: Reduza sua taxa se detectar lentidão

### Minimização de Impacto

Técnicas para reduzir o impacto nos servidores de destino:

1. **Cache inteligente**: Não recupere a mesma página várias vezes
2. **Seletividade**: Recupere apenas as páginas que você realmente precisa
3. **Compressão**: Solicite respostas compactadas para reduzir a largura de banda
4. **Paginação eficiente**: Respeite a estrutura de paginação do site

## Proteção de Dados Pessoais

### Identificação de Dados Pessoais

Esteja atento aos tipos de dados que você coleta:

- **Dados de identificação direta**: Nomes, e-mails, telefones, endereços
- **Dados de identificação indireta**: IDs de usuário, pseudônimos
- **Dados sensíveis**: Opiniões políticas, saúde, orientação sexual

### Princípios do GDPR a serem respeitados

Se você opera na Europa ou coleta dados de europeus:

1. **Minimização**: Colete apenas os dados estritamente necessários
2. **Finalidade**: Use os dados apenas para os fins pretendidos
3. **Retenção limitada**: Exclua os dados quando não forem mais necessários
4. **Segurança**: Proteja os dados coletados contra acesso não autorizado

### Anonimização de Dados

Técnicas para anonimizar dados pessoais:

```python
import hashlib
import re

def anonymize_email(email):
"""Anonimiza um endereço de e-mail."""
if not email:
return None

# Faça um hash do endereço de e-mail
hash = hashlib.sha256(email.encode()).hexdigest()[:10]
domain = email.split('@')[-1] 

return f"anon_{hashed}@{domain}" 

def anonymize_phone(phone): 
"""Torna um número de telefone anônimo.""" 
if not phone: 
return None 

# Manter apenas dígitos 
digits = re.sub(r'\D', '', phone) 

# Mascarar todos os dígitos, exceto os 2 últimos 
if len(digits) > 2: 
return "X" * (len(digits) - 2) + digits[-2:] 
return "X" * len(digits) 
``` 

## Documentação e Transparência 

### Documentando Atividades de Scraping 

Sempre documente suas atividades de scraping: 

- **Objetivo**: Por que esses dados estão sendo coletados? 
- **Método**: Como eles estão sendo coletados?
- **Armazenamento**: Onde e como é armazenado?
- **Uso**: Como será usado?
- **Exclusão**: Quando será excluído?

### Contato e Opt-out

Sempre forneça uma forma de contato:

1. **Página de informações**: Crie uma página dedicada explicando seu bot (por exemplo, whytcard.com/bot)
2. **E-mail de contato**: Forneça um endereço de e-mail no seu Agente do Usuário
3. **Mecanismo de Opt-out**: Permita que sites solicitem exclusão

### Registro de Atividades

Mantenha registros detalhados de suas atividades de scraping:

```python
import logging
from datetime import datetime

# Configuração do Logger
logging.basicConfig( 
filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log", 
level=logging.INFO, 
format='%(asctime)s - %(levelname)s - %(message)s' 
) 

def log_scraping_activity(url, success, data_points=0):
"""Registra uma atividade de scraping."""
logging.info(f"URL: {url}, Success: {success}, Data points: {data_points}")
```

## Casos Especiais

### API vs Scraping

Ordem de prioridade para coleta de dados:

1. **APIs oficiais**: Sempre priorize APIs oficiais quando existirem
2. **Feeds de dados públicos**: Use feeds RSS, XML ou JSON, se disponíveis
3. **Scraping**: Use scraping somente como último recurso

### Sites com Autenticação

Para sites que exigem autenticação:

- **Autorização explícita**: Obtenha autorização por escrito do site
- **Respeito aos Termos de Serviço**: Garanta que os Termos de Serviço permitam o uso automatizado
- **Limitações**: Respeite rigorosamente as limitações de uso

### Dinâmico Conteúdo (JavaScript)

Para sites que usam muito JavaScript:

```python
from playwright.async_api import async_playwright

async def scrape_dynamic_content(url):
""Extrair conteúdo gerado por JavaScript."""
async with async_playwright() as p:
browser = await p.chromium.launch(headless=True)
page = await browser.new_page()

# Configurar Agente do Usuário
await page.set_extra_http_headers({ 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot)' 
})

# Carregar a página e aguardar a rede ficar ociosa
await page.goto(url)
await page.wait_for_load_state('networkidle')

# Extrair conteúdo
content = await page.content()

await browser.close()
return content
```

## Lista de Verificação de Scraping Ético

Antes de cada projeto de scraping, verifique os seguintes pontos:

### Preparação
- [ ] Verifique os Termos de Serviço do site de destino
- [ ] Verifique o arquivo robots.txt
- [ ] Procure por API ou alternativas ao scraping
- [ ] Definição clara dos dados necessários
- [ ] Documentação da finalidade do scraping

### Configuração Técnica
- [ ] Agente de Usuário Identificável e Transparente
- [ ] Mecanismo de Limitação de Taxa
- [ ] Sistema de cache para evitar solicitações redundantes
- [ ] Tratamento adequado de erros e códigos HTTP
- [ ] Registro de Atividades

### Execução
- [ ] Monitoramento do desempenho do site de destino
- [ ] Ajuste dinâmico de taxa, se necessário
- [ ] Respeito para indicações do servidor (429, Tentar Novamente Após)
- [ ] Parada imediata se um problema for detectado

### Pós-processamento
- [ ] Anonimização de dados pessoais
- [ ] Armazenamento seguro de dados
- [ ] Retenção por tempo limitado
- [ ] Documentação dos dados coletados

## Conclusão

A raspagem ética é um equilíbrio entre o acesso aos dados e o respeito aos direitos e recursos dos proprietários de sites. Seguindo esses princípios e práticas, o projeto WhytCard pode coletar os dados necessários, mantendo uma abordagem responsável e respeitosa.

Lembre-se de que a ética da raspagem não é apenas uma questão de conformidade legal, mas também de responsabilidade para com o ecossistema da web como um todo. A raspagem respeitosa contribui para uma web mais aberta e sustentável para todos.

---

Última atualização: 15/01/2025