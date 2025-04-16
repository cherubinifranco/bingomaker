import "./App.css";
import ConfigurationPage from "./pages/Configuration.jsx";
import CounterPage from "./pages/Counter.jsx";
import IndexPage from "./pages/Index.jsx";
import SheetsPage from "./pages/Sheets.jsx";

import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/sheets" element={<SheetsPage />} />
        <Route path="/configuration" element={<ConfigurationPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
