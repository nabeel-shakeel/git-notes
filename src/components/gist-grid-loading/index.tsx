import { Grid2 as Grid, Box, Skeleton } from '@mui/material';
import './gist-grid-loading.styles.scss';

export function GistGridLoading({ items = 5 }: { items?: number }) {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: items }).map((_, index) => (
        <Grid key={index} size={4}>
          <Box className="loading-container">
            {/* Image Placeholder */}
            <Skeleton
              variant="rectangular"
              height={140}
              sx={{ borderRadius: 2 }}
            />

            {/* Title Placeholder */}
            <Skeleton variant="text" height={20} sx={{ mt: 2 }} />

            {/* Subtitle Placeholder */}
            <Skeleton variant="text" width="60%" height={18} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
