import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { memo } from "preact/compat";
import { LeftNavigation } from "components/LeftNavigation";
import { Button } from "@project/components/src/ui-kit/Button";
import { useLocalesStore } from "stores/LocalesStore";
import { Link } from "preact-router";
import { useRouterStore } from "stores/RouterStore";

type PropsType = {
    title:string;
}

export const LeftNavigationLayout: FunctionalComponent<PropsType> = memo(({title, children}) => {
    const { NEW_APPLICATION_LANG } = useLocalesStore();
    const { NEW_APPLICATION_PATH } = useRouterStore();

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between py-4" >
                <Text text={title} size="title-large"/>
                <Link href={NEW_APPLICATION_PATH}>
                    <Button text={NEW_APPLICATION_LANG} />
                </Link>
            </div>
            <div className="flex flex-grow w-full border">
                <LeftNavigation className="hidden tablet:flex border-r w-128"/>
                <div className="flex-grow">{children}</div>
            </div>
        </div>
    );
});