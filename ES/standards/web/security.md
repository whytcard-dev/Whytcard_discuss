# Estándares de Seguridad Web

## Principios Fundamentales de Seguridad

- Defensa exhaustiva (múltiples capas de seguridad)
- Principio del mínimo privilegio
- Seguridad por diseño y predeterminada
- Pruebas y auditorías de seguridad periódicas
- Mantener las dependencias de seguridad actualizadas
- Seguridad ante fallos (valores predeterminados seguros)
- Mediación completa (verificar cada solicitud)
- Formación en seguridad para todos los miembros del equipo

## Autenticación y Autorización

### Autenticación

- Implementar políticas de contraseñas robustas
- Longitud mínima: 12 caracteres
- Requerir combinación de caracteres, números y símbolos
- Comparar con listas de contraseñas comunes
- Admitir autenticación multifactor (MFA)
- Utilizar gestión de sesiones segura
- Cookies solo HTTP
- Marcador seguro para HTTPS
- Atributo SameSite
- Caducidad adecuada
- Implementar bloqueo de cuentas tras intentos fallidos
- Flujos seguros de restablecimiento de contraseña
- Utilizar almacenamiento seguro de contraseñas (bcrypt/Argon2)
- Considerar opciones sin contraseña (WebAuthn, enlaces mágicos)

### Autorización

- Implementar control de acceso basado en roles (RBAC)
- Usar control de acceso basado en atributos para permisos complejos
- Validar la autorización en cada solicitud
- Implementar comprobaciones de control de acceso adecuadas
- Usar gestión segura de sesiones
- Implementar autorización API (OAuth 2.0, JWT)
- Evitar referencias directas a objetos
- Registrar todos los fallos de control de acceso

## Protección de datos

### Datos sensibles

- Identificar y clasificar datos sensibles
- Cifrar datos sensibles en reposo
- Usar TLS 1.3 para datos en tránsito
- Implementar una gestión adecuada de claves
- Minimizar la recopilación de datos sensibles
- Aplicar principios de minimización de datos
- Implementar la eliminación segura de datos
- Usar almacenamiento seguro para claves API y secretos

### Validación de entrada

- Validar toda la entrada en el servidor
- Usar consultas parametrizadas para el acceso a la base de datos
- Implementar la limpieza de entrada
- Validar la correcta información de los datos Tipos, longitud y formato
- Usar listas de permitidos en lugar de listas de denegados
- Implementar codificación de salida específica para el contexto
- Validar la carga de archivos (tipo, tamaño y contenido)
- Implementar limitación de velocidad para las entradas

## Prevención de vulnerabilidades comunes

### Prevención de inyección

- Usar consultas parametrizadas/declaraciones preparadas
- Aplicar ORM con el escape adecuado
- Validar y sanear todas las entradas
- Implementar codificación de salida sensible al contexto
- Usar API seguras que eviten la inyección del intérprete

### Prevención de XSS

- Implementar la Política de Seguridad de Contenido (CSP)
- Usar codificación de salida automática
- Aplicar codificación específica para el contexto
- Sanear la entrada HTML
- Usar frameworks modernos con protección XSS integrada
- Validar URL en redirecciones
- Aplicar la marca HTTPOnly a las cookies sensibles

### Prevención de CSRF

- Implementar tokens anti-CSRF
- Usar el atributo de cookie SameSite
- Verificar los encabezados de origen y de referencia
- Requerir reautenticación para acciones sensibles
- Utilizar la configuración CORS adecuada

### Encabezados de seguridad

- Política de seguridad de contenido (CSP)
- Opciones de tipo de contenido X: nosniff
- Seguridad de transporte estricta (HSTS)
- Opciones de marco X
- Política de referencia
- Política de permisos
- Encabezados de control de caché para datos sensibles
- Borrar datos del sitio para cerrar sesión

## Seguridad de la infraestructura

### Seguridad del servidor

- Mantener el software del servidor actualizado
- Utilizar configuraciones de servidor seguras
- Implementar reglas de firewall adecuadas
- Habilitar solo HTTPS (redireccionar HTTP a HTTPS)
- Configurar los ajustes TLS adecuados
- Deshabilitar servicios innecesarios
- Utilizar módulos de servidor web centrados en la seguridad
- Implementar limitación de velocidad y protección contra DDoS

### API Seguridad

- Usar HTTPS para todos los endpoints de la API
- Implementar una autenticación adecuada
- Aplicar limitación de velocidad
- Validar las cargas útiles de las solicitudes
- Devolver los códigos de estado adecuados
- Evitar la exposición de información confidencial en las respuestas
- Usar claves de API para la comunicación entre servicios
- Documentar los requisitos de seguridad para los consumidores de la API

### Gestión de dependencias

- Analizar periódicamente las dependencias vulnerables
- Usar archivos de bloqueo para fijar las versiones de las dependencias
- Implementar análisis automatizado de vulnerabilidades
- Actualizar las dependencias con prontitud
- Minimizar el uso de dependencias
- Verificar la integridad de las dependencias (sumas de comprobación)
- Monitorear los ataques a la cadena de suministro
- Tener un plan de respuesta a vulnerabilidades

## Pruebas de seguridad

### Análisis estático

- Implementar herramientas SAST automatizadas
- Integrar el análisis de seguridad en CI/CD
- Analizar secretos codificados
- Analizar el código en busca de antipatrones de seguridad
- Validar las configuraciones de seguridad
- Comprobar si hay dependencias obsoletas
- Implementar la seguridad Estándares de codificación

### Pruebas dinámicas

- Realizar pruebas de penetración periódicas
- Implementar escaneo DAST automatizado
- Utilizar pruebas interactivas de seguridad de aplicaciones
- Realizar evaluaciones periódicas de vulnerabilidades
- Probar flujos de autenticación y autorización
- Verificar encabezados y configuraciones de seguridad
- Simular escenarios de ataque comunes

## Monitoreo y respuesta de seguridad

### Registro y monitoreo

- Implementar un registro de seguridad integral
- Registrar eventos de autenticación
- Registrar fallos de control de acceso
- Monitorear actividades sospechosas
- Implementar alertas en tiempo real
- Utilizar una gestión centralizada de registros
- Asegurar que los registros sean resistentes a la manipulación
- Conservar los registros durante el tiempo adecuado

### Respuesta a incidentes

- Desarrollar un plan de respuesta a incidentes
- Definir roles y responsabilidades
- Establecer protocolos de comunicación
- Documentar procedimientos de contención
- Implementar capacidades de análisis forense
- Realizar revisiones posteriores a incidentes
- Practicar escenarios de respuesta a incidentes
- Mantener contacto con la comunidad de seguridad

## Cumplimiento y Privacidad

### Cumplimiento normativo

- Identificar las normativas aplicables (RGPD, CCPA, etc.)
- Implementar los controles de seguridad necesarios
- Realizar evaluaciones periódicas de cumplimiento
- Documentar las medidas de cumplimiento
- Capacitar al equipo sobre los requisitos de cumplimiento
- Implementar la privacidad desde el diseño
- Mantener la documentación requerida

### Consideraciones sobre la privacidad

- Implementar políticas de privacidad claras
- Obtener el consentimiento adecuado para la recopilación de datos
- Proporcionar mecanismos de acceso y eliminación de datos
- Minimizar la recopilación y retención de datos
- Implementar la portabilidad de datos
- Realizar evaluaciones de impacto en la privacidad
- Considerar la privacidad en todas las decisiones de diseño