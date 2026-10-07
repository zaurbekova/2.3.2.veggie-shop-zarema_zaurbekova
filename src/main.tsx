import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App.tsx';

const theme = createTheme({
  primaryColor: 'green',
  colors: {
    green: [
      '#EBFBE8',
      '#D9F2D2',
      '#ABE2A0',
      '#7ACD6A',
      '#63B954',
      '#54B44A',
      '#489E3D',
      '#3D8D34',
      '#337A2A',
      '#2A6A22',
    ],
  },
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
});

document.body.style.margin = '0';
document.body.style.background = '#F5F6F8';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
);
