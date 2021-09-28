import { useRootContext } from "components/RootContext";
import { observer } from "mobx-react-lite";
import { FunctionalComponent } from "preact";
import { useEffect } from "react";

export const ObservedNotification: FunctionalComponent = observer(() => {
    const {notification} = useRootContext()

    return (
        <></>
    );
});