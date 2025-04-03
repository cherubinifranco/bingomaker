import "./App.css";
import CounterPage from "./pages/counter.jsx";
import IndexPage from "./pages/Index.jsx";

import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/counter" element={<CounterPage />} />
        </Routes>
      </HashRouter>
  );
}

export default App;
