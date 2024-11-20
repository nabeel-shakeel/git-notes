import { List, ViewAgenda } from '@mui/icons-material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface LayoutSwitchProps {
  value: 'list' | 'grid';
  onChange: (value: 'list' | 'grid') => void;
}

export function LayoutSwitch({ value, onChange }: LayoutSwitchProps) {
  return (
    <ToggleButtonGroup
      size="small"
      value={value}
      exclusive
      onChange={(_, value) => onChange(value)}
      aria-label="layout mode"
    >
      <ToggleButton value="list" aria-label="table-view">
        <List />
      </ToggleButton>
      <ToggleButton value="grid" aria-label="card-view">
        <ViewAgenda />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
