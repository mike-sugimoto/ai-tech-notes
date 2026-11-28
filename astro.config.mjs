// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// https://astro.build/config
// Mermaid 図のフォント。Web フォント（Inter / Noto Sans JP）を使うと、フォントの読み込み前に
// 文字幅が計測されてラベルが切れることがあるため、端末にインストール済みのフォントだけを指定する。
const DIAGRAM_FONT =
  "'Segoe UI','Hiragino Sans','Hiragino Kaku Gothic ProN','Yu Gothic UI',Meiryo,system-ui,sans-serif";

export default defineConfig({
  // GitHub Pages: https://mike-sugimoto.github.io/ai-tech-notes/
  site: 'https://mike-sugimoto.github.io',
  base: '/ai-tech-notes',
  trailingSlash: 'always',
  // 統合・移動したページの旧 URL を新しい場所へ転送する
  redirects: {
    '/anti-patterns/mcp-token-waste/': '/ai-tech-notes/mcp/token-cost/',
    '/overview/about/': '/ai-tech-notes/',
    '/overview/architecture/': '/ai-tech-notes/use-cases/reference-architectures/',
    '/mcp/m365-copilot-claude-reference/': '/ai-tech-notes/use-cases/m365-copilot-claude-reference/',
    '/anti-patterns/data-duplication/': '/ai-tech-notes/data-modeling/versioning/',
  },
  integrations: [
    starlight({
      title: 'AI Tech Notes',
      // サイトロゴ（ヘッダーのタイトル横）とファビコン
      logo: { src: './src/assets/logo.svg', alt: 'AI Tech Notes' },
      favicon: '/favicon.svg',
      description: '若手エンジニアが LLM の基礎から RAG・MCP・エージェント開発まで順に学ぶための技術ノート',
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
      // ページ下部の「前へ / 次へ」リンクは表示しない（サイドバーと目次で移動する）
      pagination: false,
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
        // トップページ（index.mdx）をメニュー先頭に統合
        { label: 'はじめに', link: '/' },
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
          label: 'エージェント開発',
          items: [{ autogenerate: { directory: 'agents' } }],
        },
        {
          label: 'データソース',
          items: [{ autogenerate: { directory: 'data-sources' } }],
        },
        {
          label: 'データ設計・形式',
          items: [{ autogenerate: { directory: 'data-modeling' } }],
        },
        // アンチパターンは各章の失敗例をまとめた索引 1 ページだけなので、グループにせず直接リンクする
        { label: 'アンチパターン', link: '/anti-patterns/' },
        {
          label: 'コスト・ROI',
          items: [{ autogenerate: { directory: 'cost-roi' } }],
        },
        // 各論を読んだ後に具体例として読むため、ユースケースは最後に置く
        {
          label: 'ユースケース（発展）',
          items: [{ autogenerate: { directory: 'use-cases' } }],
        },
      ],
    }),
    // astro-mermaid は Starlight より後に置く（Astro 7 では Starlight が設定した Sätteri 処理系に図の変換を追加するため）
    mermaid({
      // draw.io 風のシステマティックな図。影や光彩は付けず、線は直角に折れる配線にする。
      // 図は 1 回だけ描画し（autoTheme 無効）、ライト/ダークの配色は custom.css の --dg-* 変数で
      // SVG を上書きして切り替える。ここの themeVariables は CSS で上書きしない部分のフォールバック。
      autoTheme: false,
      theme: 'base',
      mermaidConfig: {
        fontFamily: DIAGRAM_FONT,
        // ELK レイアウト（@mermaid-js/layout-elk）: 辺を水平・垂直の線分だけで引く（直交配線）
        layout: 'elk',
        elk: {
          mergeEdges: false,
          nodePlacementStrategy: 'BRANDES_KOEPF',
        },
        themeVariables: {
          fontFamily: DIAGRAM_FONT,
          fontSize: '16px',
          background: '#ffffff',
          // ノード（draw.io の標準的な青）
          primaryColor: '#dae8fc',
          mainBkg: '#dae8fc',
          primaryBorderColor: '#6c8ebf',
          primaryTextColor: '#1a1a1a',
          nodeBorder: '#6c8ebf',
          nodeTextColor: '#1a1a1a',
          // 補助（サブグラフ・代替ノード）
          secondaryColor: '#f5f5f5',
          secondaryBorderColor: '#666666',
          secondaryTextColor: '#1a1a1a',
          tertiaryColor: '#f5f5f5',
          tertiaryBorderColor: '#666666',
          tertiaryTextColor: '#1a1a1a',
          clusterBkg: '#f5f5f5',
          clusterBorder: '#666666',
          // 線・ラベル・テキスト
          lineColor: '#333333',
          textColor: '#1a1a1a',
          titleColor: '#1a1a1a',
          edgeLabelBackground: '#ffffff',
          // ER/シーケンス等の汎用
          labelBoxBkgColor: '#dae8fc',
          labelBoxBorderColor: '#6c8ebf',
          actorBkg: '#dae8fc',
          actorBorder: '#6c8ebf',
        },
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          // ELK が求めた折れ点をそのまま直線で結ぶ（曲線にしない）
          curve: 'linear',
          padding: 12,
          nodeSpacing: 36,
          rankSpacing: 44,
          diagramPadding: 8,
          wrappingWidth: 180,
        },
        er: { useMaxWidth: true },
        sequence: { useMaxWidth: true },
      },
    }),
  ],
});
