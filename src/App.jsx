import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Items from './pages/Items';
import ItemForm from './pages/ItemForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/new" element={<ItemForm />} />
        <Route path="/edit/:id" element={<ItemForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
