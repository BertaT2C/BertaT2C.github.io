export type ProjectGroup = "produto" | "backlog" | "processos";

export interface Project {
  slug: string;
  number: string;
  title: string;
  tag: string;
  group: ProjectGroup;
  summary: string;
  question: string;
  context: { label: string; text: string }[];
  flow: string[];
  highlights: string[];
  metrics?: { value: string; label: string }[];
  metricsNote?: string;
  skills: string[];
  url: string;
}

export const groups: { id: "todos" | ProjectGroup; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "produto", label: "Produto & Canais" },
  { id: "backlog", label: "Backlog & Regras" },
  { id: "processos", label: "Processos & Automação" },
];

const base = "https://bertat2c.github.io";

export const projects: Project[] = [
  {
    slug: "canais-digitais",
    number: "01",
    title: "Canais digitais",
    tag: "Produto & Discovery",
    group: "produto",
    summary:
      "Case de Product Owner: do desafio e Discovery ao Canvas MVP, requisitos, backlog e demonstração por POCs.",
    question:
      "Como permitir que segurados e beneficiários iniciem solicitações de assistência automotiva sem depender exclusivamente do Call Center?",
    context: [
      { label: "Público", text: "Segurados e beneficiários" },
      { label: "Problema", text: "Dependência do atendimento telefônico" },
      { label: "Direção", text: "Início autônomo do atendimento" },
    ],
    flow: ["Discovery", "Canvas MVP", "Requisitos", "Backlog", "POCs"],
    highlights: [
      "Análise de pesquisa quantitativa sobre canais preferidos dos clientes.",
      "Mapeamento dos pontos de atenção do AS IS e jornadas fragmentadas.",
      "Matriz de priorização do MVP com hipóteses e indicadores de validação.",
    ],
    metrics: [
      { value: "88%", label: "preferem WhatsApp" },
      { value: "77%", label: "redes sociais" },
      { value: "59%", label: "e-mail" },
    ],
    metricsNote: "Canais preferidos segundo pesquisa disponibilizada pela empresa.",
    skills: ["Discovery", "Canvas MVP", "Priorização", "POC", "Jornada do usuário"],
    url: `${base}/canais-digitais.html`,
  },
  {
    slug: "refinamento",
    number: "02",
    title: "Qualidade do refinamento",
    tag: "OKR & Backlog",
    group: "backlog",
    summary:
      "Da identificação de gargalos no refinamento à proposta de OKRs, nova rotina colaborativa e indicadores.",
    question:
      "Como reduzir dúvidas recorrentes e retrabalho no refinamento do Product Backlog sem perder alinhamento entre negócio, tecnologia e qualidade?",
    context: [
      { label: "Contexto", text: "Squad de 30 pessoas, backlogs separados" },
      { label: "Dor", text: "Tempo gasto explicando regras" },
      { label: "Objetivo", text: "Histórias claras e prontas" },
    ],
    flow: ["Antes: contexto funcional", "Durante: refinar cenários", "Depois: registrar decisões"],
    highlights: [
      "Análise de causas: esclarecimentos duplicados e comunicação fragmentada.",
      "Rotina colaborativa em três momentos, sem burocratizar as cerimônias.",
      "Documento de OKR com fórmulas e roteiro de refinamento com checklist.",
    ],
    metrics: [
      { value: "7 → 3", label: "dias de esclarecimento" },
      { value: "−57%", label: "redução relativa" },
    ],
    metricsNote: "Valores ilustrativos do cenário de estudo, não medição real.",
    skills: ["OKR", "Product Backlog", "Refinamento", "AS IS / TO BE", "QA"],
    url: `${base}/refinamento.html`,
  },
  {
    slug: "whatsapp",
    number: "03",
    title: "Atendimento por WhatsApp",
    tag: "Canais Digitais",
    group: "produto",
    summary:
      "Do Discovery do atendimento atual ao desenho do autosserviço no WhatsApp, MVP, BDD e métricas.",
    question:
      "Como resolver mais solicitações de clientes e corretores no próprio WhatsApp, reduzindo a necessidade de alternar entre canais?",
    context: [
      { label: "Público", text: "Clientes e corretores de seguros" },
      { label: "Dor", text: "Redirecionamento para portais" },
      { label: "Oportunidade", text: "Resolver na própria conversa" },
    ],
    flow: [
      "Identificar intenção",
      "Verificar elegibilidade",
      "Autenticar",
      "Consultar serviço",
      "Responder / transbordar",
    ],
    highlights: [
      "Recorte de MVP com o que entra e o que fica fora, com critérios claros.",
      "Histórias HU-01 a HU-04 e cenários BDD, incluindo regras de privacidade.",
      "Riscos mapeados em negócio, tecnologia, LGPD e operação.",
    ],
    metrics: [
      { value: "20% → 55%", label: "resolução por autosserviço" },
      { value: "72% → 85%", label: "CSAT" },
      { value: "28% → 15%", label: "abandono" },
    ],
    metricsNote: "Linha de base hipotética comparada a metas de um possível MVP.",
    skills: ["Jornada do usuário", "MVP", "BDD", "LGPD", "KPIs"],
    url: `${base}/whatsapp.html`,
  },
  {
    slug: "processos-rpa",
    number: "04",
    title: "CT-e e MDF-e",
    tag: "Processos & RPA",
    group: "processos",
    summary:
      "Do levantamento com usuários ao BPMN do processo e à solução de automação com quatro robôs RPA.",
    question:
      "Como tornar mais eficiente e rastreável a emissão de documentos fiscais de transporte, reduzindo etapas repetitivas e inconsistências?",
    context: [
      { label: "Operação", text: "Emissão de CT-e e MDF-e" },
      { label: "Sistemas", text: "Protheus, Chronus e SEFAZ" },
      { label: "Oportunidade", text: "Automatizar tarefas manuais" },
    ],
    flow: ["Leitura física", "Arquivo no drive", "Protheus: CT-e", "Chronus", "MDF-e e SEFAZ"],
    highlights: [
      "Reuniões de refinamento com usuários para entender a operação real.",
      "Modelagem BPMN no Bizagi como evidência central do entendimento.",
      "Solução com planilhas auxiliares, integração de dados e 4 robôs RPA.",
    ],
    metrics: [{ value: "4", label: "robôs RPA na solução" }],
    skills: ["BPMN", "Bizagi", "RPA", "Protheus", "Integrações"],
    url: `${base}/processos-rpa.html`,
  },
  {
    slug: "oracle-r12",
    number: "05",
    title: "Notas fiscais no Oracle R12",
    tag: "ERP & Automação",
    group: "processos",
    summary:
      "Da rotina manual no Oracle R12 à automação no-code, implantação, contingência e indicadores.",
    question:
      "Como reduzir o esforço de emissão manual de notas fiscais de embalagem sem comprometer uma operação industrial just-in-time?",
    context: [
      { label: "Dor", text: "Preenchimento repetitivo de telas" },
      { label: "Risco", text: "Continuidade em produção just-in-time" },
      { label: "Objetivo", text: "Padronizar com contingência" },
    ],
    flow: ["Preparar dados", "Selecionar template", "Executar no ERP", "Conferir alertas"],
    highlights: [
      "Templates DataLoad Classic para faturamento, pedidos e notas de embalagem.",
      "Contingência para notas de importação e nacionalização.",
      "Treinamento, manuais e máquinas dedicadas para a operação.",
    ],
    metrics: [
      { value: "11% → 6%", label: "taxa de erros" },
      { value: "35% → 72%", label: "cumprimento de prazos" },
      { value: "−60%", label: "tempo estimado de emissão" },
    ],
    metricsNote: "Comparação de janeiro e junho publicada no material original.",
    skills: ["Oracle R12", "No-code", "DataLoad", "Implantação", "KPIs"],
    url: `${base}/oracle-r12.html`,
  },
  {
    slug: "pdv",
    number: "06",
    title: "PDV integrado ao ABS",
    tag: "Regras & BDD",
    group: "backlog",
    summary:
      "Da necessidade de integração PDV–ABS à especificação de regras, histórias, BDD e testes planejados.",
    question:
      "Como garantir que um pedido concluído no ponto de venda vire comandos de preparo consistentes para uma máquina automatizada de bebidas?",
    context: [
      { label: "Gatilho", text: "Finalização da venda no PDV" },
      { label: "Comando", text: "Preparo da bebida no ABS" },
      { label: "Limite", text: "Sem API documentada na fonte" },
    ],
    flow: ["Pedido no PDV", "Venda finalizada", "Comando ao ABS", "Regras", "Preparo"],
    highlights: [
      "Seis dimensões: categoria, sabor, copo, gelo, tamanho e modalidade.",
      "Rastreabilidade entre regras de negócio, requisitos e critérios de aceite.",
      "Questões de arquitetura mantidas em aberto, sem regras presumidas.",
    ],
    metrics: [
      { value: "12", label: "cenários BDD" },
      { value: "15", label: "verificações funcionais" },
    ],
    metricsNote: "Casos de teste planejados, ainda não executados.",
    skills: ["Regras de negócio", "Histórias de usuário", "BDD", "Rastreabilidade", "Testes"],
    url: `${base}/pdv.html`,
  },
];

export function filterProjects(list: Project[], group: "todos" | ProjectGroup) {
  return group === "todos" ? list : list.filter((p) => p.group === group);
}

export const steps = [
  {
    n: "1",
    title: "Discovery",
    short: "Objetivo, usuários, stakeholders, dores e processo atual.",
    details: [
      "Entrevistas e refinamentos com usuários e stakeholders",
      "Leitura de pesquisas e dados existentes",
      "Mapeamento do processo atual (AS IS)",
    ],
    example: "canais-digitais",
  },
  {
    n: "2",
    title: "Solução",
    short: "Fluxos futuros, requisitos, regras de negócio e dependências.",
    details: [
      "Desenho do fluxo futuro (TO BE) e BPMN",
      "Regras de negócio e requisitos funcionais",
      "Dependências, integrações e riscos",
    ],
    example: "processos-rpa",
  },
  {
    n: "3",
    title: "Backlog",
    short: "Priorização, histórias, critérios de aceite e refinamentos.",
    details: [
      "Recorte do MVP e matriz de priorização",
      "Histórias de usuário e cenários BDD",
      "Rotina de refinamento com negócio, TI e QA",
    ],
    example: "pdv",
  },
  {
    n: "4",
    title: "Evolução",
    short: "Testes de usuário, indicadores e melhoria contínua.",
    details: [
      "Definição de OKRs e KPIs de sucesso",
      "Implantação assistida, treinamento e contingência",
      "Acompanhamento de resultados e próximos passos",
    ],
    example: "oracle-r12",
  },
] as const;

export interface CompetencyArea {
  code: string;
  title: string;
  description: string;
  items: string[];
}

export const competencyAreas: CompetencyArea[] = [
  {
    code: "A.01",
    title: "Produto & Discovery",
    description: "Entender o problema, priorizar o valor e definir como medir o sucesso.",
    items: ["Discovery", "Canvas MVP", "MVP", "Priorização", "POC", "Jornada do usuário", "OKR", "KPIs"],
  },
  {
    code: "A.02",
    title: "Requisitos & Backlog",
    description: "Transformar decisões de negócio em histórias claras, testáveis e rastreáveis.",
    items: [
      "Product Backlog",
      "Refinamento",
      "Histórias de usuário",
      "Regras de negócio",
      "BDD",
      "Rastreabilidade",
      "Testes",
      "QA",
    ],
  },
  {
    code: "A.03",
    title: "Processos",
    description: "Mapear a operação real, desenhar o fluxo futuro e implantar com segurança.",
    items: ["AS IS / TO BE", "BPMN", "Bizagi", "Implantação", "LGPD"],
  },
  {
    code: "A.04",
    title: "Sistemas & Automação",
    description: "Reduzir trabalho manual com integrações, ERP e automação de tarefas.",
    items: ["RPA", "No-code", "DataLoad", "Oracle R12", "Protheus", "Integrações"],
  },
];

/** Estudos de caso que aplicam pelo menos uma competência da área. */
export function casesForArea(area: CompetencyArea, list: Project[] = projects) {
  return list.filter((p) => p.skills.some((s) => area.items.includes(s)));
}

/** Gráfico do topo da página: indicadores publicados no estudo Oracle R12. */
export const heroChart = {
  caseSlug: "oracle-r12",
  caseLabel: "Caso 05 · Notas fiscais no Oracle R12",
  before: "Jan",
  after: "Jun",
  series: [
    { label: "Cumprimento de prazos", before: 35, after: 72, better: "up" as const },
    { label: "Taxa de erros", before: 11, after: 6, better: "down" as const },
  ],
  highlight: { value: "−60%", label: "tempo estimado de emissão" },
  source: "Comparação publicada no material original do estudo.",
};