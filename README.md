# Gameducate 🎮📚

**Gameducate** adalah platform pembelajaran berbasis gamifikasi yang menggabungkan mekanik permainan dengan pendidikan untuk meningkatkan engagement dan retensi pengetahuan pengguna.

## Deskripsi Project

Gameducate adalah aplikasi web yang dirancang untuk membuat pembelajaran lebih interaktif dan menyenangkan melalui:

- **Skill Tree System**: Sistem skill tree yang terinspirasi dari RPG untuk melacak dan mengembangkan kemampuan pengguna
- **Gamified Learning**: Mekanik permainan seperti achievements, level up, dan rewards untuk memotivasi pengguna
- **Statistics Tracking**: Sistem statistik untuk memantau progress pembelajaran
- **Responsive UI**: Interface yang dibangun dengan React dan Next.js

## Tech Stack

- **Framework**: Next.js
- **Frontend**: React
- **Language**: JavaScript/TypeScript
- **Styling**: CSS / globals.css
- **Linting**: ESLint
- **Package Manager**: npm

## Project Structure (ringkasan)

```
app/
components/
data/
public/
package.json
```

## Menjalankan Secara Lokal

1. Install dependencies

```bash
npm install
```

2. Jalankan development server

```bash
npm run dev
```

Buka http://localhost:3000 di browser.

## Cara Push Project Ini ke Repository GitHub Anda

Jika ini adalah proyek baru dan Anda ingin saya bantu menyiapkannya untuk di-push, ikuti langkah ini di mesin Anda (ganti URL dengan repository Anda):

```bash
# Inisialisasi git (jika belum ada)
git init
git add .
git commit -m "Initial commit"
git branch -M main
# Tambahkan remote (ganti URL dengan repo Anda)
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

Catatan: jika repositori belum dibuat di GitHub, buat repo baru dan salin URL remote yang disediakan GitHub.

Jika Anda ingin saya melakukan push untuk Anda, berikan URL remote repository dan akses (token atau instruksi), atau jalankan perintah di atas di mesin Anda.

## .gitignore yang disarankan

Tambahkan file `.gitignore` dengan isi berikut untuk proyek Next.js / Node:

```
node_modules/
.next/
out/
dist/
.env
.env.local
.env.*.local
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.vscode/
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

Kontribusi dan saran diterima. Proyek ini dibuat sebagai bagian dari ProgramMagang — Semester 6.

---

**Status**: 🚧 In Development.
