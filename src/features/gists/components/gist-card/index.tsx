import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Avatar,
  IconButton,
  Button,
  Tooltip,
} from '@mui/material';
import { Star, Share } from '@mui/icons-material';
import { Gist } from '../../gists.types';
import { FileContentViewer, GistAuthorInfo } from '../../../../components';
import { GistActions } from '../gist-actions';
import { getMainFileName, getMainFileInfo } from '../../gists.utils';
import './gist-card.styles.scss';
import { useGetGistContentQuery } from '../../gistsApiSlice';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

interface GistCardProps {
  gist: Gist;
  onViewFile?: () => void;
}

export function GistCard({ gist, onViewFile }: GistCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const { language, raw_url } = getMainFileInfo(gist);

  const handleNavigateGist = () => {
    navigate(`/gist/${gist.id}`);
  };

  return (
    <Card className="gist-preview-card">
      {/* <div
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
      </div> */}
      <CardContent className="card-content">
        <CardActionArea className="code-preview" onClick={handleNavigateGist}>
          <Box className="view-file">
            <Typography component="span" variant="body2" color="white">
              View{' '}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              color="white"
              fontWeight={700}
            >
              {getMainFileName(gist)}
            </Typography>
          </Box>
          <FileContentViewer fileUrl={raw_url} language={language} />
        </CardActionArea>
        <Box className="content-wrapper">
          <GistAuthorInfo
            owner={{
              name: gist.owner.login,
              url: gist.owner.avatar_url,
            }}
            fileName={getMainFileName(gist)}
            description={gist.description}
          />
          <GistActions gistId={gist.id} forkCount={0} />
        </Box>
      </CardContent>
    </Card>
  );
}
