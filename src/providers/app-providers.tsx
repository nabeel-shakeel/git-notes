import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { store } from '../redux/store';
import { theme, CSSVariables } from '../theme';
interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CSSVariables theme={theme} />
          {children}
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}
