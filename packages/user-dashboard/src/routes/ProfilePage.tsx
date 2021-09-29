import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { HOME_ROUTE } from 'constants/Routes';
import { Button } from 'components/Button';
import { CenterCardLayout } from 'layouts/CenterCardLayout';

const ProfilePage: FunctionalComponent = () => {
    return (
    <CenterCardLayout title="Мой профиль">
        <div className="flex flex-col max-w-card-small" >
            <Link href={HOME_ROUTE}>
                <Button className="my-2" text="На главную" color="secondary" />
            </Link>
        </div>
    </CenterCardLayout>
    );
};

export default ProfilePage;