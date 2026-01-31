import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styles from "../styles/auth.module.css";
import { Eye, EyeOff, Shield } from "lucide-react";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/admin";

  const [form, setForm] = useState({ username: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inlineError, setInlineError] = useState("");

  const onChange = (e) => {
    setInlineError("");
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setInlineError("");

    if (!form.username || !form.password) {
      setInlineError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/api/auth/login", form);
      login(res.data.token, res.data.user);
      toast.success("Welcome Admin!");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed. Try again.";
      setInlineError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.wrap}>
        {/* Left brand panel */}
        <div className={styles.brandPanel}>
          <div className={styles.brandTop}>
            <span className={styles.brandIcon}>
              <Shield size={18} />
            </span>
            <div>
              <div className={styles.brandTitle}>Admin Portal</div>
              <div className={styles.brandSub}>Vehicle Service Booking System</div>
            </div>
          </div>

          <h1 className={styles.headline}>Secure access to manage bookings</h1>
          <p className={styles.brandText}>
            Approve, reject, complete bookings and manage service categories from a single dashboard.
          </p>

          <div className={styles.perks}>
            <div className={styles.perkItem}>✅ View all bookings</div>
            <div className={styles.perkItem}>✅ Update booking status</div>
            <div className={styles.perkItem}>✅ Manage service categories</div>
            <div className={styles.perkItem}>✅ Filter by date & status</div>
          </div>

          <div className={styles.backHome}>
            <Link to="/" className={styles.linkLight}>← Back to Home</Link>
          </div>
        </div>

        {/* Right login card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Login</h2>
            <p className={styles.cardSub}>Enter your admin credentials to continue.</p>
          </div>

          {inlineError ? (
            <div className={styles.errorBox}>
              <b>Login error:</b> {inlineError}
            </div>
          ) : null}

          <form onSubmit={submit} className={styles.form}>
            <div>
              <label className={styles.label}>Username</label>
              <input
                className={styles.input}
                name="username"
                value={form.username}
                onChange={onChange}
                placeholder="admin"
                autoComplete="username"
              />
            </div>

            <div>
              <label className={styles.label}>Password</label>

              <div className={styles.passwordWrap}>
                <input
                  className={styles.input}
                  type={showPw ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPw((p) => !p)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  title={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className={styles.loginBtn} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className={styles.tip}>
              Tip: Use your seeded admin (example: <b>admin / admin123</b>)
            </p>
          </form>

          <div className={styles.footerNote}>
            <span className={styles.dot}></span>
            JWT Authentication • Secure Admin Access
          </div>
        </div>
      </div>
    </section>
  );
}
