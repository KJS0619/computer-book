"use client";

import { tokens } from "@/components/design-system";
import type { Chapter, Block, BlockType } from "@/types/editor";
import { BlockToolbar } from "./BlockToolbar";
import { BlockEditor } from "./BlockEditor";

interface ChapterEditorProps {
  chapter: Chapter;
  onUpdateChapter: (updates: Partial<Omit<Chapter, "id" | "blocks">>) => void;
  onAddBlock: (type: BlockType, afterBlockId?: string) => void;
  onUpdateBlock: (blockId: string, updates: Partial<Block>) => void;
  onDeleteBlock: (blockId: string) => void;
  activeBlockId: string | null;
  onSetActiveBlock: (blockId: string | null) => void;
}

export function ChapterEditor({
  chapter,
  onUpdateChapter,
  onAddBlock,
  onUpdateBlock,
  onDeleteBlock,
  activeBlockId,
  onSetActiveBlock,
}: ChapterEditorProps) {
  return (
    <div style={{ padding: tokens.space.space3 }}>
      {/* 챕터 메타 정보 */}
      <div
        style={{
          marginBottom: tokens.space.space4,
          padding: tokens.space.space3,
          background: tokens.color.surfaceTint,
          borderRadius: tokens.radius.md,
          border: `1px solid ${tokens.color.surfaceBorder}`,
        }}
      >
        <div style={{ marginBottom: tokens.space.space2 }}>
          <label
            style={{
              display: "block",
              fontFamily: tokens.font.heading,
              fontSize: tokens.type.caption.fontSize,
              color: tokens.color.inkMuted,
              marginBottom: tokens.space.space1,
            }}
          >
            장 번호
          </label>
          <input
            type="text"
            value={chapter.number}
            onChange={(e) => onUpdateChapter({ number: e.target.value })}
            placeholder="제1장"
            style={{
              width: "100%",
              padding: tokens.space.space2,
              fontFamily: tokens.font.heading,
              fontSize: tokens.type.h3.fontSize,
              fontWeight: tokens.type.h3.fontWeight,
              color: tokens.color.brand,
              background: tokens.color.paper,
              border: `1px solid ${tokens.color.surfaceBorder}`,
              borderRadius: tokens.radius.sm,
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: tokens.space.space2 }}>
          <label
            style={{
              display: "block",
              fontFamily: tokens.font.heading,
              fontSize: tokens.type.caption.fontSize,
              color: tokens.color.inkMuted,
              marginBottom: tokens.space.space1,
            }}
          >
            장 제목
          </label>
          <input
            type="text"
            value={chapter.title}
            onChange={(e) => onUpdateChapter({ title: e.target.value })}
            placeholder="트랜잭션은 왜 실패하는가"
            style={{
              width: "100%",
              padding: tokens.space.space2,
              fontFamily: tokens.font.heading,
              fontSize: tokens.type.h1.fontSize,
              fontWeight: tokens.type.h1.fontWeight,
              color: tokens.color.ink,
              background: tokens.color.paper,
              border: `1px solid ${tokens.color.surfaceBorder}`,
              borderRadius: tokens.radius.sm,
              outline: "none",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontFamily: tokens.font.heading,
              fontSize: tokens.type.caption.fontSize,
              color: tokens.color.inkMuted,
              marginBottom: tokens.space.space1,
            }}
          >
            리드 문구
          </label>
          <textarea
            value={chapter.lead}
            onChange={(e) => onUpdateChapter({ lead: e.target.value })}
            placeholder="이번 장에서 다룰 내용을 간단히 소개하는 문장..."
            style={{
              width: "100%",
              minHeight: 80,
              padding: tokens.space.space2,
              fontFamily: tokens.font.body,
              fontSize: tokens.type.bodyLead.fontSize,
              lineHeight: tokens.type.bodyLead.lineHeight,
              color: tokens.color.ink,
              background: tokens.color.paper,
              border: `1px solid ${tokens.color.surfaceBorder}`,
              borderRadius: tokens.radius.sm,
              resize: "vertical",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* 블록 추가 툴바 */}
      <BlockToolbar onAddBlock={(type) => onAddBlock(type)} />

      {/* 블록 목록 */}
      <div>
        {chapter.blocks.length === 0 ? (
          <div
            style={{
              padding: tokens.space.space6,
              textAlign: "center",
              color: tokens.color.inkMuted,
              fontFamily: tokens.font.body,
              fontSize: tokens.type.body.fontSize,
              background: tokens.color.surfaceTint,
              borderRadius: tokens.radius.md,
              border: `2px dashed ${tokens.color.surfaceBorder}`,
            }}
          >
            위 버튼을 눌러 블록을 추가하세요
          </div>
        ) : (
          chapter.blocks.map((block) => (
            <BlockEditor
              key={block.id}
              block={block}
              onChange={(updates) => onUpdateBlock(block.id, updates)}
              onDelete={() => onDeleteBlock(block.id)}
              isActive={activeBlockId === block.id}
              onFocus={() => onSetActiveBlock(block.id)}
            />
          ))
        )}
      </div>

      {/* 블록이 있을 때 하단에도 추가 버튼 표시 */}
      {chapter.blocks.length > 0 && (
        <div style={{ marginTop: tokens.space.space3 }}>
          <BlockToolbar
            onAddBlock={(type) =>
              onAddBlock(type, chapter.blocks[chapter.blocks.length - 1]?.id)
            }
          />
        </div>
      )}
    </div>
  );
}
