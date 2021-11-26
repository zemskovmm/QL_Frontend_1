import { MessageType } from "./Message";
    
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
    isNotEmpty():boolean{
        return this.max-this.min > 0
    }
    getFirst():MessageType {
        return this.rows[this.min]
    }
    getLast():MessageType {
        return this.rows[this.max-1]
    }
    getLastIndex():number {
        if(this.isEmpty()){
            return 0;
        }
        return this.max-1
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
        if(messages.length === 1 && (this.getFirst().id==messages[0].id || this.getLast().id==messages[0].id )){
            return this
        }

        let after = false
        const afterId = this.getLast().id
        messages.forEach((m)=>{
            if(after){
                this.rows[this.max++] = m
            }else if(afterId==m.id){
                after=true
            }
        })

        if(after){
            return new MessageListProvider(this)
        }

        let befor = false
        const beforId = this.getFirst().id
        const revers = [...messages].reverse()
        revers.forEach((m)=>{
            if(befor){
                this.rows[--this.min] = m
            }else if(beforId==m.id){
                befor=true
            }
        })

        if(befor){
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

    getPage(indexMin:number,indexMax:number):Array<MessageType>{
        const page:Array<MessageType> = []
        for(let i=indexMin; i<indexMax && i<this.max;i++){
            page.push(this.rows[i])
        }
        return page
    }

    getMessage(index:number):MessageType|undefined{
        return this.rows[index]
    }

    getFirstId(): number {
        return this.rows[this.min]?.id||0
    }
    getLastId(): number {
        return this.rows[this.max-1]?.id||0
    }

}