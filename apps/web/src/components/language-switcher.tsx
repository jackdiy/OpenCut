/**
 * 语言切换组件 - LanguageSwitcher
 * 
 * 功能说明：
 * - 显示当前选择的语言
 * - 提供下拉菜单供用户切换语言
 * - 使用Emoji国旗图标表示不同语言
 * - 当前选中的语言会显示勾选标记
 * - 语言选择会持久化到localStorage
 * - 切换语言后立即更新所有UI文本
 * 
 * 支持的语言：
 * - 简体中文 (zh-CN) 🇨🇳
 * - English (en) 🇺🇸
 */

"use client";

import { Globe, Languages } from 'lucide-react';
import { Button } from '../ui/button';
import { useI18n, localeNames, type Locale } from '@/lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * 语言Emoji映射
 * 将语言代码映射到对应的国旗Emoji
 */
const localeEmojis: Record<Locale, string> = {
  'zh-CN': '🇨🇳',
  'en': '🇺🇸',
};

/**
 * 语言切换按钮组件
 * 
 * 渲染一个图标按钮，点击后显示语言选择下拉菜单
 * 用户可以在支持的语言之间切换
 * 当前选中的语言会以高亮背景和勾选标记显示
 */
export function LanguageSwitcher() {
  // 从i18n上下文获取当前语言、设置语言函数和翻译函数
  const { locale, setLocale, t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('header.language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(localeNames).map(([key, name]) => {
          const localeKey = key as Locale;
          const isActive = locale === localeKey;
          return (
            <DropdownMenuItem
              key={key}
              onClick={() => setLocale(localeKey)}
              className={isActive ? 'bg-accent' : ''}
            >
              <span className="mr-2 text-lg">{localeEmojis[localeKey]}</span>
              {name}
              {isActive && (
                <span className="ml-auto text-xs text-muted-foreground">✓</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
