/*
  index.js for the demo
  @author Ian Percy <ianpercyor@gmail.com>

  Renders the React application
*/
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
