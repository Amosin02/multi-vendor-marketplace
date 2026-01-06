import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeVendor from './pages/HomeVendor';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useGetRole } from '@/model/store';
import ErrorPage from './pages/ErrorPage';

function App() {
  const { role, userId } = useGetRole();

  return (
    <>
      <BrowserRouter>
        <div className="Pages">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            {role === 'vendor' ? (
              <Route path="/vendor" element={<HomeVendor />} />
            ) : (
              <Route path="/vendor" element={<ErrorPage />} />
            )}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
