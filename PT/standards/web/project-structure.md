# Padrões de Estrutura do Projeto

## Organização de Diretórios

### Estrutura Raiz

``` 
project-root/ 
├── src/ # Código-fonte 
├── public/ # Recursos estáticos 
├── dist/ # Saída da compilação (gerada) 
├── node_modules/ # Dependências (geradas) 
├── tests/ # Arquivos de teste 
├── docs/ # Documentação 
├── .github/ # Fluxos de trabalho e modelos do GitHub 
├── .vscode/ # Configuração do VS Code 
├── scripts/ # Scripts de compilação e utilitários 
├── package.json # Metadados e dependências do projeto 
├── tsconfig.json # Configuração do TypeScript
├── .eslintrc.js # Configuração do ESLint
├── .prettierrc # Configuração do Prettier
├── .gitignore # Padrões de Ignorância do Git
├── .env.example # Variáveis de ambiente de exemplo
└── README.md # Documentação do projeto
```

### Estrutura do Diretório de Origem

```
src/
├── assets/ # Ativos estáticos que requerem processamento
│ ├── images/ # Imagens
│ ├── fonts/ # Arquivos de fonte
│ └── styles/ # Estilos globais
│ 
├── components/ # Componentes de UI reutilizáveis
│ ├── common/ # Componentes compartilhados entre recursos
│ ├── layout/ # Componentes de layout
│ └── ui/ # Componentes básicos de UI
│ 
├── hooks/ # Hooks personalizados do React
│ 
├── pages/ # Componentes de página / componentes de rota
│ 
├── features/ # Módulos baseados em recursos
│ ├── feature1/ # Recurso específico
│ │ ├── components/ # Componentes específicos de recursos
│ │ ├── hooks/ # Hooks específicos de recursos
│ │ ├── api/ # API específica de recursos chamadas
│ │ ├── utils/ # Utilitários específicos de recursos
│ │ ├── types/ # Tipos específicos de recursos
│ │ └── index.ts # Exportações de recursos
│ └── feature2/ # Outro recurso
│ 
├── services/ # Integrações de serviços
│ ├── api/ # Cliente e endpoints da API
│ ├── auth/ # Serviço de autenticação
│ └── analytics/ # Serviço de análise
│ 
├── store/ # Gerenciamento de estado
│ ├── slices/ # Slices do Redux ou provedores de contexto
│ ├── actions/ # Criadores de ações 
│ └── selectors/ # Seletores de estado 
│ 
├── utils/ # Funções utilitárias 
│ ├── formatting/ # Utilitários de formatação 
│ ├── validation/ # Utilitários de validação 
│ └── helpers/ # Funções auxiliares 
│ 
├── types/ # Definições de tipos TypeScript 
│ ├── api/ # Tipos de resposta da API 
│ ├── models/ # Tipos de modelo de dados 
│ └── common/ # Definições de tipos comuns 
│ 
├── constants/ # Aplicação constantes
│ 
├── i18n/ # Internacionalização
│ ├── locales/ # Arquivos de tradução
│ └── config.ts # Configuração i18n
│ 
├── config/ # Configuração do aplicativo
│ ├── routes.ts # Definições de rota
│ └── settings.ts # Configurações do aplicativo
│ 
└── App.tsx # Componente principal do aplicativo
```

## Convenções de nomenclatura

### Arquivos e diretórios

- **Componentes React**: PascalCase com extensão
- `Button.tsx`, `UserProfile.tsx`
- **Hooks**: camelCase com 'use' prefixo
- `useAuth.ts`, `useFetch.ts`
- **Utilitários**: camelCase
- `formatDate.ts`, `validateEmail.ts`
- **Constantes**: UPPER_SNAKE_CASE
- `API_ENDPOINTS.ts`, `ROUTE_PATHS.ts`
- **Tipos/Interfaces**: PascalCase com nomes descritivos
- `UserData.ts`, `ApiResponse.ts`
- **Arquivos de Teste**: Mesmo nome do arquivo que está sendo testado com sufixo `.test` ou `.spec`
- `Button.test.tsx`, `formatDate.spec.ts`

### Organização dos Componentes

- **Arquivos de Componentes**: Um componente por arquivo
- **Estrutura dos Componentes**:
```tsx
// Importações
import React from 'react'; 
import './styles.css'; 

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

// Funções auxiliares específicas para este componente 
const helperFunction = () => { 
// ... 
}; 
``` 

## Organização dos Módulos

### Ordem de Importação

1. Bibliotecas externas
2. Módulos internos
3. Componentes
4. Ganchos
5. Utilitários
6. Tipos
7. Recursos/estilos

Exemplo:
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

// Utilitários
import { formatDate } from '@/utils/formatting';

// Tipos
import type { UserData } from '@/types';

// Recursos/estilos
import './styles.css';
``` 

### Padrões de Exportação

- Use exportações nomeadas para a maioria dos componentes e funções
- Use exportações de barril (index.ts) para simplificar as importações
- Evite exportações padrão, exceto para componentes de página

Exemplo de exportação de barril:
```tsx
// componentes/ui/index.ts
export * from './Button';
export * from './Input';
export * from './Card';
``` 

## Arquivos de Configuração

### Variáveis de Ambiente

- Use arquivos `.env` para configuração específica do ambiente
- Inclua `.env.example` na documentação
- Use arquivos específicos do ambiente (`.env.development`, `.env.production`)
- Nunca envie valores sensíveis para o controle de versão

### Configuração do TypeScript

- Use o modo estrito
- Configure aliases de caminho para importações mais limpas
- Separe as configurações para diferentes ambientes, se necessário
- Documente opções de configuração não óbvias

### Gerenciamento de Pacotes

- Use um arquivo de bloqueio (package-lock.json, yarn.lock, pnpm-lock.yaml)
- Documente a versão necessária do Node.js
- Agrupe as dependências logicamente em package.json
- Separe as dependências de desenvolvimento das dependências de produção

## Documentação

### Documentação do Código

- Documente funções e componentes complexos
- Use JSDoc para Documentação de funções
- Documentar propriedades para componentes React
- Incluir exemplos de componentes reutilizáveis
- Documentar padrões de gerenciamento de estado

### Documentação do Projeto

- Incluir um README.md abrangente
- Documentar o processo de configuração e instalação
- Incluir instruções do fluxo de trabalho de desenvolvimento
- Documentar o processo de compilação e implantação
- Manter um CHANGELOG.md para histórico de versões
- Incluir diretrizes de contribuição

## Melhores Práticas

- Agrupar arquivos relacionados
- Manter os arquivos de componentes pequenos e focados
- Separar a lógica de negócios dos componentes de UI
- Usar aliases de caminho para evitar caminhos de importação profundos
- Manter a organização consistente dos arquivos em todo o projeto
- Documentar a estrutura do projeto para novos membros da equipe
- Usar geradores de código para consistência, quando aplicável
- Revisar e refatorar a estrutura do projeto periodicamente