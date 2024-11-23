import { Grid2 as Grid, Stack } from '@mui/material';
import { Pagination } from '../../../../components';
import { GistCard } from '../gist-card';
import { GRIDS_PER_PAGE_OPTIONS } from '../../../../utils/constants';
import { Gist } from '../../../../services/gists/gists.types';

interface GistGridViewProps {
  gists: Gist[];
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function GistGridView(props: GistGridViewProps) {
  const {
    gists,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;
  return (
    <Stack>
      <Grid container spacing={4}>
        {gists.map((gist) => (
          <Grid key={gist.id} size={{ xs: 6, xl: 4 }}>
            <GistCard gist={gist} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={-1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={GRIDS_PER_PAGE_OPTIONS}
      />
    </Stack>
  );
}
