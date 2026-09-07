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
      // Zenn 風の配色で固定（淡いブルーグレーのキャンバス + 濃青のアクセント）。
      // 両モードで一貫した見た目にするため autoTheme は無効化し、base テーマを themeVariables で上書き。
      autoTheme: false,
      theme: 'base',
      mermaidConfig: {
        fontFamily: "'Inter','Noto Sans JP',system-ui,sans-serif",
        themeVariables: {
          fontFamily: "'Inter','Noto Sans JP',system-ui,sans-serif",
          fontSize: '15px',
          background: '#eef5fc',
          // ノード
          primaryColor: '#ffffff',
          mainBkg: '#ffffff',
          primaryBorderColor: '#3e8ed0', // 濃青
          primaryTextColor: '#0b1626',
          nodeBorder: '#3e8ed0',
          nodeTextColor: '#0b1626',
          // 補助（サブグラフ・代替ノード）
          secondaryColor: '#dceafb',
          secondaryBorderColor: '#a9c8e8',
          secondaryTextColor: '#0b1626',
          tertiaryColor: '#e4eefb',
          tertiaryBorderColor: '#a9c8e8',
          tertiaryTextColor: '#0b1626',
          clusterBkg: '#e0ecfa',
          clusterBorder: '#b6d1ee',
          // 線・ラベル・テキスト
          lineColor: '#5a7096',
          textColor: '#0b1626',
          titleColor: '#0b1626',
          edgeLabelBackground: '#eef5fc',
          // ER/シーケンス等の汎用
          labelBoxBkgColor: '#ffffff',
          labelBoxBorderColor: '#3e8ed0',
          actorBkg: '#ffffff',
          actorBorder: '#3e8ed0',
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
      // Web フォント（Inter + 日本語 Noto Sans JP）。Zenn 風の濃青配色は custom.css 側で指定。
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
