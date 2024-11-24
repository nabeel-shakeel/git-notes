import { Skeleton, Stack } from '@mui/material';

export function GistListLoading({ items = 5 }: { items?: number }) {
  return (
    <Stack spacing={2}>
      {Array.from({ length: items }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={40}
          sx={{ borderRadius: 2 }}
        />
      ))}
    </Stack>
  );
}
