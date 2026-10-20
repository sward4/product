import { NavLink } from "react-router-dom";

// Each level of the planning hierarchy sits inside the one above it.
const HIERARCHY = [
  { to: "/strategy", label: "Strategy" },
  { to: "/domains", label: "Domains" },
  { to: "/objectives", label: "Objectives" },
  { to: "/initiatives", label: "Initiatives" },
];

const MY_DAY = [
  { to: "/today", label: "Today" },
  { to: "/inbox", label: "Inbox" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Sections">
      <h2 className="sidebar-heading">Plan</h2>
      <nav className="sidebar-nav hierarchy" aria-label="Planning hierarchy">
        {HIERARCHY.map((item, level) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={{ ["--level" as string]: level }}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <h2 className="sidebar-heading">My day</h2>
      <nav className="sidebar-nav" aria-label="My day">
        {MY_DAY.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
