import { Text } from "@project/components/src/ui-kit/Text";
import { List, ListItemType } from "@project/components/src/ui-kit/List";
import { FunctionalComponent } from "preact";
import { memo } from "preact/compat";
import { useLocalesStore } from "stores/LocalesStore";
import { MY_APPLICATIONS_TEMPLATE, useRouterStore } from "stores/RouterStore";
import { route } from "preact-router";

type PropsType = {
    className?: string;
}

export const LeftNavigation: FunctionalComponent<PropsType> = memo(({className}) => {
    const {
        PROFILE_PATH,
        SETTINGS_TEMPLATE,
    } = useRouterStore();

    const {lang,translate:{
        profile,
        myApplications,
        settings,
    }} = useLocalesStore();

    const items:Array<ListItemType> = [
        {id:PROFILE_PATH, text:profile },
        {id:MY_APPLICATIONS_TEMPLATE.getRoute({lang,pageId:"0"}), text:myApplications },
        {id:SETTINGS_TEMPLATE, text:settings },
    ]

    const handleClick = (id:string) => {
        route(id);
    }

    return (
        <List className={className} items={items} onClick={handleClick}/>
    );
});