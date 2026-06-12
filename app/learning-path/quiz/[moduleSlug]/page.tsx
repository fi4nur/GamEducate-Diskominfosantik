"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleQuizGame from "@/components/ModuleQuizGame";

export default function ModuleQuizPage() {
  const router = useRouter();
  const params = useParams();
  const moduleSlug = params?.moduleSlug as string;

  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Access control: must come from learning path page
    const fromPath = sessionStorage.getItem("fromLearningPath");
    if (fromPath !== "true") {
      setAuthorized(false);
      router.replace("/learning-path");
    } else {
      // Clear flag after entering so they can't bookmark it or refresh and skip
      // Wait, let's keep it or clear it. If we clear it immediately, refreshes will block.
      // Let's clear it on page unload or keep it for the session. Keeping it for session is fine, 
      // but let's allow it during the session. Let's just keep it to avoid blocking refresh.
      setAuthorized(true);
    }
  }, [router]);

  if (authorized === null) {
    return (
      <main className="min-h-screen bg-surface-50 flex flex-col justify-between">
        <Navbar activePage="learning-path" />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-brand-200 border-t-brand-700" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!authorized) {
    return null; // Redirecting...
  }

  return (
    <main className="min-h-screen bg-surface-50 flex flex-col justify-between">
      <Navbar activePage="learning-path" />
      <div className="flex-1">
        <ModuleQuizGame moduleSlug={moduleSlug} />
      </div>
      <Footer />
    </main>
  );
}
