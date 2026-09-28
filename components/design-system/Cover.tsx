import { tokens } from "./tokens";

export interface CoverProps {
  /** 표지 제목 두 줄. 예: ["컴퓨터", "교육책"] */
  titleLines: [string, string];
  tagline: string;
}

export function Cover({ titleLines, tagline }: CoverProps) {
  return (
    <div
      style={{
        width: 960,
        height: 320,
        margin: "0 auto",
        background: tokens.color.paper,
      }}
    >
      <svg
        viewBox="0 0 960 320"
        width={960}
        height={320}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/*
          blocks: brand slab 300×320(위/오른쪽/아래로 블리드) — accent radius-lg 사각형 120×120
                  — success radius-lg 원 90×90(rx=45) — caution radius-md 사각형 48×48
          arrangement: 하나의 큰 브랜드 슬랩 + 세 위성 (핵심 개념 > 실습/정리 > 실수 순)
          pattern: 48px 간격의 플러스 그리드, brand-tint — 정확한 코드 한 줄 한 줄을 다루는 책
          scales: radius-lg(위성), radius-md(실수 마커), 48px 간격, brand/accent/success/caution 팔레트
        */}
        <defs>
          <pattern id="plusgrid" width={48} height={48} patternUnits="userSpaceOnUse">
            <path
              d="M8 4v8M4 8h8"
              stroke={tokens.color.brandTint}
              strokeWidth={2}
            />
          </pattern>
          <clipPath id="slabClip">
            <rect x={480} y={0} width={300} height={320} />
          </clipPath>
        </defs>

        <rect x={0} y={0} width={960} height={320} fill={tokens.color.paper} />

        <rect x={480} y={0} width={300} height={320} fill={tokens.color.brand} />
        <rect
          x={480}
          y={0}
          width={300}
          height={320}
          fill="url(#plusgrid)"
          clipPath="url(#slabClip)"
        />

        <rect x={700} y={236} width={48} height={48} rx={10} fill={tokens.color.caution} />
        <rect x={812} y={34} width={120} height={120} rx={20} fill={tokens.color.accent} />
        <circle cx={845} cy={220} r={45} fill={tokens.color.success} />

        <text
          x={48}
          y={158}
          fill={tokens.color.ink}
          style={{
            fontFamily: tokens.font.heading,
            fontSize: tokens.type.coverTitle.fontSize,
            fontWeight: tokens.type.coverTitle.fontWeight,
          }}
        >
          {titleLines[0]}
        </text>
        <text
          x={48}
          y={242}
          fill={tokens.color.ink}
          style={{
            fontFamily: tokens.font.heading,
            fontSize: tokens.type.coverTitle.fontSize,
            fontWeight: tokens.type.coverTitle.fontWeight,
          }}
        >
          {titleLines[1]}
        </text>
        <text
          x={48}
          y={272}
          fill={tokens.color.inkMuted}
          style={{
            fontFamily: tokens.font.body,
            fontSize: tokens.type.caption.fontSize,
          }}
        >
          {tagline}
        </text>
      </svg>
    </div>
  );
}

export default Cover;
