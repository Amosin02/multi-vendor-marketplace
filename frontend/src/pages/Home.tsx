import type { Products } from '../model/model';
import { useLogout } from '../hooks/useLogout';
import { Button } from '@/components/ui/button';

interface Props {
  products: Products[];
}

const Home = ({ products }: Props) => {
  const { logout } = useLogout();
  return (
    <div>
      <header>
        <Button onClick={logout}>Logout</Button>
      </header>
      <h1>HOME LOGGED IN</h1>
      {products.map((prod) => (
        <li key={prod._id}>{prod.name}</li>
      ))}
    </div>
  );
};

export default Home;
