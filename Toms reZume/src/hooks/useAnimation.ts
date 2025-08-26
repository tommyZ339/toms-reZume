import { Variants } from 'framer-motion';

// 通用动画配置
export const useAnimationVariants = () => {
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const scaleOnHover: Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const expandCollapse: Variants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: 'auto', opacity: 1 },
  };

  const slideIn: Variants = {
    initial: { x: -300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 300, opacity: 0 },
  };

  return {
    fadeInUp,
    scaleOnHover,
    expandCollapse,
    slideIn,
  };
};

// 常用动画配置
export const useSpringTransition = () => ({
  type: 'spring',
  stiffness: 400,
  damping: 17,
});

// 滚动触发动画
export const useScrollAnimation = () => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6 },
});
