import { BookList } from './BookList';
import { PathLinks } from './PathLinks';

import './Books.scss';

export const Books = () => {
  return (
    <div className='books'>
      <PathLinks />
      <BookList />
    </div>
  );
};
