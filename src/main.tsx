import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './components/App/App.tsx';
import { Loader } from './components/UI/Loader/Loader.tsx';
import { StateProvider } from './helpers/index.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StateProvider>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </StateProvider>
  </StrictMode>,
);
