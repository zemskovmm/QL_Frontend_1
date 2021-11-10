import { Container } from "components/Container";
import { Header } from "components/Header";
import { ComponentChildren, FunctionalComponent } from "preact";

type PropsType = {
  children: ComponentChildren;
};

export const AppLayout: FunctionalComponent<PropsType> = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="px-2 flex-grow flex flex-col">
        <Container className={`my-auto flex flex-col lg:py-0`}>{children}</Container>
      </div>
    </div>
  );
};
