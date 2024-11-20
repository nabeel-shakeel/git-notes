import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../authSlice';

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is loggedin, fetch the token from localStorage
        const accessToken = localStorage.getItem('github_access_token');

        const userDetails = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        if (accessToken) {
          dispatch(setUser({ user: userDetails, accessToken }));
        }
      } else {
        // User is signed out, clear redux state and localStorage
        localStorage.removeItem('github_access_token');
        dispatch(clearUser());
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [dispatch]);
};
