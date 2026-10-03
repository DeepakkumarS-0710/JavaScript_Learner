import { useEffect, useState } from 'react';

export type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    async function load() {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`The server returned ${response.status}.`);
        const data = (await response.json()) as T;
        setState({ data, loading: false, error: null });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setState({ data: null, loading: false, error: 'We could not load this data. Check your connection and try again.' });
      }
    }

    void load();
    return () => controller.abort();
  }, [url]);

  return state;
}
