/**
 * Header组件 - 应用程序头部导航栏
 * 
 * 功能说明：
 * - 显示应用Logo和名称
 * - 提供导航链接（博客、贡献者、项目）
 * - 包含语言切换器
 * - 包含主题切换器（明/暗模式）
 * - 响应式设计，适配不同屏幕尺寸
 * - 支持国际化
 */

"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { HeaderBase } from "./header-base";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { useI18n } from "@/lib/i18n";

/**
 * Header主组件
 * 渲染应用程序的顶部导航栏，包含Logo、导航链接和功能按钮
 */
export function Header() {
  // 获取国际化翻译函数
  const { t } = useI18n();
  
  // 左侧内容：Logo和应用名称
  const leftContent = (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo.svg"
        alt="OpenCut Logo"
        className="invert dark:invert-0"
        width={32}
        height={32}
      />
      <span className="text-xl font-medium hidden md:block">{t('common.opencut')}</span>
    </Link>
  );

  // 右侧内容：导航链接和功能按钮
  const rightContent = (
    <nav className="flex items-center gap-2">
      {/* 导航链接组 */}
      <div className="flex items-center gap-4">
        <Link href="/blog">
          <Button variant="text" className="text-sm p-0">
            {t('header.blog')}
          </Button>
        </Link>
        <Link href="/contributors">
          <Button variant="text" className="text-sm p-0">
            {t('header.contributors')}
          </Button>
        </Link>
      </div>
      {/* 项目按钮 */}
      <Link href="/projects">
        <Button size="sm" className="text-sm ml-2">
          {t('header.projects')}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
      {/* 语言切换器 */}
      <LanguageSwitcher />
      {/* 主题切换器 */}
      <ThemeToggle className="mr-2" />
    </nav>
  );

  return (
    <div className="sticky top-4 z-50 mx-4 md:mx-0">
      <HeaderBase
        className="bg-background border rounded-2xl max-w-3xl mx-auto mt-4 pl-4 pr-[11px]"
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </div>
  );
}
