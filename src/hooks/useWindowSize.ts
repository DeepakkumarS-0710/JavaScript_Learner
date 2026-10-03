import { useEffect, useState } from 'react';

type WindowSize = { width: number; height: number };

export function useWindowSize(): WindowSize {
  const readSize = (): WindowSize => ({ width: window.innerWidth, height: window.innerHeight });
  const [size, setSize] = useState<WindowSize>(readSize);

  useEffect(() => {
    const handleResize = () => setSize(readSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
