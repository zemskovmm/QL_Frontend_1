import { FC } from "react";
import { Link } from "preact-router/match";
import { Button } from "@project/components/src/ui-kit/Button";
import { CenterCardLayout } from "src/layouts/CenterCardLayout";
import { useRouterStore } from "src/stores/RouterStore";

const NotFoundPage: FC = () => {
  return (
    <CenterCardLayout title="404. Страница не найдена :(">
      <div className="flex flex-col max-w-72">
        {/*<Link href=>*/}
        {/*  <Button className="my-2" text="В профиль" color="red" />*/}
        {/*</Link>*/}
      </div>
    </CenterCardLayout>
  );
};

export default NotFoundPage;
