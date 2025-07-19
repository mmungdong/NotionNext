import { useRouter } from 'next/router'
import Card from './Card'
import SocialButton from './SocialButton'
import MenuGroupCard from './MenuGroupCard'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'

export function InfoCard(props) {
  const router = useRouter()
  const { className, siteInfo } = props

  return (
    <Card
      className={`relative overflow-hidden rounded-lg
                  bg-white shadow-md hover:shadow-lg transition-shadow
                  ${className || ''}`}
    >
      {/* 头像 */}
      <div
        className="flex justify-center items-center pt-10 pb-6 cursor-pointer"
        onClick={() => router.push('/')}
      >
        <div className="relative">
          <LazyImage
            src={siteInfo?.icon}
            alt={siteConfig('AUTHOR')}
            width={100}
            height={100}
            className="rounded-full object-cover shadow-inner
                      transition-transform group-hover:scale-110 duration-300"
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
      <div className="px-6 py-4 space-y-4">
        <MenuGroupCard {...props} />
        <SocialButton />
      </div>
    </Card>
  )
}