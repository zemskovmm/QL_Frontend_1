import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { memo } from "preact/compat";
import { LeftNavigation } from "components/LeftNavigation";

type PropsType = {
    title:string;
}

export const LeftNavigationLayout: FunctionalComponent<PropsType> = memo(({title, children}) => {

    return (
        <div className="h-full flex flex-col">
            <Text text={title} size="title-large"/>
            <div className="flex-grow flex w-full border">
                <LeftNavigation className="border-r"/>
                <div className="flex-grow">{children}</div>
            </div>
        </div>
    );
});