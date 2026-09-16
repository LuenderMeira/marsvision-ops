export type Species = "Human" | "Martian" | "Cyborg" | "Synthesian";

export const patients: {
  id: string;
  name: string;
  colony: string;
  species: Species;
  nextExam: string;
}[] = [
  { id: "MV-00412", name: "Zorg Val-Tessar", colony: "Nova Terra // Dome 2", species: "Martian", nextExam: "2242-04-18" },
  { id: "MV-00413", name: "John Doe", colony: "Olympus Base // Dome 7", species: "Human", nextExam: "2242-04-19" },
  { id: "MV-00414", name: "T-800", colony: "Valles Industrial // Rig 3", species: "Cyborg", nextExam: "2242-05-02" },
  { id: "MV-00415", name: "Ilyra Ossen", colony: "Nova Terra // Dome 1", species: "Synthesian", nextExam: "2242-04-22" },
  { id: "MV-00416", name: "Marta Kolev", colony: "Hellas Rim // Outpost 9", species: "Human", nextExam: "2242-04-25" },
  { id: "MV-00417", name: "Krex Dun-Mor", colony: "Nova Terra // Dome 4", species: "Martian", nextExam: "2242-05-11" },
  { id: "MV-00418", name: "Unit 44-C", colony: "Arcadia Yards // Bay 12", species: "Cyborg", nextExam: "2242-04-30" },
  { id: "MV-00419", name: "Senna Vox", colony: "Olympus Base // Dome 7", species: "Synthesian", nextExam: "2242-06-01" },
];

export const appointments = [
  { time: "09:00", duration: "30 min", title: "Glaucoma Check", patient: "Zorg Val-Tessar", room: "Bay A-1", status: "Completed" },
  { time: "09:45", duration: "45 min", title: "Retinal Radiation Scan", patient: "Marta Kolev", room: "Bay A-2", status: "Completed" },
  { time: "10:30", duration: "60 min", title: "Sandstorm debris extraction", patient: "John Doe", room: "Surgery 1", status: "In Progress" },
  { time: "13:00", duration: "30 min", title: "Routine Exam", patient: "T-800", room: "Bay B-1", status: "Scheduled" },
  { time: "14:15", duration: "45 min", title: "Optic Array Calibration", patient: "Unit 44-C", room: "Bay B-3", status: "Scheduled" },
  { time: "16:00", duration: "90 min", title: "Multi-ocular Corrective Surgery", patient: "Krex Dun-Mor", room: "Surgery 2", status: "Scheduled" },
];

export const staff = [
  { name: "Dr. A. Silva", initials: "AS", specialty: "Chief Medical Officer", status: "Available", license: "GMC-1102", cases: 312 },
  { name: "Dr. Renn Kovac", initials: "RK", specialty: "Radiation Optometry", status: "In Surgery", license: "GMC-2288", cases: 184 },
  { name: "Dr. Iyara Solen", initials: "IS", specialty: "Multi-ocular Surgery", status: "In Surgery", license: "GMC-3471", cases: 97 },
  { name: "Dr. Hal Mbeki", initials: "HM", specialty: "Corneal Regeneration", status: "Available", license: "GMC-5510", cases: 241 },
  { name: "Dr. Vess Tarn", initials: "VT", specialty: "Synthetic Optics", status: "Off-Planet", license: "GMC-6032", cases: 66 },
  { name: "Dr. Pia Grum", initials: "PG", specialty: "Pediatric Low-G Vision", status: "Available", license: "GMC-7745", cases: 158 },
];

export const products = [
  { sku: "PRD-0091", name: "Anti-Sandstorm Goggles Mk IV", category: "Protective Eyewear", stock: 128, min: 40, price: 340 },
  { sku: "PRD-0092", name: "UV-X Radiation Lenses", category: "Lenses", stock: 18, min: 50, price: 890 },
  { sku: "PRD-0093", name: "Zero-G Artificial Tears", category: "Pharmaceutical", stock: 412, min: 100, price: 45 },
  { sku: "PRD-0094", name: "Ocular Dust Filter Cartridge", category: "Consumables", stock: 7, min: 30, price: 120 },
  { sku: "PRD-0095", name: "Synthesian Iris Polish", category: "Maintenance", stock: 76, min: 25, price: 210 },
  { sku: "PRD-0096", name: "Cyborg Optic Coolant 2L", category: "Maintenance", stock: 23, min: 40, price: 165 },
];

export const chartData = [
  { cycle: "Sol 01", consultations: 32, sales: 54 },
  { cycle: "Sol 02", consultations: 41, sales: 61 },
  { cycle: "Sol 03", consultations: 28, sales: 38 },
  { cycle: "Sol 04", consultations: 47, sales: 72 },
  { cycle: "Sol 05", consultations: 39, sales: 66 },
  { cycle: "Sol 06", consultations: 52, sales: 88 },
  { cycle: "Sol 07", consultations: 42, sales: 128 },
];
