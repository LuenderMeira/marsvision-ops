export type Species = "Humano" | "Marciano" | "Ciborgue" | "Sintético";
export const patients: { id: string; name: string; colony: string; species: Species; nextExam: string }[] = [
  { id: "MV-00412", name: "Zorg Val-Tessar", colony: "Nova Terra • Cúpula 2", species: "Marciano", nextExam: "18/04/2242" },
  { id: "MV-00413", name: "John Doe", colony: "Base Olympus • Cúpula 7", species: "Humano", nextExam: "19/04/2242" },
  { id: "MV-00414", name: "T-800", colony: "Valles Industrial • Plataforma 3", species: "Ciborgue", nextExam: "02/05/2242" },
  { id: "MV-00415", name: "Ilyra Ossen", colony: "Nova Terra • Cúpula 1", species: "Sintético", nextExam: "22/04/2242" },
  { id: "MV-00416", name: "Marta Kolev", colony: "Borda Hellas • Posto 9", species: "Humano", nextExam: "25/04/2242" },
  { id: "MV-00417", name: "Krex Dun-Mor", colony: "Nova Terra • Cúpula 4", species: "Marciano", nextExam: "11/05/2242" },
  { id: "MV-00418", name: "Unidade 44-C", colony: "Pátio Arcadia • Baia 12", species: "Ciborgue", nextExam: "30/04/2242" },
  { id: "MV-00419", name: "Senna Vox", colony: "Base Olympus • Cúpula 7", species: "Sintético", nextExam: "01/06/2242" },
];
export const appointments = [
  { time: "09:00", duration: "30 min", title: "Avaliação de glaucoma", patient: "Zorg Val-Tessar", room: "Sala A-1", status: "Concluída" },
  { time: "09:45", duration: "45 min", title: "Mapeamento de radiação retiniana", patient: "Marta Kolev", room: "Sala A-2", status: "Concluída" },
  { time: "10:30", duration: "60 min", title: "Remoção de resíduos de tempestade", patient: "John Doe", room: "Cirurgia 1", status: "Em andamento" },
  { time: "13:00", duration: "30 min", title: "Exame de rotina", patient: "T-800", room: "Sala B-1", status: "Agendada" },
  { time: "14:15", duration: "45 min", title: "Calibração do conjunto óptico", patient: "Unidade 44-C", room: "Sala B-3", status: "Agendada" },
  { time: "16:00", duration: "90 min", title: "Cirurgia corretiva multiocular", patient: "Krex Dun-Mor", room: "Cirurgia 2", status: "Agendada" },
];
export const staff = [
  { name: "Dra. A. Silva", initials: "AS", specialty: "Direção clínica", status: "Disponível", license: "GMC-1102", cases: 312 },
  { name: "Dr. Renn Kovac", initials: "RK", specialty: "Optometria de radiação", status: "Em cirurgia", license: "GMC-2288", cases: 184 },
  { name: "Dra. Iyara Solen", initials: "IS", specialty: "Cirurgia multiocular", status: "Em cirurgia", license: "GMC-3471", cases: 97 },
  { name: "Dr. Hal Mbeki", initials: "HM", specialty: "Regeneração da córnea", status: "Disponível", license: "GMC-5510", cases: 241 },
  { name: "Dr. Vess Tarn", initials: "VT", specialty: "Óptica sintética", status: "Fora do planeta", license: "GMC-6032", cases: 66 },
  { name: "Dra. Pia Grum", initials: "PG", specialty: "Visão pediátrica em baixa gravidade", status: "Disponível", license: "GMC-7745", cases: 158 },
];
export const products = [
  { sku: "PRD-0091", name: "Óculos Anti-Areia Mk IV", category: "Proteção ocular", stock: 128, min: 40, price: 340 },
  { sku: "PRD-0092", name: "Lentes de Radiação UV-X", category: "Lentes", stock: 18, min: 50, price: 890 },
  { sku: "PRD-0093", name: "Lágrimas Artificiais Gravidade Zero", category: "Farmacêutico", stock: 412, min: 100, price: 45 },
  { sku: "PRD-0094", name: "Cartucho de Filtro de Poeira Ocular", category: "Consumíveis", stock: 7, min: 30, price: 120 },
  { sku: "PRD-0095", name: "Polidor de Íris Sintética", category: "Manutenção", stock: 76, min: 25, price: 210 },
  { sku: "PRD-0096", name: "Fluido Óptico para Ciborgue 2L", category: "Manutenção", stock: 23, min: 40, price: 165 },
];
export const chartData = [
  { cycle: "Sol 01", consultations: 32, sales: 54 }, { cycle: "Sol 02", consultations: 41, sales: 61 }, { cycle: "Sol 03", consultations: 28, sales: 38 }, { cycle: "Sol 04", consultations: 47, sales: 72 }, { cycle: "Sol 05", consultations: 39, sales: 66 }, { cycle: "Sol 06", consultations: 52, sales: 88 }, { cycle: "Sol 07", consultations: 42, sales: 128 },
];
