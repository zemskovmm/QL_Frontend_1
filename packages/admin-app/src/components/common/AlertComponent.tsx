interface AlertComponentProps {
  text: string;
}

export const AlertComponent = (props: AlertComponentProps) => {
  return <div className={`fixed inset-0 bg-[#0000ffcc]`}>{props.text}</div>;
};
