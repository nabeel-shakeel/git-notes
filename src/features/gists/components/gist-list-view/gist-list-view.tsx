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
  TableCellProps,
} from '@mui/material';
import { format } from 'date-fns';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import {
  useGetPublicGistsQuery,
  useGetGistContentQuery,
} from '../../gistsApiSlice';
import { GistActions } from '../gist-actions';
import { Gist } from '../../gists.types';
import { GistListSkeleton } from './gist-list-loading';

interface GistsTableViewProps {
  gists: Gist[];
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleGistClick: (id: string) => void;
}

export const tableColumns = [
  {
    id: 'name',
    label: 'Name',
    align: 'left',
  },
  {
    id: 'description',
    label: 'Description',
    align: 'left',
  },
  {
    id: 'updatedAt',
    label: 'Updated At',
    align: 'left',
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'left',
  },
];

export function GistListView(props: GistsTableViewProps) {
  const {
    gists,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleGistClick,
  } = props;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableColumns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align as TableCellProps['align']}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {gists.map((gist) => (
            <TableRow
              key={gist.id}
              hover
              onClick={() => handleGistClick(gist.id)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell width={'30%'}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar
                    src={gist.owner.avatar_url}
                    sx={{ width: 30, height: 30 }}
                  />
                  <Link
                    href={`https://github.com/${gist.owner.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {gist.owner.login}
                  </Link>
                </Box>
              </TableCell>
              <TableCell width={'40%'}>
                {gist.description || 'No description'}
              </TableCell>
              <TableCell width={'20%'}>
                {format(new Date(gist.updated_at), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell
                width={'10%'}
                align="right"
                onClick={(e) => e.stopPropagation()}
              >
                <GistActions gistId={gist.id} forkCount={0} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={-1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10]}
      />
    </TableContainer>
  );
}
