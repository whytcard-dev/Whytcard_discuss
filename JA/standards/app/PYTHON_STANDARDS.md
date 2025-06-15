# WhytCard の Python 標準

## はじめに

このドキュメントでは、WhytCard プロジェクトにおける Python 開発において遵守すべき標準とベストプラクティスを定義します。これらのルールは、コードベース全体にわたって一貫性があり、保守性が高く、高品質なコードを保証することを目的としています。

## 目次

1. [スタイル規約](#style-conventions)
2. [コード構造](#code-structure)
3. [ドキュメント](#documentation)
4. [テスト](#testing)
5. [エラー処理](#error-handling)
6. [パフォーマンス](#performance)
7. [セキュリティ](#security)
8. [スクレイピングの詳細](#scraping-specifics)
9. [推奨ツール](#recommended-tools)

## スタイル規約

### PEP 8

WhytCard では、Python の公式スタイルガイドである [PEP 8](https://www.python.org/dev/peps/pep-0008/) に厳密に準拠していますが、一部 WhytCard 独自の変更を加えています。

### インデントとフォーマット

- インデントには**4つのスペース**を使用します（タブは使用しません）
- すべての行を**最大88文字**に制限します（Black標準）
- 関数とクラス、および関数内の大きなコードブロックを区切るには、空行を使用します
- 演算子の前後とカンマの後にスペースを使用します

```python
# 良い例
def calculate_total(price, quantity=1):
total = price * quantity
return total

# 悪い例
def calculate_total(price,quantity = 1):
total=price*quantity
return total
```

### 命名規則

- **モジュールとパッケージ**: 短い小文字の名前、アンダースコアなし (`scraper.py`、`utils.py`)
- **クラス**: CamelCase (`ScrapingConfig`、 `DataProcessor`)
- **関数と変数**: snake_case (`extract_data()`, `user_agent`)
- **定数**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **「プライベート」変数**: アンダースコアを先頭に付ける (`_internal_cache`)
- **説明的な名前**: 簡潔さよりも明瞭さを優先する

```python
# 良い例
class UserDataProcessor:
def __init__(self):
self.MAX_BATCH_SIZE = 100
self._temp_storage = {}

def process_user_data(self, user_data):
pass

# 悪い例
class Processor:
def __init__(self):
self.max = 100
self.temp = {}

def process(self, d):
pass
```

### インポート

- インポートは空行で区切られた3つのセクションに整理します。
1. 標準ライブラリのインポート
2. サードパーティライブラリのインポート
3. ローカルプロジェクトのインポート
- 各セクションはアルファベット順に並べます。
- 汎用インポートよりも明示的なインポートを優先します。

```python
# 良い例
import os
import sys
from entering import Dict, List, Optional

import aiohttp
import bs4
from fastapi import HTTPException

from scraping.utils import URLUtils
from utils.logging import setup_logger

# 悪い例
from scraping.utils import *
import aiohttp, bs4
import sys, os
```

## コード構造

### モジュール構成

- 各モジュールは、明確に定義された単一の責任を持つ必要があります。
- 関連するモジュールをパッケージで整理します。
- 各パッケージに `__init__.py` ファイルを作成し、公開APIを明確に公開します。

```python 
# scraping/__init__.py 
from .scraper import AdvancedScraper, ScrapingConfig, ScrapingMode 
from .utils import URLUtils, ContentExtractor 

__all__ = [ 
"AdvancedScraper", 
"ScrapingConfig", 
"ScrapingMode", 
"URLUtils", 
"ContentExtractor" 
] 
```

### クラスと関数

- 単一責任原則 (SRP) に従います。
- 関数のサイズは最大50行に制限します。
- クラスのサイズは最大300行に制限します。
- 静的メソッドまたはスタンドアロン関数を使用します。インスタンスの状態に依存しない操作

```python
# 良い例
class DataProcessor:
def process_data(self, data):
cleaned_data = self._clean_data(data)
return self._transform_data(cleaned_data)

def _clean_data(self, data):
# クリーニングロジック
return cleaned_data

def _transform_data(self, data):
# 変換ロジック
return transformed_data

# 悪い例
class DataProcessor:
def process_data(self, data):
# クリーニングと変換が混在する200行のコード
return result
```

### 静的型付け

- すべての関数とメソッドに型アノテーションを使用する
- 複雑な型には `typing` モジュールを使用する
- 発生する可能性のある例外をドキュメント化する

```python
from entering import Dict, List、Optional、Union、Any

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]:
"""
指定されたURLからデータを取得します。

引数:
url: クエリ対象のURL
timeout: タイムアウト値（秒）

戻り値:
取得したデータを含む辞書

例外:
HTTPException: リクエストが失敗した場合
"""
# 実装
```

## ドキュメント

### ドキュメント文字列

- すべてのモジュール、クラス、メソッド、関数にドキュメント文字列を使用します。
- ドキュメント文字列はGoogleフォーマットに従います。
- パラメータ、戻り値、例外をドキュメント化します。

```python
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]:
"""
すべてのリンクを抽出します。テキストと属性を含むHTMLページ。

引数: 
html: ページのHTMLコンテンツ
base_url: 相対リンクを解決するためのベースURL

戻り値: 
リンク情報を含む辞書のリスト

例外: 
ValueError: HTMLが無効な場合
"""
```

### コメント

- コメントは「何」ではなく「なぜ」を説明する
- 複雑または直感的でないコードにはコメントする
- 古くなったコメントや冗長なコメントは避ける

```python
# 良い例
# 遅いサイトで頻繁にタイムアウトが発生しないように、5秒の制限を設定する
timeout = 5

# 悪い例
# タイムアウトを設定する
timeout = 5
```

## テスト

### テスト構造

- すべてのテストにpytestを使用する
- ソースコードを反映した構造でテストを整理する
- テストファイル名は`test_` プレフィックス
- テスト関数の名前には `test_` プレフィックスを付けます

``` 
scraping/
scraper.py
utils.py
tests/
scraping/
test_scraper.py
test_utils.py
```

### テストカバレッジ

- 少なくとも80%のテストカバレッジを目指します
- すべてのクリティカルなコードパスをテストします
- エッジケースとエラー条件に対するテストを含めます

```python
def test_scrape_url_success():
# 通常のケースをテストします

def test_scrape_url_timeout():
# URLが応答しない場合をテストします

def test_scrape_url_invalid_url():
# 無効なURLでテストします
```

### 非同期テスト

- `pytest-asyncio` を使用します非同期コードのテスト
- テスト内のネットワーク呼び出しにはモックを使用する

```python 
import pytest

@pytest.mark.asyncio 
async def test_async_function():
result = await async_function()
assert result == expected_result
```

## エラー処理

### 例外

- アプリケーション固有のエラーに対してカスタム例外を作成する
- 必要に応じて標準の Python 例外を使用する
- 発生する可能性のあるすべての例外を文書化する

```python 
class ScrapingException(Exception):
"""スクレイピングエラーの基本例外。"""
pass

class RateLimitException(ScrapingException):
"""レート制限に達したときに発生する例外。"""
pass
```

### エラー処理

- エラーを適切に処理するために try/except ブロックを使用する
- 例外を汎用的にキャッチしないようにする
- 十分なログ出力を行うデバッグ用のコンテキスト

```python 
try:
result = await scraper.scrape_url(url)
except RateLimitException:
logger.warning(f"{url} のレート制限に達しました。遅延後に再試行します")
await asyncio.sleep(RATE_LIMIT_DELAY)
result = await scraper.scrape_url(url)
except ScrapingException as e:
logger.error(f"{url} のスクレイピングに失敗しました: {str(e)}")
raise
```

## パフォーマンス

### 非同期

- I/O を集中的に使用する操作には `asyncio` を使用する
- 非同期 HTTP リクエストには `aiohttp` を使用する
- 過負荷を避けるため、同時実行タスクの数を制限する

```python 
async def scrape_batch(urls: List[str], max_concurrent: int = 10):
semaphore = asyncio.Semaphore(max_concurrent)

async def _scrape_with_semaphore(url):
async with semaphore:
return await scrape_url(url)

tasks = [_scrape_with_semaphore(url) for url in urls]
return await asyncio.gather(*tasks, return_exceptions=True)
```

### 最適化

- よく使う操作には適切なデータ構造を使用する（頻繁に参照する場合は辞書を使用する）
- 大きなデータの不要なコピーを避ける
- 大量のデータを処理するにはジェネレータを使用する
- コストのかかる計算やリクエストをキャッシュする

```python
# ジェネレータを使用して大規模なデータセットを処理する
def process_large_dataset(file_path):
with open(file_path, 'r') as f: 
for line in f: 
yield process_line(line) 
```

## セキュリティ

### 入力検証

- ユーザー入力は常に検証する
- データ検証には Pydantic を使用する
- 外部データは信頼しない

```python 
from pydantic import BaseModel, HttpUrl, validator

class ScrapingRequest(BaseModel): 
url: HttpUrl 
depth: int = 1

@validator('depth')
def validator_depth(cls, v): 
if v < 1 or v > 3: 
raise ValueError('Depth must be between 1 and 3') 
return v
```

### シークレット管理

- ソースコードにシークレット（パスワード、APIキー）を含めない
- 環境変数またはセキュアな設定ファイルを使用する
- python-dotenv を使用して環境を読み込む変数

```python 
import os 
from dotenv import load_dotenv 

load_dotenv() 

API_KEY = os.getenv("API_KEY") 
if not API_KEY: 
raise EnvironmentError("API_KEY 環境変数が設定されていません") 
```

## スクレイピングの詳細

### robots.txt の尊重

- robots.txt ファイルを常に尊重する
- リクエスト間に遅延を設ける
- 適切な User-Agent で適切に識別する

```python 
from urllib.robotparser import RobotFileParser 
from urllib.parse import urlparse 

def can_fetch(url: str, user_agent: str) -> bool: 
"""robots.txt に従って URL を取得できるかどうかを確認します。"""
parser = RobotFileParser()
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt"
parser.set_url(robots_url)
parser.read()
return parser.can_fetch(user_agent, url)
```

### セッション管理

- パフォーマンス向上のため、HTTPセッションを再利用する
- 使用後はセッションを適切に閉じる
- リソースの完全クローズを保証するため、非同期コンテキストを使用する

```python
async def scrape_with_session():
async with aiohttp.ClientSession() as session:
# すべてのリクエストでセッションを使用する
result1 = await fetch_url(session, url1)
result2 = await fetch_url(session, url2)
# ここでセッションは自動的に閉じられる
```

### HTMLパース

- BeautifulSoupのパーサーとして`lxml`を使用するパフォーマンス向上
- DOMナビゲーションにCSSまたはXPathセレクタを使用する
- 期待される要素が存在しないケースを処理する

```python 
from bs4 import BeautifulSoup

def extract_title(html: str) -> Optional[str]: 
soup = BeautifulSoup(html, "lxml")
title_tag = soup.find("title")
return title_tag.text if title_tag else None
```

## 推奨ツール

### リンティングとフォーマット

- **Black**: 自動コードフォーマッタ
- **isort**: 自動インポートソータ
- **flake8**: エラーとスタイルの問題を検出するリンタ
- **mypy**: 静的型チェック

### 推奨構成

`pyproject.toml` ファイル:

```toml 
[tool.black]
line-length = 88
target-version = ['py38']
include = '\.pyi?$'

[tool.isort]
profile = "black"
line_length = 88

[tool.mypy]
python_version = "3.8"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true
disallow_incomplete_defs = true
```

`.flake8` ファイル:

```
[flake8]
max-line-length = 88
extend-ignore = E203
exclude = .git,__pycache__,build,dist
```

### CI 統合

CI パイプラインでこれらのツールを設定して、コードを自動的にチェックします:

```yaml
# GitHub Actions の例
name: Pythonリンティング

on: [push, pull_request]

jobs:
lint:
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v2
- name: Pythonのセットアップ
uses: actions/setup-python@v2
with:
python-version: '3.8'
- name: 依存関係のインストール
run: |
python -m pip install --upgrade pip
pip install black isort flake8 mypy
- name: リンターの実行
run: |
black --check .
isort --check .
flake8 .
mypy .
```

---

## まとめ

これらの標準は、WhytCardプロジェクトにおけるPythonコードの品質、保守性、一貫性を確保するために設計されています。すべての貢献者はこれらのガイドラインに従うことが求められます。ご質問や改善のためのご提案がございましたら、お気軽にチームまでお寄せください。

---

最終更新日: 2025年1月15日