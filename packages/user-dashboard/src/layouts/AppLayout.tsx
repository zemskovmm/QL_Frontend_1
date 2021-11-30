import { Container } from "src/components/Container";
import { Header } from "src/components/Header";
import { FC } from "react";

export const AppLayout: FC = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="px-5 md:px-2 flex-grow flex flex-col">
        <Container className={`md:my-auto flex flex-col lg:py-0`}>{children}</Container>
      </div>
    </div>
  );
};
