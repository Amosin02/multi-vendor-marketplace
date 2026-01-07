import { useGetRole } from '@/model/store';
import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from './useAuthContext'; // If you use Context

export const useLogout = () => {
  const { logoutUser } = useGetRole();
  const navigate = useNavigate();
  // const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:4001/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        logoutUser();

        navigate('/login');
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return { logout };
};
