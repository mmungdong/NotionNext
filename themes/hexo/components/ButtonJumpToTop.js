import { useGlobal } from '@/lib/global';
import { siteConfig } from '@/lib/config';
import CONFIG from '../config';

const ButtonJumpToTop = ({ showPercent = true, percent }) => {
  const { locale } = useGlobal();

  // 控制组件是否启用
  if (!siteConfig('HEXO_WIDGET_TO_TOP', null, CONFIG)) {
    return null;
  }

  return (
    <button
      className="group relative flex items-center justify-center
                 w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg
                 hover:bg-blue-600 hover:shadow-xl transition-all duration-300
                 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2
                 focus:ring-blue-300 focus:ring-offset-2"
      onClick={(e) => {
        // 阻止事件冒泡，避免触发父元素的点击
        e.stopPropagation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      title={locale.POST.TOP || '回到顶部'}
      aria-label={locale.POST.TOP || '回到顶部'}
    >
      {/* 百分比显示 - 默认显示，鼠标悬停时隐藏 */}
      {showPercent && (
        <span className="text-sm font-medium transition-opacity duration-300
                       group-hover:opacity-0 opacity-100">{percent}%</span>
      )}
      
      {/* 箭头图标 - 鼠标悬停时显示，默认隐藏 */}
      <i className="fas fa-arrow-up text-sm absolute transition-all duration-300
                  group-hover:opacity-100 group-hover:translate-y-[-2px] opacity-0"></i>
      
      {/* 装饰性波纹效果 */}
      <span className="absolute inset-0 rounded-full border border-blue-300 
                     animate-ping opacity-75 group-hover:opacity-50 transition-opacity duration-300"></span>
    </button>
  );
};

export default ButtonJumpToTop;
