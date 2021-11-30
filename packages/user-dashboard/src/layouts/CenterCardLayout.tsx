import { FC } from "react";

type PropsType = {
  title: string;
  subtitle?: string;
};

export const CenterCardLayout: FC<PropsType> = ({ title, subtitle, children }) => {
  return (
    <div
      className="flex h-full mx-auto flex-col items-center justify-center py-14 max-w-128 px-2.5 md:box-content w-full"
      style={{ border: "2px solid #EFF3FA", borderRadius: "10px" }}
    >
      <div className="flex flex-col mb-10">
        <h1 className={`text-4xl font-bold text-center mb-4`}>{title}</h1>
        <h2 className={`text-base font-semibold text-center`}>{subtitle}</h2>
      </div>
      {children}
    </div>
  );
};
