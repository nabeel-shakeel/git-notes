import { theme } from './theme';

type AppTheme = typeof theme;

export const CSSVariables = ({ theme }: { theme: AppTheme }) => (
  <style>
    {`:root {
        --primary-main: ${theme.palette.primary.main};
        --secondary-main: ${theme.palette.secondary.main};
      }`}
  </style>
);
