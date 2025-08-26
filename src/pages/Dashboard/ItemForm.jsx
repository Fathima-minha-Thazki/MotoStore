import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';

export default function ItemForm() {
  const { id } = useParams();           // if present -> edit mode
  const nav = useNavigate();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', qty: '', category: '' });
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const editMode = Boolean(id);

  // Fetch existing categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('items')
      .select('category')
      .not('category', 'is', null)
      .not('category', 'eq', '');
    
    if (!error && data) {
      const uniqueCategories = [...new Set(data.map(item => item.category))].sort();
      setCategories(uniqueCategories);
    }
  };

  useEffect(() => {
    if (!editMode) return;
    supabase.from('items').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error) return alert(error.message);
      setForm({
        name: data.name ?? '',
        price: String(data.price ?? ''),
        qty: String(data.qty ?? ''),
        category: data.category ?? '',
      });
    });
  }, [editMode, id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    // Filter categories when typing in category field
    if (name === 'category') {
      if (value.trim() === '') {
        setFilteredCategories([]);
        setShowDropdown(false);
      } else {
        const filtered = categories.filter(cat =>
          cat.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCategories(filtered);
        setShowDropdown(filtered.length > 0);
      }
    }
  };

  const selectCategory = (category) => {
    setForm(f => ({ ...f, category }));
    setShowDropdown(false);
    setFilteredCategories([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert('Name is required');
    if (!form.category.trim()) return alert('Category is required');
    
    const payload = {
      name: form.name.trim(),
      price: Number(form.price || 0),
      qty: parseInt(form.qty || '0', 10),
      category: form.category.trim(),
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
    nav('/dashboard/items');
  };

  return (
    <div style={{ maxWidth: 500, margin: '24px auto', padding: 16 }}>
      <h2>{editMode ? 'Edit Item' : 'New Item'}</h2>
      <form onSubmit={onSubmit} style={{ display:'grid', gap: 8 }}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={onChange} />

        <label>Category</label>
        <div style={{ position: 'relative' }}>
          <input 
            name="category" 
            value={form.category} 
            onChange={onChange}
            onFocus={() => form.category && setShowDropdown(filteredCategories.length > 0)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            placeholder="Enter or select category..."
          />
          {showDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderTop: 'none',
              maxHeight: '150px',
              overflowY: 'auto',
              zIndex: 1000
            }}>
              {filteredCategories.map((cat, index) => (
                <div
                  key={index}
                  onClick={() => selectCategory(cat)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        <label>Price</label>
        <input name="price" type="number" step="0.01" value={form.price} onChange={onChange} />

        <label>Qty</label>
        <input name="qty" type="number" value={form.qty} onChange={onChange} />

        

        <div style={{ display:'flex', gap:8, marginTop:8 }}>
          <button disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={() => nav('/dashboard/items')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}