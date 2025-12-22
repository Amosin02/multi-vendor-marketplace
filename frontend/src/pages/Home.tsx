import type { Products } from '../model/model';
import { useLogout } from '../hooks/useLogout';

interface Props {
  products: Products[];
}

const Home = ({ products }: Props) => {
  const { logout } = useLogout();
  return (
    <div>
      <header>
        <button className="font-bold" onClick={logout}>
          Log out
        </button>
      </header>
      <h1>HOME LOGGED IN</h1>
      {products.map((prod) => (
        <li key={prod._id}>{prod.name}</li>
      ))}
    </div>
  );
};

export default Home;
