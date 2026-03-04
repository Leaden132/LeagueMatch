import { NavLink, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { SearchForm } from "../search/search-form";
import styles from "./navbar.module.css";

export function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.brand}>
          LeagueMatch
        </NavLink>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.links} ${mobileOpen ? styles.open : ""}`}>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ""}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/champions" className={({ isActive }) => isActive ? styles.active : ""}>
              Champions
            </NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink to="/profile" className={({ isActive }) => isActive ? styles.active : ""}>
                  Profile
                </NavLink>
              </li>
              <li>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : ""}>
                Log In
              </NavLink>
            </li>
          )}
        </ul>

        {!isHome && <SearchForm compact />}
      </nav>
    </header>
  );
}
