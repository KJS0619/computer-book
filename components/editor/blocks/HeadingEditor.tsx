"use client";

import { tokens } from "@/components/design-system";
import type { HeadingBlock, HeadingLevel } from "@/types/editor";

interface HeadingEditorProps {
  block: HeadingBlock;
  onChange: (updates: Partial<HeadingBlock>) => void;
  isActive: boolean;
  onFocus: () => void;
}

export function HeadingEditor({ block, onChange, isActive, onFocus }: HeadingEditorProps) {
  const typeStyle = block.level === 2 ? tokens.type.h2 : tokens.type.h3;

  return (
    <div
      style={{
        display: "flex",
        gap: tokens.space.space2,
        alignItems: "center",
      }}
    >
      <select
        value={block.level}
        onChange={(e) => onChange({ level: Number(e.target.value) as HeadingLevel })}
        style={{
          padding: tokens.space.space1,
          fontFamily: tokens.font.heading,
          fontSize: tokens.type.caption.fontSize,
          border: `1px solid ${tokens.color.surfaceBorder}`,
          borderRadius: tokens.radius.sm,
          background: tokens.color.paper,
          cursor: "pointer",
        }}
      >
        <option value={2}>H2</option>
        <option value={3}>H3</option>
      </select>
      <input
        type="text"
        value={block.text}
        onChange={(e) => onChange({ text: e.target.value })}
        onFocus={onFocus}
        placeholder="제목을 입력하세요..."
        style={{
          flex: 1,
          padding: tokens.space.space2,
          fontFamily: tokens.font.heading,
          fontSize: typeStyle.fontSize,
          fontWeight: typeStyle.fontWeight,
          color: tokens.color.ink,
          background: isActive ? tokens.color.brandTint : tokens.color.paper,
          border: `1px solid ${isActive ? tokens.color.brand : tokens.color.surfaceBorder}`,
          borderRadius: tokens.radius.sm,
          outline: "none",
          transition: "all 0.15s",
        }}
      />
    </div>
  );
}
