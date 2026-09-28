import {
  Callout,
  ChapterOpener,
  CodeBlock,
  Cover,
  RunningFooter,
  tokens,
} from "@/components/design-system";

const sectionTitleStyle = {
  fontFamily: tokens.font.heading,
  fontSize: tokens.type.h2.fontSize,
  lineHeight: tokens.type.h2.lineHeight,
  fontWeight: tokens.type.h2.fontWeight,
  color: tokens.color.ink,
  margin: `${tokens.space.space6} 0 ${tokens.space.space3}`,
};

export default function Home() {
  return (
    <main
      style={{
        background: tokens.color.surfaceTint,
        minHeight: "100vh",
        padding: `${tokens.space.space6} 0`,
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          background: tokens.color.paper,
          padding: tokens.space.space6,
        }}
      >
        <h1
          style={{
            fontFamily: tokens.font.heading,
            fontSize: tokens.type.partTitle.fontSize,
            lineHeight: tokens.type.partTitle.lineHeight,
            fontWeight: tokens.type.partTitle.fontWeight,
            color: tokens.color.ink,
            margin: 0,
          }}
        >
          컴퓨터 교육책 — 디자인 시스템 미리보기
        </h1>
        <p
          style={{
            fontFamily: tokens.font.body,
            fontSize: tokens.type.body.fontSize,
            lineHeight: tokens.type.body.lineHeight,
            color: tokens.color.inkMuted,
            margin: `${tokens.space.space2} 0 0`,
          }}
        >
          components/design-system 의 컴포넌트를 실제로 렌더링해 확인하는 페이지입니다.
        </p>

        <a
          href="/editor"
          style={{
            display: "inline-block",
            marginTop: tokens.space.space3,
            padding: `${tokens.space.space2} ${tokens.space.space4}`,
            fontFamily: tokens.font.heading,
            fontSize: tokens.type.body.fontSize,
            fontWeight: 600,
            color: tokens.color.paper,
            background: tokens.color.brand,
            borderRadius: tokens.radius.md,
            textDecoration: "none",
          }}
        >
          📝 블록 에디터 열기 →
        </a>

        <h2 style={sectionTitleStyle}>표지</h2>
        <Cover titleLines={["컴퓨터", "교육책"]} tagline="자격증이 아니라, 실력이 남는 공부" />

        <h2 style={sectionTitleStyle}>장을 여는 페이지</h2>
        <ChapterOpener
          chapterNumber="제3장"
          title="트랜잭션은 왜 실패하는가"
          lead="계좌 이체 코드를 짜다 보면 반드시 만나는 순간이 있습니다. 두 테이블을 동시에 고치는데, 하나만 성공하면 어떻게 될까요? 이번 장에서 직접 실패시켜 봅니다."
        />

        <h2 style={sectionTitleStyle}>콜아웃</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.space4 }}>
          <Callout variant="concept" title="핵심 개념">
            트랜잭션은 &ldquo;전부 성공하거나 전부 실패하거나&rdquo; 둘 중 하나만 있어야 합니다. 중간 상태는 없습니다.
          </Callout>
          <Callout variant="practice" title="직접 해보기">
            출금 메서드 중간에 예외를 강제로 던져 보고, 잔액이 실제로 줄었는지 콘솔에서 확인해 보세요.
          </Callout>
          <Callout variant="mistake" title="자주 하는 실수">
            commit을 finally 블록 밖에 두면, 예외가 나도 일부 변경이 그대로 저장될 수 있습니다.
          </Callout>
        </div>

        <h2 style={sectionTitleStyle}>코드 블록</h2>
        <CodeBlock
          filename="Account.java"
          language="java"
          code={`public class Account {
    private BigDecimal balance;

    public void withdraw(BigDecimal amount) {
        if (amount.compareTo(balance) > 0) {
            throw new IllegalStateException("잔액 부족");
        }
        balance = balance.subtract(amount);
    }
}`}
        />

        <h2 style={sectionTitleStyle}>러닝풋터</h2>
        <RunningFooter chapterLabel="제3장 · 트랜잭션은 왜 실패하는가" pageNumber={57} />
      </div>
    </main>
  );
}
