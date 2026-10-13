import type { BookDocument } from "@/types/editor";
import { isNativeApp, shareTextFileNative } from "@/utils/nativeShare";

/**
 * JSON 파일로 내보내기
 */
export function exportToJson(document: BookDocument): void {
  const json = JSON.stringify(document, null, 2);

  // 앱(Capacitor)에서는 <a download> 가 동작하지 않아 공유 시트로 저장·전송한다. 웹에서는 아래 기존 동작 그대로.
  if (isNativeApp()) {
    void shareTextFileNative(json, `${sanitizeFilename(document.title)}.json`).catch((e) =>
      console.error("JSON 저장·공유 실패", e)
    );
    return;
  }

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = window.document.createElement("a");
  a.href = url;
  a.download = `${sanitizeFilename(document.title)}.json`;
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * JSON 파일에서 가져오기
 */
export function importFromJson(): Promise<BookDocument> {
  return new Promise((resolve, reject) => {
    const input = window.document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error("파일이 선택되지 않았습니다."));
        return;
      }

      try {
        const text = await file.text();
        const doc = JSON.parse(text) as BookDocument;

        // 기본 검증
        if (!doc.id || !doc.title || !Array.isArray(doc.chapters)) {
          throw new Error("올바른 책 문서 형식이 아닙니다.");
        }

        resolve(doc);
      } catch (err) {
        reject(err);
      }
    };

    input.click();
  });
}

/**
 * 브라우저 인쇄 기능으로 PDF 내보내기
 * 새 창에서 전체 챕터를 렌더링 후 인쇄 다이얼로그 호출
 */
export function exportToPdf(document: BookDocument): void {
  // 앱 WebView 는 새 창 인쇄(window.print)를 지원하지 않는다. 웹에서 PDF 로 내보내도록 안내한다.
  if (isNativeApp()) {
    window.alert("앱에서는 PDF 내보내기를 지원하지 않아요. JSON으로 내보낸 뒤 웹 버전에서 가져와 PDF로 만들어 주세요.");
    return;
  }

  // 새 창 열기
  const printWindow = window.open("", "_blank", "width=800,height=600");
  if (!printWindow) {
    alert("팝업이 차단되었습니다. 팝업 차단을 해제해 주세요.");
    return;
  }

  // HTML 생성
  const html = generatePrintHtml(document);
  printWindow.document.write(html);
  printWindow.document.close();

  // 폰트 로딩 후 인쇄
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };
}

/**
 * 인쇄용 HTML 생성
 */
function generatePrintHtml(document: BookDocument): string {
  const chaptersHtml = document.chapters
    .map((chapter) => {
      const blocksHtml = chapter.blocks
        .map((block) => {
          switch (block.type) {
            case "paragraph":
              return block.content
                ? `<p class="body-text">${escapeHtml(block.content)}</p>`
                : "";
            case "heading":
              const tag = block.level === 2 ? "h2" : "h3";
              return block.text
                ? `<${tag} class="heading-${block.level}">${escapeHtml(block.text)}</${tag}>`
                : "";
            case "code":
              return block.code
                ? `<div class="code-block">
                    ${block.filename ? `<div class="code-filename">${escapeHtml(block.filename)}</div>` : ""}
                    <pre><code>${escapeHtml(block.code)}</code></pre>
                   </div>`
                : "";
            case "callout":
              return block.content || block.title
                ? `<div class="callout callout-${block.variant}">
                    <div class="callout-title">${escapeHtml(block.title || getCalloutTitle(block.variant))}</div>
                    <div class="callout-content">${escapeHtml(block.content)}</div>
                   </div>`
                : "";
            default:
              return "";
          }
        })
        .join("\n");

      return `
        <div class="chapter">
          <div class="chapter-opener">
            <div class="chapter-number">${escapeHtml(chapter.number)}</div>
            <h1 class="chapter-title">${escapeHtml(chapter.title || "(제목 없음)")}</h1>
            ${chapter.lead ? `<p class="chapter-lead">${escapeHtml(chapter.lead)}</p>` : ""}
          </div>
          <div class="chapter-content">
            ${blocksHtml}
          </div>
        </div>
      `;
    })
    .join("\n");

  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(document.title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gowun+Batang&family=Gowun+Dodum&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    @page {
      size: A4;
      margin: 20mm;
    }

    body {
      font-family: 'Gowun Batang', Georgia, serif;
      font-size: 11pt;
      line-height: 1.8;
      color: #21262c;
      background: white;
    }

    .chapter {
      page-break-after: always;
    }

    .chapter:last-child {
      page-break-after: auto;
    }

    .chapter-opener {
      padding: 60px 0 40px;
      border-bottom: 2px solid #1e5a8a;
      margin-bottom: 30px;
    }

    .chapter-number {
      font-family: 'Gowun Dodum', sans-serif;
      font-size: 14pt;
      color: #1e5a8a;
      margin-bottom: 8px;
    }

    .chapter-title {
      font-family: 'Gowun Dodum', sans-serif;
      font-size: 24pt;
      font-weight: 700;
      color: #21262c;
      margin-bottom: 16px;
    }

    .chapter-lead {
      font-size: 12pt;
      color: #4c5661;
      line-height: 1.7;
    }

    .chapter-content {
      max-width: 100%;
    }

    .body-text {
      margin-bottom: 16px;
      text-align: justify;
      white-space: pre-wrap;
    }

    .heading-2 {
      font-family: 'Gowun Dodum', sans-serif;
      font-size: 16pt;
      font-weight: 700;
      margin: 32px 0 12px;
      color: #21262c;
    }

    .heading-3 {
      font-family: 'Gowun Dodum', sans-serif;
      font-size: 13pt;
      font-weight: 700;
      margin: 24px 0 10px;
      color: #21262c;
    }

    .code-block {
      background: #1e2530;
      border-radius: 8px;
      margin: 20px 0;
      overflow: hidden;
    }

    .code-filename {
      background: #2a3441;
      padding: 8px 16px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9pt;
      color: #7fb2e0;
    }

    .code-block pre {
      padding: 16px;
      overflow-x: auto;
    }

    .code-block code {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10pt;
      color: #e7ebef;
      white-space: pre;
    }

    .callout {
      border-radius: 8px;
      padding: 16px 20px;
      margin: 20px 0;
    }

    .callout-concept {
      background: #e7f0f7;
      border-left: 4px solid #1e5a8a;
    }

    .callout-practice {
      background: #e3f2f0;
      border-left: 4px solid #0f766e;
    }

    .callout-mistake {
      background: #f7e8ea;
      border-left: 4px solid #8c3a4b;
    }

    .callout-title {
      font-family: 'Gowun Dodum', sans-serif;
      font-weight: 700;
      font-size: 11pt;
      margin-bottom: 8px;
    }

    .callout-content {
      font-size: 10.5pt;
      line-height: 1.7;
    }

    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="book">
    ${chaptersHtml}
  </div>
</body>
</html>
  `;
}

/**
 * HTML 이스케이프
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br>");
}

/**
 * 파일명 안전하게 변환
 */
function sanitizeFilename(name: string): string {
  return name
    .replace(/[<>:"/\\|?*]/g, "")
    .replace(/\s+/g, "_")
    .substring(0, 100) || "untitled";
}

/**
 * 콜아웃 기본 제목
 */
function getCalloutTitle(variant: string): string {
  switch (variant) {
    case "concept":
      return "핵심 개념";
    case "practice":
      return "직접 해보기";
    case "mistake":
      return "자주 하는 실수";
    default:
      return "참고";
  }
}
