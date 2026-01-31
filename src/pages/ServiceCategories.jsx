import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import styles from "../styles/services.module.css";

export default function ServiceCategories() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const res = await api.get("/api/services");
      setServices(res.data.services || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load services");
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Service name is required");

    try {
      setLoading(true);
      await api.post("/api/services", {
        name: form.name.trim(),
        description: form.description.trim(),
      });
      toast.success("Service added");
      setForm({ name: "", description: "" });
      load();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Add service failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container">
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Service Categories</h2>
          <p className={styles.subTitle}>
            Add services like Oil Change, Full Service, Engine Check etc. Customers will pick these when booking.
          </p>
        </div>

        <button className={styles.refreshBtn} onClick={load}>
          Refresh
        </button>
      </div>

      <div className={styles.grid}>
        {/* Add Form */}
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <h3 className={styles.cardTitle}>Add New Service</h3>
            <p className={styles.cardHint}>Services appear in the customer booking dropdown.</p>
          </div>

          <form onSubmit={submit} className={styles.form}>
            <div>
              <label className={styles.label}>Service Name</label>
              <input
                className={styles.input}
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Oil Change"
              />
            </div>

            <div>
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.textarea}
                rows="4"
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="Short description about the service"
              />
            </div>

            <button className={styles.primaryBtn} disabled={loading}>
              {loading ? "Saving..." : "Add Service"}
            </button>

            <div className={styles.sampleBox}>
              <div className={styles.sampleTitle}>Suggested Services</div>
              <div className={styles.chips}>
                {["Oil Change","Full Service","Engine Check","Brake Service","Wheel Alignment","AC Service","Battery Replacement"].map((x) => (
                  <span key={x} className={styles.chip}>{x}</span>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* List */}
        <div className={styles.card}>
          <div className={styles.cardHeadRow}>
            <div>
              <h3 className={styles.cardTitle}>Available Services</h3>
              <p className={styles.cardHint}>Total: <b>{services.length}</b></p>
            </div>
          </div>

          <div className={styles.list}>
            {services.length === 0 ? (
              <div className={styles.empty}>
                No services yet. Add a service on the left panel.
              </div>
            ) : (
              services.map((s) => (
                <div key={s._id} className={styles.item}>
                  <div className={styles.itemTop}>
                    <div className={styles.itemTitle}>{s.name}</div>
                    <div className={styles.itemMeta}>
                      {new Date(s.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={styles.itemDesc}>
                    {s.description || "—"}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles.footerNote}>
            Note: Only admin can add services (JWT protected).
          </div>
        </div>
      </div>
    </section>
  );
}
