# PromoPilot

**Dashboard de análise de rentabilidade de promoções comerciais, com assistente conversacional e filtros interativos.**

O PromoPilot é uma aplicação frontend desenvolvida para apoiar a análise de promoções de produtos. A solução transforma dados comerciais em indicadores de rentabilidade, identifica produtos com margens reduzidas ou negativas e permite consultar os resultados por meio de um assistente conversacional.

O projeto foi construído com foco em **organização por funcionalidades, separação de responsabilidades, tipagem estática, validação de dados e testes automatizados**.

## Funcionalidades

### Dashboard comercial

- Indicadores de produtos válidos, margem média, produtos em atenção e produtos em prejuízo.
- Tabela com custo, preço atual, preço promocional, desconto, margem e lucro unitário.
- Classificação visual dos produtos por rentabilidade.
- Pesquisa por nome ou SKU.
- Filtro por classificação comercial.
- Identificação e apresentação de registros inválidos.
- Estados vazios e layout adaptado a diferentes tamanhos de tela.

### Assistente comercial

O PromoPilot possui um assistente conversacional que permite consultar os dados analisados utilizando perguntas em linguagem natural.

Entre as interações disponíveis estão:

- Solicitar um resumo das promoções.
- Identificar produtos em prejuízo.
- Consultar produtos com margem baixa.
- Aplicar filtros diretamente na tabela.
- Limpar filtros por comandos reconhecidos.

O assistente também apresenta sugestões iniciais de perguntas para facilitar a descoberta das funcionalidades.

**Importante:** o assistente utiliza interpretação determinística de intenções e respostas baseadas nas regras de negócio. Não utiliza modelos de linguagem generativa nem APIs externas de inteligência artificial.

## Tecnologias

| Tecnologia | Utilização |
|---|---|
| React 19 | Construção da interface |
| TypeScript | Tipagem estática |
| Vite 8 | Ambiente de desenvolvimento e build |
| Material UI 9 | Componentes visuais e sistema de interface |
| Zustand 5 | Gerenciamento de estado compartilhado |
| Zod 4 | Validação dos dados comerciais |
| React ChatBotify 2 | Interface conversacional |
| Vitest | Testes automatizados |
| ESLint | Análise estática do código |

## Arquitetura

A aplicação utiliza uma organização orientada a funcionalidades (*feature-based*), mantendo as regras comerciais separadas dos componentes de interface.

```text
src/
├── app/
│   ├── App.tsx
│   └── theme.ts
│
├── features/
│   ├── assistant/
│   │   ├── components/
│   │   │   └── AssistantChat.tsx
│   │   └── domain/
│   │       ├── assistant.types.ts
│   │       ├── generateAssistantResponse.ts
│   │       ├── interpretMessage.ts
│   │       ├── normalizeMessage.ts
│   │       └── processAssistantMessage.ts
│   │
│   └── promotions/
│       ├── components/
│       │   ├── Dashboard.tsx
│       │   ├── InvalidPromotions.tsx
│       │   ├── MetricCard.tsx
│       │   ├── PromotionsFilters.tsx
│       │   ├── PromotionsTable.tsx
│       │   └── PromotionStatusChip.tsx
│       ├── data/
│       │   └── products.json
│       ├── domain/
│       │   ├── analyzePromotion.ts
│       │   ├── analyzePromotions.ts
│       │   ├── promotion.schema.ts
│       │   ├── promotion.types.ts
│       │   └── validatePromotions.ts
│       ├── store/
│       │   └── usePromotionFiltersStore.ts
│       └── utils/
│           └── formatters.ts
│
└── main.tsx
```

Os testes estão organizados próximos aos módulos correspondentes.

### Responsabilidades das camadas

**Domain:** concentra validação, cálculos comerciais, classificação de produtos e interpretação de mensagens. As regras são mantidas separadas da renderização da interface.

**Components:** implementa a apresentação dos dados e a interação com o usuário por meio do React e Material UI.

**Store:** centraliza o estado compartilhado dos filtros com Zustand, permitindo que o dashboard e o assistente utilizem a mesma fonte de verdade.

**Data:** contém o conjunto de produtos demonstrativos utilizado nas análises.

## Regras de negócio

O PromoPilot analisa os produtos válidos e calcula indicadores comerciais a partir de seus valores de custo e preços.

### Desconto percentual

```text
Desconto (%) =
((Preço atual - Preço promocional) / Preço atual) × 100
```

### Lucro unitário

```text
Lucro unitário = Preço promocional - Custo
```

### Margem percentual

```text
Margem (%) =
((Preço promocional - Custo) / Preço promocional) × 100
```

### Classificação de rentabilidade

| Status | Critério |
|---|---|
| Saudável | Margem maior ou igual a 15% |
| Atenção | Margem maior ou igual a 0% e menor que 15% |
| Prejuízo | Margem negativa |

A classificação permite identificar rapidamente promoções que preservam a rentabilidade e aquelas que exigem revisão.

### Validação de dados

Os registros recebidos passam por validação com Zod antes da análise comercial.

Produtos inválidos são separados dos válidos, evitando que valores inconsistentes comprometam os indicadores do dashboard.

Os registros rejeitados são apresentados em uma seção específica, acompanhados dos respectivos erros de validação.

## Fluxo de processamento

```text
products.json
     |
     v
Validação com Zod
     |
     +----> Registros inválidos
     |             |
     |             v
     |       InvalidPromotions
     |
     v
Análise comercial
     |
     +----> Indicadores do dashboard
     |
     +----> Tabela de produtos
     |
     +----> Assistente comercial
                  |
                  v
          Interpretação da mensagem
                  |
                  v
          Resposta + ação opcional
                  |
                  v
             Zustand
                  |
                  v
          Atualização dos filtros
```

## Decisões técnicas

### Separação das regras comerciais

Os cálculos e as validações são implementados em funções de domínio, evitando concentrar regras de negócio nos componentes React.

Essa abordagem facilita a manutenção e permite testar as regras sem depender da interface.

### Estado compartilhado com Zustand

O Zustand foi utilizado para compartilhar o estado dos filtros entre o dashboard e o assistente.

Assim, um comando conversacional pode alterar a classificação selecionada e atualizar automaticamente os produtos exibidos na tabela.

Os dados analisados permanecem fora da store, evitando armazenar resultados derivados desnecessariamente.

### Assistente baseado em intenções

O processamento conversacional é dividido em normalização da mensagem, identificação da intenção, geração da resposta e definição de uma ação opcional.

Essa separação torna o comportamento previsível, testável e independente de serviços externos.

### Validação antes da análise

Os produtos são validados antes dos cálculos comerciais. Essa decisão evita que registros inconsistentes afetem os resultados e permite comunicar os erros ao usuário.

## Executando o projeto

### Pré-requisitos

- Node.js em versão compatível com Vite 8.
- npm.

### Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/rebgois/promopilot
cd promopilot
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse o endereço local informado pelo Vite no terminal.

### Testes automatizados

```bash
npm test
```

### Análise estática

```bash
npm run lint
```

### Build de produção

```bash
npm run build
```

### Prévia do build

```bash
npm run preview
```

## Testes e qualidade

O projeto utiliza Vitest para validar regras comerciais e comportamentos determinísticos.

A cobertura implementada contempla:

- Normalização de mensagens.
- Interpretação de intenções.
- Geração de respostas comerciais.
- Processamento de mensagens do assistente.
- Análise individual e consolidada das promoções.
- Atualização e limpeza dos filtros no Zustand.

A aplicação também utiliza TypeScript e ESLint para auxiliar na identificação de inconsistências durante o desenvolvimento.

## Limitações atuais

- Os produtos são carregados de um arquivo JSON local.
- Não existe integração com backend ou banco de dados.
- O assistente reconhece um conjunto predefinido de intenções.
- Não há integração com modelos generativos de IA.
- Os indicadores representam os dados demonstrativos disponíveis.

## Melhorias futuras

- [ ] Integrar uma API para carregamento dinâmico de produtos.
- [ ] Adicionar testes de integração entre assistente, Zustand e componentes React.
- [ ] Centralizar os tipos de filtros e padronizar nomenclaturas de arquivos.
- [ ] Ampliar a cobertura de testes da interface.
- [ ] Expandir as intenções reconhecidas pelo assistente.
- [ ] Adicionar gráficos e visualizações comparativas.
- [ ] Implementar exportação de relatórios comerciais.
- [ ] Avaliar integração com um modelo de linguagem para consultas mais flexíveis.

## Objetivo do projeto

O PromoPilot foi desenvolvido como um projeto demonstrativo de engenharia frontend, com foco em transformar regras de negócio em uma interface utilizável, organizada e testável.

Além da implementação visual, o projeto explora modelagem de dados, validação, separação de responsabilidades, gerenciamento de estado, testes automatizados e integração entre funcionalidades.