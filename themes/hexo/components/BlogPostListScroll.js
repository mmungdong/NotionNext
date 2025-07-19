import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { getListByPage } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'

/**
 * 博客列表滚动分页 - 适配主题色调
 */
const BlogPostListScroll = ({
  posts = [],
  currentSearch,
  showSummary = siteConfig('HEXO_POST_LIST_SUMMARY', null, CONFIG),
  siteInfo
}) => {
  const { NOTION_CONFIG } = useGlobal()
  const [page, updatePage] = useState(1)
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const postsToShow = getListByPage(posts, page, POSTS_PER_PAGE)

  // 计算是否有更多文章（逻辑不变）
  let hasMore = false
  if (posts) {
    const totalCount = posts.length
    hasMore = page * POSTS_PER_PAGE < totalCount
  }

  // 加载更多文章（逻辑不变）
  const handleGetMore = () => {
    if (!hasMore) return
    updatePage(page + 1)
  }

  // 滚动监听自动加载（逻辑不变）
  const scrollTrigger = () => {
    requestAnimationFrame(() => {
      const scrollS = window.scrollY + window.outerHeight
      const clientHeight = targetRef
        ? targetRef.current
          ? targetRef.current.clientHeight
          : 0
        : 0
      if (scrollS > clientHeight + 100) {
        handleGetMore()
      }
    })
  }

  // 监听滚动事件（逻辑不变）
  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  })

  const targetRef = useRef(null)
  const { locale } = useGlobal()

  // 空状态处理（逻辑不变）
  if (!postsToShow || postsToShow.length === 0) {
    return <BlogPostListEmpty currentSearch={currentSearch} />
  } else {
    return (
      <div id='container' ref={targetRef} className='w-full'>
        {/* 文章列表 - 优化间距和容器样式 */}
        <div className='space-y-6 px-2 md:px-4'>
          {postsToShow.map(post => (
            <BlogPostCard
              key={post.id}
              post={post}
              showSummary={showSummary}
              siteInfo={siteInfo}
              // 传递主题色相关的卡片样式
              cardClass="bg-white rounded-xl border border-[#B3E0E6]/20 shadow-sm hover:shadow-md hover:border-[#B3E0E6]/50 transition-all duration-300"
            />
          ))}
        </div>

        {/* 加载更多按钮 - 主题色样式优化 */}
        <div className="mt-8">
          <button
            onClick={handleGetMore}
            disabled={!hasMore}
            className={`w-full py-3 px-4 rounded-xl transition-all duration-300
                      ${hasMore 
                        ? 'bg-white border border-[#B3E0E6]/30 text-[#2D4B53] hover:bg-[#B3E0E6]/10 cursor-pointer' 
                        : 'bg-[#F2F8FB] text-gray-400 cursor-default'}`}
          >
            {hasMore 
              ? <span className="flex items-center justify-center">
                  <i className="fas fa-angle-down mr-2 text-[#B3E0E6]"></i>
                  {locale.COMMON.MORE}
                </span>
              : <span className="flex items-center justify-center">
                  <i className="fas fa-check-circle mr-2 text-[#B3E0E6]/50"></i>
                  {locale.COMMON.NO_MORE}
                </span>
            }
          </button>
        </div>
      </div>
    )
  }
}

export default BlogPostListScroll
