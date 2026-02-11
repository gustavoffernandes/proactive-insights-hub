

# Dashboard PROATIVA - Gestão de Riscos Psicossociais (PROART)

## Visão Geral
Dashboard interna para a PROATIVA que importa respostas do protocolo PROART (via Google Sheets) e as transforma em painéis visuais interativos organizados pelas 4 escalas do protocolo, para consultoria técnica em riscos psicossociais. Backend com Supabase (autenticação + banco de dados + edge functions).

---

## 1. Autenticação
- Tela de login com email e senha para os consultores da PROATIVA
- Perfis de usuário com nome e papel
- Proteção de todas as rotas — apenas usuários autenticados acessam a dashboard

## 2. Importação de Dados via Google Sheets
- Edge Function no Supabase para conectar à API do Google Sheets
- Tela de configuração onde o admin cadastra a URL/ID da planilha de cada empresa
- Botão "Sincronizar" para importar/atualizar respostas para o banco de dados
- Mapeamento automático das colunas da planilha para as 4 escalas do PROART:
  - **Escala 1 — Contexto do Trabalho** (19 perguntas): recursos, ritmo, prazos, comunicação, autonomia etc.
  - **Escala 2 — Gestão Organizacional** (21 perguntas): estilo de gestão, hierarquia, valorização, inovação etc.
  - **Escala 3 — Sofrimento no Trabalho** (28 perguntas): sentimentos de inutilidade, desmotivação, frustração, desvalorização etc.
  - **Escala 4 — Danos Físicos, Psicológicos e Sociais** (23 perguntas): amargura, dores, alterações de sono, conflitos etc.
- Dados demográficos importados: Nome, Sexo, Idade, Setor de Trabalho
- Campo de comentário livre também armazenado

## 3. Gestão de Empresas e Setores
- Cadastro de empresas clientes com nome e informações básicas
- Os setores são extraídos automaticamente das respostas (campo "Setor de Trabalho" do formulário)
- Vinculação dos dados importados à empresa correspondente

## 4. Dashboard Principal com Filtros
- **Filtro por Empresa**: Seletor no topo para escolher qual cliente está sendo analisado
- **Filtro por Setor**: Filtrar respostas por setor dentro da empresa
- **Filtro por Escala**: Visualizar uma das 4 escalas do PROART
- **Filtro por Pergunta**: Isolar e visualizar respostas de uma pergunta específica
- **Filtros demográficos**: Filtrar por sexo e faixa etária
- Visão geral com cards de resumo por escala (média geral, classificação de risco, total de respondentes)

## 5. Visualização de Gráficos Personalizável
- Para cada pergunta ou escala, o consultor pode escolher o tipo de gráfico:
  - **Pizza**: distribuição das respostas (1 a 5)
  - **Barras**: comparação entre perguntas ou setores
  - **Linha**: tendências ao longo do tempo (se houver múltiplas coletas)
  - **Radar**: perfil da escala com todas as perguntas
- Cores com significado clínico: verde (baixo risco), amarelo (médio), vermelho (alto)
- Tooltips interativos com valores e percentuais
- Legenda clara: 1=Nunca, 2=Raramente, 3=Às vezes, 4=Frequentemente, 5=Sempre

## 6. Comparação entre Setores e Empresas
- Tela dedicada para comparação lado a lado
- Selecionar dois ou mais setores ou empresas para comparar
- Gráficos comparativos por escala e por pergunta
- Destaques visuais automáticos para pontos críticos (médias altas nas escalas de sofrimento/danos, médias baixas nas escalas de contexto/gestão)

## 7. Geração de Relatórios em PDF
- Botão para gerar relatório PDF profissional da empresa selecionada
- Layout com logo da PROATIVA, data, nome da empresa
- Seções organizadas pelas 4 escalas do PROART
- Inclui gráficos selecionados, resumo estatístico por escala, e destaques de pontos críticos
- Análise demográfica (por sexo, faixa etária, setor)

## 8. Design e Experiência
- Interface limpa e profissional com tons de azul e cinza
- Responsiva para desktop e tablet
- Navegação lateral: Dashboard, Empresas, Comparação, Relatórios, Configurações
- Identidade visual alinhada à PROATIVA

