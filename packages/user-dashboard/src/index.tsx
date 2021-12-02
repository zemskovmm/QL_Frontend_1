import * as ReactDOM from "react-dom";
import "./style/index.css";
import { Application } from "./Application";
import { BrowserRouter } from "react-router-dom";
import { LocalesContextProvider } from "./locales";

ReactDOM.render(
  <LocalesContextProvider>
    <BrowserRouter>
      <Application />
    </BrowserRouter>
  </LocalesContextProvider>,
  
  document.getElementById("app")
);
