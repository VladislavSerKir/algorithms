import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./fonts/fonts.css";
import "./components/ui/common.css";
import "./components/ui/box.css";
import "./components/string/string.css";
import "./components/fibonacci-page/fibonacci-page.css";
import "./components/stack-page/stack-page.css";
import "./components/queue-page/queue-page.css";
import "./components/sorting-page/sorting-page.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
