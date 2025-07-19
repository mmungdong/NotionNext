import Link from 'next/link';
import { useRouter } from 'next/router';

/**
 * 数字分页组件 - 重构版
 * 适配主题色调，代码结构清晰，交互体验优化
 */
const PaginationNumber = ({ page, totalPage }) => {
  const router = useRouter();
  const currentPage = Number(page);
  const pagePrefix = getPagePrefix(router.asPath);

  // 生成所有页码元素
  const renderPageItems = () => {
    const maxVisible = 7; // 最多显示的页码数量
    const pages = [];

    // 总页数较少时，显示所有页码
    if (totalPage <= maxVisible) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(renderPageButton(i));
      }
      return pages;
    }

    // 总页数较多时，显示首尾页和当前页附近的页码
    pages.push(renderPageButton(1));
    
    // 计算中间页码范围
    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPage - 1, currentPage + 2);
    
    // 确保中间显示足够的页码
    if (endPage - startPage < 3) {
      startPage = Math.max(2, endPage - 3);
    }
    
    // 添加前省略号
    if (startPage > 2) {
      pages.push(renderEllipsis());
    }
    
    // 添加中间页码
    for (let i = startPage; i <= endPage; i++) {
      pages.push(renderPageButton(i));
    }
    
    // 添加后省略号
    if (endPage < totalPage - 1) {
      pages.push(renderEllipsis());
    }
    
    // 添加最后一页
    pages.push(renderPageButton(totalPage));

    return pages;
  };

  // 渲染单个页码按钮
  const renderPageButton = (pageNum) => {
    const isActive = pageNum === currentPage;
    const pageUrl = getPageUrl(pageNum);

    return (
      <Link
        key={pageNum}
        href={pageUrl}
        className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-[#B3E0E6] text-white' 
                    : 'bg-white border border-[#B3E0E6]/30 text-[#2D4B53] hover:bg-[#B3E0E6]/10'
                  }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {pageNum}
      </Link>
    );
  };

  // 渲染省略号
  const renderEllipsis = () => (
    <span 
      key="ellipsis" 
      className="w-9 h-9 flex items-center justify-center text-gray-400"
    >
      ...
    </span>
  );

  // 渲染上一页按钮
  const renderPrevButton = () => {
    const hasPrev = currentPage > 1;
    const prevPage = currentPage - 1;
    const prevUrl = getPageUrl(prevPage);

    return (
      <Link
        href={prevUrl}
        rel="prev"
        className={`w-9 h-9 flex items-center justify-center rounded-md transition-all duration-200
                  ${hasPrev 
                    ? 'bg-white border border-[#B3E0E6]/30 text-[#2D4B53] hover:bg-[#B3E0E6]/10' 
                    : 'opacity-30 cursor-not-allowed bg-[#F2F8FB] border border-gray-200 text-gray-400'
                  }`}
        aria-disabled={!hasPrev}
      >
        <i className="fas fa-angle-left text-sm" />
      </Link>
    );
  };

  // 渲染下一页按钮
  const renderNextButton = () => {
    const hasNext = currentPage < totalPage;
    const nextPage = currentPage + 1;
    const nextUrl = getPageUrl(nextPage);

    return (
      <Link
        href={nextUrl}
        rel="next"
        className={`w-9 h-9 flex items-center justify-center rounded-md transition-all duration-200
                  ${hasNext 
                    ? 'bg-white border border-[#B3E0E6]/30 text-[#2D4B53] hover:bg-[#B3E0E6]/10' 
                    : 'opacity-30 cursor-not-allowed bg-[#F2F8FB] border border-gray-200 text-gray-400'
                  }`}
        aria-disabled={!hasNext}
      >
        <i className="fas fa-angle-right text-sm" />
      </Link>
    );
  };

  // 获取页面基础路径
  function getPagePrefix(path) {
    return path
      .split('?')[0]
      .replace(/\/page\/[1-9]\d*/, '')
      .replace(/\/$/, '')
      .replace('.html', '');
  }

  // 获取页码URL
  function getPageUrl(pageNum) {
    const query = router.query.s ? { s: router.query.s } : {};
    
    // 第一页特殊处理（无page参数）
    if (pageNum === 1) {
      return { pathname: `${pagePrefix}/`, query };
    }
    
    return { 
      pathname: `${pagePrefix}/page/${pageNum}`, 
      query 
    };
  }

  return (
    <div className="mt-10 mb-8 flex justify-center">
      <nav className="inline-flex items-center gap-1.5">
        {renderPrevButton()}
        {renderPageItems()}
        {renderNextButton()}
      </nav>
    </div>
  );
};

export default PaginationNumber;
    