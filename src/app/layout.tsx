// Root layout is a pass-through — the [locale]/layout.tsx renders <html> and <body>
// with the correct lang attribute per locale. Fonts, CSS, and metadata live there.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
