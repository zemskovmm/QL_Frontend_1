import { FunctionalComponent } from "preact";
import { AppLayout } from "layouts/AppLayout";
import { RootContextProvider } from "components/RootContextProvider";
import { ObservedNotification } from "components/ObservedNotification";
import { RootRouter } from "./RootRouter";


export const Application: FunctionalComponent = () => {
    return (
        <div id="preact_root" className="h-full">
            <RootContextProvider>
                <AppLayout>
                    <RootRouter/>
                </AppLayout>
                <ObservedNotification/>
            </RootContextProvider>
        </div>
    );
};