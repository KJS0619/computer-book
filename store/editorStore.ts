import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  BookDocument,
  Chapter,
  Block,
  BlockType,
  CalloutVariant,
  CodeLanguage,
  HeadingLevel,
} from "@/types/editor";

// UUID 생성 헬퍼
function generateId(): string {
  return crypto.randomUUID();
}

// 기본 블록 생성
function createBlock(type: BlockType): Block {
  const id = generateId();
  switch (type) {
    case "paragraph":
      return { id, type: "paragraph", content: "" };
    case "heading":
      return { id, type: "heading", level: 2, text: "" };
    case "code":
      return { id, type: "code", filename: "", language: "java", code: "" };
    case "callout":
      return { id, type: "callout", variant: "concept", title: "", content: "" };
    case "image":
      return { id, type: "image", src: "", alt: "", caption: "" };
    default:
      return { id, type: "paragraph", content: "" };
  }
}

// 기본 챕터 생성
function createChapter(number: string = "제1장"): Chapter {
  return {
    id: generateId(),
    number,
    title: "",
    lead: "",
    blocks: [],
  };
}

// 기본 문서 생성
function createDocument(): BookDocument {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    title: "새 책",
    tagline: "",
    chapters: [createChapter()],
    createdAt: now,
    updatedAt: now,
  };
}

interface EditorStore {
  // 상태
  document: BookDocument;
  activeChapterId: string | null;
  activeBlockId: string | null;
  isDirty: boolean;

  // 문서 액션
  setDocument: (doc: BookDocument) => void;
  updateDocumentMeta: (title: string, tagline: string) => void;
  newDocument: () => void;

  // 챕터 액션
  addChapter: () => void;
  updateChapter: (chapterId: string, updates: Partial<Omit<Chapter, "id" | "blocks">>) => void;
  deleteChapter: (chapterId: string) => void;
  setActiveChapter: (chapterId: string | null) => void;
  moveChapter: (fromIndex: number, toIndex: number) => void;

  // 블록 액션
  addBlock: (chapterId: string, type: BlockType, afterBlockId?: string) => void;
  updateBlock: (chapterId: string, blockId: string, updates: Partial<Block>) => void;
  deleteBlock: (chapterId: string, blockId: string) => void;
  setActiveBlock: (blockId: string | null) => void;
  moveBlock: (chapterId: string, fromIndex: number, toIndex: number) => void;

  // 저장
  markClean: () => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      // 초기 상태
      document: createDocument(),
      activeChapterId: null,
      activeBlockId: null,
      isDirty: false,

      // 문서 액션
      setDocument: (doc) =>
        set({
          document: doc,
          activeChapterId: doc.chapters[0]?.id ?? null,
          activeBlockId: null,
          isDirty: false,
        }),

      updateDocumentMeta: (title, tagline) =>
        set((state) => ({
          document: {
            ...state.document,
            title,
            tagline,
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      newDocument: () => {
        const doc = createDocument();
        set({
          document: doc,
          activeChapterId: doc.chapters[0]?.id ?? null,
          activeBlockId: null,
          isDirty: false,
        });
      },

      // 챕터 액션
      addChapter: () =>
        set((state) => {
          const chapterNum = state.document.chapters.length + 1;
          const newChapter = createChapter(`제${chapterNum}장`);
          return {
            document: {
              ...state.document,
              chapters: [...state.document.chapters, newChapter],
              updatedAt: new Date().toISOString(),
            },
            activeChapterId: newChapter.id,
            isDirty: true,
          };
        }),

      updateChapter: (chapterId, updates) =>
        set((state) => ({
          document: {
            ...state.document,
            chapters: state.document.chapters.map((ch) =>
              ch.id === chapterId ? { ...ch, ...updates } : ch
            ),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      deleteChapter: (chapterId) =>
        set((state) => {
          const chapters = state.document.chapters.filter((ch) => ch.id !== chapterId);
          if (chapters.length === 0) {
            chapters.push(createChapter());
          }
          return {
            document: {
              ...state.document,
              chapters,
              updatedAt: new Date().toISOString(),
            },
            activeChapterId:
              state.activeChapterId === chapterId ? chapters[0]?.id ?? null : state.activeChapterId,
            isDirty: true,
          };
        }),

      setActiveChapter: (chapterId) =>
        set({ activeChapterId: chapterId, activeBlockId: null }),

      moveChapter: (fromIndex, toIndex) =>
        set((state) => {
          const chapters = [...state.document.chapters];
          const [moved] = chapters.splice(fromIndex, 1);
          chapters.splice(toIndex, 0, moved);
          return {
            document: {
              ...state.document,
              chapters,
              updatedAt: new Date().toISOString(),
            },
            isDirty: true,
          };
        }),

      // 블록 액션
      addBlock: (chapterId, type, afterBlockId) =>
        set((state) => {
          const newBlock = createBlock(type);
          return {
            document: {
              ...state.document,
              chapters: state.document.chapters.map((ch) => {
                if (ch.id !== chapterId) return ch;
                const blocks = [...ch.blocks];
                if (afterBlockId) {
                  const index = blocks.findIndex((b) => b.id === afterBlockId);
                  blocks.splice(index + 1, 0, newBlock);
                } else {
                  blocks.push(newBlock);
                }
                return { ...ch, blocks };
              }),
              updatedAt: new Date().toISOString(),
            },
            activeBlockId: newBlock.id,
            isDirty: true,
          };
        }),

      updateBlock: (chapterId, blockId, updates) =>
        set((state) => ({
          document: {
            ...state.document,
            chapters: state.document.chapters.map((ch) => {
              if (ch.id !== chapterId) return ch;
              return {
                ...ch,
                blocks: ch.blocks.map((b) =>
                  b.id === blockId ? ({ ...b, ...updates } as Block) : b
                ),
              };
            }),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      deleteBlock: (chapterId, blockId) =>
        set((state) => ({
          document: {
            ...state.document,
            chapters: state.document.chapters.map((ch) => {
              if (ch.id !== chapterId) return ch;
              return {
                ...ch,
                blocks: ch.blocks.filter((b) => b.id !== blockId),
              };
            }),
            updatedAt: new Date().toISOString(),
          },
          activeBlockId: state.activeBlockId === blockId ? null : state.activeBlockId,
          isDirty: true,
        })),

      setActiveBlock: (blockId) => set({ activeBlockId: blockId }),

      moveBlock: (chapterId, fromIndex, toIndex) =>
        set((state) => ({
          document: {
            ...state.document,
            chapters: state.document.chapters.map((ch) => {
              if (ch.id !== chapterId) return ch;
              const blocks = [...ch.blocks];
              const [moved] = blocks.splice(fromIndex, 1);
              blocks.splice(toIndex, 0, moved);
              return { ...ch, blocks };
            }),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      markClean: () => set({ isDirty: false }),
    }),
    {
      name: "computer-book-editor",
      partialize: (state) => ({ document: state.document }),
    }
  )
);
