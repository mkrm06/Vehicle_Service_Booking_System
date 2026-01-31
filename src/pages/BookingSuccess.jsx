import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/form.module.css";

export default function BookingSuccess() {
  const { state } = useLocation();
  const booking = state?.booking;

  return (
    <section className="container">
      <div className={`card ${styles.formCard}`}>
        <h2 className="h2">Booking Submitted ✅</h2>
        <p className="p">Your request has been created. Admin will update the status.</p>

        {booking ? (
          <div style={{marginTop:16}} className="grid2">
            <Info label="Name" value={booking.customerName} />
            <Info label="Phone" value={booking.phone} />
            <Info label="Vehicle No." value={booking.vehicleNumber} />
            <Info label="Service" value={booking.serviceType} />
            <Info label="Date" value={booking.date} />
            <Info label="Time" value={booking.time} />
            <Info label="Status" value={booking.status} />
          </div>
        ) : (
          <p className="p" style={{marginTop:16}}>No booking details found (refresh cleared state).</p>
        )}

        <div style={{display:"flex", gap:10, flexWrap:"wrap", marginTop:18}}>
          <Link className="btn btnPrimary" to="/book">Make Another Booking</Link>
          <Link className="btn" to="/">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div className="card" style={{padding:14, background:"#fbfcfe", border:"1px solid var(--border)"}}>
      <div style={{fontSize:12, color:"var(--muted)", fontWeight:800}}>{label}</div>
      <div style={{marginTop:6, fontWeight:900}}>{value || "-"}</div>
    </div>
  );
}
