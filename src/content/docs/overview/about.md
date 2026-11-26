---
title: このサイトの目的
description: 何を扱い、誰に向けて、どう読むか。
sidebar:
  order: 1
lastUpdated: 2026-11-27
---

このサイトは、**社内ナレッジを対象とした AI システム**（回答・ドラフト作成・レビュー支援）を
設計・構築するうえで必要な知識を、抜け漏れなく一箇所に集約することを目的としています。

## このサイトが答える問い

- どんな **ユースケース** があり、それぞれにどの **アーキテクチャ** が向くか
- 高精度な回答を得るための **RAG** の作り込み方
- **MCP** をどこで使い、どうトークン消費を抑えるか
- 社内データが分散する **蓄積場所**（Microsoft 系中心）にどう接続するか
- AI が扱いやすい **データ形式・メタデータ・タグ** はどう設計するか
- 陥りやすい **アンチパターン**（特にデータ複製と重複バージョン管理）の回避策
- **コスト / ROI** を踏まえたシステム選定の判断材料
- Microsoft 365 Copilot やマネージド検索基盤を **使うか、自前で作るか** の判断軸

## 想定読者

| 読者 | このサイトの使いどころ |
| --- | --- |
| AI システムアーキテクト | 全体構成の決定、技術選定、トレードオフの整理 |
| IT 部門 | データソース接続・ガバナンス・運用・コスト管理 |
| 開発者 | RAG / MCP の実装パターンとアンチパターンの把握 |

## スコープ

- **対象:** Microsoft 系を中心とした社内データ基盤（File Server / Confluence / JIRA / GitHub / SharePoint）
- **対象:** 汎用 LLM（Claude / GPT / Gemini など）を API・クラウド経由で利用する構成
- **対象外:** Google Workspace 系（Drive / Docs など）
- **対象外:** モデルの事前学習・ファインチューニングの実装詳細、オンプレミス GPU 基盤の構築

## 前提とする 2026 年時点の状況

このサイトの記述は、次のような現在の状況を前提にしています。

- **RAG は「作り込むもの」から「選ぶもの」へ。** ハイブリッド検索・リランク・権限トリミング・
  エージェント型検索がマネージドサービスで提供され始め、自前実装の範囲を選べるようになった。
- **MCP が AI とツール/データをつなぐ標準になった。** 主要な AI クライアント・開発ツール・M365 Copilot が対応し、
  「静的知識は RAG、最新状態や操作は MCP」という役割分担が定着しつつある。
- **長いコンテキストとプロンプトキャッシュが一般化した。** 「全部渡す」ことは技術的には可能になったが、
  コスト・精度・権限の観点から **検索で絞ってから渡す** 設計の重要性は変わらない。
- **セキュリティの論点が具体化した。** 間接プロンプトインジェクションや過剰な権限（Excessive Agency）など、
  LLM 特有のリスクが OWASP などで体系化され、設計段階での対策が求められている。

## このサイトの読み方（表記ルール）

| 要素 | 意味 |
| --- | --- |
| ページ末尾の **参考・出典** | 記述の根拠にした一次情報（公式ドキュメント・仕様・公式ブログ）へのリンク |
| フッターの **最終更新日** | そのページの内容を最新情報に照らして見直した日付 |
| 「**注意**」ボックス | プレビュー機能・変更されやすい料金や仕様など、採用前に確認が必要な点 |
| 「**ヒント**」ボックス | 実務での勘所・判断のコツ |

:::note[情報の鮮度について]
AI 関連のサービス名・料金・機能の提供状況は短期間で変わります。
数値や機能の可否は、各ページの最終更新日時点の情報として扱い、採用前に出典リンク先で最新状況を確認してください。
:::

## 読み進め方

1. まず [システム全体像](/ai-tech-notes/overview/architecture/) で俯瞰する（構成・設計判断・作るか使うか）
2. [ユースケース](/ai-tech-notes/use-cases/) で自分のケースに近いものを見つける
3. 不安があれば [LLM の基礎](/ai-tech-notes/llm-basics/)（トークン・コンテキストウィンドウ・モデル選定）で土台を固める
4. 各論（[RAG](/ai-tech-notes/rag/) / [MCP](/ai-tech-notes/mcp/) / [データ](/ai-tech-notes/data-modeling/)）を深掘り
5. [アンチパターン](/ai-tech-notes/anti-patterns/) と [コスト・ROI](/ai-tech-notes/cost-roi/) で実装判断を固める

## 参考・出典

- [Model Context Protocol — Introduction](https://modelcontextprotocol.io/) — modelcontextprotocol.io
- [Microsoft 365 Copilot connectors overview](https://learn.microsoft.com/microsoftsearch/connectors-overview) — Microsoft Learn
- [Relevance in Azure AI Search](https://learn.microsoft.com/azure/search/search-relevance-overview) — Microsoft Learn
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) — OWASP GenAI Security Project
