# WhytCard 倫理的スクレイピングガイド

## はじめに

WebスクレイピングはWhytCardプロジェクトの中核を成しますが、倫理的、責任ある、そして合法的な方法で実施する必要があります。このガイドでは、すべてのスクレイピング活動がウェブサイト所有者の権利、適用法、そして倫理基準を尊重することを確実にするために従うべき原則と実践を定義します。

## 目次

1. [基本原則](#fundamental-principles)
2. [法的側面](#legal-aspects)
3. [技術的なベストプラクティス](#technical-best-practices)
4. [リソースの尊重](#resource-respect)
5. [個人データの保護](#personal-data-protection)
6. [文書化と透明性](#documentation-and-transparency)
7. [特殊なケース](#special-cases)
8. [倫理的スクレイピングチェックリスト](#ethical-scraping-checklist)

## 基本原則

### 倫理的スクレイピングの理念

倫理的スクレイピングは、以下の3つの基本原則に基づいています。

1. **尊重**：ウェブサイト所有者とその利用規約を尊重する使用方法とそのリソース
2. **比例性**: 最小限の影響で必要なデータのみを抽出する
3. **透明性**: ボットのアイデンティティとスクレイピングの目的について透明性を確保する

### スクレイピングに関する WhytCard の価値観

WhytCard プロジェクトとして、私たちは以下のことを約束します。

- スクレイピングするウェブサイトに損害を与えない
- ウェブサイトの明示的および暗黙的なルールを厳守する
- 私たちのアイデンティティと目的について透明性を確保する
- 責任を持って、私たちの使命に従ってデータを使用する
- 利用可能な場合は公式 API を優先する

## 法的側面

### 一般的な法的枠組み

ウェブスクレイピングは、国によって異なる複数の法的枠組みの対象となります。

- **著作権**: ウェブサイトのコンテンツは一般的に著作権で保護されています。
- **利用規約**: ウェブサイトの利用規約でスクレイピングが明示的に禁止されている場合があります。
- **データ保護**: 欧州の GDPR などの法律は個人データを保護しています。
- **不正なアクセス**：一部の法域では、コンピュータシステムへの不正アクセスを犯罪としています。

### 注目すべき判例

スクレイピングに関する重要な判例：

- **hiQ Labs v. LinkedIn** (米国)：公開データのスクレイピングは必ずしも違法ではないことが立証されました。
- **Ryanair v. PR Aviation** (EU)：利用規約によって契約上スクレイピングを制限できることが確認されました。
- **QVC v. Resultly** (米国)：サーバーに過負荷をかけないことの重要性が強調されました。

### WhytCardの法令遵守

法令遵守のために：

1. **サイトをスクレイピングする前に必ず利用規約を確認してください**
2. **メタタグの「noindex」および「nofollow」タグを遵守してください**
3. **技術的な保護手段を回避しないでください** (CAPTCHA、アクセス制限など)
4. **誠意を示すために、**行為内容を文書化してください**
5. スクレイピングの合法性に疑問がある場合は、**弁護士に相談してください**操作

## 技術的なベストプラクティス

### robots.txt の尊重

robots.txt ファイルは、ロボットのアクセスルールを定義します。

```python 
from urllib.robotparser import RobotFileParser 
from urllib.parse import urlparse 

def is_allowed(url, user_agent="WhytCardBot/1.0"):
"""robots.txt に従って URL がスクレイピング可能かどうかを確認します。"""
rp = RobotFileParser() 
rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt") 
rp.read() 
return rp.can_fetch(user_agent, url)
```

### 適切な識別

ユーザーエージェントは必ず使用し、ユーザーを明確に識別してください。 bot:

```python 
headers = {
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)',
# その他のヘッダー...
}
```

### リクエストの遅延

リクエスト間に適切な遅延を実装します。

```python 
import time 
import random

def polite_request(url, session, min_delay=1, max_delay=3):
"""リクエスト間にpolite delayを設定してリクエストを送信します。"""
# ランダムな遅延を待機します。
delay = random.uniform(min_delay, max_delay)
time.sleep(delay)

# リクエストを送信します。
response = session.get(url, headers=headers)
return response
```

### エラー処理

HTTP エラーコードを尊重し、それに応じて動作を調整してください。

```python 
async def respectful_fetch(url, session):
"""URL を適切な方法で取得します。"""
try:
async with session.get(url, headers=headers) as response:
if response.status == 200:
return await response.text()
elif response.status == 429: # リクエストが多すぎます
# 再試行する前にさらに長く待機します
wait_time = int(response.headers.get('Retry-After', 60))
logger.info(f"レート制限、{wait_time} 秒待機中")
await asyncio.sleep(wait_time)
return await respectful_fetch(url, session)
elif response.status in (403, 404):
# 再試行しません403/404 エラー
logger.warning(f"アクセスが拒否されたか、見つかりません: {url}")
return None
else:
# その他のエラーを待機して再試行
logger.warning(f"{url} で {response.status} エラーが発生し、5 秒後に再試行します")
await asyncio.sleep(5)
return await respectful_fetch(url, session)
except Exception as e:
logger.error(f"{url} の取得中に例外が発生しました: {str(e)}")
return None
```

## リソースの尊重

### レート制限

対象サイトの規模とリソースに合わせてリクエストレートを調整します。

- **大規模商用サイト**: 1～3 秒ごとに 1 リクエスト
- **中規模サイト**: 3～10 秒ごとに 1 リクエスト
- **小規模サイト**: 1 リクエストごとに10～60秒以上

### スクレイピング期間

集中的な操作を行う際は、トラフィックの少ない時間帯を優先します。

- **オフピーク時**: 夜間または週末を優先します。
- **ピークを避ける**: ピーク時にスクレイピングを行わない
- **適応的に対応する**: 速度低下を検知した場合はレートを下げる

### 影響の最小化

対象サーバーへの影響を軽減するための手法:

1. **スマートキャッシュ**: 同じページを複数回取得しない
2. **選択性**: 必要なページのみを取得する
3. **圧縮**: 帯域幅を削減するために圧縮されたレスポンスを要求する
4. **効率的なページネーション**: サイトのページネーション構造を尊重する

## 個人データの保護

### 個人データの識別

収集するデータの種類には注意してください。

- **直接識別データ**: 氏名、メールアドレス、電話番号、住所
- **間接的な識別データ**：ユーザーID、仮名
- **機密データ**：政治的意見、健康状態、性的指向

### GDPRの遵守すべき原則

ヨーロッパで事業を展開している場合、またはヨーロッパの住民からデータを収集している場合：

1. **最小化**：厳密に必要なデータのみを収集する
2. **目的**：意図された目的にのみデータを使用する
3. **限定的な保持**：不要になったデータを削除する
4. **セキュリティ**：収集したデータを不正アクセスから保護する

### データの匿名化

個人データを匿名化する手法：

```python 
import hashlib 
import re 

def anonymize_email(email): 
"""メールアドレスを匿名化します。""" 
if not email: 
return None 

# メールアドレスをハッシュ化する 
hashed = hashlib.sha256(email.encode()).hexdigest()[:10]
domain = email.split('@')[-1]

return f"anon_{hashed}@{domain}"

def anonymize_phone(phone):
"""電話番号を匿名化します。"""
if not phone:
return None

# 数字のみを保持
digits = re.sub(r'\D', '', phone)

# 最後の2桁を除くすべての数字をマスク
if len(digits) > 2:
return "X" * (len(digits) - 2) + digits[-2:]
return "X" * len(digits)
```

## ドキュメントと透明性

### スクレイピング活動のドキュメント化

スクレイピング活動は必ずドキュメント化してください。

- **目的**:このデータはなぜ収集されるのですか？
- **方法**: どのように収集されるのですか？
- **保存**: どこにどのように保存されるのですか？
- **使用**: どのように使用されるのですか？
- **削除**: いつ削除されるのですか？

### 連絡とオプトアウト

必ず連絡手段を用意してください。

1. **情報ページ**：ボットについて説明する専用ページを作成します（例：whytcard.com/bot）。
2. **連絡先メールアドレス**：User-Agent にメールアドレスを入力します。
3. **オプトアウトメカニズム**：サイトが除外をリクエストできるようにします。

### アクティビティのログ記録

スクレイピングアクティビティの詳細なログを保持します。

```python 
import logging 
from datetime import datetime

# ロガー設定
logging.basicConfig( 
filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log", 
level=logging.INFO, 
format='%(asctime)s - %(levelname)s - %(message)s'
)

def log_scraping_activity(url, success, data_points=0):
"""スクレイピングアクティビティをログに記録します。"""
logging.info(f"URL: {url}, Success: {success}, Data points: {data_points}")
```

## 特殊なケース

### API vs スクレイピング

データ収集の優先順位:

1. **公式API**: 公式APIが存在する場合は常に優先します。
2. **公開データフィード**: RSS、XML、またはJSONフィードが利用可能な場合は使用します。
3. **スクレイピング**: スクレイピングは最後の手段としてのみ使用します。

### 認証が必要なサイト

認証が必要なサイトの場合:

- **明示的な承認**: サイトから書面による承認を取得します。
- **利用規約の遵守**: 利用規約で自動使用が許可されていることを確認します。
- **制限事項**: 使用制限を厳守します。

###動的コンテンツ (JavaScript)

JavaScript を多用するサイトの場合:

```python 
from playwright.async_api import async_playwright

async def scrape_dynamic_content(url):
"""JavaScript によって生成されたコンテンツをスクレイピングします。"""
async with async_playwright() as p:
browser = await p.chromium.launch(headless=True)
page = await browser.new_page()

# User-Agent を設定
await page.set_extra_http_headers({
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot)'
})

# ページを読み込み、ネットワークがアイドル状態になるまで待機
await page.goto(url)
await page.wait_for_load_state('networkidle')

# 抽出content 
content = await page.content()

await browser.close()
return content
```

## 倫理的スクレイピングチェックリスト

各スクレイピングプロジェクトを開始する前に、以下の点を確認してください。

### 準備
- [ ] 対象サイトの利用規約を確認する
- [ ] robots.txt ファイルを確認する
- [ ] スクレイピングの代替手段またはAPIを検索する
- [ ] 必要なデータを明確に定義する
- [ ] スクレイピングの目的を文書化する

### 技術設定
- [ ] 識別可能で透明性のあるユーザーエージェント
- [ ] レート制限メカニズム
- [ ] 冗長なリクエストを回避するためのキャッシュシステム
- [ ] エラーとHTTPコードの適切な処理
- [ ] アクティビティのログ記録

### 実行
- [ ] 対象サイトのパフォーマンスを監視する
- [ ] 必要に応じて動的なレート調整を行う
- [ ] サーバーの指示を尊重する(429, Retry-After)
- [ ] 問題が検出された場合は直ちに停止する

### 後処理
- [ ] 個人データの匿名化
- [ ] 安全なデータ保存
- [ ] 期限付き保存
- [ ] 収集データの文書化

## 結論

倫理的なスクレイピングとは、データへのアクセスとウェブサイト所有者の権利およびリソースの尊重とのバランスを取ることです。これらの原則と実践に従うことで、WhytCardプロジェクトは責任ある敬意あるアプローチを維持しながら、必要なデータを収集することができます。

スクレイピングの倫理は、法令遵守の問題であるだけでなく、ウェブエコシステム全体に対する責任でもあることを忘れないでください。敬意あるスクレイピングは、すべての人にとってよりオープンで持続可能なウェブの実現に貢献します。

---

最終更新日: 2025年1月15日