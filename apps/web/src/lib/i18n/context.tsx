/**
 * i18n上下文和Provider
 * 提供语言切换和翻译功能
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Locale } from './config';
import { defaultLocale } from './config';
import zhCN from './translations/zh-CN.json';
import en from './translations/en.json';

// 翻译类型定义
type Translations = typeof zhCN;

// 所有翻译
const translations: Record<Locale, Translations> = {
  'zh-CN': zhCN,
  'en': en,
};

// i18n上下文类型
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

// 创建上下文
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// 本地存储键名
const LOCALE_STORAGE_KEY = 'opencut-locale';

/**
 * i18n Provider组件
 * 包裹应用程序以提供国际化功能
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  // 在客户端挂载后加载保存的语言设置
  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
    if (savedLocale && (savedLocale === 'zh-CN' || savedLocale === 'en')) {
      setLocaleState(savedLocale);
    }
  }, []);

  // 设置语言并保存到本地存储
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    // 更新HTML lang属性
    document.documentElement.lang = newLocale;
  };

  // 翻译函数
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations[locale];

    // 遍历嵌套键
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // 如果找不到翻译，返回键名
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    // 如果不是字符串，返回键名
    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }

    // 替换参数
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return paramKey in params ? String(params[paramKey]) : match;
      });
    }

    return value;
  };

  // 在挂载前返回默认值，避免服务端渲染不匹配
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * 使用i18n的Hook
 * 在组件中调用以访问翻译功能
 */
export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
