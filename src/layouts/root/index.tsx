import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from '../../components/navbar';
import './root.styles.scss';

export function RootLayout() {
  return (
    <>
      <Navbar />
      <Container className="container">
        <Outlet />
      </Container>
    </>
  );
}
