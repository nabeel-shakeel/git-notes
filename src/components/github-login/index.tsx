import { Button, Typography } from '@mui/material';
import { useAppDispatch } from '../../redux/hooks';
import { loginWithGithub } from '../../features/auth/authSlice';
import './github-login.styles.scss';

export function GithubLogin() {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(loginWithGithub());
  };

  return (
    <Button
      className="button"
      variant="contained"
      size="large"
      onClick={handleLogin}
    >
      <Typography variant="body2" fontWeight={600}>
        Login
      </Typography>
    </Button>
  );
}
