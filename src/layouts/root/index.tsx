import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from '../../components/navbar';
import './root.styles.scss';

export default function RooLayout() {
  return (
    <>
      <Navbar />
      <Container fixed className="container">
        <Outlet />
      </Container>
    </>
  );
}
