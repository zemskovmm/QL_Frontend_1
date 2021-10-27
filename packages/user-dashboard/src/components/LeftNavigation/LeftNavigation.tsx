import { InfinityList, ListItem, ListItemType,ListBorder } from "@project/components/src/ui-kit/List";
import { FunctionalComponent } from "preact";
import { memo } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import { useLocalesStore } from "stores/LocalesStore";
import { MY_APPLICATIONS_TEMPLATE, useRouterStore } from "stores/RouterStore";
import { useApplicationsState } from "stores/ApplicationsState";
import { Link } from "preact-router";
import { useUserStatuseStore } from "stores/UserStatuseStore";
import { Text } from "@project/components/src/ui-kit/Text";
import { IconLabel } from "@project/components/src/ui-kit/IconLabel";
import USER_ICON from "@project/components/src/assets/icons/user.svg";

type PropsType = {
    className?: string;
}

export const LeftNavigation: FunctionalComponent<PropsType> = memo(({className}) => {
    const {url} = useRouterStore()
    const [isApplicationsOpen,setApplicationsOpen] = useState(false);
    const {
        PROFILE_PATH,
        SETTINGS_PATH,
    } = useRouterStore();
    const { user:{email,firstName,lastName} } = useUserStatuseStore();

    const {
        lang,
        APPLICATION_TYTLES_LANG,
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

    useEffect(()=>{
        if(MY_APPLICATIONS_TEMPLATE.isUrl(url)){
            setApplicationsOpen(true);
        }
    },[url])

    const handleItemRender = (index:number):ListItemType|undefined=>{
        onItemRender(index);
        const row = applications[index];
        if(row){
            const {id,type,status} = row;
            const date:Date = new Date() //TODO После добавления даты, получать с сервера
            return {
                id:MY_APPLICATIONS_TEMPLATE.getRoute({lang,pageId:id.toString()}), 
                text:(APPLICATION_TYTLES_LANG[type]||type.toString()).replace(":date",
                    date.toLocaleDateString()
                )
            }
        }
    }

    const handleClick = (id:string) => {
        route(id);
    }

    return (<div className={`p-4 h-full flex flex-col ${className}`}>
        <IconLabel 
            className="mt-5 mb-8"
            iconSrc={USER_ICON}
            text={`${lastName} ${firstName}`}
            subText={email}
        />
        <div className="relative flex-grow">
            <ListBorder className="absolute h-full w-full top-0 left-0 flex flex-col">
                
                <Link href={PROFILE_PATH}><ListItem id={PROFILE_PATH} text={PROFILE_LANG}/></Link>
                <Link><ListItem id="MY_APPLICATIONS_LANG" text={MY_APPLICATIONS_LANG} onClick={()=>{setApplicationsOpen(!isApplicationsOpen)}}/></Link>

                {isApplicationsOpen && <InfinityList 
                    withoutBorder
                    depth={1}
                    className="flex-shrink" 
                    count={applications.length} 
                    onClick={handleClick}
                    onItemRender={handleItemRender}
                />}

                <Link href={SETTINGS_PATH}><ListItem id={SETTINGS_PATH} text={SETTINGS_LANG}/></Link>
            </ListBorder>
        </div>
    </div>);
});