import React, { FC, useState,useMemo, useRef,UIEvent,useLayoutEffect } from "react"
import { Message, MessageType,MIN_MESSAGE_HEIGHT } from "./Message";
import { VariableSizeList,ListOnItemsRenderedProps } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import cn from 'classnames'
import { useEffect } from "preact/hooks";
import { MessageListProvider } from "./MessageListProvider";
import { MAX_ROW_IN_PAGE } from "./MessageListPage";



class LastCalc{
    lastBeforHeight:number =  0
    lastCurrentHeight:number =  0
    lastAfterHeight:number =  0
    beforId:number =  0
    currentId:number =  0
    afterId:number =  0
}

type PropsType = {
    className?:string;
    provider:MessageListProvider;
    onBeforeMessages:(id:number)=>void;
    onAfterMessages:(id:number)=>void;
};

const MESSAGE_LIST_HEIGHT = MIN_MESSAGE_HEIGHT * MAX_ROW_IN_PAGE

export const MessageList: FC<PropsType> = ({className,provider,onBeforeMessages,onAfterMessages}) => {
    //const onAfterMessages=(id:number)=>{}
    const beforRef = useRef<HTMLDivElement>(null)
    const currentRef = useRef<HTMLDivElement>(null)
    const afterRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const lastCalc = useRef<LastCalc>(new LastCalc())
    const [currentId, setCurrentId] = useState(0)

    const [lastBeforeMessages, setLastBeforeMessages] = useState(0)
    const [lastAfterMessages, setLastAfterMessages] = useState(0)
    const [onScroll, setOnScroll] = useState(0)

    
    const [ beforRows, currentRows, afterRows] = useMemo< Array<Array<MessageType>> >(()=>{

        console.log("provider",currentId,provider.pages.map(i=>i.rows[0].id))
        let beforRows:Array<MessageType> = []
        let currentRows:Array<MessageType> = []
        let afterRows:Array<MessageType> = []

        let pages = provider.getPages(currentId)
        if(!pages[1]){
            pages = provider.getLastPages()
            if(pages[1] && pages[1].getCurrentId()!==currentId){
                setCurrentId(pages[1].getCurrentId())
            }
        }

        const [beforPage,currentPage,afterPage] = pages

        beforRows = beforPage?beforPage.getShowRow():[]
        currentRows= currentPage?currentPage.getShowRow():[]
        afterRows = afterPage?afterPage.getShowRow():[]

        return [beforRows,currentRows,afterRows]
    },[provider,currentId])

    useEffect(()=>{
        if(provider.isEmpty()){
            if(0 !=lastAfterMessages){
                setLastAfterMessages(0);
                onAfterMessages(0);
            }
            return
        }
        const beforId = provider.checkBeforMessages(currentId)
        if(beforId && beforId !=lastBeforeMessages){
            setLastBeforeMessages(beforId);
            onBeforeMessages(beforId);
            return
        }
        const afterId = provider.checkAfterMessages(currentId)
        if(afterId && afterId !=lastAfterMessages){
            setLastAfterMessages(afterId);
            onAfterMessages(afterId);
            return
        }
    },[provider,currentId,onBeforeMessages,onAfterMessages,lastAfterMessages,lastBeforeMessages])

    useLayoutEffect(()=>{
        const calc = lastCalc.current
        const target:any = listRef.current
        let scrollTop:number = target?.scrollTop || 0;
        let top:number = scrollTop;

        const listHeight = listRef.current?.clientHeight||0
        const beforHeight = beforRef.current?.clientHeight||0
        const currentHeight = currentRef.current?.clientHeight||0
        const afterHeight = afterRef.current?.clientHeight||0

        top += beforHeight -calc.lastBeforHeight
        top += currentHeight -calc.lastCurrentHeight
        //top += afterHeight -calc.lastAfterHeight
   
        calc.lastBeforHeight = beforHeight
        calc.lastCurrentHeight = currentHeight
        calc.lastAfterHeight = afterHeight

        const beforId = beforRows[0]?.id||0
        const currentId = currentRows[0]?.id||0
        const afterId = afterRows[0]?.id||0

        const allHeight = beforHeight+currentHeight+afterHeight

        console.log({top,allHeight,listHeight,m:allHeight-listHeight-10})

        if(MESSAGE_LIST_HEIGHT<allHeight){
            if( top<10 ){
                if(beforId && currentId!=beforId){
                    calc.lastAfterHeight=calc.lastCurrentHeight
                    calc.lastCurrentHeight=calc.lastBeforHeight
                    calc.lastBeforHeight=0
                    setCurrentId(beforId)
                }
            }
            if( top>allHeight-listHeight-10){
                if(afterId && currentId!=afterId){
                    top+= -calc.lastBeforHeight
                    calc.lastBeforHeight=calc.lastCurrentHeight
                    calc.lastCurrentHeight=calc.lastAfterHeight
                    calc.lastAfterHeight=0
                    setCurrentId(afterId)
                }
            }
        }
    
        if(top!=scrollTop){
            target?.scrollTo({top,behavior:'instant'});
        }
        
    },[beforRows, currentRows, afterRows, onScroll])

    const handleScroll = (event:UIEvent<HTMLDivElement>)=>{
        setOnScroll(event.currentTarget.scrollTop)
    }

    return (
        <AutoSizer>
            {({ height, width }) => (
                <div ref={listRef} 
                    className="overflow-auto" 
                    style={{height,width,maxHeight:MESSAGE_LIST_HEIGHT}} 
                    onScroll={handleScroll}
                >
                    <div ref={beforRef} style={{width}}>
                        {beforRows.map((m)=>(
                            <Message {...m} key={"k"+m.id}/>
                        ))}
                    </div>
                    <div ref={currentRef} style={{width}}>
                        {currentRows.map((m)=>(
                            <Message {...m} key={"k"+m.id}/>
                        ))}
                    </div>
                    <div ref={afterRef} style={{width}}>
                        {afterRows.map((m)=>(
                            <Message {...m} key={"k"+m.id}/>
                        ))}
                    </div>
                </div>
            )}
            

            {/* {({ height, width }) => (
                <VariableSizeList
                    onItemsRendered={handleItemsRendered}
                    height={height}
                    width={width}
                    itemCount={provider.count}
                    itemSize={getItemSize}
                >
                    {Row}
                </VariableSizeList>
            )} */}
        </AutoSizer>
    )
    
    
    

    // return <div className={cn("flex flex-col gap-2",className)} >
    //     {messages.map(({author,text,date})=>{
    //         return <Message key={date.toString()} title={date.toLocaleString()} text={text} me={author === "User"}/>
    //     })}
    // </div>
};