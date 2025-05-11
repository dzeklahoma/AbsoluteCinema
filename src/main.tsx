import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { MovieProvider } from './context/MovieContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MovieProvider>
          <App />
        </MovieProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);