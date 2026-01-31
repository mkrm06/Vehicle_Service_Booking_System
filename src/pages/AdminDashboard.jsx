import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import StatCard from "../components/StatCard.jsx";
import Badge from "../components/Badge.jsx";
import styles from "../styles/adminDashboard.module.css";

const STATUS_LIST = ["Pending", "Approved", "Completed", "Rejected"];

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    status: "",
    date: "",
    search: "",
  });

  const fetchBookings = async () => {
    try {
      setLoading(true);

      // backend supports status and date; search is done on frontend
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.date) params.date = filters.date;

      const res = await api.get("/api/bookings", { params });
      setBookings(res.data.bookings || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, filters.date]);

  const filteredBookings = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    if (!q) return bookings;

    return bookings.filter((b) => {
      const hay = `${b.customerName} ${b.phone} ${b.vehicleNumber} ${b.serviceType} ${b.status} ${b.date} ${b.time}`
        .toLowerCase();
      return hay.includes(q);
    });
  }, [bookings, filters.search]);

  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "Pending").length;
    const approved = bookings.filter((b) => b.status === "Approved").length;
    const completed = bookings.filter((b) => b.status === "Completed").length;

    // daily count (based on booking date string)
    const today = new Date().toISOString().slice(0, 10);
    const todayCount = bookings.filter((b) => b.date === today).length;

    return { total, pending, approved, completed, todayCount };
  }, [bookings]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/bookings/${id}/status`, { status });
      toast.success("Status updated");
      fetchBookings();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Status update failed");
    }
  };

  const deleteBooking = async (id) => {
    const ok = confirm("Delete this booking permanently?");
    if (!ok) return;

    try {
      await api.delete(`/api/bookings/${id}`);
      toast.success("Booking deleted");
      fetchBookings();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <section className="container">
      <div className={styles.topRow}>
        <div>
          <h2 className={styles.title}>Admin Dashboard</h2>
          <p className={styles.subTitle}>
            Track bookings, filter requests, update status, and maintain service workflow.
          </p>
        </div>

        <div className={styles.actionsRight}>
          <button className={styles.refreshBtn} onClick={fetchBookings}>
            Refresh
          </button>
          <button
            className={styles.resetBtn}
            onClick={() => setFilters({ status: "", date: "", search: "" })}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <StatCard title="Total Bookings" value={stats.total} />
        <StatCard title="Pending" value={stats.pending} />
        <StatCard title="Approved" value={stats.approved} />
        <StatCard title="Completed" value={stats.completed} />
      </div>

      <div className={styles.quickCards}>
        <div className={styles.quickCard}>
          <div className={styles.quickLabel}>Today’s Bookings</div>
          <div className={styles.quickValue}>{stats.todayCount}</div>
          <div className={styles.quickHint}>Based on booking date</div>
        </div>
        <div className={styles.quickCardAlt}>
          <div className={styles.quickLabel}>Tip</div>
          <div className={styles.quickHintAlt}>
            Use Search to find by customer name, vehicle number, service type, or phone.
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filtersCard}>
        <div className={styles.filterItem}>
          <label className={styles.label}>Search</label>
          <input
            className={styles.input}
            placeholder="Search bookings..."
            value={filters.search}
            onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
          />
        </div>

        <div className={styles.filterItem}>
          <label className={styles.label}>Status</label>
          <select
            className={styles.select}
            value={filters.status}
            onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}
          >
            <option value="">All</option>
            {STATUS_LIST.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <label className={styles.label}>Date</label>
          <input
            type="date"
            className={styles.input}
            value={filters.date}
            onChange={(e) => setFilters((p) => ({ ...p, date: e.target.value }))}
          />
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div>
            <h3 className={styles.tableTitle}>Bookings</h3>
            <p className={styles.tableHint}>
              Showing <b>{filteredBookings.length}</b> bookings
            </p>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Vehicle No</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className={styles.loadingRow}>
                    Loading bookings...
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="9" className={styles.emptyRow}>
                    No bookings found. Try changing filters.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b._id}>
                    <td>
                      <div className={styles.primaryText}>{b.customerName}</div>
                      <div className={styles.miniText}>Created: {new Date(b.createdAt).toLocaleString()}</div>
                    </td>
                    <td>{b.phone}</td>
                    <td className={styles.mono}>{b.vehicleNumber}</td>
                    <td>{b.serviceType}</td>
                    <td className={styles.mono}>{b.date}</td>
                    <td className={styles.mono}>{b.time}</td>
                    <td><Badge status={b.status} /></td>
                    <td>
                      <select
                        className={styles.rowSelect}
                        value={b.status}
                        onChange={(e) => updateStatus(b._id, e.target.value)}
                      >
                        {STATUS_LIST.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button className={styles.deleteBtn} onClick={() => deleteBooking(b._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.footerNote}>
          Booking status updates use: <b>PUT /api/bookings/:id/status</b>
        </div>
      </div>
    </section>
  );
}
