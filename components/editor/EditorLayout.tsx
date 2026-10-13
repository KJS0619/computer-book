"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { tokens } from "@/components/design-system";
import { useEditorStore } from "@/store/editorStore";
import { ChapterEditor } from "./ChapterEditor";
import { Preview } from "./Preview";
import { ChapterSidebar } from "./ChapterSidebar";
import { exportToJson, importFromJson, exportToPdf } from "@/utils/fileExport";

export function EditorLayout() {
  const [mounted, setMounted] = useState(false);

  // 앱(Capacitor) 빌드 + 좁은 화면(폰)에서만 한 번에 한 패널씩 보여준다. 웹은 기존 3단 레이아웃 그대로.
  const isAppBuild = process.env.NEXT_PUBLIC_APP_BUILD === "true";
  const [isNarrow, setIsNarrow] = useState(false);
  const [mobileTab, setMobileTab] = useState<"chapters" | "edit" | "preview">("edit");

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

  useEffect(() => {
    if (!isAppBuild) return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [isAppBuild]);

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
          flexDirection: isNarrow ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isNarrow ? "stretch" : "center",
          gap: isNarrow ? tokens.space.space2 : undefined,
          padding: `${tokens.space.space2} ${tokens.space.space4}`,
          background: tokens.color.paper,
          borderBottom: `1px solid ${tokens.color.surfaceBorder}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: tokens.space.space3,
            flexWrap: isNarrow ? "wrap" : "nowrap",
          }}
        >
          {/* 앱(Capacitor) 빌드에서만 표시: 앱에는 브라우저 주소창·뒤로 가기 버튼이 없어 홈으로 돌아갈 길을 둔다. */}
          {process.env.NEXT_PUBLIC_APP_BUILD === "true" && (
            <Link
              href="/"
              style={{
                padding: `${tokens.space.space1} ${tokens.space.space3}`,
                fontFamily: tokens.font.heading,
                fontSize: tokens.type.caption.fontSize,
                color: tokens.color.inkMuted,
                background: "transparent",
                border: `1px solid ${tokens.color.surfaceBorder}`,
                borderRadius: tokens.radius.sm,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              ← 홈
            </Link>
          )}
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
              width: isNarrow ? undefined : 200,
              flex: isNarrow ? 1 : undefined,
              minWidth: isNarrow ? 0 : undefined,
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

        <div
          style={{
            display: "flex",
            gap: tokens.space.space2,
            flexWrap: isNarrow ? "wrap" : "nowrap",
          }}
        >
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

      {/* 좁은 화면(앱) 전용 탭: 목차 / 편집 / 미리보기 */}
      {isNarrow && (
        <nav
          style={{
            display: "flex",
            background: tokens.color.paper,
            borderBottom: `1px solid ${tokens.color.surfaceBorder}`,
            flexShrink: 0,
          }}
        >
          {(
            [
              ["chapters", "목차"],
              ["edit", "편집"],
              ["preview", "미리보기"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMobileTab(key)}
              style={{
                flex: 1,
                padding: `${tokens.space.space2} 0`,
                fontFamily: tokens.font.heading,
                fontSize: tokens.type.body.fontSize,
                fontWeight: mobileTab === key ? 700 : 400,
                color: mobileTab === key ? tokens.color.brand : tokens.color.inkMuted,
                background: "transparent",
                border: "none",
                borderBottom:
                  mobileTab === key
                    ? `2px solid ${tokens.color.brand}`
                    : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      )}

      {/* 메인 영역: 사이드바 + 에디터 + 미리보기 */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* 챕터 사이드바 */}
        {(!isNarrow || mobileTab === "chapters") && (
          <ChapterSidebar
            chapters={document.chapters}
            activeChapterId={activeChapterId}
            onSelectChapter={(chapterId) => {
              setActiveChapter(chapterId);
              if (isNarrow) setMobileTab("edit");
            }}
            onAddChapter={addChapter}
            onDeleteChapter={deleteChapter}
            fullWidth={isNarrow}
          />
        )}

        {/* 에디터 영역 */}
        {(!isNarrow || mobileTab === "edit") && (
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
              {isNarrow ? "목차 탭에서 챕터를 선택하세요" : "왼쪽에서 챕터를 선택하세요"}
            </div>
          )}
        </div>
        )}

        {/* 미리보기 영역 */}
        {(!isNarrow || mobileTab === "preview") && (
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
        )}
      </div>
    </div>
  );
}
