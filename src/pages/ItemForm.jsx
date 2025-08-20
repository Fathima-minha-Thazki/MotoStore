import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';

export default function ItemForm() {
  const { id } = useParams();           // if present -> edit mode
  const nav = useNavigate();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', qty: '' });
  const editMode = Boolean(id);

  useEffect(() => {
    if (!editMode) return;
    supabase.from('items').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error) return alert(error.message);
      setForm({
        name: data.name ?? '',
        price: String(data.price ?? ''),
        qty: String(data.qty ?? ''),
      });
    });
  }, [editMode, id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert('Name is required');
    const payload = {
      name: form.name.trim(),
      price: Number(form.price || 0),
      qty: parseInt(form.qty || '0', 10),
    };

    setSaving(true);
    let error;
    if (editMode) {
      ({ error } = await supabase.from('items').update(payload).eq('id', id));
    } else {
      ({ error } = await supabase.from('items').insert(payload));
    }
    setSaving(false);

    if (error) return alert(error.message);
    nav('/');
  };

  return (
    <div style={{ maxWidth: 500, margin: '24px auto', padding: 16 }}>
      <h2>{editMode ? 'Edit Item' : 'New Item'}</h2>
      <form onSubmit={onSubmit} style={{ display:'grid', gap: 8 }}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={onChange} />

        <label>Price</label>
        <input name="price" type="number" step="0.01" value={form.price} onChange={onChange} />

        <label>Qty</label>
        <input name="qty" type="number" value={form.qty} onChange={onChange} />

        <div style={{ display:'flex', gap:8, marginTop:8 }}>
          <button disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={() => nav('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
