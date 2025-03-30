import { BlueprintProvider } from '@blueprintjs/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app';
import { ErrorFallback } from './shared/components/fallbacks';

const queryDefaults = { defaultOptions: { queries: { retry: 2 } } };

const queryClient = new QueryClient(queryDefaults);
const appContainer = document.getElementById('app-root')!;
const portalContainer = document.getElementById('portal-container')!;
const root = createRoot(appContainer);

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <BlueprintProvider portalContainer={portalContainer}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback='Loading...'>
            <App />
          </Suspense>
        </ErrorBoundary>
      </BlueprintProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
