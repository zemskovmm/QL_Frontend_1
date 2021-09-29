import { FunctionalComponent } from "preact";
import { Router } from "preact-router";
import HomePage from "routes/HomePage";
import NotFoundPage from "routes/NotFoundPage";
import { AppLayout } from "layouts/AppLayout";
import { HOME_ROUTE, SIGN_UP_ROUTE, SIGN_IN_ROUTE } from "constants/Routes";
import { RootContextProvider } from "components/RootContext";
import SignUpPage from "routes/SignUpPage";
import SignInPage from "routes/SignInPage";
import { ObservedNotification } from "components/ObservedNotification";

export const Application: FunctionalComponent = () => {

    return (
        <div id="preact_root" className="h-full">
            <RootContextProvider>
                <AppLayout>
                    <Router>
                        <HomePage path={HOME_ROUTE} />
                        <SignUpPage path={SIGN_UP_ROUTE} />
                        <SignInPage path={SIGN_IN_ROUTE} />
                        <NotFoundPage default />
                    </Router>
                </AppLayout>
                <ObservedNotification/>
            </RootContextProvider>
        </div>
    );
};

