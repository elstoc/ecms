import 'modern-normalize';
import { Suspense } from 'react';

import { Footer, Header, SiteRoutes } from './site';

import './app.css';
import './theme.css';

export const App = () => {
  return (
    <div className='app-content'>
      <header>
        <Suspense>
          <Header />
        </Suspense>
      </header>
      <main>
        <Suspense>
          <SiteRoutes />
        </Suspense>
      </main>
      <footer>
        <Suspense>
          <Footer />
        </Suspense>
      </footer>
    </div>
  );
};
