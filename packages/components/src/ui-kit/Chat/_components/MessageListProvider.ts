import { MessageType } from "./Message";
import { MessageListPage,MAX_ROW_IN_PAGE } from "./MessageListPage";


export class MessageListProvider{
    pages: Array<MessageListPage> = []

    constructor(provider?: MessageListProvider){
        if(provider){
            this.pages = provider.pages
        }
    }

    push(messages:Array<MessageType>):MessageListProvider{
        console.log("push",messages)
        if(!messages.length){
            this.pages = []
            return new MessageListProvider(this)
        }
        if(!this.pages.length){
            this.pages=[new MessageListPage(messages)]
            return new MessageListProvider(this)
        }

        if(this.pages[0].isBefor(messages)){
            if(messages.length>1){
                this.pages.unshift(new MessageListPage(messages))
                return new MessageListProvider(this)
            }
            return new MessageListProvider(this)
        }
        if(this.pages[this.pages.length-1].isAfter(messages)){
            this.pages.push(new MessageListPage(messages))
            return new MessageListProvider(this)
        }
        if(this.pages[this.pages.length-1].isCurrent(messages)){
            this.pages[this.pages.length-1]=new MessageListPage(messages)
            return new MessageListProvider(this)
        }

        this.pages=[new MessageListPage(messages)]
        return new MessageListProvider(this)
    }

    getPages(currentId:number):Array<MessageListPage|undefined>{
        for(let i=0; i<this.pages.length; i++){
            if(this.pages[i].rows[0]?.id===currentId){
                return [this.pages[i-1],this.pages[i],this.pages[i+1]]
            }
        }
        return []
    }
    getLastPages():Array<MessageListPage|undefined>{
        let i =this.pages.length-1
        return [this.pages[i-1],this.pages[i]]
    }

    checkAfterMessages(pageId:number):number{
        if(!this.pages.length){
            return 0
        }
        const page = this.pages[this.pages.length-1]
        const page2 = this.pages[this.pages.length-2]

        let isId = false
        
        if(page && page.getCurrentId() === pageId){
            isId = true
        }
        if(page2 && page2.getCurrentId() === pageId){
            isId = true
        }

        if(!isId){
            return 0
        }

        if(page.rows.length < MAX_ROW_IN_PAGE){
            return page.getCurrentId()
        }else{
            return page.getAfterId()
        }
    }

    checkBeforMessages(pageId:number):number{
        if(!this.pages.length){
            return 0
        }
        const page = this.pages[0]
        if(page && page.getCurrentId() === pageId){
            return page.getCurrentId()
        }
        return 0
    }
    isEmpty():boolean{
        return this.pages.length === 0;
    }

}