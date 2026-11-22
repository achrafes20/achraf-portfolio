import { useCallback, useEffect, useState } from "react";

const TOAST_DURATION = 2800;

export function useToast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), TOAST_DURATION);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = useCallback((message, type = "info") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  return { toast, notify };
}
