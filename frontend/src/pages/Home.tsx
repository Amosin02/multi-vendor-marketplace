import type { Products } from '../model/model';
import { useLogout } from '../hooks/useLogout';
import HomeLayout from '@/components/ui/layout/HomeLayout';
import { useState, useEffect } from 'react';

const Home = () => {
  const { logout } = useLogout();
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
    // <div>
    //   <header>
    //     <Button onClick={logout}>Logout</Button>
    //   </header>
    //   <h1>HOME LOGGED IN</h1>
    //   {products.map((prod) => (
    //     <li key={prod._id}>{prod.name}</li>
    //   ))}
    // </div>
    <HomeLayout products={products}></HomeLayout>
  );
};

export default Home;
