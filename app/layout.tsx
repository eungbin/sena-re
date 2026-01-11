import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./_components/Header";

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
      <body className="min-h-screen antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
