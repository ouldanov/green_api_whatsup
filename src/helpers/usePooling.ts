import { useEffect, useRef } from 'react';

export function usePolling(task: () => Promise<void>, enabled = false) {
  const taskRef = useRef(task);
  useEffect(() => {
    taskRef.current = task;
  });

  useEffect(() => {
    if (!enabled) return;
    (async () => {
      try {
        await taskRef.current();
      } catch (e) {
        console.error('Polling error:', e);
      }
    })();
  }, [enabled]);
}
