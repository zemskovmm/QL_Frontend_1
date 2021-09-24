import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { HOME_ROUTE } from 'constants/Routes';

const NotFoundPage: FunctionalComponent = () => {
    return (
        <div>
            <h1>Error 404</h1>
            <Link href={HOME_ROUTE}>
                <h4>Back to Home</h4>
            </Link>
        </div>
    );
};

export default NotFoundPage;
