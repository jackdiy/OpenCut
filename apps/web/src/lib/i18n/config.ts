/**
 * i18n配置文件
 * 定义支持的语言和默认语言
 */

export type Locale = 'zh-CN' | 'en';

export const locales: Locale[] = ['zh-CN', 'en'];

export const defaultLocale: Locale = 'zh-CN';

export const localeNames: Record<Locale, string> = {
  'zh-CN': '简体中文',
  'en': 'English',
};

export const localeFlags: Record<Locale, string> = {
  'zh-CN': 'CN',
  'en': 'US',
};
