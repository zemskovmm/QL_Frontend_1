import { MapStore, ReadableAtom } from "nanostores"
import { useEffect, useState } from "react"


export function useStore<T>(store:ReadableAtom<T>):T{
    const [state, setState] = useState<T>(store.get())
    useEffect(()=>{
        let mounted = true;
        const unListen = store.listen((store)=>{
            mounted && setState(store)
        })
        return ()=>{
            mounted= false
            unListen()
        }
    })
    return state;
}