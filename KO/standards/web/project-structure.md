# 프로젝트 구조 표준

## 디렉터리 구성

### 루트 구조

``` 
project-root/ 
├── src/ # 소스 코드
├── public/ # 정적 에셋
├── dist/ # 빌드 출력(생성됨)
├── node_modules/ # 종속성(생성됨)
├── tests/ # 테스트 파일
├── docs/ # 문서
├── .github/ # GitHub 워크플로 및 템플릿
├── .vscode/ # VS Code 구성
├── scripts/ # 빌드 및 유틸리티 스크립트
├── package.json # 프로젝트 메타데이터 및 종속성
├── tsconfig.json # TypeScript 구성
├── .eslintrc.js # ESLint 구성
├── .prettierrc # Prettier 구성
├── .gitignore # Git 무시 패턴
├── .env.example # 환경 변수 예시
└── README.md # 프로젝트 문서
``` 

### 소스 디렉터리 구조

``` 
src/ 
├── assets/ # 처리가 필요한 정적 에셋
│ ├── images/ # 이미지
│ ├── fonts/ # 글꼴 파일
│ └── styles/ # 전역 스타일
│ 
├── components/ # 재사용 가능한 UI 구성 요소
│ ├── common/ # 여러 기능에서 공유되는 구성 요소
│ ├── layout/ # 레이아웃 구성 요소
│ └── ui/ # 기본 UI 구성 요소
│ 
├── hooks/ # 사용자 지정 React hooks
│ 
├── pages/ # 페이지 구성 요소 / 경로 components 
│ 
├── features/ # 기능 기반 모듈 
│ ├── feature1/ # 특정 기능 
│ │ ├── components/ # 기능별 컴포넌트 
│ │ ├── hooks/ # 기능별 후크 
│ │ ├── api/ # 기능별 API 호출 
│ │ ├── utils/ # 기능별 유틸리티 
│ │ ├── types/ # 기능별 유형 
│ │ └── index.ts # 기능 내보내기 
│ └── feature2/ # 다른 기능 
│ 
├── services/ # 서비스 통합 
│ ├── api/ # API 클라이언트 및 엔드포인트 
│ ├── auth/ # 인증 서비스 
│ └── analytics/ # 분석 서비스 
│ 
├── store/ # 상태 관리
│ ├── slices/ # Redux 슬라이스 또는 컨텍스트 제공자
│ ├── actions/ # 액션 생성자
│ └── selectors/ # 상태 선택자
│ 
├── utils/ # 유틸리티 함수
│ ├── formatting/ # 서식 유틸리티
│ ├── validation/ # 유효성 검사 유틸리티
│ └── helpers/ # 도우미 함수
│ 
├── types/ # TypeScript 타입 정의
│ ├── api/ # API 응답 타입
│ ├── models/ # 데이터 모델 타입
│ └── common/ # 공통 타입 정의
│ 
├── constants/ # 애플리케이션 상수
│ 
├── i18n/ # 국제화
│ ├── locales/ # 번역 파일
│ └── config.ts # i18n 구성
│ 
├── config/ # 앱 구성
│ ├── routes.ts # 경로 정의
│ └── settings.ts # 앱 설정
│ 
└── App.tsx # 주요 애플리케이션 구성 요소
``` 

## 명명 규칙

### 파일 및 디렉터리

- **React 구성 요소**: 확장자를 포함한 PascalCase
- `Button.tsx`, `UserProfile.tsx` 
- **후크**: 'use' 접두사를 포함한 camelCase
- `useAuth.ts`, `useFetch.ts` 
- **유틸리티**: camelCase
- `formatDate.ts`, `validateEmail.ts` 
- **상수**: 대문자 대문자 대문자
- `API_ENDPOINTS.ts`, `ROUTE_PATHS.ts`
- **유형/인터페이스**: 설명적인 이름을 사용하는 PascalCase 방식
- `UserData.ts`, `ApiResponse.ts`
- **테스트 파일**: 테스트할 파일과 동일한 이름에 `.test` 또는 `.spec` 접미사 추가
- `Button.test.tsx`, `formatDate.spec.ts`

### 컴포넌트 구성

- **컴포넌트 파일**: 파일당 하나의 컴포넌트
- **컴포넌트 구조**: 
```tsx 
// 가져오기
import React from 'react'; 
import './styles.css';

// 유형
interface ButtonProps { 
// ... 
} 

// 컴포넌트
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => { 
// ... 
return ( 
// JSX 
); 
}; 

// 이 컴포넌트에 특화된 도우미 함수
const helperFunction = () => { 
// ... 
}; 
``` 

## 모듈 구성

### 가져오기 순서

1. 외부 라이브러리
2. 내부 모듈
3. 컴포넌트
4. 후크
5. 유틸리티
6. 유형
7. 에셋/스타일

예: 
```tsx 
// 외부 라이브러리
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 내부 모듈
import { API_ENDPOINTS } from '@/constants/api';
import { fetchData } from '@/services/api';

// 컴포넌트
import { Button } from '@/components/ui';
import { Modal } from '@/components/common';

// 후크
import { useAuth } from '@/hooks';

// 유틸리티
import { formatDate } from '@/utils/formatting';

// 유형
import type { UserData } from '@/types';

// 에셋/스타일
import './styles.css';
``` 

### 내보내기 패턴

- 대부분의 컴포넌트와 함수에 명명된 내보내기를 사용하세요.
- 가져오기를 간소화하기 위해 배럴 내보내기(index.ts)를 사용하세요.
- 페이지 컴포넌트를 제외하고는 기본 내보내기를 사용하지 마세요.

배럴 내보내기 예시: 
```tsx 
// components/ui/index.ts
export * from './Button'; 
export * from './Input'; 
export * from './Card';
``` 

## 구성 파일

### 환경 변수

- 환경별 구성에는 `.env` 파일을 사용하세요.
- 문서에 `.env.example`을 포함하세요.
- 환경별 파일(`.env.development`, `.env.production`)을 사용하세요.
- 민감한 값은 버전 관리에 커밋하지 마세요.

### TypeScript 구성

- 엄격 모드 사용
- 더 깔끔한 가져오기를 위해 경로 별칭 구성
- 필요한 경우 환경별로 구성 분리
- 명확하지 않은 구성 선택 사항 문서화

### 패키지 관리

- 잠금 파일(package-lock.json, yarn.lock, pnpm-lock.yaml) 사용
- 필요한 Node.js 버전 문서화
- package.json 파일에 종속성을 논리적으로 그룹화
- 개발 종속성과 프로덕션 종속성 분리

## 문서

### 코드 문서화

- 복잡한 함수 및 컴포넌트 문서화
- 함수에는 JSDoc 사용 문서화
- React 컴포넌트의 props를 문서화하세요.
- 재사용 가능한 컴포넌트의 예시를 포함하세요.
- 상태 관리 패턴을 문서화하세요.

### 프로젝트 문서

- 포괄적인 README.md를 포함하세요.
- 설정 및 설치 프로세스를 문서화하세요.
- 개발 워크플로 지침을 포함하세요.
- 빌드 및 배포 프로세스를 문서화하세요.
- 버전 기록을 위해 CHANGELOG.md를 유지하세요.
- 기여 가이드라인을 포함하세요.

## 모범 사례

- 관련 파일을 함께 그룹화하세요.
- 컴포넌트 파일을 작고 집중적으로 유지하세요.
- 비즈니스 로직과 UI 컴포넌트를 분리하세요.
- 경로 별칭을 사용하여 복잡한 가져오기 경로를 피하세요.
- 프로젝트 전체에서 일관된 파일 구성을 유지하세요.
- 신규 팀원을 위해 프로젝트 구조를 문서화하세요.
- 가능한 경우 일관성을 위해 코드 생성기를 사용하세요.
- 프로젝트 구조를 주기적으로 검토하고 리팩토링하세요.