import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'
import { BlogPostCardInfo } from './BlogPostCardInfo'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  // 基础配置获取
  const showPreview = siteConfig('HEXO_POST_LIST_PREVIEW', null, CONFIG) && post?.blockMap
  const enableImgCrossover = siteConfig('HEXO_POST_LIST_IMG_CROSSOVER', null, CONFIG)
  
  // 封面图处理
  if (post && !post.pageCoverThumbnail && siteConfig('HEXO_POST_LIST_COVER_DEFAULT', null, CONFIG)) {
    post.pageCoverThumbnail = siteInfo?.pageCover || '/images/default-cover.png'
  }
  const showPageCover = siteConfig('HEXO_POST_LIST_COVER', null, CONFIG) && post?.pageCoverThumbnail && !showPreview

  if (!post) return null

  return (
    <div className="mb-6">
      <Link href={post.href || '#'} passHref legacyBehavior>
        <div
          key={post.id || index}
          className={`group w-full flex flex-col-reverse md:flex-row 
                    ${enableImgCrossover && index % 2 === 1 ? 'md:flex-row-reverse' : ''}
                    overflow-hidden rounded-xl border border-[#B3E0E6]/20 
                    bg-white shadow-sm hover:shadow-md 
                    transition-all duration-300 hover:border-[#B3E0E6]/50`}
        >
          {/* 文字内容区域 - 传递主题样式参数 */}
          <BlogPostCardInfo
            post={post}
            showPageCover={showPageCover}
            showPreview={showPreview}
            showSummary={showSummary}
            theme={{
              textColor: '#2D4B53',
              accentColor: '#B3E0E6',
              bgColor: '#F2F8FB',
              hoverColor: '#B3E0E6'
            }}
          />

          {/* 图片封面区域 - 修复初始高度过高问题 */}
          {showPageCover && (
            <div className="md:w-5/12 overflow-hidden relative flex-shrink-0">
              {/* 使用padding-top固定比例，确保初始高度稳定 */}
              <div className="relative w-full" style={{ paddingTop: '66.67%' }}>
                <LazyImage
                  priority={index === 0}
                  alt={post.title || 'Article cover'}
                  src={post.pageCoverThumbnail}
                  className="absolute inset-0 h-full w-full object-cover object-center 
                            group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = '/images/default-cover.png'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default BlogPostCard
    