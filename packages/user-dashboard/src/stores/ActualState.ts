import { effect } from "nanostores";


export class ActualState<T>{

    private needLoad = false;
    private isLoading = false;
    private props:T;
    private callback: (props:T)=>Promise<void>

    constructor( callback: (props:T)=>Promise<void>, defaultProps:T ){
        this.props =  defaultProps;
        this.callback = callback;
    }
    
    async update(props:T):Promise<void>{
        this.props = props;
        this.needLoad=true;
        if(this.isLoading){
            return;
        }
        this.isLoading = true;
        await effect(async()=>{
            while(this.needLoad){
                this.needLoad=false;
                await this.callback(this.props);
            }
        })
        this.isLoading = false;
    }
}