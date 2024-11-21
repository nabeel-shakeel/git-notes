import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { useAppDispatch } from '../../redux/hooks';
import { routes } from '../../routing';
import { auth, signOut } from '../../features/auth/firebase';
import { clearUser } from '../../features/auth/authSlice';
import { User } from 'src/features/auth/auth.types';
import './user-profile-menu.styles.scss';

interface UserProfileMenuProps {
  user: User;
}

export function UserProfileMenu({ user }: UserProfileMenuProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.log('Error signing out', error);
    }
  };

  const handleNavigateProfile = (gistType: string) => {
    navigate(routes.PROFILE, {
      state: { gistType },
    });
  };

  const handleNavigateCreateGist = () => {
    navigate(routes.CREATE_GIST);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'user-profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar className="avatar" alt="profile-picture" src={user.photoURL!} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Box>
            <Typography variant="caption" color="secondary">
              Signed in as{' '}
            </Typography>
            <Typography variant="body2" fontWeight={700} color="primary">
              {user.displayName}
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleNavigateCreateGist}>
          <Typography variant="body2" color="primary">
            Create Gist
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigateProfile('all')}>
          <Typography variant="body2" color="primary">
            Your gists
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigateProfile('starred')}>
          <Typography variant="body2" color="primary">
            Starred gists
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography variant="body2" color="primary">
            Your Github profile
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>
          <Typography variant="body2" color="primary">
            Sign out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
