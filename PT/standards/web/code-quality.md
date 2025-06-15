# Padrões de Qualidade de Código

## Princípios Fundamentais

- Escreva código limpo, sustentável e autodocumentado
- Siga os princípios SOLID e DRY
- Mantenha as funções pequenas e focadas (responsabilidade única)
- Use nomenclatura descritiva para variáveis, funções e classes
- Mantenha um estilo de código consistente em todo o projeto
- Documente lógica complexa e APIs públicas
- Escreva código para humanos, não apenas para máquinas

## Padrões JavaScript/TypeScript

### Configuração do TypeScript

- Use o modo estrito (`"strict": true`)
- Habilite todas as opções de verificação de tipo recomendadas
- Configure a resolução adequada do módulo
- Defina a versão de destino apropriada do ECMAScript
- Especifique padrões de inclusão/exclusão
- Use aliases de caminho para importações mais limpas

### Convenções de Nomenclatura

- **Variáveis/Funções**: camelCase (`getUserData`, `calculateTotal`)
- **Classes/Interfaces/Tipos**: PascalCase (`UserProfile`, `ApiResponse`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_URL`)
- **Propriedades privadas**: Use o prefixo `#` ou a convenção `_` (`#privateField`, `_privateMethod`)
- **Variáveis booleanas**: Use os prefixos "is", "has", "can" (`isActive`, `hasPermission`)
- **Arquivos de componentes**: PascalCase com extensão (`UserCard.tsx`)
- **Arquivos de utilitários**: camelCase com extensão (`formatDate.ts`)

### Organização do código

- Uma classe/componente por arquivo
- Agrupar importações por externo/interno
- Ordenar as importações em ordem alfabética
- Usar exportações em barril (`index.ts`) para funcionalidades relacionadas
- Organizar o código por Recurso/módulo
- Mantenha os arquivos com menos de 400 linhas (divida-os se forem maiores)
- Mantenha as funções com menos de 50 linhas
- Aninhamento máximo: 3-4 níveis de profundidade

### Melhores Práticas

- Prefira a imutabilidade (const, readonly, Object.freeze)
- Use encadeamento opcional e coalescência de nulos
- Implemente o tratamento de erros adequado
- Evite qualquer tipo, exceto quando necessário
- Use proteções de tipo para verificação de tipo em tempo de execução
- Prefira async/await em vez de promessas brutas
- Evite números mágicos e strings (use constantes)
- Implemente verificações de nulos/indefinidos adequadas
- Use retornos antecipados para reduzir o aninhamento

## Padrões React

### Estrutura de Componentes

- Prefira componentes funcionais com ganchos
- Use exportações nomeadas para componentes
- Implemente a validação de propriedades com TypeScript
- Extraia lógica complexa para ganchos personalizados
- Mantenha os componentes focados nas preocupações da UI
- Implemente limites de erro adequados
- Use React.memo para otimização de desempenho
- Extraia componentes reutilizáveis

### Gerenciamento de Estado

- Use o estado local para dados específicos do componente
- Use o contexto para o estado compartilhado entre os componentes
- Considere o gerenciamento de estado externo para aplicativos complexos
- Mantenha o estado normalizado e mínimo
- Implemente a inicialização de estado adequada
- Use redutores para lógica de estado complexa
- Evite a perfuração de props (use composição ou contexto)

### Otimização de Desempenho

- Use React.memo para componentes puros
- Implemente useMemo para cálculos caros
- Use useCallback para memorização de funções
- Virtualize listas longas (react-window, react-virtualized)
- Implemente arrays de dependências adequados em hooks
- Evite re-renderizações desnecessárias
- Use o React Profiler para identificar gargalos

## Padrões de Teste

### Teste Unitário

- Teste toda a lógica de negócios e utilitários
- Use Jest ou Vitest como executor de testes
- Implemente a simulação adequada de dependências
- Use a Biblioteca de Testes para o componente Testes
- Seguir o padrão AAA (Arrange, Act, Assert)
- Escrever nomes descritivos para os testes
- Visar uma cobertura de código superior a 80%
- Testar casos extremos e cenários de erro

### Testes de Integração

- Testar interações de componentes
- Testar envios de formulários e fluxos de usuários
- Usar MSW para simulação de API
- Testar roteamento e navegação
- Verificar mudanças de estado
- Testar com dados realistas

### Testes de Ponta a Ponta

- Usar Cypress ou Playwright
- Testar jornadas críticas do usuário
- Testar em múltiplos navegadores
- Implementar isolamento de teste adequado
- Usar atributos de dados para seletores de teste
- Implementar lógica de repetição para testes instáveis
- Testar acessibilidade

## Padrões de Revisão de Código

### Processo

- Todo o código deve ser revisado antes do merge
- Verificações automatizadas devem ser aprovadas antes da revisão
- Usar modelos de pull request
- Manter PRs pequenos e focados
- Responder aos comentários da revisão prontamente
- Resolva todos os comentários antes da mesclagem
- Comprima os commits antes da mesclagem

### Lista de Verificação de Revisão

- O código segue os padrões do projeto
- Os testes são incluídos e aprovados
- A documentação é atualizada
- Nenhuma vulnerabilidade de segurança
- Implicações de desempenho consideradas
- Requisitos de acessibilidade atendidos
- Casos extremos tratados
- Nenhum código ou dependências desnecessárias

## Ferramentas

### Linting e Formatação

- ESLint com regras apropriadas
- Prettier para formatação consistente
- Husky para hooks de pré-commit
- lint-staged para linting incremental
- Compilador TypeScript para verificação de tipos
- Stylelint para CSS/SCSS

### Análise Estática

- SonarQube ou CodeClimate
- Monitoramento de métricas de complexidade
- Detecção de código duplicado
- Varredura de vulnerabilidades de segurança
- Análise do tamanho do pacote
- Detecção de código não utilizado

### Integração CI/CD

- Executar todas as verificações em cada PR
- Bloquear a mesclagem se as verificações falharem
- Gerar e publicar relatórios de cobertura de testes
- Implementar testes de regressão de desempenho
- Automatizar atualizações de dependências
- Implantar ambientes de pré-visualização