# Padrões de Teste Web

## Filosofia de Teste

- Teste cedo e frequentemente
- Automatize os testes sempre que possível
- Teste em níveis apropriados (unidade, integração, e2e)
- Escreva testes sustentáveis e confiáveis
- Teste caminhos felizes e casos extremos
- Use testes para prevenir regressões
- Priorize os testes com base no impacto nos negócios
- Trate o código de teste com o mesmo cuidado que o código de produção

## Tipos e Cobertura de Teste

### Teste Unitário

- **Alvo**: Funções, componentes e módulos individuais
- **Meta de Cobertura**: 80% ou mais da lógica de negócios e utilitários
- **Ferramentas**: Jest, Vitest, Biblioteca de Testes React
- **Melhores Práticas**:
- Siga o padrão AAA (Arrange, Act, Assert)
- Uma asserção por teste sempre que possível
- Simule dependências externas
- Teste casos extremos e condições de erro
- Mantenha os testes rápidos (< 100 ms) por teste)
- Use nomes de teste descritivos
- Isole os testes uns dos outros

### Teste de Integração

- **Alvo**: Interações entre componentes e serviços
- **Objetivo de Cobertura**: Fluxos críticos do usuário e interações de componentes
- **Ferramentas**: Biblioteca de Testes React, MSW, Superteste
- **Melhores Práticas**:
- Testar composições de componentes
- Testar envios de formulários
- Simular respostas da API
- Testar alterações de estado
- Verificar atualizações do DOM
- Testar roteamento e navegação
- Usar dados de teste realistas

### Teste de Ponta a Ponta

- **Alvo**: Completar os fluxos do usuário da IU ao backend
- **Objetivo de Cobertura**: Caminhos críticos de negócios e jornadas do usuário
- **Ferramentas**: Cypress, Playwright
- **Melhores Práticas**:
- Foco nas jornadas críticas do usuário
- Testar em vários navegadores
- Usar seletores estáveis (data-testid)
- Configurar Ambientes de teste isolados
- Gerenciar dados de teste de forma eficaz
- Fazer capturas de tela em caso de falhas
- Implementar lógica de repetição para testes instáveis

### Teste de Regressão Visual

- **Alvo**: Aparência e layout da interface do usuário
- **Meta de Cobertura**: Principais componentes e páginas da interface do usuário
- **Ferramentas**: Percy, Chromatic, Playwright
- **Melhores Práticas**:
- Capturar capturas de tela de base
- Testar em diferentes viewports
- Ignorar conteúdo dinâmico
- Revisar as alterações visuais cuidadosamente
- Testar modos claro/escuro
- Testar com diferentes comprimentos de conteúdo
- Integrar com o pipeline de CI/CD

### Teste de Acessibilidade

- **Alvo**: Conformidade com as WCAG e problemas de acessibilidade
- **Meta de Cobertura**: Todos os componentes e páginas voltados para o usuário
- **Ferramentas**: axe, Lighthouse, WAVE
- **Melhores Práticas**:
- Testar a navegação pelo teclado
- Verificar a compatibilidade com o leitor de tela
- Verificar as cores Contraste
- Gerenciamento do foco do teste
- Verificação dos atributos ARIA
- Teste com tecnologias assistivas
- Automatização das verificações básicas de acessibilidade

### Teste de Desempenho

- **Meta**: Tempos de carregamento de página, desempenho de renderização
- **Meta de Cobertura**: Páginas principais e caminhos críticos do usuário
- **Ferramentas**: Lighthouse, WebPageTest, k6
- **Melhores Práticas**:
- Mensuração dos Core Web Vitals
- Teste em dispositivos de baixo custo
- Simulação de limitação de rede
- Monitoramento do tamanho do pacote
- Teste com cenários realistas de cache
- Mensuração do tempo de interação
- Definição de orçamentos de desempenho

## Práticas de Teste

### Organização do Teste

- Agrupe os testes logicamente por recurso ou componente
- Use nomes de arquivo descritivos e descrições de teste
- Separe os utilitários e acessórios de teste
- Organize os testes em uma hierarquia que espelhe a base de código
- Mantenha os arquivos de teste próximos ao código que eles testam
- Use convenções de nomenclatura consistentes
- Unidade separada, Integração e testes e2e

### Gerenciamento de Dados de Teste

- Use fábricas ou construtores para dados de teste
- Evite dados de teste codificados
- Use dados realistas que correspondam aos padrões de produção
- Redefina o estado do teste entre os testes
- Isole os ambientes de teste
- Considere a privacidade dos dados nos dados de teste
- Use dados aleatórios semeados para casos extremos

### Simulação e Stubbing

- Simule dependências externas (APIs, serviços)
- Use respostas de simulação realistas
- Redefina simulações entre os testes
- Evite simulação excessiva
- Simule no nível apropriado
- Documente o comportamento da simulação
- Use MSW para simulação de API

### Integração Contínua

- Execute testes em cada solicitação de pull
- Implemente a execução paralela de testes
- Configure relatórios e painéis de teste
- Configure notificações de falha de teste
- Implemente novas tentativas de teste para testes instáveis
- Armazene em cache as dependências de teste
- Execute diferentes tipos de teste em estágios apropriados

## Desenvolvimento Orientado a Testes (TDD)

- Escreva testes antes de implementar funcionalidades
- Siga o ciclo Vermelho-Verde-Refatoração
- Comece com casos de teste simples
- Adicione complexidade incrementalmente
- Use testes para direcionar o design
- Refatore os testes conforme o código evolui
- Concentre-se no comportamento, não na implementação

## Manutenção de Testes

- Revise e atualize os testes regularmente
- Remova ou corrija testes instáveis
- Refatore os testes com alterações no código
- Monitore o desempenho dos testes
- Analise a cobertura dos testes regularmente
- Documente a estratégia de testes
- Treine os membros da equipe sobre as práticas de teste

## Testes Especializados

### Testes de API

- Teste todos os endpoints da API
- Verifique os esquemas de solicitação/resposta
- Teste a autenticação e autorização
- Teste o tratamento de erros e os códigos de status
- Valide a lógica de negócios
- Teste a limitação de taxa e as cotas
- Documente os casos de teste da API

### Testes de Gerenciamento de Estado

- Teste as transições de estado
- Verifique o estado inicial
- Teste os redutores e ações
- Teste os seletores e derivados estado
- Simular dependências externas
- Testar alterações de estado assíncronas
- Verificar persistência de estado

### Teste de Formulário

- Testar envios de formulário
- Validar entradas de formulário
- Testar estados de erro
- Testar funcionalidade de redefinição de formulário
- Testar lógica condicional de formulário
- Verificar acessibilidade de elementos de formulário
- Testar formulário com navegação por teclado

### Teste de Segurança

- Testar fluxos de autenticação
- Verificar verificações de autorização
- Testar vulnerabilidades comuns (XSS, CSRF)
- Validar sanitização de entrada
- Testar segurança de upload de arquivo
- Verificar cabeçalhos seguros
- Testar com OWASP Top 10