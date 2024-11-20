import { Box, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import './error-component.styles.scss';

interface ErrorComponentProps {
  message?: string;
}

export function ErrorComponent({
  message = 'Something went wrong!',
}: ErrorComponentProps) {
  return (
    <Box className="error">
      <ErrorOutline color="error" sx={{ fontSize: 48, mb: 2 }} />
      <Typography variant="h6" color="text.primary" gutterBottom>
        {message}
      </Typography>
    </Box>
  );
}
