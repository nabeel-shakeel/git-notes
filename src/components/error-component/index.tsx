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
      <ErrorOutline color="error" className="outline" />
      <Typography variant="h6" color="text.primary" gutterBottom>
        {message}
      </Typography>
    </Box>
  );
}
