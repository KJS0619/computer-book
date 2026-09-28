"use client";

import { tokens } from "@/components/design-system";
import type { ParagraphBlock } from "@/types/editor";

interface ParagraphEditorProps {
  block: ParagraphBlock;
  onChange: (updates: Partial<ParagraphBlock>) => void;
  isActive: boolean;
  onFocus: () => void;
}

export function ParagraphEditor({ block, onChange, isActive, onFocus }: ParagraphEditorProps) {
  return (
    <textarea
      value={block.content}
      onChange={(e) => onChange({ content: e.target.value })}
      onFocus={onFocus}
      placeholder="본문 내용을 입력하세요..."
      style={{
        width: "100%",
        minHeight: 80,
        padding: tokens.space.space2,
        fontFamily: tokens.font.body,
        fontSize: tokens.type.body.fontSize,
        lineHeight: tokens.type.body.lineHeight,
        color: tokens.color.ink,
        background: isActive ? tokens.color.brandTint : tokens.color.paper,
        border: `1px solid ${isActive ? tokens.color.brand : tokens.color.surfaceBorder}`,
        borderRadius: tokens.radius.sm,
        resize: "vertical",
        outline: "none",
        transition: "all 0.15s",
      }}
    />
  );
}
