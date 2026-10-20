import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import StrategyPage from "./pages/StrategyPage";
import DomainsPage from "./pages/DomainsPage";
import ObjectivesPage from "./pages/ObjectivesPage";
import InitiativesPage from "./pages/InitiativesPage";
import TodayPage from "./pages/TodayPage";
import InboxPage from "./pages/InboxPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/today" replace />} />
        <Route path="strategy" element={<StrategyPage />} />
        <Route path="domains" element={<DomainsPage />} />
        <Route path="objectives" element={<ObjectivesPage />} />
        <Route path="initiatives" element={<InitiativesPage />} />
        <Route path="today" element={<TodayPage />} />
        <Route path="inbox" element={<InboxPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
