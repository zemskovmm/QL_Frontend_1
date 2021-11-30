
export class ActualState<T>{
    private needLoad = false;
    private isLoading = false;
    private props:T;
    private callback: (props:T)=>Promise<void>
    private compare: (prev:T,curr:T)=>boolean

    constructor( callback: (props:T)=>Promise<void>, defaultProps:T, compare:(prev:T,curr:T)=>boolean = ()=>false){
        this.props =  defaultProps;
        this.callback = callback;
        this.compare = compare;
    }
    
    async update(props:T):Promise<void>{
        if(this.compare(this.props,props)){
            return;
        }
        this.needLoad=true;
        this.props = props;
        if(this.isLoading){
            return;
        }
        this.isLoading = true;
        while(this.needLoad){
            this.needLoad=false;
            await this.callback(this.props);
        }
        this.isLoading = false;
    }
}