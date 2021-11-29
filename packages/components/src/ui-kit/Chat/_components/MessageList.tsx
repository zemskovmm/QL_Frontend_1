import React, { FC, useState,useMemo, useRef,UIEvent,useLayoutEffect } from "react"
import { Message, MessageType,MIN_MESSAGE_HEIGHT } from "./Message";
import cn from 'classnames'
import { useEffect } from "preact/hooks";
import { MessageListProvider} from "./MessageListProvider";
import { maxHeaderSize } from "http";
import { RefObject } from "react-dom/node_modules/@types/react";

type Show ={
    id: number;
    min: number;
    max: number;
}

const SHOW_DEFAULT: Show = {
    id: 0,
    min: 0,
    max: 0,
}

type LastScrollCalc = {
    scrollTop:number,
    scrollId:number,
    min?:number,
    max?:number,
    last?:number,
}

const LAST_SCROLL_CALC_DEFAULT:LastScrollCalc={
    scrollTop: 0,
    scrollId: 0,
    min: undefined,
    max: undefined,
    last: undefined,
}

type PropsType = {
    className?:string;
    provider:MessageListProvider;
    onBeforeMessages:(id:number)=>void;
    onAfterMessages:(id:number)=>void;
};

const TIMER_UPDATE_MS = 3000

const getMaxRow=():number=>{
    const count = Math.floor(window.innerHeight/MIN_MESSAGE_HEIGHT)
    if(count<20){
        return 20
    }
    return count
}

export const MessageList: FC<PropsType> = ({className,provider,onBeforeMessages,onAfterMessages}) => {
    const listRef = useRef<HTMLDivElement>(null)
    const rowsRef = useRef<HTMLDivElement>(null)

    const [maxRow,setMaxRow] = useState<number>(getMaxRow())

    const [show,setShow] = useState<Show>(SHOW_DEFAULT)
    const lastScrollCalc = useRef<LastScrollCalc>(LAST_SCROLL_CALC_DEFAULT)

    useEffect(()=>{
        let timerId = setInterval(() =>{
            lastScrollCalc.current.min = undefined
            lastScrollCalc.current.max = undefined
            setShow({...show})
        },TIMER_UPDATE_MS);
        return ()=>clearInterval(timerId)
    },[provider,show])

    const rowsPage = useMemo< Array<MessageType> >(()=>{
        const id = provider.getMessage(0)?.id||0
        if(id != show.id){
            const min = provider.getLastIndex()
            const max = min
            setShow({id,min,max})
            lastScrollCalc.current=LAST_SCROLL_CALC_DEFAULT
            return []
        }

        return provider.getPage(show.min,show.max)
    },[provider,show])

    useLayoutEffect(()=>{
        const target:any = listRef.current
        const scrollTop:number = target?.scrollTop || 0;
  
        const calc = lastScrollCalc.current;

        const listHeight = listRef.current?.clientHeight||0
        const rowsHeight = rowsRef.current?.clientHeight||0

        let {min,max} = show;

        if(calc.scrollId){
            const messages = Array.from(rowsRef.current?.children||[]).map((e)=>e.clientHeight)
            let i = 0
            let h = 0
            while(i<messages.length && provider.getMessage(min+i)?.id !== calc.scrollId){
                h+=messages[i++]
            }
            target?.scrollTo({top:h+calc.scrollTop,behavior:'instant'});
            calc.scrollId = 0
            calc.scrollTop = 0
            setShow({...show})
            return
        }

        if(provider.isEmpty()){
            if(calc.max !== provider.max){
                onAfterMessages(provider.getLastId())
                calc.max = provider.max
            }
        }else{
            const isTop = scrollTop<MIN_MESSAGE_HEIGHT
            const isBottom = scrollTop+listHeight>rowsHeight-MIN_MESSAGE_HEIGHT
            const maxHeight = window.innerHeight;
            
            if(isTop){
                min-=maxRow
                if(min<provider.min){
                    min = provider.min
                }
                if(calc.min !== provider.min){
                    onBeforeMessages(provider.getFirstId())
                    calc.min = provider.min
                }
            }
            if(isBottom){
                max+=maxRow
                if(max>provider.max){
                    max = provider.max
                }
                if(calc.max !== provider.max){
                    onAfterMessages(provider.getLastId())
                    calc.max = provider.max
                }
            }

            if(max !== show.max || min !== show.min){
                const messages = Array.from(rowsRef.current?.children||[]).map((e)=>e.clientHeight)
                if(scrollTop>maxHeight){
                    let i = 0
                    let h = 0
                    const maxH = scrollTop-maxHeight
                    while(i<messages.length && h+messages[i]<maxH){
                        h+=messages[i++]
                    }
                    const minIndex = show.min+i;
                    if(min<minIndex){
                        min=minIndex
                    }
                }

                if(rowsHeight>scrollTop+listHeight+maxHeight){
                    let i = 0
                    let h = 0
                    const maxH = rowsHeight-(scrollTop+listHeight+maxHeight)
                    const lastPos = messages.length-1
                    while(i<messages.length && h+messages[lastPos-i]<maxH){
                        h+=messages[lastPos-i++]
                    }
                    const maxIndex = show.max-i;
                    if(max>maxIndex){
                        max=maxIndex
                    }
                }

                if(max !== show.max || min !== show.min){
                    let i = 0
                    let h = 0
                    while(i<messages.length && h+messages[i]<scrollTop){
                        h+=messages[i++]
                    }
                    calc.scrollId = provider.getMessage(show.min+i)?.id||0
                    calc.scrollTop = scrollTop-h
                }
            }
            if(calc.last !== provider.max){
                if(isBottom && calc.last === show.max){
                    calc.scrollId = -1
                    calc.scrollTop = 0
                    max = provider.max
                    min= max - maxRow
                    if(min<provider.min){
                        min = provider.min
                    }
                }
                calc.last = provider.max
            }
        }

      
        if( show.min !== min || show.max !== max ){
            setShow({...show,min,max})
        }
        
    },[show,provider,onBeforeMessages,onAfterMessages])

    const handleScroll = ()=>{
        setShow({...show})
    }

    return (
        <div ref={listRef} 
            className={cn("overflow-auto border border-bdsecondary rounded-sm customScroll",className)}
            onScroll={handleScroll}
        >
            <div className="flex flex-col w-full" ref={rowsRef} >
                {rowsPage.map((m)=>(
                    <Message {...m} key={"m_key_"+m.id}/>
                ))}
            </div>
        </div>
    )
};