import { useGlobal } from '@/lib/global';
import { siteConfig } from '@/lib/config';
import CONFIG from '../config';

const ButtonJumpToTop = ({ showPercent = true, percent }) => {
  const { locale } = useGlobal();

  if (!siteConfig('HEXO_WIDGET_TO_TOP', null, CONFIG)) {
    return null;
  }

  return (
    <button
      className="group relative flex items-center justify-center
                 w-12 h-12 rounded-full bg-white border border-[#B3E0E6]/30 
                 text-[#2D4B53] shadow-sm
                 hover:bg-[#B3E0E6] hover:text-white hover:shadow-md 
                 transition-all duration-300
                 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2
                 focus:ring-[#B3E0E6]/50 focus:ring-offset-2"
      onClick={(e) => {
        e.stopPropagation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      title={locale.POST.TOP || '回到顶部'}
      aria-label={locale.POST.TOP || '回到顶部'}
    >
      {/* 优化后的百分比显示 */}
      {showPercent && (
        <span className="text-base font-semibold transition-opacity duration-300
                       group-hover:opacity-0 opacity-100 bg-white/80 px-1.5 py-0.5 rounded
                       shadow-sm">{percent}%</span>
      )}
      
      {/* 箭头图标 */}
      <i className="fas fa-arrow-up text-sm absolute transition-all duration-300
                  group-hover:opacity-100 group-hover:translate-y-[-2px] opacity-0"></i>
      
      {/* 装饰性波纹效果 */}
      <span className="absolute inset-0 rounded-full border border-[#B3E0E6]/50
                     animate-ping opacity-75 group-hover:opacity-50 transition-opacity duration-300"></span>
    </button>
  );
};

export default ButtonJumpToTop;