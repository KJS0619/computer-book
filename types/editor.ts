// 블록 에디터 타입 정의

export type CalloutVariant = "concept" | "practice" | "mistake";
export type CodeLanguage = "java" | "sql" | "plain";
export type HeadingLevel = 2 | 3;

// 블록 타입들
export interface ParagraphBlock {
  id: string;
  type: "paragraph";
  content: string;
}

export interface HeadingBlock {
  id: string;
  type: "heading";
  level: HeadingLevel;
  text: string;
}

export interface CodeBlock {
  id: string;
  type: "code";
  filename: string;
  language: CodeLanguage;
  code: string;
}

export interface CalloutBlock {
  id: string;
  type: "callout";
  variant: CalloutVariant;
  title: string;
  content: string;
}

export interface ImageBlock {
  id: string;
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export type Block = ParagraphBlock | HeadingBlock | CodeBlock | CalloutBlock | ImageBlock;
export type BlockType = Block["type"];

// 챕터 구조
export interface Chapter {
  id: string;
  number: string;      // "제1장"
  title: string;
  lead: string;
  blocks: Block[];
}

// 문서 전체 구조
export interface BookDocument {
  id: string;
  title: string;
  tagline: string;
  chapters: Chapter[];
  createdAt: string;
  updatedAt: string;
}

// 에디터 상태
export interface EditorState {
  document: BookDocument;
  activeChapterId: string | null;
  activeBlockId: string | null;
  isDirty: boolean;
}

// 블록 생성 헬퍼 타입
export interface CreateBlockOptions {
  paragraph: { content?: string };
  heading: { level?: HeadingLevel; text?: string };
  code: { filename?: string; language?: CodeLanguage; code?: string };
  callout: { variant?: CalloutVariant; title?: string; content?: string };
  image: { src?: string; alt?: string; caption?: string };
}
