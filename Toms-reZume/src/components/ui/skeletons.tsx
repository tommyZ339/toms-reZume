const TemplateSkeleton = () => {
  return (
    <div className="container mx-auto lg:ml-2 py-6 px-4">
      <div className="flex flex-col space-y-8">
        <div>
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="max-w-[300px] mx-auto border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
            >
              <div className="aspect-[210/297] w-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="p-3 bg-gray-100 dark:bg-gray-900 flex space-x-2 border-t border-gray-100 dark:border-gray-800">
                <div className="h-8 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-8 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// AI 页面骨架
const AiSkeleton = () => (
  <div className="container mx-auto py-8 px-4">
    <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6" />
    <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
    <div className="h-48 w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-8" />
    <div className="flex gap-4">
      <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    </div>
  </div>
);

// Settings 页面骨架
const SettingsSkeleton = () => (
  <div className="container mx-auto py-8 px-4 max-w-xl">
    <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6" />
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>
      ))}
      <div className="flex justify-end mt-4">
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

// Resumes 页面骨架
const ResumesSkeleton = () => (
  <div className="container mx-auto py-8 px-4">
    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
        >
          <div className="aspect-[210/297] w-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="p-3 bg-gray-100 dark:bg-gray-900 flex flex-col gap-2 border-t border-gray-100 dark:border-gray-800">
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="flex gap-2 mt-2">
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export { TemplateSkeleton, AiSkeleton, SettingsSkeleton, ResumesSkeleton };