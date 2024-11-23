import { Stack, Box, Typography } from '@mui/material';
import { FileContentViewer, GistAuthorInfo } from '../../../../components';
import { GistActions } from '../gist-actions';
import {
  getMainFileName,
  getMainFileInfo,
} from '../../../../services/gists/gists.utils';
import { SingleGist } from '../../../../services/gists/gists.types';
import './gist-details.styles.scss';

interface GistDetailsProps {
  gist: SingleGist;
}

export function GistDetails({ gist }: GistDetailsProps) {
  const { language, raw_url } = getMainFileInfo(gist);

  const forkCount = gist.forks.length;

  return (
    <Stack spacing={2}>
      {/* Header Section */}
      <Box className="details-header">
        <GistAuthorInfo
          owner={{
            name: gist.owner.login,
            url: gist.owner.avatar_url,
          }}
          fileName={getMainFileName(gist)}
          createdAt={gist.created_at}
          description={gist.description}
        />
        <GistActions gistId={gist.id} forkCount={forkCount} />
      </Box>
      {/* File Content */}
      <Box className="file-content">
        <Typography className="file-name" variant="body2" color="primary">
          {getMainFileName(gist)}
        </Typography>
        <FileContentViewer
          fileUrl={raw_url}
          language={language}
          showFullContent
        />
      </Box>
    </Stack>
  );
}
