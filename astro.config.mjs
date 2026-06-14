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
      // Anthropic / Claude docs 風の配色で固定（温かいアイボリーのキャンバス + クレイのアクセント）。
      // 両モードで一貫した見た目にするため autoTheme は無効化し、base テーマを themeVariables で上書き。
      autoTheme: false,
      theme: 'base',
      mermaidConfig: {
        fontFamily: "'Inter','Noto Sans JP',system-ui,sans-serif",
        themeVariables: {
          fontFamily: "'Inter','Noto Sans JP',system-ui,sans-serif",
          fontSize: '15px',
          background: '#f6f4ee',
          // ノード
          primaryColor: '#ffffff',
          mainBkg: '#ffffff',
          primaryBorderColor: '#c96442', // クレイ
          primaryTextColor: '#1f1d1a',
          nodeBorder: '#c96442',
          nodeTextColor: '#1f1d1a',
          // 補助（サブグラフ・代替ノード）
          secondaryColor: '#efe7da',
          secondaryBorderColor: '#cbb89c',
          secondaryTextColor: '#1f1d1a',
          tertiaryColor: '#f1ebdf',
          tertiaryBorderColor: '#cbb89c',
          tertiaryTextColor: '#1f1d1a',
          clusterBkg: '#f1ece1',
          clusterBorder: '#d9cab0',
          // 線・ラベル・テキスト
          lineColor: '#9a8c78',
          textColor: '#1f1d1a',
          titleColor: '#1f1d1a',
          edgeLabelBackground: '#f6f4ee',
          // ER/シーケンス等の汎用
          labelBoxBkgColor: '#ffffff',
          labelBoxBorderColor: '#c96442',
          actorBkg: '#ffffff',
          actorBorder: '#c96442',
        },
        flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', padding: 14 },
        er: { useMaxWidth: true },
        sequence: { useMaxWidth: true },
      },
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
      // Web フォント（Inter + 日本語 Noto Sans JP）。Anthropic 風の配色は custom.css 側で指定。
      head: [
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: true,
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&display=swap',
          },
        },
      ],
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
