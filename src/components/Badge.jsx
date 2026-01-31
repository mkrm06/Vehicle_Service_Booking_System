import React from "react";
import styles from "../styles/admin.module.css";

export default function Badge({ status }) {
  const cls =
    status === "Pending" ? styles.pending :
    status === "Approved" ? styles.approved :
    status === "Completed" ? styles.completed :
    status === "Rejected" ? styles.rejected : styles.neutral;

  return <span className={`${styles.badge} ${cls}`}>{status}</span>;
}
