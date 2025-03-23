import { FocusStyleManager } from '@blueprintjs/core';
import 'modern-normalize';
import { Suspense } from 'react';

import { Footer, Header, SiteRoutes } from './site';

import './app.scss';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';

FocusStyleManager.onlyShowFocusOnTabs();

export const App = () => {
  return (
    <div id='app-container'>
      <div id='app'>
        <div className='app-header'>
          <Suspense>
            <Header />
          </Suspense>
        </div>
        <div className='app-component'>
          <Suspense>
            <SiteRoutes />
          </Suspense>
        </div>
        <div className='app-footer'>
          <Suspense>
            <Footer />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
