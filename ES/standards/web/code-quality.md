# Estándares de Calidad del Código

## Principios Fundamentales

- Escribir código limpio, fácil de mantener y autodocumentado
- Seguir los principios SOLID y DRY
- Mantener funciones pequeñas y enfocadas (responsabilidad única)
- Usar nombres descriptivos para variables, funciones y clases
- Mantener un estilo de código consistente en todo el proyecto
- Documentar lógica compleja y API públicas
- Escribir código para humanos, no solo para máquinas

## Estándares de JavaScript/TypeScript

### Configuración de TypeScript

- Usar el modo estricto (`"strict": true`)
- Habilitar todas las opciones recomendadas de comprobación de tipos
- Configurar la resolución correcta del módulo
- Establecer la versión de ECMAScript de destino adecuada
- Especificar patrones de inclusión/exclusión
- Usar alias de ruta para importaciones más limpias

### Convenciones de Nomenclatura

- **Variables/Funciones**: camelCase (`getUserData`, `calculateTotal`)
- **Clases/Interfaces/Tipos**: PascalCase (`UserProfile`, `ApiResponse`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_URL`)
- **Propiedades privadas**: Usar el prefijo `#` o la convención `_` (`#privateField`, `_privateMethod`)
- **Variables booleanas**: Usar los prefijos "is", "has" y "can" (`isActive`, `hasPermission`)
- **Archivos de componentes**: PascalCase con la extensión (`UserCard.tsx`)
- **Archivos de utilidad**: camelCase con la extensión (`formatDate.ts`)

### Organización del código

- Una clase/componente por archivo
- Agrupar las importaciones por externas/internas
- Ordenar las importaciones alfabéticamente
- Usar las exportaciones de barril (`index.ts`) para la funcionalidad relacionada
- Organizar el código por Característica/módulo
- Mantener los archivos por debajo de las 400 líneas (dividir si son mayores)
- Mantener las funciones por debajo de las 50 líneas
- Anidamiento máximo: 3-4 niveles de profundidad

### Mejores prácticas

- Preferir la inmutabilidad (const, readonly, Object.freeze)
- Usar encadenamiento opcional y coalescencia de nulos
- Implementar una gestión de errores adecuada
- Evitar cualquier tipo excepto cuando sea necesario
- Usar protecciones de tipo para la comprobación de tipos en tiempo de ejecución
- Preferir async/await en lugar de promesas sin formato
- Evitar números mágicos y cadenas (usar constantes)
- Implementar comprobaciones de nulos/indefinidos adecuadas
- Usar retornos tempranos para reducir el anidamiento

## Estándares de React

### Estructura de componentes

- Preferir componentes funcionales con ganchos
- Usar exportaciones con nombre para los componentes
- Implementar la validación de propiedades con TypeScript
- Extraer lógica compleja a ganchos personalizados
- Mantener los componentes enfocados en las necesidades de la interfaz de usuario
- Implementar límites de error adecuados
- Usar React.memo para la optimización del rendimiento
- Extraer componentes reutilizables

### Gestión de estados

- Usar el estado local para datos específicos de cada componente
- Usar el contexto para el estado compartido entre componentes
- Considerar la gestión externa del estado para aplicaciones complejas
- Mantener el estado normalizado y mínimo
- Implementar una inicialización de estado adecuada
- Usar reductores para una lógica de estado compleja
- Evitar la perforación de propiedades (usar composición o contexto)

### Optimización del rendimiento

- Usar React.memo para componentes puros
- Implementar useMemo para cálculos costosos
- Usar useCallback para la memorización de funciones
- Virtualizar listas largas (react-window, react-virtualized)
- Implementar matrices de dependencias adecuadas en los ganchos
- Evitar re-renderizados innecesarios
- Usar React Profiler para identificar cuellos de botella

## Estándares de prueba

### Pruebas unitarias

- Probar toda la lógica de negocio y las utilidades
- Usar Jest o Vitest como ejecutor de pruebas
- Implementar una simulación adecuada de Dependencias
- Usar la biblioteca de pruebas para las pruebas de componentes
- Seguir el patrón AAA (Organizar, Actuar, Afirmar)
- Escribir nombres de prueba descriptivos
- Apuntar a una cobertura de código superior al 80%
- Probar casos extremos y escenarios de error

### Pruebas de integración

- Probar las interacciones de los componentes
- Probar los envíos de formularios y los flujos de usuario
- Usar MSW para simular API
- Probar el enrutamiento y la navegación
- Verificar los cambios de estado
- Probar con datos realistas

### Pruebas de extremo a extremo

- Usar Cypress o Playwright
- Probar recorridos de usuario críticos
- Probar en múltiples navegadores
- Implementar un aislamiento de pruebas adecuado
- Usar atributos de datos para los selectores de pruebas
- Implementar lógica de reintento para pruebas inestables
- Probar la accesibilidad

## Estándares de revisión de código

### Proceso

- Todo el código debe revisarse antes de la fusión
- Las comprobaciones automatizadas deben aprobarse antes de la revisión
- Usar plantillas de solicitud de extracción
- Mantener las solicitudes de extracción pequeñas y enfocado
- Responder a los comentarios de revisión con prontitud
- Resolver todos los comentarios antes de la fusión
- Agrupar las confirmaciones antes de la fusión

### Lista de verificación de revisión

- El código cumple con los estándares del proyecto
- Las pruebas se incluyen y superan
- La documentación está actualizada
- Sin vulnerabilidades de seguridad
- Se consideran las implicaciones de rendimiento
- Se cumplen los requisitos de accesibilidad
- Se gestionan casos extremos
- Sin código ni dependencias innecesarios

## Herramientas

### Linting y formato

- ESLint con reglas adecuadas
- Prettier para un formato consistente
- Husky para ganchos pre-commit
- Lint-staged para linting incremental
- Compilador TypeScript para verificación de tipos
- Stylelint para CSS/SCSS

### Análisis estático

- SonarQube o CodeClimate
- Monitoreo de métricas de complejidad
- Detección de código duplicado
- Escaneo de vulnerabilidades de seguridad
- Análisis del tamaño del paquete
- Detección de código no utilizado

### Integración de CI/CD

- Ejecutar todas las comprobaciones en cada solicitud de incorporación de cambios
- Bloquear la fusión si las comprobaciones fallan
- Generar y publicar informes de cobertura de pruebas
- Implementar pruebas de regresión de rendimiento
- Automatizar las actualizaciones de dependencias
- Implementar entornos de vista previa