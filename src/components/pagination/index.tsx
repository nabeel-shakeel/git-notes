import * as React from 'react';
import { TablePagination } from '@mui/material';

interface PaginationProps {
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowsPerPageOptions: number[];
}

export function Pagination(props: PaginationProps) {
  const {
    rowsPerPage,
    page,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPageOptions,
  } = props;
  return (
    <TablePagination
      component="div"
      count={-1}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  );
}
