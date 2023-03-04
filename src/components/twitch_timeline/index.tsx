import React from "react";
import ReactDOM from "react-dom/client";
import "../../../../../Code/twitch_complete_schedule/src/index.css";
import App from "../../../../../Code/twitch_complete_schedule/src/App";
import reportWebVitals from "../../../../../Code/twitch_complete_schedule/src/reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.debug);
