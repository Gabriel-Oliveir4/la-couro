"use client";
import { useEffect, useState } from "react";

type Mode = "system" | "light" | "dark";

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("system");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Mode) || "system";
    setMode(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "system") {
      const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", sysDark);
    } else {
      root.classList.toggle("dark", mode === "dark");
    }
    localStorage.setItem("theme", mode);
  }, [mode]);

  // ícone minimalista: alterna ao clicar
  function next() {
    setMode((m) => (m === "system" ? "light" : m === "light" ? "dark" : "system"));
  }

  const label = mode === "system" ? "Sistema" : mode === "light" ? "Claro" : "Escuro";
  return (
    <button
      type="button"
      onClick={next}
      aria-label={`Tema: ${label}`}
      title={`Tema: ${label} (clique para alternar)`}
      className="inline-flex items-center gap-2 h-9 px-3 rounded-xl border border-stroke bg-card text-text hover:opacity-90"
    >
      <ThemeIcon mode={mode} />
      <span className="text-sm">{label}</span>
    </button>
  );
}

function ThemeIcon({ mode }: { mode: "system" | "light" | "dark" }) {
  if (mode === "light") return <span>☀️</span>;
  if (mode === "dark") return <span>🌙</span>;
  return <span>💻</span>; // system
}
