import { FC,memo } from "react";
import { LeftNavigation } from "src/components/LeftNavigation";
import { Button } from "@project/components/src/ui-kit/Button";
import { Link } from "react-router-dom";
import { NEW_APPLICATION_ROUTE } from "src/constants";
import { useLocalized } from "src/locales";

type PropsType = {
  title: string;
};

export const LeftNavigationLayout: FC<PropsType> = memo(({ title, children }) => {
  const {localizedText} = useLocalized()
  return (
    <div className=" flex flex-col my-auto">
      <div className="hidden md:flex justify-between pb-4">
        <h1 className={`text-4xl font-bold`}>{title}</h1>
        <Link to={NEW_APPLICATION_ROUTE}>
          <Button plus={true} text={localizedText('NEW_APPLICATION_LANG') } color={"red"} />
        </Link>
      </div>
      <div className="flex flex-grow w-full md:h-screen MainContainer">
        <LeftNavigation className="hidden tablet:flex border-r w-128 border rounded-primary shadow-left-navigation" />
        <div className="flex-grow border rounded-primary customScroll">{children}</div>
      </div>
    </div>
  );
});
