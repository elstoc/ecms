import { ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

import './Layout.css';

type LayoutProps = {
  children: ReactNode;
  headerToolsLeft?: ReactNode;
  headerToolsRight?: ReactNode;
};

export const Layout = ({ children, headerToolsLeft, headerToolsRight }: LayoutProps) => {
  return (
    <div className='app-content'>
      <header>
        <Header toolsLeft={headerToolsLeft} toolsRight={headerToolsRight} />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
