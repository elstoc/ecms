import { ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

import './Layout.css';

type LayoutProps = {
  children: ReactNode;
  componentTools?: ReactNode;
  sideExpander?: ReactNode;
};

export const Layout = ({ children, componentTools, sideExpander }: LayoutProps) => {
  return (
    <div className='app-content'>
      <header>
        <Header componentTools={componentTools} sideExpander={sideExpander} />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
