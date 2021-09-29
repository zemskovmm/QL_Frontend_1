import { Card } from "components/Card";
import { Text } from "components/Text";
import { FunctionalComponent } from "preact";

type PropsType = {
    title:string;
    subtitle?: string;
    isError?:boolean;
}

export const CenterCardLayout: FunctionalComponent<PropsType> = ({title, subtitle,isError, children}) => {
    return (
        <div className="h-full flex items-center justify-center">
            <Card className="flex flex-col items-center justify-center py-20">
                <div className="flex flex-col mb-10 max-w-card-medium">
                    <Text text={title} size="title-medium" color={isError?"error":undefined} isBold/>
                    <Text text={subtitle || ""} size="small" color={isError?"error":undefined} isBold/>
                </div>
                {children}
            </Card>
        </div>
    );
};