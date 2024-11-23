import { Box, Avatar, Typography, Button } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';
import './user-info.styles.scss';

export function UserInfo() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Box className="user-info">
      <Avatar
        src={user?.photoURL || ''}
        alt="profile-picture"
        className="profile-avatar"
      />
      <Typography variant="h5">{user?.displayName}</Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        component="a"
        href={user?.profileURL || ''}
        target="_blank"
        rel="noopener noreferrer"
      >
        View GitHub Profile
      </Button>
    </Box>
  );
}
