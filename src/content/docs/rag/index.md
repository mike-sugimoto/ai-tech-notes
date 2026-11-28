---
title: RAG の基礎
description: 検索拡張生成の全体像と、高精度化のための構成要素・判断軸。
sidebar:
  order: 1
lastUpdated: 2026-11-27
---

RAG（Retrieval-Augmented Generation, 検索拡張生成）は、
LLM に **外部ナレッジを検索して根拠として与える** ことで、
最新性・正確性・出典提示を実現する手法です。高精度なナレッジ回答の中核になります。

なぜ必要かは [LLM の基礎](/ai-tech-notes/llm-basics/) が出発点です。LLM は
「知っていること」ではなく「もっともらしい続き」を生成し、学習時点までの知識しか持ちません。
だからこそ、社内文書を**根拠として検索して渡す**ことが、幻覚を抑え、出典を示す鍵になります。

## 基本パイプライン

```mermaid
flowchart TB
    subgraph Index["① 事前処理（バッチ）"]
        direction LR
        DOC[文書] --> NM[正規化<br/>Markdown 化] --> CH[チャンク分割] --> EMB[埋め込み]
    end
    VDB[(索引<br/>ベクトル ＋ キーワード)]
    subgraph Query["② 問い合わせ時"]
        direction LR
        Q[質問] --> RET[検索] --> RR[リランキング] --> LLM[LLM 生成] --> ANS[出典付き回答]
    end
    Index --> VDB
    VDB -. 参照 .-> Query
```

RAG は大きく **「事前処理（インデックス構築）」** と **「問い合わせ時（検索→生成）」** の
2フェーズに分かれます。事前処理の品質が、問い合わせ時の精度を上限として決めます。

## RAG / ファインチューニング / 長文投入 の使い分け

「社内知識を使わせたい」ときの選択肢は RAG だけではありません。混同されがちなので整理します。

| 手段 | 何をする | 向くケース | 注意 |
| --- | --- | --- | --- |
| **RAG** | 検索して根拠を都度渡す | 更新が多い・出典が要る・大量文書 | 検索精度の作り込みが必要 |
| **ファインチューニング** | モデル自体を追加学習 | 口調・形式の固定、特定タスク最適化 | 知識の更新に弱い・コスト大・幻覚は消えない |
| **長文をそのまま投入** | 文書を丸ごとコンテキストへ | 文書が少なく小さい | 大量だとコスト増・精度低下（[コンテキスト](/ai-tech-notes/llm-basics/context-window/)） |

:::tip
「最新の社内知識に基づく正確な回答」が目的なら、まず **RAG** が第一選択です。
ファインチューニングは**知識の注入ではなく振る舞いの調整**に使うのが基本です。
:::

## 精度を決める4要素

RAG の精度は、次の4要素でほぼ決まります。どれか1つだけ頑張っても頭打ちになります。

| 要素 | 効くポイント | 詳細 |
| --- | --- | --- |
| チャンク戦略 | 検索ヒットの粒度 | [チャンク戦略](/ai-tech-notes/rag/chunking/) |
| 検索方式 | 再現率・適合率 | [検索とリランキング](/ai-tech-notes/rag/retrieval/) |
| メタデータ | 絞り込みの効き | [メタデータ](/ai-tech-notes/data-modeling/metadata/) |
| 評価 | 改善サイクル | [評価](/ai-tech-notes/rag/evaluation/) |

## RAG の進化（2026 年時点）

RAG は「検索して渡す」という基本は同じまま、各段階が高度化しています。

| 段階 | 特徴 | 代表的な手法 |
| --- | --- | --- |
| 素朴な RAG | ベクトル検索の上位数件をそのまま渡す | 固定長チャンク ＋ ベクトル検索 |
| 高度化した RAG | 取りこぼしとノイズを減らす工夫を重ねる | ハイブリッド検索、リランク、[文脈付きチャンク](/ai-tech-notes/rag/chunking/#文脈付きチャンクcontextual-retrieval)、メタデータ・権限フィルタ |
| エージェント型 RAG | LLM が検索計画を立て、必要に応じて複数回・複数ソースを検索する | 質問の分解とサブクエリの並列実行（[エージェント型検索](/ai-tech-notes/rag/retrieval/#エージェント型検索agentic-retrieval)）、検索ツールを持つエージェント |

- **まずは「高度化した RAG」を目標に** するのが現実的です。ハイブリッド ＋ リランク ＋ メタデータで多くの社内 Q&A は十分な精度になります。
- エージェント型は、複数文書をまたぐ比較・集計など **1 回の検索では答えられない質問** で効果を発揮しますが、
  LLM 呼び出しが増えるぶん遅く高価になります。評価で効果を確認してから導入します。
- 文書間の関係をグラフ化する **GraphRAG** のような手法もありますが、索引作成のコストが高く、
  代表的な OSS 実装も保守モード（新機能の追加なし）に入っています。全体を俯瞰する要約型の質問が中心でない限り、優先度は低めです。

## LLM はステートレス、という大前提

RAG を設計するうえで外せない前提が、**LLM は記憶を持たない（ステートレス）**ことです。
取得した文書も会話履歴も、**毎回コンテキストに載せて再送**する必要があり、これがコストに直結します。
キャッシュでこの挙動がどう変わるか（そしてモデルごとの違い）は
[コンテキストとキャッシュ](/ai-tech-notes/rag/context-and-caching/) で詳しく扱います。

## 典型的な失敗と切り分け

「RAG なのに精度が出ない」ときは、**検索**と**生成**のどちらが原因かをまず切り分けます。

```mermaid
flowchart TD
    BAD[回答が悪い] --> CHK{正解文書は<br/>取得できている?}
    CHK -->|取れていない| RETV[検索の問題<br/>→ チャンク/検索/メタデータ]
    CHK -->|取れている| GENV[生成の問題<br/>→ プロンプト/コンテキスト量/モデル]
```

| 症状 | 疑う場所 | 主な対策 |
| --- | --- | --- |
| 関連文書がそもそも出てこない | チャンク・検索 | [チャンク戦略](/ai-tech-notes/rag/chunking/) / [ハイブリッド検索](/ai-tech-notes/rag/retrieval/) |
| 取れているのに回答が薄い・的外れ | プロンプト・投入量 | コンテキスト構築・指示の見直し |
| 古い情報で答える | データ鮮度 | [重複バージョン対策](/ai-tech-notes/data-modeling/versioning/) |
| 出典がズレる | チャンクのメタデータ | 見出しパス・doc_id の付与 |
| コストが高い | 投入トークン量 | 絞り込み・[キャッシュ](/ai-tech-notes/rag/context-and-caching/) |

## テックリードが訊いてくる質問

> **Q. 「RAG とファインチューニング、どっちでやる？」**
> A. 知識の鮮度・出典が要るなら RAG。口調や出力形式の固定はファインチューニング。多くの社内ナレッジ用途は RAG が本命です。

> **Q. 「精度が出ないのはモデルが弱いから？」**
> A. まず検索品質を疑います。正解文書が取れていないなら、より賢いモデルに変えても直りません。検索→生成の順で切り分けます。

> **Q. 「評価はどうやる？“なんとなく良くなった”は困る」**
> A. 検索（recall/precision）と生成（出典一致・幻覚率）を分けて計測します（[評価](/ai-tech-notes/rag/evaluation/)）。変更のたびにスコアを比較します。

> **Q. 「権限のない文書が回答に混ざらない？」**
> A. 検索段で**アクセス権限でフィルタ**するのが前提です（[検索](/ai-tech-notes/rag/retrieval/)）。元システムの権限を索引にも反映します。

## RAG と MCP の関係

RAG は「事前にインデックス化した知識を検索」、MCP は「実行時に外部システムへ問い合わせ」が得意です。
両者は競合せず補完関係にあります → [RAG と MCP の使い分け](/ai-tech-notes/mcp/rag-vs-mcp/)。

:::note[このセクションの読み方]
[チャンク戦略](/ai-tech-notes/rag/chunking/) → [検索とリランキング](/ai-tech-notes/rag/retrieval/) →
[評価](/ai-tech-notes/rag/evaluation/) → [コンテキストとキャッシュ](/ai-tech-notes/rag/context-and-caching/)
の順に読むと、構築から運用・コストまで一通り押さえられます。
:::

## 参考・出典

- [Introducing Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval) — Anthropic
- [Relevance in Azure AI Search](https://learn.microsoft.com/azure/search/search-relevance-overview) — Microsoft Learn
- [Agentic retrieval in Azure AI Search](https://learn.microsoft.com/azure/search/agentic-retrieval-overview) — Microsoft Learn
- [GraphRAG](https://microsoft.github.io/graphrag/) — Microsoft Research
