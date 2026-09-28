"use client";

import { tokens } from "@/components/design-system";
import type { BlockType } from "@/types/editor";

interface BlockToolbarProps {
  onAddBlock: (type: BlockType) => void;
}

const BLOCK_OPTIONS: { type: BlockType; label: string; icon: string }[] = [
  { type: "paragraph", label: "단락", icon: "¶" },
  { type: "heading", label: "제목", icon: "H" },
  { type: "code", label: "코드", icon: "</>" },
  { type: "callout", label: "콜아웃", icon: "💡" },
];

export function BlockToolbar({ onAddBlock }: BlockToolbarProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: tokens.space.space2,
        padding: tokens.space.space2,
        background: tokens.color.surfaceTint,
        borderRadius: tokens.radius.md,
        marginBottom: tokens.space.space3,
      }}
    >
      <span
        style={{
          fontFamily: tokens.font.heading,
          fontSize: tokens.type.caption.fontSize,
          color: tokens.color.inkMuted,
          alignSelf: "center",
          marginRight: tokens.space.space1,
        }}
      >
        블록 추가:
      </span>
      {BLOCK_OPTIONS.map((opt) => (
        <button
          key={opt.type}
          onClick={() => onAddBlock(opt.type)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: `${tokens.space.space1} ${tokens.space.space2}`,
            background: tokens.color.paper,
            border: `1px solid ${tokens.color.surfaceBorder}`,
            borderRadius: tokens.radius.sm,
            fontFamily: tokens.font.heading,
            fontSize: tokens.type.caption.fontSize,
            color: tokens.color.ink,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = tokens.color.brand;
            e.currentTarget.style.color = tokens.color.brand;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = tokens.color.surfaceBorder;
            e.currentTarget.style.color = tokens.color.ink;
          }}
        >
          <span>{opt.icon}</span>
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
