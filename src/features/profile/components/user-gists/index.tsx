import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import {
  Pagination,
  GistGridLoading,
  NoGistAvailable,
  ErrorComponent,
} from '../../../../components';
import {
  useGetUserGistsQuery,
  useGetStarredGistsQuery,
} from '../../../../services/gists/gists';
import { GistCard } from '../../../public-gists/components/gist-card';
import {
  USER_GISTS_PER_PAGE,
  USER_GISTS_PER_PAGE_OPTIONS,
} from '../../../../utils/constants';
import './user-gists.styles.scss';

interface UserGistsProps {
  gistType: 'all' | 'starred';
}

export function UserGists({ gistType }: UserGistsProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(USER_GISTS_PER_PAGE);

  const navigate = useNavigate();

  const {
    data: allGists = [],
    isLoading: isLoadingAllGists,
    error: errorAllGists,
  } = useGetUserGistsQuery(
    {
      page: page + 1,
      per_page: rowsPerPage,
    },
    { skip: gistType === 'starred' }
  );

  const {
    data: starrtedGists = [],
    isLoading: isLoadingStarredGists,
    error: errorStarredGists,
  } = useGetStarredGistsQuery(
    {
      page: page + 1,
      per_page: rowsPerPage,
    },
    { skip: gistType === 'all' }
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

  if (isLoadingAllGists || isLoadingStarredGists)
    return <GistGridLoading items={8} />;

  if (errorAllGists || errorStarredGists) return <ErrorComponent />;

  const pageTitle = gistType === 'all' ? 'User Gists' : 'Starred Gists';
  const gistsCount =
    gistType === 'all' ? allGists.length : starrtedGists.length;
  const selectedGists = gistType === 'all' ? allGists : starrtedGists;

  return (
    <Stack spacing={4}>
      <Stack direction="row" gap={1} alignItems="center">
        <Typography variant="h5" color="secondary">
          {pageTitle}
        </Typography>
        <Typography variant="body2" className="gist-count">
          {gistsCount}
        </Typography>
      </Stack>
      {selectedGists.length === 0 && <NoGistAvailable />}
      {selectedGists.map((gist) => (
        <GistCard gist={gist} />
      ))}
      <Pagination
        count={-1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={USER_GISTS_PER_PAGE_OPTIONS}
      />
    </Stack>
  );
}
