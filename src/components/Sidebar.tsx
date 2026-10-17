import { NavLink, useMatch, useNavigate } from "react-router-dom";
import { DEFAULT_DOMAIN_ID, DOMAINS, findDomain } from "../domains";

const SECTIONS = [
  { path: "", label: "Overview", end: true },
  { path: "/objectives", label: "Objectives" },
  { path: "/initiatives", label: "Initiatives" },
  { path: "/inbox", label: "Inbox" },
];

export default function Sidebar({ dimmed }: { dimmed: boolean }) {
  const navigate = useNavigate();
  const match = useMatch("/d/:domainId/*");
  const domain = findDomain(match?.params.domainId) ?? findDomain(DEFAULT_DOMAIN_ID)!;

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
          <NavLink key={s.label} to={`/d/${domain.id}${s.path}`} end={s.end}>
            {s.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
