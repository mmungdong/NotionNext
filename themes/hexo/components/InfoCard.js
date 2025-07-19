import { useRouter } from 'next/router'
import Card from './Card'
import SocialButton from './SocialButton'
import MenuGroupCard from './MenuGroupCard'
import { siteConfig } from '@/lib/config'
import { useState } from 'react'

export function InfoCard(props) {
  const router = useRouter()
  const { className, siteInfo } = props
  // 存储你的邮箱地址
  const email = "510195171@qq.com"
  // GitHub地址
  const githubUrl = "https://github.com/mmungdong"
  // 状态管理邮件显示
  const [showEmail, setShowEmail] = useState(false)
  
  // 直接指定头像图片路径（替换为你的实际头像路径）
  const avatarSrc = "/images/avatar.png" // 例如：public目录下的images文件夹
  
  return (
    <Card
      className={`relative overflow-hidden rounded-lg
                  bg-white shadow-md hover:shadow-lg transition-shadow
                  ${className || ''}`}
    >
      {/* 头像 - 改为直接加载 */}
      <div
        className="flex justify-center items-center pt-10 pb-6 cursor-pointer"
        onClick={() => router.push('/')}
      >
        <div className="relative">
          {/* 使用普通img标签替代LazyImage */}
          <img
            src={avatarSrc}
            alt={siteConfig('AUTHOR') || 'Author Avatar'}
            width={100}
            height={100}
            className="rounded-full object-cover shadow-inner
                      transition-transform group-hover:scale-110 duration-300"
            // 可选：添加加载完成和错误处理
            onLoad={() => console.log('Avatar loaded')}
            onError={(e) => {
              // 加载失败时使用默认图片
              e.target.src = "/images/default-avatar.png"
            }}
          />
        </div>
      </div>

      {/* 名称 */}
      <h2 className='font-medium text-center text-xl pb-4'>
        {siteConfig('AUTHOR')}
      </h2>

      {/* 简介 */}
      <p className='text-sm text-center'>
        {siteConfig('BIO')}
      </p>

      {/* 分割线 */}
      <hr className="border-gray-200 mx-8 mb-4" />

      {/* 菜单 / 社交 */}
      <div className="px-6 py-4 space-y-2">
        <MenuGroupCard {...props} />
        <SocialButton />
      </div>

      
      {/* 联系方式区域 */}
      <div className="px-3 mb-2">
        <div className="flex justify-center space-x-6">
          {/* 邮件图标 */}
          <a 
            href={`mailto:${email}`} 
            className="flex flex-col items-center group relative"
            onMouseEnter={() => setShowEmail(true)}
            onMouseLeave={() => setShowEmail(false)}
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center 
                          text-gray-700 hover:bg-blue-50 hover:text-blue-600 
                          transition-all duration-300">
              <i className="fas fa-envelope" />
            </div>
            {/* 悬停显示邮箱地址 */}
            {showEmail && (
              <span className="absolute bottom-full mb-2 px-3 py-1 text-xs bg-gray-800 
                             text-white rounded whitespace-nowrap z-10
                             animate-fade-in">
                Mail To {email}
              </span>
            )}
          </a>

          {/* GitHub图标 */}
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center 
                          text-gray-700 hover:bg-gray-800 hover:text-white 
                          transition-all duration-300">
              <i className="fab fa-github" />
            </div>
          </a>
        </div>
      </div>
    </Card>
  )
}
