import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <main className="[&::-webkit-scrollbar]:hidden root">
      <div className="p-8">
        <App />
      </div>
    </main>
  </React.StrictMode>
);
