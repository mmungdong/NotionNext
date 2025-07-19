import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'
import PaginationNumber from './PaginationNumber'

/**
 * 文章列表分页表格 - 适配主题色调
 */
const BlogPostListPage = ({ page = 1, posts = [], postCount, siteInfo }) => {
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const showPagination = postCount >= POSTS_PER_PAGE

  // 空状态处理（逻辑不变）
  if (!posts || posts.length === 0 || page > totalPage) {
    return <BlogPostListEmpty />
  }

  return (
    <div id='container' className='w-full'>
      {/* 文章列表 - 优化容器样式 */}
      <div className='space-y-6 px-2 md:px-4'>
        {posts?.map(post => (
          <BlogPostCard
            index={posts.indexOf(post)}
            key={post.id}
            post={post}
            siteInfo={siteInfo}
            // 传递主题色卡片样式
            cardClass="bg-white rounded-xl border border-[#B3E0E6]/20 shadow-sm hover:shadow-md hover:border-[#B3E0E6]/50 transition-all duration-300"
          />
        ))}
      </div>

      {/* 分页控件 - 适配主题色 */}
      {showPagination && (
        <div className="mt-10">
          <PaginationNumber 
            page={page} 
            totalPage={totalPage} 
            // 传递分页控件主题样式
            paginationClass="flex justify-center items-center gap-1.5"
            buttonClass="w-9 h-9 flex items-center justify-center rounded-md transition-colors duration-200"
            activeClass="bg-[#B3E0E6] text-white font-medium"
            inactiveClass="bg-white border border-[#B3E0E6]/30 text-[#2D4B53] hover:bg-[#B3E0E6]/10"
            disabledClass="bg-[#F2F8FB] text-gray-300 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  )
}

export default BlogPostListPage