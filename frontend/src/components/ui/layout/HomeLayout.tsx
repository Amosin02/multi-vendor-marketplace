import { Search, ShoppingBag, User, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import type { Products } from '../../../model/model';

// Example product data
const PRODUCTS = [
  {
    id: 1,
    name: 'Premium Backpack',
    vendor: 'Urban Gear',
    price: 89,
    category: 'Accessories',
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    vendor: 'LogiTech',
    price: 45,
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    vendor: 'Keychron',
    price: 120,
    category: 'Electronics',
  },
  {
    id: 4,
    name: 'Leather Wallet',
    vendor: 'Bellroy',
    price: 75,
    category: 'Accessories',
  },
  {
    id: 5,
    name: 'Canvas Tote',
    vendor: 'EcoShop',
    price: 20,
    category: 'Accessories',
  },
  { id: 6, name: 'Desk Lamp', vendor: 'Lumina', price: 55, category: 'Home' },
];

interface Props {
  products: Products[];
}

export default function HomeLayout({ products }: Props) {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.vendor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-zinc-950">
      {/* --- SIDEBAR (Consistent with Login Left Panel) --- */}
      <aside className="hidden w-64 flex-col border-r border-zinc-200 bg-[#f4f4f5] lg:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl">⌘</span>
            <span className="tracking-tight">Marketplace</span>
          </div>
        </div>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Categories
              </h3>
              <nav className="space-y-1">
                {[
                  'All Products',
                  'Electronics',
                  'Fashion',
                  'Home & Living',
                ].map((cat) => (
                  <button
                    key={cat}
                    className="block w-full text-left text-sm py-1.5 hover:underline underline-offset-4">
                    {cat}
                  </button>
                ))}
              </nav>
            </div>

            <Separator className="bg-zinc-200" />

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Top Vendors
              </h3>
              <nav className="space-y-1">
                {['Urban Gear', 'LogiTech', 'Keychron', 'Bellroy'].map(
                  (vendor) => (
                    <button
                      key={vendor}
                      className="block w-full text-left text-sm py-1.5 hover:underline underline-offset-4">
                      {vendor}
                    </button>
                  )
                )}
              </nav>
            </div>
          </div>
        </ScrollArea>
      </aside>

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
              <ShoppingBag size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User size={20} />
            </Button>
          </div>
        </header>

        {/* Product Scrollable Area */}
        <ScrollArea className="flex-1 bg-white h-full">
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight">
                Our Products
              </h2>
              <p className="text-sm text-zinc-500">
                Explore items from our verified marketplace vendors.
              </p>
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

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-zinc-500 text-sm italic">
                  No items found matching your search.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
