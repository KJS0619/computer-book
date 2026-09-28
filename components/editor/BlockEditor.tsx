"use client";

import { tokens } from "@/components/design-system";
import type { Block } from "@/types/editor";
import { ParagraphEditor, HeadingEditor, CodeEditor, CalloutEditor } from "./blocks";

interface BlockEditorProps {
  block: Block;
  onChange: (updates: Partial<Block>) => void;
  onDelete: () => void;
  isActive: boolean;
  onFocus: () => void;
}

export function BlockEditor({ block, onChange, onDelete, isActive, onFocus }: BlockEditorProps) {
  const renderBlockEditor = () => {
    switch (block.type) {
      case "paragraph":
        return (
          <ParagraphEditor
            block={block}
            onChange={onChange}
            isActive={isActive}
            onFocus={onFocus}
          />
        );
      case "heading":
        return (
          <HeadingEditor
            block={block}
            onChange={onChange}
            isActive={isActive}
            onFocus={onFocus}
          />
        );
      case "code":
        return (
          <CodeEditor
            block={block}
            onChange={onChange}
            isActive={isActive}
            onFocus={onFocus}
          />
        );
      case "callout":
        return (
          <CalloutEditor
            block={block}
            onChange={onChange}
            isActive={isActive}
            onFocus={onFocus}
          />
        );
      default:
        return <div>지원되지 않는 블록 타입</div>;
    }
  };

  const getBlockLabel = () => {
    switch (block.type) {
      case "paragraph":
        return "단락";
      case "heading":
        return "제목";
      case "code":
        return "코드";
      case "callout":
        return "콜아웃";
      case "image":
        return "이미지";
      default:
        return "블록";
    }
  };

  return (
    <div
      style={{
        position: "relative",
        padding: tokens.space.space2,
        marginBottom: tokens.space.space2,
        background: isActive ? "rgba(30, 90, 138, 0.03)" : "transparent",
        borderRadius: tokens.radius.md,
        transition: "all 0.15s",
      }}
    >
      {/* 블록 헤더 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: tokens.space.space1,
        }}
      >
        <span
          style={{
            fontFamily: tokens.font.heading,
            fontSize: "10px",
            color: tokens.color.inkMuted,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {getBlockLabel()}
        </span>
        <div style={{ display: "flex", gap: tokens.space.space1 }}>
          {/* 드래그 핸들 (추후 구현) */}
          <button
            style={{
              padding: "2px 6px",
              background: "transparent",
              border: "none",
              color: tokens.color.inkMuted,
              cursor: "grab",
              fontSize: "12px",
            }}
            title="드래그하여 이동"
          >
            ⋮⋮
          </button>
          {/* 삭제 버튼 */}
          <button
            onClick={onDelete}
            style={{
              padding: "2px 6px",
              background: "transparent",
              border: "none",
              color: tokens.color.caution,
              cursor: "pointer",
              fontSize: "12px",
              opacity: 0.6,
              transition: "opacity 0.15s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "0.6")}
            title="블록 삭제"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 블록 에디터 */}
      {renderBlockEditor()}
    </div>
  );
}
