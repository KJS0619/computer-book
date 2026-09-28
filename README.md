# computer-book

"자격증이 아니라 실력이 남는" 컴퓨터 교육책 프로젝트의 디자인 시스템 코드입니다. Claude 아티팩트(Design System)로 만든 인쇄 페이지 디자인 시스템을 React/TypeScript 컴포넌트로 옮겨 담았습니다.

## 시작하기

```bash
npm install
npm run dev
```

`http://localhost:3000` 을 열면 모든 컴포넌트를 한 페이지에서 확인할 수 있습니다 (`app/page.tsx`).

## 구조

- `components/design-system/tokens.ts` — 색상·타이포·여백·모서리 토큰 (Claude 아티팩트 `project/tokens.json`과 값이 같습니다)
- `components/design-system/ChapterOpener.tsx` — 장을 여는 페이지
- `components/design-system/Callout.tsx` — 핵심 개념 / 직접 해보기 / 자주 하는 실수 박스
- `components/design-system/CodeBlock.tsx` — 파일명 캡션이 붙은 코드 블록 (자바·SQL 키워드 강조)
- `components/design-system/RunningFooter.tsx` — 쪽번호가 있는 하단 러닝풋터
- `components/design-system/Cover.tsx` — 표지
- `app/page.tsx` — 위 컴포넌트를 전부 모아 보여주는 미리보기 페이지

## 아직 정해지지 않은 것

- `Gowun Dodum` / `Gowun Batang` / `IBM Plex Mono`는 임시로 고른 폰트입니다. `app/layout.tsx`에서 Google Fonts로 불러오고 있으니, 실제 인쇄용으로 쓰기 전에 라이선스와 가독성을 다시 확인하세요.
- 디자인 시스템 자체의 원본은 Claude 아티팩트(Design System)에도 그대로 있습니다. 토큰 값을 바꿀 때는 두 곳(아티팩트, 이 저장소)을 같이 갱신해야 어긋나지 않습니다.
- 아직 원고 내용이 없어 예시 데이터(3장 "트랜잭션은 왜 실패하는가")로 채워 뒀습니다. 실제 원고가 쌓이면 `app/page.tsx`의 예시를 각 장의 실제 내용으로 바꾸면 됩니다.
