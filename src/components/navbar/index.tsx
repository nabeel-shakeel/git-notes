import { useSelector } from 'react-redux';
import { Box, AppBar, Toolbar } from '@mui/material';
import { RootState } from '../../redux/store';
import { UserProfileMenu } from '../user-profile-menu';
import { SearchGist } from '../../features/search/components/search-gist';
import { GithubLogin } from '../../features/auth/components/github-login';
import { AppLogo } from '../../assets/icons';
import './navbar.styles.scss';

export default function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);

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
