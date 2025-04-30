import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#2563EB',
              color: '#FFFFFF',
              padding: '16px',
              borderRadius: '8px'
            },
            success: {
              style: {
                background: '#22C55E',
              }
            },
            error: {
              style: {
                background: '#EF4444',
              },
              duration: 6000,
            }
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);