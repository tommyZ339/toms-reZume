import { useState, useCallback, useRef, useEffect } from 'react';

// 通用 Toggle Hook
export const useToggle = (initialState: boolean = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState((prev) => !prev), []);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);

  return [state, { toggle, setTrue, setFalse, setState }] as const;
};

// 展开/折叠管理
export const useExpandable = (initialExpanded?: string | null) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    initialExpanded || null
  );

  const toggleExpanded = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const expand = useCallback((id: string) => setExpandedId(id), []);
  const collapse = useCallback(() => setExpandedId(null), []);
  const isExpanded = useCallback(
    (id: string) => expandedId === id,
    [expandedId]
  );

  return {
    expandedId,
    toggleExpanded,
    expand,
    collapse,
    isExpanded,
  };
};

// 对话框状态管理
export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  const open = useCallback((dialogData?: any) => {
    setData(dialogData || null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
    setData,
  };
};

// 复制到剪贴板
export const useCopyToClipboard = (timeout: number = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), timeout);
        return true;
      } catch (error) {
        console.error('复制失败:', error);
        setIsCopied(false);
        return false;
      }
    },
    [timeout]
  );

  return { isCopied, copy };
};

// 防抖Hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// 节流Hook
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastCallTime = useRef<number>(0);
  const timeoutId = useRef<NodeJS.Timeout>();

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastCallTime.current >= delay) {
        lastCallTime.current = now;
        callback(...args);
      } else {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
          lastCallTime.current = Date.now();
          callback(...args);
        }, delay - (now - lastCallTime.current));
      }
    },
    [callback, delay]
  ) as T;

  return throttledCallback;
};

// 点击外部关闭
export const useClickOutside = <T extends HTMLElement>(
  callback: () => void
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};
