import { siteConfig } from '@/lib/config';
import { useGlobal } from '@/lib/global';
import Link from 'next/link';
import CONFIG from '../config';

const MenuGroupCard = (props) => {
  const { postCount, categoryOptions, tagOptions } = props;
  const { locale } = useGlobal();

  // 与主题色#B3E0E6协调的浅色方案 - 避免过深颜色
  const themeColors = [
    {
      icon: '#A8DADC',  // 浅青绿色（主题色稍深变体）
      text: '#457B9D',  // 浅蓝色（不深且协调）
      hover: '#7FB7C9'  // hover时稍深一点
    },
    {
      icon: '#BEE3DB',  // 淡绿松石色（主题色邻近色）
      text: '#588157',  // 淡绿色（柔和且协调）
      hover: '#7A9D54'  // hover时稍深一点
    },
    {
      icon: '#C8E6C9',  // 淡薄荷色（主题色互补浅色）
      text: '#3D7068',  // 淡青绿色（与主题色呼应）
      hover: '#5F9E94'  // hover时稍深一点
    }
  ];

  // 统计数据展示区域
  const archiveSlot = <div className="text-center font-semibold">{postCount}</div>;
  const categorySlot = <div className="text-center font-semibold">{categoryOptions?.length}</div>;
  const tagSlot = <div className="text-center font-semibold">{tagOptions?.length}</div>;

  // 菜单链接配置 - 关联对应的颜色索引
  const links = [
    {
      // name: locale.COMMON.ARTICLE,
      href: '/archive',
      slot: archiveSlot,
      icon: 'fas fa-archive',
      show: siteConfig('HEXO_MENU_ARCHIVE', null, CONFIG),
      colorIndex: 0
    },
    {
      // name: locale.COMMON.CATEGORY,
      href: '/category',
      slot: categorySlot,
      icon: 'fas fa-folder',
      show: siteConfig('HEXO_MENU_CATEGORY', null, CONFIG),
      colorIndex: 1
    },
    {
      // name: locale.COMMON.TAGS,
      href: '/tag',
      slot: tagSlot,
      icon: 'fas fa-tag',
      show: siteConfig('HEXO_MENU_TAG', null, CONFIG),
      colorIndex: 2
    }
  ];

  return (
    <nav
      id="nav"
      className="leading-8 flex justify-center w-full dark:text-gray-200"
    >
      {links.map((link, index) => {
        if (!link.show) return null;
        
        // 获取当前项的颜色配置
        const colors = themeColors[link.colorIndex % themeColors.length];

        return (
          <Link
            key={index}
            href={link.href}
            target={link?.target}
            className="py-1.5 my-1 px-4 text-base cursor-pointer flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center transition-all duration-300">
              <i className={`${link.icon} mb-1`} style={{ color: colors.icon }} />
              <div className="text-center" style={{ color: colors.text }}>
                {link.name}
              </div>
              <div className="text-center font-semibold" style={{ color: colors.text }}>
                {link.slot}
              </div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default MenuGroupCard;
    