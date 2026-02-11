// PROART Protocol - Question definitions for all 4 scales

export const SCALE_LABELS = {
  1: "Contexto do Trabalho",
  2: "Gestão Organizacional",
  3: "Sofrimento no Trabalho",
  4: "Danos Físicos, Psicológicos e Sociais",
} as const;

export const RESPONSE_LABELS: Record<number, string> = {
  1: "Nunca",
  2: "Raramente",
  3: "Às vezes",
  4: "Frequentemente",
  5: "Sempre",
};

export const SCALE_1_QUESTIONS = [
  "Os recursos de trabalho são suficientes",
  "O ritmo de trabalho é adequado",
  "Os prazos são cumpridos de forma razoável",
  "A comunicação é clara e eficiente",
  "Existe autonomia para realizar o trabalho",
  "As condições físicas de trabalho são adequadas",
  "O ambiente é seguro",
  "Os equipamentos são adequados",
  "As tarefas são bem distribuídas",
  "Há apoio da chefia",
  "Há cooperação entre colegas",
  "As informações são compartilhadas",
  "O planejamento é eficiente",
  "As regras são claras",
  "Os resultados esperados são realistas",
  "As mudanças são comunicadas com antecedência",
  "Há oportunidade de participar das decisões",
  "O trabalho é estimulante",
  "O horário de trabalho é respeitado",
];

export const SCALE_2_QUESTIONS = [
  "O estilo de gestão é participativo",
  "Há espaço para negociação",
  "A hierarquia é respeitosa",
  "Existe valorização do trabalho realizado",
  "A inovação é incentivada",
  "As metas são negociadas",
  "Os conflitos são mediados de forma justa",
  "O crescimento profissional é incentivado",
  "As avaliações são justas",
  "Há reconhecimento do esforço",
  "A gestão é transparente",
  "As decisões são consistentes",
  "O feedback é construtivo",
  "Os critérios de promoção são claros",
  "A liderança é acessível",
  "Há confiança na gestão",
  "As políticas de RH são claras",
  "A comunicação da gestão é eficiente",
  "As reuniões são produtivas",
  "O planejamento estratégico é compartilhado",
  "A gestão promove qualidade de vida",
];

export const SCALE_3_QUESTIONS = [
  "Sinto-me inútil no trabalho",
  "Sinto desmotivação",
  "Sinto frustração",
  "Sinto-me desvalorizado",
  "Sinto insegurança",
  "Sinto medo",
  "Sinto tristeza",
  "Sinto-me sobrecarregado",
  "Sinto esgotamento emocional",
  "Sinto falta de reconhecimento",
  "Sinto-me injustiçado",
  "Sinto-me impotente",
  "Sinto revolta",
  "Sinto desânimo",
  "Sinto angústia",
  "Sinto-me pressionado",
  "Sinto solidão no trabalho",
  "Sinto-me explorado",
  "Sinto raiva",
  "Sinto-me descartável",
  "Sinto ansiedade",
  "Sinto estresse",
  "Sinto tensão",
  "Sinto-me incompetente",
  "Sinto vergonha",
  "Sinto culpa",
  "Sinto-me incapaz",
  "Sinto perda de identidade profissional",
];

export const SCALE_4_QUESTIONS = [
  "Amargura",
  "Dores no corpo",
  "Alterações de sono",
  "Conflitos nas relações",
  "Dores de cabeça",
  "Irritabilidade",
  "Dificuldade de concentração",
  "Problemas gástricos",
  "Fadiga constante",
  "Isolamento social",
  "Perda de apetite",
  "Dores musculares",
  "Alterações de humor",
  "Problemas cardiovasculares",
  "Crises de choro",
  "Agressividade",
  "Uso de medicamentos",
  "Problemas de pele",
  "Redução da libido",
  "Problemas respiratórios",
  "Dependência de substâncias",
  "Vontade de abandonar tudo",
  "Pensamentos negativos recorrentes",
];

export const SCALES: Record<number, string[]> = {
  1: SCALE_1_QUESTIONS,
  2: SCALE_2_QUESTIONS,
  3: SCALE_3_QUESTIONS,
  4: SCALE_4_QUESTIONS,
};

export function getRiskLevel(average: number, scaleNumber: number): "low" | "medium" | "high" {
  // Scales 1 & 2: higher is better (low risk), Scales 3 & 4: higher is worse (high risk)
  if (scaleNumber <= 2) {
    if (average >= 3.7) return "low";
    if (average >= 2.3) return "medium";
    return "high";
  } else {
    if (average <= 2.3) return "low";
    if (average <= 3.7) return "medium";
    return "high";
  }
}

export function getRiskLabel(level: "low" | "medium" | "high"): string {
  return { low: "Baixo Risco", medium: "Risco Médio", high: "Alto Risco" }[level];
}
