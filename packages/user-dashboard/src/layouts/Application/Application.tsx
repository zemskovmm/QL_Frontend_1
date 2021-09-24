import { FunctionalComponent } from "preact";
import { Route, Router } from "preact-router";

import HomePage from "routes/HomePage";
import Notfound from "routes/NotFoundPage";
import SignUpPage from "routes/SignUpPage";
import SignInPage from "routes/SignInPage";
import { AppLayout } from "layouts/AppLayout";
import { HOME_ROUTE, SIGN_UP_ROUTE, SIGN_IN_ROUTE } from "constants/Routes";

export const Application: FunctionalComponent = () => {
    return (
        <div id="preact_root" className="h-full">
            <AppLayout>
                <Router>
                    <HomePage path={HOME_ROUTE} />
                    <SignUpPage path={SIGN_UP_ROUTE} />
                    <SignInPage path={SIGN_IN_ROUTE} />
                    <Notfound default />
                </Router>
            </AppLayout>
        </div>
    );
};

