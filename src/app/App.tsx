import { Routes, Route } from 'react-router-dom';
import { RootLayout } from '../layouts/root';
import { routes, PrivateRoute } from '../routing';
import { LandingPage, GistPage, ProfilePage } from '../pages';
import { useAuthListener } from '../features/auth/hooks/useAuthListener';
import './App.scss';

export function App() {
  useAuthListener();
  return (
    <div className="App">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path={routes.LANDING} element={<LandingPage />} />
          <Route path={routes.GIST} element={<GistPage />} />
          <Route element={<PrivateRoute />}>
            <Route path={routes.PROFILE} element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
