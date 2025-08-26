import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  locale: string;
  bodyClassName?: string;
};

export default function Document({ children, locale, bodyClassName }: Props) {
  // 只返回内容，不包含 html/body 标签
  return (
    <div className={bodyClassName} lang={locale}>
      {children}
    </div>
  );
}
