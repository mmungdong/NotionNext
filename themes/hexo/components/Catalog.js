import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 目录导航组件（移除进度条，优化样式）
 */
const Catalog = ({ toc }) => {
  const { locale } = useGlobal()
  const [activeSection, setActiveSection] = useState(null)
  const tRef = useRef(null)
  const tocIds = []

  // 滚动监听逻辑（保持原有功能）
  useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy)
    actionSectionScrollSpy()
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [])

  const throttleMs = 200
  const actionSectionScrollSpy = useCallback(
    throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      let prevBBox = null
      let currentSectionId = activeSection
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        if (!currentSectionId) {
          currentSectionId = section.getAttribute('data-id')
        }
        const bbox = section.getBoundingClientRect()
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
        const offset = Math.max(150, prevHeight / 4)
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute('data-id')
          prevBBox = bbox
          continue
        }
        break
      }
      setActiveSection(currentSectionId)
      const index = tocIds.indexOf(currentSectionId) || 0
      tRef?.current?.scrollTo({ top: 28 * index, behavior: 'smooth' })
    }, throttleMs)
  )

  if (!toc || toc.length < 1) {
    return <></>
  }

  return (
    <div className="px-3 py-4 bg-white rounded-xl border border-[#B3E0E6]/20 shadow-sm">
      {/* 目录标题 */}
      <div className="w-full mb-4 flex items-center text-[#2D4B53] pb-2 border-b border-[#B3E0E6]/10">
        <i className="mr-2 fas fa-stream text-[#B3E0E6]" />
        <span className="font-medium">{locale.COMMON.TABLE_OF_CONTENTS}</span>
      </div>

      {/* 目录列表（增加内部间距，优化滚动体验） */}
      <div
        className="overflow-y-auto max-h-40 lg:max-h-96 overscroll-none scrollbar-thin scrollbar-thumb-[#B3E0E6]/30"
        ref={tRef}
      >
        <nav className="h-full text-gray-700 space-y-0.5">
          {toc.map(tocItem => {
            const id = uuidToId(tocItem.id)
            tocIds.push(id)
            const isActive = activeSection === id
            
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`block px-3 py-2 rounded-md transition-all duration-200
                          ${isActive 
                            ? 'bg-[#B3E0E6]/10 text-[#2D4B53] font-medium' 
                            : 'hover:bg-[#F2F8FB] text-gray-600 hover:text-[#B3E0E6]'}`}
              >
                <span
                  style={{
                    display: 'inline-block',
                    marginLeft: tocItem.indentLevel * 16 // 保持原有缩进逻辑
                  }}
                  className="truncate"
                >
                  {tocItem.text}
                </span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Catalog