import { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { PublicGists } from '../../features/public-gists/public-gists';
import { LayoutSwitch } from '../../components';
import './landing.styles.scss';

export function LandingPage() {
  const [mode, setMode] = useState<'list' | 'grid'>('list');

  return (
    <Stack spacing={2}>
      <Stack direction="row" className="landing-header">
        <Typography variant="h5">Public Gists</Typography>
        <LayoutSwitch value={mode} onChange={setMode} />
      </Stack>
      <PublicGists mode={mode} />
    </Stack>
  );
}
