import Comment from '@/components/Comment'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef } from 'react'
import ArticleAdjacent from './components/ArticleAdjacent'
import { ArticleLock } from './components/ArticleLock'
import BlogPostArchive from './components/BlogPostArchive'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import Card from './components/Card'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import PostHero from './components/PostHero'
import RightFloatArea from './components/RightFloatArea'
import SearchNav from './components/SearchNav'
import SideRight from './components/SideRight'
import SlotBar from './components/SlotBar'
import TagItemMini from './components/TagItemMini'
import TocDrawer from './components/TocDrawer'
import TocDrawerButton from './components/TocDrawerButton'
import CONFIG from './config'
import { Style } from './style'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

// 主题全局状态 - 保持原有逻辑
const ThemeGlobalHexo = createContext()
export const useHexoGlobal = () => useContext(ThemeGlobalHexo)

/**
 * 基础布局 - 仅修改样式
 */
const LayoutBase = props => {
  const { post, children, slotTop, className } = props
  const { onLoading, fullWidth } = useGlobal()
  const router = useRouter()
  const showRandomButton = siteConfig('HEXO_MENU_RANDOM', false, CONFIG)

  // 保持原有逻辑不变
  const headerSlot = post ? (
    <PostHero {...props} />
  ) : router.route === '/' &&
    siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG) ? (
    <Hero {...props} />
  ) : null

  const drawerRight = useRef(null)
  const tocRef = isBrowser ? document.getElementById('article-wrapper') : null

  // 悬浮按钮内容 - 仅修改样式
  const floatSlot = (
    <>
      {post?.toc?.length > 1 && (
        <div className='block lg:hidden'>
          <TocDrawerButton
            onClick={() => {
              drawerRight?.current?.handleSwitchVisible()
            }}
            className="hover:bg-[#B3E0E6]/30" // 新增：悬浮按钮hover样式
          />
        </div>
      )}
    </>
  )

  // 搜索模态框引用
  const searchModal = useRef(null)

  return (
    <ThemeGlobalHexo.Provider value={{ searchModal }}>
      <div
        id='theme-hexo'
        className={`${siteConfig('FONT_STYLE')} dark:bg-black scroll-smooth`}>
        <Style />

        {/* 顶部导航 */}
        <Header {...props} />

        {/* 顶部嵌入区域过渡动画 - 逻辑不变 */}
        <Transition
          show={!onLoading}
          appear={true}
          enter='transition ease-in-out duration-700 transform order-first'
          enterFrom='opacity-0 -translate-y-16'
          enterTo='opacity-100'
          leave='transition ease-in-out duration-300 transform'
          leaveFrom='opacity-100'
          leaveTo='opacity-0 translate-y-16'
          unmount={false}>
          {headerSlot}
        </Transition>

        {/* 主区块 - 修改背景色和间距样式 */}
        <main
          id='wrapper'
          className={`${siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG) ? '' : 'pt-16'} 
                    bg-[#F2F8FB] dark:bg-black w-full py-8 md:px-8 lg:px-24 min-h-screen relative`}>
          <div
            id='container-inner'
            className={
              (JSON.parse(siteConfig('LAYOUT_SIDEBAR_REVERSE'))
                ? 'flex-row-reverse'
                : '') +
              ' w-full mx-auto lg:flex lg:space-x-6 justify-center relative z-10' // 增加间距
            }>
            {/* 右侧栏 */}
            <SideRight {...props} />

            {/* 主内容区 */}
            <div
              className={`${className || ''} w-full ${fullWidth ? '' : 'max-w-4xl'} h-full overflow-hidden`}>
              <Transition
                show={!onLoading}
                appear={true}
                enter='transition ease-in-out duration-700 transform order-first'
                enterFrom='opacity-0 translate-y-16'
                enterTo='opacity-100'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 -translate-y-16'
                unmount={false}>
                {slotTop}
                {children}
              </Transition>
            </div>
          </div>
        </main>

        {/* 移动端目录抽屉 - 逻辑不变 */}
        <div className='block lg:hidden'>
          <TocDrawer post={post} cRef={drawerRight} targetRef={tocRef} />
        </div>

        {/* 悬浮菜单 */}
        <RightFloatArea floatSlot={floatSlot} />

        {/* 全文搜索 */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />

        {/* 页脚 - 修改样式 */}
        <Footer 
          title={siteConfig('TITLE')} 
          className="bg-white/80 dark:bg-gray-900/80 border-t border-[#B3E0E6]/30" // 页脚边框样式
        />
      </div>
    </ThemeGlobalHexo.Provider>
  )
}

/**
 * 首页布局 - 保持逻辑不变
 */
const LayoutIndex = props => {
  return <LayoutPostList {...props} className='pt-8' />
}

/**
 * 博客列表布局 - 仅修改卡片样式
 */
const LayoutPostList = props => {
  return (
    <div className='pt-8'>
      <SlotBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage 
          {...props} 
          cardClass="bg-white rounded-xl shadow-sm hover:shadow-md hover:border-[#B3E0E6]/50 transition-all duration-300" // 卡片样式
        />
      ) : (
        <BlogPostListScroll 
          {...props} 
          cardClass="bg-white rounded-xl shadow-sm hover:shadow-md hover:border-[#B3E0E6]/50 transition-all duration-300" // 卡片样式
        />
      )}
    </div>
  )
}

/**
 * 搜索布局 - 仅修改高亮样式
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (currentSearch) {
      replaceSearchResult({
        doms: document.getElementsByClassName('replace'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-[#B3E0E6] border-b border-dashed' // 搜索高亮样式
        }
      })
    }
  })

  return (
    <div className='pt-8'>
      {!currentSearch ? (
        <SearchNav {...props} />
      ) : (
        <div id='posts-wrapper'>
          {siteConfig('POST_LIST_STYLE') === 'page' ? (
            <BlogPostListPage {...props} />
          ) : (
            <BlogPostListScroll {...props} />
          )}
        </div>
      )}
    </div>
  )
}

/**
 * 归档布局 - 仅修改卡片和标题样式
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <div className='pt-8'>
      <Card className='w-full bg-white rounded-xl shadow-sm border border-gray-100'>
        <div className='mb-10 pb-20 md:p-12 p-3 min-h-full dark:bg-gray-900'>
          {Object.keys(archivePosts).map(archiveTitle => (
            <BlogPostArchive
              key={archiveTitle}
              posts={archivePosts[archiveTitle]}
              archiveTitle={archiveTitle}
              titleClass="text-gray-800 border-l-4 border-[#B3E0E6] pl-3" // 标题样式
            />
          ))}
        </div>
      </Card>
    </div>
  )
}

/**
 * 文章详情布局 - 仅修改样式
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  
  // 保持原有404处理逻辑
  useEffect(() => {
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector('#article-wrapper #notion-article')
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
  }, [post])

  return (
    <>
      {/* 文章卡片 - 修改样式 */}
      <div className='w-full lg:hover:shadow-md lg:border border-gray-100 rounded-t-xl lg:rounded-xl lg:px-2 lg:py-4 bg-white dark:bg-gray-900 article transition-all duration-300'>
        {lock && <ArticleLock validPassword={validPassword} />}

        {!lock && post && (
          <div className='overflow-x-auto flex-grow mx-auto md:w-full md:px-5 '>
            <article
              id='article-wrapper'
              itemScope
              itemType='https://schema.org/Movie'
              className='subpixel-antialiased overflow-y-hidden'>
              {/* 文章主体 - 修改Notion页面样式 */}
              <section className='px-5 justify-center mx-auto max-w-2xl lg:max-w-full'>
                {post && <NotionPage 
                  post={post} 
                  style={{ 
                    '--notion-text': '#2D4B53',
                    '--notion-hover': 'rgba(179, 224, 230, 0.2)'
                  }} 
                />}
              </section>

              {/* 相邻文章导航 - 修改样式 */}
              {post?.type === 'Post' && (
                <ArticleAdjacent 
                  {...props} 
                  adjacentClass="border-t border-[#B3E0E6]/30 pt-6 mt-6"
                />
              )}
            </article>
          </div>
        )}
      </div>
    </>
  )
}

/**
 * 404布局 - 仅修改样式
 */
const Layout404 = props => {
  const router = useRouter()
  const { locale } = useGlobal()
  
  // 保持原有跳转逻辑
  useEffect(() => {
    setTimeout(() => {
      if (isBrowser) {
        const article = document.querySelector('#article-wrapper #notion-article')
        if (!article) {
          router.push('/').then(() => {})
        }
      }
    }, 3000)
  })

  return (
    <>
      {/* 404页面 - 修改样式 */}
      <div className='text-[#2D4B53] w-full h-screen text-center justify-center content-center items-center flex flex-col bg-[#F2F8FB]'>
        <div className='dark:text-gray-200'>
          <h2 className='inline-block border-r-2 border-[#B3E0E6] mr-2 px-3 py-2 align-top text-4xl'>
            404
          </h2>
          <div className='inline-block text-left h-32 leading-10 items-center'>
            <h2 className='m-0 p-0 text-xl'>{locale.COMMON.NOT_FOUND}</h2>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * 分类列表布局 - 仅修改样式
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  
  return (
    <div className='mt-8'>
      <Card className='w-full bg-white border border-gray-100 shadow-sm'>
        <div className='dark:text-gray-200 mb-5 ml-4 flex flex items-center'>
          <i className='mr-4 fas fa-th text-[#B3E0E6]' /> {/* 图标样式保持一致 */}
          <span className="font-bold text-gray-800 dark:text-gray-100">{locale.COMMON.CATEGORY}</span>
        </div>
        <div id='category-list' className='duration-200 flex flex-wrap ml-8 gap-2.5 p-2'>
          {categoryOptions?.map(category => (
            <Link
              key={category.name}
              href={`/category/${category.name}`}
              passHref
              legacyBehavior
            >
              <div
                className='p-2'
              >
                <div 
                  className=" transition-colors 
                            px-5 py-2.5 rounded-lg cursor-pointer
                            inline-flex items-center"
                >
                  <i className='mr-2 fas fa-folder text-[#B3E0E6]' />
                  <span>{category.name}</span>
                  <span className='ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded-full'>{category.count}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}
    

/**
 * 标签列表布局 - 仅修改样式
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <div className='mt-8'>
      <Card className='w-full bg-white border border border-gray-100 shadow-sm'>
        <div className='dark:text-gray-200 mb-5 ml-4 flex items-center'>
          <i className='mr-4 fas fa-tag text-[#B3E0E6]' /> {/* 图标样式 */}
          <span className="font-bold text-gray-800 dark:text-gray-100">{locale.COMMON.TAGS}</span>
        </div>
        <div id='tags-list' className='duration-200 flex flex-wrap ml-8 gap-2.5 p-2'>
          {tagOptions.map(tag => (
            <div key={tag.name} className='p-2'>
              <TagItemMini 
                key={tag.name} 
                tag={tag} 
                className="hover:bg-[#B3E0E6] hover:text-white transition-colors"
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// 保持原有导出结构
export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
