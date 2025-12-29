/**
 * Hero组件 - 首页主视觉区域
 * 
 * 功能说明：
 * - 显示应用的主标题和描述
 * - 包含赞助商徽章
 * - 提供CTA按钮引导用户进入项目页面
 * - 使用Framer Motion实现动画效果
 * - 支持国际化，文本根据用户选择的语言动态显示
 */

"use client";

import { motion } from "motion/react";
import { Button } from "../ui/button";
import { SponsorButton } from "../ui/sponsor-button";
import { VercelIcon } from "../icons";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

import Image from "next/image";
import { Handlebars } from "./handlebars";
import Link from "next/link";

/**
 * Hero主组件
 * 渲染登陆页面的英雄区域，包含标题、描述和行动号召按钮
 */
export function Hero() {
  // 获取国际化翻译函数
  const { t } = useI18n();
  
  return (
    <div className="min-h-[calc(100svh-4.5rem)] flex flex-col justify-between items-center text-center px-4">
      {/* 背景图片 */}
      <Image
        className="absolute top-0 left-0 -z-50 size-full object-cover invert dark:invert-0 opacity-85"
        src="/landing-page-dark.png"
        height={1903.5}
        width={1269}
        alt="landing-page.bg"
      />
      
      {/* 主内容区域 - 带淡入动画 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center"
      >
        {/* 赞助商按钮 - 延迟0.6秒淡入 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-4 flex justify-center"
        >
          <SponsorButton
            href="https://vercel.com/home?utm_source=opencut"
            logo={VercelIcon}
            companyName="Vercel"
          />
        </motion.div>
        
        {/* 主标题 - 延迟0.2秒从下方滑入 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-block font-bold tracking-tighter text-4xl md:text-[4rem]"
        >
          <h1>{t('landing.hero.title')}</h1>
          {/* 特殊动画文本组件 */}
          <Handlebars>{t('landing.hero.subtitle')}</Handlebars>
        </motion.div>

        {/* 描述文本 - 延迟0.4秒淡入 */}
        <motion.p
          className="mt-10 text-base sm:text-xl text-muted-foreground font-light tracking-wide max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {t('landing.hero.description')}
        </motion.p>

        {/* CTA按钮 - 延迟0.6秒淡入 */}
        <motion.div
          className="mt-8 flex gap-8 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link href="/projects">
            <Button
              type="submit"
              size="lg"
              className="px-6 h-11 text-base bg-foreground"
            >
              {t('landing.hero.cta')}
              <ArrowRight className="relative z-10 ml-0.5 h-4 w-4 inline-block" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
