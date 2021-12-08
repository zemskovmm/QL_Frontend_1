import { Container } from "src/components/Container";
import { Header } from "src/components/Header";
import { FC } from "react";

export const AppLayout: FC = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header className="flex-shrink-0" />
      <div className="flex-grow">
        <Container className="h-full">
          <div className="h-full flex justify-center items-center py-4 md:py-8">{children}</div>
        </Container>
      </div>
    </div>
  );
};
