import { Button } from "@project/components/src/ui-kit/Button";
import { Card } from "@project/components/src/ui-kit/Card";
import { Text } from "@project/components/src/ui-kit/Text";
import { FC } from "react";
import { useLocalesStore } from "src/stores/LocalesStore";
import EmpryImgIcon from "src/assets/images/empry_img_icon.svg";
import { Icon } from "@project/components/src/ui-kit/Icon";

type PropsType = {
  href: string;
  title: string;
};

export const ApplicationCard: FC<PropsType> = ({ href, title }) => {
  const { GO_TO_LANG } = useLocalesStore();

  return (
    <Card className="flex flex-col justify-between m-4" size="80">
      <Icon className="m-4 self-center" src={EmpryImgIcon} size="32" />
      <Text className="m-4 " text={title} size="medium" isBold />
      <a href={href}>
        <Button className="m-auto max-w-48 w-full self-center" text={GO_TO_LANG} />
      </a>
    </Card>
  );
};
