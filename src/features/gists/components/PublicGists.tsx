import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid2 as Grid,
  Tabs,
  Tab,
  Box,
  Link,
} from '@mui/material';
import { format } from 'date-fns';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import {
  useGetPublicGistsQuery,
  useGetGistContentQuery,
} from '../gistsApiSlice';
import { GistActions } from './gist-actions';
import { Gist } from '../gists.types';
import { GistListView, GistListSkeleton } from './gist-list-view';
import { GistGridView, GistGridSkeleton } from './gist-grid-view';
import { ErrorComponent } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routing/routes';

interface PublicGistsProps {
  mode: 'list' | 'grid';
}

export function PublicGists({ mode }: PublicGistsProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedGist, setSelectedGist] = useState<Gist | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>('');

  const LoadingComponent =
    mode === 'list' ? GistListSkeleton : GistGridSkeleton;

  const {
    data: gists = [],
    isLoading,
    error,
  } = useGetPublicGistsQuery({
    page: page + 1,
    per_page: rowsPerPage,
  });

  const { data: fileContent } = useGetGistContentQuery(
    selectedGist?.files[selectedFile]?.raw_url || '',
    { skip: !selectedGist || !selectedFile }
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleGistClick = (id: string) => {
    navigate(routes.GIST.replace(':id', id));
  };

  const handleFileChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedFile(newValue);
  };

  if (isLoading) return <LoadingComponent items={8} />;
  if (error) return <Typography color="error">Error loading gists</Typography>;

  if (mode === 'list') {
    return (
      <GistListView
        gists={gists}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleGistClick={handleGistClick}
      />
    );
  }

  return <GistGridView gists={gists} />;

  //{
  /* {selectedGist && (
        <Grid size={12}>
          <Card>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6">
                  {selectedGist.description || 'No description'}
                </Typography>
                <GistActions gistId={selectedGist.id} />
              </Box>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs
                  value={selectedFile}
                  onChange={handleFileChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {Object.keys(selectedGist.files).map((filename) => (
                    <Tab key={filename} label={filename} value={filename} />
                  ))}
                </Tabs>
              </Box>
              {fileContent && (
                <Box sx={{ maxHeight: '500px', overflow: 'auto' }}>
                  {selectedGist.files[selectedFile].language === 'Markdown' ? (
                    <ReactMarkdown>{fileContent}</ReactMarkdown>
                  ) : (
                    <SyntaxHighlighter
                      language={selectedGist.files[
                        selectedFile
                      ].language?.toLowerCase()}
                      style={vscDarkPlus}
                    >
                      {fileContent}
                    </SyntaxHighlighter>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      )} */
  //}
}
