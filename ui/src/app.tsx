import 'modern-normalize';

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
        <SiteRoutes />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
