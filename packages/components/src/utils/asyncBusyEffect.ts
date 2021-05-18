import { useRef, useState } from "react";

export function useAsyncBusy(
  cb: () => Promise<void>,
  onError?: (error: any) => void
): [isBusy: boolean, cb: () => void] {
  // State is for updating the component on change
  const [isBusy, setIsBusy] = useState(false);

  // Ref is for actually tracking the CURRENT value
  const isBusyRef = useRef(false);

  const run = async () => {
    if (isBusyRef.current) return;
    isBusyRef.current = true;
    setIsBusy(true);

    try {
      await cb();
    } catch (e) {
      if (onError !== undefined) onError(e);
      else alert(e);
    } finally {
      isBusyRef.current = false;
      setIsBusy(false);
    }
  };

  return [isBusy, run];
}
