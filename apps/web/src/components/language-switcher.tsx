/**
 * 语言切换组件
 * 用于在页面上切换语言
 */

'use client';

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
 */
const localeEmojis: Record<Locale, string> = {
  'zh-CN': '🇨🇳',
  'en': '🇺🇸',
};

/**
 * 语言切换按钮组件
 * 显示当前语言并提供切换选项
 */
export function LanguageSwitcher() {
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
