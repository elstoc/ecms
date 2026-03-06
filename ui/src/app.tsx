import 'modern-normalize';
import { Suspense } from 'react';

import { Footer, Header, SiteRoutes } from './site';

import './app.css';
import './theme.css';

export const App = () => {
  return (
    <div className='app-content'>
      <header>
        <Header />
      </header>
      <main>
        <Suspense>
          <SiteRoutes />
        </Suspense>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
