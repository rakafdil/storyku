import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import StoryManagement from "./story-management/StoryManagement";
import { EmptyInputGroup } from "@/components/common/ErrorPage";
import Layout from "@/components/common/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/story">
          <Route index element={<StoryManagement />} />
          <Route path="create" />
        </Route>
      </Route>
      <Route path="*" element={<EmptyInputGroup />} />
    </Routes>
  );
}

export default App;
