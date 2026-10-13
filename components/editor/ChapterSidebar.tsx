"use client";

import { tokens } from "@/components/design-system";
import type { Chapter } from "@/types/editor";

interface ChapterSidebarProps {
  chapters: Chapter[];
  activeChapterId: string | null;
  onSelectChapter: (chapterId: string) => void;
  onAddChapter: () => void;
  onDeleteChapter: (chapterId: string) => void;
  /** 좁은 화면(앱)에서 목차를 화면 전체 폭으로 보여줄 때 사용. 기본값 false 는 기존 220px 고정. */
  fullWidth?: boolean;
}

export function ChapterSidebar({
  chapters,
  activeChapterId,
  onSelectChapter,
  onAddChapter,
  onDeleteChapter,
  fullWidth = false,
}: ChapterSidebarProps) {
  return (
    <div
      style={{
        width: fullWidth ? "100%" : 220,
        flexShrink: 0,
        background: tokens.color.paper,
        borderRight: `1px solid ${tokens.color.surfaceBorder}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          padding: tokens.space.space3,
          borderBottom: `1px solid ${tokens.color.surfaceBorder}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: tokens.font.heading,
              fontSize: tokens.type.caption.fontSize,
              color: tokens.color.inkMuted,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            챕터 목록
          </span>
          <button
            onClick={onAddChapter}
            style={{
              padding: "4px 8px",
              fontFamily: tokens.font.heading,
              fontSize: tokens.type.caption.fontSize,
              color: tokens.color.brand,
              background: tokens.color.brandTint,
              border: `1px solid ${tokens.color.brand}`,
              borderRadius: tokens.radius.sm,
              cursor: "pointer",
            }}
          >
            + 추가
          </button>
        </div>
      </div>

      {/* 챕터 목록 */}
      <div style={{ flex: 1, overflow: "auto", padding: tokens.space.space2 }}>
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            onClick={() => onSelectChapter(chapter.id)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: tokens.space.space2,
              marginBottom: tokens.space.space1,
              background:
                activeChapterId === chapter.id ? tokens.color.brandTint : "transparent",
              border: `1px solid ${
                activeChapterId === chapter.id ? tokens.color.brand : "transparent"
              }`,
              borderRadius: tokens.radius.sm,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: tokens.font.heading,
                  fontSize: tokens.type.caption.fontSize,
                  color: tokens.color.brand,
                  marginBottom: 2,
                }}
              >
                {chapter.number || `챕터 ${index + 1}`}
              </div>
              <div
                style={{
                  fontFamily: tokens.font.heading,
                  fontSize: tokens.type.body.fontSize,
                  fontWeight: 600,
                  color: tokens.color.ink,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {chapter.title || "(제목 없음)"}
              </div>
              <div
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: "10px",
                  color: tokens.color.inkMuted,
                  marginTop: 2,
                }}
              >
                {chapter.blocks.length}개 블록
              </div>
            </div>

            {/* 삭제 버튼 */}
            {chapters.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("이 챕터를 삭제하시겠습니까?")) {
                    onDeleteChapter(chapter.id);
                  }
                }}
                style={{
                  padding: "4px",
                  background: "transparent",
                  border: "none",
                  color: tokens.color.caution,
                  cursor: "pointer",
                  opacity: 0.5,
                  transition: "opacity 0.15s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "0.5")}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
