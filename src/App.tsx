import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { FocusPage } from "./pages/FocusPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HieararchyPage } from "./pages/HierarchyPage";
import { IterationPage } from "./pages/IterationPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<FocusPage />} />
        <Route path="/hierarchy" element={<HieararchyPage />} />
        <Route path="/iteration" element={<IterationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
