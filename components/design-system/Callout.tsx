import type { ReactNode } from "react";
import { tokens } from "./tokens";

export type CalloutVariant = "concept" | "practice" | "mistake";

export interface CalloutProps {
  /** concept = 핵심 개념, practice = 직접 해보기, mistake = 자주 하는 실수 */
  variant: CalloutVariant;
  title: string;
  children: ReactNode;
}

type VariantStyle = {
  bg: string;
  bar: string;
  titleColor: string;
  marker: "square" | "circle" | "bang";
};

const VARIANT_STYLES: Record<CalloutVariant, VariantStyle> = {
  concept: {
    bg: tokens.color.brandTint,
    bar: tokens.color.brand,
    titleColor: tokens.color.brand,
    marker: "square",
  },
  practice: {
    // accent는 대비가 낮아(4.0:1) 글자색으로 쓰지 않고, 세로 바와 마커에만 사용합니다.
    bg: tokens.color.accentTint,
    bar: tokens.color.accent,
    titleColor: tokens.color.ink,
    marker: "circle",
  },
  mistake: {
    bg: tokens.color.cautionTint,
    bar: tokens.color.caution,
    titleColor: tokens.color.caution,
    marker: "bang",
  },
};

export function Callout({ variant, title, children }: CalloutProps) {
  const s = VARIANT_STYLES[variant];

  return (
    <div
      style={{
        background: s.bg,
        borderLeft: `4px solid ${s.bar}`,
        borderRadius: tokens.radius.md,
        padding: tokens.space.space3,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: tokens.space.space1,
        }}
      >
        {s.marker === "square" && (
          <span
            style={{
              width: 10,
              height: 10,
              background: s.bar,
              borderRadius: tokens.radius.sm,
              display: "inline-block",
            }}
          />
        )}
        {s.marker === "circle" && (
          <span
            style={{
              width: 10,
              height: 10,
              background: s.bar,
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
        )}
        {s.marker === "bang" && (
          <span style={{ color: s.titleColor, fontWeight: 700 }}>!</span>
        )}

        <span
          style={{
            fontFamily: tokens.font.heading,
            fontSize: tokens.type.h3.fontSize,
            lineHeight: tokens.type.h3.lineHeight,
            fontWeight: tokens.type.h3.fontWeight,
            color: s.titleColor,
          }}
        >
          {title}
        </span>
      </div>

      <p
        style={{
          fontFamily: tokens.font.body,
          fontSize: tokens.type.body.fontSize,
          lineHeight: tokens.type.body.lineHeight,
          fontWeight: tokens.type.body.fontWeight,
          color: tokens.color.ink,
          margin: `${tokens.space.space2} 0 0`,
        }}
      >
        {children}
      </p>
    </div>
  );
}

export default Callout;
