import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { App } from './app';
import { ErrorFallback } from './shared/components/fallbacks';
import { BlueprintProvider } from '@blueprintjs/core';

const queryDefaults = { defaultOptions: { queries: { retry: 2 } } };

const queryClient = new QueryClient(queryDefaults);
const appContainer = document.getElementById('app-root')!;
const portalContainer = document.getElementById('portal-container')!;
const root = createRoot(appContainer);

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
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
