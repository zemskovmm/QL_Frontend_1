import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Home from "../routes/home";
import Notfound from "../routes/notfound";

export const App: FunctionalComponent = () => {
  return (
    <div id="preact_root" className="h-full">
      <Router>
        <Route path="/:rest*" component={Home} />
        <Route component={Notfound} default />
      </Router>
    </div>
  );
};

export default App;
