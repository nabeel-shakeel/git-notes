import { InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import debounce from 'lodash.debounce';
import { useAppDispatch } from '../../../../redux/hooks';
import { setSearchTerm } from '../../searchSlice';
import './search-gist.styles.scss';

export function SearchGist() {
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((value: string) => {
    dispatch(setSearchTerm(value));
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  return (
    <div className="search">
      <Search />
      <InputBase
        className="styled-input-base"
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearchChange}
      />
    </div>
  );
}
