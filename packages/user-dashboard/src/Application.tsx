import { FunctionalComponent } from "preact";
import { AppLayout } from "layouts/AppLayout";
import { Notification } from "components/Notification";
import Router, { route, RouterOnChangeArgs } from "preact-router";
import HomePage from "routes/HomePage";
import SignUpPage from "routes/SignUpPage";
import SignInPage from "routes/SignInPage";
import NotFoundPage from "routes/NotFoundPage";
import ProfilePage from "routes/ProfilePage";
import { 
    HOME_ROUTE, 
    SIGN_UP_ROUTE, 
    SIGN_IN_ROUTE, 
    PROFILE_ROUTE,
    SecureRoutes
} from "constants/Routes";
import { useEffect } from "react";
import { useUserStatuseStore } from "stores/UserStatuseStore";
import { useRouterStore } from "stores/RouterStore";


export const Application: FunctionalComponent = () => {

    const { url, changeUrl } = useRouterStore();
    const {heartbeatAction, isUnlogined } = useUserStatuseStore();

    const handleRoute = (event:RouterOnChangeArgs) => {
        changeUrl(event.url);
        heartbeatAction();
    };

    useEffect(()=>{
        if(isUnlogined && SecureRoutes.includes(url)){
            route( SIGN_IN_ROUTE, true);
        }
    },[url,isUnlogined])

    return (
        <div id="preact_root" className="h-full">
            <AppLayout>
            <Router onChange={handleRoute}>
                <HomePage path={HOME_ROUTE} />
                <ProfilePage path={PROFILE_ROUTE} />
                <SignUpPage path={SIGN_UP_ROUTE} />
                <SignInPage path={SIGN_IN_ROUTE} />
                <NotFoundPage default />
            </Router>
            </AppLayout>
            <Notification/>
        </div>
    );
};