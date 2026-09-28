import { tokens } from "./tokens";

export type CodeLanguage = "java" | "sql" | "plain";

export interface CodeBlockProps {
  filename?: string;
  code: string;
  language?: CodeLanguage;
}

const KEYWORDS: Record<CodeLanguage, string[]> = {
  java: [
    "public", "private", "protected", "class", "interface", "extends",
    "implements", "static", "final", "void", "new", "return", "if", "else",
    "for", "while", "try", "catch", "finally", "throw", "throws", "import",
    "package", "this", "super",
  ],
  sql: [
    "SELECT", "FROM", "WHERE", "JOIN", "INNER", "LEFT", "RIGHT", "ON",
    "GROUP", "BY", "ORDER", "INSERT", "INTO", "VALUES", "UPDATE", "SET",
    "DELETE", "CREATE", "TABLE", "PRIMARY", "KEY", "FOREIGN", "NOT", "NULL",
    "AND", "OR",
  ],
  plain: [],
};

function escapeHtml(code: string): string {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlight(code: string, language: CodeLanguage): string {
  let html = escapeHtml(code);

  // 문자열 리터럴 (escapeHtml이 이미 처리한 뒤라 " 는 그대로 남아 있습니다)
  html = html.replace(
    /"([^"]*)"/g,
    (_match, inner: string) =>
      `<span style="color:${tokens.color.codeLiteral}">"${inner}"</span>`
  );

  // 숫자 리터럴
  html = html.replace(
    /\b(\d+)\b/g,
    `<span style="color:${tokens.color.codeLiteral}">$1</span>`
  );

  // 키워드
  const keywords = KEYWORDS[language];
  if (keywords.length > 0) {
    const pattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
    html = html.replace(
      pattern,
      `<span style="color:${tokens.color.codeKeyword}">$1</span>`
    );
  }

  return html;
}

export function CodeBlock({ filename, code, language = "plain" }: CodeBlockProps) {
  return (
    <div style={{ width: 520, margin: "0 auto" }}>
      {filename && (
        <div
          style={{
            fontFamily: tokens.font.mono,
            fontSize: tokens.type.caption.fontSize,
            lineHeight: tokens.type.caption.lineHeight,
            color: tokens.color.inkMuted,
            margin: `0 0 ${tokens.space.space1} ${tokens.space.space1}`,
          }}
        >
          {filename}
        </div>
      )}
      <pre
        style={{
          fontFamily: tokens.font.mono,
          fontSize: tokens.type.code.fontSize,
          lineHeight: 1.6,
          background: tokens.color.codeBg,
          color: tokens.color.codeInk,
          borderRadius: tokens.radius.md,
          padding: tokens.space.space3,
          margin: 0,
          overflow: "auto",
        }}
      >
        <code
          // 키워드/리터럴 강조를 위해 생성된 HTML만 주입합니다.
          // code 값은 항상 escapeHtml을 거치므로, 사용자가 직접 입력한
          // 신뢰할 수 없는 문자열을 그대로 넘기는 용도로는 쓰지 마세요.
          dangerouslySetInnerHTML={{ __html: highlight(code, language) }}
        />
      </pre>
    </div>
  );
}

export default CodeBlock;
