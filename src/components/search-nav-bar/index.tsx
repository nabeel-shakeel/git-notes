import { InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import './search-nav-bar.styles.scss';

export function SearchNavBar() {
  return (
    <div className="search">
      <Search />
      <InputBase
        className="styled-input-base"
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
}
