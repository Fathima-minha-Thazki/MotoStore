import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Items() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    // simple fetch; filtering is done client-side for demo simplicity
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('id', { ascending: false });

    if (error) alert(error.message);
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const remove = async (id) => {
    if (!confirm('Delete this item?')) return;
    const { error } = await supabase.from('items').delete().eq('id', id);
    if (error) return alert(error.message);
    fetchItems();
  };

  const filtered = items.filter(
    (i) => i.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 16 }}>
      <h2>Items</h2>

      <div style={{ display:'flex', gap: 8, marginBottom: 12 }}>
        <input
          placeholder="Search by name..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <Link to="/new">
          <button>+ New</button>
        </Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((it) => (
              <tr key={it.id} style={{ borderBottom: '1px solid #eee' }}>
                <td>{it.id}</td>
                <td>{it.name}</td>
                <td>{Number(it.price).toFixed(2)}</td>
                <td>{it.qty}</td>
                <td style={{ display:'flex', gap:8 }}>
                  <Link to={`/edit/${it.id}`}><button>Edit</button></Link>
                  <button onClick={() => remove(it.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="5" style={{ padding: 16, color:'#777' }}>No items</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
