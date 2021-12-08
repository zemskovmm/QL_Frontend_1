import { FC, memo } from "react";
import { LeftNavigation } from "src/components/LeftNavigation";
import { Button } from "@project/components/src/ui-kit/Button";
import { Link } from "react-router-dom";
import { NEW_APPLICATION_ROUTE } from "src/constants";
import { useLocalized } from "src/locales";
import { Text } from "@project/components/src/ui-kit/Text";

type PropsType = {
  title: string;
};

export const LeftNavigationLayout: FC<PropsType> = memo(({ title, children }) => {
  const { localizedText } = useLocalized();
  return (
    <div className="flex flex-col w-full h-full md:h-auto">
      <div className="hidden md:flex md:justify-between md:pb-4">
        <Text text={title} weight="bold" size="title-large" />
        <Link to={NEW_APPLICATION_ROUTE}>
          <Button plus={true} text={localizedText("NEW_APPLICATION_LANG")} color={"red"} />
        </Link>
      </div>
      <div className="flex h-full md:h-128">
        <LeftNavigation className="hidden md:flex border-r w-128 border rounded-primary shadow-left-navigation" />
        <div className="w-128 flex-grow border rounded-primary customScroll">{children}</div>
      </div>
    </div>
  );
});
