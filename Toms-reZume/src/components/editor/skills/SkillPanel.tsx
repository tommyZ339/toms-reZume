'use client';
import { useResumeStore } from '@/store/useResumeStore';
import { cn } from '@/lib/utils';
import Field from '../Field';

const AlbumInfoPanel = () => {
  const { activeResume, updateAlbumInfoContent } = useResumeStore();
  const { albumInfoContent = '' } = activeResume || {};
  const handleChange = (value: string) => {
    updateAlbumInfoContent(value);
  };

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        'bg-white',
        'dark:bg-neutral-900/30',
        'border-gray-100 dark:border-neutral-800'
      )}
    >
      <Field
        value={albumInfoContent}
        onChange={handleChange}
        type="editor"
        placeholder="Put in place about the basic info you want to include about this album..."
      />
    </div>
  );
};

export default AlbumInfoPanel;
