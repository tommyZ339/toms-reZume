import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function SettingsSkeleton() {
  return (
    <div className="container mx-auto lg:ml-2 py-8">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-9 w-48" />
      </div>

      {/* 主要同步设置卡片 */}
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="pt-6 space-y-4 px-8 pb-8">
          <div className="flex items-center gap-3">
            <Skeleton className="h-11 flex-1" />
            <Skeleton className="h-11 w-32" />
          </div>
        </CardContent>
      </Card>

      {/* 底部设置网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-8">
        {/* 语言设置卡片 */}
        <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="pt-4 space-y-4 px-6 pb-6">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>

        {/* 主题设置卡片 */}
        <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="pt-4 space-y-4 px-6 pb-6">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
