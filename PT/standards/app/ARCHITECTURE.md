# Arquitetura Global do WhytCard

## Introdução

Este documento apresenta a arquitetura global do projeto WhytCard, uma plataforma de treinamento de IA e web scraping de código aberto. A arquitetura foi projetada para ser modular, escalável e sustentável, permitindo a fácil adição de novos recursos e garantindo a estabilidade do sistema.

## Visão Geral

O WhytCard é organizado de acordo com uma arquitetura cliente-servidor, com uma separação clara entre o front-end e o back-end. Essa separação permite a evolução independente de ambos os componentes e facilita o trabalho em equipe.

``` 
┌──────────────────┐ ┌──────────────────┐ 
│ │ │ 
│ Frontend │◄────►│ Backend │ 
│ (Vue.js) │ │ (FastAPI) │ 
│ │ │ │ 
└─────────────────┘ └─────────────────┘ 
▲ 
│ 
▼ 
┌─────────────────┐ 
│ │ 
│ Raspagem e │ 
│ Pipeline de Dados │ 
│ │ 
└─────────────────┘ 
▲ 
│ 
▼ 
┌─────────────────┐ 
│ │ 
│ Armazenamento │ 
│ │ 
└─────────────────┘ 
``` 

## Principal Componentes

### 1. Frontend (Vue.js)

O frontend é desenvolvido com Vue.js e utiliza Tailwind CSS para estilização. Ele é responsável pela interface e experiência do usuário.

#### Principais Recursos

- **Framework**: Vue.js 3 com API de Composição
- **Estilo**: Tailwind CSS
- **Animações**: Framer Motion
- **Internacionalização**: i18next com detecção automática de idioma do navegador
- **Roteamento**: Vue Router
- **Gerenciamento de Estado**: Pinia

#### Estrutura

``` 
src/ 
├── components/ # Componentes Reutilizáveis
├── config/ # Configuração do Frontend
├── i18n/ # Arquivos de Tradução
├── router/ # Configuração de Rota
├── views/ # Páginas Principais
└── main.js # Ponto de Entrada
``` 

### 2. Backend (FastAPI)

O O backend é desenvolvido com FastAPI, um framework Python moderno e de alto desempenho para criação de APIs. Ele gerencia todas as operações do servidor, acesso a dados e lógica de negócios.

#### Principais Recursos

- **Framework**: FastAPI
- **Autenticação**: JWT
- **Validação**: Pydantic
- **Documentação da API**: Interface de Usuário Swagger Integrada

#### Estrutura

``` 
backend/ 
├── config/ # Configuração do backend
├── core/ # Lógica de negócios principal
│ ├── api/ # Endpoints da API
│ └── schemas/ # Esquemas Pydantic
├── models/ # Modelos de dados
├── utils/ # Utilitários
└── main.py # Ponto de entrada
``` 

### 3. Scraping e Pipeline de Dados

Este módulo é responsável por coletar dados de fontes da web e transformá-los para treinamento de modelos de IA.

#### Principais Recursos

- **Scraping**: Sistema assíncrono com aiohttp e BeautifulSoup
- **Orquestração**: Gerenciamento de tarefas e prioridades
- **Transformação**: Limpeza e normalização de dados
- **Cache**: Sistema de cache para evitar solicitações redundantes

#### Estrutura

``` 
backend/ 
├── scraping/ 
│ ├── scrapers/ # Implementações específicas para diferentes fontes
│ ├── utils/ # Utilitários de scraping
│ ├── orchestrator.py # Orquestrador de tarefas
│ └── cache.py # Sistema de cache
└── datasets/ # Dados coletados e transformados
``` 

### 4. Armazenamento

O sistema de armazenamento gerencia a persistência e o acesso aos dados.

#### Opções de Armazenamento

- **Banco de Dados**: PostgreSQL para dados estruturados
- **Armazenamento de Arquivos**: Sistema de Arquivos Local ou compatível com S3 para dados grandes
- **Cache**: Redis para cache distribuído

## Fluxo de Dados

### 1. Coleta de Dados

``` 
┌─────────────┐ ┌──────────────┐ ┌───────────────┐ 
│ │ │ │ │ │ 
│ Web │────►│ Scrapers │────►│ Cache │ 
│ Fontes │ │ │ │ │ 
└─────────────┘ └─────────────┘ └─────────────┘ 
│ 
▼ 
┌─────────────┐ ┌──────────────┐ 
│ │ │ │ 
│ Processadores │────►│ Armazenamento │ 
│ │ │ 
└─────────────┘ └─────────────┘ 
``` 

1. Os scrapers coletam dados de fontes da web 
2. Os dados são armazenados em cache para evitar solicitações redundantes 
3. Os processadores limpam e transformam os dados 
4. Os dados transformados são armazenados para uso posterior 

### 2. Treinamento do Modelo 

``` 
┌──────────────┐ ┌──────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ 
│ Conjuntos de dados │────►│ Pré-processador│────►│ Treinamento │ 
│ │ │ │ │ 
└─────────────┘ └─────────────┘ └──────────────┘ 
│ 
▼ 
┌─────────────┐ 
│ │ 
│ Modelos │ 
│ │ 
└─────────────┘ 
``` 

1. Conjuntos de dados são Extraído do armazenamento
2. Os dados são pré-processados para treinamento
3. Os modelos são treinados com base nos dados pré-processados
4. Os modelos treinados são salvos

### 3. Uso do Modelo

``` 
┌─────────────┐ ┌─────────────┐ ┌──────────────┐ 
│ │ │ │ │ 
│ API │────►│ Modelos │────►│ Resposta │ 
│ Solicitação │ │ │ │ │ 
└─────────────┘ └────────────┘ └─────────────┘ 
``` 

1. Uma solicitação de API é recebida 
2. Modelos apropriados são usados para processar a solicitação
3. Uma resposta é gerada e retornada

## Comunicação entre Componentes

### API REST

A comunicação entre o frontend e o backend ocorre principalmente por meio de uma API REST. Os endpoints são organizados e documentados logicamente com a interface de usuário do Swagger.

### WebSockets

Para recursos que exigem atualizações em tempo real (como o rastreamento de tarefas de scraping), WebSockets são usados para permitir a comunicação bidirecional.

### Fila de Mensagens

Para tarefas assíncronas e de longa duração, uma fila de mensagens (como RabbitMQ ou Redis Pub/Sub) é usada para desacoplar componentes e garantir a confiabilidade.

## Implantação

### Opções de Implantação

O WhytCard pode ser implantado de várias maneiras:

1. **Aplicativo desktop**: Usando o Tauri para criar um aplicativo desktop multiplataforma
2. **Implantação em nuvem**: Implantação em serviços de nuvem como AWS, GCP ou Azure
3. **Auto-hospedagem**: Instalação em um servidor pessoal ou corporativo

### Arquitetura de Implantação

``` 
┌──────────────────┐ ┌──────────────────┐ 
│ │ │ │ 
│ Frontend │◄────►│ Gateway de API │ 
│ (Estático) │ │ │ 
└──────────────────┘ └──────────────────┘ 
▲ 
│ 
▼ 
┌──────────────────┐ 
│ │ 
│ API de Backend │ 
│ │ 
└─────────────────┘ 
▲ 
│ 
▼ 
┌────────────────────┐ ┌─────────────────┐ 
│ │ │ │ 
│ Banco de Dados │ │ Armazenamento de Arquivos │ 
│ │ │ │ 
└─────────────────┘ └─────────────────┘ 
``` 

## Segurança

### Princípios de Segurança

1. **Defesa em profundidade**: Múltiplas camadas de segurança
2. **Princípio do menor privilégio**: Acesso mínimo necessário
3. **Validação de entrada**: Todas as entradas do usuário são validadas
4. **Proteção de dados**: Criptografia de dados sensíveis

### Medidas de Segurança

- **Autenticação**: JWT com rotação de tokens
- **Autorização**: Controle de acesso baseado em funções
- **Proteção contra ataques comuns**: XSS, CSRF, injeção de SQL
- **Auditoria**: Registro de ações importantes

## Escalabilidade

A arquitetura foi projetada para ser escalável horizontal e verticalmente:

- **Microsserviços**: Os componentes podem ser implantados independentemente
- **Cache**: Uso de caches multinível
- **Balanceamento de carga**: Distribuição de tráfego entre múltiplas instâncias
- **Particionamento**: Separação de dados para melhorar o desempenho

## Monitoramento e Observabilidade

- **Registro**: Registro centralizado com ELK Stack ou equivalente
- **Métricas**: Coleta de métricas com Prometheus
- **Rastreamento**: Rastreamento de solicitações com OpenTelemetry
- **Alertas**: Alertas baseados em limites predefinidos

## Conclusão

A arquitetura do WhytCard foi projetada para ser robusta, escalável e sustentável. A separação clara de responsabilidades entre os diferentes componentes permite a evolução independente e facilita o trabalho em equipe. As escolhas tecnológicas foram feitas levando em consideração as necessidades atuais e futuras do projeto, bem como as melhores práticas do setor.

Esta arquitetura será revisada e atualizada regularmente para se adaptar a novas necessidades e desenvolvimentos tecnológicos.

---

Última atualização: 15/01/2025