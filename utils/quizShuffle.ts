import type { ModuleQuestion } from "@/data/moduleQuizData";
import type { QuizQuestion } from "@/data/quizData";

// ─── Fisher-Yates Shuffle ─────────────────────────────────────
// Returns a new shuffled array (does not mutate original)
export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ─── Shuffle Module Quiz Questions + Options ──────────────────
// Shuffles question order AND the options within each question,
// updating correctIndex to match the new option positions.
export function shuffleModuleQuestions(
  questions: ModuleQuestion[]
): ModuleQuestion[] {
  // 1. Shuffle question order
  const shuffledQuestions = shuffleArray(questions);

  // 2. For each question, shuffle the options and track correct answer
  return shuffledQuestions.map((q) => {
    const correctAnswer = q.options[q.correctIndex];
    const shuffledOptions = shuffleArray(q.options);
    const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);

    return {
      ...q,
      options: shuffledOptions,
      correctIndex: newCorrectIndex,
    };
  });
}

// ─── Shuffle Standalone Quiz Questions ────────────────────────
// Only shuffles question order (Hoax/Fakta is binary, no option shuffle needed)
export function shuffleStandaloneQuestions(
  questions: QuizQuestion[]
): QuizQuestion[] {
  return shuffleArray(questions);
}
