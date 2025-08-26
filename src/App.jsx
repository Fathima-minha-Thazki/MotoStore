import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DashboardLayout from "./components/DashboardLayout";
import FrontPage from "./pages/FrontPage";
import Items from "./pages/Dashboard/Items";
import ItemForm from "./pages/Dashboard/ItemForm";
import RequireAuth from "./components/RequireAuth";
import Reports from "./pages/Reports";                    // ✅ Uncommented
import Overview from "./pages/Reports/Overview";
import LowStockAlert from "./pages/Reports/LowStockAlert";
import StockDetails from "./pages/Reports/StockDetails";
import Sales from "./pages/Reports/Sales";
import Analytics from "./pages/Reports/Analytics";
import ReportsSettings from "./pages/Reports/Settings";   // ✅ Added

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<FrontPage />} />
          <Route path="items" element={<Items />} />
          <Route path="items/new" element={<ItemForm />} />
          <Route path="items/edit/:id" element={<ItemForm />} />
          <Route path="about" element={<div><h2>About Us</h2><p>Info about Moto Parts.</p></div>} />
          <Route path="contact" element={<div><h2>Contact</h2><p>Email: support@moto.com</p></div>} />
          <Route path="reports" element={<Reports />} />
          <Route path="reports/overview" element={<Overview />} />
          <Route path="reports/low-stock" element={<LowStockAlert />} />
          <Route path="reports/stock-details" element={<StockDetails />} />
          <Route path="reports/sales" element={<Sales />} />
          <Route path="reports/analytics" element={<Analytics />} />
          <Route path="reports/settings" element={<ReportsSettings />} />
        </Route>

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}