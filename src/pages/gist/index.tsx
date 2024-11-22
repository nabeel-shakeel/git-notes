import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useGetSingleGistQuery } from '../../services/gists/gists';
import { GistDetails } from '../../features/public-gists/components/gist-details';

export function GistPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Typography variant="h1">Something went wrong</Typography>;
  }

  const { data, isLoading, error } = useGetSingleGistQuery(id);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error loading gists</Typography>;

  if (!data) {
    return <Typography variant="h1">Gist not found</Typography>;
  }

  return <GistDetails gist={data} />;
}
