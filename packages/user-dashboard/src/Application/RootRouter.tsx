import { useRootContext } from "components/RootContextProvider";
import { observer } from "mobx-react-lite";
import { FunctionalComponent } from "preact";
import Router, { route, RouterOnChangeArgs } from "preact-router";
import HomePage from "routes/HomePage";
import ProfilePage from "routes/ProfilePage";
import SignUpPage from "routes/SignUpPage";
import SignInPage from "routes/SignInPage";
import NotFoundPage from "routes/NotFoundPage";
import { 
    HOME_ROUTE, 
    SIGN_UP_ROUTE, 
    SIGN_IN_ROUTE, 
    PROFILE_ROUTE 
} from "constants/Routes";


export const RootRouter: FunctionalComponent = observer(() => {
    const {heartbeatAction} = useRootContext();

    const handleRoute = async (event:RouterOnChangeArgs) => {
        switch (event.url) {
          case PROFILE_ROUTE:
            if ( await heartbeatAction() ) route( HOME_ROUTE, true);
            break;
        }
    };

    return (
        <Router onChange={handleRoute}>
            <HomePage path={HOME_ROUTE} />
            <ProfilePage path={PROFILE_ROUTE} />
            <SignUpPage path={SIGN_UP_ROUTE} />
            <SignInPage path={SIGN_IN_ROUTE} />
            <NotFoundPage default />
        </Router>
    )
});