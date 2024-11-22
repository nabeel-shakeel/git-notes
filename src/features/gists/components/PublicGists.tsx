import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { routes } from '../../../routing/routes';
import { useGetPublicGistsQuery } from '../gistsApiSlice';
import {
  ErrorComponent,
  GistGridLoading,
  NoGistAvailable,
} from '../../../components';
import { GistListView, GistListSkeleton } from './gist-list-view';
import { GistGridView } from './gist-grid-view';
import { ROWS_PER_PAGE, GRIDS_PER_PAGE } from '../../../utils/constants';
import { Gist } from '../gists.types';

interface PublicGistsProps {
  mode: 'list' | 'grid';
}

export function PublicGists({ mode }: PublicGistsProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [gridsPerPage, setGridsPerPage] = useState(GRIDS_PER_PAGE);

  const searchTerm = useAppSelector((state) => state.search.searchTerm);

  const {
    data: gists = [],
    isLoading,
    error,
  } = useGetPublicGistsQuery({
    page: page + 1,
    per_page: mode === 'list' ? rowsPerPage : gridsPerPage,
  });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (mode === 'list') {
      setRowsPerPage(parseInt(event.target.value, 10));
    } else {
      setGridsPerPage(parseInt(event.target.value, 10));
    }
    setPage(0);
  };

  const handleGistClick = (id: string) => {
    navigate(routes.GIST.replace(':id', id));
  };

  const LoadingComponent = mode === 'list' ? GistListSkeleton : GistGridLoading;

  if (isLoading) return <LoadingComponent items={8} />;
  if (error) return <ErrorComponent />;

  const filteredGists = gists.filter((gist: Gist) =>
    gist.owner?.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredGists.length === 0) return <NoGistAvailable />;

  if (mode === 'list') {
    return (
      <GistListView
        gists={filteredGists}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleGistClick={handleGistClick}
      />
    );
  }

  return (
    <GistGridView
      gists={filteredGists}
      page={page}
      rowsPerPage={gridsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
