import { useEffect, useRef } from "react";

export function useOnce(callback: () => void | (() => void)) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      return callback();
    }
  }, []);
}
export function useOnceAsync(callback: () => Promise<void>) {
  const hasRun = useRef(false);
  const isRunning = useRef(false);

  useEffect(() => {
    const runAsync = async () => {
      if (!hasRun.current && !isRunning.current) {
        isRunning.current = true;
        hasRun.current = true;
        try {
          await callback();
        } finally {
          isRunning.current = false;
        }
      }
    };

    runAsync();
  }, []);
}
