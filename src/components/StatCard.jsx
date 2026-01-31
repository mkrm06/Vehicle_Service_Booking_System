import React from "react";
import styles from "../styles/admin.module.css";

export default function StatCard({ title, value }) {
  return (
    <div className={`${styles.statCard} card`}>
      <div className={styles.statTitle}>{title}</div>
      <div className={styles.statValue}>{value}</div>
    </div>
  );
}
