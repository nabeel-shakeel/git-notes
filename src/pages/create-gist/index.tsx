import { Stack, Typography, Container } from '@mui/material';
import { CreateGistForm } from '../../features/create-gist/components/create-gist-form';

export function CreateGistPage() {
  return (
    <Stack spacing={1} alignItems="flex-start">
      <Typography variant="h5">Create Gist</Typography>
      <Container maxWidth="sm" sx={{ alignSelf: 'center' }}>
        <CreateGistForm />
      </Container>
    </Stack>
  );
}
