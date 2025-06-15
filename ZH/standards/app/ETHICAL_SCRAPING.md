# WhytCard 道德抓取指南

## 简介

网页抓取是 WhytCard 项目的核心，但必须以合乎道德、负责任且合法的方式进行。本指南定义了应遵循的原则和实践，以确保所有抓取活动均尊重网站所有者的权利、适用法律和道德标准。

## 目录

1. [基本原则](#fundamental-principles)
2. [法律方面](#legal-aspects)
3. [技术最佳实践](#technical-best-practices)
4. [资源尊重](#resource-respect)
5. [个人数据保护](#personal-data-protection)
6. [文档和透明度](#documentation-and-transparency)
7. [特殊情况](#special-cases)
8. [道德抓取清单](#ethical-scraping-checklist)

## 基本原则

### 道德抓取理念

道德抓取基于三个基本原则：

1. **尊重**：尊重网站所有者及其条款用途及其资源
2. **比例原则**：仅提取必要数据，并将影响降至最低
3. **透明度**：公开机器人的身份和抓取意图

### WhytCard 的抓取价值观

作为 WhytCard 项目，我们承诺：

- 绝不损害我们抓取的网站
- 严格遵守网站的明确和隐含规则
- 公开我们的身份和目标
- 负责任地使用数据，并遵循我们的使命
- 优先使用官方 API（如有）

## 法律方面

### 一般法律框架

网页抓取受多个国家/地区法律框架的约束：

- **版权**：网站内容通常受版权保护
- **使用条款**：网站服务条款可能明确禁止抓取
- **数据保护**：欧洲的 GDPR 等法律保护个人数据
- **未经授权的访问**：某些司法管辖区将未经授权访问计算机系统定为犯罪

### 著名案例

一些关于数据抓取的重要法院判决：

- **hiQ Labs 诉 LinkedIn**（美国）：确立抓取公共数据并不一定违法
- **Ryanair 诉 PR Aviation**（欧盟）：确认使用条款可以通过合同限制抓取
- **QVC 诉 Resultly**（美国）：强调避免服务器过载的重要性

### WhytCard 的法律合规性

为了保持合法性：

1. 抓取网站前务必查看服务条款
2. 尊重元标签中的“noindex”和“nofollow”标签
3. 切勿规避技术保护措施（例如验证码、访问限制）
4. 记录您的实践以表明诚意
5. 如果对抓取操作的合法性存有疑问，请咨询律师

## 技术最佳实践实践

### 遵守 robots.txt

robots.txt 文件定义了 robots 的访问规则：

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def is_allowed(url, user_agent="WhytCardBot/1.0"):
"""根据 robots.txt 检查 URL 是否可以被抓取。"""
rp = RobotFileParser()
rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt")
rp.read()
return rp.can_fetch(user_agent, url)
```

### 正确标识

始终使用能够清晰标识您的机器人的用户代理：

```python
headers = {
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)',
# 其他标头...
}
```

### 请求延迟

在请求之间实现合理的延迟：

```python
import time
import random

def polite_request(url, session, min_delay=1, max_delay=3):
"""在请求之间发出一个礼貌的延迟请求。"""
# 等待随机延迟
delay = random.uniform(min_delay, max_delay)
time.sleep(delay)

# 发出请求
response = session.get(url, headers=headers)
return respond
```

### 错误处理

遵循 HTTP 错误代码并相应地调整您的行为：

```python
async def respectful_fetch(url, session):
"""以尊重的方式获取 URL。"""
try:
async with session.get(url, headers=headers) as respond:
if request.status == 200:
return await request.text()
elif request.status == 429: # 请求过多
# 重试前等待更长时间
wait_time = int(response.headers.get('Retry-After', 60))
logger.info(f"速率受限，正在等待 {wait_time} 秒")
await asyncio.sleep(wait_time)
return await respectful_fetch(url, session)
elif request.status in (403, 404):
# 不重试 403/404 错误
logger.warning(f"访问被拒绝或未找到：{url}")
return None
else:
# 等待并重试其他错误
logger.warning(f"{url} 的错误 {response.status}，5 秒后重试")
await asyncio.sleep(5)
return await respectful_fetch(url, session)
except Exception as e:
logger.error(f"获取 {url} 时发生异常：{str(e)}")
return None
```

## 资源尊重

### 速率限制

根据目标站点的规模和资源调整请求速率：

- **大型商业站点**：每 1-3 秒 1 次请求
- **中型站点**：每 3-10 秒 1 次请求
- **小型站点**：每 10-60 秒或更长时间 1 次请求

### 数据抓取周期

优先选择低流量时段进行密集操作：

- **非高峰时段**：尽量选择晚上或周末
- **避开高峰**：不要在已知的高峰时段抓取数据
- **保持适应性**：如果发现速度变慢，请降低速率

### 最小化影响

减少对目标服务器影响的技术：

1. **智能缓存**：不要多次检索同一页面
2. **选择性**：只检索您真正需要的页面
3. **压缩**：请求压缩响应以减少带宽
4. **高效分页**：尊重网站的分页结构

## 个人数据保护

### 识别个人数据

对您收集的数据类型保持警惕：

- **直接识别数据**：姓名、电子邮件、电话、地址
- **间接识别数据**：用户 ID、假名
- **敏感数据**：政治观点、健康状况、性取向

### GDPR 原则尊重

如果您在欧洲运营或收集欧洲人的数据：

1. **最小化**：仅收集绝对必要的数据
2. **目的**：仅将数据用于预期目的
3. **有限保留**：不再需要时删除数据
4. **安全性**：保护收集的数据免遭未经授权的访问

### 数据匿名化

个人数据匿名化技术：

```python
import hashlib
import re

def anonymize_email(email):
"""匿名化电子邮件地址。"""
if not email:
return None


# 对电子邮件地址进行哈希处理
hashed = hashlib.sha256(email.encode()).hexdigest()[:10]
domain = email.split('@')[-1]

return f"anon_{hashed}@{domain}"

def anonymize_phone(phone):
"""匿名化电话号码。"""
if not phone:
return None


# 仅保留数字
digits = re.sub(r'\D', '', phone)

# 屏蔽除最后两位之外的所有数字
if len(digits) > 2:
return "X" * (len(digits) - 2) + digits[-2:]
return "X" * len(digits)
```

## 文档和透明度

### 记录抓取活动

始终记录您的抓取活动：

- **目的**：为什么收集这些数据？
- **方法**：如何收集？
- **存储**：数据存储在哪里以及如何存储？
- **使用**：它将如何使用？
- **删除**：它将何时被删除？

### 联系和退出

始终提供联系方式：

1. **信息页面**：创建一个专门的页面来解释您的机器人（例如，whytcard.com/bot）
2. **联系邮箱**：在您的 User-Agent 中提供邮箱地址
3. **退出机制**：允许网站请求排除

### 活动日志

维护您的抓取活动的详细日志：

```python
import logging
from datetime import datetime

# 日志记录器配置
logging.basicConfig( 
filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log", 
level=logging.INFO, 
format='%(asctime)s - %(levelname)s - %(message)s' 
)

def log_scraping_activity(url, success, data_points=0):
"""记录一次抓取活动。"""
logging.info(f"URL: {url}, 成功: {success}, 数据点: {data_points}")
```

## 特殊情况

### API 与抓取

数据收集的优先顺序：

1. **官方 API**：如果存在官方 API，请始终优先使用
2. **公共数据源**：如果可用，请使用 RSS、XML 或 JSON 数据源
3. **抓取**：仅在万不得已的情况下才使用抓取

### 需要身份验证的网站

对于需要身份验证的网站：

- **明确授权**：从网站获取书面授权
- **遵守服务条款**：确保服务条款允许自动使用
- **限制**：严格遵守使用限制

### 动态内容 (JavaScript)

对于使用大量JavaScript:

```python
from playwright.async_api import async_playwright

async def scrape_dynamic_content(url):
"""抓取 JavaScript 生成的内容。"""
async with async_playwright() as p:
browser = await p.chromium.launch(headless=True)
page = await browser.new_page()


# 配置 User-Agent
await page.set_extra_http_headers({
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot)'
})


# 加载页面并等待网络空闲
await page.goto(url)
await page.wait_for_load_state('networkidle')


# 提取内容
content = await page.content()

await browser.close()
return内容
```

## 道德抓取清单

每个抓取项目开始前，请检查以下几点：

### 准备工作
- [ ] 检查目标网站的服务条款 (ToS)
- [ ] 检查 robots.txt 文件
- [ ] 搜索 API 或抓取替代方案
- [ ] 明确定义必要数据
- [ ] 记录抓取目的

### 技术配置
- [ ] 可识别且透明的用户代理
- [ ] 速率限制机制
- [ ] 缓存系统，避免重复请求
- [ ] 适当处理错误和 HTTP 状态码
- [ ] 活动日志

### 执行
- [ ] 监控目标网站性能
- [ ] 如有需要，动态调整速率
- [ ] 遵守服务器指示（429、Retry-After）
- [ ] 检测到问题立即停止

###后期处理
- [ ] 个人数据匿名化
- [ ] 安全数据存储
- [ ] 限时保留
- [ ] 收集数据的记录

## 结论

合乎道德的数据抓取是在数据访问与尊重网站所有者的权利和资源之间取得平衡。通过遵循这些原则和实践，WhytCard 项目能够在收集必要数据的同时，保持负责任和尊重的态度。

请记住，数据抓取的道德规范不仅关乎法律合规，也关乎对整个网络生态系统的责任。尊重的抓取有助于为每个人创造一个更加开放和可持续的网络。

---

最后更新：2025-01-15