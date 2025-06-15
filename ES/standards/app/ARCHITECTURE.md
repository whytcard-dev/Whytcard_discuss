# Arquitectura Global de WhytCard

## Introducción

Este documento presenta la arquitectura global del proyecto WhytCard, una plataforma de código abierto para el web scraping y el entrenamiento de IA. La arquitectura está diseñada para ser modular, escalable y fácil de mantener, lo que facilita la incorporación de nuevas funciones y garantiza la estabilidad del sistema.

## Resumen

WhytCard se organiza según una arquitectura cliente-servidor con una clara separación entre el frontend y el backend. Esta separación permite la evolución independiente de ambos componentes y facilita el trabajo en equipo.

``` 
┌─────────────────┐ ┌─────────────────┐ 
│ │ │ │ 
│ Interfaz │◄────►│ Backend │ 
│ (Vue.js) │ │ (FastAPI) │ 
│ │ │ │ 
└─────────────────┘ └─────────────────┘ 
▲ 
│ 
▼ 
┌──────────────────┐ 
│ │ 
│ Scraping & │ 
│ Data Pipeline │ 
│ │ 
└─────────────────┘ 
▲ 
│ 
▼ 
┌─────────────────┐ 
│ │ 
│ Almacenamiento │ 
│ │ 
└─────────────────┘ 
``` 

## Principal Componentes

### 1. Frontend (Vue.js)

El frontend está desarrollado con Vue.js y utiliza Tailwind CSS para el estilo. Es responsable de la interfaz y la experiencia de usuario.

#### Características principales

- **Framework**: Vue.js 3 con Composition API
- **Estilo**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Internacionalización**: i18next con detección automática del idioma del navegador
- **Enrutamiento**: Vue Router
- **Gestión de estados**: Pinia

#### Estructura

``` 
src/ 
├── component/ # Componentes reutilizables
├── config/ # Configuración del frontend
├── i18n/ # Archivos de traducción
├── router/ # Configuración de rutas
├── views/ # Páginas principales
└── main.js # Punto de entrada
``` 

### 2. Backend (FastAPI)

El backend Está desarrollado con FastAPI, un framework Python moderno y de alto rendimiento para la creación de API. Gestiona todas las operaciones del servidor, el acceso a los datos y la lógica de negocio. #### Características Clave

- **Framework**: FastAPI
- **Autenticación**: JWT
- **Validación**: Pydantic
- **Documentación de la API**: Interfaz Swagger integrada

#### Estructura

``` 
backend/ 
├── config/ # Configuración del backend 
├── core/ # Lógica de negocio principal 
│ ├── api/ # Puntos finales de la API 
│ └── schemas/ # Esquemas de Pydantic 
├── models/ # Modelos de datos 
├── utils/ # Utilidades 
└── main.py # Punto de entrada 
``` 

### 3. Scraping y Canalización de Datos

Este módulo se encarga de recopilar datos de la web Fuentes y su transformación para el entrenamiento de modelos de IA. #### Características Clave

- **Scraping**: Sistema asíncrono con aiohttp y BeautifulSoup
- **Orquestación**: Gestión de tareas y prioridades
- **Transformación**: Limpieza y normalización de datos
- **Caché**: Sistema de almacenamiento en caché para evitar solicitudes redundantes

#### Estructura

``` 
backend/ 
├── scraping/ 
│ ├── scrapers/ # Implementaciones específicas para diferentes fuentes
│ ├── utils/ # Utilidades de scraping
│ ├── orchestrator.py # Orquestador de tareas
│ └── cache.py # Sistema de almacenamiento en caché
└── datasets/ # Datos recopilados y transformados
``` 

### 4. Almacenamiento

El sistema de almacenamiento gestiona la persistencia y el acceso a los datos.

#### Opciones de almacenamiento

- **Base de datos**: PostgreSQL para datos estructurados
- **Almacenamiento de archivos**: Sistema de archivos local o compatible con S3 para datos de gran tamaño
- **Caché**: Redis para caché distribuida

## Flujo de datos

### 1. Recopilación de datos

``` 
┌───────────────┐ ┌──────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ 
│ Web │────►│ Scrapers │────►│ Caché │ 
│ Fuentes │ │ │ │ │ 
└──────────────┘ └──────────────┘ └───────────────┘ 
│ 
▼ 
┌─────────────┐ ┌─────────────┐ 
│ │ │ │ 
│ Procesadores │────►│ Almacenamiento │ 
│ │ │ │ 
└────────────┘ └─────────────┘ 
``` 

1. Los scrapers recopilan datos de fuentes web.
2. Los datos se almacenan en caché para evitar solicitudes redundantes.
3. Los procesadores limpian y transforman los datos.
4. Los datos transformados se almacenan para su uso posterior.

### 2. Entrenamiento del modelo

``` 
┌──────────────┐ ┌──────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ 
│ Conjuntos de datos │────►│ Preprocesador │────►│ Entrenamiento │ 
│ │ │ │ │ │ 
└─────────────┘ └─────────────┘ └──────────────┘ 
│ 
▼ 
┌─────────────┐ 
│ │ 
│ Modelos │ 
│ │ 
└─────────────┘ 
``` 

1. Los conjuntos de datos son Extraído del almacenamiento
2. Los datos se preprocesan para el entrenamiento
3. Los modelos se entrenan con los datos preprocesados
4. Los modelos entrenados se guardan

### 3. Uso del modelo

``` 
┌──────────────┐ ┌──────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ 
│ API │────►│ Modelos │────►│ Respuesta │ 
│ Solicitud │ │ │ │ │ 
└──────────────┘ └──────────────┘ └───────────────┘ 
``` 

1. Se recibe una solicitud de API.
2. Se utilizan los modelos adecuados para procesar la Solicitud
3. Se genera y devuelve una respuesta.

## Comunicación entre componentes

### API REST

La comunicación entre el frontend y el backend se realiza principalmente a través de una API REST. Los endpoints se organizan y documentan lógicamente con la interfaz de usuario de Swagger.

### WebSockets

Para funciones que requieren actualizaciones en tiempo real (como el seguimiento de tareas de scraping), se utilizan WebSockets para habilitar la comunicación bidireccional.

### Cola de mensajes

Para tareas asíncronas y de larga duración, se utiliza una cola de mensajes (como RabbitMQ o Redis Pub/Sub) para desacoplar los componentes y garantizar la fiabilidad.

## Implementación

### Opciones de implementación

WhytCard se puede implementar de varias maneras:

1. **Aplicación de escritorio**: Usar Tauri para crear una aplicación de escritorio multiplataforma
2. **Implementación en la nube**: Implementación en servicios en la nube como AWS, GCP o Azure
3. **Autoalojamiento**: Instalación en un servidor personal o empresarial

### Arquitectura de implementación

``` 
┌───────────────────┐ ┌─────────────────┐ 
│ │ │ │ 
│ Interfaz │◄────►│ API Gateway │ 
│ (Estático) │ │ │ 
└──────────────────┘ └───────────────────┘ 
▲ 
│ 
▼ 
┌─────────────────┐ 
│ │ 
│ API de backend │ 
│ │ 
└─────────────────┘ 
▲ 
│ 
▼ 
┌──────────────────┐ ┌─────────────────┐ 
│ │ │ │ 
│ Base de datos │ │ Almacenamiento de archivos │ 
│ │ │ │ 
└──────────────────┘ └───────────────────┘ 
``` 

## Seguridad

### Principios de Seguridad

1. **Defensa en profundidad**: Múltiples capas de seguridad
2. **Principio del mínimo privilegio**: Acceso mínimo necesario
3. **Validación de entrada**: Se validan todas las entradas del usuario
4. **Protección de datos**: Cifrado de datos sensibles

### Medidas de Seguridad

- **Autenticación**: JWT con rotación de tokens
- **Autorización**: Control de acceso basado en roles
- **Protección contra ataques comunes**: XSS, CSRF, inyección SQL
- **Auditoría**: Registro de acciones importantes

## Escalabilidad

La arquitectura está diseñada para ser escalable horizontal y verticalmente:

- **Microservicios**: Los componentes se pueden implementar de forma independiente
- **Almacenamiento en caché**: Uso de cachés multinivel
- **Balanceo de carga**: Distribución del tráfico entre múltiples instancias
- **Particionado**: Separación de datos para mejorar el rendimiento

## Monitoreo y Observabilidad

- **Registro**: Registro centralizado con ELK Stack o equivalente
- **Métricas**: Recopilación de métricas con Prometheus
- **Rastreo**: Seguimiento de solicitudes con OpenTelemetry
- **Alertas**: Alertas basadas en umbrales predefinidos

## Conclusión

La arquitectura de WhytCard está diseñada para ser robusta, escalable y fácil de mantener. La clara separación de responsabilidades entre los diferentes componentes permite una evolución independiente y facilita el trabajo en equipo. La selección de tecnologías se realizó teniendo en cuenta las necesidades actuales y futuras del proyecto, así como las mejores prácticas del sector.

Esta arquitectura se revisará y actualizará periódicamente para adaptarse a las nuevas necesidades y avances tecnológicos.

---

Última actualización: 15/01/2025