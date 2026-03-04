import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app';
import { ToastProvider } from './shared/components/toast';
import { ErrorFallback } from './site/components/ErrorFallback';

const queryDefaults = { defaultOptions: { queries: { retry: 2 } } };

const queryClient = new QueryClient(queryDefaults);
const appContainer = document.getElementById('app')!;
const root = createRoot(appContainer);

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ToastProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback='Loading...'>
            <App />
          </Suspense>
        </ErrorBoundary>
      </ToastProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
