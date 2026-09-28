"use client";

import { useState, useEffect } from "react";
import { tokens } from "@/components/design-system";
import { useEditorStore } from "@/store/editorStore";
import { ChapterEditor } from "./ChapterEditor";
import { Preview } from "./Preview";
import { ChapterSidebar } from "./ChapterSidebar";
import { exportToJson, importFromJson, exportToPdf } from "@/utils/fileExport";

export function EditorLayout() {
  const [mounted, setMounted] = useState(false);

  const {
    document,
    activeChapterId,
    activeBlockId,
    isDirty,
    setActiveChapter,
    addChapter,
    updateChapter,
    deleteChapter,
    addBlock,
    updateBlock,
    deleteBlock,
    setActiveBlock,
    updateDocumentMeta,
    newDocument,
    setDocument,
  } = useEditorStore();

  // Hydration 완료 후 렌더링
  useEffect(() => {
    setMounted(true);
  }, []);

  const activeChapter = document.chapters.find((ch) => ch.id === activeChapterId);

  // 서버/클라이언트 불일치 방지
  if (!mounted) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: tokens.color.surfaceTint,
          fontFamily: tokens.font.heading,
          color: tokens.color.inkMuted,
        }}
      >
        로딩 중...
      </div>
    );
  }

  // JSON 내보내기
  const handleExportJson = () => {
    exportToJson(document);
  };

  // JSON 가져오기
  const handleImportJson = async () => {
    try {
      const doc = await importFromJson();
      setDocument(doc);
      alert("파일을 성공적으로 가져왔습니다.");
    } catch (err) {
      alert(`가져오기 실패: ${err instanceof Error ? err.message : "알 수 없는 오류"}`);
    }
  };

  // PDF 내보내기 (브라우저 인쇄)
  const handleExportPdf = () => {
    exportToPdf(document);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: tokens.color.surfaceTint,
      }}
    >
      {/* 상단 헤더 */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: `${tokens.space.space2} ${tokens.space.space4}`,
          background: tokens.color.paper,
          borderBottom: `1px solid ${tokens.color.surfaceBorder}`,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: tokens.space.space3 }}>
          <span
            style={{
              fontFamily: tokens.font.heading,
              fontSize: tokens.type.h2.fontSize,
              fontWeight: tokens.type.h2.fontWeight,
              color: tokens.color.brand,
            }}
          >
            📖 책 에디터
          </span>
          <input
            type="text"
            value={document.title}
            onChange={(e) => updateDocumentMeta(e.target.value, document.tagline)}
            placeholder="책 제목"
            style={{
              padding: `${tokens.space.space1} ${tokens.space.space2}`,
              fontFamily: tokens.font.heading,
              fontSize: tokens.type.body.fontSize,
              fontWeight: 600,
              color: tokens.color.ink,
              background: tokens.color.surfaceTint,
              border: `1px solid ${tokens.color.surfaceBorder}`,
              borderRadius: tokens.radius.sm,
              width: 200,
              outline: "none",
            }}
          />
          {isDirty && (
            <span
              style={{
                fontFamily: tokens.font.mono,
                fontSize: tokens.type.caption.fontSize,
                color: tokens.color.accent,
              }}
            >
              ● 수정됨
            </span>
          )}
        </div>

        <div style={{ display: "flex", gap: tokens.space.space2 }}>
          <button
            onClick={newDocument}
            style={{
              padding: `${tokens.space.space1} ${tokens.space.space3}`,
              fontFamily: tokens.font.heading,
              fontSize: tokens.type.caption.fontSize,
              color: tokens.color.inkMuted,
              background: "transparent",
              border: `1px solid ${tokens.color.surfaceBorder}`,
              borderRadius: tokens.radius.sm,
              cursor: "pointer",
            }}
          >
            새 문서
          </button>
          <button
            onClick={handleImportJson}
            style={{
              padding: `${tokens.space.space1} ${tokens.space.space3}`,
              fontFamily: tokens.font.heading,
              fontSize: tokens.type.caption.fontSize,
              color: tokens.color.inkMuted,
              background: "transparent",
              border: `1px solid ${tokens.color.surfaceBorder}`,
              borderRadius: tokens.radius.sm,
              cursor: "pointer",
            }}
          >
            JSON 가져오기
          </button>
          <button
            onClick={handleExportJson}
            style={{
              padding: `${tokens.space.space1} ${tokens.space.space3}`,
              fontFamily: tokens.font.heading,
              fontSize: tokens.type.caption.fontSize,
              color: tokens.color.inkMuted,
              background: "transparent",
              border: `1px solid ${tokens.color.surfaceBorder}`,
              borderRadius: tokens.radius.sm,
              cursor: "pointer",
            }}
          >
            JSON 내보내기
          </button>
          <button
            onClick={handleExportPdf}
            style={{
              padding: `${tokens.space.space1} ${tokens.space.space3}`,
              fontFamily: tokens.font.heading,
              fontSize: tokens.type.caption.fontSize,
              fontWeight: 600,
              color: tokens.color.paper,
              background: tokens.color.brand,
              border: "none",
              borderRadius: tokens.radius.sm,
              cursor: "pointer",
            }}
          >
            PDF 내보내기
          </button>
        </div>
      </header>

      {/* 메인 영역: 사이드바 + 에디터 + 미리보기 */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* 챕터 사이드바 */}
        <ChapterSidebar
          chapters={document.chapters}
          activeChapterId={activeChapterId}
          onSelectChapter={setActiveChapter}
          onAddChapter={addChapter}
          onDeleteChapter={deleteChapter}
        />

        {/* 에디터 영역 */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            background: tokens.color.paper,
            borderRight: `1px solid ${tokens.color.surfaceBorder}`,
          }}
        >
          {activeChapter ? (
            <ChapterEditor
              chapter={activeChapter}
              onUpdateChapter={(updates) => updateChapter(activeChapter.id, updates)}
              onAddBlock={(type, afterBlockId) => addBlock(activeChapter.id, type, afterBlockId)}
              onUpdateBlock={(blockId, updates) => updateBlock(activeChapter.id, blockId, updates)}
              onDeleteBlock={(blockId) => deleteBlock(activeChapter.id, blockId)}
              activeBlockId={activeBlockId}
              onSetActiveBlock={setActiveBlock}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: tokens.color.inkMuted,
                fontFamily: tokens.font.body,
              }}
            >
              왼쪽에서 챕터를 선택하세요
            </div>
          )}
        </div>

        {/* 미리보기 영역 */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            background: tokens.color.surfaceTint,
            padding: tokens.space.space4,
          }}
        >
          <div
            style={{
              fontFamily: tokens.font.heading,
              fontSize: tokens.type.caption.fontSize,
              color: tokens.color.inkMuted,
              marginBottom: tokens.space.space2,
              textAlign: "center",
            }}
          >
            👁️ 미리보기
          </div>
          <div>
            {activeChapter && <Preview chapter={activeChapter} />}
          </div>
        </div>
      </div>
    </div>
  );
}
