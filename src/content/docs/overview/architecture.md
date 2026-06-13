---
title: システム全体像
description: ナレッジAIシステムの構成要素と、データの流れの俯瞰。
sidebar:
  order: 2
---

ナレッジ AI システムの全体像を俯瞰します。個々の要素は各セクションで深掘りします。

## 全体アーキテクチャ

```mermaid
flowchart TB
    subgraph Sources["データソース（MS中心）"]
        FS[File Server]
        CF[Confluence]
        JR[JIRA]
        GH[GitHub]
        SP[SharePoint]
    end

    subgraph Ingest["取り込み / 正規化"]
        CN[コネクタ] --> NM[正規化・Markdown化]
        NM --> MT[メタデータ/タグ付与]
        MT --> CH[チャンク分割]
        CH --> EMB[埋め込み生成]
    end

    subgraph Store["インデックス"]
        VDB[(ベクトルDB)]
        KW[(全文/キーワード索引)]
    end

    subgraph Serve["回答生成"]
        ORCH[オーケストレーター / Agent]
        MCP[MCP サーバ群]
        LLM[LLM]
    end

    Sources --> CN
    EMB --> VDB
    NM --> KW
    User[利用者] --> ORCH
    ORCH --> VDB
    ORCH --> KW
    ORCH --> MCP
    ORCH --> LLM
    LLM --> Ans[回答 / ドラフト / レビュー]
    ORCH --> OBS[ログ・コスト計測]
```

## 構成要素のマッピング

| レイヤ | 役割 | 関連セクション |
| --- | --- | --- |
| データソース | 一次情報の所在 | [データソース](/ai-tech-notes/data-sources/) |
| 取り込み・正規化 | 収集・MD化・メタデータ付与 | [データ設計・形式](/ai-tech-notes/data-modeling/) |
| インデックス | ベクトル/キーワード検索 | [RAG 設計](/ai-tech-notes/rag/) |
| 回答生成 | 検索→生成、ツール連携 | [RAG](/ai-tech-notes/rag/) / [MCP](/ai-tech-notes/mcp/) |
| 運用・コスト | 可観測性・最適化 | [コスト・ROI](/ai-tech-notes/cost-roi/) |

## 設計の基本原則

- **一次情報は複製せず参照する** — 複製は重複バージョン問題の温床（[アンチパターン](/ai-tech-notes/anti-patterns/data-duplication/)）
- **検索は二段構え** — ベクトル検索 + キーワード検索のハイブリッド
- **コストは設計段階で見積もる** — トークン消費は後から効いてくる（[コスト・ROI](/ai-tech-notes/cost-roi/)）

:::note[今後追記]
各コンポーネントの選定基準と、規模別（PoC / 部門 / 全社）の構成バリエーションを追加予定。
:::
