import { ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

import './Layout.css';

type LayoutProps = {
  children: ReactNode;
  componentTools?: ReactNode;
};

export const Layout = ({ children, componentTools }: LayoutProps) => {
  return (
    <div className='app-content'>
      <header>
        <Header componentTools={componentTools} />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
