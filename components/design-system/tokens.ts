// 컴퓨터 교육책 디자인 시스템 토큰
// 원본: Claude 아티팩트(Design System) project/tokens.json 을 그대로 옮긴 값입니다.
// 값을 바꿀 때는 아티팩트 쪽도 같이 갱신해 두 곳이 어긋나지 않게 하세요.

export const tokens = {
  color: {
    ink: "#21262c",
    inkMuted: "#4c5661",
    paper: "#ffffff",
    surfaceTint: "#f2f4f6",
    surfaceBorder: "#d7dce1",
    brand: "#1e5a8a",
    brandTint: "#e7f0f7",
    accent: "#c8631a",
    accentTint: "#fbeee1",
    success: "#0f766e",
    successTint: "#e3f2f0",
    caution: "#8c3a4b",
    cautionTint: "#f7e8ea",
    codeBg: "#1e2530",
    codeInk: "#e7ebef",
    codeKeyword: "#7fb2e0",
    codeLiteral: "#e3a25f",
  },
  font: {
    heading: "'Gowun Dodum', 'Noto Sans KR', system-ui, sans-serif",
    body: "'Gowun Batang', 'Noto Serif KR', Georgia, serif",
    mono: "'IBM Plex Mono', 'D2Coding', ui-monospace, monospace",
  },
  type: {
    coverTitle: { fontSize: "88px", lineHeight: "84px", fontWeight: 700 },
    partTitle: { fontSize: "40px", lineHeight: "46px", fontWeight: 700 },
    h1: { fontSize: "28px", lineHeight: "34px", fontWeight: 700 },
    h2: { fontSize: "20px", lineHeight: "26px", fontWeight: 700 },
    h3: { fontSize: "16px", lineHeight: "22px", fontWeight: 700 },
    bodyLead: { fontSize: "16px", lineHeight: "26px", fontWeight: 400 },
    body: { fontSize: "15px", lineHeight: "24px", fontWeight: 400 },
    caption: { fontSize: "12px", lineHeight: "18px", fontWeight: 400 },
    code: { fontSize: "13px", lineHeight: "20px", fontWeight: 400 },
    codeInline: { fontSize: "14px", lineHeight: "22px", fontWeight: 500 },
  },
  space: {
    space1: "4px",
    space2: "8px",
    space3: "16px",
    space4: "24px",
    space6: "40px",
    space8: "64px",
  },
  radius: {
    sm: "4px",
    md: "10px",
    lg: "20px",
  },
} as const;

export default tokens;
