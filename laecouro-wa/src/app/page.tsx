"use client";
import { useMemo, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle"; // você já tem esse arquivo

export default function Page() {
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState("");
  const [descricao, setDescricao] = useState("");

  const PHONE = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "555599071463").replace(/\D/g, "");
  const disabled = useMemo(() => !nome.trim() || !assunto.trim() || !descricao.trim(), [nome, assunto, descricao]);

  function buildMessage() {
    return `*Contato pelo site - La e Couro*\n\n*Nome:* ${nome}\n*Assunto:* ${assunto}\n*Descrição:*\n${descricao}`;
  }

  function openWhatsApp() {
    const text = encodeURIComponent(buildMessage());
    const waApp = `whatsapp://send?phone=${PHONE}&text=${text}`;
    const waWeb = `https://wa.me/${PHONE}?text=${text}`;
    const ua = navigator.userAgent || "";
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);

    if (isIOS) {
      const t = setTimeout(() => { window.location.href = waWeb; }, 700);
      window.location.href = waApp;
      setTimeout(() => clearTimeout(t), 2000);
      return;
    }
    if (isAndroid) {
      window.location.href = waApp;
      setTimeout(() => { window.open(waWeb, "_blank", "noopener,noreferrer"); }, 600);
      return;
    }
    window.open(waWeb, "_blank", "noopener,noreferrer");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!disabled) openWhatsApp();
  }

  return (
    <main className="min-h-dvh grid place-items-start">
      {/* Header */}
      <header className="w-full border-b border-stroke/60 bg-card/30 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-brand/15 flex items-center justify-center">
              <span className="text-brand font-bold">LC</span>
            </div>
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight">La e Couro</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-mute hidden sm:inline">Contato via WhatsApp</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Card sem dependências externas */}
      <section className="w-full px-4 sm:px-6">
        <div className="w-full max-w-xl mx-auto mt-10 p-6 sm:p-8 rounded-2xl bg-card border border-stroke shadow-[0_6px_24px_rgba(0,0,0,0.25)]">
          <form onSubmit={onSubmit} className="grid gap-5">
            <div>
              <h2 className="text-xl font-semibold">Fale com a La e Couro</h2>
              <p className="text-mute mt-1">Preencha e abriremos o WhatsApp com a mensagem pronta.</p>
            </div>

            <Field id="nome" label="Nome" value={nome} onChange={setNome} placeholder="Seu nome" />
            <Field id="assunto" label="Assunto" value={assunto} onChange={setAssunto} placeholder="Sobre o que é?" />
            <Field id="descricao" label="Descrição" value={descricao} onChange={setDescricao} multiline placeholder="Explique rapidamente" />

            <button
              type="submit"
              disabled={disabled}
              className={`h-12 rounded-xl font-semibold transition-colors
                ${disabled ? "bg-stroke text-mute cursor-not-allowed" : "bg-brand text-bg hover:opacity-95 active:opacity-90"}`}
            >
              Abrir WhatsApp
            </button>

            <p className="text-center text-sm text-mute">
              Enviaremos para: <code className="text-text/90">{PHONE}</code>
            </p>
          </form>
        </div>
      </section>

      <footer className="w-full mt-6 pb-6 text-center text-xs text-mute">
        © {new Date().getFullYear()} La e Couro
      </footer>
    </main>
  );
}

function Field({
  id, label, value, onChange, placeholder, multiline
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; placeholder?: string; multiline?: boolean;
}) {
  const base = "w-full rounded-xl border border-stroke bg-bg/60 focus:bg-bg/80 outline-none text-text placeholder:text-mute px-4 py-3 transition-shadow focus:ring-2 focus:ring-brand/30";
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm text-text/90">{label}</label>
      {multiline ? (
        <textarea id={id} className={base + " min-h-28 resize-y"} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      ) : (
        <input id={id} className={base} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );
}
