/// <reference types="vite/client" />

interface ImportMeta {
  readonly glob: (pattern: string, options?: { eager?: boolean; import?: string; query?: string }) => Record<string, unknown>;
}
