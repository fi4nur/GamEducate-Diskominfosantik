export interface ModuleQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xpReward: number;
}

export interface ModuleQuiz {
  moduleId: number;
  moduleSlug: string;
  moduleTitle: string;
  moduleDescription?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  estimatedTimeMinutes?: number;
  passingScore?: number;
  questions: ModuleQuestion[];
}

export const moduleQuizzes: Record<string, ModuleQuiz> = {
  "keamanan-password": {
    moduleId: 1,
    moduleSlug: "keamanan-password",
    moduleTitle: "Keamanan Password",
    moduleDescription:
      "Pelajari cara membuat dan mengelola kata sandi yang kuat dan aman dari serangan peretas.",
    difficulty: "beginner",
    estimatedTimeMinutes: 5,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question:
          "Manakah dari kata sandi berikut yang paling aman dan sulit ditembus?",
        options: ["password123", "kucinglucu", "Kuc1ng#LutjU_2026", "12345678"],
        correctIndex: 2,
        explanation:
          "Kata sandi yang aman menggunakan kombinasi huruf besar, huruf kecil, angka, dan karakter khusus/simbol.",
        xpReward: 10,
      },
      {
        id: 2,
        question:
          "Mengapa menggunakan kata sandi yang sama untuk semua akun media sosial Anda berbahaya?",
        options: [
          "Karena Anda akan lupa",
          "Jika satu akun bocor, semua akun lainnya ikut terancam",
          "Karena memakan memori ponsel",
          "Akun akan dinonaktifkan secara otomatis oleh Google",
        ],
        correctIndex: 1,
        explanation:
          "Kebocoran data pada satu platform dapat dimanfaatkan oleh peretas untuk login ke platform lain yang menggunakan kata sandi yang sama.",
        xpReward: 10,
      },
      {
        id: 3,
        question:
          "Apa itu 2FA (Two-Factor Authentication) atau Verifikasi Dua Langkah?",
        options: [
          "Membuat dua kata sandi yang berbeda",
          "Sistem keamanan ganda yang memerlukan verifikasi tambahan (seperti kode SMS/Aplikasi) setelah password",
          "Membagikan password ke dua orang terpercaya",
          "Mengunci akun jika salah memasukkan password dua kali",
        ],
        correctIndex: 1,
        explanation:
          "2FA menambahkan lapisan keamanan ekstra dengan meminta kode verifikasi yang dikirim ke perangkat Anda selain kata sandi Anda.",
        xpReward: 10,
      },
      {
        id: 4,
        question:
          "Jika Anda menerima email yang mengaku dari pihak bank meminta Anda mengganti password segera lewat link yang dikirimkan, apa yang sebaiknya Anda lakukan?",
        options: [
          "Langsung klik link dan ganti password",
          "Abaikan dan hapus email tersebut, atau hubungi bank secara resmi untuk verifikasi",
          "Kirimkan password lama Anda melalui email balasan",
          "Bagikan email itu ke teman-teman",
        ],
        correctIndex: 1,
        explanation:
          "Ini adalah metode penipuan (phishing). Bank resmi tidak pernah meminta perubahan kata sandi langsung melalui link di dalam email.",
        xpReward: 10,
      },
      {
        id: 5,
        question:
          "Berapa panjang minimal kata sandi yang disarankan oleh para ahli keamanan?",
        options: [
          "6 karakter",
          "8 karakter",
          "12 karakter",
          "Bebas, yang penting sulit ditebak",
        ],
        correctIndex: 2,
        explanation:
          "Panjang 12 karakter atau lebih secara eksponensial lebih sulit dipecahkan oleh serangan brute force.",
        xpReward: 10,
      },
      {
        id: 6,
        question:
          "Mengapa menggunakan tanggal lahir sebagai kata sandi tidak disarankan?",
        options: [
          "Terlalu panjang dan sulit diingat",
          "Informasi tanggal lahir mudah ditemukan di media sosial",
          "Tidak bisa diubah setiap bulan",
          "Sistem tidak mengizinkan angka murni",
        ],
        correctIndex: 1,
        explanation:
          "Tanggal lahir adalah informasi publik yang sering dibagikan di media sosial, sehingga mudah ditebak oleh peretas.",
        xpReward: 10,
      },
      {
        id: 7,
        question: "Apa yang dimaksud dengan 'Password Manager'?",
        options: [
          "Seseorang yang mengelola kata sandi perusahaan",
          "Aplikasi yang menyimpan dan mengelola kata sandi secara aman dalam satu tempat terenkripsi",
          "Fitur bawaan Windows untuk mengganti password",
          "Email dari bank untuk memverifikasi kata sandi",
        ],
        correctIndex: 1,
        explanation:
          "Password Manager membantu mengelola banyak kata sandi unik tanpa perlu mengingat semuanya, cukup satu master password.",
        xpReward: 10,
      },
      {
        id: 8,
        question:
          "Apa yang harus dilakukan jika layanan online yang Anda gunakan terkena kebocoran data?",
        options: [
          "Tidak perlu melakukan apa-apa",
          "Segera ganti kata sandi di layanan tersebut dan di layanan lain yang menggunakan kata sandi sama",
          "Hapus akun tersebut",
          "Kirim keluhan ke CEO perusahaan",
        ],
        correctIndex: 1,
        explanation:
          "Segera ganti kata sandi di semua layanan yang menggunakan kredensial yang sama untuk mencegah dampak berantai kebocoran data.",
        xpReward: 10,
      },
      {
        id: 9,
        question:
          "Manakah dari berikut ini yang termasuk kata sandi yang 'lemah'?",
        options: [
          "g5!kL#9$mQ2@",
          "RumahMawar99",
          "qwerty12345",
          "S3cureP@ssw0rd!",
        ],
        correctIndex: 2,
        explanation:
          "'qwerty12345' adalah pola keyboard yang berurutan dan mudah ditebak, sangat lemah terhadap serangan dictionary attack.",
        xpReward: 10,
      },
      {
        id: 10,
        question:
          "Apa keuntungan utama menggunakan passphrase (frasa sandi) seperti 'kucing-makan-ikan-goreng' dibanding password pendek?",
        options: [
          "Lebih mudah diingat tetapi sulit ditebak karena panjang",
          "Lebih cepat diketik",
          "Boleh menggunakan spasi",
          "Tidak mengandung angka",
        ],
        correctIndex: 0,
        explanation:
          "Passphrase panjang lebih tahan terhadap brute force attack namun lebih mudah diingat karena membentuk kalimat yang bermakna.",
        xpReward: 10,
      },
    ],
  },
  "detektif-hoax": {
    moduleId: 2,
    moduleSlug: "detektif-hoax",
    moduleTitle: "Detektif Hoax",
    moduleDescription:
      "Asah kemampuanmu dalam membedakan fakta dan berita bohong di internet.",
    difficulty: "beginner",
    estimatedTimeMinutes: 5,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question:
          "Ciri utama dari berita atau informasi palsu (hoax) di internet adalah...",
        options: [
          "Bahasa yang digunakan sangat formal dan kaku",
          "Judul yang sensasional/provokatif dan meminta pembaca menyebarkannya segera",
          "Ditulis oleh jurnalis terkenal dan resmi",
          "Menyertakan banyak rujukan dari website pemerintahan",
        ],
        correctIndex: 1,
        explanation:
          "Hoax sering kali menggunakan judul bombastis untuk memancing emosi dan meminta pembaca membagikannya secepat mungkin.",
        xpReward: 10,
      },
      {
        id: 2,
        question:
          "Apa langkah terbaik untuk mengonfirmasi kebenaran suatu berita di media sosial?",
        options: [
          "Membaca komentar orang lain dan percaya pada komentar terbanyak",
          "Memeriksa berita tersebut di situs cek fakta resmi (seperti TurnBackHoax.id) atau media berita bereputasi",
          "Langsung membagikannya ke grup keluarga untuk bertanya",
          "Percaya saja jika dibagikan oleh teman dekat Anda",
        ],
        correctIndex: 1,
        explanation:
          "Situs cek fakta dan kantor berita resmi memiliki verifikasi jurnalisme yang ketat untuk memastikan kebenaran informasi.",
        xpReward: 10,
      },
      {
        id: 3,
        question:
          "Apa akibat yang bisa timbul jika kita ikut menyebarkan berita bohong (hoax)?",
        options: [
          "Akun kita akan mendapatkan centang biru",
          "Menimbulkan kepanikan di masyarakat dan bisa terjerat hukum UU ITE",
          "Kuota internet kita akan habis lebih cepat",
          "Kita akan diberikan hadiah oleh kominfo",
        ],
        correctIndex: 1,
        explanation:
          "Penyebaran hoax dapat memicu kekacauan sosial dan melanggar hukum pidana (UU ITE di Indonesia).",
        xpReward: 10,
      },
      {
        id: 4,
        question:
          "Anda menemukan foto bencana alam dengan narasi kejadian hari ini, namun Anda ragu. Bagaimana cara memeriksa keaslian foto tersebut?",
        options: [
          "Menggunakan fitur pencarian gambar terbalik (Google Reverse Image Search) untuk melihat kapan foto pertama kali diunggah",
          "Menanyakan kepada pembuat foto lewat kolom komentar",
          "Mengunduh foto lalu memperbesarnya untuk melihat piksel",
          "Membuat polling di Instagram",
        ],
        correctIndex: 0,
        explanation:
          "Pencarian gambar terbalik membantu melacak asal-usul foto dan mengetahui apakah foto itu merupakan kejadian lama yang disalahgunakan.",
        xpReward: 10,
      },
      {
        id: 5,
        question:
          "Apa yang dimaksud dengan 'clickbait' dalam konteks berita online?",
        options: [
          "Judul berita yang akurat dan informatif",
          "Judul yang dibuat sensasional hanya untuk menarik klik, tapi isinya tidak sesuai atau mengecewakan",
          "Berita yang ditulis oleh jurnalis profesional",
          "Link yang aman untuk diklik",
        ],
        correctIndex: 1,
        explanation:
          "Clickbait adalah praktik membuat judul bombastis untuk menarik perhatian, padahal isinya sering kali tidak sesuai ekspektasi.",
        xpReward: 10,
      },
      {
        id: 6,
        question:
          "Mengapa kita harus memeriksa tanggal publikasi suatu berita sebelum mempercayainya?",
        options: [
          "Karena berita lama tidak penting",
          "Berita lama sering diangkat kembali dan disebarkan sebagai kejadian baru (hoax daur ulang)",
          "Karena tanggal mempengaruhi kuota internet",
          "Karena berita hanya valid 24 jam",
        ],
        correctIndex: 1,
        explanation:
          "Hoax sering menggunakan foto atau berita lama yang diangkat kembali seolah-olah kejadian baru untuk menipu publik.",
        xpReward: 10,
      },
      {
        id: 7,
        question:
          "Apa yang harus Anda lakukan ketika menerima informasi yang belum jelas kebenarannya di WhatsApp?",
        options: [
          "Langsung forward ke semua grup",
          "Cek fakta terlebih dahulu, jika hoax jangan diteruskan dan beri edukasi ke pengirim",
          "Hapus WhatsApp",
          "Ubah nomor telepon",
        ],
        correctIndex: 1,
        explanation:
          "Menjadi agen literasi digital berarti menghentikan penyebaran hoax dan mengedukasi orang lain.",
        xpReward: 10,
      },
      {
        id: 8,
        question:
          "Situs web dengan domain .go.id menandakan bahwa situs tersebut...",
        options: [
          "Situs komersial",
          "Situs resmi milik pemerintah Indonesia",
          "Situs hiburan",
          "Situs buatan siapa saja",
        ],
        correctIndex: 1,
        explanation:
          "Domain .go.id adalah domain resmi yang terdaftar untuk instansi pemerintah Indonesia, lebih dapat dipercaya.",
        xpReward: 10,
      },
      {
        id: 9,
        question: "Apa yang dimaksud dengan 'disinformasi'?",
        options: [
          "Informasi yang salah namun tidak sengaja dibuat",
          "Informasi palsu yang sengaja dibuat untuk menyesatkan atau merugikan",
          "Informasi yang benar",
          "Informasi yang tidak lengkap",
        ],
        correctIndex: 1,
        explanation:
          "Disinformasi adalah informasi palsu yang sengaja diciptakan untuk menipu atau merugikan pihak tertentu.",
        xpReward: 10,
      },
      {
        id: 10,
        question: "Manakah yang termasuk ciri-ciri situs berita terpercaya?",
        options: [
          "Tidak mencantumkan nama penulis dan sumber",
          "Memiliki tim redaksi, alamat kantor jelas, dan mencantumkan sumber referensi",
          "Hanya berisi opini tanpa data",
          "Tidak pernah melakukan koreksi jika ada kesalahan",
        ],
        correctIndex: 1,
        explanation:
          "Media kredibel selalu transparan dengan identitas, memiliki standar jurnalisme, dan berani mengoreksi kesalahan.",
        xpReward: 10,
      },
    ],
  },
  "jejak-digital": {
    moduleId: 3,
    moduleSlug: "jejak-digital",
    moduleTitle: "Jejak Digital",
    moduleDescription:
      "Pelajari bagaimana aktivitas online Anda meninggalkan jejak yang bisa mempengaruhi masa depan.",
    difficulty: "beginner",
    estimatedTimeMinutes: 5,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Apa yang dimaksud dengan 'Jejak Digital Pasif'?",
        options: [
          "Postingan foto yang kita bagikan sendiri di Instagram",
          "Data yang terkumpul tanpa kesadaran kita langsung, seperti alamat IP dan riwayat pencarian browser",
          "Status Twitter/X yang kita hapus setahun lalu",
          "Komentar yang kita tulis di blog orang lain",
        ],
        correctIndex: 1,
        explanation:
          "Jejak digital pasif terkumpul secara otomatis di latar belakang oleh sistem ketika kita beraktivitas di internet.",
        xpReward: 10,
      },
      {
        id: 2,
        question:
          "Mengapa jejak digital disebut sulit atau bahkan tidak bisa dihapus sepenuhnya?",
        options: [
          "Karena server internet tidak pernah dimatikan",
          "Karena orang lain bisa saja mengunduh, mengambil tangkapan layar (screenshot), atau menyimpannya sebelum kita menghapusnya",
          "Karena undang-undang melarang penghapusan data internet",
          "Karena memori penyimpanan internet terlalu besar",
        ],
        correctIndex: 1,
        explanation:
          "Sekali informasi diunggah, ia bisa dengan mudah diduplikasi atau disimpan oleh pihak lain di luar kendali kita.",
        xpReward: 10,
      },
      {
        id: 3,
        question:
          "Manakah tindakan di bawah ini yang paling baik untuk menjaga jejak digital tetap positif?",
        options: [
          "Mengunggah semua aktivitas keseharian kita tanpa terkecuali",
          "Berpikir matang-matang sebelum mengunggah postingan atau menulis komentar",
          "Menggunakan nama palsu untuk mencaci maki orang lain",
          "Tidak pernah mengakses internet sama sekali",
        ],
        correctIndex: 1,
        explanation:
          "Berpikir sebelum mengunggah (think before you post) adalah kunci utama menjaga jejak digital tetap bersih dan positif.",
        xpReward: 10,
      },
      {
        id: 4,
        question:
          "Saat mencari pekerjaan atau mendaftar beasiswa di masa depan, mengapa perusahaan memeriksa jejak digital Anda?",
        options: [
          "Untuk mencuri informasi pribadi Anda",
          "Untuk menilai karakter, integritas, dan profesionalisme Anda di dunia nyata",
          "Untuk mencari tahu berapa banyak pengikut Anda di media sosial",
          "Hanya untuk memenuhi formalitas dokumen",
        ],
        correctIndex: 1,
        explanation:
          "Aktivitas digital mencerminkan kepribadian dan cara berkomunikasi seseorang, yang menjadi salah satu pertimbangan rekruter.",
        xpReward: 10,
      },
      {
        id: 5,
        question: "Apa yang dimaksud dengan 'Jejak Digital Aktif'?",
        options: [
          "Data yang dikumpulkan tanpa sepengetahuan kita",
          "Informasi yang sengaja kita bagikan sendiri, seperti postingan, komentar, dan foto di media sosial",
          "IP address komputer kita",
          "Riwayat browsing yang tersimpan otomatis",
        ],
        correctIndex: 1,
        explanation:
          "Jejak digital aktif adalah konten yang sengaja kita unggah atau bagikan secara sadar ke publik.",
        xpReward: 10,
      },
      {
        id: 6,
        question:
          "Apa risiko dari terlalu sering membagikan lokasi secara real-time di media sosial?",
        options: [
          "Tidak ada risiko",
          "Orang jahat bisa mengetahui keberadaan kita dan memanfaatkannya untuk kejahatan",
          "Akun akan dihapus",
          "Baterai ponsel cepat habis",
        ],
        correctIndex: 1,
        explanation:
          "Membagikan lokasi real-time memberi informasi kepada pihak tidak bertanggung jawab tentang keberadaan dan kebiasaan kita.",
        xpReward: 10,
      },
      {
        id: 7,
        question:
          "Mengapa kita harus mengatur privasi akun media sosial menjadi 'hanya teman' atau 'private'?",
        options: [
          "Agar tidak bisa ditemukan oleh siapapun",
          "Untuk membatasi siapa saja yang bisa melihat konten dan informasi pribadi kita",
          "Agar akun terlihat keren",
          "Karena itu aturan dari pemerintah",
        ],
        correctIndex: 1,
        explanation:
          "Pengaturan privasi membantu melindungi informasi pribadi dari orang asing yang mungkin berniat jahat.",
        xpReward: 10,
      },
      {
        id: 8,
        question:
          "Apa yang sebaiknya Anda lakukan jika menemukan foto pribadi Anda disebarkan tanpa izin?",
        options: [
          "Diam saja dan biarkan",
          "Laporkan ke platform media sosial dan jika perlu ke pihak berwajib",
          "Sebarkan lebih luas",
          "Hapus semua akun media sosial",
        ],
        correctIndex: 1,
        explanation:
          "Penyebaran foto pribadi tanpa izin bisa dilaporkan karena melanggar privasi dan undang-undang ITE.",
        xpReward: 10,
      },
      {
        id: 9,
        question:
          "Mengapa sebaiknya menggunakan nama samaran (bukan nama asli) untuk komentar di forum publik?",
        options: [
          "Agar bisa berkata kasar dengan bebas",
          "Untuk melindungi identitas asli dan mengurangi jejak digital yang terkait dengan nama pribadi",
          "Agar tidak bisa dilacak polisi",
          "Karena itu peraturan forum",
        ],
        correctIndex: 1,
        explanation:
          "Menggunakan nama samaran membantu memisahkan identitas publik dari aktivitas online yang tidak perlu terkait langsung dengan nama asli.",
        xpReward: 10,
      },
      {
        id: 10,
        question:
          "Apa yang dimaksud dengan 'digital footprint' dalam bahasa Indonesia?",
        options: [
          "Cetak biru digital",
          "Jejak digital - semua rekam jejak aktivitas seseorang di internet",
          "Sidik jari digital",
          "Tanda tangan elektronik",
        ],
        correctIndex: 1,
        explanation:
          "Jejak digital adalah seluruh data dan informasi yang ditinggalkan seseorang saat beraktivitas di dunia maya.",
        xpReward: 10,
      },
    ],
  },
  "etika-chatting": {
    moduleId: 4,
    moduleSlug: "etika-chatting",
    moduleTitle: "Etika Chatting",
    moduleDescription:
      "Pelajari cara berkomunikasi yang baik dan sopan di dunia digital.",
    difficulty: "beginner",
    estimatedTimeMinutes: 5,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question:
          "Menulis pesan dengan HURUF KAPITAL SEMUA (CAPS LOCK) dalam etika komunikasi digital diartikan sebagai...",
        options: [
          "Menunjukkan informasi yang sangat penting",
          "Berteriak atau marah kepada lawan bicara",
          "Menghormati orang yang lebih tua",
          "Membuat tulisan lebih mudah dibaca",
        ],
        correctIndex: 1,
        explanation:
          "Penggunaan huruf kapital secara keseluruhan di dunia digital diinterpretasikan sebagai ekspresi berteriak atau emosi marah.",
        xpReward: 10,
      },
      {
        id: 2,
        question:
          "Saat ingin masuk ke dalam sebuah grup chat baru, etika pertama yang sebaiknya dilakukan adalah...",
        options: [
          "Langsung mengirimkan stiker dan meme lucu sebanyak-banyaknya",
          "Memperkenalkan diri secara sopan dan memahami aturan grup tersebut",
          "Mengganti foto profil grup tanpa izin",
          "Mengundang teman-teman Anda secara acak",
        ],
        correctIndex: 1,
        explanation:
          "Memperkenalkan diri dan menghargai norma grup adalah bentuk sopan santun dasar komunikasi.",
        xpReward: 10,
      },
      {
        id: 3,
        question:
          "Bagaimana cara merespons pesan atau komentar negatif dari orang asing di media sosial?",
        options: [
          "Membalas dengan kata-kata yang lebih kasar agar mereka jera",
          "Tetap tenang, tidak terprovokasi, dan gunakan fitur blokir atau laporkan jika mengganggu",
          "Mengajak teman-teman untuk menyerang akun tersebut bersama-sama",
          "Langsung menangis dan menutup akun selamanya",
        ],
        correctIndex: 1,
        explanation:
          "Membalas dengan kemarahan hanya akan memperpanjang konflik. Sikap tenang dan melaporkan akun adalah pilihan terbaik.",
        xpReward: 10,
      },
      {
        id: 4,
        question:
          "Kapan waktu yang paling tidak sopan untuk mengirim pesan teks terkait pekerjaan/sekolah ke guru atau atasan?",
        options: [
          "Pagi hari pukul 09:00",
          "Tengah malam pukul 00:30",
          "Siang hari pukul 13:00",
          "Sore hari pukul 15:30",
        ],
        correctIndex: 1,
        explanation:
          "Mengirim pesan di luar jam kerja/jam sekolah (khususnya larut malam) mengganggu waktu istirahat pribadi penerima.",
        xpReward: 10,
      },
      {
        id: 5,
        question: "Apa yang dimaksud dengan 'netiket' (netiquette)?",
        options: [
          "Jaringan komputer",
          "Etika berkomunikasi dan berperilaku di internet",
          "Aplikasi chatting",
          "Situs jejaring sosial",
        ],
        correctIndex: 1,
        explanation:
          "Netiket adalah singkatan dari network etiquette, yaitu tata krama atau etika dalam berkomunikasi di dunia maya.",
        xpReward: 10,
      },
      {
        id: 6,
        question:
          "Mengapa kita sebaiknya tidak mengirim pesan panjang lewat voice note tanpa izin terlebih dahulu?",
        options: [
          "Karena suara kita jelek",
          "Karena penerima mungkin sedang di tempat umum atau rapat dan tidak bisa mendengarkannya",
          "Karena voice note tidak jelas",
          "Karena aplikasi tidak mendukung",
        ],
        correctIndex: 1,
        explanation:
          "Voice note tanpa konfirmasi bisa mengganggu penerima yang mungkin sedang tidak nyaman mendengarkan suara keras.",
        xpReward: 10,
      },
      {
        id: 7,
        question:
          "Apa yang sebaiknya dilakukan jika Anda salah mengirim pesan ke grup yang salah?",
        options: [
          "Diam saja dan berharap tidak ada yang baca",
          "Segera minta maaf dan jelaskan jika perlu, jangan menghapus pesan tanpa klarifikasi",
          "Keluar dari grup",
          "Menyalahkan orang lain",
        ],
        correctIndex: 1,
        explanation:
          "Meminta maaf dan klarifikasi adalah tindakan dewasa yang menunjukkan tanggung jawab atas kesalahan.",
        xpReward: 10,
      },
      {
        id: 8,
        question:
          "Mengapa kita sebaiknya tidak 'seenaknya' meng-mention (@) seseorang di grup besar?",
        options: [
          "Karena bisa membuat notifikasi mereka penuh dan mengganggu",
          "Karena tidak sopan",
          "Karena tidak boleh",
          "Karena fitur mention mahal",
        ],
        correctIndex: 1,
        explanation:
          "Mention yang tidak perlu dapat mengganggu orang yang tidak terlibat dalam percakapan.",
        xpReward: 10,
      },
      {
        id: 9,
        question:
          "Apa yang dimaksud dengan 'tone deaf' dalam komunikasi digital?",
        options: [
          "Tidak bisa mendengar",
          "Tidak peka terhadap situasi atau perasaan lawan bicara saat menulis pesan",
          "Suara yang pecah",
          "Microphone rusak",
        ],
        correctIndex: 1,
        explanation:
          "Tone deaf adalah ketidakmampuan membaca situasi sehingga pesan yang ditulis terasa tidak pantas atau menyakitkan.",
        xpReward: 10,
      },
      {
        id: 10,
        question:
          "Bagaimana cara terbaik merespons pesan yang sudah dibaca tapi belum sempat dibalas?",
        options: [
          "Diam saja dan tidak usah dibalas",
          "Blokir pengirimnya",
          "Minta maaf karena belum sempat membalas dan balas pesannya",
          "Hapus chat",
        ],
        correctIndex: 2,
        explanation:
          "Meminta maaf karena keterlambatan membalas dan tetap membalas pesan adalah bentuk menghargai lawan bicara.",
        xpReward: 10,
      },
    ],
  },
  "privasi-data": {
    moduleId: 5,
    moduleSlug: "privasi-data",
    moduleTitle: "Privasi Data",
    moduleDescription:
      "Pelajari cara melindungi data pribadi Anda dari penyalahgunaan di era digital.",
    difficulty: "intermediate",
    estimatedTimeMinutes: 5,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question:
          "Manakah dari data berikut yang termasuk kategori 'Data Pribadi Sensitif' yang TIDAK BOLEH dibagikan sembarangan?",
        options: [
          "Hobi dan makanan favorit Anda",
          "Nomor KTP (NIK), alamat rumah lengkap, dan nama ibu kandung",
          "Nama panggilan Anda",
          "Warna kesukaan Anda",
        ],
        correctIndex: 1,
        explanation:
          "Data seperti NIK, alamat lengkap, dan nama ibu kandung sering kali disalahgunakan untuk penipuan perbankan atau pinjaman online ilegal.",
        xpReward: 10,
      },
      {
        id: 2,
        question:
          "Apa bahaya utama dari tren kuis media sosial yang menanyakan nama kecil Anda, nama hewan peliharaan pertama, atau jalan tempat Anda tumbuh?",
        options: [
          "Kuis tersebut memakan kuota terlalu besar",
          "Itu bisa digunakan peretas untuk menebak jawaban pertanyaan keamanan akun Anda",
          "Kuis itu membuat ponsel panas",
          "Kuis itu memicu spam iklan di media sosial",
        ],
        correctIndex: 1,
        explanation:
          "Banyak pertanyaan kuis dirancang secara halus untuk mengumpulkan jawaban dari pertanyaan keamanan pemulihan sandi akun Anda.",
        xpReward: 10,
      },
      {
        id: 3,
        question:
          "Bagaimana cara terbaik mengamankan data pribadi saat menggunakan koneksi Wi-Fi publik gratis?",
        options: [
          "Matikan layar ponsel saat tidak digunakan",
          "Hindari melakukan transaksi finansial/login akun penting dan gunakan VPN jika memungkinkan",
          "Gunakan browser dengan mode penyamaran (Incognito Mode)",
          "Menghapus riwayat panggilan telepon",
        ],
        correctIndex: 1,
        explanation:
          "Wi-Fi publik rentan terhadap penyadapan data oleh peretas. Hindari transaksi perbankan atau memasukkan sandi saat terhubung dengannya.",
        xpReward: 10,
      },
      {
        id: 4,
        question:
          "Ketika menginstal aplikasi baru di smartphone, tindakan bijak terkait privasi adalah...",
        options: [
          "Memberikan semua izin yang diminta aplikasi tanpa membacanya",
          "Memeriksa dan hanya menyetujui izin (permissions) yang relevan dengan fungsi aplikasi",
          "Selalu menolak semua izin agar aplikasi tidak bekerja",
          "Membayar aplikasi tersebut agar tidak meminta izin",
        ],
        correctIndex: 1,
        explanation:
          "Aplikasi senter tidak butuh akses ke kontak atau lokasi Anda. Batasi izin aplikasi hanya untuk fitur yang dibutuhkan.",
        xpReward: 10,
      },
      {
        id: 5,
        question: "Apa yang dimaksud dengan 'data breach' (kebocoran data)?",
        options: [
          "Data yang sengaja dibagikan",
          "Insiden di mana data rahasia terbuka, dicuri, atau diakses tanpa izin",
          "Backup data rutin",
          "Enkripsi data",
        ],
        correctIndex: 1,
        explanation:
          "Kebocoran data adalah kejadian tidak aman di mana informasi sensitif diakses oleh pihak yang tidak berwenang.",
        xpReward: 10,
      },
      {
        id: 6,
        question:
          "Mengapa kita sebaiknya tidak mengunggah foto tiket pesawat atau boarding pass ke media sosial?",
        options: [
          "Karena tidak menarik",
          "Karena di dalam barcode tiket tersimpan informasi pribadi seperti nama lengkap dan booking reference",
          "Karena bisa membuat kita lupa",
          "Karena itu ilegal",
        ],
        correctIndex: 1,
        explanation:
          "Barcode tiket berisi data sensitif yang bisa dipindai orang jahat untuk mengakses informasi perjalanan Anda.",
        xpReward: 10,
      },
      {
        id: 7,
        question: "Apa yang dimaksud dengan 'doxxing'?",
        options: [
          "Menghapus data",
          "Mengumpulkan dan menyebarkan informasi pribadi seseorang tanpa izin untuk tujuan merugikan",
          "Mencadangkan data",
          "Mengenkripsi data",
        ],
        correctIndex: 1,
        explanation:
          "Doxxing adalah tindakan jahat menyebarkan data pribadi seperti alamat, nomor telepon, atau tempat kerja seseorang ke publik.",
        xpReward: 10,
      },
      {
        id: 8,
        question:
          "Mengapa kita perlu membaca 'Kebijakan Privasi' sebelum menggunakan suatu aplikasi?",
        options: [
          "Karena itu kewajiban hukum",
          "Untuk mengetahui data apa saja yang dikumpulkan aplikasi dan bagaimana data tersebut digunakan",
          "Karena aplikasi tidak akan berfungsi",
          "Tidak perlu dibaca karena terlalu panjang",
        ],
        correctIndex: 1,
        explanation:
          "Kebijakan privasi memberi tahu Anda tentang praktik pengumpulan dan penggunaan data oleh aplikasi tersebut.",
        xpReward: 10,
      },
      {
        id: 9,
        question:
          "Apa yang sebaiknya dilakukan jika Anda kehilangan ponsel yang berisi data pribadi penting?",
        options: [
          "Diam saja dan beli ponsel baru",
          "Segera laporkan kehilangan, ganti password semua akun penting, dan gunakan fitur remote wipe jika tersedia",
          "Tunggu sampai ponsel ditemukan",
          "Tidak melakukan apa-apa",
        ],
        correctIndex: 1,
        explanation:
          "Tindakan cepat mengamankan akun dan data bisa mencegah penyalahgunaan informasi pribadi Anda.",
        xpReward: 10,
      },
      {
        id: 10,
        question: "Apa risiko dari membagikan foto KTP di media sosial?",
        options: [
          "Tidak ada risiko",
          "Data KTP bisa digunakan untuk pinjaman online ilegal, penipuan, atau pembukaan akun bank fiktif",
          "KTP tidak berfungsi lagi",
          "Foto KTP akan kedaluwarsa",
        ],
        correctIndex: 1,
        explanation:
          "KTP berisi data pribadi sangat sensitif yang sering disalahgunakan untuk kejahatan identitas dan keuangan.",
        xpReward: 10,
      },
    ],
  },
  "phishing-alert": {
    moduleId: 6,
    moduleSlug: "phishing-alert",
    moduleTitle: "Phishing Alert",
    moduleDescription:
      "Waspadai umpan berbahaya! Belajar mengenali link dan email palsu yang menipu.",
    difficulty: "advanced",
    estimatedTimeMinutes: 30,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question:
          "Ciri utama dari email phishing yang mengatasnamakan bank adalah...",
        options: [
          "Menyapa Anda dengan nama lengkap",
          "Meminta Anda segera mengganti password lewat link dalam email",
          "Berisi penawaran kartu kredit baru",
          "Menyertakan nomor customer service resmi",
        ],
        correctIndex: 1,
        explanation:
          "Bank resmi tidak akan pernah meminta nasabahnya mengganti password dengan mengklik link langsung dari email. Itu adalah teknik phishing.",
        xpReward: 10,
      },
      {
        id: 2,
        question:
          "Jika kamu menerima link mencurigakan dari teman di WhatsApp, apa yang sebaiknya dilakukan?",
        options: [
          "Langsung mengkliknya karena dari teman",
          "Meneruskannya ke grup keluarga",
          "Mengonfirmasi ke teman tersebut melalui telepon atau chat lain sebelum klik",
          "Membukanya hanya jika menjanjikan hadiah",
        ],
        correctIndex: 2,
        explanation:
          "Akun temanmu mungkin diretas. Selalu konfirmasi kebenaran link tersebut dengan menghubungi temanmu, idealnya lewat jalur komunikasi lain.",
        xpReward: 10,
      },
      {
        id: 3,
        question:
          "Bagaimana cara membedakan URL situs asli dan situs palsu (phishing)?",
        options: [
          "Situs palsu selalu memiliki warna yang lebih mencolok",
          "Situs palsu tidak bisa dibuka di smartphone",
          "Memeriksa ejaan domain (misal: facebo0k.com alih-alih facebook.com)",
          "Situs asli selalu lambat dimuat",
        ],
        correctIndex: 2,
        explanation:
          "Pelaku phishing sering menggunakan typo-squatting, yaitu membuat domain yang ejaannya sangat mirip dengan aslinya namun sedikit berbeda.",
        xpReward: 15,
      },
      {
        id: 4,
        question:
          "Sebuah website memiliki ikon gembok keamanan dan menggunakan awalan 'HTTPS', namun meminta detail PIN ATM. Apakah website ini pasti aman dan resmi?",
        options: [
          "Ya, HTTPS berarti website 100% aman dan dikelola instansi resmi",
          "Ya, karena peretas tidak bisa menggunakan ikon gembok",
          "Tidak, karena HTTPS hanya digunakan untuk sosial media, bukan bank",
          "Tidak, HTTPS hanya mengenkripsi data, namun peretas juga bisa menggunakannya di situs web palsu mereka",
        ],
        correctIndex: 3,
        explanation:
          "Sertifikat HTTPS saat ini sangat mudah didapatkan secara gratis. Pelaku phishing sering menggunakannya agar situs palsu mereka terlihat meyakinkan.",
        xpReward: 15,
      },
      {
        id: 5,
        question:
          "Kamu menerima SMS peringatan bahwa paketmu tertahan di pihak ekspedisi dan menyertakan link aneh berformat .APK untuk melacak. Ini merupakan contoh dari...",
        options: [
          "Smishing (SMS Phishing)",
          "Vishing (Voice Phishing)",
          "Carding",
          "Deface",
        ],
        correctIndex: 0,
        explanation:
          "Smishing adalah varian dari phishing yang menggunakan media SMS atau pesan teks, sering dikombinasikan dengan file .APK untuk mencuri data di HP.",
        xpReward: 10,
      },
      {
        id: 6,
        question:
          "Sebuah email masuk menyebutkan nama lengkapmu, hobi spesifikmu, dan menawari diskon khusus di tempat yang sering kamu kunjungi. Apa jenis serangan yang sangat tertarget ini?",
        options: [
          "Phishing Biasa",
          "DDoS Attack",
          "Spear Phishing",
          "Ransomware",
        ],
        correctIndex: 2,
        explanation:
          "Spear Phishing adalah serangan yang ditargetkan secara spesifik kepada individu. Pelaku mengumpulkan data korbannya (seperti dari media sosial) agar email terlihat sangat relevan dan terpercaya.",
        xpReward: 15,
      },
      {
        id: 7,
        question:
          "Email dari pengirim tak dikenal mengirimkan lampiran berupa invoice dengan format file 'Tagihan_Bulan_Ini.exe'. Tindakan paling aman adalah...",
        options: [
          "Membuka file tersebut untuk memastikan tagihan apa",
          "Membalas email menanyakan detail tagihan sebelum membuka",
          "Meneruskannya ke teman untuk minta pendapat",
          "Langsung menghapus email tersebut tanpa mengunduh lampirannya",
        ],
        correctIndex: 3,
        explanation:
          "File dengan ekstensi .exe (executable) tak terduga dalam email hampir dipastikan adalah malware atau ransomware yang akan menginfeksi perangkat saat diklik.",
        xpReward: 15,
      },
      {
        id: 8,
        question:
          "Kamu menerima email dari 'Google Security' tentang login mencurigakan. Namun saat dicek, alamat email pengirimnya adalah 'security-update@gmail-support-xyz.com'. Kesimpulannya?",
        options: [
          "Itu asli karena menggunakan kata 'gmail' dan 'support'",
          "Itu palsu (phishing) karena domain email resminya tidak masuk akal dan bukan domain resmi Google",
          "Itu asli karena nama pengirim (Display Name) tertulis Google Security",
          "Harus mengklik link di dalamnya dulu untuk mengecek keasliannya",
        ],
        correctIndex: 1,
        explanation:
          "Pelaku phishing bisa memalsukan 'Nama Pengirim' sesuka hati, tetapi mereka tidak bisa memalsukan domain email resmi perusahaan. Selalu cek alamat email asli pengirim.",
        xpReward: 10,
      },
      {
        id: 9,
        question:
          "Taktik psikologis apa yang paling sering digunakan pelaku phishing agar korban segera bertindak tanpa berpikir panjang?",
        options: [
          "Menciptakan rasa takut dan urgensi (kepanikan)",
          "Menawarkan informasi edukasi yang panjang",
          "Menggunakan tata bahasa yang sangat formal dan puitis",
          "Meminta izin dan persetujuan terlebih dahulu sebelum mengirim link",
        ],
        correctIndex: 0,
        explanation:
          "Pelaku phishing menggunakan rekayasa sosial dengan menciptakan urgensi (contoh: 'Akun Anda akan ditutup dalam 24 jam!') agar korban panik dan langsung menuruti instruksi.",
        xpReward: 10,
      },
      {
        id: 10,
        question:
          "Seseorang menelepon mengaku dari pihak dompet digital ternama, mengatakan kamu memenangkan undian, dan meminta kode 6 digit (OTP) yang baru saja masuk ke SMS-mu. Apa yang sedang terjadi?",
        options: [
          "Kamu benar-benar menang undian dan harus segera memberikan kode tersebut",
          "Itu adalah prosedur standar verifikasi pemenang secara nasional",
          "Itu adalah Vishing (Voice Phishing), pelaku sedang mencoba mengambil alih akunmu",
          "Penelepon hanya pihak sistem yang ingin memastikan nomormu aktif",
        ],
        correctIndex: 2,
        explanation:
          "Kode OTP (One-Time Password) adalah kunci rahasia untuk masuk ke akunmu atau melakukan transaksi. Pihak resmi tidak akan PERNAH meminta kode OTP milikmu dengan alasan apa pun.",
        xpReward: 15,
      },
    ],
  },
};

