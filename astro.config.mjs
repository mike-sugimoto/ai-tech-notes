// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages: https://mike-sugimoto.github.io/ai-tech-notes/
  site: 'https://mike-sugimoto.github.io',
  base: '/ai-tech-notes',
  trailingSlash: 'always',
  integrations: [
    // astro-mermaid は Starlight より前に置く（Markdown の ```mermaid を変換するため）
    mermaid({
      // ライト/ダーク切替に追従させる
      autoTheme: true,
      theme: 'default',
    }),
    starlight({
      title: 'AI Tech Notes',
      description: '高精度なAIナレッジ・システム構築のための設計ノート（RAG / MCP / データ設計 / コスト）',
      // 単一言語（日本語）サイト。root ロケールを1つだけ定義すると言語切替UIは出ない。
      defaultLocale: 'root',
      locales: {
        root: { label: '日本語', lang: 'ja' },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/mike-sugimoto/ai-tech-notes',
        },
      ],
      customCss: ['./src/styles/custom.css'],
      // 全文検索（Pagefind）は Starlight 標準で有効
      sidebar: [
        {
          label: 'はじめに',
          items: [{ autogenerate: { directory: 'overview' } }],
        },
        {
          label: 'ユースケース',
          items: [{ autogenerate: { directory: 'use-cases' } }],
        },
        {
          label: 'LLM の基礎',
          items: [{ autogenerate: { directory: 'llm-basics' } }],
        },
        {
          label: 'RAG 設計',
          items: [{ autogenerate: { directory: 'rag' } }],
        },
        {
          label: 'MCP 活用',
          items: [{ autogenerate: { directory: 'mcp' } }],
        },
        {
          label: 'データソース（MS中心）',
          items: [{ autogenerate: { directory: 'data-sources' } }],
        },
        {
          label: 'データ設計・形式',
          items: [{ autogenerate: { directory: 'data-modeling' } }],
        },
        {
          label: 'アンチパターン',
          items: [{ autogenerate: { directory: 'anti-patterns' } }],
        },
        {
          label: 'コスト・ROI',
          items: [{ autogenerate: { directory: 'cost-roi' } }],
        },
      ],
    }),
  ],
});
