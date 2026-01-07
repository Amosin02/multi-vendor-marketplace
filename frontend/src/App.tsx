import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeVendor from './pages/HomeVendor';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ErrorPage from './pages/ErrorPage';
import VendorRoutes from './components/ui/layout/ProtectedRoute';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <div className="Pages">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

          <Route element={<VendorRoutes />}>
            <Route path="/vendor" element={<HomeVendor />} />
            <Route path="/vendor/inventory" element={<Inventory />} />
            <Route path="/vendor/reports" element={<Reports />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
