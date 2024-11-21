import { Grid2 as Grid, Box, Avatar, Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { UserGists } from '../../features/profile/components/user-gists';
import './profile.styles.scss';

export function ProfilePage() {
  const { state } = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Grid container spacing={{ xs: 6 }}>
      <Grid size={{ xs: 12, md: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Avatar
            src={user?.photoURL || ''}
            alt="profile-picture"
            className="profile-avatar"
          />
          <Typography variant="h5" color="#3D3D3D">
            {user?.displayName}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ textTransform: 'none' }}
            component="a"
            href={user?.profileURL || ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub Profile
          </Button>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <UserGists gistType={state.gistType} />
      </Grid>
    </Grid>
  );
}
