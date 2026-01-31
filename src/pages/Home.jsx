import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <section className="container">
      <div className={`grid2 ${styles.heroGrid}`}>
        <div>
          <h1 className="h1">Book your vehicle service in minutes.</h1>
          <p className="p">
            Avoid long queues and booking conflicts. Schedule your appointment online and let the service center manage approvals smoothly.
          </p>

          <div className={styles.heroBtns}>
            <Link className="btn btnPrimary" to="/book">Book a Service</Link>
            <Link className="btn" to="/admin/login">Admin Login</Link>
          </div>

          <div className={styles.features}>
            <div className="card" style={{padding:16}}>
              <div className={styles.featTitle}>Fast Booking</div>
              <div className={styles.featText}>Name • Vehicle No • Service • Date • Time</div>
            </div>
            <div className="card" style={{padding:16}}>
              <div className={styles.featTitle}>Admin Control</div>
              <div className={styles.featText}>Approve • Reject • Complete • Track</div>
            </div>
          </div>
        </div>

        <div className={styles.heroCard}>
          <div className={styles.heroCardTop}>What you get</div>
          <div className={styles.heroCardTitle}>Smooth workflow for service centers</div>
          <ul className={styles.list}>
            <li>✅ Booking requests with “Pending” status</li>
            <li>✅ Admin dashboard with filters and metrics</li>
            <li>✅ Service categories management</li>
            <li>✅ Responsive UI (mobile / tablet / desktop)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
