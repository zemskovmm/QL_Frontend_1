import { FunctionalComponent } from "preact";
import { AppLayout } from "layouts/AppLayout";
import { Notification } from "components/Notification";
import Router, { route, RouterOnChangeArgs } from "preact-router";
import HomePage from "routes/HomePage";
import SignUpPage from "routes/SignUpPage";
import SignInPage from "routes/SignInPage";
import NotFoundPage from "routes/NotFoundPage";
import ProfilePage from "routes/ProfilePage";
import PersonalPage from "routes/PersonalPage";
import { 
    HOME_ROUTE, 
    SIGN_UP_ROUTE, 
    SIGN_IN_ROUTE, 
    PROFILE_ROUTE,
    PERSONAL_ROUTE,
    isSecureUrl
} from "constants/Routes";
import { useEffect } from "react";
import { useUserStatuseStore } from "stores/UserStatuseStore";
import { useRouterStore } from "stores/RouterStore";
import { useInternationalStore } from "stores/International";



export const Application: FunctionalComponent = () => {

    const { url, changeUrl } = useRouterStore();
    const {heartbeatAction, isUnlogined } = useUserStatuseStore();
    const {changeUrl:changeUrlInternational} = useInternationalStore()

    const handleRoute = (event:RouterOnChangeArgs) => {
        changeUrlInternational(event.url);
        changeUrl(event.url);
        heartbeatAction();
    };

    useEffect(()=>{
        if( isUnlogined && isSecureUrl(url) ){
            route( HOME_ROUTE.getRoute(), true);
        }
    },[url,isUnlogined])

    return (
        <div id="preact_root" className="h-full">
            <AppLayout>
            <Router onChange={handleRoute}>
                <HomePage path={HOME_ROUTE.route} />
                <ProfilePage path={PROFILE_ROUTE.route} />
                <SignUpPage path={SIGN_UP_ROUTE.route} />
                <SignInPage path={SIGN_IN_ROUTE.route} />
                <PersonalPage path={PERSONAL_ROUTE.route} />
                <NotFoundPage default />
            </Router>
            </AppLayout>
            <Notification/>
        </div>
    );
};