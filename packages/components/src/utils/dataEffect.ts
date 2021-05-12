import {useEffect, useRef, useState} from "react";
import stringify from "fast-json-stable-stringify";


interface UseDataState<TRes>
{
  data?: TRes
}

interface UseDataRef<TReq>
{
  isLoading: boolean,
  req: TReq,
  reqHash?: string;
  loadedFor?: string
}

export function useData<TReq, TRes>(req: TReq, cb: (req: TReq) => Promise<TRes>): TRes | undefined {
  const [state, setState] = useState<UseDataState<TRes>>({});

  const loadFor = stringify(req);
  const s = useRef<UseDataRef<TReq>>({isLoading: false, req: req}).current;

  s.req = req;
  s.reqHash = stringify(req);

  const loader = async () => {
    // Check if another loader instance is active
    if(s.isLoading)
      return;

    s.isLoading = true;
    try {
      while (true) {
        const loadingFor = s.reqHash;
        const data = await cb(s.req!);

        // There weren't any changes since we've sent the previous request, so we can finish
        if(s.reqHash == loadingFor)
        {
          s.loadedFor = loadingFor;
          setState({
            data: data
          })

          return;
        }
      }
    }
    catch (e) {
      console.log("Load error: " + e);
    }
    finally {
      s.isLoading = false;
    }
  }

  useEffect(() => {
    if(
      !s.isLoading
      && (
      state.data === undefined
      || s.loadedFor != s.reqHash))
      loader();
  });

  return state.data;
}
