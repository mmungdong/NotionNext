import Link from 'next/link';
import CONFIG from '../config';
import { siteConfig } from '@/lib/config';
import { useGlobal } from '@/lib/global'; // 引入国际化

/**
 * 上一篇/下一篇文章组件 - 最终修复版
 */
export default function ArticleAdjacent({ prev, next }) {
  const { locale } = useGlobal();
  const enableAdjacent = siteConfig('HEXO_ARTICLE_ADJACENT', null, CONFIG);
  
  // 功能开关关闭时不显示
  if (!enableAdjacent) return null;

  // 确保链接安全处理
  const getSafeHref = (item) => {
    if (!item) return '#';
    if (item.href) return item.href;
    if (item.slug) return `/${item.slug}`;
    return '#';
  };

  // 检查是否有内容可显示
  const hasContent = !!prev || !!next;
  if (!hasContent) return null;

  return (
    <section className="pt-6 pb-2">
      <div className="flex flex-col md:flex-row gap-3">
        {/* 上一篇文章 */}
        {prev ? (
          <Link
            href={getSafeHref(prev)}
            passHref
            className="flex-1 min-w-0 p-3 rounded-lg border border-[#B3E0E6]/20 bg-white
                      hover:border-[#B3E0E6]/50 hover:shadow-sm transition-all duration-300"
          >
            <div className="text-[#2D4B53] text-sm font-medium mb-1 flex items-center">
              <i className="fas fa-angle-left mr-2 text-[#B3E0E6] transition-transform group-hover:-translate-x-0.5" />
              {locale.COMMON.PREVIOUS_ARTICLE || '上一篇'}
            </div>
            <div className="text-gray-600 text-sm line-clamp-2 transition-colors group-hover:text-[#B3E0E6]">
              {prev.title || ''}
            </div>
          </Link>
        ) : (
          // 空状态占位，保持布局一致
          <div className="flex-1 min-w-0 p-3 rounded-lg border border-gray-100 bg-gray-50">
            <div className="text-gray-400 text-sm font-medium mb-1 flex items-center">
              <i className="fas fa-angle-left mr-2" />
              {locale.COMMON.PREVIOUS_ARTICLE || '上一篇'}
            </div>
            <div className="text-gray-300 text-sm">{locale.COMMON.NO_PREVIOUS_ARTICLE || '没有上一篇文章'}</div>
          </div>
        )}

        {/* 下一篇文章 */}
        {next ? (
          <Link
            href={getSafeHref(next)}
            passHref
            className="flex-1 min-w-0 p-3 rounded-lg border border-[#B3E0E6]/20 bg-white
                      hover:border-[#B3E0E6]/50 hover:shadow-sm transition-all duration-300"
          >
            <div className="text-[#2D4B53] text-sm font-medium mb-1 flex items-center justify-end">
              {locale.COMMON.NEXT_ARTICLE || '下一篇'}
              <i className="fas fa-angle-right ml-2 text-[#B3E0E6] transition-transform group-hover:translate-x-0.5" />
            </div>
            <div className="text-gray-600 text-sm line-clamp-2 text-right transition-colors group-hover:text-[#B3E0E6]">
              {next.title || ''}
            </div>
          </Link>
        ) : (
          // 空状态占位，保持布局一致
          <div className="flex-1 min-w-0 p-3 rounded-lg border border-gray-100 bg-gray-50">
            <div className="text-gray-400 text-sm font-medium mb-1 flex items-center justify-end">
              {locale.COMMON.NEXT_ARTICLE || '下一篇'}
              <i className="fas fa-angle-right ml-2" />
            </div>
            <div className="text-gray-300 text-sm text-right">{locale.COMMON.NO_NEXT_ARTICLE || '没有下一篇文章'}</div>
          </div>
        )}
      </div>
    </section>
  );
}
    