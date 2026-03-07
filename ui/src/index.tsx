import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <ToastProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <App />
        </ErrorBoundary>
      </ToastProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
