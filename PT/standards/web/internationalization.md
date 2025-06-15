# Padrões de Internacionalização (i18n)

## Princípios Fundamentais

- Projetar para públicos globais desde o início
- Separar o conteúdo do código
- Suportar vários idiomas e localidades
- Respeitar as diferenças e sensibilidades culturais
- Implementar detecção automática de idioma
- Permitir seleção manual de idioma
- Testar com usuários reais de mercados-alvo

## Idioma e Conteúdo

### Gerenciamento de Texto

- Armazenar todo o texto voltado para o usuário em arquivos de recursos
- Nunca codifique sequências de texto em componentes
- Usar chaves descritivas exclusivas para recursos de texto
- Organizar traduções por recurso ou página
- Suportar regras de pluralização para diferentes idiomas
- Lidar com variações específicas de gênero
- Suportar idiomas da direita para a esquerda (RTL)
- Implementar mecanismos de fallback para traduções ausentes

### Processo de Tradução

- Fornecer contexto para tradutores
- Incluir descrições de variáveis/espaços reservados
- Utilizar serviços de tradução profissionais
- Implementar sistemas de memória de tradução
- Permitir expansão de texto (alguns idiomas exigem mais espaço)
- Fornecer capturas de tela para contextualizar
- Implementar um processo de revisão para traduções
- Apoiar atualizações contínuas de tradução

### Considerações sobre o Conteúdo

- Evitar metáforas ou expressões idiomáticas culturalmente específicas
- Estar ciente do simbolismo das cores em diferentes culturas
- Considerar diferentes formatos de nome e padrões de tratamento
- Respeitar sensibilidades e tabus culturais
- Adaptar o conteúdo aos mercados locais quando necessário
- Usar imagens culturalmente neutras
- Considerar a direção de leitura (LTR vs RTL)
- Evitar gírias e coloquialismos

## Implementação Técnica

### Framework e Bibliotecas

- Utilizar bibliotecas i18n estabelecidas:
- react-i18next / i18next (React)
- vue-i18n (Vue)
- angular/localize (Angular)
- next-intl (Next.js)
- Format.js (React)
- Implementar a detecção adequada de idioma
- Suportar a troca de idioma sem Recarregamento de página
- Configurar idiomas alternativos
- Implementar carregamento lento para traduções
- Armazenar traduções em cache para melhor desempenho
- Suportar chaves de tradução aninhadas
- Implementar pluralização e formatação

### Estrutura do código

- Separar os arquivos de tradução por idioma
- Usar JSON ou YAML para recursos de tradução
- Implementar namespaces para aplicativos grandes
- Manter as chaves de tradução organizadas e sustentáveis
- Seguir convenções de nomenclatura consistentes para as chaves
- Documentar formatações ou variáveis especiais
- Implementar segurança de tipos para chaves de tradução (TypeScript)
- Suportar a geração dinâmica de chaves quando necessário

### Formatação

#### Data e hora

- Usar bibliotecas que suportam formatos internacionais de data
- Exibir datas no formato preferido do usuário
- Considerar fusos horários e horário de verão
- Formatar datas de acordo com as convenções locais
- Suportar diferentes sistemas de calendário quando necessário
- Usar o formato ISO para troca de dados
- Exibir horas relativas adequadamente por cultura

#### Números e moeda

- Formatar números de acordo com Convenções de localidade
- Use separadores decimais e de milhares adequados
- Formate moedas com símbolos apropriados
- Posicione os símbolos monetários corretamente de acordo com a localidade
- Suporte a diferentes sistemas de numeração
- Formate porcentagens de acordo com a localidade
- Considere taxas de câmbio para aplicações multirregionais

#### Endereços e Números de Telefone

- Suporte a diferentes formatos de endereço
- Acomoda vários formatos de CEP
- Lide com números de telefone internacionais (formato E.164)
- Formate números de telefone de acordo com as convenções locais
- Suporte a diferentes convenções de ordenação de nomes
- Considere títulos e honoríficos em diferentes culturas
- Valide endereços de acordo com regras específicas de cada país

## Considerações sobre a Interface do Usuário

### Layout e Design

- Crie layouts flexíveis que acomodem a expansão do texto
- Suporte às direções de texto LTR e RTL
- Implemente suporte a texto bidirecional (bidirecional)
- Teste layouts com sequências de texto mais longas
- Evite contêineres de largura fixa para texto
- Considere variações no tamanho da fonte entre os idiomas
- Teste com conteúdo traduzido real, não lorem ipsum
- Implementar CSS específico para cada idioma quando necessário

### Tipografia

- Usar fontes compatíveis com vários idiomas
- Incluir fontes alternativas apropriadas
- Considerar conjuntos de caracteres para diferentes idiomas
- Suportar caracteres especiais e diacríticos
- Ajustar a altura das linhas para diferentes escritas
- Testar a legibilidade em diferentes idiomas
- Considerar texto vertical para alguns idiomas do Leste Asiático
- Usar Unicode corretamente

### Navegação e Controles

- Traduzir itens e controles de navegação
- Ajustar a navegação para idiomas da direita para a esquerda (RTL)
- Considerar padrões culturais de leitura
- Garantir que os ícones sejam culturalmente neutros
- Testar atalhos de teclado em diferentes layouts de teclado
- Fornecer ajuda e documentação localizadas
- Traduzir mensagens de erro e notificações
- Localizar a funcionalidade de pesquisa

## Testes e Garantia de Qualidade

### Estratégia de Testes

- Testar com falantes nativos
- Verificar traduções em contexto
- Testar expansão e truncamento de texto
- Validar a formatação de data, número e moeda
- Testar layouts da direita para a esquerda (RTL) Completamente
- Verifique a funcionalidade de troca de idioma
- Teste com diferentes configurações de localidade
- Implemente testes automatizados de i18n

### Problemas Comuns

- Verifique se há strings codificadas
- Verifique a pluralização correta
- Procure por strings concatenadas
- Teste se há problemas de manipulação de Unicode
- Verifique a classificação e a ordenação
- Verifique se há suposições culturais na lógica
- Teste com palavras e strings longas
- Verifique a manipulação de caracteres especiais

### Ferramentas e Automação

- Implemente o linting para problemas de i18n
- Use sistemas de gerenciamento de tradução
- Automatize a geração de capturas de tela para contexto
- Implemente pseudolocalização para testes
- Use testes automatizados para problemas de layout
- Acompanhe a cobertura e a qualidade da tradução
- Implemente verificações de CI/CD para i18n
- Monitore a ausência de traduções

## Jurídico e Conformidade

- Pesquise os requisitos legais locais
- Adapte as políticas de privacidade para diferentes regiões
- Considere o GDPR e outras regulamentações de privacidade
- Adapte os termos de serviço para mercados locais
- Esteja ciente das restrições de conteúdo por país
- Considere os requisitos de acessibilidade por região
- Documente as medidas de conformidade
- Consulte especialistas jurídicos para os principais mercados