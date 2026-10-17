import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import StrategyPage from "./pages/StrategyPage";
import DomainsPage from "./pages/DomainsPage";
import HowToUsePage from "./pages/HowToUsePage";
import ObjectivesPage from "./pages/ObjectivesPage";
import InitiativesPage from "./pages/InitiativesPage";
import InboxPage from "./pages/InboxPage";
import { DEFAULT_DOMAIN_ID } from "./domains";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to={`/d/${DEFAULT_DOMAIN_ID}`} replace />} />
        <Route path="strategy" element={<StrategyPage />} />
        <Route path="domains" element={<DomainsPage />} />
        <Route path="how-to-use" element={<HowToUsePage />} />
        <Route path="d/:domainId" element={<Navigate to="inbox" replace />} />
        <Route path="d/:domainId/objectives" element={<ObjectivesPage />} />
        <Route path="d/:domainId/initiatives" element={<InitiativesPage />} />
        <Route path="d/:domainId/inbox" element={<InboxPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
