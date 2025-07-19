import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import Link from 'next/link'
import TagItemMini from './TagItemMini'

export const BlogPostCardInfo = ({
  post,
  showPreview,
  showPageCover,
  showSummary
}) => {
  // 主题配色方案 - 优化对比度和视觉层次
  const theme = {
    primary: '#2D4B53',       // 主文字色（深青色）
    secondary: '#6A8C95',     // 次要文字色（中青色）
    accent: '#B3E0E6',        // 强调色（浅青色）
    accentDark: '#8EC1C8',    // 加深强调色（用于hover）
    background: '#F2F8FB',    // 背景色
    tagBg: '#E8F2F5',         // 标签背景色
  }

  return (
    <article
      className={`flex flex-col justify-between
                 p-5 md:p-6
                 ${showPageCover && !showPreview ? 'md:w-7/12 w-full' : 'w-full'}`}>
      <div>
        <header>
          <h2>
            {/* 标题 - 主色调应用 */}
            <Link
              href={post?.href}
              passHref
              className={`block line-clamp-2 cursor-pointer
                         text-xl md:text-2xl ${showPreview ? 'text-center' : ''}
                         leading-tight font-medium
                         text-[${theme.primary}]
                         hover:text-[${theme.accentDark}]
                         transition-colors duration-300`}>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon 
                  icon={post.pageIcon} 
                  className={`inline-block text-[${theme.accent}] mr-2`} 
                />
              )}
              <span className="menu-link">{post.title}</span>
            </Link>
          </h2>

          {/* 分类 - 次要色调应用 */}
          {post?.category && (
            <div
              className={`flex mt-2 items-center
                         ${showPreview ? 'justify-center' : 'justify-start'}
                         flex-wrap text-[${theme.secondary}]`}>
              <Link
                href={`/category/${post.category}`}
                passHref
                className={`cursor-pointer font-light text-sm
                           menu-link hover:text-[${theme.accentDark}]
                           transition-colors duration-300`}>
                <i className={`mr-1 far fa-folder text-[${theme.accent}]`} />
                {post.category}
              </Link>
            </div>
          )}
        </header>

        {/* 摘要 - 文字层次调整 */}
        {(!showPreview || showSummary) && !post.results && (
          <main className={`line-clamp-2 my-4
                         text-[${theme.secondary}]
                         leading-relaxed text-sm
                         ${showPreview ? 'text-center' : ''}`}>
            {post.summary}
          </main>
        )}

        {/* 搜索结果 */}
        {post.results && (
          <p className={`line-clamp-2 mt-4 text-[${theme.secondary}]
                       text-sm leading-relaxed`}>
            {post.results.map((r, index) => (
              <span key={index}>{r}</span>
            ))}
          </p>
        )}

        {/* 预览 */}
        {showPreview && (
          <div className="overflow-ellipsis truncate mt-3">
            <NotionPage post={post} />
          </div>
        )}
      </div>

      <div className="mt-4">
        {/* 日期标签 - 统一色调 */}
        <div className="text-[${theme.secondary}] justify-between flex flex-wrap gap-y-2">
          {/* 日期 */}
          <Link
            href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
            passHref
            className={`font-light menu-link cursor-pointer
                       text-sm leading-4
                       hover:text-[${theme.accentDark}]
                       transition-colors duration-300`}>
            <i className={`far fa-calendar-alt mr-1 text-[${theme.accent}]`} />
            {post?.publishDay || post.lastEditedDay}
          </Link>

          <div className="md:flex-nowrap flex-wrap md:justify-start inline-block">
            <div className="flex gap-1.5">
              {post.tagItems?.map(tag => (
                <TagItemMini 
                  key={tag.name} 
                  tag={tag} 
                  className={`bg-[${theme.tagBg}] text-[${theme.primary}]
                             px-2 py-0.5 rounded-full text-xs
                             hover:bg-[${theme.accent}] hover:text-white
                             transition-all duration-300`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
    