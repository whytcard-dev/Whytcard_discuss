# Padrões de Segurança Web

## Princípios Fundamentais de Segurança

- Defesa em profundidade (múltiplas camadas de segurança)
- Princípio do menor privilégio
- Seguro por design e padrão
- Testes e auditorias de segurança regulares
- Manter as dependências de segurança atualizadas
- Falhas seguras (padrões seguros)
- Mediação completa (verificar cada solicitação)
- Educação em segurança para todos os membros da equipe

## Autenticação e Autorização

### Autenticação

- Implementar políticas de senha fortes
- Comprimento mínimo: 12 caracteres
- Exigir combinação de caracteres, números e símbolos
- Verificar em listas de senhas comuns
- Suportar autenticação multifator (MFA)
- Usar gerenciamento de sessão seguro
- Cookies somente HTTP
- Sinalizador seguro para HTTPS
- Atributo SameSite
- Expiração apropriada
- Implementar bloqueio de conta após tentativas malsucedidas
- Fluxos seguros de redefinição de senha
- Usar armazenamento seguro de senhas (bcrypt/Argon2)
- Considerar opções sem senha (WebAuthn, links mágicos)

### Autorização

- Implementar controle de acesso baseado em funções (RBAC)
- Usar controle de acesso baseado em atributos para permissões complexas
- Validar autorização em cada solicitação
- Implementar verificações de controle de acesso adequadas
- Usar tratamento seguro de sessão
- Implementar autorização de API (OAuth 2.0, JWT)
- Evitar referências diretas a objetos
- Registrar todas as falhas de controle de acesso

## Proteção de Dados

### Dados Sensíveis

- Identificar e classificar dados sensíveis
- Criptografar dados sensíveis em repouso
- Usar TLS 1.3 para dados em trânsito
- Implementar gerenciamento adequado de chaves
- Minimizar a coleta de dados sensíveis
- Aplicar princípios de minimização de dados
- Implementar exclusão segura de dados
- Usar armazenamento seguro para chaves e segredos de API

### Validação de Entrada

- Validar todas as entradas no lado do servidor
- Usar consultas parametrizadas para acesso ao banco de dados
- Implementar sanitização de entradas
- Validar para tipos de dados adequados, comprimento, formato
- Usar listas de permissão em vez de listas de bloqueio
- Implementar codificação de saída específica ao contexto
- Validar uploads de arquivos (tipo, tamanho, conteúdo)
- Implementar limitação de taxa para entradas

## Prevenção de Vulnerabilidades Comuns

### Prevenção de Injeção

- Usar consultas/declarações preparadas parametrizadas
- Aplicar ORM com escape adequado
- Validar e sanitizar todas as entradas
- Implementar codificação de saída sensível ao contexto
- Usar APIs seguras que evitem injeção de interpretador

### Prevenção de XSS

- Implementar Política de Segurança de Conteúdo (CSP)
- Usar codificação de saída automática
- Aplicar codificação específica ao contexto
- Sanitizar entrada HTML
- Usar frameworks modernos com proteção XSS integrada
- Validar URLs em redirecionamentos
- Aplicar sinalizador HTTPOnly a cookies sensíveis

### Prevenção de CSRF

- Implementar tokens anti-CSRF
- Usar atributo de cookie SameSite
- Verificar origem e referenciador Cabeçalhos
- Exigir reautenticação para ações sensíveis
- Usar configuração CORS adequada

### Cabeçalhos de Segurança

- Política de Segurança de Conteúdo (CSP)
- Opções de Tipo de Conteúdo X: nosniff
- Segurança de Transporte Estrita (HSTS)
- Opções de Quadro X
- Política de Referência
- Política de Permissões
- Cabeçalhos de Controle de Cache para dados sensíveis
- Limpar Dados do Site para logout

## Segurança da Infraestrutura

### Segurança do Servidor

- Manter o software do servidor atualizado
- Usar configurações seguras do servidor
- Implementar regras de firewall adequadas
- Habilitar somente HTTPS (redirecionar HTTP para HTTPS)
- Configurar as configurações de TLS adequadas
- Desabilitar serviços desnecessários
- Usar módulos de servidor web com foco em segurança
- Implementar limitação de taxa e proteção contra DDoS

### Segurança da API

- Usar HTTPS para todas as APIs endpoints
- Implementar autenticação adequada
- Aplicar limitação de taxa
- Validar payloads de requisições
- Retornar códigos de status apropriados
- Evitar a exposição de informações confidenciais em respostas
- Usar chaves de API para comunicação entre serviços
- Documentar requisitos de segurança para consumidores de API

### Gerenciamento de Dependências

- Verificar regularmente dependências vulneráveis
- Usar arquivos de bloqueio para fixar versões de dependências
- Implementar varredura automatizada de vulnerabilidades
- Atualizar dependências prontamente
- Minimizar o uso de dependências
- Verificar a integridade das dependências (checksums)
- Monitorar ataques à cadeia de suprimentos
- Ter um plano de resposta a vulnerabilidades

## Testes de Segurança

### Análise Estática

- Implementar ferramentas SAST automatizadas
- Integrar linting de segurança em CI/CD
- Verificar segredos codificados
- Analisar o código em busca de antipadrões de segurança
- Validar configurações de segurança
- Verificar dependências desatualizadas
- Aplicar padrões de codificação seguros

### Testes Dinâmicos

- Realizar testes de penetração regulares
- Implementar varredura DAST automatizada
- Utilizar testes interativos de segurança de aplicativos
- Realizar avaliações regulares de vulnerabilidades
- Testar fluxos de autenticação e autorização
- Verificar cabeçalhos e configurações de segurança
- Simular cenários comuns de ataque

## Monitoramento e Resposta de Segurança

### Registro e Monitoramento

- Implementar registro de segurança abrangente
- Registrar eventos de autenticação
- Registrar falhas de controle de acesso
- Monitorar atividades suspeitas
- Implementar alertas em tempo real
- Utilizar gerenciamento centralizado de registros
- Garantir que os registros sejam à prova de violação
- Reter registros por períodos apropriados

### Resposta a Incidentes

- Desenvolver um plano de resposta a incidentes
- Definir funções e responsabilidades
- Estabelecer protocolos de comunicação
- Documentar procedimentos de contenção
- Implementar recursos de análise forense
- Conduzir revisões pós-incidente
- Praticar cenários de resposta a incidentes
- Manter contato com a comunidade de segurança

## Conformidade e Privacidade

### Conformidade Regulatória

- Identificar as regulamentações aplicáveis (GDPR, CCPA, etc.)
- Implementar os controles de segurança necessários
- Realizar avaliações regulares de conformidade
- Documentar as medidas de conformidade
- Treinar a equipe sobre os requisitos de conformidade
- Implementar a privacidade desde o design
- Manter a documentação necessária

### Considerações sobre Privacidade

- Implementar políticas de privacidade claras
- Obter o consentimento adequado para a coleta de dados
- Fornecer mecanismos de acesso e exclusão de dados
- Minimizar a coleta e retenção de dados
- Implementar a portabilidade de dados
- Realizar avaliações de impacto na privacidade
- Considerar a privacidade em todas as decisões de design