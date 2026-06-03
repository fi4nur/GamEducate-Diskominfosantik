import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuizGame from "@/components/QuizGame";

export const metadata: Metadata = {
  title: "Quiz Detektif Hoax — Gameducate",
  description:
    "Uji kemampuanmu mengenali hoax dan informasi palsu lewat game quiz interaktif. Kumpulkan poin dan jadilah Master Detektif!",
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-surface-50 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <QuizGame />
      </div>
      <Footer />
    </main>
  );
}
