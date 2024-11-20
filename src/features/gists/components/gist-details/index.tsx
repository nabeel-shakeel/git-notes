import React from 'react';
import {
  Stack,
  Box,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { Star, StarBorder, ForkLeft, FourK } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SingleGist } from '../../gists.types';
import { getMainFileName, getMainFileInfo } from './../../gists.utils';
import { GistActions } from '../gist-actions';
import { useGetGistContentQuery } from '../../gistsApiSlice';
import { timeAgo } from '../../../../utils/helpers';
import './gist-details.styles.scss';

interface GistDetailsProps {
  gist: SingleGist;
}

export function GistDetails({ gist }: GistDetailsProps) {
  const { language, raw_url } = getMainFileInfo(gist);
  const { data: fileContent } = useGetGistContentQuery(raw_url);

  const forkCount = gist.forks.length;

  return (
    <Stack spacing={2}>
      {/* Header Section */}
      <Box className="details-header">
        <Box display="flex" flexDirection="row" alignItems="flex-start" gap={1}>
          <Avatar
            sx={{ width: 40, height: 40 }}
            src={gist.owner.avatar_url}
            alt={gist.owner.login}
          />
          <Box>
            <Typography variant="body2" color="primary" sx={{ mb: '4px' }}>
              {gist.owner.login} /{' '}
              <Typography
                component="span"
                variant="body2"
                fontWeight={600}
                color="primary"
              >
                {getMainFileName(gist)}
              </Typography>
            </Typography>
            <Typography
              sx={{ textAlign: 'left' }}
              component="p"
              variant="caption"
              color="#7A7A7A"
            >
              {timeAgo(gist.created_at)}
            </Typography>
            {gist.description && (
              <Typography
                sx={{ textAlign: 'left' }}
                component="p"
                variant="caption"
                color="#7A7A7A"
              >
                {gist.description}
              </Typography>
            )}
          </Box>
        </Box>
        <GistActions gistId={gist.id} forkCount={forkCount} />
      </Box>
      {/* File Content */}
      <Card sx={{ bgcolor: '#FAFAFA', borderRadius: '4px' }}>
        <Typography
          align="left"
          variant="body2"
          color="primary"
          sx={{ padding: '10px' }}
        >
          {getMainFileName(gist)}
        </Typography>
        <SyntaxHighlighter
          style={theme}
          language={language}
          showLineNumbers
          lineNumberStyle={{ color: '#888', paddingRight: '10px' }}
        >
          {fileContent || ''}
        </SyntaxHighlighter>
      </Card>
    </Stack>
  );
}
