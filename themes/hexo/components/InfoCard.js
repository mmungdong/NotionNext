import { useRouter } from 'next/router'
import Card from './Card'
import SocialButton from './SocialButton'
import MenuGroupCard from './MenuGroupCard'
import { siteConfig } from '@/lib/config'
import { useState } from 'react'

export function InfoCard(props) {
  const router = useRouter()
  const { className, siteInfo } = props
  const email = "510195171@qq.com"
  const githubUrl = "https://github.com/mmungdong"
  const [showEmail, setShowEmail] = useState(false)
  const avatarSrc = "/images/avatar.png"
  
  return (
    <Card
      className={`relative overflow-hidden-hidden-hidden rounded-lg:block
                  bg-white-[#F2F8FB] border border-[#B3E0E6]/20 
                  rounded-xl shadow                  shadow-sm hover:shadow-md transition-[#B3E0E6]/10 
                  transition-all duration-300
                  ${className || ''}`}
    >
      {/* 头像区域 - 增加主题色调强化 */}
      <div
        className="flex justify-center items-center pt-10 pb-6 cursor-pointer"
        onClick={() => router.push('/')}
      >
        <div className="relative">
          <img
            src={avatarSrc}
            alt={siteConfig('AUTHOR') || 'Author Avatar'}
            width={100}
            height={100}
            className="rounded-full border-4 border-[#B3E0E6]/30 
                      object-cover shadow-[0_0_15px_rgba(179,224,230,0.3)]
                      transition-transform hover:scale-105 duration-300"
            onError={(e) => {
              e.target.src = "/images/default-avatar.png"
            }}
          />
        </div>
      </div>

      {/* 名称 - 深色文字增强对比 */}
      <h2 className='font-medium text-center text-xl pb-4 text-[#2D4B53]'>
        {siteConfig('AUTHOR')}
      </h2>

      {/* 简介 - 柔和文字色 */}
      <p className='text-sm text-center text-gray-600 px-4'>
        {siteConfig('BIO')}
      </p>

      {/* 分割线 - 主题色弱化版 */}
      <hr className="border-[#B3E0E6]/20 mx-8 my-4" />

      {/* 菜单 / 社交 - 保持布局，优化配色 */}
      <div className="px-6 py-2 space-y-3">
        <MenuGroupCard {...props} />
        <SocialButton />
      </div>

      {/* 联系方式区域 - 主题色交互强化 */}
      <div className="px-3 mb-6">
        <div className="flex justify-center space-x-6">
          {/* 邮件图标 */}
          <a 
            href={`mailto:${email}`} 
            className="flex flex-col items-center group relative"
            onMouseEnter={() => setShowEmail(true)}
            onMouseLeave={() => setShowEmail(false)}
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center 
                          text-[#B3E0E6] hover:bg-[#B3E0E6] hover:text-white 
                          shadow-all duration-300 shadow-sm">
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

          {/* GitHub图标 */}
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
    