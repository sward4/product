import { NavLink, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  const { pathname } = useLocation();
  // Domain-scoped routes are /d/:id/...; Strategy and Domains pages keep the
  // last domain highlighted via the sidebar's own state.
  const inTopSection =
    pathname.startsWith("/strategy") ||
    pathname.startsWith("/domains") ||
    pathname.startsWith("/how-to-use");

  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand">
          Roadmap
        </NavLink>
        <nav className="topnav" aria-label="Main">
          <NavLink to="/strategy">Strategy</NavLink>
          <NavLink to="/domains">Domains</NavLink>
        </nav>
      </header>
      <div className="body">
        <Sidebar dimmed={inTopSection} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
