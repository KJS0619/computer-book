import type { CSSProperties } from "react";
import { tokens } from "./tokens";

export interface RunningFooterProps {
  /** 예: "제3장 · 트랜잭션은 왜 실패하는가" */
  chapterLabel: string;
  pageNumber: number;
}

export function RunningFooter({ chapterLabel, pageNumber }: RunningFooterProps) {
  const captionStyle: CSSProperties = {
    fontFamily: tokens.font.body,
    fontSize: tokens.type.caption.fontSize,
    lineHeight: tokens.type.caption.lineHeight,
    fontWeight: tokens.type.caption.fontWeight,
    color: tokens.color.inkMuted,
  };

  return (
    <div style={{ width: 520, margin: "0 auto", paddingTop: 48 }}>
      <div
        style={{
          borderTop: `1px solid ${tokens.color.surfaceBorder}`,
          paddingTop: tokens.space.space2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={captionStyle}>{chapterLabel}</span>
        <span style={captionStyle}>{pageNumber}</span>
      </div>
    </div>
  );
}

export default RunningFooter;
