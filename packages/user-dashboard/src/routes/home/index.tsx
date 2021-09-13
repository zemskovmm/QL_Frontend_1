import { FunctionalComponent } from "preact";
import { Router, Route } from "preact-router";
import { AppBar, Toolbar } from "@material-ui/core";
import { Root } from "./login";

const EmptyHeader = () => (
  <AppBar>
    <Toolbar>
      <h1>Quartier-Latin dashboard</h1>
    </Toolbar>
  </AppBar>
);

export const Home: FunctionalComponent = () => {
  return (
    <div className="h-full">
      <EmptyHeader />
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Router>
          <Route path="/login" component={Root} />
          <Route path={"/register"} component={() => <>placeholder</>} />
        </Router>
      </div>
    </div>
  );
};

export default Home;
