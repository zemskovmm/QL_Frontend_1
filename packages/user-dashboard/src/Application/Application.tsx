import { FunctionalComponent } from "preact";
import { AppLayout } from "layouts/AppLayout";
import { Notification } from "components/Notification";
import { RootRouter } from "./RootRouter";


export const Application: FunctionalComponent = () => {
    return (
        <div id="preact_root" className="h-full">
            <AppLayout>
                <RootRouter/>
            </AppLayout>
            <Notification/>
        </div>
    );
};