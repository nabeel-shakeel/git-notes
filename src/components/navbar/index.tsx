import { Box, AppBar, Toolbar } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';
import { UserProfileMenu } from '../user-profile-menu';
import { SearchGist } from '../../features/search/components/search-gist';
import { GithubLogin } from '../github-login';
import { AppLogo } from '../../assets/icons';
import './navbar.styles.scss';

export function Navbar() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <AppBar position="static">
      <Toolbar className="nav-container">
        <AppLogo sx={{ width: 165, height: 30 }} />
        <Box className="profile-container">
          <SearchGist />
          {user ? <UserProfileMenu user={user} /> : <GithubLogin />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
