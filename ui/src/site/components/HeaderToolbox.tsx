import { ReactNode } from 'react';

import { UserInfo } from '@/auth';

import './HeaderToolbox.css';

type HeaderToolboxProps = {
  componentTools?: ReactNode;
  sideExpander?: ReactNode;
};

export const HeaderToolbox = ({ componentTools, sideExpander }: HeaderToolboxProps) => {
  return (
    <div className='toolbox-content'>
      <div className='left'>
        <div id='sidebar-expander-target'>{sideExpander}</div>
      </div>
      <div className='right'>
        <div>{componentTools}</div>
        <UserInfo />
      </div>
    </div>
  );
};
