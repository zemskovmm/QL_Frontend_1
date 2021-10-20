import { Button } from "@project/components/src/ui-kit/Button";
import { Card } from "@project/components/src/ui-kit/Card";
import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { useLocalesStore } from "stores/LocalesStore";
import EmpryImgIcon from 'assets/images/empry_img_icon.svg';
import { Icon } from "@project/components/src/ui-kit/Icon";

type PropsType = {
    title: string;
};

export const ApplicationCard: FunctionalComponent<PropsType> = ({title}) => {
    const {
        GO_TO_LANG,
    } = useLocalesStore();
    
    return (
        <Card className="flex flex-col items-center p-16" size="72">
            <Icon src={EmpryImgIcon} size="32"/>
            <Text text={title} size='medium' isBold />
            <Button className="px-16" text={GO_TO_LANG}/>
        </Card>
    );
};
