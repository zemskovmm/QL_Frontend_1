import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { useLocalesStore } from "stores/LocalesStore";

type PropsType = {
    className?:string;
    applicationId: number;
};

export const ApplicationTab: FunctionalComponent<PropsType> = ({className, applicationId}) => {
    const {translate:{APPLICATION}} = useLocalesStore()

    const classes = [
        "flex flex-col border gap-2 p-2",
        className ? className : "",
    ].join(' ');

    return <div className={classes} >
        <Text text={APPLICATION} size="title-medium"/>
    </div>
};