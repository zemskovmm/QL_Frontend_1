import * as ReactDOM from "react-dom";
import "./style/index.css";
import { Application } from "./Application";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
  document.getElementById("app")
);
