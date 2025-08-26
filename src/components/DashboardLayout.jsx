import { Link, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

export default function DashboardLayout() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    nav("/login");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          background: "#111827",
          color: "#fff",
          padding: "12px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Moto Parts</h2>
        <nav style={{ display: "flex", gap: "20px" }}>
          <Link to="/dashboard" style={{ color: "#fff" }}>Home</Link>
          <Link to="/dashboard/items" style={{ color: "#fff" }}>Items</Link>
          <Link to="/dashboard/about" style={{ color: "#fff" }}>About</Link>
          <Link to="/dashboard/reports" style={{ color: "#fff" }}>Reports</Link>
          <Link to="/dashboard/contact" style={{ color: "#fff" }}>Contact</Link>

        </nav>
        <div>
          {user && <span style={{ marginRight: 20 }}>{user.email}</span>}
          <button
            onClick={logout}
            style={{
              background: "#ef4444",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 20, background: "#f9fafb" }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "#111827",
          color: "#fff",
          padding: "12px 40px",
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} Moto Parts. All rights reserved.
      </footer>
    </div>
  );
}
