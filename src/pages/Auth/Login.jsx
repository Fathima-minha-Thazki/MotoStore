import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword(form);
    if (error) return alert(error.message);
    nav("/dashboard/items");
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        <button>Login</button>
      </form>
      <p>No account? <Link to="/register">Register</Link></p>
    </div>
  );
}
