import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Navigate, useNavigate } from 'react-router-dom';

interface HomeVendLayoutProps {
  children: React.ReactNode;
}

export default function HomeVendorLayout({ children }: HomeVendLayoutProps) {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-zinc-950">
      <aside className="hidden w-64 flex-col border-r border-zinc-200 bg-[#f4f4f5] lg:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl">⌘</span>
            <span className="tracking-tight">Marketplace Seller</span>
          </div>
        </div>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Menu
              </h3>
              <nav className="space-y-1">
                {[
                  'Catalog',
                  'Inventory',
                  'Pricing',
                  'Orders',
                  'Growth',
                  'Reports',
                  'Performance',
                ].map((cat) => (
                  <button
                    onClick={() => navigate(`/vendor/${cat.toLowerCase()}`)}
                    key={cat}
                    className="block w-full text-left text-sm py-1.5 hover:underline underline-offset-4">
                    {cat}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </ScrollArea>
      </aside>
      <div>{children}</div>
    </div>
  );
}
