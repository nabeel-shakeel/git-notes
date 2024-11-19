import { Routes, Route } from 'react-router-dom';
import { LandingPage } from '../pages/landing';
import About from '../pages/about';
import RootLayout from '../layouts/root';
import Login from '../pages/login';
import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};
