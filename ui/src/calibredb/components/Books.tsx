import { BookList } from './BookList';
import { PathLinks } from './PathLinks';

import './Books.css';

export const Books = () => {
  return (
    <div className='books'>
      <PathLinks />
      <BookList />
    </div>
  );
};
