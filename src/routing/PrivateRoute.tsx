import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export function PrivateRoute() {
  // Access user info from Redux
  const { user } = useAppSelector((state) => state.auth);

  //If no user is logged in, redirect to the landing page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If the user is logged in, render the child routes
  return <Outlet />;
}
