Estándares de Rendimiento Web

Objetivos de Rendimiento

- Puntuación Lighthouse: 90+ en todas las métricas
- Objetivos de Core Web Vitals:
- LCP (Largest Contentful Paint): < 2,5 s
- FID (First Input Delay): < 100 ms
- CLS (Cumulative Layout Shift): < 0,1
- INP (Interacción con el Siguiente Paint): < 200 ms
- Tiempo hasta Interacción: < 3 s
- Primer Contentful Paint: < 1,8 s
- Peso total de la página: < 1 MB (idealmente < 500 KB)
- Solicitudes HTTP: < 50 por página

Optimización de Imágenes

- Usar formatos WebP/AVIF con alternativas para navegadores antiguos
- Implementar imágenes adaptables con los atributos `srcset` y `sizes`
- Cargar imágenes de forma diferida en la mitad inferior de la página
- Ajustar el tamaño de las imágenes (evitar mostrar imágenes grandes) Reducción de tamaño mediante CSS)
- Usar CDN de imágenes para redimensionamiento dinámico siempre que sea posible
- Optimizar SVG y eliminar metadatos innecesarios
- Comprimir todas las imágenes con herramientas como ImageOptim, TinyPNG o Squoosh
- Considerar la técnica de desenfoque para carga progresiva

## Optimización de JavaScript

- Implementar división de código e importaciones dinámicas
- Aplazar JavaScript no crítico
- Usar tree-shaking para eliminar código muerto
- Minimizar y comprimir archivos JavaScript
- Evitar JavaScript que bloquee el renderizado
- Usar web workers para tareas que consumen mucha CPU
- Implementar priorización de solicitudes
- Optimizar scripts de terceros y usar atributos async/defer

## Optimización de CSS

- Minimizar e integrar CSS crítico
- Eliminar CSS no utilizado con herramientas como PurgeCSS
- Evitar importaciones de CSS (usar concatenación en su lugar)
- Usar contención de CSS para componentes independientes
- Optimizar selectores de CSS para mejorar el rendimiento
- Considerar el rendimiento de CSS en JS Implicaciones
- Usar variables CSS para un mejor mantenimiento
- Implementar la división de código CSS para aplicaciones grandes

## Optimización de fuentes

- Usar fuentes del sistema siempre que sea posible
- Implementar font-display: swap u opcional
- Crear subconjuntos de fuentes para incluir solo los caracteres necesarios
- Hospedar fuentes propias en lugar de usar servicios de terceros
- Precargar fuentes críticas
- Usar fuentes variables para múltiples grosores/estilos
- Limitar las variaciones de fuente (grosores, estilos)

## Estrategia de almacenamiento en caché

- Implementar políticas de caché efectivas
- Caché larga para recursos estáticos (más de 1 año)
- Caché corta o nula para HTML
- Usar nombres de archivo versionados o cadenas de consulta para la optimización de caché
- Implementar service workers para soporte sin conexión
- Usar localStorage/IndexedDB para el almacenamiento en caché del lado del cliente
- Configurar correctamente los encabezados de caché HTTP
- Implementar el almacenamiento en caché de CDN

## Optimización del servidor

- Habilitar HTTP/2 o HTTP/3
- Implementar la compresión del lado del servidor (Brotli/Gzip)
- Usar CDN para la distribución global de contenido
- Optimizar las respuestas de la API (paginación, selección de campos)
- Implementar edge computing para contenido dinámico
- Configurar los ajustes CORS adecuados
- Optimizar el tiempo hasta el primer byte (TTFB)
- Usar sugerencias de preconexión, precarga y precarga HTTP

## Optimización para dispositivos móviles

- Priorizar el rendimiento móvil (enfoque móvil primero)
- Optimizar los objetivos táctiles (mín. 44×44 px)
- Reducir la carga útil de la red para dispositivos móviles
- Implementar patrones de diseño responsivo
- Realizar pruebas en dispositivos móviles reales, no solo en emuladores
- Considerar la reducción de movimiento para animaciones
- Optimizar para escenarios sin conexión o con mala conectividad

## Monitoreo y pruebas

- Implementar Monitoreo de Usuarios Reales (RUM)
- Configurar monitoreo sintético para flujos de usuarios críticos
- Usar WebPageTest para un análisis detallado del rendimiento
- Monitorear Core Web Vitals en Google Search Console
- Establecer presupuestos de rendimiento y Alertas
- Realizar auditorías de rendimiento periódicas
- Implementar pruebas A/B para mejorar el rendimiento
- Usar el panel de rendimiento de Chrome DevTools para la generación de perfiles

## Técnicas avanzadas

- Implementar sugerencias de recursos (preconexión, precarga, precarga)
- Usar el observador de intersecciones para la carga diferida
- Considerar la renderización del lado del servidor o la generación de sitios web estáticos
- Implementar el patrón "stale-while-revalidate"
- Usar requestIdleCallback para tareas no críticas
- Considerar mapas de importación para la carga de módulos
- Implementar precarga predictiva basada en el comportamiento del usuario
- Usar sugerencias de prioridad para recursos críticos