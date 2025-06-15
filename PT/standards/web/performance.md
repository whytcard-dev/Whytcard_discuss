# Padrões de Desempenho Web

## Metas de Desempenho

- Pontuação do Lighthouse: 90+ para todas as métricas
- Metas do Core Web Vitals:
- LCP (Largest Contentful Paint): < 2,5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0,1
- INP (Interaction to Next Paint): < 200ms
- Tempo de Interação: < 3s
- First Contentful Paint: < 1,8s
- Peso total da página: < 1MB (idealmente < 500KB)
- Solicitações HTTP: < 50 por página

## Otimização de Imagens

- Use formatos WebP/AVIF com fallbacks para navegadores mais antigos
- Implemente imagens responsivas com os atributos `srcset` e `sizes`
- Carregue imagens lentamente abaixo da dobra
- Dimensione as imagens corretamente (evite exibir imagens grandes em escala) via CSS)
- Use CDN de imagens para redimensionamento dinâmico quando possível
- Otimize SVGs e remova metadados desnecessários
- Compacte todas as imagens com ferramentas como ImageOptim, TinyPNG ou Squoosh
- Considere a técnica de desfoque para carregamento progressivo

## Otimização de JavaScript

- Implemente divisão de código e importações dinâmicas
- Adie JavaScript não crítico
- Use tree-shaking para eliminar código morto
- Minifique e compacte arquivos JavaScript
- Evite JavaScript que bloqueie a renderização
- Use web workers para tarefas que exigem uso intensivo de CPU
- Implemente priorização de requisições
- Otimize scripts de terceiros e use atributos async/defer

## Otimização de CSS

- Minimize e inline CSS crítico
- Remova CSS não utilizado com ferramentas como PurgeCSS
- Evite importações de CSS (use concatenação)
- Use contenção de CSS para componentes independentes
- Otimize seletores de CSS para desempenho
- Considere o desempenho do CSS em JS Implicações
- Usar variáveis CSS para melhor manutenibilidade
- Implementar divisão de código CSS para aplicativos grandes

## Otimização de Fontes

- Usar fontes do sistema sempre que possível
- Implementar font-display: swap ou opcional
- Subconjunto de fontes para incluir apenas caracteres necessários
- Hospedar fontes em vez de usar serviços de terceiros
- Pré-carregar fontes críticas
- Usar fontes variáveis para múltiplas espessuras/estilos
- Limitar variações de fontes (espessuras, estilos)

## Estratégia de Cache

- Implementar políticas de cache eficazes
- Cache longo para ativos estáticos (1 ano ou mais)
- Cache curto/sem cache para HTML
- Usar nomes de arquivo versionados ou strings de consulta para bloqueio de cache
- Implementar service workers para suporte offline
- Usar localStorage/IndexedDB para cache do lado do cliente
- Configurar cabeçalhos de cache HTTP corretamente
- Implementar cache CDN

## Otimização de Servidores

- Habilitar HTTP/2 ou HTTP/3
- Implementar compactação do lado do servidor (Brotli/Gzip)
- Use CDN para entrega global de conteúdo
- Otimize as respostas da API (paginação, seleção de campos)
- Implemente computação de ponta para conteúdo dinâmico
- Configure as configurações CORS adequadas
- Otimize o Tempo até o Primeiro Byte (TTFB)
- Use dicas de pré-conexão, pré-busca e pré-carregamento HTTP

## Otimização Mobile

- Priorize o desempenho mobile (abordagem mobile-first)
- Otimize os alvos de toque (mín. 44×44px)
- Reduza a carga útil da rede para dispositivos móveis
- Implemente padrões de design responsivo
- Teste em dispositivos móveis reais, não apenas em emuladores
- Considere a redução de movimento para animações
- Otimize para cenários offline/de baixa conectividade

## Monitoramento e Testes

- Implemente o Monitoramento de Usuário Real (RUM)
- Configure o monitoramento sintético para fluxos críticos de usuários
- Use o WebPageTest para análises detalhadas de desempenho
- Monitore os Core Web Vitals no Google Search Console
- Configure orçamentos e alertas de desempenho
- Realize o desempenho regularmente Auditorias
- Implementar testes A/B para melhorias de desempenho
- Usar o painel de desempenho do Chrome DevTools para criação de perfil

## Técnicas Avançadas

- Implementar dicas de recursos (pré-conexão, pré-carregamento, pré-busca)
- Usar o observador de interseção para carregamento lento
- Considerar renderização do lado do servidor ou geração de site estático
- Implementar o padrão "stale-while-revalidate"
- Usar requestIdleCallback para tarefas não críticas
- Considerar mapas de importação para carregamento de módulos
- Implementar pré-busca preditiva com base no comportamento do usuário
- Usar dicas de prioridade para recursos críticos