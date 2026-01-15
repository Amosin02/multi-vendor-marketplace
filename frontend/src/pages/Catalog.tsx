import HomeVendorLayout from '@/components/ui/layout/HomeVendorLayout';
import { Search, LogOut, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useEffect, useState } from 'react';
import type { Products } from '@/model/model';
import { useGetRole } from '@/model/store';

export default function Catalog() {
  const [products, setProducts] = useState<Products[]>([]);
  const vendorId = useGetRole((state) => state.userId);

  const fetchProducts = async () => {
    const response = await fetch(
      `http://localhost:4001/api/products?vendor=${vendorId}`
    );
    const data = await response.json();

    if (data.product) {
      setProducts(data.product);
    }
  };

  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, [vendorId]);

  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.vendor.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <HomeVendorLayout>
      {/* --- MAIN AREA --- */}
      <div className="flex flex-1 flex-col overflow-hidden h-screen">
        {/* Header (Top Search Bar) */}
        <header className="flex h-16 items-center border-b border-zinc-200 px-8 py-8 gap-4 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={18}
            />
            <Input
              placeholder="Search products or vendors..."
              className="pl-10 h-10 bg-zinc-50 border-zinc-200 focus-visible:ring-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingCart size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              // onClick={logout}
              className="rounded-full">
              <LogOut size={20} />
            </Button>
          </div>
        </header>

        {/* Product Scrollable Area */}
        <ScrollArea className="flex-1 bg-white h-full">
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight">Catalog</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product._id}
                  className="group border-zinc-200 shadow-none rounded-none transition-all hover:border-zinc-400">
                  <div className="aspect-4/3 bg-zinc-100 flex items-center justify-center border-b border-zinc-200">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">
                      No Image
                    </span>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          {/* {product.vendor} */}
                          'change'
                        </p>
                        <h3 className="font-medium text-zinc-900 leading-tight mt-1">
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-sm font-semibold">${product.price}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-black text-white hover:bg-zinc-800 rounded-none h-9 text-xs">
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-zinc-500 text-sm italic">
                  No items found matching your search.
                </p>
              </div>
            )} */}
          </div>
        </ScrollArea>
      </div>
    </HomeVendorLayout>
  );
}
