import { MessageType } from "./Message";

export const MAX_ROW_IN_PAGE = 10;

export class MessageListPage{
    rows:Array<MessageType> = []

    constructor(rows?:Array<MessageType>){
        if(rows){
            this.rows=rows
        }
    }

    getShowRow():Array<MessageType>{
        if(this.rows.length < MAX_ROW_IN_PAGE){
            return this.rows;
        }
        return this.rows.slice(0,-1)
    }
    getCurrentId():number{
        if(this.rows.length){
            return this.rows[0].id
        }
        return 0
    }
    getAfterId():number{
        if(this.rows.length){
            return this.rows[this.rows.length-1].id
        }
        return 0
    }

    isBefor(messages:Array<MessageType>):boolean{
        if(this.rows.length === 0 || messages.length===0){
            return false
        }
        if(this.rows[0].id === messages[0].id && messages.length>1){
            return false
        }
        if(this.rows[0].id === messages[messages.length-1].id){
            return true
        }
        return false
    }
    isAfter(messages:Array<MessageType>):boolean{
        if(this.rows.length === 0 || messages.length===0 ){
            return false
        }
        if(this.rows[0].id === messages[0].id && messages.length>1){
            return false
        }
        if(this.rows[this.rows.length-1].id === messages[0].id){
            return true
        }
        return false
    }
    isCurrent(messages:Array<MessageType>):boolean{
        if(this.rows.length === 0 || messages.length===0){
            return false
        }
        if(this.rows[0].id === messages[0].id){
            return true
        }
        return false
    }
}
