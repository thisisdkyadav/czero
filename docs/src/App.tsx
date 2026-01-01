import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import GettingStarted from "./pages/GettingStarted";
import ButtonPage from "./pages/components/ButtonPage";
import InputPage from "./pages/components/InputPage";
import CardPage from "./pages/components/CardPage";
import BadgePage from "./pages/components/BadgePage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="getting-started" element={<GettingStarted />} />
          <Route path="components/button" element={<ButtonPage />} />
          <Route path="components/input" element={<InputPage />} />
          <Route path="components/card" element={<CardPage />} />
          <Route path="components/badge" element={<BadgePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
