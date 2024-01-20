import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { FocusPage } from "./pages/FocusPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { IterationHieararchyPage } from "./pages/IterationHieararchyPage";
import { IterationPage } from "./pages/IterationPage";
import { GoalHieararchyPage } from "./pages/GoalHierarchyPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/tasks" element={<FocusPage />} />
        <Route path="/goals" element={<GoalHieararchyPage />} />
        <Route path="/iterations" element={<IterationHieararchyPage />} />
        <Route path="/iterations/new" element={<IterationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
