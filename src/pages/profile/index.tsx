import { Grid2 as Grid, Box, Avatar, Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { UserInfo } from '../../components';
import { UserGists } from '../../features/profile/components/user-gists';
import './profile.styles.scss';

export function ProfilePage() {
  const { state } = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Grid container spacing={{ xs: 6 }}>
      <Grid size={{ xs: 12, md: 3 }}>
        <UserInfo />
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <UserGists gistType={state.gistType} />
      </Grid>
    </Grid>
  );
}
