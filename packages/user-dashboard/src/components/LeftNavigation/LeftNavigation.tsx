import { InfinityList, List, ListItemType } from "@project/components/src/ui-kit/List";
import { FunctionalComponent } from "preact";
import { memo } from "preact/compat";
import { useEffect } from "preact/hooks";
import { route } from "preact-router";
import { useLocalesStore } from "stores/LocalesStore";
import { MY_APPLICATIONS_TEMPLATE, useRouterStore } from "stores/RouterStore";

import { TOTAL_APPLICATIONS, useApplicationsState } from "stores/ApplicationsState";
import { ApplicationDto } from "@project/components/src/interfaces/ApplicationDto";
import { Button } from "@project/components/src/ui-kit/Button";
import { Link } from "preact-router/match";

type PropsType = {
    className?: string;
}

export const LeftNavigation: FunctionalComponent<PropsType> = memo(({className}) => {
    const {
        PROFILE_PATH,
        SETTINGS_PATH,
    } = useRouterStore();

    const {
        lang,
        PROFILE_LANG,
        MY_APPLICATIONS_LANG,
        SETTINGS_LANG,
    } = useLocalesStore();

    const {
        applications, 
        onItemRender,
        getApplications,
    } = useApplicationsState();

    useEffect(()=>{
        getApplications();
    },[])

    const myApplicationsList:Array<ListItemType> = applications.map((applications,index)=>{
        if(applications){
            const {id,type,status} = applications;
            return {
                id:MY_APPLICATIONS_TEMPLATE.getRoute({lang,pageId:id.toString()}), 
                text:`${id}${type} ${status}` 
            }
        }
        return {
            id:`Loading-${index}`, 
            text:'Loading...' 
        }
    });

    // const items:Array<ListItemType> = [
    //     {depth:0, id:PROFILE_PATH, text:PROFILE_LANG },
    //     {depth:0, id:MY_APPLICATIONS_TEMPLATE.getRoute({lang,pageId:"0"}), text:MY_APPLICATIONS_LANG},
    //     ...myApplicationsList,
    //     {depth:0, id:SETTINGS_PATH, text:SETTINGS_LANG },
    // ]

    const handleClick = (id:string) => {
        route(id);
    }

    return (<div className="flex flex-col">
        <Link href={PROFILE_PATH}><button>PROFILE_LANG</button></Link>
        <button>MY_APPLICATIONS_LANG</button>
        <InfinityList 
            className="flex-grow" 
            items={myApplicationsList} 
            onClick={handleClick}
            onItemRender={onItemRender}
        />
        <Link href={SETTINGS_PATH}><button>SETTINGS_LANG</button></Link>
    </div>);
});