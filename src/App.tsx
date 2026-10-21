import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import StrategyPage from "./pages/StrategyPage";
import DomainsPage from "./pages/DomainsPage";
import HowToUsePage from "./pages/HowToUsePage";
import ObjectivesPage from "./pages/ObjectivesPage";
import InitiativesPage from "./pages/InitiativesPage";
import InitiativeDetailPage from "./pages/InitiativeDetailPage";
import InboxPage from "./pages/InboxPage";
import BuildNotesPage from "./pages/BuildNotesPage";
import ActionsPage from "./pages/ActionsPage";
import { DEFAULT_DOMAIN_ID } from "./domains";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to={`/d/${DEFAULT_DOMAIN_ID}`} replace />} />
        <Route path="strategy" element={<StrategyPage />} />
        <Route path="domains" element={<DomainsPage />} />
        <Route path="how-to-use" element={<HowToUsePage />} />
        <Route path="build-notes" element={<BuildNotesPage />} />
        <Route path="d/:domainId" element={<Navigate to="inbox" replace />} />
        <Route path="d/:domainId/objectives" element={<ObjectivesPage />} />
        <Route path="d/:domainId/initiatives" element={<InitiativesPage />} />
        <Route path="d/:domainId/initiatives/:initiativeId" element={<InitiativeDetailPage />} />
        <Route path="d/:domainId/inbox" element={<InboxPage />} />
        <Route path="d/:domainId/actions" element={<ActionsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
