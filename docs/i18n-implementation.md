# OpenCut 国际化(i18n)实施文档

## 概述

本文档说明OpenCut项目的国际化实施方案。项目现已支持简体中文和英语两种语言，默认语言为简体中文。

## 实施内容

### 1. i18n系统架构

#### 核心文件
```
apps/web/src/lib/i18n/
├── config.ts           # i18n配置（语言列表、默认语言等）
├── context.tsx         # React Context和Provider
├── index.ts           # 统一导出
└── translations/
    ├── zh-CN.json     # 简体中文翻译
    └── en.json        # 英文翻译
```

#### 特点
- **零依赖**: 轻量级实现，无需安装额外的i18n包
- **类型安全**: 使用TypeScript确保翻译键的类型安全
- **本地存储**: 用户的语言选择会保存到localStorage
- **动态切换**: 切换语言后立即更新所有UI文本
- **服务端兼容**: 使用客户端组件，避免服务端渲染不匹配

### 2. 已翻译的组件

#### 核心页面组件
- ✅ **首页 (Home/Landing)**
  - Hero组件：主标题、副标题、描述和CTA按钮
  - Footer组件：品牌介绍、导航链接、版权信息
  - Header组件：导航菜单项

- ✅ **项目页面 (Projects)**
  - 页面标题和项目计数
  - 搜索框占位符
  - 排序选项（按日期、按名称）
  - 选择模式（全选/取消全选）
  - 删除确认对话框
  - 空状态提示（无项目、无搜索结果）
  - 所有按钮文本（新建、删除、取消等）

#### UI组件
- ✅ **LanguageSwitcher**: 语言切换下拉菜单
- ✅ **Header**: 带国际化支持的应用头部
- ✅ **Footer**: 带国际化支持的页脚

### 3. 翻译文件结构

翻译文件采用模块化结构组织：

```json
{
  "common": {        // 通用文本（按钮、标签等）
    "opencut": "OpenCut",
    "loading": "加载中...",
    "save": "保存",
    // ...
  },
  "landing": {       // 首页相关文本
    "hero": {
      "title": "开源的",
      "subtitle": "视频编辑器",
      // ...
    }
  },
  "projects": {      // 项目页面相关文本
    "title": "我的项目",
    "newProject": "新建项目",
    // ...
  },
  "editor": {        // 编辑器相关文本（预留）
    "timeline": "时间轴",
    // ...
  },
  "auth": {          // 认证相关文本（预留）
    "login": "登录",
    // ...
  },
  "errors": {        // 错误消息（预留）
    "general": "出错了",
    // ...
  }
}
```

### 4. 使用方法

#### 在组件中使用翻译

```tsx
import { useI18n } from '@/lib/i18n';

function MyComponent() {
  const { t, locale, setLocale } = useI18n();
  
  return (
    <div>
      <h1>{t('landing.hero.title')}</h1>
      <p>{t('landing.hero.description')}</p>
      
      {/* 带参数的翻译 */}
      <p>{t('projects.deleteSelected', { count: '5' })}</p>
      
      {/* 获取当前语言 */}
      <p>Current locale: {locale}</p>
      
      {/* 切换语言 */}
      <button onClick={() => setLocale('en')}>
        Switch to English
      </button>
    </div>
  );
}
```

#### 添加新的翻译

1. 在 `zh-CN.json` 中添加中文翻译
2. 在 `en.json` 中添加对应的英文翻译
3. 在组件中使用 `t('your.translation.key')`

### 5. 语言切换位置

用户可以在以下位置切换语言：

**主要位置：应用Header**
- 位置：页面顶部导航栏右侧
- 图标：地球/语言图标 (🌐)
- 功能：点击显示下拉菜单，选择简体中文或英语

### 6. 代码注释

所有核心组件都添加了详细的简体中文注释，包括：

- **组件功能说明**: 描述组件的用途和功能
- **参数说明**: 解释组件接收的props
- **实现细节**: 说明关键逻辑和设计决策
- **使用示例**: 在适当的地方提供使用示例

已添加注释的文件：
- `apps/web/src/lib/i18n/config.ts`
- `apps/web/src/lib/i18n/context.tsx`
- `apps/web/src/components/language-switcher.tsx`
- `apps/web/src/components/landing/hero.tsx`
- `apps/web/src/components/header.tsx`
- `apps/web/src/components/footer.tsx`

### 7. 文档

#### README文件
- ✅ **README.zh-CN.md**: 完整的中文版README
- ✅ **README.md**: 在英文README中添加了i18n说明和语言切换链接

#### 内容包括：
- i18n系统介绍
- 语言切换位置说明
- 开发者使用指南
- 翻译文件结构说明

## 未来工作

### 待翻译页面
- [ ] 编辑器页面 (Editor)
- [ ] 认证页面 (Login/Signup)
- [ ] 博客页面 (Blog)
- [ ] 贡献者页面 (Contributors)
- [ ] 路线图页面 (Roadmap)
- [ ] 隐私政策 (Privacy)
- [ ] 使用条款 (Terms)

### 待翻译UI组件
- [ ] 对话框 (Dialogs)
- [ ] 表单验证消息
- [ ] Toast通知
- [ ] 加载状态文本
- [ ] 错误提示

### 待完善的注释
- [ ] Store文件的中文注释
- [ ] 工具函数的中文注释
- [ ] 类型定义的中文注释
- [ ] API相关文件的中文注释

### 增强功能
- [ ] 添加更多语言支持（如繁体中文、日语等）
- [ ] 实现自动检测浏览器语言
- [ ] 添加语言切换动画效果
- [ ] 实现翻译键的类型检查
- [ ] 添加缺失翻译的警告

## 技术细节

### 翻译函数实现

翻译函数 `t()` 支持：
1. **嵌套键**: 使用点号分隔，如 `t('landing.hero.title')`
2. **参数替换**: 使用 `{paramName}` 格式，如 `t('key', { paramName: 'value' })`
3. **降级处理**: 如果找不到翻译，返回键名本身
4. **开发警告**: 在控制台输出缺失翻译的警告

### 性能优化

- 翻译文件在构建时静态导入
- 使用React Context避免prop drilling
- 语言切换只更新必要的组件
- localStorage缓存用户的语言选择

### 浏览器兼容性

- 支持所有现代浏览器
- 使用localStorage API（IE11+）
- 优雅降级：如果localStorage不可用，使用内存存储

## 测试建议

1. **功能测试**
   - 验证语言切换按钮是否正常显示
   - 测试在不同页面切换语言
   - 确认语言选择会被保存
   - 刷新页面后语言设置保持不变

2. **视觉测试**
   - 检查不同语言下的文本长度
   - 确保UI在不同语言下不会破坏布局
   - 验证响应式设计在两种语言下都正常

3. **边界情况**
   - 测试缺失翻译键的处理
   - 验证参数替换功能
   - 测试localStorage不可用的情况

## 维护指南

### 添加新翻译
1. 在两个翻译文件中同时添加新键
2. 保持翻译文件的结构一致
3. 使用有意义的键名
4. 为长文本添加注释说明用途

### 更新翻译
1. 同时更新zh-CN.json和en.json
2. 确保参数占位符格式一致
3. 测试更新后的文本在UI中的显示

### 代码审查
1. 检查是否有硬编码的文本
2. 确认新组件使用了翻译系统
3. 验证翻译键是否遵循命名约定
4. 检查是否添加了适当的中文注释

## 联系方式

如有问题或建议，请在GitHub上提交Issue或Pull Request。

---

**最后更新**: 2025年12月29日
**文档版本**: 1.0.0
