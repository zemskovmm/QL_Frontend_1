import React, { FC, useState,useEffect, useRef,UIEvent } from "react"
import { Message, MessageType } from "./Message";
import { VariableSizeList,ListOnItemsRenderedProps } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import cn from 'classnames'


export class MessageListProvider{
    min:number = 0;
    max:number = 0;
    cache: {[key:number]:MessageType} = {}

    constructor(provider?: MessageListProvider){
        if(provider){
            this.min = provider.min
            this.max = provider.max
            this.cache = provider.cache
        }
    }

    get count():number{
        return this.max-this.min
    }

    getMessage(index:number):MessageType{
        return this.cache[index+this.min]
    }

    push(messages:Array<MessageType>):MessageListProvider{
        var out = new MessageListProvider(this);
        if(messages.length===0){
            out = new MessageListProvider();
        }else if(out.count==0){
            messages.forEach((m)=>{
                out.cache[out.max++]=m
            })
        }else if(out.cache[out.max-1].id === messages[0].id){
            messages.forEach((m)=>{
                out.cache[out.max++]=m
            })
        }else if(out.cache[out.min].id === messages[messages.length-1].id){
            messages.reverse().forEach((m)=>{
                out.cache[--out.min]=m
            })
        }else{
            out = new MessageListProvider();
            messages.forEach((m)=>{
                out.cache[out.max++]=m
            })
        }
        return out;
    }
}



type PropsType = {
    className?:string;
    provider:MessageListProvider;
    onBeforeMessages:(id:number)=>void;
    onAfterMessages:(id:number)=>void;
};


export const MessageList: FC<PropsType> = ({className,provider,onBeforeMessages,onAfterMessages}) => {

    const [lastBeforId,setLastBeforId] = useState(0)
    const [lastAfterId,setLastAfterId] = useState(0)

    const getItemSize = (index:number) => 100;


    const Row = ({ index, style }: any) => {
        const message = provider.getMessage(index)
        return <div key={message.id} style={style}>
            <Message {...message} />
        </div>
    };

    const handleItemsRendered = (
        {overscanStartIndex,overscanStopIndex,visibleStartIndex,visibleStopIndex}:ListOnItemsRenderedProps
    )=>{
        if(overscanStartIndex==0){
            const beforId=provider.getMessage(overscanStartIndex).id
            if(beforId != lastBeforId){
                onBeforeMessages(beforId )
                setLastBeforId(beforId)
            }
            
        }
        if(overscanStopIndex==provider.count-1){
            const afterId= provider.getMessage(overscanStopIndex).id 
            if(afterId !=lastAfterId){
                onAfterMessages(afterId)
                setLastAfterId(afterId)
            }
            
        }
    }

    // const handleScroll = (event:UIEvent<HTMLDivElement>)=>{
    //     const offset = event.currentTarget.scrollTop-50000
    //     console.log(offset)
    //     const target:any = event.currentTarget
    //     if(offset>100 || offset<-100){
    //         target.scrollTo({top:50000,behavior:'instant'});
    //     }
    // }

    return (
        <AutoSizer>
            {/* {({ height, width }) => (
                <div className="overflow-auto" style={{height,width}} onScroll={handleScroll}>
                    <div style={{height:100000}}>
                        hello
                    </div>
                </div>
            )} */}
            

            {({ height, width }) => (
                <VariableSizeList
                    onItemsRendered={handleItemsRendered}
                    height={height}
                    width={width}
                    itemCount={provider.count}
                    itemSize={getItemSize}
                >
                    {Row}
                </VariableSizeList>
            )}
        </AutoSizer>
    )
    
    
    

    // return <div className={cn("flex flex-col gap-2",className)} >
    //     {messages.map(({author,text,date})=>{
    //         return <Message key={date.toString()} title={date.toLocaleString()} text={text} me={author === "User"}/>
    //     })}
    // </div>
};