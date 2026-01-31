import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Wrench } from "lucide-react";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
  const { isAuthed, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logo}><Wrench size={18} /></span>
          <div>
            <div className={styles.title}>AutoCare Booking</div>
            <div className={styles.sub}>Vehicle Service Appointments</div>
          </div>
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/book" className={({isActive}) => isActive ? styles.active : styles.link}>
            Book Service
          </NavLink>

          {isAuthed ? (
            <>
              <NavLink to="/admin" className={({isActive}) => isActive ? styles.active : styles.link}>
                Dashboard
              </NavLink>
              <NavLink to="/admin/services" className={({isActive}) => isActive ? styles.active : styles.link}>
                Services
              </NavLink>
              <button
                className={`${styles.linkBtn} ${styles.logout}`}
                onClick={() => { logout(); navigate("/"); }}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/admin/login" className={({isActive}) => isActive ? styles.active : styles.link}>
              Admin Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
