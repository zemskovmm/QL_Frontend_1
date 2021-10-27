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
        <div className="px-2 flex-grow">
          <Container className="h-full">{children}</Container>
        </div>
        {/*<Footer/>*/}
      </div>
  );
};
