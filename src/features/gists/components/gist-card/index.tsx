import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  IconButton,
  Button,
  Tooltip,
} from '@mui/material';
import { Star, Share } from '@mui/icons-material';
import { Gist } from '../../gists.types';
import { getMainFileName, getMainFileInfo } from '../../gists.utils';
import './gist-card.styles.scss';
import { useGetGistContentQuery } from '../../gistsApiSlice';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';

interface GistCardProps {
  gist: Gist;
  onViewFile?: () => void;
}

export function GistCard({ gist, onViewFile }: GistCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { language, raw_url } = getMainFileInfo(gist);
  const { data: fileContent } = useGetGistContentQuery(raw_url);

  const limitedContent = fileContent
    ? fileContent.split('\n').slice(0, 10).join('\n')
    : null;

  return (
    <Card className="gist-preview-card">
      <div
        className="code-preview"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Button
          className="view-file-button"
          variant="outlined"
          size="small"
          onClick={onViewFile}
        >
          {getMainFileName(gist)}
        </Button>
        {language === 'Markdown' ? (
          <ReactMarkdown>{fileContent}</ReactMarkdown>
        ) : (
          <SyntaxHighlighter
            style={theme}
            language={language}
            showLineNumbers
            lineNumberStyle={{ color: '#B7B7B7', paddingRight: '10px' }}
          >
            {limitedContent || ''}
          </SyntaxHighlighter>
        )}
      </div>

      <CardContent className="card-content">
        <Box className="content-wrapper">
          <Box className="author-section">
            <Avatar
              src={gist.owner.avatar_url}
              alt={gist.owner.login}
              sx={{ width: 40, height: 40 }}
            />
            <Box className="author-info">
              <Box className="name-section">
                <Typography
                  variant="body1"
                  component="span"
                  className="author-name"
                >
                  {gist.owner.login}
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  color="text.secondary"
                >
                  /
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  className="filename"
                >
                  {getMainFileName(gist)}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                className="description"
              >
                {gist.description}
              </Typography>
            </Box>
          </Box>

          <Box className="actions">
            <Tooltip title="Share">
              <IconButton size="small">
                <Share />
              </IconButton>
            </Tooltip>
            <Tooltip title="Star">
              <IconButton size="small">
                <Star />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
