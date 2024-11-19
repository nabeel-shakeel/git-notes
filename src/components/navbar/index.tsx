import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, AppBar, Toolbar, Button } from '@mui/material';
import { AppLogo } from '../../assets/icons';
import { UserProfileMenu } from '../user-profile-menu';
import { RootState } from '../../redux/store';
import './navbar.styles.scss';
import { SearchNavBar } from '../search-nav-bar';
import { GithubLogin } from '../../features/auth/components/github-login';

export default function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <AppBar position="static">
      <Toolbar className="nav-container">
        <AppLogo sx={{ width: 165, height: 30 }} />
        <Box className="profile-container">
          <SearchNavBar />
          {user ? <UserProfileMenu user={user} /> : <GithubLogin />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
