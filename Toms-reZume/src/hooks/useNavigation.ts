import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useCallback } from 'react';

// 增强的路由Hook
export const useEnhancedRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const navigateToLocalized = useCallback(
    (path: string) => {
      const localizedPath = `/${locale}${
        path.startsWith('/') ? path : `/${path}`
      }`;
      router.push(localizedPath);
    },
    [router, locale]
  );

  const navigateBack = useCallback(() => {
    router.back();
  }, [router]);

  const navigateForward = useCallback(() => {
    router.forward();
  }, [router]);

  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const isCurrentPath = useCallback(
    (path: string) => {
      return pathname === path;
    },
    [pathname]
  );

  const isPathActive = useCallback(
    (path: string) => {
      return pathname.startsWith(path);
    },
    [pathname]
  );

  return {
    router,
    pathname,
    locale,
    navigateToLocalized,
    navigateBack,
    navigateForward,
    refresh,
    isCurrentPath,
    isPathActive,
  };
};

// 面包屑生成
export const useBreadcrumbs = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = useCallback(() => {
    const segments = pathname.split('/').filter(Boolean);

    return segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href,
        isLast: index === segments.length - 1,
      };
    });
  }, [pathname]);

  return { breadcrumbs: generateBreadcrumbs() };
};

// URL 参数管理
export const useURLParams = () => {
  const router = useRouter();
  const pathname = usePathname();

  const updateParams = useCallback(
    (params: Record<string, string | null>) => {
      const searchParams = new URLSearchParams(window.location.search);

      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          searchParams.delete(key);
        } else {
          searchParams.set(key, value);
        }
      });

      const newURL = `${pathname}?${searchParams.toString()}`;
      router.replace(newURL);
    },
    [router, pathname]
  );

  const getParam = useCallback((key: string): string | null => {
    if (typeof window === 'undefined') return null;
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key);
  }, []);

  const removeParam = useCallback(
    (key: string) => {
      updateParams({ [key]: null });
    },
    [updateParams]
  );

  const setParam = useCallback(
    (key: string, value: string) => {
      updateParams({ [key]: value });
    },
    [updateParams]
  );

  return {
    updateParams,
    getParam,
    removeParam,
    setParam,
  };
};
