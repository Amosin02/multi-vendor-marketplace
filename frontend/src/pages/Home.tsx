import type { Products } from '../model/model';
import HomeLayout from '@/components/ui/layout/HomeLayout';
import { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState<Products[]>([]);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:4001/api/products');
    const data = await response.json();

    if (data.product) {
      setProducts(data.product);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductsCategory = async (val: string) => {
    if (val === '695387568a3689ec6d00e99b') {
      fetchProducts();
    } else {
      const response = await fetch(
        `http://localhost:4001/api/categories/${val}/products`
      );
      const data = await response.json();

      if (data) {
        setProducts(data);
      }
    }
  };
  return (
    <HomeLayout
      products={products}
      getProductsCategory={getProductsCategory}></HomeLayout>
  );
};

export default Home;
