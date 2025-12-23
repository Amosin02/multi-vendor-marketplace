import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import type { Products } from './model/model';
import HomeVendor from './pages/HomeVendor';
import Login from './pages/Login';

function App() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:4001/api/products');
      const data = await response.json();

      if (data.product) {
        setProducts(data.product);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <BrowserRouter>
        <div className="Pages">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home products={products} />} />
            <Route path="/vendor" element={<HomeVendor />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
