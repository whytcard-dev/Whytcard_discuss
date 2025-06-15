# Estándares de Estructura del Proyecto

## Organización del Directorio

### Estructura Raíz

``` 
project-root/ 
├── src/ # Código Fuente 
├── public/ # Recursos Estáticos 
├── dist/ # Salida de la Compilación (generada) 
├── node_modules/ # Dependencias (generadas) 
├── tests/ # Archivos de Prueba 
├── docs/ # Documentación 
├── .github/ # Flujos de trabajo y plantillas de GitHub 
├── .vscode/ # Configuración de VS Code 
├── scripts/ # Scripts de Compilación y Utilidades 
├── package.json # Metadatos del Proyecto y Dependencias
├── tsconfig.json # Configuración de TypeScript
├── .eslintrc.js # Configuración de ESLint
├── .prettierrc # Configuración de Prettier
├── .gitignore # Patrones de ignorancia de Git
├── .env.example # Variables de entorno de ejemplo
└── README.md # Documentación del proyecto
``` 

### Estructura del directorio fuente

``` 
src/ 
├── assets/ # Recursos estáticos que requieren procesamiento
│ ├── images/ # Imágenes
│ ├── fonts/ # Archivos de fuentes
│ └── styles/ # Global estilos
│ 
├── componentes/ # Componentes de IU reutilizables
│ ├── común/ # Componentes compartidos entre funciones
│ ├── diseño/ # Componentes de diseño
│ └── ui/ # Componentes básicos de IU
│ 
├── ganchos/ # Ganchos personalizados de React
│ 
├── páginas/ # Componentes de página / componentes de ruta
│ 
├── funciones/ # Módulos basados en funciones
│ ├── función1/ # Función específica
│ │ ├── componentes/ # Componentes específicos de cada función
│ │ ├── ganchos/ # Ganchos específicos de cada función
│ │ ├── api/ # Llamadas API específicas de cada función
│ │ ├── utils/ # Utilidades específicas de cada función
│ │ ├── types/ # Tipos específicos de cada función
│ │ └── index.ts # Exportaciones de funciones
│ └── feature2/ # Otra función
│ 
├── services/ # Integraciones de servicios
│ ├── api/ # Cliente y endpoints de la API
│ ├── auth/ # Servicio de autenticación
│ └── analytics/ # Servicio de análisis
│ 
├── store/ # Gestión de estados
│ ├── slices/ # Segmentos Redux o proveedores de contexto
│ ├── acciones/ # Creadores de acciones
│ └── selectores/ # Selectores de estado
│ 
├── utilidades/ # Funciones de utilidad
│ ├── formato/ # Utilidades de formato
│ ├── validación/ # Utilidades de validación
│ └── ayudantes/ # Funciones de ayuda
│ 
├── tipos/ # Definiciones de tipos de TypeScript
│ ├── API/ # Tipos de respuesta de API
│ ├── modelos/ # Tipos de modelos de datos
│ └── común/ # Definiciones de tipos comunes
│ 
├── constantes/ # Aplicación Constantes
│ 
├── i18n/ # Internacionalización 
│ ├── locales/ # Archivos de traducción 
│ └── config.ts # Configuración de i18n 
│ 
├── config/ # Configuración de la aplicación 
│ ├── route.ts # Definiciones de rutas 
│ └── settings.ts # Configuración de la aplicación 
│ 
└── App.tsx # Componente principal de la aplicación 
``` 

## Convenciones de nomenclatura 

### Archivos y directorios 

- **Componentes de React**: PascalCase con extensión 
- `Button.tsx`, `UserProfile.tsx` 
- **Hooks**: camelCase con el prefijo 'use' 
- `useAuth.ts`, `useFetch.ts`
- **Utilidades**: camelCase
- `formatDate.ts`, `validateEmail.ts`
- **Constantes**: UPPER_SNAKE_CASE
- `API_ENDPOINTS.ts`, `ROUTE_PATHS.ts`
- **Tipos/Interfaces**: PascalCase con nombres descriptivos
- `UserData.ts`, `ApiResponse.ts`
- **Archivos de prueba**: El mismo nombre que el archivo que se está probando, con el sufijo `.test` o `.spec`
- `Button.test.tsx`, `formatDate.spec.ts`

### Organización de componentes

- **Archivos de componentes**: Un componente por archivo
- **Estructura de componentes**: 
```tsx 
// Importaciones 
import React from 'react'; import './styles.css'; 

// Tipos 
interface ButtonProps { 
// ... 
} 

// Componente 
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => { 
// ... 
return ( 
// JSX 
); 
}; 

// Funciones auxiliares específicas de este componente 
const helperFunction = () => { 
// ... 
}; ``` 

## Organización del módulo

### Orden de importación

1. Bibliotecas externas
2. Módulos internos
3. Componentes
4. Hooks
5. Utilidades
6. Tipos
7. Recursos/estilos

Ejemplo: 
```tsx
// Bibliotecas externas
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Módulos internos
import { API_ENDPOINTS } from '@/constants/api';
import { fetchData } from '@/services/api';

// Componentes
import { Button } from '@/components/ui';
import { Modal } from '@/components/common';

// Ganchos
import { useAuth } from '@/hooks'; 

// Utilidades
import { formatDate } from '@/utils/formatting'; 

// Tipos
import type { UserData } from '@/types'; 

// Recursos/estilos
import './styles.css'; 
``` 

### Patrones de exportación

- Usar exportaciones con nombre para la mayoría de los componentes y funciones.
- Usar exportaciones de barril (index.ts) para simplificar las importaciones.
- Evitar las exportaciones predeterminadas, excepto para los componentes de página.

Ejemplo de exportación de barril:
```tsx 
// componentes/ui/index.ts 
export * from './Button'; 
export * from './Input'; 
export * from './Card'; 
``` 

## Archivos de configuración

### Variables de entorno

- Usar archivos `.env` para la configuración específica del entorno
- Incluir `.env.example` en la documentación
- Usar archivos específicos del entorno (`.env.development`, `.env.production`)
- Nunca enviar valores sensibles al control de versiones

### Configuración de TypeScript

- Usar modo estricto
- Configurar alias de ruta para importaciones más limpias
- Separar configuraciones para diferentes entornos si es necesario
- Documentar opciones de configuración no obvias

### Gestión de paquetes

- Usar un archivo de bloqueo (package-lock.json, yarn.lock, pnpm-lock.yaml)
- Documentar la versión requerida de Node.js
- Agrupar dependencias lógicamente en package.json
- Separar las dependencias de desarrollo de las de producción

## Documentación

### Documentación del código

- Documentar funciones y componentes complejos
- Usar JSDoc para funciones Documentación
- Documentar las propiedades de los componentes de React
- Incluir ejemplos de componentes reutilizables
- Documentar los patrones de gestión de estado

### Documentación del proyecto

- Incluir un archivo README.md completo
- Documentar el proceso de configuración e instalación
- Incluir instrucciones del flujo de trabajo de desarrollo
- Documentar el proceso de compilación e implementación
- Mantener un CHANGELOG.md para el historial de versiones
- Incluir directrices de contribución

## Mejores prácticas

- Agrupar archivos relacionados
- Mantener los archivos de componentes pequeños y bien organizados
- Separar la lógica de negocio de los componentes de la interfaz de usuario
- Usar alias de ruta para evitar rutas de importación profundas
- Mantener una organización de archivos consistente en todo el proyecto
- Documentar la estructura del proyecto para los nuevos miembros del equipo
- Usar generadores de código para garantizar la consistencia cuando corresponda
- Revisar y refactorizar la estructura del proyecto periódicamente