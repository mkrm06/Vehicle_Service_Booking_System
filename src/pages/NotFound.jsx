import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h2 className="text-4xl font-extrabold">404</h2>
      <p className="mt-3 text-slate-600">Page not found.</p>
      <Link className="inline-block mt-6 px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800" to="/">
        Go Home
      </Link>
    </section>
  );
}
