import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import CategoryGroup from './CategoryGroup'
import Logo from './Logo'
import { MenuListTop } from './MenuListTop'
import SearchButton from './SearchButton'
import SearchDrawer from './SearchDrawer'
import SideBar from './SideBar'
import SideBarDrawer from './SideBarDrawer'
import TagGroups from './TagGroups'

let windowTop = 0

/**
 * 顶部导航 - 护眼色调版本
 * 采用柔和的绿色系作为主色调，减少视觉疲劳
 */
const Header = props => {
  const searchDrawer = useRef()
  const { tags, currentTag, categories, currentCategory } = props
  const { locale } = useGlobal()
  const router = useRouter()
  const [isOpen, changeShow] = useState(false)
  const showSearchButton = siteConfig('HEXO_MENU_SEARCH', false, CONFIG)

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  const toggleSideBarClose = () => {
    changeShow(false)
  }

  // 监听滚动
  useEffect(() => {
    window.addEventListener('scroll', topNavStyleHandler)
    router.events.on('routeChangeComplete', topNavStyleHandler)
    topNavStyleHandler()
    return () => {
      router.events.off('routeChangeComplete', topNavStyleHandler)
      window.removeEventListener('scroll', topNavStyleHandler)
    }
  }, [])

  const throttleMs = 200

  const topNavStyleHandler = useCallback(
    throttle(() => {
      const scrollS = window.scrollY
      const nav = document.querySelector('#sticky-nav')
      // 首页和文章页会有头图
      const header = document.querySelector('#header')
      // 导航栏和头图是否重叠
      const scrollInHeader =
        header && (scrollS < 10 || scrollS < header?.clientHeight - 50) // 透明导航条的条件

      if (scrollInHeader) {
        // 头图区域 - 透明样式
        nav && nav.classList.replace('bg-eyecare-50', 'bg-transparent')
        nav && nav.classList.replace('border-eyecare-200', 'border-transparent')
        nav && nav.classList.replace('shadow-md', 'shadow-none')
        nav && nav.classList.replace('text-gray-800', 'text-white')
        nav && nav.classList.replace('dark:bg-eyecare-dark', 'dark:bg-transparent')
      } else {
        // 内容区域 - 护眼背景样式
        nav && nav.classList.replace('bg-transparent', 'bg-eyecare-50')
        nav && nav.classList.replace('border-transparent', 'border-eyecare-200')
        nav && nav.classList.replace('shadow-none', 'shadow-md')
        nav && nav.classList.replace('text-white', 'text-gray-800')
        nav && nav.classList.replace('dark:bg-transparent', 'dark:bg-eyecare-dark')
      }

      // 导航栏不在头图里，且页面向下滚动一定程度 隐藏导航栏
      const showNav =
        scrollS <= windowTop ||
        scrollS < 5 ||
        (header && scrollS <= header.clientHeight + 100)
      if (!showNav) {
        nav && nav.classList.replace('top-0', '-top-20')
        windowTop = scrollS
      } else {
        nav && nav.classList.replace('-top-20', 'top-0')
        windowTop = scrollS
      }
    }, throttleMs)
  )

  const searchDrawerSlot = (
    <>
      {categories && (
        <section className='mt-8 p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm'>
          <div className='text-sm flex flex-nowrap justify-between font-light px-2'>
            <div className='text-gray-700 dark:text-gray-300'>
              <i className='mr-2 fas fa-th-list' />
              {locale.COMMON.CATEGORY}
            </div>
            <Link
              href={'/category'}
              passHref
              className='mb-3 text-eyecare-600 hover:text-eyecare-700 dark:text-eyecare-400 dark:hover:text-eyecare-300 hover:underline cursor-pointer transition-colors'>
              {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
            </Link>
          </div>
          <CategoryGroup
            currentCategory={currentCategory}
            categories={categories}
          />
        </section>
      )}

      {tags && (
        <section className='mt-4 p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm'>
          <div className='text-sm py-2 px-2 flex flex-nowrap justify-between font-light dark:text-gray-300'>
            <div className='text-gray-700 dark:text-gray-300'>
              <i className='mr-2 fas fa-tag' />
              {locale.COMMON.TAGS}
            </div>
            <Link
              href={'/tag'}
              passHref
              className='text-eyecare-600 hover:text-eyecare-700 dark:text-eyecare-400 dark:hover:text-eyecare-300 hover:underline cursor-pointer transition-colors'>
              {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
            </Link>
          </div>
          <div className='p-2'>
            <TagGroups tags={tags} currentTag={currentTag} />
          </div>
        </section>
      )}
    </>
  )

  return (
    <div id='top-nav' className='z-40'>
      <SearchDrawer cRef={searchDrawer} slot={searchDrawerSlot} />

      {/* 导航栏 - 护眼色调设计 */}
      <div
        id='sticky-nav'
        style={{ backdropFilter: 'blur(8px)' }}
        className='top-0 duration-500 transition-all shadow-none fixed bg-transparent 
                  text-white w-full z-20 transform border-transparent 
                  dark:border-transparent ease-in-out'>
        <div className='w-full flex justify-between items-center px-4 py-3 md:py-4'>
          {/* Logo区域 */}
          <div className='flex items-center'>
            <Logo {...props} />
          </div>

          {/* 右侧功能区 */}
          <div className='mr-1 flex justify-end items-center space-x-1 md:space-x-3'>
            {/* 桌面端菜单 */}
            <div className='hidden lg:flex items-center space-x-1 md:space-x-6'>
              <MenuListTop {...props} />
            </div>
            
            {/* 搜索按钮 */}
            {showSearchButton && (
              <SearchButton 
                className="w-10 h-10 rounded-full flex items-center justify-center
                          hover:bg-eyecare-100/50 dark:hover:bg-gray-700/50
                          transition-colors"
              />
            )}
          </div>
        </div>
      </div>

      {/* 折叠侧边栏 */}
      <SideBarDrawer isOpen={isOpen} onClose={toggleSideBarClose}>
        <SideBar {...props} />
      </SideBarDrawer>
    </div>
  )
}

export default Header
    