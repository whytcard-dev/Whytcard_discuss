# 项目结构标准

## 目录组织

### 根目录结构

```
project-root/
⁻⁶ ...文档
```

### 源码目录结构

```
src/
── assets/ # 需要处理的静态资源
│ ── images/ # 图片
│ ── fonts/ # 字体文件
│ └── style/ # 全局样式
│ 
── components/ # 可复用的 UI 组件
│ ── common/ # 跨功能共享的组件
│ ── layout/ # 布局组件
│ └── ui/ # 基本 UI 组件
│ 
── hooks/ # 自定义 React hooks
│ 
── pages/ # 页面组件 / 路由组件
│ 
── features/ # 基于功能的模块
│ ── feature1/ # 特定功能
│ │ ── components/ # 特定功能组件
│ │ ── hooks/ # 特定功能 hooks
│ │ ── api/ # 特定功能 API 调用
│ │ ── utils/ # 功能专用实用程序
│ │ └── types/ # 功能专用类型
│ │ └── index.ts # 功能导出
│ └── feature2/ # 其他功能
│ 
│ └── services/ # 服务集成
│ └── api/ # API 客户端和端点
│ └── auth/ # 身份验证服务
│ └── analytics/ # 分析服务
│ 
└── store/ # 状态管理
│ └── slices/ # Redux 切片或上下文提供程序
│ └── actions/ # Action 创建器
│ └── selectors/ # 状态选择器
│ 
└── utils/ # 实用程序函数
│ └── formatting/ # 格式化实用程序
│ └── validation/ # 验证实用程序
│ └── helpers/ # 辅助函数
│ 
└── types/ # TypeScript 类型定义
│ └── api/ # API 响应类型
│ └── models/ # 数据模型类型
│ └── common/ # 通用类型定义
│ 
└── Constants/ # 应用常量
│ 
└── i18n/ # 国际化
│ └── locales/ # 翻译文件
│ └── config.ts # 国际化配置
│ 
└── config/ # 应用配置
│ └── routes.ts # 路由定义
│ └── settings.ts # 应用设置
│ 
└── App.tsx # 应用主组件
```

## 命名约定

### 文件和目录

- **React 组件**：PascalCase 命名，带扩展名
- `Button.tsx`, `UserProfile.tsx`
- **Hooks**：camelCase 命名，带 'use' 前缀
- `useAuth.ts`, `useFetch.ts`
- **实用程序**：驼峰命名法
- `formatDate.ts`、`validateEmail.ts`
- **常量**：大写蛇形命名法
- `API_ENDPOINTS.ts`、`ROUTE_PATHS.ts`
- **类型/接口**：使用描述性名称的帕斯卡命名法
- `UserData.ts`、`ApiResponse.ts`
- **测试文件**：与被测试文件同名，并使用 `.test` 或 `.spec` 后缀
- `Button.test.tsx`、`formatDate.spec.ts`

### 组件组织

- **组件文件**：每个文件一个组件
- **组件结构**：
```tsx
// 导入
import React from 'react';
导入 './styles.css';


// 类型
interface ButtonProps {
// ...
}


// 组件
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
// ...
return (
// JSX
);
};


// 此组件专用的辅助函数
const helperFunction = () => {
// ...
};
```

## 模块组织

### 导入顺序

1. 外部库
2. 内部模块
3. 组件
4. Hooks
5. 工具类
6. 类型
7. 资源/样式

示例：
```tsx
// 外部库
import React, { useState, useEffect } from 'react';
从 'react-router-dom' 导入 { useNavigate }；

// 内部模块
从 '@/constants/api' 导入 { API_ENDPOINTS }；

从 '@/services/api' 导入 { fetchData }；

// 组件
从 '@/components/ui' 导入 { Button }；

从 '@/components/common' 导入 { Modal }；

// Hooks
从 '@/hooks' 导入 { useAuth }；

// 工具类
从 '@/utils/formatting' 导入 { formatDate }；

// 类型
从 '@/types' 导入 type { UserData }；

// 资源/样式
导入 './styles.css'；
```

### 导出模式

- 对大多数组件和函数使用命名导出
- 使用 barrel 导出 (index.ts) 简化导入
- 避免使用默认导出，页面组件除外

barrel 导出示例：
```tsx
// components/ui/index.ts
export * from './Button';
export * from './Input';
export * from './Card';
```

## 配置文件

### 环境变量

- 使用 `.env` 文件进行环境特定配置
- 包含 `.env.example` 文档
- 使用环境特定文件（`.env.development`、`.env.production`）
- 切勿将敏感值提交到版本控制

### TypeScript 配置

- 使用严格模式
- 配置路径别名以实现更清晰的导入
- 如有需要，请为不同环境单独配置
- 记录不明显的配置选项

### 包管理

- 使用 lockfile（package-lock.json、yarn.lock、pnpm-lock.yaml）
- 记录所需的 Node.js 版本
- 在 package.json 中按逻辑对依赖项进行分组
- 将开发依赖项与生产依赖项分开

## 文档

### 代码文档

- 记录复杂的函数和组件
- 使用 JSDoc 进行函数文档
- 记录 React 组件的 props
- 包含可复用示例组件
- 文档状态管理模式

### 项目文档

- 包含完整的 README.md 文件
- 记录设置和安装流程
- 包含开发工作流程说明
- 记录构建和部署流程
- 维护 CHANGELOG.md 文件以记录版本历史记录
- 包含贡献指南

## 最佳实践

- 将相关文件分组
- 保持组件文件精简且目标明确
- 将业务逻辑与 UI 组件分离
- 使用路径别名避免导入路径过深
- 在整个项目中保持一致的文件组织
- 为新团队成员记录项目结构
- 在适用的情况下使用代码生成器保持一致性
- 定期审查和重构项目结构