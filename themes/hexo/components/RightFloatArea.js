import { useEffect, useState } from 'react';
import ButtonJumpToTop from './ButtonJumpToTop';

export default function RightFloatArea({ floatSlot }) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 计算滚动百分比
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = Math.round((scrollTop / scrollHeight) * 100) || 0;
      
      setIsVisible(scrollTop > 100);
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-12 right-6 z-50 flex flex-col items-center transition-all duration-300 ease-in-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      {/* 返回顶部按钮 */}
      <ButtonJumpToTop
        showPercent={true}
        percent={scrollPercent}
      />
    </div>
  );
}
    