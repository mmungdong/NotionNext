import LazyImage from '@/components/LazyImage'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * 最新文章列表 - 适配主题色调
 */
const LatestPostsGroup = ({ latestPosts, siteInfo }) => {
  const currentPath = useRouter().asPath
  const { locale } = useGlobal()

  if (!latestPosts) return null

  return (
    // 卡片容器：主题色边框+白色背景
    <div className="bg-white rounded-xl border border-[#B3E0E6]/20 shadow-sm overflow-hidden">
      {/* 标题栏 */}
      <div className="px-4 py-3 border-b border-[#B3E0E6]/20">
        <div className="flex items-center">
          <i className="mr-2 fas fa-history text-[#B3E0E6]" />
          <span className="text-[#2D4B53] font-medium">
            {locale.COMMON.LATEST_POSTS}
          </span>
        </div>
      </div>

      {/* 文章列表 */}
      <div className="divide-y divide-[#B3E0E6]/10">
        {latestPosts.map(post => {
          const headerImage = post?.pageCoverThumbnail || siteInfo?.pageCover
          const isActive = currentPath === post?.href

          return (
            <Link
              key={post.id}
              href={post.href}
              passHref
              className="block"
            >
              <div 
                className={`flex p-3 transition-colors duration-300
                          ${isActive ? 'bg-[#B3E0E6]/10' : 'hover:bg-[#F2F8FB]'}`}
              >
                {/* 文章缩略图 */}
                <div className="w-20 h-14 rounded-md overflow-hidden shadow-sm flex-shrink-0">
                  <LazyImage
                    alt={post.title}
                    src={headerImage}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* 文章信息 */}
                <div className="ml-3 flex-1 min-w-0">
                  <div className={`line-clamp-2 text-sm transition-colors
                                ${isActive 
                                  ? 'text-[#B3E0E6] font-medium' 
                                  : 'text-gray-700 dark:text-gray-300 hover:text-[#B3E0E6]'}`}>
                    {post.title}
                  </div>
                  
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <i className="fas fa-calendar-alt mr-1 text-[#B3E0E6]/60" />
                    <span>{post.lastEditedDay}</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default LatestPostsGroup