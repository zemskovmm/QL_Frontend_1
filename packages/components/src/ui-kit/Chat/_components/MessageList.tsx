import React, { FC, useState,useMemo, useRef,UIEvent,useLayoutEffect } from "react"
import { Message, MessageType,MIN_MESSAGE_HEIGHT } from "./Message";
import { VariableSizeList,ListOnItemsRenderedProps } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import cn from 'classnames'
import { useEffect } from "preact/hooks";
import { MessageListProvider,MessageListProviderPosition } from "./MessageListProvider";
import { maxHeaderSize } from "http";
import { RefObject } from "react-dom/node_modules/@types/react";

type Pages ={
    upPage:Array<MessageType>
    showPage:Array<MessageType>
    downPage:Array<MessageType>
}

type Show ={
    id: number;
    min: number;
    max: number;
    upCount: number;
    downCount: number;
}

const SHOW_DEFAULT: Show = {
    id: 0,
    min: 0,
    max: 0,
    upCount: 0,
    downCount: 0,
}

type LastScrollCalc = {
    top:number,
    toScroll:number,
    min?:number,
    max?:number,
}

const LAST_SCROLL_CALC_DEFAULT:LastScrollCalc={
    top:0,
    toScroll:0,
    min: undefined,
    max: undefined,
}

type PropsType = {
    className?:string;
    provider:MessageListProvider;
    onBeforeMessages:(id:number)=>void;
    onAfterMessages:(id:number)=>void;
};

const TIMER_UPDATE_MS = 3000
const MAX_CHANGE_ROW = 20

export const MessageList: FC<PropsType> = ({className,provider,onBeforeMessages,onAfterMessages}) => {
    const listRef = useRef<HTMLDivElement>(null)
    const upRef = useRef<HTMLDivElement>(null)
    const showRef = useRef<HTMLDivElement>(null)
    const downRef = useRef<HTMLDivElement>(null)

    const [show,setShow] = useState<Show>(SHOW_DEFAULT)
  
    const [onScroll, setOnScroll] = useState(0)
    const lastScrollCalc = useRef<LastScrollCalc>(LAST_SCROLL_CALC_DEFAULT)

    useEffect(()=>{
        let timerId = setInterval(() =>{
            onAfterMessages(provider.getLastId())
        },TIMER_UPDATE_MS);
        return ()=>clearInterval(timerId)
    },[provider,onAfterMessages])

    const {upPage,showPage,downPage} = useMemo< Pages >(()=>{
        const id = provider.getMessage(0)?.id||0
        if(id != show.id){
            const min = provider.getLastIndex()
            const max = min
            setShow({...SHOW_DEFAULT,id,min,max})
            lastScrollCalc.current=LAST_SCROLL_CALC_DEFAULT
            return {upPage:[],showPage:[],downPage:[]}
        }

        return {
            upPage: provider.getPageUp(show.min,show.upCount),
            showPage: provider.getPageDown(show.min,show.max-show.min),
            downPage: provider.getPageDown(show.max,show.downCount),
        }
    },[provider,show])

    useLayoutEffect(()=>{
        if(!show.id){
            return
        }
        const target:any = listRef.current
        let scrollTop:number = target?.scrollTop || 0;
  
        const calc = lastScrollCalc.current;

        const listHeight = listRef.current?.clientHeight||0
        const upHeight = upRef.current?.clientHeight||0
        const showHeight = showRef.current?.clientHeight||0
        const downHeight = downRef.current?.clientHeight||0
        const allShowHeight = showHeight+MIN_MESSAGE_HEIGHT*2
        const allHeight = showHeight
            +(downHeight>MIN_MESSAGE_HEIGHT?downHeight:MIN_MESSAGE_HEIGHT)
            +(upHeight>MIN_MESSAGE_HEIGHT?upHeight:MIN_MESSAGE_HEIGHT)
        const maxHeight = listHeight*2

        if(calc.toScroll!=0){
            scrollTop+=calc.toScroll;
            target?.scrollTo({top:scrollTop,behavior:'instant'});
            calc.toScroll=0;
            calc.top = scrollTop;
        }

        let {min,max,upCount,downCount} = show;

        upCount=0
        downCount=0

        const isTop = scrollTop<MIN_MESSAGE_HEIGHT
        const isBottom = scrollTop+listHeight>allShowHeight-MIN_MESSAGE_HEIGHT
        const isMaxSize = allHeight>maxHeight

   
        if(upPage.length>0 || downPage.length>0){
            if(isBottom && max === calc.max){
                calc.toScroll+=allHeight
            }else {
                calc.toScroll+= upHeight;
            }
            min-=upPage.length
            max+=downPage.length
        }else{
            if(isTop){
                upCount = MAX_CHANGE_ROW;
            }
            if(isBottom){
                downCount = MAX_CHANGE_ROW;
            }

            if(isMaxSize && showPage.length>MAX_CHANGE_ROW){
                const messages = [
                    ...Array.from(upRef.current?.children||[]).map((e)=>e.clientHeight),
                    ...Array.from(showRef.current?.children||[]).map((e)=>e.clientHeight),
                    ...Array.from(downRef.current?.children||[]).map((e)=>e.clientHeight),
                ]
                if(isTop && !isBottom ){
                    let height = 0
                    let count = 0
    
                    for(let i=0; i < messages.length && height<maxHeight; i++){
                        height+=messages[i]
                        count = i
                    }
                    max-= messages.length-count
                }
                if(isBottom && !isTop ){
                    
                    let height = 0
                    let count = 0
                    const revers = messages.reverse()
                    for(let i=0; i < revers.length && height<maxHeight; i++){
                        height+=revers[i]
                        count = i
                    }
                    
                    min+= revers.length-count
                    target?.scrollTo({top:target?.scrollTop-(allShowHeight-height),behavior:'instant'});
                }
            }
        }

        if(allShowHeight<listHeight){
            upCount = MAX_CHANGE_ROW;
            downCount = MAX_CHANGE_ROW;
        }

        if( isTop ){
            if(provider.isNotEmpty() && calc.min !== provider.min){
                onBeforeMessages(provider.getFirstId())
            }
            calc.min = provider.min
        }
        if( isBottom ){
            if(calc.max !== provider.max){
                onAfterMessages(provider.getLastId())
            }
            calc.max = provider.max
        }

        if(
            show.min !== min ||
            show.max !== max ||
            show.upCount !== upCount ||
            show.downCount !== downCount
        ){
            setShow({...show,min,max,upCount,downCount })
        }
        
    },[onScroll,show,provider,onBeforeMessages,onAfterMessages])

    const handleScroll = (event:UIEvent<HTMLDivElement>)=>{
        setOnScroll(event.currentTarget.scrollTop)
    }

    return (
        <div ref={listRef} 
            className={cn("overflow-auto border border-bdsecondary rounded-sm customScroll",className)}
            onScroll={handleScroll}
        >
            <div className="relative overflow-hidden w-full" style={{height:MIN_MESSAGE_HEIGHT}}>
                <div className="absolute left-0 bottom-0 w-full flex flex-col"  ref={upRef} >
                    {upPage.map((m)=>(
                        <Message {...m} key={"k"+m.id}/>
                    ))}
                </div>
            </div>
            <div className="relative flex flex-col w-full" ref={showRef} >
                {showPage.map((m)=>(
                    <Message {...m} key={"k"+m.id}/>
                ))}
            </div>
            <div className="relative overflow-hidden w-full" style={{height:MIN_MESSAGE_HEIGHT}}>
                <div className="absolute left-0 top-0 w-full flex flex-col"  ref={downRef} >
                    {downPage.map((m)=>(
                        <Message {...m} key={"k"+m.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
};