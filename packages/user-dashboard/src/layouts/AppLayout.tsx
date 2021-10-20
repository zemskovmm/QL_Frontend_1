import { Container } from "components/Container";
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { ComponentChildren, FunctionalComponent } from "preact";

type PropsType = {
  children: ComponentChildren;
};

export const AppLayout: FunctionalComponent<PropsType> = ({ children }) => {
  return (
      <div className="flex flex-col h-full">
        <Header />
        <Container className="flex-grow ">{children}</Container>
        {/*<Footer/>*/}
      </div>
  );
};
