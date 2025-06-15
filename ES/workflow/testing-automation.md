# Automatización de pruebas

Este documento proporciona configuraciones y flujos de trabajo estandarizados para automatizar los procesos de prueba según los estándares de desarrollo web.

## Pruebas unitarias

### Configuración de Jest

```js 
// jest.config.js 
module.exports = { 
preset: 'ts-jest', 
testEnvironment: 'jsdom', 
roots: ['<rootDir>/src'], 
transform: { 
'^.+\\.tsx?$': 'ts-jest', 
'^.+\\.jsx?$': 'babel-jest', 
}, 
testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$', 
moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], 
moduleNameMapper: { 
'^@/(.*)$': '<directorio raíz>/src/$1', 
'\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
'\\.(jpg|jpeg|png|gif|webp|svg)$': '<directorio raíz>/__mocks__/fileMock.js', 
}, 
collectCoverageFrom: [ 
'src/**/*.{js,jsx,ts,tsx}', 
'!src/**/*.d.ts', 
'!src/**/*.stories.{js,jsx,ts,tsx}', 
'!src/index.{js,jsx,ts,tsx}', 
'!src/serviceWorker.{js,jsx,ts,tsx}', 
'!src/reportWebVitals.{js,jsx,ts,tsx}', 
'!src/setupTests.{js,jsx,ts,tsx}', 
], 
Umbral de cobertura: { 
Global: { 
Ramas: 80, 
Funciones: 80, 
Líneas: 80, 
Declaraciones: 80, 
}, 
}, 
Archivos de configuración después del entorno: ['<directorio raíz>/src/setupTests.ts'], 
Patrones de ruta de prueba: ['/módulos_de_nodo/', '/dist/', '/compilación/'], 
Complementos de vigilancia: [ 
'jest-watch-typeahead/nombre_de_archivo', 
'jest-watch-typeahead/testname', ], 
}; 
``` 

### Configuración de la biblioteca de pruebas de React

```js 
// src/setupTests.ts 
import '@testing-library/jest-dom'; 
import { configure } from '@testing-library/react'; 

// Configurar la biblioteca de pruebas de React
configure({ 
testIdAttribute: 'data-testid', }); 

// Ventana simulada.matchMedia
Object.defineProperty(window, 'matchMedia', { 
writable: true, 
value: jest.fn().mockImplementation(query => ({ 
matches: false, 
media: query, 
onchange: null, 
addListener: jest.fn(), 
removeListener: jest.fn(), 
addEventListener: jest.fn(), 
removeEventListener: jest.fn(), 
dispatchEvent: jest.fn(), 
})), 
}); 

// Observador de Intersección Simulado
class ObservadorDeIntersecciónMock { 
observar = jest.fn(); 
desconectar = jest.fn(); 

} 

Object.defineProperty(window, 'IntersectionObserver', { 
writable: true, 
value: MockIntersectionObserver, 
}); 
``` 

## Pruebas de integración 

### Configuración de Cypress 

```js 
// cypress.config.js 
const { defineConfig } = require('cypress'); 

módulo.exports = defineConfig({ 
e2e: { 
baseUrl: 'http://localhost:3000', 
specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}', 
supportFile: 'cypress/support/e2e.ts', 
viewportWidth: 1280, 
viewportHeight: 720, 
video: false, 
captura de pantalla al ejecutar: true, 
chromeWebSecurity: false, 
experimentalStudio: true, 
}, 
componente: { 
devServer: { 
framework: 'react', 
bundler: 'webpack', 
}, 
specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}', 
supportFile: 'cypress/support/component.ts', 
}, 
env: { 
apiUrl: 'http://localhost:3001/api', 
}, 
retries: { 
runMode: 2, 
openMode: 0, 
}, 
}); 
``` 

### Archivo de soporte de Cypress 

```js 
// cypress/support/e2e.ts 
import './commands'; 

// Evita que las excepciones no detectadas fallen las pruebas 
Cypress.on('uncaught:exception', (err) => { 
// Devolver falso aquí evita que Cypress falle la prueba 
return false; 
}); 

// Registrar los nombres de las pruebas en la consola
beforeEach(() => { 
const testName = Cypress.currentTest.title; 
cy.log(`Running: ${testName}`); 
}); 
``` 

### Comandos de Cypress 

```js 
// cypress/support/commands.ts 
import '@testing-library/cypress/add-commands'; 

// Comando personalizado para iniciar sesión
Cypress.Commands.add('login', (email, password) => { 
cy.session([email, password], () => { 
cy.visit('/login'); 
cy.get('[data-testid=email-input]').type(email); 
cy.get('[data-testid=password-input]').type(password); 
cy.get('[data-testid=login-button]').click(); 
cy.url().should('not.include', '/login'); 
}); 
}); 

// Comando personalizado para solicitudes de API con autenticación
Cypress.Commands.add('apiLogin', (email, password) => { 
cy.request({ 
method: 'POST', 
url: `${Cypress.env('apiUrl')}/auth/login`, 
body: { email, password }, 
}).then((response) => { 
window.localStorage.setItem('authToken', response.body.token); 
}); 
}); 
``` 

## Pruebas integrales

### Configuración de Playwright

```js 
// playwright.config.js 
const { defineConfig, devices } = require('@playwright/test'); 

module.exports = defineConfig({ 
testDir: './e2e', 
timeout: 30 * 1000, 
expect: { 
timeout: 5000, 
}, 
fullyParallel: true, 
forbidOnly: !!process.env.CI, 
retries: process.env.CI ? 2 : 0, 
workers: process.env.CI ? 1 : indefinido, 
reporter: [ 
['html'], 
['junit', { outputFile: 'test-results/e2e-junit.xml' }], 
], 
use: { 
actionTimeout: 0, 
baseURL: 'http://localhost:3000', 
trace: 'on-first-retry', 
video: 'on-first-retry', 
captura de pantalla: 'Solo en caso de fallo', 
}, 
proyectos: [ 
{ 
nombre: 'Chrome', 
uso: { ...dispositivos['Chrome de escritorio'] }, 
}, 
{ 
nombre: 'Firefox', 
uso: { ...dispositivos['Firefox de escritorio'] }, 
}, 
{ 
nombre: 'WebKit', 
uso: { ...dispositivos['Safari de escritorio'] }, 
}, 
{ 
nombre: 'Chrome móvil', 
uso: { ...dispositivos['Pixel 5'] }, 
}, 
{ 
nombre: 'Safari móvil', 
uso: { ...dispositivos['iPhone 12'] }, 
}, 
], 
servidor web: { 
comando: 'npm run start', 
puerto: 3000, 
    reutilizarExistingServer: !process.env.CI,
  },
});
``` 

## Pruebas de regresión visual 

### Configuración de Storybook 

```js 
// .storybook/main.js 
module.exports = { 
stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'], 
addons: [ 
'@storybook/addon-links', 
'@storybook/addon-essentials', 
'@storybook/addon-interactions', 
'@storybook/addon-a11y', 
'storybook-addon-performance', 
], 
framework: { 
name: '@storybook/react-webpack5', 
options: {}, 
}, 
docs: { 
autodocs: true, 
}, 
staticDirs: ['../public'], }; ``` 

### Pruebas visuales de Storybook con Chromatic

```yaml 
nombre: Pruebas de regresión visual 

en: 
insertar: 
ramas: [principal, desarrollo] 
solicitud_de_insertar: 
ramas: [principal, desarrollo] 

trabajos: 
regresión-visual: 
se ejecuta en: ubuntu-latest 
pasos: 
- usos: acciones/checkout@v3 
con: 
profundidad-de-búsqueda: 0 

- nombre: Configurar Node.js 
usos: acciones/setup-node@v3 
con: 
versión-de-nodo: '18' 
caché: 'npm' 

- nombre: Instalar dependencias 
ejecutar: npm ci 

- nombre: Publicar en Chromatic 
usos: chromaui/action@v1 
con: 
token-del-proyecto: ${{ secrets.CHROMATIC_PROJECT_TOKEN }} 
exitZeroOnChanges: true 
``` 

## Pruebas de rendimiento 

### Configuración de Lighthouse CI 

```js 
// lighthouserc.js 
module.exports = { 
ci: { 
collect: { 
startServerCommand: 'npm run start', 
url: ['http://localhost:3000/', 'http://localhost:3000/about', 'http://localhost:3000/contact'], 
numberOfRuns: 3, 
settings: { 
preset: 'desktop', 
}, 
}, 
upload: { 
target: 'temporary-public-storage', 
}, 
assertion: { 
preset: 'lighthouse:recommended', 
assertions: { 
'categorías:rendimiento': ['advertencia', { puntuación mínima: 0.9 }], 
'categorías:accesibilidad': ['error', { puntuación mínima: 0.9 }], 
'categorías:mejores-prácticas': ['error', { puntuación mínima: 0.9 }], 
'categorías:seo': ['error', { puntuación mínima: 0.9 }], 
}, 
}, 
}, 
}; ``` 

### Acción de GitHub de Lighthouse CI

```yaml 
nombre: Pruebas de rendimiento 

en: 
insertar: 
ramas: [principal, desarrollo] 
solicitud_de_extracción: 
ramas: [principal, desarrollo] 
trabajos: 
lighthouse: 
se ejecuta en: ubuntu-latest 
pasos: 
- usos: acciones/checkout@v3 

- nombre: Configurar Node.js 
usos: acciones/setup-node@v3 
con: 
versión-de-nodo: '18' 
caché: 'npm' 

- nombre: Instalar dependencias 
ejecutar: npm ci 

- nombre: Compilación 
ejecutar: npm run build 

- nombre: Ejecutar Lighthouse CI 
ejecutar: | 
npm install -g @lhci/cli 
lhci autorun 
env: 
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }} 
``` 

## Pruebas de carga 

### Configuración de k6 

```js 
// load-test.js 
importar http desde 'k6/http'; 
importar { sleep, check } desde 'k6'; 
importar { Rate } desde 'k6/metrics'; 

const failRate = new Rate('failed_requests'); 

export const options = { 
stages: [ 
{ duración: '1m', objetivo: 50 }, // Aumentar a 50 usuarios 
{ duración: '3m', objetivo: 50 }, // Mantener con 50 usuarios durante 3 minutos 
{ duración: '1m', objetivo: 100 }, // Aumentar a 100 usuarios 
{ duración: '3m', objetivo: 100 }, // Mantener con 100 usuarios durante 3 minutos 
{ duración: '1m', objetivo: 0 }, // Reducir a 0 usuarios 
], 
thurms: { 
http_req_duration: ['p(95)<500'], // El 95 % de las solicitudes deben completarse en menos de 500 ms 
'failed_requests': ['rate<0.1'], // Menos del 10 % de las solicitudes pueden fallar 
}, 
}; Función predeterminada de exportación () {
const res = http.get('https://example.com/');
const checkRes = check(res, {
'El estado es 200': (r) => r.status === 200,
tiempo de respuesta < 500 ms': (r) => r.timings.duration < 500,
});
failRate.add(!checkRes);
sleep(1); } 
``` 

## Flujo de trabajo de acciones de GitHub para pruebas

```yaml 
nombre: Conjunto de pruebas 

en: 
insertar: 
ramas: [principal, desarrollo] 
solicitud_de_extracción: 
ramas: [principal, desarrollo] 

trabajos: 
pruebas-unitarias: 
ejecuta-en: ubuntu-latest 
pasos: 
- usos: acciones/checkout@v3 

- nombre: Configurar Node.js 
usos: acciones/setup-node@v3 
con: 
versión-de-nodo: '18' 
caché: 'npm' 

- nombre: Instalar dependencias 
ejecutar: npm ci 

- nombre: Ejecutar pruebas unitarias 
ejecutar: npm test -- --coverage 

- nombre: Subir cobertura a Codecov 
usos: codecov/codecov-action@v3 
Con:
Token: ${{ secrets.CODECOV_TOKEN }}
Archivos: ./coverage/lcov.info
Marcas: PruebasUnitarias
Nombre: Codecov-Umbrella
Fail_CI_If_Error: True

Pruebas-de-integración:
Se-ejecuta-en: Ubuntu-Latest
Necesita: Pruebas-Unitarias
Pasos:
- Usos: Acciones/Checkout@v3
- Nombre: Configurar Node.js
- Usos: Acciones/Setup-Node@v3
Con:
Versión-de-nodo: '18'
Caché: 'npm'
- Nombre: Instalar dependencias
- Ejecutar: NPM CI
- Nombre: Compilación
- Ejecutar: NPM Run Compilación
- Nombre: Ejecutar Pruebas de Cypress
- Usos: Cypress-io/Github-action@v5
Con:
- Compilación: NPM Run Compilación
Inicio: npm start
wait-on: 'http://localhost:3000'

- nombre: Subir capturas de pantalla de Cypress
usos: actions/upload-artifact@v3
if: Failure()
with:
nombre: cypress-screenshots
path: cypress/screenshots

e2e-tests:
runs-on: ubuntu-latest
needs: Integration-tests
steps:
- usos: actions/checkout@v3

- nombre: Configurar Node.js
usos: actions/setup-node@v3
with:
node-version: '18'
caché: 'npm'

- nombre: Instalar dependencias
run: npm ci

- nombre: Instalar navegadores de Playwright
run: npx playwright install --with-deps

- nombre: Construir
run: npm run build

- nombre: Ejecutar pruebas de Playwright
run: npx playwright test

- nombre: Subir informe de Playwright
uses: actions/upload-artifact@v3
if: always()
with:
name: playwright-report
path: playwright-report/
```

## Mejores prácticas para la automatización de pruebas

1. **Pirámide de pruebas**: Sigue el enfoque de la pirámide de pruebas con más pruebas unitarias, menos pruebas de integración e incluso menos pruebas E2E.
2. **Pruebas continuas**: Ejecuta pruebas automáticamente en cada confirmación.
3. **Retroalimentación rápida**: Optimiza las pruebas para que se ejecuten rápidamente y proporciones retroalimentación inmediata.
4. **Pruebas aisladas**: Asegúrate de que las pruebas sean independientes y no se afecten entre sí.
5. **Datos realistas**: Usa datos de prueba realistas que representen escenarios de producción.
6. **Pruebas mantenibles**: Escribe código de prueba limpio y mantenible con abstracciones adecuadas.
7. **Pruebas visuales**: Incluir pruebas de regresión visual para los componentes de la interfaz de usuario.
8. **Pruebas de rendimiento**: Realizar pruebas de rendimiento periódicas para detectar regresiones.
9. **Pruebas de accesibilidad**: Incorporar pruebas de accesibilidad en el proceso de automatización.
10. **Pruebas de seguridad**: Incluir pruebas de seguridad como parte del conjunto de pruebas automatizadas.

## Lista de verificación de implementación

- [ ] Configurar Jest para pruebas unitarias.
- [ ] Configurar la biblioteca de pruebas de React para pruebas de componentes.
- [ ] Configurar Cypress para pruebas de integración.
- [ ] Configurar Playwright para pruebas integrales.
- [ ] Configurar Storybook con Chromatic para pruebas de regresión visual.
- [ ] Configurar Lighthouse CI para pruebas de rendimiento.
- [ ] Configurar k6 para pruebas de carga.
- [ ] Integrar pruebas en los pipelines de CI/CD.
- [ ] Configurar informes de cobertura de código.
- [ ] Configurar la monitorización de los resultados y tendencias de las pruebas.