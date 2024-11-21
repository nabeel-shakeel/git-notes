import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { RootLayout } from '../layouts/root';
import { PrivateRoute } from './PrivateRoute';
import { LandingPage, GistPage, ProfilePage, CreateGistPage } from '../pages';

export function Router() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={routes.LANDING} element={<LandingPage />} />
        <Route path={routes.GIST} element={<GistPage />} />
        <Route element={<PrivateRoute />}>
          <Route path={routes.PROFILE} element={<ProfilePage />} />
          <Route path={routes.CREATE_GIST} element={<CreateGistPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
