import { MessageType } from "./Message";
    
export type MessageListProviderPosition ={
    index:number
    id:number
}

export class MessageListProvider{
    rows:{[key:number]:MessageType} = {}
    min:number = 0
    max:number = 0

    constructor(provider?: MessageListProvider){
        if(provider){
            this.min = provider.min
            this.max = provider.max
            this.rows = provider.rows
        }
    }

    getCount():number{
        return this.max-this.min
    }
    isEmpty():boolean{
        return this.max-this.min === 0
    }
    getFirst():MessageType {
        return this.rows[this.min]
    }
    getLast():MessageType {
        return this.rows[this.max-1]
    }

    push(messages:Array<MessageType>):MessageListProvider{
        if(messages.length === 0){
            return new MessageListProvider()
        }
        if(this.getCount() === 0){
            messages.forEach((m)=>{
                this.rows[this.max++] = m
            })
            return new MessageListProvider(this)
        }
        if(this.getFirst().id === messages[messages.length-1].id){
            if(messages.length===1){
                return this
            }
            this.min++
            messages.reverse().forEach((m)=>{
                this.rows[--this.min] = m
            })
            return new MessageListProvider(this)
        }
        if(this.getLast().id === messages[0].id){
            if(messages.length===1){
                return this
            }
            this.max--
            messages.forEach((m)=>{
                this.rows[this.max++] = m
            })
            return new MessageListProvider(this)
        }
        this.max=0
        this.min=0
        this.rows={}
        messages.forEach((m)=>{
            this.rows[this.max++] = m
        })
        return new MessageListProvider(this)
    }

    getPageUp(index:number,maxRows:number):Array<MessageType>{
        const upPage:Array<MessageType> = []
        let min = index-maxRows
        if(min<this.min){
            min=this.min
        }
        for(let i=index-1; i>=min; i--){
            upPage.push(this.rows[i])
        }
        return upPage.reverse()
    }

    getPageDown(index:number,maxRows:number):Array<MessageType>{
        const downPage:Array<MessageType> = []
        for(let i=index; i<index+maxRows && i<this.max;i++){
            downPage.push(this.rows[i])
        }
        return downPage
    }

    getMessage(index:number):MessageType|undefined{
        return this.rows[index]
    }

    getCurrectPosition({index,id}:MessageListProviderPosition,maxRows:number): MessageListProviderPosition{
        if(this.isEmpty()){
            return {index:0,id:0}
        }
        if(index<this.min || index>=this.max || this.rows[index].id !== id){
            let newIndex = this.max - maxRows
            if(newIndex<this.min){
                newIndex = this.min
            }
            return {index:newIndex,id:this.rows[newIndex].id||0}
        }
        return {index,id}
    }

    getLastId(): number {
        return this.rows[this.max-1]?.id||0
    }

    checkBeforMessagesId({index,id}:MessageListProviderPosition,maxRows:number):number{
        if(this.rows[index]?.id !== id){
            return 0
        }
        if(index-maxRows*2-2<this.min){
            return this.rows[this.min]?.id||0
        }
        return 0;
    }
    checkAfterMessagesId({index,id}:MessageListProviderPosition,maxRows:number):number{
        if(this.rows[index]?.id !== id){
            return 0
        }
        if(index+maxRows*2+2>this.max){
            return this.rows[this.max-1]?.id||0
        }
        return 0;
    }

}