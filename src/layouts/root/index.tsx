import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setUser, clearUser } from '../../features/auth/authSlice';
import { Navbar } from '../../components';
import './root.styles.scss';

export function RootLayout() {
  const [isAppShow, setIsAppShow] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is loggedin, fetch the detail from localStorage
        const userInfo = sessionStorage.getItem('userInfo');
        if (userInfo) {
          dispatch(setUser({ user: JSON.parse(userInfo) }));
        }
      } else {
        // User is signed out, clear redux state and localStorage
        sessionStorage.removeItem('userInfo');
        dispatch(clearUser());
      }
      setIsAppShow(true);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [dispatch]);

  return isAppShow ? (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  ) : null;
}
