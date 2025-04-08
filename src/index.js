import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <main className="[&::-webkit-scrollbar]:hidden root">
    <App />
  </main>
);
