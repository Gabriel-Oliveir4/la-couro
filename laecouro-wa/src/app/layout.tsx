import "./globals.css";              // precisa estar na primeira linha
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-dvh bg-bg text-text antialiased">{children}</body>
    </html>
  );
}
