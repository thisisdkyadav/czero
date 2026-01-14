import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import GettingStarted from "./pages/GettingStarted";
import ButtonPage from "./pages/components/ButtonPage";
import InputPage from "./pages/components/InputPage";
import CardPage from "./pages/components/CardPage";
import BadgePage from "./pages/components/BadgePage";
import TextareaPage from "./pages/components/TextareaPage";
import SwitchPage from "./pages/components/SwitchPage";
import AvatarPage from "./pages/components/AvatarPage";
import SeparatorPage from "./pages/components/SeparatorPage";
import AlertPage from "./pages/components/AlertPage";
import CheckboxPage from "./pages/components/CheckboxPage";
import TooltipPage from "./pages/components/TooltipPage";
import ProgressPage from "./pages/components/ProgressPage";
import SkeletonPage from "./pages/components/SkeletonPage";
import TabsPage from "./pages/components/TabsPage";
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
          <Route path="components/textarea" element={<TextareaPage />} />
          <Route path="components/switch" element={<SwitchPage />} />
          <Route path="components/avatar" element={<AvatarPage />} />
          <Route path="components/separator" element={<SeparatorPage />} />
          <Route path="components/alert" element={<AlertPage />} />
          <Route path="components/checkbox" element={<CheckboxPage />} />
          <Route path="components/tooltip" element={<TooltipPage />} />
          <Route path="components/progress" element={<ProgressPage />} />
          <Route path="components/skeleton" element={<SkeletonPage />} />
          <Route path="components/tabs" element={<TabsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
