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
    <div style={{ display: "flex", height: "100vh" }}>
      <aside style={{ width: 200, background: "#f3f4f6", padding: 16 }}>
        <h3>Dashboard</h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Link to="/dashboard/items">Items</Link>
        </nav>
        {user && (
          <button
            onClick={logout}
            style={{ marginTop: 20, width: "100%" }}
          >
            Logout
          </button>
        )}
      </aside>
      <main style={{ flex: 1, padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}
