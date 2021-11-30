import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { Button } from "@project/components/src/ui-kit/Button";
import { CenterCardLayout } from 'layouts/CenterCardLayout';
import { useRouterStore } from 'stores/RouterStore';

const NotFoundPage: FunctionalComponent = () => {
    const {PROFILE_PATH} = useRouterStore();
    return (
    <CenterCardLayout title="404. Страница не найдена :(">
        <div className="flex flex-col max-w-72" >
            <Link href={PROFILE_PATH}>
                <Button className="my-2" text="В профиль" color="red" />
            </Link>
        </div>
    </CenterCardLayout>
    );
};

export default NotFoundPage;
