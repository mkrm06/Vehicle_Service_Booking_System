import React from "react";
import styles from "../styles/layout.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerInner}>
          <p>© {new Date().getFullYear()} AutoCare Booking System</p>
          <p className={styles.small}>MERN Stack • Responsive UI • Admin Dashboard</p>
        </div>
      </div>
    </footer>
  );
}
