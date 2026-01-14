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
import DialogPage from "./pages/components/DialogPage";
import SelectPage from "./pages/components/SelectPage";
import RadioGroupPage from "./pages/components/RadioGroupPage";
import TablePage from "./pages/components/TablePage";
import AccordionPage from "./pages/components/AccordionPage";
import StackPage from "./pages/components/StackPage";
import SpinnerPage from "./pages/components/SpinnerPage";
import AspectRatioPage from "./pages/components/AspectRatioPage";
import BreadcrumbPage from "./pages/components/BreadcrumbPage";
import LabelPage from "./pages/components/LabelPage";
import ContainerPage from "./pages/components/ContainerPage";
import GridPage from "./pages/components/GridPage";
import KbdPage from "./pages/components/KbdPage";
import CodePage from "./pages/components/CodePage";
import ScrollAreaPage from "./pages/components/ScrollAreaPage";
import DropdownMenuPage from "./pages/components/DropdownMenuPage";
import ToastPage from "./pages/components/ToastPage";
import TagPage from "./pages/components/TagPage";
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
          <Route path="components/dialog" element={<DialogPage />} />
          <Route path="components/select" element={<SelectPage />} />
          <Route path="components/radio-group" element={<RadioGroupPage />} />
          <Route path="components/table" element={<TablePage />} />
          <Route path="components/accordion" element={<AccordionPage />} />
          <Route path="components/stack" element={<StackPage />} />
          <Route path="components/spinner" element={<SpinnerPage />} />
          <Route path="components/aspect-ratio" element={<AspectRatioPage />} />
          <Route path="components/breadcrumb" element={<BreadcrumbPage />} />
          <Route path="components/label" element={<LabelPage />} />
          <Route path="components/container" element={<ContainerPage />} />
          <Route path="components/grid" element={<GridPage />} />
          <Route path="components/kbd" element={<KbdPage />} />
          <Route path="components/code" element={<CodePage />} />
          <Route path="components/scroll-area" element={<ScrollAreaPage />} />
          <Route path="components/dropdown-menu" element={<DropdownMenuPage />} />
          <Route path="components/toast" element={<ToastPage />} />
          <Route path="components/tag" element={<TagPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
