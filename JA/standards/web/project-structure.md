# プロジェクト構造標準

## ディレクトリ構成

### ルート構造

``` 
project-root/ 
├── src/ # ソースコード
├── public/ # 静的アセット
├── dist/ # ビルド出力（生成済み）
├── node_modules/ # 依存関係（生成済み）
├── tests/ # テストファイル
├── docs/ # ドキュメント
├── .github/ # GitHub ワークフローとテンプレート
├── .vscode/ # VS Code 設定
├── scripts/ # ビルドおよびユーティリティスクリプト
├── package.json # プロジェクトのメタデータと依存関係
├── tsconfig.json # TypeScript 設定
├── .eslintrc.js # ESLint 設定
├── .prettierrc # Prettier 設定
├── .gitignore # Git の無視パターン
├── .env.example # 環境変数の例
└── README.md # プロジェクトドキュメント
```

### ソースディレクトリ構造

```
src/
├── assets/ # 処理が必要な静的アセット
│ ├── images/ # 画像
│ ├── fonts/ # フォントファイル
│ └── styles/ # グローバルスタイル
│ 
├── components/ # 再利用可能な UI コンポーネント
│ ├── common/ # 機能間で共有されるコンポーネント
│ ├── layout/ # レイアウトコンポーネント
│ └── ui/ # 基本的な UI コンポーネント
│ 
├── hooks/ # カスタム React フック
│ 
├── pages/ # ページコンポーネント / ルートコンポーネント
│ 
├── features/ # 機能ベースのモジュール
│ ├── feature1/ #特定の機能
│ │ ├── components/ # 機能固有のコンポーネント
│ │ ├── hooks/ # 機能固有のフック
│ │ ├── api/ # 機能固有の API 呼び出し
│ │ ├── utils/ # 機能固有のユーティリティ
│ │ ├── types/ # 機能固有の型
│ │ └── index.ts # 機能のエクスポート
│ └── feature2/ # 別の機能
│ 
├── services/ # サービス統合
│ ├── api/ # API クライアントとエンドポイント
│ ├── auth/ # 認証サービス
│ └── analytics/ # アナリティクスサービス
│ 
├── store/ # 状態管理
│ ├── slices/ # Redux スライスまたはコンテキストプロバイダー
│ ├── actions/ # アクションクリエーター
│ └── selectors/ # 状態セレクター
│ 
├── utils/ # ユーティリティ関数
│ ├── formatting/ # フォーマットユーティリティ
│ ├── validation/ # 検証ユーティリティ
│ └── helpers/ # ヘルパー関数
│ 
├── types/ # TypeScript 型定義
│ ├── api/ # API レスポンス型
│ ├── models/ # データモデル型
│ └── common/ # 共通型定義
│ 
├── constants/ # アプリケーション定数
│ 
├── i18n/ # 国際化
│ ├── locales/ # 翻訳ファイル
│ └── config.ts # i18n 設定
│ 
├── config/ # アプリ設定
│ ├── routes.ts # ルート定義
│ └── settings.ts # アプリ設定
│
└── App.tsx # メインアプリケーションコンポーネント
```

## 命名規則

### ファイルとディレクトリ

- **React コンポーネント**: 拡張子付きパスカルケース
- `Button.tsx`、`UserProfile.tsx`
- **フック**: 'use' プレフィックス付きキャメルケース
- `useAuth.ts`、`useFetch.ts`
- **ユーティリティ**: キャメルケース
- `formatDate.ts`、`validateEmail.ts`
- **定数**: UPPER_SNAKE_CASE
- `API_ENDPOINTS.ts`、`ROUTE_PATHS.ts`
- **型/インターフェース**: 説明的な名前付きパスカルケース
- `UserData.ts`、`ApiResponse.ts`
- **テストファイル**: テスト対象ファイルと同じ名前で、`.test` または `.spec` というサフィックスを付けます。
- `Button.test.tsx`、`formatDate.spec.ts`

### コンポーネントの構成

- **コンポーネントファイル**: ファイルごとに1つのコンポーネント
- **コンポーネントの構造**:
```tsx
// インポート
import React from 'react';
import './styles.css';

// 型
interface ButtonProps {
// ...
}

// コンポーネント
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
// ...
return (
// JSX
);
};

// このコンポーネント固有のヘルパー関数
const helperFunction = () => {
// ...
};
```

## モジュール構成

### インポート順序

1. 外部ライブラリ
2. 内部モジュール
3. コンポーネント
4. フック
5. ユーティリティ
6. 型
7. アセット/スタイル

例:
```tsx
// 外部ライブラリ
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 内部モジュール
import { API_ENDPOINTS } from '@/constants/api';
import { fetchData } from '@/services/api';

// コンポーネント
import { Button } from '@/components/ui';
import { Modal } from '@/components/common';

// フック
import { useAuth } from '@/hooks';

// ユーティリティ
import { formatDate } from '@/utils/formatting';

// タイプ
import type { UserData } from '@/types';

// アセット/スタイル
import './styles.css';
```

### エクスポートパターン

- ほとんどのコンポーネントと関数で名前付きエクスポートを使用する
- インポートを簡素化するために、バレルエクスポート (index.ts) を使用する
- ページコンポーネントを除き、デフォルトのエクスポートを避ける

バレルエクスポートの例:
```tsx
// components/ui/index.ts
export * from './Button';
export * from './Input';
'./Card' からエクスポート *; ```

## 設定ファイル

### 環境変数

- 環境固有の設定には `.env` ファイルを使用する
- ドキュメント付きの `.env.example` をインクルードする
- 環境固有のファイル (`.env.development`、`.env.production`) を使用する
- 機密性の高い値はバージョン管理にコミットしない

### TypeScript の設定

- strict モードを使用する
- よりクリーンなインポートのためにパスエイリアスを設定する
- 必要に応じて、環境ごとに設定を分ける
- わかりにくい設定の選択肢をドキュメント化する

### パッケージ管理

- ロックファイルを使用する (package-lock.json、yarn.lock、pnpm-lock.yaml)
- 必要な Node.js のバージョンをドキュメント化する
- package.json で依存関係を論理的にグループ化する
- 開発環境の依存関係と本番環境の依存関係を分離する

## ドキュメント

### コードドキュメント

- 複雑な関数やコンポーネントをドキュメント化する
-関数のドキュメントにはJSDocを使用する
- Reactコンポーネントのpropsをドキュメント化する
- 再利用可能なコンポーネントの例を含める
- 状態管理パターンをドキュメント化する

### プロジェクトドキュメント

- 包括的なREADME.mdを含める
- セットアップとインストールのプロセスをドキュメント化する
- 開発ワークフローの手順を含める
- ビルドとデプロイのプロセスをドキュメント化する
- バージョン履歴のためにCHANGELOG.mdを維持する
- コントリビューションガイドラインを含める

## ベストプラクティス

- 関連ファイルをグループ化する
- コンポーネントファイルを小さく、焦点を絞ったものにする
- ビジネスロジックとUIコンポーネントを分離する
- パスエイリアスを使用して、深いインポートパスを回避する
- プロジェクト全体で一貫したファイル構成を維持する
- 新しいチームメンバーのためにプロジェクト構造をドキュメント化する
- 必要に応じて、コードジェネレータを使用して一貫性を保つ
- プロジェクト構造を定期的にレビューし、リファクタリングする