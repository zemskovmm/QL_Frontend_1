import { FunctionalComponent } from "preact";
import { memo } from "preact/compat";
import { LeftNavigation } from "components/LeftNavigation";
import { Button } from "@project/components/src/ui-kit/Button";
import { useLocalesStore } from "stores/LocalesStore";
import { Link } from "preact-router";
import { useRouterStore } from "stores/RouterStore";

type PropsType={
  title: string;
}

export const LeftNavigationLayout: FunctionalComponent<PropsType> = memo(({ title, children }) => {
  const { NEW_APPLICATION_LANG } = useLocalesStore();
  const { NEW_APPLICATION_PATH } = useRouterStore();

  return (
    <div className=" flex flex-col my-auto">
      <div className="hidden md:flex justify-between pb-4">
        <h1 className={`text-4xl font-bold`}>{title}</h1>
        <Link href={NEW_APPLICATION_PATH}>
          <Button plus={true} text={NEW_APPLICATION_LANG} color={"red"} />
        </Link>
      </div>
      <div className="flex flex-grow w-full md:h-screen MainContainer">
        <LeftNavigation className="hidden tablet:flex border-r w-128 border rounded-primary shadow-left-navigation" />
        <div className="flex-grow border rounded-primary customScroll">{children}</div>
      </div>
    </div>
  );
});
