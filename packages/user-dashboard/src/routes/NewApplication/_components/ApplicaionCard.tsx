import { Button } from "@project/components/src/ui-kit/Button";
import { Card } from "@project/components/src/ui-kit/Card";
import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { useLocalesStore } from "stores/LocalesStore";
import EmpryImgIcon from "assets/images/empry_img_icon.svg";
import { Icon } from "@project/components/src/ui-kit/Icon";

type PropsType = {
  id: string;
  title: string;
  onClick: (id?: string) => void;
};

export const ApplicationCard: FunctionalComponent<PropsType> = ({ id, title, onClick }) => {
  const { GO_TO_LANG } = useLocalesStore();

  return (
    <Card className="flex flex-col justify-between m-4" size="80">
      <Icon className="m-4 self-center" src={EmpryImgIcon} size="32" />
      <Text className="m-4 " text={title} size="medium" isBold />
      <Button id={id} onClick={onClick} className="m-4 max-w-48 w-full self-center" text={GO_TO_LANG} />
    </Card>
  );
};
