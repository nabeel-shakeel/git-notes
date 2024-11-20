import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export function PrivateRoute() {
  // Access user info from Redux
  const { user } = useSelector((state: RootState) => state.auth);

  // If no user is logged in, redirect to the landing page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If the user is logged in, render the child routes
  return <Outlet />;
}
