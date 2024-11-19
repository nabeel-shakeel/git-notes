import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import './user-profile-menu.styles.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { User } from 'src/features/auth/auth.types';
import { auth, signOut } from '../../features/auth/firebase';
import { logout } from '../../features/auth/authSlice';

interface UserProfileMenuProps {
  user: User;
}

export function UserProfileMenu({ user }: UserProfileMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch: AppDispatch = useDispatch();
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
      dispatch(logout());
    } catch (error) {
      console.log('Error signing out', error);
    }
  };

  return (
    <React.Fragment>
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
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Box>
            <Typography variant="caption">Signed in as </Typography>
            <Typography variant="body2" fontWeight={700} color="primary">
              {user.displayName}
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Typography variant="body2" color="primary">
            Your gists
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
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
        <MenuItem onClick={handleClose}>
          <Typography variant="body2" color="primary">
            Help
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <Typography variant="body2" color="primary">
            Sign out
          </Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
