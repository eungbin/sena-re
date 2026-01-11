import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "세븐나이츠-리버스",
  description: "세븐나이츠-리버스 정보",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
