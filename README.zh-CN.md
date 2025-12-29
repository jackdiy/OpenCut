# OpenCut - 开源视频编辑器

<table width="100%">
  <tr>
    <td align="left" width="120">
      <img src="apps/web/public/logo.png" alt="OpenCut Logo" width="100" />
    </td>
    <td align="right">
      <h1>OpenCut</h1>
      <h3 style="margin-top: -10px;">适用于Web、桌面和移动端的免费开源视频编辑器</h3>
    </td>
  </tr>
</table>

[English](README.md) | 简体中文

## 为什么选择OpenCut？

- **隐私保护**: 您的视频保留在您的设备上
- **免费功能**: CapCut的每个基本功能现在都需要付费
- **简单易用**: 人们想要易于使用的编辑器 - CapCut证明了这一点

## 功能特性

- 基于时间轴的编辑
- 多轨道支持
- 实时预览
- 无水印或订阅
- 由[Databuddy](https://www.databuddy.cc?utm_source=opencut)提供的分析服务，100%匿名且非侵入式
- 由[Marble](https://marblecms.com?utm_source=opencut)提供的博客功能，无头CMS

## 项目结构

- `apps/web/` – 主要的Next.js Web应用程序
- `src/components/` – UI和编辑器组件
- `src/hooks/` – 自定义React Hooks
- `src/lib/` – 工具函数和API逻辑
- `src/stores/` – 状态管理 (Zustand等)
- `src/types/` – TypeScript类型定义

## 国际化 (i18n)

OpenCut支持多语言界面，默认语言为简体中文。

### 语言切换

用户可以在应用程序的Header中找到语言切换按钮（地球图标🌐）。点击该按钮可以在简体中文和英语之间切换。

### 支持的语言

- 简体中文 (zh-CN) - 默认语言
- 英语 (en)

### 为开发者

i18n系统位于 `apps/web/src/lib/i18n/`，包含：

- `config.ts` - i18n配置
- `context.tsx` - React Context和Provider
- `translations/zh-CN.json` - 简体中文翻译
- `translations/en.json` - 英文翻译

在组件中使用翻译：

```tsx
import { useI18n } from '@/lib/i18n';

function MyComponent() {
  const { t } = useI18n();
  return <h1>{t('landing.hero.title')}</h1>;
}
```

## 开始使用

### 前置要求

在开始之前，请确保您的系统上安装了以下内容：

- [Node.js](https://nodejs.org/en/) (v18或更高版本)
- [Bun](https://bun.sh/docs/installation) (作为`npm`的替代方案)
- [Docker](https://docs.docker.com/get-docker/)和[Docker Compose](https://docs.docker.com/compose/install/)

> **注意:** Docker是可选的，但对于运行本地数据库和Redis服务至关重要。如果您只是想运行前端或为前端功能做贡献，可以跳过Docker设置。如果您已经按照下面[设置](#设置)中的步骤操作，那么您就可以开始了！

### 设置

1. Fork这个仓库
2. 克隆您的Fork到本地
3. 进入Web应用目录: `cd apps/web`
4. 复制`.env.example`到`.env.local`:

   ```bash
   # Unix/Linux/Mac
   cp .env.example .env.local

   # Windows Command Prompt
   copy .env.example .env.local

   # Windows PowerShell
   Copy-Item .env.example .env.local
   ```

5. 安装依赖: `bun install`
6. 启动开发服务器: `bun dev`

## 开发设置

### 本地开发

1. 启动数据库和Redis服务:

   ```bash
   # 从项目根目录
   docker-compose up -d
   ```

2. 进入Web应用目录:

   ```bash
   cd apps/web
   ```

3. 复制`.env.example`到`.env.local`:

   ```bash
   # Unix/Linux/Mac
   cp .env.example .env.local

   # Windows Command Prompt
   copy .env.example .env.local

   # Windows PowerShell
   Copy-Item .env.example .env.local
   ```

4. 在`.env.local`中配置必需的环境变量:

   **必需变量:**

   ```bash
   # 数据库 (与docker-compose.yaml匹配)
   DATABASE_URL="postgresql://opencut:opencutthegoat@localhost:5432/opencut"

   # 为Better Auth生成安全密钥
   BETTER_AUTH_SECRET="your-generated-secret-here"
   BETTER_AUTH_URL="http://localhost:3000"

   # Redis (与docker-compose.yaml匹配)
   UPSTASH_REDIS_REST_URL="http://localhost:8079"
   UPSTASH_REDIS_REST_TOKEN="example_token"

   # Marble 博客
   MARBLE_WORKSPACE_KEY=cm6ytuq9x0000i803v0isidst # 示例组织密钥
   NEXT_PUBLIC_MARBLE_API_URL=https://api.marblecms.com

   # 开发环境
   NODE_ENV="development"
   ```

   **生成BETTER_AUTH_SECRET:**

   ```bash
   # Unix/Linux/Mac
   openssl rand -base64 32

   # Windows PowerShell (简单方法)
   [System.Web.Security.Membership]::GeneratePassword(32, 0)

   # 跨平台 (使用Node.js)
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

   # 或使用在线生成器: https://generate-secret.vercel.app/32
   ```

5. 运行数据库迁移: `bun run db:migrate` (在apps/web目录内)
6. 启动开发服务器: `bun run dev` (在apps/web目录内)

应用程序将在[http://localhost:3000](http://localhost:3000)上可用。

## 贡献

我们欢迎贡献！虽然我们正在积极开发和重构某些领域，但有很多机会可以有效地做出贡献。

**🎯 重点领域:** 时间轴功能、项目管理、性能优化、错误修复以及预览面板之外的UI改进。

**⚠️ 暂时避免:** 预览面板增强（字体、贴纸、效果）和导出功能 - 我们正在使用新的二进制渲染方法重构这些功能。

查看我们的[贡献指南](.github/CONTRIBUTING.md)以获取详细的设置说明、开发指南和完整的重点领域指导。

**贡献者快速入门:**

- Fork仓库并在本地克隆
- 按照CONTRIBUTING.md中的设置说明操作
- 创建功能分支并提交PR

## 赞助商

<a href="https://fal.ai">
  <img alt="Powered by fal.ai" src="https://img.shields.io/badge/Powered%20by-fal.ai-000000?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCAxMEwxMy4wOSAxNS43NEwxMiAyMkwxMC45MSAxNS43NEw0IDEwTDEwLjkxIDguMjZMMTIgMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" />
</a>

---

[![使用Vercel部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FOpenCut-app%2FOpenCut&project-name=opencut&repository-name=opencut)

## 许可证

[MIT LICENSE](LICENSE)

---

![Star History Chart](https://api.star-history.com/svg?repos=opencut-app/opencut&type=Date)
