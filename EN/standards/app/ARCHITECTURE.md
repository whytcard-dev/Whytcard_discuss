# Global Architecture of WhytCard

## Introduction

This document presents the global architecture of the WhytCard project, an open-source web scraping and AI training platform. The architecture is designed to be modular, scalable, and maintainable, allowing for easy addition of new features while ensuring system stability.

## Overview

WhytCard is organized according to a client-server architecture with a clear separation between the frontend and backend. This separation allows for independent evolution of both components and facilitates teamwork.

```
┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │
│     Frontend    │◄────►│     Backend     │
│    (Vue.js)     │      │   (FastAPI)     │
│                 │      │                 │
└─────────────────┘      └─────────────────┘
                                 ▲
                                 │
                                 ▼
                         ┌─────────────────┐
                         │                 │
                         │   Scraping &    │
                         │  Data Pipeline  │
                         │                 │
                         └─────────────────┘
                                 ▲
                                 │
                                 ▼
                         ┌─────────────────┐
                         │                 │
                         │    Storage      │
                         │                 │
                         └─────────────────┘
```

## Main Components

### 1. Frontend (Vue.js)

The frontend is developed with Vue.js and uses Tailwind CSS for styling. It is responsible for the user interface and user experience.

#### Key Features

- **Framework**: Vue.js 3 with Composition API
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Internationalization**: i18next with automatic browser language detection
- **Routing**: Vue Router
- **State Management**: Pinia

#### Structure

```
src/
├── components/       # Reusable components
├── config/           # Frontend configuration
├── i18n/             # Translation files
├── router/           # Route configuration
├── views/            # Main pages
└── main.js           # Entry point
```

### 2. Backend (FastAPI)

The backend is developed with FastAPI, a modern and high-performance Python framework for creating APIs. It handles all server operations, data access, and business logic.

#### Key Features

- **Framework**: FastAPI
- **Authentication**: JWT
- **Validation**: Pydantic
- **API Documentation**: Integrated Swagger UI

#### Structure

```
backend/
├── config/           # Backend configuration
├── core/             # Main business logic
│   ├── api/          # API endpoints
│   └── schemas/      # Pydantic schemas
├── models/           # Data models
├── utils/            # Utilities
└── main.py           # Entry point
```

### 3. Scraping & Data Pipeline

This module is responsible for collecting data from web sources and transforming it for AI model training.

#### Key Features

- **Scraping**: Asynchronous system with aiohttp and BeautifulSoup
- **Orchestration**: Task and priority management
- **Transformation**: Data cleaning and normalization
- **Cache**: Caching system to avoid redundant requests

#### Structure

```
backend/
├── scraping/
│   ├── scrapers/     # Specific implementations for different sources
│   ├── utils/        # Scraping utilities
│   ├── orchestrator.py # Task orchestrator
│   └── cache.py      # Caching system
└── datasets/         # Collected and transformed data
```

### 4. Storage

The storage system manages data persistence and access.

#### Storage Options

- **Database**: PostgreSQL for structured data
- **File storage**: Local file system or S3-compatible for large data
- **Cache**: Redis for distributed cache

## Data Flow

### 1. Data Collection

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│  Web        │────►│  Scrapers   │────►│   Cache     │
│  Sources    │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                          ▼
                   ┌─────────────┐     ┌─────────────┐
                   │             │     │             │
                   │ Processors  │────►│  Storage    │
                   │             │     │             │
                   └─────────────┘     └─────────────┘
```

1. Scrapers collect data from web sources
2. Data is cached to avoid redundant requests
3. Processors clean and transform the data
4. Transformed data is stored for later use

### 2. Model Training

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│  Datasets   │────►│ Preprocessor│────►│  Training   │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ▼
                                       ┌─────────────┐
                                       │             │
                                       │   Models    │
                                       │             │
                                       └─────────────┘
```

1. Datasets are extracted from storage
2. Data is preprocessed for training
3. Models are trained on the preprocessed data
4. Trained models are saved

### 3. Model Usage

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│   API       │────►│   Models    │────►│  Response   │
│  Request    │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
```

1. An API request is received
2. Appropriate models are used to process the request
3. A response is generated and returned

## Communication Between Components

### REST API

Communication between the frontend and backend is primarily through a REST API. Endpoints are logically organized and documented with Swagger UI.

### WebSockets

For features requiring real-time updates (such as tracking scraping tasks), WebSockets are used to enable bidirectional communication.

### Message Queue

For asynchronous and long-running tasks, a message queue (like RabbitMQ or Redis Pub/Sub) is used to decouple components and ensure reliability.

## Deployment

### Deployment Options

WhytCard can be deployed in several ways:

1. **Desktop application**: Using Tauri to create a cross-platform desktop application
2. **Cloud deployment**: Deployment on cloud services like AWS, GCP, or Azure
3. **Self-hosting**: Installation on a personal or company server

### Deployment Architecture

```
┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │
│    Frontend     │◄────►│   API Gateway   │
│    (Static)     │      │                 │
└─────────────────┘      └─────────────────┘
                                 ▲
                                 │
                                 ▼
                         ┌─────────────────┐
                         │                 │
                         │  Backend API    │
                         │                 │
                         └─────────────────┘
                                 ▲
                                 │
                                 ▼
              ┌─────────────────┐     ┌─────────────────┐
              │                 │     │                 │
              │  Database       │     │  File Storage   │
              │                 │     │                 │
              └─────────────────┘     └─────────────────┘
```

## Security

### Security Principles

1. **Defense in depth**: Multiple security layers
2. **Principle of least privilege**: Minimal necessary access
3. **Input validation**: All user inputs are validated
4. **Data protection**: Encryption of sensitive data

### Security Measures

- **Authentication**: JWT with token rotation
- **Authorization**: Role-based access control
- **Protection against common attacks**: XSS, CSRF, SQL injection
- **Audit**: Logging of important actions

## Scalability

The architecture is designed to be horizontally and vertically scalable:

- **Microservices**: Components can be deployed independently
- **Caching**: Use of multi-level caches
- **Load balancing**: Traffic distribution among multiple instances
- **Partitioning**: Data separation to improve performance

## Monitoring and Observability

- **Logging**: Centralized logging with ELK Stack or equivalent
- **Metrics**: Metrics collection with Prometheus
- **Tracing**: Request tracking with OpenTelemetry
- **Alerting**: Alerts based on predefined thresholds

## Conclusion

WhytCard's architecture is designed to be robust, scalable, and maintainable. The clear separation of responsibilities between different components allows for independent evolution and facilitates teamwork. Technology choices were made taking into account current and future project needs, as well as industry best practices.

This architecture will be regularly reviewed and updated to adapt to new needs and technological developments.

---

Last updated: 2025-01-15 