import { Button } from "@project/components/src/ui-kit/Button";
import { Card } from "@project/components/src/ui-kit/Card";
import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { useLocalesStore } from "stores/LocalesStore";
import ImgIcon from 'assets/images/img_icon.svg';

type PropsType = {
    title: string;
};

export const ApplicationCard: FunctionalComponent<PropsType> = ({title}) => {
    const {
        GO_TO_LANG,
    } = useLocalesStore();
    
    return (
        <Card className="flex flex-col" size="small">
            <img src={ImgIcon}/>
            <Text text={title} size='medium' isBold />
            <Button text={GO_TO_LANG}/>
        </Card>
    );
};
