import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "../styles/form.module.css";

export default function BookService() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    vehicleNumber: "",
    serviceType: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/api/services");
        setServices(res.data.services || []);
      } catch (e) {
        toast.error(e?.response?.data?.message || "Failed to load services");
      } finally {
        setLoadingServices(false);
      }
    };
    load();
  }, []);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const { customerName, phone, vehicleNumber, serviceType, date, time } = form;
    if (!customerName || !phone || !vehicleNumber || !serviceType || !date || !time) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/api/bookings", form);
      toast.success("Booking submitted!");
      navigate("/success", { state: { booking: res.data.booking } });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed");
    }
  };

  return (
    <section className="container">
      <div className={`card ${styles.formCard}`}>
        <h2 className="h2">Book a Vehicle Service</h2>
        <p className="p">Fill the form and submit your booking request.</p>

        <form onSubmit={submit} className={styles.grid}>
          <Field label="Customer Name">
            <input className="input" name="customerName" value={form.customerName} onChange={onChange} placeholder="Your name" />
          </Field>

          <Field label="Phone">
            <input className="input" name="phone" value={form.phone} onChange={onChange} placeholder="0771234567" />
          </Field>

          <Field label="Vehicle Number">
            <input className="input" name="vehicleNumber" value={form.vehicleNumber} onChange={onChange} placeholder="ABC-1234" />
          </Field>

          <Field label="Service Type">
  <select
    className="select"
    name="serviceType"
    value={form.serviceType}
    onChange={onChange}
    disabled={loadingServices}
  >
    <option value="">
      {loadingServices ? "Loading..." : "Select a service"}
    </option>

    {/* Default service types */}
    <option value="Oil Change">Oil Change</option>
    <option value="Full Service">Full Service</option>
    <option value="Engine Check">Engine Check</option>
    <option value="Brake Service">Brake Service</option>
    <option value="Battery Replacement">Battery Replacement</option>
    <option value="Wheel Alignment">Wheel Alignment</option>
    <option value="AC Service">AC Service</option>

    {/* Services from Database */}
    {services.map((s) => (
      <option key={s._id} value={s.name}>
        {s.name}
      </option>
    ))}
  </select>

  <div className={styles.hint}>
    Services can be selected from default list or added by admin.
  </div>
</Field>


          <Field label="Preferred Date">
            <input className="input" type="date" name="date" value={form.date} onChange={onChange} />
          </Field>

          <Field label="Preferred Time">
            <input className="input" type="time" name="time" value={form.time} onChange={onChange} />
          </Field>

          <div className={styles.full}>
            <button className="btn btnPrimary" style={{width:"100%", padding:"14px 16px"}}>
              Submit Booking
            </button>
            <div className={styles.note}>
              Your booking will be created as <b>Pending</b>.
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}
