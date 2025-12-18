import type { Products } from '../model/model';

interface Props {
  products: Products[];
}

const Home = ({ products }: Props) => {
  return (
    <div>
      <h1>HOME LOGGED IN</h1>
      {products.map((prod) => (
        <li key={prod._id}>{prod.name}</li>
      ))}
    </div>
  );
};

export default Home;
