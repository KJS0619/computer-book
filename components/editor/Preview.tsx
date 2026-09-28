"use client";

import {
  tokens,
  ChapterOpener,
  Callout,
  CodeBlock,
} from "@/components/design-system";
import type { Chapter, Block } from "@/types/editor";

interface PreviewProps {
  chapter: Chapter;
}

function renderBlock(block: Block) {
  switch (block.type) {
    case "paragraph":
      if (!block.content) return null;
      return (
        <p
          key={block.id}
          style={{
            fontFamily: tokens.font.body,
            fontSize: tokens.type.body.fontSize,
            lineHeight: tokens.type.body.lineHeight,
            color: tokens.color.ink,
            margin: `0 0 ${tokens.space.space3}`,
            whiteSpace: "pre-wrap",
          }}
        >
          {block.content}
        </p>
      );

    case "heading":
      if (!block.text) return null;
      const HeadingTag = block.level === 2 ? "h2" : "h3";
      const headingStyle = block.level === 2 ? tokens.type.h2 : tokens.type.h3;
      return (
        <HeadingTag
          key={block.id}
          style={{
            fontFamily: tokens.font.heading,
            fontSize: headingStyle.fontSize,
            lineHeight: headingStyle.lineHeight,
            fontWeight: headingStyle.fontWeight,
            color: tokens.color.ink,
            margin: `${tokens.space.space4} 0 ${tokens.space.space2}`,
          }}
        >
          {block.text}
        </HeadingTag>
      );

    case "code":
      if (!block.code) return null;
      return (
        <div key={block.id} style={{ margin: `${tokens.space.space3} 0` }}>
          <CodeBlock
            filename={block.filename}
            language={block.language}
            code={block.code}
          />
        </div>
      );

    case "callout":
      if (!block.content && !block.title) return null;
      return (
        <div key={block.id} style={{ margin: `${tokens.space.space3} 0` }}>
          <Callout variant={block.variant} title={block.title || "제목 없음"}>
            {block.content}
          </Callout>
        </div>
      );

    default:
      return null;
  }
}

export function Preview({ chapter }: PreviewProps) {
  const hasChapterMeta = chapter.number || chapter.title || chapter.lead;

  return (
    <div
      style={{
        background: tokens.color.paper,
        borderRadius: tokens.radius.md,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      {/* 챕터 오프너 */}
      {hasChapterMeta && (
        <ChapterOpener
          chapterNumber={chapter.number || "제?장"}
          title={chapter.title || "(제목 없음)"}
          lead={chapter.lead || ""}
        />
      )}

      {/* 본문 블록들 */}
      {chapter.blocks.length > 0 && (
        <div
          style={{
            padding: `${tokens.space.space4} ${tokens.space.space6}`,
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          {chapter.blocks.map(renderBlock)}
        </div>
      )}

      {/* 빈 상태 */}
      {!hasChapterMeta && chapter.blocks.length === 0 && (
        <div
          style={{
            padding: tokens.space.space8,
            textAlign: "center",
            color: tokens.color.inkMuted,
            fontFamily: tokens.font.body,
          }}
        >
          왼쪽에서 내용을 입력하면 여기에 미리보기가 표시됩니다
        </div>
      )}
    </div>
  );
}
