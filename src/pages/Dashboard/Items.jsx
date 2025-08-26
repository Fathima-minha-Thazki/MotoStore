import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function Items() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order(sortBy, { ascending: sortOrder === 'asc' });

    if (error) alert(error.message);
    setItems(data || []);
    
    // Extract unique categories for filter dropdown
    if (data) {
      const uniqueCategories = [...new Set(
        data.map(item => item.category).filter(cat => cat && cat.trim())
      )].sort();
      setCategories(uniqueCategories);
    }
    
    setLoading(false);
  }, [sortBy, sortOrder]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const remove = async (id) => {
    if (!confirm('Delete this item?')) return;
    const { error } = await supabase.from('items').delete().eq('id', id);
    if (error) return alert(error.message);
    fetchItems();
  };

  const filtered = items.filter(
    (i) => {
      const matchesName = i.name.toLowerCase().includes(q.toLowerCase());
      const matchesCategory = categoryFilter === '' || i.category === categoryFilter;
      return matchesName && matchesCategory;
    }
  );

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return ' ↕️';
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 16 }}>
      <h2>Items</h2>

      {/* Search and Filter Controls */}
      <div style={{ display: 'grid', gap: 8, marginBottom: 16, gridTemplateColumns: '1fr auto auto auto' }}>
        <input
          placeholder="Search by name..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ padding: 8 }}
        />
        
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: 8, minWidth: 120 }}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [col, ord] = e.target.value.split('-');
            setSortBy(col);
            setSortOrder(ord);
          }}
          style={{ padding: 8, minWidth: 140 }}
        >
          <option value="id-desc">Newest First</option>
          <option value="id-asc">Oldest First</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="category-asc">Category A-Z</option>
          <option value="category-desc">Category Z-A</option>
          <option value="price-asc">Price Low-High</option>
          <option value="price-desc">Price High-Low</option>
          <option value="qty-asc">Qty Low-High</option>
          <option value="qty-desc">Qty High-Low</option>
        </select>

        <Link to="/dashboard/items/new">
          <button style={{ padding: '8px 16px' }}>+ New</button>
        </Link>
      </div>

      {/* Results Summary */}
      <div style={{ marginBottom: 12, color: '#666', fontSize: '14px' }}>
        Showing {filtered.length} of {items.length} items
        {categoryFilter && ` in "${categoryFilter}"`}
        {q && ` matching "${q}"`}
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
              <th 
                onClick={() => handleSort('id')} 
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                ID{getSortIcon('id')}
              </th>
              <th 
                onClick={() => handleSort('name')} 
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                Name{getSortIcon('name')}
              </th>
              <th 
                onClick={() => handleSort('category')} 
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                Category{getSortIcon('category')}
              </th>
              <th 
                onClick={() => handleSort('price')} 
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                Price{getSortIcon('price')}
              </th>
              <th 
                onClick={() => handleSort('qty')} 
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                Qty{getSortIcon('qty')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((it) => (
              <tr key={it.id} style={{ borderBottom: '1px solid #eee' }}>
                <td>{it.id}</td>
                <td>{it.name}</td>
                <td>
                  <span style={{
                    backgroundColor: '#f0f0f0',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#555'
                  }}>
                    {it.category || 'No Category'}
                  </span>
                </td>
                <td>${Number(it.price || 0).toFixed(2)}</td>
                <td>{it.qty || 0}</td>
                <td style={{ display:'flex', gap:8 }}>
                  <Link to={`/dashboard/items/edit/${it.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button 
                    onClick={() => remove(it.id)}
                    style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: 16, color:'#777', textAlign: 'center' }}>
                  {items.length === 0 ? 'No items found' : 'No items match your filters'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}