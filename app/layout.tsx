import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "컴퓨터 교육책 — 디자인 시스템",
  description: "자격증이 아니라 실력이 남는 컴퓨터 교육책, 인쇄 페이지 디자인 시스템 미리보기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/*
          tokens.ts의 font.heading / font.body / font.mono 문자열이 그대로
          쓰이는 웹폰트입니다. 실제 인쇄 전 라이선스와 가독성을 다시
          확인하세요 (project/README.md "아직 정해지지 않은 것" 참고).
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gowun+Batang&family=Gowun+Dodum&family=IBM+Plex+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
