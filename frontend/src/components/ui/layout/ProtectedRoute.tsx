import { useGetRole } from '@/model/store';
import { Navigate, Outlet } from 'react-router-dom';

const VendorRoutes = () => {
  const { role } = useGetRole();
  if (role === null) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'vendor') {
    return <Navigate to="/home" replace />;
  }

  // If they ARE a vendor, render the child routes (Outlet)
  return <Outlet />;
};

export default VendorRoutes;
