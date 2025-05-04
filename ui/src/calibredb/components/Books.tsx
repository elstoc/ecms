import { Card } from '@blueprintjs/core';

import { BookList } from './BookList';
import { PathLinks } from './PathLinks';

import './Books.scss';

export const Books = () => {
  return (
    <Card className='books'>
      <PathLinks />
      <BookList />
    </Card>
  );
};
