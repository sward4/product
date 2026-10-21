import { NavLink, useNavigate } from "react-router-dom";
import { DOMAINS } from "../domains";
import { useActiveDomain } from "./useDomain";
import IntegrationsNav from "./IntegrationsNav";

// Planning hierarchy, top down. Strategy and Domains are global; Objectives and
// Initiatives follow the domain selected above.
const HIERARCHY = [
  { to: "/strategy", label: "Strategy" },
  { to: "/domains", label: "Domains" },
  { path: "/objectives", label: "Objectives" },
  { path: "/initiatives", label: "Initiatives" },
];

export default function Sidebar({ dimmed }: { dimmed: boolean }) {
  const navigate = useNavigate();
  const domain = useActiveDomain();

  return (
    <aside className={`sidebar${dimmed ? " dimmed" : ""}`} aria-label="Domain">
      <label className="sidebar-label" htmlFor="domain-select">
        Working in
      </label>
      <select
        id="domain-select"
        value={domain.id}
        onChange={(e) => navigate(`/d/${e.target.value}`)}
      >
        {DOMAINS.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
      <h2 className="sidebar-heading">Plan</h2>
      <nav className="sidebar-nav hierarchy" aria-label="Planning hierarchy">
        {HIERARCHY.map((item, level) => (
          <NavLink
            key={item.label}
            to={item.to ?? `/d/${domain.id}${item.path}`}
            style={{ ["--level" as string]: level }}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <h2 className="sidebar-heading">My day</h2>
      <nav className="sidebar-nav" aria-label="My day">
        <NavLink to={`/d/${domain.id}/inbox`}>Inbox</NavLink>
        <NavLink to={`/d/${domain.id}/actions`}>Actions</NavLink>
      </nav>
      <IntegrationsNav />
      {/* Global, not per domain, so it sits apart from the domain links. */}
      <nav className="sidebar-footer" aria-label="Help">
        <NavLink to="/how-to-use">How to use</NavLink>
      </nav>
    </aside>
  );
}
