import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";

type PropsType = {
  className?: string;
  me: boolean;
  title: string;
  text: string;
};

export const Message: FunctionalComponent<PropsType> = ({ className, title, text, me }) => {
  const classes = [
    "flex flex-col rounded px-2",
    me ? "bg-blue-50  self-end" : "bg-white self-start",
    className ? className : "",
  ].join(" ");

  return (
    <div className={classes} style={{ border: "1px solid #D7D7D7" }}>
      {/*<Text text={title} size="caption" color="help"/>*/}
      <Text text={text} className={`text-chat`} />
    </div>
  );
};
