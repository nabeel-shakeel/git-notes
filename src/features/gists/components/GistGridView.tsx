import { Grid2 as Grid } from '@mui/material';
import { GistCard } from './gist-card';
import { Gist } from '../gists.types';

interface GistGridViewProps {
  gists: Gist[];
}

export function GistGridView({ gists }: GistGridViewProps) {
  return (
    <Grid container spacing={{ xs: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {gists.map((gist) => (
        <Grid key={gist.id} size={{ xs: 6, xl: 4 }}>
          <GistCard gist={gist} />
        </Grid>
      ))}
    </Grid>
  );
}
