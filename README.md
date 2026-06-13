# AI Tech Notes

AIによるナレッジ回答・ドラフト作成・レビューシステムを、高精度かつ低コストで構築するための
包括的な設計ノート（RAG / MCP / データ設計 / コスト・ROI）。
[Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/) で構築し、
GitHub Pages で公開します。

🌐 公開URL: <https://mike-sugimoto.github.io/ai-tech-notes/>

## 特徴

- 📚 左サイドバーのドキュメント型ナビゲーション
- 🔍 全文検索（Pagefind / Starlight 標準）
- 🌗 ライト / ダークモード切替
- 📊 Mermaid によるダイアグラム（` ```mermaid ` コードブロック）
- 🇯🇵 日本語単一言語

## ローカルでの起動

```bash
npm install      # 依存関係のインストール（初回のみ）
npm run dev      # 開発サーバー起動 → http://localhost:4321/ai-tech-notes/
```

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | `dist/` に静的サイトをビルド |
| `npm run preview` | ビルド結果をローカルでプレビュー |

## サイト構成（コンテンツ）

記事は `src/content/docs/` 以下の Markdown（`.md` / `.mdx`）です。
左サイドバーは `astro.config.mjs` の `sidebar` で、各ディレクトリを `autogenerate`（自動生成）しています。

```
src/content/docs/
├── index.mdx          # トップページ（splash）
├── overview/          # はじめに（目的・全体像）
├── use-cases/         # ユースケース（回答/ドラフト/レビュー + 推奨構成）
├── rag/               # RAG 設計（基礎/チャンク/検索/評価）
├── mcp/               # MCP 活用（概要/サーバ構成/トークン対策/使い分け）
├── data-sources/      # データソース（FileServer/Confluence/JIRA/GitHub/SharePoint）
├── data-modeling/     # データ設計・形式（MD推奨/メタデータ/YAMLタグ/バージョン管理）
├── anti-patterns/     # アンチパターン（重複版/MCPトークン浪費）
└── cost-roi/          # コスト・ROI（構造/選定/最適化）
```

## 記事の追加方法

対象セクションのディレクトリに Markdown ファイルを作成し、先頭にフロントマターを書きます。

```markdown
---
title: 記事タイトル
description: 概要（検索・OGに使われます）
sidebar:
  order: 2   # サイドバー内の並び順（小さいほど上）
---

本文をここに書きます。
```

- 図を描くときは ` ```mermaid ` コードブロックを使います（[Mermaid 記法](https://mermaid.js.org/)）。
- 内部リンクはベースパスを含めて書きます（例: `/ai-tech-notes/rag/`）。

### 新しいセクションを増やす

1. `src/content/docs/<新セクション>/` を作成し記事を追加
2. `astro.config.mjs` の `sidebar` に項目を追加

```js
{
  label: 'セクション名',
  items: [{ autogenerate: { directory: '新セクション' } }],
},
```

## GitHub Pages への公開手順

1. このリポジトリを GitHub の `mike-sugimoto/ai-tech-notes` に push する
2. リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に設定
3. `main` ブランチへ push すると [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) が
   自動でビルド・デプロイを実行
4. 数分後、<https://mike-sugimoto.github.io/ai-tech-notes/> に反映

> リポジトリ名を変更した場合は、`astro.config.mjs` の `site` / `base` も合わせて更新してください。

## ライセンス

[MIT](LICENSE)
