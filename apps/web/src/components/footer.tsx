"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { RiDiscordFill, RiTwitterXLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  
  return (
    <motion.footer
      className="bg-background border-t"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1 max-w-sm">
            <div className="flex justify-start items-center gap-2 mb-4">
              <Image 
                src="/logo.svg" 
                alt="OpenCut" 
                width={24} 
                height={24}
                className="invert dark:invert-0"
              />
              <span className="font-bold text-lg">{t('common.opencut')}</span>
            </div>
            <p className="text-sm md:text-left text-muted-foreground mb-5">
              {t('footer.description')}
            </p>
            <div className="flex justify-start gap-3">
              <Link
                href="https://github.com/OpenCut-app/OpenCut"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com/OpenCutApp"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiTwitterXLine className="h-5 w-5" />
              </Link>
              <Link
                href="https://discord.com/invite/Mu3acKZvCp"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiDiscordFill className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="flex gap-12 justify-start items-start py-2">
            <div>
              <h3 className="font-semibold text-foreground mb-4">{t('footer.resources')}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/roadmap"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('header.roadmap')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('footer.privacy')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('footer.terms')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">{t('footer.company')}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/contributors"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('header.contributors')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/OpenCut-app/OpenCut/blob/main/README.md"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('header.about')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-2 flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{t('footer.copyright')}</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
