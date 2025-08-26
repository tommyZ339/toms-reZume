import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface DateFieldState {
  isCalendarOpen: boolean;
  currentYear: number;
  currentMonth: number;
}

export const useDateField = (initialDate?: Date) => {
  const [state, setState] = useState<DateFieldState>({
    isCalendarOpen: false,
    currentYear: initialDate?.getFullYear() || new Date().getFullYear(),
    currentMonth: initialDate?.getMonth() || new Date().getMonth(),
  });

  const toggleCalendar = useCallback(() => {
    setState((prev) => ({ ...prev, isCalendarOpen: !prev.isCalendarOpen }));
  }, []);

  const closeCalendar = useCallback(() => {
    setState((prev) => ({ ...prev, isCalendarOpen: false }));
  }, []);

  const navigateYear = useCallback((direction: 'prev' | 'next') => {
    setState((prev) => ({
      ...prev,
      currentYear: prev.currentYear + (direction === 'next' ? 1 : -1),
    }));
  }, []);

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setState((prev) => {
      const newMonth = prev.currentMonth + (direction === 'next' ? 1 : -1);
      if (newMonth > 11) {
        return { ...prev, currentMonth: 0, currentYear: prev.currentYear + 1 };
      }
      if (newMonth < 0) {
        return { ...prev, currentMonth: 11, currentYear: prev.currentYear - 1 };
      }
      return { ...prev, currentMonth: newMonth };
    });
  }, []);

  const setMonthYear = useCallback((month: number, year: number) => {
    setState((prev) => ({ ...prev, currentMonth: month, currentYear: year }));
  }, []);

  return {
    ...state,
    toggleCalendar,
    closeCalendar,
    navigateYear,
    navigateMonth,
    setMonthYear,
  };
};

// AI 处理相关
export const useAIProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processWithAI = useCallback(
    async (
      text: string,
      aiFunction: (text: string) => Promise<string>,
      successMessage: string = '处理完成'
    ) => {
      if (!text.trim()) {
        toast.error('请输入内容后再进行处理');
        return null;
      }

      setIsProcessing(true);
      try {
        const result = await aiFunction(text);
        toast.success(successMessage);
        return result;
      } catch (error) {
        console.error('AI处理失败:', error);
        toast.error('处理失败，请重试');
        return null;
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  return {
    isProcessing,
    processWithAI,
  };
};

// 拖拽上传相关
export const useDragUpload = (onFileUpload: (file: File) => void) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFileUpload(files[0]);
      }
    },
    [onFileUpload]
  );

  return {
    isDragging,
    dragHandlers: {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
  };
};
