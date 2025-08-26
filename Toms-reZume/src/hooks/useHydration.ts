import { useEffect, useState } from 'react';

/**
 * Custom hook to handle hydration mismatch issues
 * Returns true only after component has mounted on client-side
 */
export function useHydration() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
