import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer className="relative z-10 bg-white/90 dark:bg-gray-900/90 border-t border-[#B3E0E6]/30 flex-shrink-0 justify-center text-center m-auto w-full leading-6 text-[#2D4B53] dark:text-gray-300 text-sm p-8 transition-all duration-300">
      {/* 版权信息 */}
      <div className="mb-3 flex items-center justify-center">
        <i className="fas fa-copyright text-[#B3E0E6] mr-2" /> 
        <span>{`${copyrightDate}`}</span>
        &nbsp;
        <span className="flex items-center">
          <i className="mx-1 animate-pulse fas fa-user text-[#B3E0E6]" />
          <a
            href={siteConfig('LINK')}
            className="underline font-medium hover:text-[#B3E0E6] transition-colors dark:hover:text-[#8AD1E0]"
          >
            {siteConfig('AUTHOR')}
          </a>
        </span>
        <span className="mx-2">•</span>
        <a 
          href="/" 
          className="hover:text-[#B3E0E6] transition-colors"
        >
          保留所有权利
        </a>
      </div>

      {/* 备案信息 */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4 text-sm">
        <BeiAnSite className="hover:text-[#B3E0E6] transition-colors" />
        <BeiAnGongAn className="hover:text-[#B3E0E6] transition-colors" />
      </div>

      {/* 站点信息 */}
      <h1 className="text-xs pt-2 mb-4 text-gray-500 dark:text-gray-400">
        {title} {siteConfig('BIO') && <>|</>} {siteConfig('BIO')}
      </h1>

      {/* 技术支持 */}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        <PoweredBy className="justify-center" />
      </div>

      {/* 装饰元素 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B3E0E6]/50 to-transparent" />
    </footer>
  )
}

export default Footer
    