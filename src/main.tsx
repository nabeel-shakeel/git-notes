import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProviders } from './providers/app-providers';
import { App } from './app/App';
import './styles.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
