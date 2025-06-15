# Estándares de Pruebas Web

## Filosofía de Pruebas

- Realizar pruebas tempranas y frecuentes
- Automatizar las pruebas siempre que sea posible
- Realizar pruebas a niveles adecuados (unidad, integración, extremo a extremo)
- Escribir pruebas mantenibles y fiables
- Probar tanto rutas de prueba como casos extremos
- Utilizar pruebas para evitar regresiones
- Priorizar las pruebas según el impacto en el negocio
- Tratar el código de prueba con el mismo cuidado que el código de producción

## Tipos de Pruebas y Cobertura

### Pruebas Unitarias

- **Objetivo**: Funciones, componentes y módulos individuales
- **Objetivo de cobertura**: Más del 80 % de la lógica de negocio y utilidades
- **Herramientas**: Jest, Vitest, Biblioteca de Pruebas de React
- **Mejores Prácticas**:
- Seguir el patrón AAA (Arrange, Act, Assert)
- Una aserción por prueba cuando sea posible
- Simular dependencias externas
- Probar casos extremos y condiciones de error
- Mantener las pruebas rápidas (< 100 ms por prueba)
- Usar nombres de prueba descriptivos
- Aislar las pruebas entre sí

### Pruebas de integración

- **Objetivo**: Interacciones entre componentes y servicios
- **Objetivo de cobertura**: Flujos de usuario críticos e interacciones de componentes
- **Herramientas**: Biblioteca de pruebas de React, MSW, Supertest
- **Mejores prácticas**:
- Probar la composición de los componentes
- Probar el envío de formularios
- Simular respuestas de la API
- Probar cambios de estado
- Verificar actualizaciones del DOM
- Probar el enrutamiento y la navegación
- Usar datos de prueba realistas

### Pruebas de extremo a extremo

- **Objetivo**: Completar los flujos de usuario desde la interfaz de usuario hasta el backend
- **Objetivo de cobertura**: Rutas de negocio críticas y recorridos de usuario
- **Herramientas**: Cypress, Playwright
- **Mejores prácticas**:
- Centrarse en los recorridos de usuario críticos
- Probar en varios navegadores
- Usar Selectores estables (data-testid)
- Configurar entornos de prueba aislados
- Gestionar datos de prueba eficazmente
- Tomar capturas de pantalla en caso de fallos
- Implementar lógica de reintento para pruebas inestables

### Pruebas de regresión visual

- **Objetivo**: Apariencia y diseño de la interfaz de usuario
- **Objetivo de cobertura**: Componentes y páginas clave de la interfaz de usuario
- **Herramientas**: Percy, Chromatic, Playwright
- **Prácticas recomendadas**:
- Capturar capturas de pantalla de referencia
- Realizar pruebas en diferentes ventanas gráficas
- Ignorar contenido dinámico
- Revisar cuidadosamente los cambios visuales
- Probar los modos claro/oscuro
- Probar con diferentes longitudes de contenido
- Integrar con la canalización de CI/CD

### Pruebas de accesibilidad

- **Objetivo**: Cumplimiento de WCAG y problemas de accesibilidad
- **Objetivo de cobertura**: Todos los componentes y páginas de cara al usuario
- **Herramientas**: axe, Lighthouse, WAVE
- **Prácticas recomendadas**:
- Realizar pruebas Navegación con teclado
- Verificar la compatibilidad del lector de pantalla
- Comprobar el contraste de color
- Gestión del enfoque de las pruebas
- Verificar los atributos ARIA
- Realizar pruebas con tecnologías de asistencia
- Automatizar las comprobaciones básicas de accesibilidad

### Pruebas de rendimiento

- **Objetivo**: Tiempos de carga de la página, rendimiento de renderizado
- **Objetivo de cobertura**: Páginas clave y rutas de usuario críticas
- **Herramientas**: Lighthouse, WebPageTest, k6
- **Prácticas recomendadas**:
- Medir las métricas web esenciales
- Realizar pruebas en dispositivos de gama baja
- Simular la limitación de la red
- Supervisar el tamaño del paquete
- Realizar pruebas con escenarios realistas de almacenamiento en caché
- Medir el tiempo de interacción
- Establecer presupuestos de rendimiento

## Prácticas de prueba

### Organización de las pruebas

- Agrupar las pruebas lógicamente por función o componente
- Usar nombres de archivo descriptivos y descripciones de las pruebas
- Separar las utilidades y los accesorios de prueba
- Organizar las pruebas en una jerarquía que refleje el código base
- Mantener las pruebas Archivos cerca del código que prueban.
- Usar convenciones de nomenclatura consistentes.
- Separar pruebas unitarias, de integración y extremo a extremo.

### Gestión de datos de prueba

- Usar fábricas o compiladores para los datos de prueba.
- Evitar la codificación rígida de los datos de prueba.
- Usar datos realistas que coincidan con los patrones de producción.
- Restablecer el estado de prueba entre pruebas.
- Aislar los entornos de prueba.
- Considerar la privacidad de los datos de prueba.
- Usar datos aleatorios con semilla para casos extremos.

### Simulación y stubbing

- Simular dependencias externas (API, servicios).
- Usar respuestas simuladas realistas.
- Restablecer simulaciones entre pruebas.
- Evitar simulaciones excesivas.
- Simular al nivel adecuado.
- Documentar el comportamiento de las simulaciones.
- Usar MSW para simulaciones de API.

### Integración continua

- Ejecutar pruebas en cada solicitud de extracción.
- Implementar la ejecución de pruebas en paralelo.
- Configurar informes y paneles de control de pruebas.
- Configurar notificaciones de fallos de prueba.
- Implementar reintentos de prueba para pruebas inestables.
- Almacenar en caché las dependencias de prueba.
- Ejecutar Diferentes tipos de pruebas en las etapas adecuadas

## Desarrollo Dirigido por Pruebas (TDD)

- Escribir pruebas antes de implementar funcionalidades
- Seguir el ciclo Rojo-Verde-Refactorización
- Comenzar con casos de prueba simples
- Añadir complejidad gradualmente
- Usar pruebas para impulsar el diseño
- Refactorizar las pruebas a medida que el código evoluciona
- Centrarse en el comportamiento, no en la implementación

## Mantenimiento de Pruebas

- Revisar y actualizar las pruebas regularmente
- Eliminar o corregir pruebas deficientes
- Refactorizar las pruebas con cambios en el código
- Supervisar el rendimiento de las pruebas
- Analizar la cobertura de las pruebas regularmente
- Documentar la estrategia de pruebas
- Capacitar a los miembros del equipo en las prácticas de prueba

## Pruebas Especializadas

### Pruebas de API

- Probar todos los endpoints de la API
- Verificar los esquemas de solicitud/respuesta
- Probar la autenticación y la autorización
- Probar la gestión de errores y los códigos de estado
- Validar la lógica de negocio
- Probar la limitación de velocidad y las cuotas
- Documentar los casos de prueba de la API

### Pruebas de Gestión de Estado

- Estado de las pruebas Transiciones
- Verificar el estado inicial
- Probar reductores y acciones
- Probar selectores y estados derivados
- Simular dependencias externas
- Probar cambios de estado asíncronos
- Verificar la persistencia del estado

### Pruebas de formularios

- Probar los envíos de formularios
- Validar las entradas del formulario
- Probar los estados de error
- Probar la funcionalidad de restablecimiento del formulario
- Probar la lógica condicional del formulario
- Verificar la accesibilidad de los elementos del formulario
- Probar el formulario con navegación por teclado

### Pruebas de seguridad

- Probar los flujos de autenticación
- Verificar las comprobaciones de autorización
- Probar contra vulnerabilidades comunes (XSS, CSRF)
- Validar la limpieza de entradas
- Probar la seguridad de la carga de archivos
- Verificar encabezados seguros
- Probar contra el Top 10 de OWASP