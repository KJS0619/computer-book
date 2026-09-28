import { tokens } from "./tokens";

export interface ChapterOpenerProps {
  /** 예: "제3장" */
  chapterNumber: string;
  title: string;
  lead: string;
}

export function ChapterOpener({ chapterNumber, title, lead }: ChapterOpenerProps) {
  return (
    <div
      style={{
        background: tokens.color.paper,
        width: 560,
        margin: "0 auto",
        padding: "48px 56px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontFamily: tokens.font.heading,
          fontSize: tokens.type.h3.fontSize,
          lineHeight: tokens.type.h3.lineHeight,
          fontWeight: tokens.type.h3.fontWeight,
          color: tokens.color.brand,
          letterSpacing: "0.06em",
          margin: 0,
        }}
      >
        {chapterNumber}
      </div>

      <div style={{ height: tokens.space.space8 }} />

      <h1
        style={{
          fontFamily: tokens.font.heading,
          fontSize: tokens.type.h1.fontSize,
          lineHeight: tokens.type.h1.lineHeight,
          fontWeight: tokens.type.h1.fontWeight,
          color: tokens.color.ink,
          margin: 0,
        }}
      >
        {title}
      </h1>

      <div style={{ height: tokens.space.space4 }} />

      <p
        style={{
          fontFamily: tokens.font.body,
          fontSize: tokens.type.bodyLead.fontSize,
          lineHeight: tokens.type.bodyLead.lineHeight,
          fontWeight: tokens.type.bodyLead.fontWeight,
          color: tokens.color.ink,
          margin: 0,
        }}
      >
        {lead}
      </p>
    </div>
  );
}

export default ChapterOpener;
