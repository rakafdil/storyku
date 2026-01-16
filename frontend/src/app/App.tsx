import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import StoryManagement from "./story-management/StoryManagement";
import { EmptyInputGroup } from "@/components/common/ErrorPage";
import Layout from "@/components/common/Layout";
import AddStory from "./story-management/add/AddStory";
import { StoryDraftProvider } from "@/context/StoryDraftContext";
import AddChapter from "./story-management/add/chapter/AddChapter";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/story">
          <Route index element={<StoryManagement />} />

          <Route
            path="create"
            element={
              <StoryDraftProvider>
                <Outlet />
              </StoryDraftProvider>
            }
          >
            <Route index element={<AddStory />} />
            <Route path="chapter" element={<AddChapter />} />
          </Route>
          <Route
            path="edit"
            element={
              <StoryDraftProvider>
                <Outlet />
              </StoryDraftProvider>
            }
          >
            <Route path=":id" element={<AddStory />} />
            <Route path="chapter" element={<AddChapter />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<EmptyInputGroup />} />
    </Routes>
  );
}

export default App;
