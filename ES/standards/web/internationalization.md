Estándares de internacionalización (i18n)

## Principios fundamentales

- Diseñar para audiencias globales desde el principio
- Separar el contenido del código
- Compatibilidad con múltiples idiomas y configuraciones regionales
- Respetar las diferencias y sensibilidades culturales
- Implementar la detección automática de idiomas
- Permitir la selección manual de idiomas
- Realizar pruebas con usuarios reales de los mercados objetivo

## Idioma y contenido

### Gestión de texto

- Almacenar todo el texto visible para el usuario en archivos de recursos
- Nunca codificar cadenas de texto en componentes
- Usar claves descriptivas únicas para los recursos de texto
- Organizar las traducciones por función o página
- Admitir reglas de pluralización para diferentes idiomas
- Gestionar variaciones específicas de género
- Admitir idiomas de derecha a izquierda (RTL)
- Implementar mecanismos de respaldo para traducciones faltantes

### Proceso de traducción

- Proporcionar contexto para los traductores
- Incluir descripciones de marcadores de posición/variables
- Utilizar servicios de traducción profesionales
- Implementar sistemas de memoria de traducción
- Permitir la expansión del texto (algunos idiomas requieren más espacio)
- Proporcionar capturas de pantalla para contexto
- Implementar un proceso de revisión para las traducciones
- Apoyar las actualizaciones continuas de las traducciones

### Consideraciones de contenido

- Evitar metáforas o modismos culturalmente específicos
- Tener en cuenta el simbolismo de los colores en diferentes culturas
- Considerar diferentes formatos de nombre y estándares de dirección
- Respetar las sensibilidades y tabúes culturales
- Adaptar el contenido a los mercados locales cuando sea necesario
- Usar imágenes culturalmente neutrales
- Considerar la dirección de lectura (LTR vs. RTL)
- Evitar jerga y coloquialismos

## Implementación técnica

### Framework y bibliotecas

- Usar bibliotecas i18n establecidas:
- react-i18next / i18next (React)
- vue-i18n (Vue)
- angular/localize (Angular)
- next-intl (Next.js)
- Format.js (React)
- Implementar una detección de idioma adecuada
- Soporte para idiomas Cambio sin recargar la página
- Configurar idiomas de respaldo
- Implementar carga diferida para traducciones
- Almacenar traducciones en caché para un mejor rendimiento
- Admitir claves de traducción anidadas
- Implementar pluralización y formato

### Estructura del código

- Separar los archivos de traducción por idioma
- Usar JSON o YAML para los recursos de traducción
- Implementar espacios de nombres para aplicaciones grandes
- Mantener las claves de traducción organizadas y fáciles de mantener
- Seguir convenciones de nomenclatura consistentes para las claves
- Documentar formatos o variables especiales
- Implementar seguridad de tipos para las claves de traducción (TypeScript)
- Admitir la generación dinámica de claves cuando sea necesario

### Formato

#### Fecha y hora

- Usar bibliotecas compatibles con formatos de fecha internacionales
- Mostrar las fechas en el formato preferido del usuario
- Considerar las zonas horarias y el horario de verano
- Formatear las fechas según las convenciones locales
- Admitir diferentes sistemas de calendario cuando sea necesario
- Usar el formato ISO para el intercambio de datos
- Mostrar las horas relativas según la cultura

#### Números y moneda

- Formatear números Según las convenciones locales
- Usar separadores decimales y de miles adecuados
- Formatear las monedas con los símbolos apropiados
- Colocar los símbolos monetarios correctamente según la configuración regional
- Admitir diferentes sistemas de numeración
- Formatear porcentajes según la configuración regional
- Considerar los tipos de cambio para aplicaciones multirregionales

#### Direcciones y números de teléfono

- Admitir diferentes formatos de dirección
- Adaptarse a varios formatos de código postal
- Gestionar números de teléfono internacionales (formato E.164)
- Formatear los números de teléfono según las convenciones locales
- Admitir diferentes convenciones de ordenación de nombres
- Considerar honoríficos y títulos en diferentes culturas
- Validar direcciones según las reglas específicas de cada país

## Consideraciones de la interfaz de usuario

### Diseño y maquetación

- Diseñar maquetaciones flexibles que se adapten a la expansión del texto
- Admitir direcciones de texto de izquierda a derecha (LTR) y de derecha a izquierda (RTL)
- Implementar compatibilidad con texto bidireccional (bidi)
- Probar maquetaciones con cadenas de texto más largas
- Evitar contenedores de ancho fijo para el texto
- Considerar las variaciones de tamaño de fuente entre idiomas
- Probar con Contenido traducido real, no Lorem Ipsum.
- Implementar CSS específico para cada idioma cuando sea necesario.

### Tipografía

- Usar fuentes compatibles con varios idiomas.
- Incluir alternativas de fuentes adecuadas.
- Considerar conjuntos de caracteres para diferentes idiomas.
- Admitir caracteres especiales y diacríticos.
- Ajustar la altura de línea para diferentes escrituras.
- Probar la legibilidad en diferentes idiomas.
- Considerar texto vertical para algunos idiomas de Asia Oriental.
- Usar Unicode correctamente.

### Navegación y controles

- Traducir los elementos y controles de navegación.
- Ajustar la navegación para idiomas de derecha a izquierda.
- Considerar patrones de lectura culturales.
- Asegurarse de que los iconos sean culturalmente neutrales.
- Probar los atajos de teclado en diferentes distribuciones de teclado.
- Proporcionar ayuda y documentación localizadas.
- Traducir mensajes de error y notificaciones.
- Localizar la función de búsqueda.

## Pruebas y control de calidad

### Estrategia de pruebas

- Realizar pruebas con hablantes nativos.
- Verificar las traducciones en contexto.
- Probar la expansión y el truncamiento del texto.
- Validar la fecha, el número y la moneda. Formato
- Probar exhaustivamente los diseños RTL
- Verificar la funcionalidad de cambio de idioma
- Probar con diferentes configuraciones regionales
- Implementar pruebas automatizadas de i18n

### Problemas comunes

- Comprobar cadenas codificadas
- Verificar la pluralización correcta
- Buscar cadenas concatenadas
- Comprobar problemas de manejo de Unicode
- Verificar la ordenación y la intercalación
- Comprobar suposiciones culturales en la lógica
- Probar con palabras y cadenas largas
- Verificar el manejo de caracteres especiales

### Herramientas y automatización

- Implementar el análisis de errores (linting) para problemas de i18n
- Usar sistemas de gestión de traducciones
- Automatizar la generación de capturas de pantalla para contexto
- Implementar pseudolocalización para pruebas
- Usar pruebas automatizadas para problemas de diseño
- Monitorizar la cobertura y la calidad de la traducción
- Implementar comprobaciones de CI/CD para i18n
- Supervisar traducciones faltantes

## Legal y cumplimiento

- Investigar los requisitos legales locales
- Adaptar las políticas de privacidad a las diferentes regiones
- Considerar el RGPD y otras políticas de privacidad Regulaciones
- Adaptar las condiciones de servicio a los mercados locales
- Tener en cuenta las restricciones de contenido por país
- Considerar los requisitos de accesibilidad por región
- Documentar las medidas de cumplimiento
- Consultar con expertos legales para mercados clave