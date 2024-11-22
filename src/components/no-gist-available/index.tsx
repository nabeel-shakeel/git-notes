import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { SentimentDissatisfiedOutlined } from '@mui/icons-material';
import { useAppSelector } from '../../redux/hooks';
import { routes } from '../../routing/routes';

export function NoGistAvailable() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const hanldeCreateGist = () => {
    navigate(routes.CREATE_GIST);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      textAlign="center"
      padding={4}
      sx={{
        color: 'primary.main',
      }}
    >
      <SentimentDissatisfiedOutlined sx={{ fontSize: 64, marginBottom: 2 }} />
      <Typography variant="h6" gutterBottom>
        No Gists Available
      </Typography>
      <Typography variant="body2" color="secondary">
        It looks like you don't have any gists yet.
      </Typography>
      {user && (
        <Button
          variant="contained"
          color="primary"
          onClick={hanldeCreateGist}
          sx={{ marginTop: 2 }}
        >
          Create Your First Gist
        </Button>
      )}
    </Box>
  );
}
