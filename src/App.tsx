import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { TaskPage } from "./pages/TaskPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { IterationPage } from "./pages/IterationHieararchyPage";
import { CreateIterationPage } from "./pages/CreateIterationPage";
import { GoalHieararchyPage } from "./pages/GoalHierarchyPage";
import { ModifyIterationPage } from "./pages/ModifyIterationPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/goals" element={<GoalHieararchyPage />} />
        {/* <Route path="/milestones" element={<MilestonePage />} /> */}
        <Route path="/iterations" element={<IterationPage />} />
        <Route path="/iterations/new" element={<CreateIterationPage />} />
        <Route path="/iterations/modify" element={<ModifyIterationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
