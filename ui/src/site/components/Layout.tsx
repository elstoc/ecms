import { ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

import './Layout.css';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='app-content'>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
