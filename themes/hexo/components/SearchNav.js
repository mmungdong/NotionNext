import { useGlobal } from '@/lib/global';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Card from './Card';
import SearchInput from './SearchInput';
import TagItemMini from './TagItemMini';

/**
 * 搜索页面导航组件 - 适配主题色调
 */
export default function SearchNav({ tagOptions, categoryOptions, ...props }) {
  const searchRef = useRef(null);
  const { locale } = useGlobal();

  // 自动聚焦到搜索框
  useEffect(() => {
    searchRef?.current?.focus();
  }, []);

  return (
    <div className="my-6 px-2">
      {/* 搜索输入框 */}
      <SearchInput 
        cRef={searchRef} 
        {...props} 
        className="border-[#B3E0E6]/30 focus:border-[#B3E0E6] focus:ring-[#B3E0E6]/20"
      />

      {/* 分类区域 */}
      <Card className="w-full mt-4 border-[#B3E0E6]/20">
        <div className="text-[#2D4B53] mb-4 mx-3 flex items-center">
          <i className="mr-2 fas fa-th text-[#B3E0E6]" />
          {locale.COMMON.CATEGORY}:
        </div>
        <div id="category-list" className="duration-200 flex flex-wrap gap-2 mx-4 pb-2">
          {categoryOptions?.map(category => (
            <Link
              key={category.name}
              href={`/category/${category.name}`}
              passHref
              legacyBehavior
            >
              <div
                className="rounded-lg px-3 py-1.5 text-sm cursor-pointer transition-all duration-300
                          bg-[#F2F8FB] text-[#2D4B53] border border-[#B3E0E6]/20
                          hover:bg-[#B3E0E6] hover:text-white"
              >
                <i className="mr-1.5 fas fa-folder text-[#B3E0E6]" />
                {category.name}
                <span className="ml-1 opacity-80">({category.count})</span>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* 标签区域 */}
      <Card className="w-full mt-4 border-[#B3E0E6]/20">
        <div className="text-[#2D4B53] mb-4 ml-4 flex items-center">
          <i className="mr-2 fas fa-tag text-[#B3E0E6]" />
          {locale.COMMON.TAGS}:
        </div>
        <div id="tags-list" className="duration-200 flex flex-wrap gap-1.5 mx-4 pb-3">
          {tagOptions?.map(tag => (
            <TagItemMini 
              key={tag.name} 
              tag={tag} 
              className="border-[#B3E0E6]/20"
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
    