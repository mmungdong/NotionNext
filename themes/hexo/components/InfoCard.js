import { useRouter } from 'next/router'
import Card from './Card'
import SocialButton from './SocialButton'
import MenuGroupCard from './MenuGroupCard'
import { siteConfig } from '@/lib/config'
import { useState } from 'react'
// 导入官方字体包
import '@fontsource/ma-shan-zheng';

export function InfoCard(props) {
  const router = useRouter()
  const { className, siteInfo } = props
  const email = "510195171@qq.com"
  const githubUrl = "https://github.com/mmungdong"
  const [showEmail, setShowEmail] = useState(false)
  const avatarSrc = "/images/avatar.png"
  
  // 处理头像点击跳转
  const handleAvatarClick = () => {
    router.push('/archive')
  }
  
  return (
    <Card
      className={`relative overflow-hidden rounded-lg
                  bg-[#F2F8FB] border border-[#B3E0E6]/20 
                  rounded-xl shadow-sm hover:shadow-md 
                  transition-all duration-300
                  ${className || ''}`}
    >
      {/* 头像区域 */}
      <div className="flex justify-center items-center pt-10 pb-6">
        <div className="relative group">
          <img
            src={avatarSrc}
            alt={siteConfig('AUTHOR') || 'Author Avatar'}
            width={100}
            height={100}
            className="rounded-full border-4 border-[#B3E0E6]/30 
                      object-cover shadow-[0_0_15px_rgba(179,224,230,0.3)]
                      transition-all duration-500 group-hover:rotate-45
                      cursor-pointer"
            onError={(e) => {
              e.target.src = "/images/default-avatar.png"
            }}
            onClick={handleAvatarClick}
          />
        </div>
      </div>

      {/* 名称 */}
      <h2 className='font-medium text-center text-xl pb-4 text-[#2D4B53]'>
        {siteConfig('AUTHOR')}
      </h2>

      {/* 简介 - 使用有效的字体包 */}
      <p className="text-center px-4 py-2 
                   font-[Ma Shan Zheng]  /* 字体名称需与包内定义一致 */
                   text-gray-700 dark:text-gray-300
                   text-lg md:text-xl leading-relaxed
                   tracking-wide transition-all duration-300">
        {siteConfig('BIO')}
      </p>

      {/* 其他部分保持不变 */}
      <hr className="border-[#B3E0E6]/20 mx-8 my-4" />

      <div className="px-6 py-2 space-y-3">
        <MenuGroupCard {...props} />
        <SocialButton />
      </div>

      <div className="px-3 mb-6">
        <div className="flex justify-center space-x-6">
          <a 
            href={`mailto:${email}`} 
            className="flex flex-col items-center group relative"
            onMouseEnter={() => setShowEmail(true)}
            onMouseLeave={() => setShowEmail(false)}
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center 
                          text-[#B3E0E6] hover:bg-[#B3E0E6] hover:text-white 
                          transition-all duration-300 shadow-sm">
              <i className="fas fa-envelope" />
            </div>
            {showEmail && (
              <span className="absolute bottom-full mb-2 px-3 py-1 text-xs bg-[#2D4B53] 
                             text-white rounded whitespace-nowrap z-10
                             animate-fade-in">
                Mail To {email}
              </span>
            )}
          </a>

          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center 
                          text-[#B3E0E6] hover:bg-[#B3E0E6] hover:text-white 
                          transition-all duration-300 shadow-sm">
              <i className="fab fa-github" />
            </div>
          </a>
        </div>
      </div>
    </Card>
  )
}
    