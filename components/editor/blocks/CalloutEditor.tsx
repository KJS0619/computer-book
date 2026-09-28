"use client";

import { tokens } from "@/components/design-system";
import type { CalloutBlock, CalloutVariant } from "@/types/editor";

interface CalloutEditorProps {
  block: CalloutBlock;
  onChange: (updates: Partial<CalloutBlock>) => void;
  isActive: boolean;
  onFocus: () => void;
}

const VARIANTS: { value: CalloutVariant; label: string; color: string; bg: string }[] = [
  { value: "concept", label: "핵심 개념", color: tokens.color.brand, bg: tokens.color.brandTint },
  { value: "practice", label: "직접 해보기", color: tokens.color.accent, bg: tokens.color.accentTint },
  { value: "mistake", label: "자주 하는 실수", color: tokens.color.caution, bg: tokens.color.cautionTint },
];

export function CalloutEditor({ block, onChange, isActive, onFocus }: CalloutEditorProps) {
  const variant = VARIANTS.find((v) => v.value === block.variant) ?? VARIANTS[0];

  return (
    <div
      style={{
        border: `1px solid ${isActive ? variant.color : tokens.color.surfaceBorder}`,
        borderRadius: tokens.radius.md,
        overflow: "hidden",
        transition: "all 0.15s",
      }}
    >
      {/* 헤더: 타입 선택 + 제목 */}
      <div
        style={{
          display: "flex",
          gap: tokens.space.space2,
          padding: tokens.space.space2,
          background: variant.bg,
          borderBottom: `1px solid ${tokens.color.surfaceBorder}`,
          borderLeft: `4px solid ${variant.color}`,
        }}
      >
        <select
          value={block.variant}
          onChange={(e) => onChange({ variant: e.target.value as CalloutVariant })}
          style={{
            padding: `${tokens.space.space1} ${tokens.space.space2}`,
            fontFamily: tokens.font.heading,
            fontSize: tokens.type.caption.fontSize,
            fontWeight: 600,
            color: variant.color,
            border: `1px solid ${variant.color}`,
            borderRadius: tokens.radius.sm,
            background: tokens.color.paper,
            cursor: "pointer",
          }}
        >
          {VARIANTS.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={block.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="제목 (예: 핵심 개념)"
          style={{
            flex: 1,
            padding: `${tokens.space.space1} ${tokens.space.space2}`,
            fontFamily: tokens.font.heading,
            fontSize: tokens.type.h3.fontSize,
            fontWeight: tokens.type.h3.fontWeight,
            color: variant.color,
            border: `1px solid ${tokens.color.surfaceBorder}`,
            borderRadius: tokens.radius.sm,
            background: tokens.color.paper,
            outline: "none",
          }}
        />
      </div>

      {/* 내용 입력 영역 */}
      <textarea
        value={block.content}
        onChange={(e) => onChange({ content: e.target.value })}
        onFocus={onFocus}
        placeholder="콜아웃 내용을 입력하세요..."
        style={{
          width: "100%",
          minHeight: 80,
          padding: tokens.space.space3,
          fontFamily: tokens.font.body,
          fontSize: tokens.type.body.fontSize,
          lineHeight: tokens.type.body.lineHeight,
          color: tokens.color.ink,
          background: variant.bg,
          border: "none",
          borderLeft: `4px solid ${variant.color}`,
          resize: "vertical",
          outline: "none",
        }}
      />
    </div>
  );
}
