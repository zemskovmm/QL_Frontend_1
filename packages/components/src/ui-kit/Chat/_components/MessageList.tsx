import React, { FC, useState,useMemo, useRef,UIEvent,useLayoutEffect } from "react"
import { Message, MessageType,MIN_MESSAGE_HEIGHT } from "./Message";
import { VariableSizeList,ListOnItemsRenderedProps } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import cn from 'classnames'
import { useEffect } from "preact/hooks";
import { MessageListProvider,MessageListProviderPosition } from "./MessageListProvider";

type Pages ={
    upPrevPage:Array<MessageType>
    upPage:Array<MessageType>
    downPage:Array<MessageType>
    downPrevPage:Array<MessageType>
}

type LastScrollCalc = {
    top:number,
    upHeight:number,
    downHeight:number,
}

type PropsType = {
    className?:string;
    provider:MessageListProvider;
    onBeforeMessages:(id:number)=>void;
    onAfterMessages:(id:number)=>void;
};

const getMaxRows=():number=>{
    let rows = Math.floor(window.screen.height/MIN_MESSAGE_HEIGHT)+3;
    if(rows<10){
        rows=0;
    }
    return rows;
}

const TIMER_UPDATE_MS = 3000

export const MessageList: FC<PropsType> = ({className,provider,onBeforeMessages,onAfterMessages}) => {
    const listRef = useRef<HTMLDivElement>(null)
    const upPrevRef = useRef<HTMLDivElement>(null)
    const upRef = useRef<HTMLDivElement>(null)
    const downRef = useRef<HTMLDivElement>(null)
    const downPrevRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState<MessageListProviderPosition>({index:0,id:0})

    const [lastBeforeMessages, setLastBeforeMessages] = useState(0)
    const [lastAfterMessages, setLastAfterMessages] = useState(0)
    const [onScroll, setOnScroll] = useState(0)
    const [maxCountRow, setMaxCountRow] = useState(getMaxRows())
    const lastScrollCalc = useRef<LastScrollCalc>({top:0,upHeight:0,downHeight:0})

    useEffect(()=>{
        let timerId = setInterval(() =>{
            onAfterMessages(provider.getLastId())
        },TIMER_UPDATE_MS);
        return ()=>clearInterval(timerId)
    },[provider,onAfterMessages])

    const {upPrevPage,upPage,downPage,downPrevPage} = useMemo< Pages >(()=>{

        const newPosition = provider.getCurrectPosition(position,maxCountRow)
        if(position.id !== newPosition.id || position.index !== newPosition.index){
            setPosition(newPosition)
            return {upPrevPage:[],upPage:[],downPage:[],downPrevPage:[]}
        }

        let upPrevPage:Array<MessageType> = provider.getPageUp(position.index-maxCountRow,maxCountRow)
        let upPage:Array<MessageType> = provider.getPageUp(position.index,maxCountRow)
        let downPage:Array<MessageType> = provider.getPageDown(position.index,maxCountRow)
        let downPrevPage:Array<MessageType> = provider.getPageDown(position.index+maxCountRow,maxCountRow)

        return {upPrevPage,upPage,downPage,downPrevPage}
    },[provider,position,maxCountRow])

    useEffect(()=>{
        if(provider.isEmpty()){
            if(0 !=lastAfterMessages){
                setLastAfterMessages(0);
                onAfterMessages(0);
            }
            return
        }
        const beforId = provider.checkBeforMessagesId(position,maxCountRow)
        if(beforId && beforId !=lastBeforeMessages){
            setLastBeforeMessages(beforId);
            onBeforeMessages(beforId);
            return
        }
        const afterId = provider.checkAfterMessagesId(position,maxCountRow)
        if(afterId && afterId !=lastAfterMessages){
            setLastAfterMessages(afterId);
            onAfterMessages(afterId);
            return
        }
    },[provider,maxCountRow,position,onBeforeMessages,onAfterMessages,lastAfterMessages,lastBeforeMessages])

    useLayoutEffect(()=>{
        const target:any = listRef.current
        let scrollTop:number = target?.scrollTop || 0;
        let top:number = scrollTop;
        const calc = lastScrollCalc.current

        const listHeight = listRef.current?.clientHeight||0
        const upPrevHeight = upPrevRef.current?.clientHeight||0
        const upHeight = upRef.current?.clientHeight||0
        const downHeight = downRef.current?.clientHeight||0
        const downPrevHeight = downPrevRef.current?.clientHeight||0
        const allHeight = upHeight+downHeight+MIN_MESSAGE_HEIGHT*2

        if(maxCountRow<getMaxRows()){
            setMaxCountRow(getMaxRows());
        }


        top += upHeight -calc.upHeight
        top += downHeight -calc.downHeight

        if(top!=scrollTop){
            calc.top = top
        }

        calc.upHeight = upHeight
        calc.downHeight = downHeight

        if(listHeight<allHeight){
            if(top<calc.top && top<MIN_MESSAGE_HEIGHT && upPrevPage.length>0 && upPage.length>0){
                const index = position.index - upPage.length
                const id = provider.getMessage(index)?.id||0
                if(id){
                    top+= upPrevHeight
                    calc.top=top
                    calc.downHeight = upHeight
                    calc.upHeight = upPrevHeight
                    setPosition({index,id})
                }
            }
            if(top>calc.top && top>allHeight-listHeight-MIN_MESSAGE_HEIGHT && downPrevPage.length>0 && downPage.length>0){
                const index = position.index + downPage.length
                const id = provider.getMessage(index)?.id||0
                if(id){
                    top-= upHeight
                    calc.top=top
                    calc.upHeight = downHeight
                    calc.downHeight = downPrevHeight
                    setPosition({index,id})
                }
            }
            if(top!=scrollTop && top<MIN_MESSAGE_HEIGHT){
                top=MIN_MESSAGE_HEIGHT;
            }
            if(top!=scrollTop && top>allHeight-MIN_MESSAGE_HEIGHT){
                top=allHeight-MIN_MESSAGE_HEIGHT;
            }
        }
        if(top!=scrollTop){
            target?.scrollTo({top,behavior:'instant'});
        }
        calc.top = top
        
    },[onScroll,maxCountRow,provider,position,upPrevPage,upPage,downPage,downPrevPage])

    const handleScroll = (event:UIEvent<HTMLDivElement>)=>{
        setOnScroll(event.currentTarget.scrollTop)
    }

    return (
        <div ref={listRef} 
            className={cn("overflow-auto border border-bdsecondary rounded-sm customScroll",className)}
            onScroll={handleScroll}
        >
            <div className="relative overflow-hidden w-full" style={{height:MIN_MESSAGE_HEIGHT}}>
                <div className="absolute left-0  bottom-0 w-full flex flex-col"  ref={upPrevRef} >
                    {upPrevPage.map((m)=>(
                        <Message {...m} key={"k"+m.id}/>
                    ))}
                </div>
            </div>
            <div className="relative flex flex-col w-full"  ref={upRef} >
                {upPage.map((m)=>(
                    <Message {...m} key={"k"+m.id}/>
                ))}
            </div>
            <div className="relative flex flex-col w-full"  ref={downRef} >
                {downPage.map((m)=>(
                    <Message {...m} key={"k"+m.id}/>
                ))}
            </div>
            <div className="relative overflow-hidden w-full" style={{height:MIN_MESSAGE_HEIGHT}}>
                <div className="absolute left-0 top-0 w-full flex flex-col"  ref={downPrevRef} >
                    {downPrevPage.map((m)=>(
                        <Message {...m} key={"k"+m.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
};