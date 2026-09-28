"use client";

import { tokens } from "@/components/design-system";
import type { CodeBlock, CodeLanguage } from "@/types/editor";

interface CodeEditorProps {
  block: CodeBlock;
  onChange: (updates: Partial<CodeBlock>) => void;
  isActive: boolean;
  onFocus: () => void;
}

const LANGUAGES: { value: CodeLanguage; label: string }[] = [
  { value: "java", label: "Java" },
  { value: "sql", label: "SQL" },
  { value: "plain", label: "Plain" },
];

export function CodeEditor({ block, onChange, isActive, onFocus }: CodeEditorProps) {
  return (
    <div
      style={{
        border: `1px solid ${isActive ? tokens.color.brand : tokens.color.surfaceBorder}`,
        borderRadius: tokens.radius.md,
        overflow: "hidden",
        transition: "all 0.15s",
      }}
    >
      {/* 헤더: 파일명 + 언어 선택 */}
      <div
        style={{
          display: "flex",
          gap: tokens.space.space2,
          padding: tokens.space.space2,
          background: tokens.color.surfaceTint,
          borderBottom: `1px solid ${tokens.color.surfaceBorder}`,
        }}
      >
        <input
          type="text"
          value={block.filename}
          onChange={(e) => onChange({ filename: e.target.value })}
          placeholder="파일명 (예: Account.java)"
          style={{
            flex: 1,
            padding: `${tokens.space.space1} ${tokens.space.space2}`,
            fontFamily: tokens.font.mono,
            fontSize: tokens.type.caption.fontSize,
            border: `1px solid ${tokens.color.surfaceBorder}`,
            borderRadius: tokens.radius.sm,
            background: tokens.color.paper,
            outline: "none",
          }}
        />
        <select
          value={block.language}
          onChange={(e) => onChange({ language: e.target.value as CodeLanguage })}
          style={{
            padding: `${tokens.space.space1} ${tokens.space.space2}`,
            fontFamily: tokens.font.mono,
            fontSize: tokens.type.caption.fontSize,
            border: `1px solid ${tokens.color.surfaceBorder}`,
            borderRadius: tokens.radius.sm,
            background: tokens.color.paper,
            cursor: "pointer",
          }}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* 코드 입력 영역 */}
      <textarea
        value={block.code}
        onChange={(e) => onChange({ code: e.target.value })}
        onFocus={onFocus}
        placeholder="코드를 입력하세요..."
        style={{
          width: "100%",
          minHeight: 150,
          padding: tokens.space.space3,
          fontFamily: tokens.font.mono,
          fontSize: tokens.type.code.fontSize,
          lineHeight: 1.6,
          color: tokens.color.codeInk,
          background: tokens.color.codeBg,
          border: "none",
          resize: "vertical",
          outline: "none",
        }}
      />
    </div>
  );
}
