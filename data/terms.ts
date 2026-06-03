export interface Term {
  id: string;
  word: string;
  definition: string;
  category: "keamanan" | "sosial" | "teknis";
  difficulty: 1 | 2 | 3;
}

export const terms: Term[] = [
  {
    id: "1",
    word: "Phishing",
    definition:
      "Upaya memperoleh data sensitif dengan menyamar sebagai entitas tepercaya.",
    category: "keamanan",
    difficulty: 2,
  },
  {
    id: "2",
    word: "Hoaks",
    definition: "Informasi palsu yang disebarkan sebagai kebenaran.",
    category: "sosial",
    difficulty: 1,
  },
  {
    id: "3",
    word: "Malware",
    definition:
      "Perangkat lunak berbahaya yang dirancang untuk merusak sistem.",
    category: "keamanan",
    difficulty: 2,
  },
  {
    id: "4",
    word: "Digital Footprint",
    definition: "Jejak digital yang ditinggalkan saat menggunakan internet.",
    category: "sosial",
    difficulty: 1,
  },
  {
    id: "5",
    word: "API",
    definition: "Antarmuka untuk menghubungkan aplikasi berbeda.",
    category: "teknis",
    difficulty: 3,
  },
];
