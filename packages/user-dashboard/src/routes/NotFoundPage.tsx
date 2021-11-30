import { FC } from "react";
import { CenterCardLayout } from "src/layouts/CenterCardLayout";

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
