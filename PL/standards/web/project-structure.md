# Standardy struktury projektu

## Organizacja katalogu

### Struktura główna

``` 
project-root/ 
├── src/ # Kod źródłowy 
├── public/ # Zasoby statyczne 
├── dist/ # Dane wyjściowe kompilacji (wygenerowane) 
├── node_modules/ # Zależności (wygenerowane) 
├── tests/ # Pliki testowe 
├── docs/ # Dokumentacja 
├── .github/ # Przepływy pracy i szablony GitHub 
├── .vscode/ # Konfiguracja VS Code 
├── scripts/ # Skrypty kompilacji i narzędzi 
├── package.json # Metadane projektu i zależności 
├── tsconfig.json # Konfiguracja TypeScript 
├── .eslintrc.js # Konfiguracja ESLint 
├── .prettierrc # Konfiguracja Prettier 
├── .gitignore # Git ignoruje wzorce 
├── .env.example # Przykładowe zmienne środowiskowe 
└── README.md # Dokumentacja projektu 
``` 

### Struktura katalogu źródłowego 

``` 
src/ 
├── assets/ # Statyczne zasoby wymagające przetworzenia 
│ ├── images/ # Obrazy 
│ ├── fonts/ # Pliki czcionek 
│ └── styles/ # Globalne style 
│ 
├── components/ # Komponenty interfejsu użytkownika wielokrotnego użytku 
│ ├── common/ # Komponenty współdzielone w różnych funkcjach 
│ ├── layout/ # Komponenty układu 
│ └── ui/ # Podstawowe komponenty interfejsu użytkownika 
│ 
├── hooks/ # Niestandardowe haki React 
│ 
├── pages/ # Komponenty stron / komponenty tras 
│ 
├── features/ # Moduły oparte na funkcjach 
│ ├── feature1/ # Konkretna funkcja 
│ │ ├── components/ # Komponenty specyficzne dla funkcji 
│ │ ├── hooks/ # Haki specyficzne dla funkcji 
│ │ ├── api/ # Wywołania API specyficzne dla funkcji 
│ │ ├── utils/ # Narzędzia specyficzne dla funkcji 
│ │ ├── types/ # Typy specyficzne dla funkcji 
│ │ └── index.ts # Eksporty funkcji 
│ └── feature2/ # Inna funkcja 
│ 
├── services/ # Integracje usług 
│ ├── api/ # Klient API i punkty końcowe 
│ ├── auth/ # Usługa uwierzytelniania 
│ └── analytics/ # Usługa analityczna 
│ 
├── store/ # Zarządzanie stanem 
│ ├── slices/ # Wycinki Redux lub dostawcy kontekstu 
│ ├── actions/ # Twórcy akcji 
│ └── selectors/ # Selektory stanu 
│ 
├── utils/ # Funkcje narzędziowe 
│ ├── formatting/ # Narzędzia formatujące 
│ ├── validation/ # Narzędzia walidacyjne 
│ └── helpers/ # Funkcje pomocnicze 
│ 
├── types/ # Definicje typów TypeScript 
│ ├── api/ # Typy odpowiedzi API 
│ ├── models/ # Typy modeli danych 
│ └── common/ # Typ wspólny definicje 
│ 
├── constants/ # Stałe aplikacji 
│ 
├── i18n/ # Internacjonalizacja 
│ ├── locales/ # Pliki tłumaczeń 
│ └── config.ts # Konfiguracja i18n 
│ 
├── config/ # Konfiguracja aplikacji 
│ ├── routes.ts # Definicje tras 
│ └── settings.ts # Ustawienia aplikacji 
│ 
└── App.tsx # Główny komponent aplikacji 
``` 

## Konwencje nazewnictwa 

### Pliki i katalogi 

- **Komponenty React**: PascalCase z rozszerzeniem 
- `Button.tsx`, `UserProfile.tsx` 
- **Hooks**: camelCase z prefiksem `use` 
- `useAuth.ts`, `useFetch.ts` 
- **Utilities**: camelCase 
- `formatDate.ts`, `validateEmail.ts` 
- **Constants**: UPPER_SNAKE_CASE 
- `API_ENDPOINTS.ts`, `ROUTE_PATHS.ts` 
- **Types/Interfaces**: PascalCase z opisowymi nazwami 
- `UserData.ts`, `ApiResponse.ts` 
- **Test Files**: Taka sama nazwa jak plik testowany z sufiksem `.test` lub `.spec` 
- `Button.test.tsx`, `formatDate.spec.ts` 

### Organizacja komponentów 

- **Pliki komponentów**: Jeden komponent na plik 
- **Struktura komponentów**: 
```tsx 
// Importy 
import React from 'react'; 
import './styles.css'; 

// Typy 
interface ButtonProps { 
// ... 
} 

// Komponent 
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => { 
// ... 
return ( 
// JSX 
); 
}; 

// Funkcje pomocnicze specyficzne dla tego komponentu 
const helperFunction = () => { 
// ... 
}; ``` 

## Organizacja modułów 

### Kolejność importowania 

1. Biblioteki zewnętrzne 
2. Moduły wewnętrzne 
3. Komponenty 
4. Haki 
5. Narzędzia 
6. Typy 
7. Zasoby/style 

Przykład: 
```tsx 
// Biblioteki zewnętrzne 
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

// Moduły wewnętrzne 
import { API_ENDPOINTS } from '@/constants/api'; 
import { fetchData } from '@/services/api'; 

// Komponenty 
import { Button } from '@/components/ui'; 
import { Modal } from '@/components/common'; 

// Haki 
import { useAuth } from '@/hooks'; 

// Narzędzia 
import { formatDate } from '@/utils/formatting'; 

// Typy 
import type { UserData } from '@/types'; 

// Zasoby/style 
import './styles.css'; 
``` 

### Wzorce eksportu 

- Użyj nazwanych eksportów dla większości komponentów i funkcji 
- Użyj eksportów barrel (index.ts) w celu uproszczenia importów 
- Unikaj domyślnych eksportów, z wyjątkiem komponentów strony 

Przykład eksportu barrel: 
```tsx 
// components/ui/index.ts 
export * from './Button'; 
export * from './Input'; 
export * from './Card'; ``` 

## Pliki konfiguracyjne 

### Zmienne środowiskowe 

- Użyj plików `.env` do konfiguracji specyficznej dla środowiska 
- Dołącz `.env.example` do dokumentacji 
- Użyj plików specyficznych dla środowiska (`.env.development`, `.env.production`) 
- Nigdy nie zatwierdzaj poufnych wartości w kontroli wersji 

### Konfiguracja TypeScript 

- Użyj trybu ścisłego 
- Skonfiguruj aliasy ścieżek dla czystszych importów 
- Oddziel konfiguracje dla różnych środowisk, jeśli to konieczne 
- Dokumentuj nieoczywiste wybory konfiguracji 

### Zarządzanie pakietami 

- Użyj pliku blokady (package-lock.json, yarn.lock, pnpm-lock.yaml) 
- Dokumentuj wymaganą wersję Node.js 
- Grupuj zależności logicznie w package.json 
- Oddziel zależności deweloperskie od zależności produkcyjnych 

## Dokumentacja 

### Kod Dokumentacja 

- Dokumentuj złożone funkcje i komponenty 
- Użyj JSDoc do dokumentacji funkcji 
- Dokumentuj właściwości komponentów React 
- Dołącz przykłady komponentów wielokrotnego użytku 
- Dokumentuj wzorce zarządzania stanem 

### Dokumentacja projektu 

- Dołącz kompleksowy plik README.md 
- Dokumentuj proces konfiguracji i instalacji 
- Dołącz instrukcje dotyczące przepływu pracy programistycznej 
- Dokumentuj proces kompilacji i wdrażania 
- Utrzymuj plik CHANGELOG.md dla historii wersji 
- Dołącz wytyczne dotyczące wkładu 

## Najlepsze praktyki 

- Grupuj powiązane pliki razem 
- Utrzymuj małe i skoncentrowane pliki komponentów 
- Oddziel logikę biznesową od komponentów interfejsu użytkownika 
- Używaj aliasów ścieżek, aby uniknąć głębokich ścieżek importu 
- Utrzymuj spójną organizację plików w całym projekcie 
- Dokumentuj strukturę projektu dla nowych członków zespołu 
- Używaj generatorów kodu dla spójności, gdy jest to możliwe 
- Okresowo przeglądaj i refaktoryzuj strukturę projektu