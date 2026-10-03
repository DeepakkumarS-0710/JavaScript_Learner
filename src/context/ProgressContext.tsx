import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ProgressValue = {
  completed: string[];
  toggleCompleted: (slug: string) => void;
  resetProgress: () => void;
};

const ProgressContext = createContext<ProgressValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useLocalStorage<string[]>('frontend-lab-progress', []);
  const toggleCompleted = (slug: string) => setCompleted((current) => current.includes(slug)
    ? current.filter((item) => item !== slug)
    : [...current, slug]);
  const resetProgress = () => setCompleted([]);

  return <ProgressContext.Provider value={{ completed, toggleCompleted, resetProgress }}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error('useProgress must be used inside ProgressProvider.');
  return value;
}
