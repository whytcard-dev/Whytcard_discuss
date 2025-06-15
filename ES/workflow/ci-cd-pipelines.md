# Automatización de la canalización de CI/CD

Este documento proporciona configuraciones estandarizadas de la canalización de CI/CD para automatizar los procesos de compilación, prueba e implementación según los estándares de desarrollo web.

## Flujo de trabajo de Acciones de GitHub

### Canalización de CI básica (Acciones de GitHub)

```yaml 
nombre: Canalización de CI

en: 
insertar: 
ramas: [principal, desarrollo] 
solicitud_de_extracción: 
ramas: [principal, desarrollo] 

trabajos: 
compilar-y-probar: 
ejecutar-en: ubuntu-latest 

pasos: 
- usos: actions/checkout@v3 

- nombre: Configurar Node.js 
usos: actions/setup-node@v3 
con: 
versión-de-nodo: '18' 
caché: 'npm' 

- nombre: Instalar dependencias 
ejecutar: npm ci 

- nombre: Lint 
ejecutar: npm run lint 

- nombre: Comprobación de tipos 
ejecutar: npm run type-check 

- Nombre: Pruebas unitarias
Ejecutar: npm run test

- Nombre: Compilación
Ejecutar: npm run build

- Nombre: Subir artefactos de compilación
Usos: actions/upload-artifact@v3
Con:
Nombre: build-output
Ruta: dist/
```

### Pipeline de CI/CD completo (Acciones de GitHub)

```yaml
Nombre: Pipeline de CI/CD

En:
Insertar:
Ramas: [main, develop]
Solicitud_de_extracción:
Ramas: [main, develop]
Trabajos:
Calidad_del_código:
Ejecuta-en: ubuntu-latest
Pasos:
- Usos: actions/checkout@v3

- Nombre: Configurar Node.js
Usos: actions/setup-node@v3
Con:
Versión_del_nodo: '18'
Caché: 'npm' 

- nombre: Instalar dependencias 
ejecutar: npm ci 

- nombre: Lint 
ejecutar: npm run lint 

- nombre: Comprobación de tipo 
ejecutar: npm run type-check 

- nombre: Comprobación de estilo de código 
ejecutar: npm run format:check 

- nombre: Auditoría de seguridad 
ejecutar: npm audit --production 

prueba: 
necesita: calidad del código 
se ejecuta en: ubuntu-latest 
pasos: 
- usos: actions/checkout@v3 

- nombre: Configurar Node.js 
usos: actions/setup-node@v3 
con: 
node-version: '18' 
caché: 'npm' 

- nombre: Instalar dependencias 
ejecutar: npm ci 

- nombre: Pruebas unitarias 
ejecutar: npm run test 

- nombre: Integración Pruebas
Ejecutar: npm run test:integration

- Nombre: Cargar cobertura de pruebas
Usos: actions/upload-artifact@v3
Con: 
Nombre: test-coverage
Ruta: coverage/

Compilación:
Necesidades: test
Se ejecuta en: ubuntu-latest
Pasos:
- Usos: actions/checkout@v3

- Nombre: Configurar Node.js
Usos: actions/setup-node@v3
Con: 
Node-version: '18'
Caché: 'npm'

- Nombre: Instalar dependencias
Ejecutar: npm ci

- Nombre: Compilación
Ejecutar: npm run build

- Nombre: Cargar artefactos de compilación
Usos: actions/upload-artifact@v3
Con: 
Nombre: build-output
Ruta: dist/

E2E-tests:

Necesita: compilar
Se ejecuta en: ubuntu-latest
Pasos:
- Usos: actions/checkout@v3


- Nombre: Configurar Node.js

Usos: actions/setup-node@v3

Con:

Versión-de-nodo: '18'
Caché: 'npm'


- Nombre: Instalar dependencias

Ejecutar: npm ci


- Nombre: Descargar artefactos de compilación

Usos: actions/download-artifact@v3

Con:

Nombre: build-output
Ruta: dist/


- Nombre: Pruebas E2E

Ejecutar: npm run test:e2e


- Nombre: Subir resultados de pruebas E2E

Usos: actions/upload-artifact@v3

Con:

Nombre: e2e-test-results
Ruta: e2e-results/

Implementación-en-preparación:
Si: github.event_name == 'push' && github.ref == 'refs/heads/develop'

Necesidades: pruebas de extremo a extremo

Se ejecuta en: ubuntu-latest

Entorno: staging

Pasos:

- Usos: actions/checkout@v3

- Nombre: Descargar artefactos de compilación

Usos: actions/download-artifact@v3

Con:

Nombre: salida de compilación

Ruta: dist/

- Nombre: Implementar en staging

Ejecutar: |

# Agrega tu script de implementación aquí

echo "Implementando en entorno de pruebas"

deployment-production:
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
needs: e2e-tests
runs-on: ubuntu-latest
entorno: production
steps:
- uses: actions/checkout@v3


- name: Descargar artefactos de compilación

uses: actions/download-artifact@v3

with:

name: build-output
path: dist/


- name: Implementar en producción

run: | # Agrega tu script de implementación aquí
echo "Implementando en el entorno de producción"
``` 

## Pipeline de CI/CD de GitLab

```yaml 
etapas: 
- validar 
- probar 
- compilar 
- prueba e2e 
- implementar 

variables: 
NODE_VERSION: "18" 

caché: 
clave: ${CI_COMMIT_REF_SLUG} 
rutas: 
- node_modules/ 

calidad-código: 
etapa: validar 
imagen: nodo:${NODE_VERSION} 
script: 
- npm ci 
- npm run lint 
- npm run type-check 
- npm run format:check 
- npm audit --production 

pruebas-unitarias: 
etapa: probar 
imagen: nodo:${NODE_VERSION} 
script: 
- npm ci
- npm run test
Artefactos:
Rutas:
- cobertura/
Expiración: 1 semana

Pruebas de integración:
Etapa: prueba
Imagen: nodo:${NODE_VERSION}
Script:
- npm ci
- npm run test:integration
Artefactos:
Rutas:
- cobertura-integración/
Expiración: 1 semana

Compilación:
Etapa: compilación
Imagen: nodo:${NODE_VERSION}
Script:
- npm ci
- npm run build
Artefactos:
Rutas:
- dist/
Expiración: 1 semana

Pruebas e2e:
Etapa: prueba e2e
Imagen: cypress/browsers:nodo${NODE_VERSION}-chrome
Script:
- npm ci
- npm run prueba:e2e
artefactos:
rutas:
- e2e-results/
caduca: 1 semana

implementación-en-etapa:
etapa: implementar
imagen: nodo:${NODE_VERSION}
script:
- echo "Implementando en el entorno de prueba"

# Agrega tu script de implementación aquí

entorno:
nombre: prueba
solo:
- desarrollo

implementación-producción:
etapa: implementar
imagen: nodo:${NODE_VERSION}
script:
- echo "Implementando en el entorno de producción"

# Agrega tu script de implementación aquí

entorno:
nombre: producción
solo:
- principal
cuando: manual

```

## Pipeline de Jenkins

```groovy
pipeline {
agente {
docker {
imagen 'nodo:18'
}
}




etapas { 
etapa('Instalar') { 
pasos { 
sh 'npm ci' 
} 
} 

etapa('Calidad del código') { 
paralelo { 
etapa('Lint') { 
pasos { 
sh 'npm run lint' 
} 
} 
etapa('Comprobación de tipo') { 
pasos { 
sh 'npm run type-check' 
} 
} 
etapa('Comprobación de formato') { 
pasos { 
sh 'npm run format:check' 
} 
} 
etapa('Auditoría de seguridad') { 
pasos { 
sh 'npm audit --production' 
} 
} 
} 
} 

etapa('Prueba') { 
paralelo { 
etapa('Pruebas unitarias') { 
pasos { 
sh 'npm run test' 
} 
post { 
siempre { 
junit 'junit-reports/*.xml' 
publishHTML(target: [ 
allowMissing: false, 
alwaysLinkToLastBuild: false, 
keepAll: true, 
reportDir: 'cobertura', 
reportFiles: 'index.html', 
reportName: 'Informe de cobertura' 
]) 
} 
} 
} 
stage('Pruebas de integración') { 
steps { 
sh 'npm run test:integration' 
} 
} 
} 
} 

stage('Construir') { 
steps { 
sh 'npm run build' 
} 
post { 
success { 
archiveArtifacts artifacts: 'dist/**/*', fingerprint: true 
} 
} 
} 

stage('E2E Pruebas') { 
pasos { 
sh 'npm run test:e2e' 
} 
publicar { 
siempre { 
publicarHTML(objetivo: [ 
permitirFalta: falso, 
siempreEnlazarConLaÚltimaCompilación: falso, 
mantenerTodo: verdadero, 
DirDeReporte: 'e2e-results', 
ArchivosDeReporte: 'index.html', 
NombreDeReporte: 'Informe De Prueba E2E' 
]) 
} 
} 
} 
} 

publicar { 
siempre { 
cleanWs() 
} 
} 
} 
``` 

## Canalización de Azure DevOps 

```yaml 
desencadenador: 
ramas: 
incluyen: 
- principal 
- desarrollo 

grupo: 
vmImage: 'ubuntu-latest' 

variables: 
versiónDeNodo: '18.x'

Etapas:
- Etapa: Validar
Trabajos:
- Trabajo: CodeQuality
Pasos:
- Tarea: NodeTool@0
Entradas:
VersionSpec: $(nodeVersion)
NombreParaMostrar: 'Instalar Node.js'



- Script: npm ci
NombreParaMostrar: 'Instalar dependencias'



- Script: npm run lint
NombreParaMostrar: 'Ejecutar linting'



- Script: npm run type-check
NombreParaMostrar: 'Ejecutar comprobación de tipos'


- Script: npm run format:check
NombreParaMostrar: 'Comprobar formato de código'



- Tarea: npm@1
Entradas:
Comando: 'personalizado'
ComandoPersonalizado: 'auditoría--producción'
NombreParaMostrar: 'Auditoría de seguridad'

- Etapa: Prueba
DependeDe: Validar
Trabajos:
- Trabajo: PruebasUnitarias
Pasos:
- Tarea: NodeTool@0
Entradas:
VersionSpec: $(nodeVersion)
NombreParaMostrar: 'Instalar Node.js'



- Script: npm ci
NombreParaMostrar: 'Instalar dependencias'



- Script: npm run test
NombreParaMostrar: 'Ejecutar pruebas unitarias'



- Tarea: PublishTestResults@2
Entradas:
testResultsFormat: 'JUnit'
testResultsFiles: '**/junit-*.xml'
mergeTestResults: true
testRunTitle: 'PruebasUnitarias'
NombreParaMostrar: 'Publicar resultados de pruebas'



- Tarea: PublishCodeCoverageResults@1
Entradas:
codeCoverageTool: 'Cobertura'
summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml' 
DirectorioDeReporte: '$(System.DefaultWorkingDirectory)/coverage' 
NombreParaMostrar: 'Publicar Cobertura de Código' 

- Etapa: Compilación 
DependeDe: Prueba 
Trabajos: 
- Trabajo: Compilación de Aplicaciones 
Pasos: 
- Tarea: NodeTool@0 
Entradas: 
EspecificaciónDeVersión: $(VersiónDeNodo) 
NombreParaMostrar: 'Instalar Node.js' 

- Script: npm ci 
NombreParaMostrar: 'Instalar Dependencias' 

- Script: npm run build 
NombreParaMostrar: 'Compilación de la Aplicación' 

- Tarea: CopiarArchivos@2 
Entradas: 
CarpetaOrigen: '$(System.DefaultWorkingDirectory)/dist' 
Contenido: '**' 
CarpetaDestino: '$(Build.ArtifactStagingDirectory)' 
NombreParaMostrar: 'Copiar archivos de compilación'

- Tarea: PublishBuildArtifacts@1
Entradas:
pathToPublish: '$(Build.ArtifactStagingDirectory)'
NombreParaArtefacto: 'drop'
NombreParaMostrar: 'Publicar artefactos de compilación'

- Etapa: E2ETest
DependeDe: Compilación
Trabajos:
- Trabajo: E2ETests
Pasos:
- Tarea: NodeTool@0
Entradas:
versionSpec: $(nodeVersion)
NombreParaMostrar: 'Instalar Node.js'


Script: npm ci
NombreParaMostrar: 'Instalar dependencias'


- Tarea: DownloadBuildArtifacts@0
Entradas:
buildType: 'current'
downloadType: 'single'
NombreParaArtefacto: 'drop'
downloadPath: '$(System.DefaultWorkingDirectory)/dist'
NombreParaMostrar: 'Descargar artefactos de compilación'

- script: npm run test:e2e
displayName: 'Ejecutar pruebas E2E'

- tarea: PublishTestResults@2
entradas:
testResultsFormat: 'JUnit'
testResultsFiles: '**/e2e-*.xml'
mergeTestResults: true
testRunTitle: 'Pruebas E2E'
displayName: 'Publicar resultados de pruebas E2E'

- etapa: DeployStaging
dependentOn: E2ETest
condición: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop'))
trabajos:
- implementación: DeployStaging
entorno: staging
estrategia:
runOnce:
implementar:
pasos:
- script: echo "Implementando en entorno de staging"

Nombre para mostrar: 'Implementar en staging'

- etapa: DeployProduction
dependencia: E2ETest
condición: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
trabajos:
- implementación: DeployProduction
entorno: producción
estrategia:
ejecutarUnaVez:
implementar:
pasos:
- script: echo "Implementando en entorno de producción"
nombre para mostrar: 'Implementar en producción'
```

## Mejores prácticas para pipelines de CI/CD

1. **Fail Fast**: Ejecute primero comprobaciones rápidas como linting y verificación de tipos para obtener retroalimentación rápida.
2. **Ejecución paralela**: Ejecute trabajos independientes en paralelo para reducir la duración del pipeline.
3. **Almacenamiento en caché**: Almacene en caché las dependencias para acelerar las compilaciones.
4. **Artefactos**: Comparta los artefactos de compilación entre trabajos para evitar la reconstrucción.
5. **Separación de entornos**: Utilizar entornos diferentes para staging y producción
6. **Aprobación manual**: Requerir aprobación manual para implementaciones de producción
7. **Notificaciones**: Configurar notificaciones para fallos en la canalización
8. **Gestión de secretos**: Utilizar métodos seguros para gestionar secretos y credenciales
9. **Control de versiones**: Incluir información de la versión en los artefactos de compilación
10. **Supervisión**: Supervisar el rendimiento de la canalización y optimizar según sea necesario

## Lista de verificación de implementación

- [ ] Configurar el repositorio de control de versiones
- [ ] Configurar la plataforma de CI/CD preferida
- [ ] Crear la configuración básica de la canalización
- [ ] Añadir comprobaciones de calidad del código
- [ ] Configurar ejecutores de pruebas
- [ ] Configurar el proceso de compilación
- [ ] Configurar los entornos de implementación
- [ ] Configurar notificaciones
- [ ] Documentar el uso y el mantenimiento de la canalización
- [ ] Capacitar al equipo en el flujo de trabajo de CI/CD
