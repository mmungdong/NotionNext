import Link from 'next/link';

// 标签颜色映射表，将标签颜色转换为对应的Tailwind类
const tagColorMap = {
  red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
};

/**
 * 博客归档列表 - 带标签和归档标识
 * @param posts 所有文章
 * @param archiveTitle 归档标题
 * @returns {JSX.Element}
 */
const BlogPostArchive = ({ posts = [], archiveTitle }) => {
  if (!posts || posts.length === 0) {
    return <></>;
  }

  return (
    <div className="archive-container">
      
      {/* 归档标题 */}
      <div
        className='pt-6 pb-4 text-3xl dark:text-gray-300 font-medium'
        id={archiveTitle}>
        {archiveTitle}
      </div>
      
      <ul className="space-y-4">
        {posts?.map(post => (
          <li
            key={post.id}
            className="border-l-2 pl-4 py-2 hover:border-[#B3E0E6] dark:hover:border-[#B3E0E6] 
                      transform transition-all duration-300 hover:translate-x-1"
          >
            <div id={post?.publishDay} className="flex flex-col sm:flex-row sm:items-center gap-2">
              {/* 日期显示 */}
              <span className="text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">
                {post.date?.start_date}
              </span>
              
              {/* 文章标题 */}
              <Link
                href={post?.href}
                passHref
                className="text-gray-800 dark:text-gray-200 hover:text-[#2D4B53] dark:hover:text-[#B3E0E6] 
                          hover:underline cursor-pointer flex-grow"
              >
                {post.title}
              </Link>
              
              {/* 标签列表 */}
              {post.tagItems && post.tagItems.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1 sm:mt-0">
                  {post.tagItems.map(tag => (
                    <Link
                      key={tag.name}
                      href={`/tag/${encodeURIComponent(tag.name)}`}
                      passHref
                      legacyBehavior
                    >
                      <span 
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          tagColorMap[tag.color] || tagColorMap.default
                        } hover:opacity-90 transition-opacity cursor-pointer`}
                      >
                        {tag.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPostArchive;
    