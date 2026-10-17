import { NavLink, useNavigate } from "react-router-dom";
import { DOMAINS } from "../domains";
import { useActiveDomain } from "./useDomain";

const SECTIONS = [
  { path: "/inbox", label: "Inbox" },
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
      <nav className="sidebar-nav">
        {SECTIONS.map((s) => (
          <NavLink key={s.label} to={`/d/${domain.id}${s.path}`}>
            {s.label}
          </NavLink>
        ))}
      </nav>
      {/* Global, not per domain, so it sits apart from the domain links. */}
      <nav className="sidebar-footer" aria-label="Help">
        <NavLink to="/how-to-use">How to use</NavLink>
      </nav>
    </aside>
  );
}
