export type Answer = "hoax" | "fakta";

export interface QuizQuestion {
  id: number;
  caseLabel: string;
  question: string;
  post: {
    username: string;
    handle: string;
    timeAgo: string;
    verified: boolean;
    content: string;
    imageEmoji?: string;
    imageDescription?: string;
    likes: number;
    comments: number;
    shares: number;
  };
  answer: Answer;
  tip: string;
  explanation: string;
  xpReward: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    caseLabel: "KASUS #01: VIRAL DARURAT",
    question: "Apakah postingan ini mengandung informasi palsu?",
    post: {
      username: "Warta_Cepat_99",
      handle: "@wartacepat99",
      timeAgo: "2 jam yang lalu",
      verified: false,
      content:
        "🚨 **PERINGATAN!!** Pemerintah akan mematikan seluruh jaringan internet mulai besok malam pukul 00:00 untuk pemeliharaan satelit global. Bagikan ke 10 grup WhatsApp agar koneksi Anda tidak terputus selamanya! #InternetMati #InfoPenting",
      imageEmoji: "📱",
      imageDescription: "Grafik data internet dengan smartphone",
      likes: 4821,
      comments: 1203,
      shares: 9847,
    },
    answer: "hoax",
    tip: "Periksa sumber berita. Apakah akun tersebut resmi atau hanya mencari sensasi? Berita besar biasanya dilaporkan oleh banyak media terpercaya.",
    explanation:
      "Ini adalah hoax klasik! Tidak ada pemerintah yang mematikan internet tanpa pemberitahuan resmi melalui siaran pers dan media nasional. Kalimat 'Bagikan ke 10 grup' adalah tanda khas penyebaran hoax.",
    xpReward: 30,
  },
  {
    id: 2,
    caseLabel: "KASUS #02: KESEHATAN VIRAL",
    question: "Benarkah informasi kesehatan ini?",
    post: {
      username: "SehatAlami_ID",
      handle: "@sehatalami_id",
      timeAgo: "5 jam yang lalu",
      verified: false,
      content:
        "💊 RAHASIA DOKTER TERSEMBUNYI! Minum air putih hangat + perasan lemon setiap pagi TERBUKTI menyembuhkan kanker stadium apapun dalam 30 hari. Para dokter merahasiakan ini karena takut kehilangan pasien! Sebarkan sebelum dihapus!",
      imageEmoji: "🍋",
      imageDescription: "Segelas air lemon hangat",
      likes: 12400,
      comments: 3201,
      shares: 45000,
    },
    answer: "hoax",
    tip: "Klaim kesehatan yang luar biasa selalu membutuhkan bukti ilmiah dari jurnal medis terpercaya. Waspada jika ada narasi 'dokter merahasiakan' — ini manipulasi emosi.",
    explanation:
      "HOAX berbahaya! Tidak ada makanan atau minuman yang bisa menyembuhkan kanker secara ajaib. Klaim seperti ini bisa menunda pengobatan yang sebenarnya dan membahayakan jiwa pasien.",
    xpReward: 30,
  },
  {
    id: 3,
    caseLabel: "KASUS #03: BERITA RESMI",
    question: "Apakah pengumuman ini dapat dipercaya?",
    post: {
      username: "KemendikbudRI",
      handle: "@kemdikbud.ri",
      timeAgo: "1 hari yang lalu",
      verified: true,
      content:
        "📢 Pengumuman Resmi: Pendaftaran Program Indonesia Pintar (PIP) tahun ajaran 2025/2026 dibuka mulai 1 Juni 2025. Informasi lengkap dan tata cara pendaftaran dapat diakses di pip.kemdikbud.go.id. Pastikan menggunakan sumber resmi!",
      imageEmoji: "🎓",
      imageDescription: "Logo Kemendikbud resmi",
      likes: 8920,
      comments: 567,
      shares: 12300,
    },
    answer: "fakta",
    tip: "Akun dengan tanda centang resmi dari instansi pemerintah biasanya dapat dipercaya. Selalu periksa apakah link mengarah ke domain resmi (.go.id untuk lembaga pemerintah Indonesia).",
    explanation:
      "INI FAKTA! Akun @kemdikbud.ri adalah akun resmi Kemendikbud yang terverifikasi. Pengumuman ini menggunakan domain resmi pip.kemdikbud.go.id dan tidak mengandung unsur sensasional.",
    xpReward: 25,
  },
  {
    id: 4,
    caseLabel: "KASUS #04: PENIPUAN DIGITAL",
    question: "Apakah tawaran ini asli atau penipuan?",
    post: {
      username: "Tokopedia_Promo2024",
      handle: "@tokopedia_promo2024",
      timeAgo: "3 jam yang lalu",
      verified: false,
      content:
        "🎉 SELAMAT! Kamu terpilih jadi pemenang iPhone 16 Pro dari undian Tokopedia Anniversary! Klik link berikut dan masukkan data pribadi serta OTP untuk klaim hadiahmu dalam 24 jam! bit.ly/klaim-hadiah-tokped",
      imageEmoji: "📱",
      imageDescription: "Gambar iPhone palsu dengan logo Tokopedia",
      likes: 201,
      comments: 89,
      shares: 340,
    },
    answer: "hoax",
    tip: "Waspada terhadap hadiah yang tidak pernah kamu ikuti lombanya! Perusahaan resmi tidak pernah meminta OTP — OTP adalah kode rahasia yang TIDAK BOLEH dibagikan kepada siapapun.",
    explanation:
      "PENIPUAN / PHISHING! Tokopedia resmi menggunakan domain tokopedia.com, bukan akun tidak terverifikasi dengan link bit.ly. Meminta OTP adalah tanda PASTI penipuan — jangan pernah berikan OTP ke siapapun!",
    xpReward: 35,
  },
  {
    id: 5,
    caseLabel: "KASUS #05: BENCANA ALAM",
    question: "Benarkah berita bencana ini?",
    post: {
      username: "BMKG",
      handle: "@infoBMKG",
      timeAgo: "30 menit yang lalu",
      verified: true,
      content:
        "⚠️ INFO GEMPA: Telah terjadi gempa bumi tektonik M5.4 di wilayah Cianjur, Jawa Barat. Kedalaman 10 km, tidak berpotensi tsunami. Masyarakat diharapkan tetap tenang dan waspada terhadap gempa susulan. Info resmi: bmkg.go.id",
      imageEmoji: "🌍",
      imageDescription: "Peta gempa bumi BMKG resmi",
      likes: 3410,
      comments: 890,
      shares: 7600,
    },
    answer: "fakta",
    tip: "BMKG adalah Badan Meteorologi, Klimatologi, dan Geofisika — lembaga resmi Indonesia untuk informasi cuaca dan gempa. Selalu cek infoBMKG untuk info bencana alam.",
    explanation:
      "INI FAKTA! @infoBMKG adalah akun resmi terverifikasi BMKG. Format pengumuman gempa mereka selalu mencantumkan magnitude, kedalaman, dan status tsunami. Informasi ini dapat dipercaya.",
    xpReward: 25,
  },
  {
    id: 6,
    caseLabel: "KASUS #06: INVESTASI KILAT",
    question: "Apakah penawaran investasi ini aman?",
    post: {
      username: "CuanCepat_Official",
      handle: "@cuancepat_official",
      timeAgo: "1 jam yang lalu",
      verified: false,
      content:
        "💰 INVESTASI MODAL 500RB BALIK 5JUTA dalam 7 HARI! Sudah 10.000+ member buktikan! Sistem binary otomatis bekerja 24 jam. JOIN SEKARANG slot terbatas! Hubungi WA: 08xx-xxxx-xxxx. Dijamin TIDAK RUGI! 🚀🚀🚀",
      imageEmoji: "💸",
      imageDescription: "Grafik keuntungan palsu yang terus naik",
      likes: 540,
      comments: 312,
      shares: 1200,
    },
    answer: "hoax",
    tip: "Investasi yang menjanjikan keuntungan tidak masuk akal dalam waktu sangat singkat adalah tanda penipuan skema Ponzi. OJK memiliki daftar investasi ilegal di ojk.go.id.",
    explanation:
      "INI PENIPUAN / INVESTASI BODONG! Keuntungan 1000% dalam 7 hari tidak mungkin secara ekonomi. 'Dijamin tidak rugi' adalah kebohongan — semua investasi memiliki risiko. Laporkan ke OJK!",
    xpReward: 35,
  },
  {
    id: 7,
    caseLabel: "KASUS #07: SAINS VIRAL",
    question: "Apakah fakta sains ini benar?",
    post: {
      username: "SainsPedia",
      handle: "@sainspedia.id",
      timeAgo: "2 hari yang lalu",
      verified: false,
      content:
        "🔬 FAKTA UNIK: Manusia hanya menggunakan 10% dari kapasitas otaknya. Bayangkan jika kita bisa menggunakan 100%! Ada teknik meditasi khusus yang bisa membuka 90% potensi otak tersembunyi kamu dalam 21 hari.",
      imageEmoji: "🧠",
      imageDescription: "Ilustrasi otak manusia",
      likes: 7823,
      comments: 430,
      shares: 9200,
    },
    answer: "hoax",
    tip: "Mitos '10% otak' sudah dibantah oleh ilmu saraf modern. Otak manusia menggunakan hampir seluruh bagiannya, meski tidak semuanya aktif secara bersamaan. Cek jurnal ilmiah terpercaya!",
    explanation:
      "MITOS / HOAX ILMIAH! Penelitian neurosains modern dengan fMRI membuktikan bahwa hampir semua area otak aktif digunakan. Tidak ada 'potensi tersembunyi 90%' yang bisa dibuka dengan teknik apapun.",
    xpReward: 30,
  },
  {
    id: 8,
    caseLabel: "KASUS #08: BANTUAN SOSIAL",
    question: "Apakah pengumuman bantuan ini resmi?",
    post: {
      username: "KemensosRI_Resmi",
      handle: "@KemensosRI",
      timeAgo: "6 jam yang lalu",
      verified: true,
      content:
        "📢 Kementerian Sosial RI membuka pendaftaran Bantuan Sosial Tunai (BST) 2025. Pendaftaran dilakukan melalui Dinas Sosial setempat dengan membawa KTP dan KK. Tidak ada biaya apapun dalam proses pendaftaran. Info: kemensos.go.id",
      imageEmoji: "🤝",
      imageDescription: "Logo resmi Kementerian Sosial RI",
      likes: 15600,
      comments: 2340,
      shares: 34000,
    },
    answer: "fakta",
    tip: "Program bantuan sosial pemerintah TIDAK PERNAH meminta biaya pendaftaran. Jika ada yang meminta bayaran untuk mendaftar bantuan sosial, itu pasti penipuan.",
    explanation:
      "INI FAKTA! @KemensosRI adalah akun resmi terverifikasi. Kunci kebenarannya: tidak ada biaya, melalui kantor Dinas Sosial resmi, dan link ke domain .go.id. Pengumuman ini sah dan terpercaya.",
    xpReward: 25,
  },
];

export const MAX_LIVES = 3;
export const TOTAL_QUESTIONS = quizQuestions.length;
