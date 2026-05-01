// === AMT Data ===
// Treinadores e lutadores. Imagens são placeholders striped — substituir por reais.

const placeholderPortrait = (label, accent = "#222") =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'>
      <defs>
        <pattern id='s' width='8' height='8' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'>
          <line x1='0' y1='0' x2='0' y2='8' stroke='${accent}' stroke-width='3'/>
        </pattern>
      </defs>
      <rect width='400' height='500' fill='#1a1a1a'/>
      <rect width='400' height='500' fill='url(#s)'/>
      <text x='50%' y='50%' fill='#666' font-family='monospace' font-size='14' text-anchor='middle' letter-spacing='2'>${label}</text>
    </svg>`
  )}`;

const TREINADORES = [
  { id: 1, nome: "Jefferson Erbas", apelido: "Kru-chefe", grau: "Kru / Faixa Preta", locais: "São José dos Campos", img: placeholderPortrait("KRU JEFFERSON") },
  { id: 2, nome: "Rafael Souza", apelido: "Tigre", grau: "Instrutor / Khan 12", locais: "São José dos Campos", img: placeholderPortrait("RAFAEL") },
  { id: 3, nome: "Bruno Alves", apelido: null, grau: "Instrutor / Khan 11", locais: "Caraguatatuba", img: placeholderPortrait("BRUNO") },
  { id: 4, nome: "Carla Mendes", apelido: "Lâmina", grau: "Instrutora / Khan 10", locais: "São José dos Campos", img: placeholderPortrait("CARLA") },
  { id: 5, nome: "Diego Lima", apelido: null, grau: "Instrutor / Khan 9", locais: "Caraguatatuba", img: placeholderPortrait("DIEGO") },
  { id: 6, nome: "Eduardo Pinto", apelido: "Furacão", grau: "Instrutor / Khan 9", locais: "São José dos Campos", img: placeholderPortrait("EDUARDO") },
  { id: 7, nome: "Felipe Santos", apelido: null, grau: "Instrutor / Khan 8", locais: "São José dos Campos", img: placeholderPortrait("FELIPE") },
  { id: 8, nome: "Gabriel Rocha", apelido: null, grau: "Instrutor / Khan 8", locais: "Caraguatatuba", img: placeholderPortrait("GABRIEL") },
];

const LUTADORES = [
  { id: 1, nome: "Lucas Oliveira", apelido: "O Predador", peso: "70kg", categoria: "Profissional", vitorias: 18, derrotas: 2, empates: 1, img: placeholderPortrait("LUCAS", "#3a0a14") },
  { id: 2, nome: "Mariana Costa", apelido: "Tempestade", peso: "57kg", categoria: "Profissional", vitorias: 14, derrotas: 1, empates: 0, img: placeholderPortrait("MARIANA", "#3a0a14") },
  { id: 3, nome: "Thiago Reis", apelido: "Aço", peso: "75kg", categoria: "Amador", vitorias: 9, derrotas: 1, empates: 0, img: placeholderPortrait("THIAGO", "#3a0a14") },
  { id: 4, nome: "Patricia Nunes", apelido: null, peso: "60kg", categoria: "Amadora", vitorias: 7, derrotas: 0, empates: 1, img: placeholderPortrait("PATRICIA", "#3a0a14") },
  { id: 5, nome: "Rodrigo Cunha", apelido: "Trovão", peso: "82kg", categoria: "Profissional", vitorias: 11, derrotas: 3, empates: 0, img: placeholderPortrait("RODRIGO", "#3a0a14") },
  { id: 6, nome: "Juliana Vaz", apelido: null, peso: "54kg", categoria: "Amadora", vitorias: 6, derrotas: 1, empates: 0, img: placeholderPortrait("JULIANA", "#3a0a14") },
];

const LOCAIS = [
  {
    id: 1,
    nome: "AMT Centro — SJC",
    cidade: "São José dos Campos",
    endereco: "Rua Paraibuna, 410 — Centro",
    treinador: "Kru Jefferson Erbas",
    horarios: [
      { dia: "Seg / Qua / Sex", horas: "06:30 / 12:00 / 19:00 / 20:30" },
      { dia: "Ter / Qui", horas: "07:00 / 19:00 / 20:30" },
      { dia: "Sáb", horas: "09:00 (sparring aberto)" },
    ],
  },
  {
    id: 2,
    nome: "AMT Jardim Aquarius",
    cidade: "São José dos Campos",
    endereco: "Av. Salmão, 1023 — Aquarius",
    treinador: "Rafael Souza",
    horarios: [
      { dia: "Seg a Sex", horas: "07:00 / 19:00 / 20:30" },
      { dia: "Sáb", horas: "10:00" },
    ],
  },
  {
    id: 3,
    nome: "AMT Caraguatatuba",
    cidade: "Caraguatatuba",
    endereco: "Av. da Praia, 88 — Centro",
    treinador: "Bruno Alves",
    horarios: [
      { dia: "Seg / Qua / Sex", horas: "07:00 / 18:30 / 20:00" },
      { dia: "Ter / Qui", horas: "18:30 / 20:00" },
    ],
  },
  {
    id: 4,
    nome: "AMT Urbanova",
    cidade: "São José dos Campos",
    endereco: "Av. Lineu de Moura, 1320",
    treinador: "Carla Mendes",
    horarios: [
      { dia: "Seg a Qui", horas: "06:30 / 19:00" },
      { dia: "Sáb", horas: "08:30" },
    ],
  },
];

const EVENTOS = [
  { id: 1, data: "2026-05-17", hora: "14:00", tipo: "Seminário", titulo: "Seminário Sak Yant — Tradição Tailandesa", local: "AMT Centro — SJC", descricao: "Workshop sobre as origens espirituais do Muay Thai, mongkon, prajied e a cerimônia de Wai Khru. Aberto a alunos de todas as faixas." },
  { id: 2, data: "2026-06-08", hora: "19:00", tipo: "Graduação", titulo: "Graduação Khan — 1º Semestre", local: "AMT Centro — SJC", descricao: "Avaliação oficial de Khan. Inscrições com seu instrutor até 30/05." },
  { id: 3, data: "2026-06-22", hora: "20:00", tipo: "Luta", titulo: "AMT Fight Night #07", local: "Ginásio Tonicão — SJC", descricao: "Card profissional + amador. Lutadores AMT e equipes convidadas." },
  { id: 4, data: "2026-07-05", hora: "09:00", tipo: "Curso", titulo: "Curso de Arbitragem WMC", local: "AMT Jardim Aquarius", descricao: "Curso oficial WMC para futuros árbitros. Certificado." },
  { id: 5, data: "2026-08-15", hora: "20:00", tipo: "Luta", titulo: "Copa Vale do Paraíba", local: "Caraguatatuba", descricao: "Etapa estadual com lutadores AMT representando." },
];

const STATS = [
  { num: "08", label: "Anos de tradição" },
  { num: "09", label: "Krus & instrutores" },
  { num: "04", label: "Locais de treino" },
  { num: "150+", label: "Lutas oficiais" },
];

// === Imagens reais hospedadas no GitHub ===
const RAW_BASE = "https://raw.githubusercontent.com/jawstech-lab/amt_website/master/public";

const DESTAQUES = [
  `${RAW_BASE}/imagens/destaques/destaque1.png`,
  `${RAW_BASE}/imagens/destaques/destaque2.png`,
  `${RAW_BASE}/imagens/destaques/destaque2.jpg`,
  `${RAW_BASE}/imagens/destaques/destaque3.jpg`,
];

const NOSSA_HISTORIA = [
  `${RAW_BASE}/imagens/Nossa%20Historia/NossaHist1.png`,
  `${RAW_BASE}/imagens/Nossa%20Historia/NossaHist2.png`,
  `${RAW_BASE}/imagens/Nossa%20Historia/NossaHist3.png`,
  `${RAW_BASE}/imagens/Nossa%20Historia/NossaHist4.png`,
  `${RAW_BASE}/imagens/Nossa%20Historia/NossaHist5.png`,
  `${RAW_BASE}/imagens/Nossa%20Historia/NossaHist6.png`,
  `${RAW_BASE}/imagens/Nossa%20Historia/NossaHist7.png`,
  `${RAW_BASE}/imagens/Nossa%20Historia/NossaHist8.png`,
];

window.AMT_DATA = { TREINADORES, LUTADORES, LOCAIS, EVENTOS, STATS, DESTAQUES, NOSSA_HISTORIA, placeholderPortrait };
