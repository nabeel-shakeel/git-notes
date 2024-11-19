import { useDispatch } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { AppDispatch } from '../../../redux/store';
import { loginWithGithub } from '../authSlice';

export function GithubLogin() {
  const dispatch: AppDispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginWithGithub());
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      size="large"
      onClick={handleLogin}
    >
      <Typography variant="body2" fontWeight={600}>
        Login
      </Typography>
    </Button>
  );
}
