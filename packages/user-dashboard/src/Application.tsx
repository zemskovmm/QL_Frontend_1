import { FunctionalComponent } from "preact";
import { AppLayout } from "layouts/AppLayout";
import { Notification } from "components/Notification";
import Router, { route } from "preact-router";
import HomePage from "routes/HomePage";
import SignUpPage from "routes/SignUpPage";
import SignInPage from "routes/SignInPage";
import NotFoundPage from "routes/NotFoundPage";
import ProfilePage from "routes/ProfilePage";
import PersonalPage from "routes/PersonalPage";
import { 
    useRouterStore,
    HOME_TEMPLATE, 
    SIGN_UP_TEMPLATE, 
    SIGN_IN_TEMPLATE, 
    PROFILE_TEMPLATE,
    PERSONAL_TEMPLATE,
} from "stores/RouterStore";
import { useEffect } from "preact/hooks";
import { useUserStatuseStore } from "stores/UserStatuseStore";
import { isSecureUrl } from "stores/RouterStore/_utils";

export const Application: FunctionalComponent = () => {
    const { url, changeUrl, HOME_PATH } = useRouterStore();
    const { isUnlogined } = useUserStatuseStore();

    useEffect(()=>{
        if( isUnlogined && isSecureUrl(url) ){
            route( HOME_PATH, true);
        }
    },[url,isUnlogined,HOME_PATH])

    return (
        <div id="preact_root" className="h-full">
            <AppLayout>
            <Router onChange={changeUrl}>
                <HomePage path={HOME_TEMPLATE.path} />
                <ProfilePage path={PROFILE_TEMPLATE.path} />
                <SignUpPage path={SIGN_UP_TEMPLATE.path} />
                <SignInPage path={SIGN_IN_TEMPLATE.path} />
                <PersonalPage path={PERSONAL_TEMPLATE.path} />
                <NotFoundPage default />
            </Router>
            </AppLayout>
            <Notification/>
        </div>
    );
};