'use client';
import { useState, useEffect, use } from 'react';
import { SunMoon, Folder, Languages, Sun, Moon, Monitor } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  getFileHandle,
  getConfig,
  storeFileHandle,
  storeConfig,
  verifyPermission,
} from '@/utils/fileSystem';
import { Link, usePathname } from '@/i18n/routing.public';
import { locales, localeNames } from '@/i18n/config';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const SettingsPage = () => {
  const [directoryHandle, setDirectoryHandle] =
    useState<FileSystemDirectoryHandle | null>(null);
  const [folderPath, setFolderPath] = useState<string>('');
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const loadSavedConfig = async () => {
      try {
        const handle = await getFileHandle('syncDirectory');
        const path = await getConfig('syncDirectoryPath');

        if (handle && path) {
          const hasPermission = await verifyPermission(handle);
          if (hasPermission) {
            setDirectoryHandle(handle as FileSystemDirectoryHandle);
            setFolderPath(path);
          }
        }
      } catch (error) {
        console.error('Error loading saved config:', error);
      }
    };

    loadSavedConfig();
  }, []);

  const handleSelectDirectory = async () => {
    try {
      if (!('showDirectoryPicker' in window)) {
        alert(
          'Your browser does not support directory selection. Please use a modern browser.'
        );
        return;
      }

      const handle = await window.showDirectoryPicker({ mode: 'readwrite' });
      const hasPermission = await verifyPermission(handle);
      if (hasPermission) {
        setDirectoryHandle(handle);
        const path = handle.name;
        setFolderPath(path);
        await storeFileHandle('syncDirectory', handle);
        await storeConfig('syncDirectoryPath', path);
      }
    } catch (error) {
      console.error('Error selecting directory:', error);
    }
  };

  return (
    <div className="container mx-auto lg:ml-2 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">
          {t('dashboard.settings.title')}
        </h2>
      </div>

      <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="space-y-4">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950">
              <Folder className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
            </div>
            <span>{t('dashboard.settings.sync.title')}</span>
          </CardTitle>
          <CardDescription className="text-base">
            {t('dashboard.settings.sync.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4 px-8 pb-8">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              {directoryHandle ? (
                <div className="h-11 px-3 flex items-center gap-2 bg-gray-50 dark:bg-gray-900 border rounded-md">
                  <Folder className="h-4 w-4 text-emerald-500" />
                  <span className="truncate">{folderPath}</span>
                </div>
              ) : (
                <div className="h-11 px-3 flex items-center text-gray-500 bg-gray-50 dark:bg-gray-900 border rounded-md">
                  {t('dashboard.settings.syncDirectory.noFolderConfigured')}
                </div>
              )}
            </div>
            <Button
              onClick={handleSelectDirectory}
              variant="default"
              className="h-11 min-w-[120px]"
            >
              {t('dashboard.settings.sync.select')}
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-8">
        <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="space-y-4">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950">
                <Languages className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
              </div>
              {t('dashboard.settings.lang.title')}
            </CardTitle>
            <CardDescription className="pt-2">
              {t('dashboard.settings.lang.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4 px-6 pb-6">
            {locales.map((loc) => {
              return (
                <div
                  key={loc}
                  className={cn(
                    locale === loc ? 'bg-accent' : '',
                    'p-3 rounded-md hover:bg-accent/50 transition-colors'
                  )}
                >
                  <Link className="w-full" href={pathname} locale={loc}>
                    <span className="flex items-center gap-2">
                      {localeNames[loc]}
                      {locale === loc && (
                        <span className="text-xs text-muted-foreground">{`<--`}</span>
                      )}
                    </span>
                  </Link>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="space-y-4">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950">
                <SunMoon className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
              </div>
              {t('dashboard.settings.theme.title')}
            </CardTitle>
            <CardDescription className="pt-2">
              {t('dashboard.settings.theme.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4 px-6 pb-6 gap-1">
            <button
              key={'light'}
              onClick={() => setTheme('light')}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-left relative',
                'transition-all duration-200',
                'hover:bg-primary/10',
                theme === 'light' && 'bg-primary/10'
              )}
            >
              <div
                className={cn(
                  'shrink-0',
                  theme === 'light' ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <Sun className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start">
                <span
                  className={cn(
                    'font-medium text-sm',
                    theme === 'light' && 'text-primary'
                  )}
                >
                  {t('dashboard.settings.theme.themes.light')}
                </span>
              </div>
            </button>
            <button
              key={'dark'}
              onClick={() => setTheme('dark')}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-left relative',
                'transition-all duration-200',
                'hover:bg-primary/10',
                theme === 'dark' && 'bg-primary/10'
              )}
            >
              <div
                className={cn(
                  'shrink-0',
                  theme === 'dark' ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <Moon className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start">
                <span
                  className={cn(
                    'font-medium text-sm',
                    theme === 'dark' && 'text-primary'
                  )}
                >
                  {t('dashboard.settings.theme.themes.dark')}
                </span>
              </div>
            </button>
            <button
              key={'system'}
              onClick={() => setTheme('system')}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-left relative',
                'transition-all duration-200',
                'hover:bg-primary/10',
                theme === 'system' && 'bg-primary/10'
              )}
            >
              <div
                className={cn(
                  'shrink-0',
                  theme === 'system' ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <Monitor className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start">
                <span
                  className={cn(
                    'font-medium text-sm',
                    theme === 'system' && 'text-primary'
                  )}
                >
                  {t('dashboard.settings.theme.themes.system')}
                </span>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
